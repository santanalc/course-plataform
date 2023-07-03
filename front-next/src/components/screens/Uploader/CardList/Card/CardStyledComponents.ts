import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ProgressCSS = css`
  width: 100%;

  border-radius: 16px;
  background: var(--gray-300);

  > div {
    background-image: linear-gradient(
      -90deg,
      var(--blue-300) 0%,
      var(--blue-400) 50%,
      var(--blue-300) 100%
    );

    background-size: 400% 400%;

    animation: shimmer 2s ease-in-out infinite;

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

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 5px;
`;
interface ContainerProps {
  waiting: boolean;
}

export const Container = styled.li<ContainerProps>`
  width: 100%;
  height: 100px;

  position: relative;
  background-color: ${(props) =>
    props.waiting ? "#ffffff" : "rgba(241, 241, 241, 0.8)"};

  padding: 16px 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;
  border: 1px solid #d8d8d8;
  opacity: ${(props) => (props.waiting ? 1 : 0.8)};
`;

export const DragIconContainer = styled.div`
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

export const ProgressInfoWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

export const FirstColumnWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 6px;

  > .file-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const StatusWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .flex {
    display: flex;
    align-items: center;
  }

  .ml {
    margin-left: 5px;
  }

  > .file-size,
  .progress-label {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const UploadFailedWrapper = styled.span`
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

export const CloseWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 24px;

  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  position: absolute;
  top: -10px;
  right: -10px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px -1px 2px 0px,
    rgba(0, 0, 0, 0.06) -1px 1px 1px 1px;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DownloadStatusWrapper = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;
