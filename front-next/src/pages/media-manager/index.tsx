import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { SRLWrapper } from "simple-react-lightbox";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import StyledIconButton from "../../components/global/StyledIconButton";
import MediaManagerFilterBar from "../../components/screens/MediaManager/MediaManagerFilterBar/MediaManagerFilterBar";
import MediaGrid from "../../components/screens/MediaManager/MediaGrid/MediaGrid";
import MediaList from "../../components/screens/MediaManager/MediaList/MediaList";
import MediaManagerSidebarFilter from "../../components/screens/MediaManager/MediaManagerSidebarFilter/MediaManagerSidebarFilter";
import * as SC from "./styled";

export default function MediaManager() {
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const options = {
    caption: {
      captionColor: "#ffffff",
      captionContainerPadding: "16px 0 16px 0",
      captionFontFamily: "Raleway, sans-serif",
      captionFontWeight: "400",
      captionTextTransform: "uppercase",
    },
    thumbnails: {
      showThumbnails: true,
      thumbnailsAlignment: "center",
      thumbnailsContainerBackgroundColor: "transparent",
      thumbnailsContainerPadding: "0",
      thumbnailsGap: "1px",
      thumbnailsIconColor: "#ffffff",
      thumbnailsOpacity: 0.4,
      thumbnailsPosition: "bottom",
      thumbnailsSize: ["100px", "80px"],
    },
  };

  return (
    <>
      <SeoHead pageName="Media Manager" />
      <SC.Container>
        <TopBar
          title="Media Manager"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Media Manager video"
            />
          }
        />
        <MediaManagerFilterBar
          isGridView={isGridView}
          setIsGridView={setIsGridView}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <SC.Wrapper>
          <SRLWrapper options={options}>
            {isGridView ? <MediaGrid /> : <MediaList />}
          </SRLWrapper>
        </SC.Wrapper>
        <MediaManagerSidebarFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </SC.Container>
    </>
  );
}
