import React, { useState } from "react";
import VideoPopover from "../VideoPopover/VideoPopover";
import * as SC from "./VideoCardStyledComponents";
import { FaRegHeart } from "react-icons/fa";
import useDebounce from "../../../../../hooks/useDebounce";
import { Tooltip } from "@chakra-ui/react";

type VideoCardProps = {
  videoName: string;
  videoDescription: string;
};

export default function VideoCard({
  videoName,
  videoDescription,
}: VideoCardProps) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const debouncedIsPopoverVisible = useDebounce(isPopoverVisible, 300);
  const [percent, setPercent] = useState("0");

  return (
    <VideoPopover
      isOpen={debouncedIsPopoverVisible as boolean}
      setIsOpen={setIsPopoverVisible}
      percent={percent}
      setPercent={setPercent}
      videoName={videoName}
      videoDescription={videoDescription}
    >
      <SC.Container>
        {percent === "100" && (
          <Tooltip hasArrow placement="top" label="Watched video">
            <div
              data-tip
              data-for="success-checkmark"
              className="success-checkmark"
            >
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
          </Tooltip>
        )}
        <SC.VideoThumb
          onMouseEnter={() => setIsPopoverVisible(true)}
          onMouseLeave={() => setIsPopoverVisible(false)}
        />
        <SC.VideoInfoWrapper>
          <p className="video-name">{videoName}</p>
          <FaRegHeart className="FaRegHeart" />
        </SC.VideoInfoWrapper>
      </SC.Container>
    </VideoPopover>
  );
}
