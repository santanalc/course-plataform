import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Slider from "react-slick";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserAtom } from "../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  GetVirtualAppQuery,
  GetVirtualAppQueryVariables,
} from "../../../../generated/graphql";
import useDebounce from "../../../../hooks/useDebounce";
import VirtualAppId from "../../../../utils/storage/VirtualAppId";
import StyledInput from "../../../global/StyledInput";
import AppCard from "../AppCard/AppCard";
import * as SC from "./AppListStyledComponents";

export const GET_VIRTUAL_APP = gql`
  query getVirtualApp($virtualAppId: String!) {
    getVirtualApp(virtualAppId: $virtualAppId) {
      description
      id
      userId
      name
      activationLink
      activationStatus
      appStatus
      logo
      backgroundColor
      ctaColor
      highlightColor
      titleBarColor
      bottomBarPref
      bottombarHidden
      notificationIntervalHour
      mediaHost
    }
  }
`;

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <SC.SlickArrowButton {...props}>
    <FiArrowLeft />
  </SC.SlickArrowButton>
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <SC.SlickArrowButton {...props}>
    <FiArrowRight />
  </SC.SlickArrowButton>
);

export default function AppsList() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    rows: 2,
    slidesPerRow: 1,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };
  const router = useRouter();
  const client = useApolloClient();
  const user = useRecoilValue(UserAtom);
  const setVirtualApp = useSetRecoilState(VirtualAppAtom);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("first_time");
  const [virtualApps, setVirtualApps] = useState<any[]>([]);
  const searchDebouced = useDebounce(search, 300);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (!user || !user.virtualApps) return;
    setVirtualApps(
      user.virtualApps.filter(
        (v) => v?.mediaHost === 1 || v?.mediaHost === 2
      ) || []
    );
  }, [user]);

  useEffect(() => {
    if (search === "first_time" || !user || !user.virtualApps) return;
    const virtualAppFromFilter = user?.virtualApps?.filter((vApp: any) => {
      return (
        vApp.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
        (vApp.mediaHost === 1 || vApp.mediaHost === 2)
      );
    });
    setVirtualApps(
      search === ""
        ? user.virtualApps.filter(
            (v) => v?.mediaHost === 1 || v?.mediaHost === 2
          )
        : virtualAppFromFilter
    );
  }, [searchDebouced]);

  async function handleSubmit(virtualAppId: string) {
    let response = await client.query<
      GetVirtualAppQuery,
      GetVirtualAppQueryVariables
    >({
      query: GET_VIRTUAL_APP,
      variables: { virtualAppId },
    });

    if (response.data.getVirtualApp) {
      setVirtualApp(response.data.getVirtualApp as any);
      VirtualAppId.set(response.data.getVirtualApp.id);

      router.push("/menu-management");
      // router.push("/uploader");
    }
  }

  useEffect(() => {
    const currentPath = router.asPath;
    if (!currentPath.includes("?mode=login")) {
      setLoading(false);

      if (
        user?.virtualApps?.filter(
          (v) => v?.mediaHost === 1 || v?.mediaHost === 2
        ).length === 0
      ) {
        setWarning(true);
      }

      return;
    }

    if (
      user?.virtualApps?.filter((v) => v?.mediaHost === 1 || v?.mediaHost === 2)
        .length === 1
    ) {
      handleSubmit(
        user.virtualApps.filter(
          (v) => v?.mediaHost === 1 || v?.mediaHost === 2
        )[0]!.id
      );
    } else if (
      user?.virtualApps?.filter((v) => v?.mediaHost === 1 || v?.mediaHost === 2)
        .length === 0
    ) {
      setWarning(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <SC.Container>
      {!loading && (
        <>
          {warning ? (
            <h1 className="title">
              Your app is not enabled to use this uploader tool yet, please
              email helpdesk at help@learnistic.com if you wish to request it.
            </h1>
          ) : (
            <>
              <h1 className="title">Select App</h1>
              <StyledInput
                placeholder="Search"
                hasIcon
                onChange={(e) => setSearch(e.target.value)}
                handleClearInput={() => setSearch("")}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Ensure it is only this code that runs

                    if (virtualApps.length === 1) {
                      setLoading(true);
                      handleSubmit(virtualApps[0].id || "");
                    }
                  }
                }}
              />
              <SC.Wrapper>
                <Slider {...settings} className="card-container">
                  {virtualApps.map((card, index) => (
                    <AppCard
                      onClick={(e) => {
                        setLoading(true);
                        handleSubmit(card?.id || "");
                      }}
                      key={card?.id || index}
                      name={card?.name || ""}
                      img={card?.logo || ""}
                      background={card?.backgroundColor || ""}
                    />
                  ))}
                </Slider>
              </SC.Wrapper>
            </>
          )}
        </>
      )}
    </SC.Container>
  );
}
