import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Progress } from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";

const ProgressCSS = css`
  width: 100%;

  border-radius: 16px;

  > div {
    background-image: linear-gradient(
      -90deg,
      var(--blue-300) 0%,
      var(--blue-400) 50%,
      var(--blue-300) 100%
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
`;

const Container = styled.li`
  width: 100%;
  height: 80px;

  background-color: #fff;

  padding: 16px 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const DragIconContainer = styled.div`
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  cursor: grab;

  &:hover {
    svg {
      color: #bbbbbb;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    color: #cecece;

    transition: color 0.2s ease-in-out;
  }
`;

const ProgressInfoWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

const FirstColumnWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 4px;

  > .file-name {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const StatusWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > .file-size,
  .progress-label {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

const UploadFailedWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  > p {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }

  > button {
    font-size: 14px;
    font-weight: 600;
    color: var(--orange-300);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function FileUploadCard() {
  function getIcon(selected: string) {
    if (selected === "success")
      return <FaCheckCircle color="var(--green-300)" />;
    if (selected === "error") return <FaExclamationCircle color="#c41700" />;
    if (selected === "loading")
      return <FaTimesCircle color="var(--gray-300)" />;
    return <FaTimesCircle color="var(--gray-300)" />;
  }

  return (
    <Container>
      <DragIconContainer>
        <HiMenu />
      </DragIconContainer>
      <ProgressInfoWrapper>
        <FirstColumnWrapper>
          <h2 className="file-name">video-course-1.mp4</h2>
          <Progress width="100%" size="sm" value={55} css={ProgressCSS} />
          <StatusWrapper>
            <p className="file-size">450mb</p>
            <p className="progress-label">55%</p>
            {/* <UploadFailedWrapper>
              <p className="text">Upload failed</p>
              <button>Retry</button>
            </UploadFailedWrapper> */}
          </StatusWrapper>
        </FirstColumnWrapper>
        {getIcon("loading")}
      </ProgressInfoWrapper>
    </Container>
  );
}
