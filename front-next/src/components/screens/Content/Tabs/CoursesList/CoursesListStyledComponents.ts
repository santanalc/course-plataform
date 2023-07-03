import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: fit-content;

  padding: 24px 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: start;
  grid-gap: 32px 48px;

  @media screen and (max-width: 1460px) {
    grid-gap: 16px 24px;
  }

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ShimmerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 16px;
`;

export const ShimmerImageWrapper = styled.div`
  width: 72px;
  height: 72px;

  flex-shrink: 0;

  position: relative;

  overflow: hidden;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

  .image {
    width: 100%;
    height: 100%;
  }
`;

export const ShimmerTextWrapper = styled.span`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 16px;

  .title {
    width: 160px;
    height: 24px;
    border-radius: 4px;
  }

  .description {
    width: 320px;
    height: 24px;
    border-radius: 4px;
  }
`;
