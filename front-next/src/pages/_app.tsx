import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  useApolloClient,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { createUploadLink } from "apollo-upload-client";
import { memoize } from "lodash";
import type { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import SimpleReactLightbox from "simple-react-lightbox";
import { UserAtom } from "../atoms/UserAtom";
import { VirtualAppAtom } from "../atoms/VirtualAppAtom";
import FixedSidebarComponent from "../components/global/Sidebar/FixedSidebar/FixedSidebarComponent";
import DialogAlertProvider from "../components/global/StyledDialog/StyledDialogAlertProvider";
import DialogConfirmProvider from "../components/global/StyledDialog/StyledDialogConfirmProvider";
import { GET_VIRTUAL_APP } from "../components/screens/Apps/AppsList/AppsList";
import { GET_USER } from "../components/screens/Login/Step2/Step2";
import {
  GetUserInfoQuery,
  GetUserInfoQueryVariables,
  GetVirtualAppQuery,
  GetVirtualAppQueryVariables,
  UserType,
  VirtualAppType,
} from "../generated/graphql";
import { Firebase } from "../service/FirebaseService";
import { GlobalStyle } from "../styles/global";
import { newTheme } from "../styles/theme";
import VirtualAppId from "../utils/storage/VirtualAppId";

const Container = styled.section`
  width: 100vw;
  height: 100vh;

  overflow: hidden;

  display: flex;
  align-items: flex-start;
  justify-content: start;
`;

const AlertDialogWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;

const PagesWithoutSidebar = [
  "/",
  "/signup",
  "/apps",
  "/test-drive",
  "/start-test-drive",
];

// const UPLOADER_PAGES = ["/uploader-history", "/uploader", "/", "/apps"];

function MyApp() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(UserAtom);
  const [virtualApp, setVirtualApp] = useRecoilState(VirtualAppAtom);

  const client = useApolloClient();

  useEffect(() => {
    (async () => {
      const token = await Firebase.getIdToken();

      if (!token) router.push("/");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) return;

      const token = await Firebase.getIdToken();

      if (!token) {
        if (PagesWithoutSidebar.includes(router.pathname)) return;
        router.push("/");
        return;
      }

      try {
        let getUserResponse = await client.query<
          GetUserInfoQueryVariables,
          GetUserInfoQuery
        >({
          query: GET_USER,
        });

        if (getUserResponse.errors || !getUserResponse.data.getUser) {
          await Firebase.clearIdToken();
          router.push("/");
        } else {
          setUser(getUserResponse.data.getUser);

          const vAppId = VirtualAppId.get();

          if (router.pathname === "/" && !vAppId) {
            if ((getUserResponse.data.getUser as UserType).isFirstLogin)
              router.push("/test-drive");
            else router.push("/apps");
          }
        }
      } catch (e) {
        await Firebase.clearIdToken();
        router.push("/");
      }
      0;
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (virtualApp) return;

      const token = await Firebase.getIdToken();
      const vAppId = VirtualAppId.get();

      if (!vAppId && token) {
        router.push("/apps");
        return;
      } else if (!token) {
        if (PagesWithoutSidebar.includes(router.pathname)) return;
        VirtualAppId.clear();
        router.push("/");
        return;
      }

      try {
        let response = await client.query<
          GetVirtualAppQuery,
          GetVirtualAppQueryVariables
        >({
          query: GET_VIRTUAL_APP,
          variables: { virtualAppId: vAppId as string },
        });

        if (response.data.getVirtualApp) {
          setVirtualApp(response.data.getVirtualApp as VirtualAppType);

          if (router.pathname === "/") router.push("/menu-management");
          // if (router.pathname === "/") router.push("/uploader");
        } else {
          VirtualAppId.clear();

          router.push("/apps");
        }
      } catch (e) {
        VirtualAppId.clear();

        router.push("/apps");
      }
    })();
  }, [virtualApp]);

  return null;
}

function Root({ Component, pageProps }: AppProps) {
  //! ignore in-browser next.js recoil warnings until its fixed
  const mutedConsole = memoize((console) => ({
    ...console,
    warn: (...args: any) =>
      args[0].includes("Duplicate atom key") ? null : console.warn(...args),
  }));
  global.console = mutedConsole(global.console);

  const router = useRouter();

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await Firebase.getIdToken();

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const uploadLink = createUploadLink({
    uri: "https://cms-api.learnistic.com",
    // uri: "http://localhost:4000",
  });

  const client = new ApolloClient({
    // The `from` function combines an array of individual links
    // into a link chain
    link: from([authLink, errorLink, uploadLink as any]),
    cache: new InMemoryCache(),
  });

  const currentPath = router.asPath.split("?")[0];

  // useEffect(() => {
  //   if (UPLOADER_PAGES.includes(currentPath)) return;
  //   router.replace("/uploader");
  // }, [currentPath]);

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ChakraProvider theme={newTheme}>
          <SimpleReactLightbox>
            <MyApp />
            <Container>
              {!PagesWithoutSidebar.includes(currentPath) && (
                <FixedSidebarComponent />
              )}
              <Component {...pageProps} />
            </Container>
            <Global styles={GlobalStyle} />
          </SimpleReactLightbox>

          <AlertDialogWrapper>
            <DialogAlertProvider />
            <DialogConfirmProvider />
          </AlertDialogWrapper>
        </ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default Root;
