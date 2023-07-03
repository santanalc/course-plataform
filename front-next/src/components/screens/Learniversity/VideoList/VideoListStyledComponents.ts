import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 16px;

  > .video-list-title {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-700);
  }
`;

export const VideoListWrapper = styled.div`
  width: 100%;

  padding-bottom: 16px;

  display: flex;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 32px;

  overflow-x: auto;

  scroll-snap-type: x mandatory;

  -webkit-overflow-scrolling: touch;

  ::-webkit-scrollbar {
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    height: 8px;
    border: 8px;
  }

  ::-webkit-scrollbar-track {
    height: 8px;
  }
`;
