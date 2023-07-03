import React, { Fragment, useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import * as SC from "./VideoPopoverStyledComponents";
import { FaRegHeart } from "react-icons/fa";
import useMediaQuery from "../../../../../hooks/useMediaQuery";
import Vimeo from "@u-wave/react-vimeo";

type VideoPopoverProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  percent: string;
  setPercent: React.Dispatch<React.SetStateAction<string>>;
  videoName: string;
  videoDescription: string;
};

export default function VideoPopover({
  children,
  isOpen,
  setIsOpen,
  percent,
  setPercent,
  videoName,
  videoDescription,
}: VideoPopoverProps) {
  const isLargerThan720 = useMediaQuery("(min-width: 720px)");
  const [duration, setDuration] = useState<number>();
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function secondsToHMS(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";
    var sDisplay = s > 0 ? s + "s " : "";
    return hDisplay + mDisplay + sDisplay;
  }

  useEffect(() => {
    (async () => {
      setVideoURL(
        videoURL
          ? "https://player.vimeo.com/video/598614145"
          : "https://player.vimeo.com/video/598614145"
      );
      setIsLoading(false);
    })();
  }, []);

  return (
    <Popover
      isOpen={isOpen}
      placement={isLargerThan720 ? "right-end" : "top-start"}
    >
      {() => (
        <Fragment>
          <PopoverTrigger>{children}</PopoverTrigger>
          <PopoverContent
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            css={SC.PopoverContentCSS}
          >
            <SC.VideoThumb>
              {isLoading ? (
                <Spinner size="lg" color="orange.50" />
              ) : (
                <Vimeo
                  paused={true}
                  showTitle={false}
                  video={"https://vimeo.com/90509568"}
                  width="320px"
                  onTimeUpdate={(event) => {
                    const percent = event.percent * 100;
                    setPercent(percent.toFixed(0).toString());
                  }}
                  onReady={(event) => {
                    event.getDuration().then((data) => setDuration(data));
                  }}
                  color="fb972e"
                />
              )}
            </SC.VideoThumb>

            <PopoverBody css={SC.PopoverBodyCSS}>
              <SC.PopoverHeaderWrapper>
                <SC.PopoverInfoWrapper>
                  <p className="video-name">{videoName}</p>
                  <p className="video-status">
                    {secondsToHMS(duration!)} • Oct 10, 2021
                  </p>
                </SC.PopoverInfoWrapper>
                <FaRegHeart className="FaRegHeart" />
              </SC.PopoverHeaderWrapper>
              <p className="video-description">{videoDescription}</p>
              <SC.ProgressWrapper>
                <p className="number-progress">{percent}%</p>
                <Progress
                  width="100%"
                  value={parseInt(percent)}
                  css={SC.ProgressCSS}
                />
              </SC.ProgressWrapper>
            </PopoverBody>
          </PopoverContent>
        </Fragment>
      )}
    </Popover>
  );
}
