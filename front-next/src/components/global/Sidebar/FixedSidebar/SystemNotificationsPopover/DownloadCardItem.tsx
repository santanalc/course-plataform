import { Progress } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import { IFile } from "../../../../../atoms/UploadFilesAtom";

const DownloadCardItemContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 16px;

  position: relative;

  &:hover {
    .cancel-video {
      visibility: visible;
    }
  }

  .image-wrapper {
    max-width: 80px;
    min-width: 80px;
    height: 48px;
    border-radius: 4px;

    background: black;
  }

  .text-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;

    .file-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--gray-700);

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .done-video {
    width: 24px;
    height: 24px;

    flex-shrink: 0;
    color: var(--green-300);
  }

  .play-video {
    width: 24px;
    height: 24px;

    flex-shrink: 0;
    color: var(--orange-300);

    cursor: pointer;
  }

  .pause-video {
    width: 24px;
    height: 24px;

    flex-shrink: 0;
    color: #abb5b9;

    cursor: pointer;
  }

  .cancel-video {
    width: 24px;
    height: 24px;

    visibility: hidden;

    position: absolute;
    top: -12px;
    left: 64px;

    flex-shrink: 0;
    color: #c41700;

    cursor: pointer;
  }
`;

const ProgressWrapper = styled.span<{ isFinished: boolean }>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  > .number-progress {
    font-size: 14px;
    font-weight: 600;
  }

  > .download-progress-bar {
    width: 100%;

    border-radius: 16px;

    > div {
      background-image: linear-gradient(
        -90deg,
        var(--orange-300) 0%,
        var(--orange-400) 50%,
        var(--orange-300) 100%
      );
      background-size: 400% 400%;

      animation: shimmer 1.2s ease-in-out infinite;

      @keyframes shimmer {
        0% {
          background-position: 0% 0%;
        }
        100% {
          background-position: -135% 0%;
        }
      }
    }
  }

  ${(props) =>
    props.isFinished &&
    css`
      > .download-progress-bar {
        > div {
          background-image: linear-gradient(
            -90deg,
            var(--green-300) 0%,
            var(--green-300) 50%,
            var(--green-300) 100%
          );
        }
      }

      > .number-progress {
        color: var(--green-300);
      }
    `}
`;

interface Props {
  file: IFile;
  fileId: string;
}

const FULL_PERCENTAGE = "100.00";

export default function DownloadCardItem(props: Props) {
  const [isDownloadPaused, setIsDownloadPaused] = useState(false);

  return (
    <DownloadCardItemContainer>
      {/* <FaTimesCircle className="cancel-video" /> */}
      <img className="image-wrapper" src={props.file.thumbnail} />
      <span className="text-wrapper">
        <p className="file-name">{props.file.fileName}</p>
        <ProgressWrapper isFinished={props.file.percentage === FULL_PERCENTAGE}>
          <Progress
            className="download-progress-bar"
            width="100%"
            value={parseInt(props.file.percentage)}
            isAnimated
          />
          <p className="number-progress">{props.file.percentage}%</p>
        </ProgressWrapper>
      </span>
      {props.file.status === "COMPLETED" ||
      props.file.status === "ENCODING" ||
      props.file.status === "TRANSCODING" ? (
        ""
      ) : isDownloadPaused ? (
        <FaRegPlayCircle
          onClick={() => {
            props.file.pauseResume();
            setIsDownloadPaused(false);
          }}
          className="play-video"
        />
      ) : (
        <FaRegPauseCircle
          onClick={() => {
            props.file.pauseResume();
            setIsDownloadPaused(true);
          }}
          className="pause-video"
        />
      )}
    </DownloadCardItemContainer>
  );
}
