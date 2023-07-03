import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const PopoverContentCSS = css`
  width: 320px;

  padding: 0;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px !important;
  overflow: hidden;
`;

export const PopoverBodyCSS = css`
  width: 100%;

  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 8px;

  .video-description {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ProgressCSS = css`
  width: 100%;

  border-radius: 16px;

  > div {
    background-image: linear-gradient(
      -90deg,
      var(--orange-300) 0%,
      var(--orange-600) 50%,
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
`;

export const VideoThumb = styled.div`
  width: 100%;

  background: #dddddd;
`;

export const PopoverHeaderWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  grid-gap: 16px;

  > svg {
    width: 20px;
    height: 20px;
    color: var(--gray-400);
  }

  .FaRegHeart {
    display: none;
  }
`;

export const PopoverInfoWrapper = styled.span`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 8px;

  > .video-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  > .video-status {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const ProgressWrapper = styled.span`
  width: 100%;

  margin-top: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > .number-progress {
    font-size: 14px;
    font-weight: 600;
    color: var(--orange-300);
  }
`;
