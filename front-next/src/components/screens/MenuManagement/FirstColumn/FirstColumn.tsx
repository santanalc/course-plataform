import { useApolloClient } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MenuAtom, MenuItemsAtom } from "../../../../atoms/MenuAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  MenuItemType,
  MenuType,
} from "../../../../generated/graphql";
import BreadcrumbTopBar from "./BreadcrumbTopBar";
import ComponentList from "./ComponentList";

const Container = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GET_MENU_PAGE_BY_PATH = gql`
  query GetMenuPageByPath($path: String!) {
    getMenuPageByPath(path: $path) {
      image
      imageTitle
      active
      link
    }
  }
`;

export const GET_MENU_ITEMS_BY_PATH = gql`
  query GetMenuItemsByPath($path: String!) {
    getMenuItemsByPath(path: $path) {
      id
      menuId
      name
      description
      order
      path
      type
      thumbnail
      active
      background
    }
  }
`;

export default function FirstColumn() {
  const setMenu = useSetRecoilState(MenuAtom);
  const setMenuItems = useSetRecoilState(MenuItemsAtom);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!virtualApp?.id) return;

      let response = await client.mutate<
        GetMenuPageByPathQuery,
        GetMenuPageByPathQueryVariables
      >({
        mutation: GET_MENU_PAGE_BY_PATH,
        variables: { path: `/menu/${virtualApp?.id}` },
      });

      if (response.data?.getMenuPageByPath) {
        setMenu(response.data?.getMenuPageByPath as MenuType);
      }
    })();

    (async () => {
      if (!virtualApp?.id) return;

      let response = await client.mutate<
        GetMenuItemsByPathQuery,
        GetMenuItemsByPathQueryVariables
      >({
        mutation: GET_MENU_ITEMS_BY_PATH,
        variables: { path: `/menu/${virtualApp?.id}` },
      });

      if (response.data?.getMenuItemsByPath) {
        setMenuItems(
          (response.data?.getMenuItemsByPath as MenuItemType[])
            .slice()
            .sort((a, b) => a.order - b.order)
        );
      }

      setIsLoading(false);
    })();
  }, [virtualApp?.id]);

  return (
    <Container>
      <BreadcrumbTopBar />
      {isLoading ? (
        <LoadingWrapper>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.300"
            size="xl"
          />
        </LoadingWrapper>
      ) : (
        <ComponentList />
      )}
    </Container>
  );
}
