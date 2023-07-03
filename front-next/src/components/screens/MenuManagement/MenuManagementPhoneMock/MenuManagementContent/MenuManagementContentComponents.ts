import styled from "@emotion/styled";

export const BannerWrapper = styled.div`
  width: 100%;
  min-height: 344px;

  background: #2f2f2f;

  background-image: url("/menu-management/empty-banner-details.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  .banner-text-wrapper {
    max-width: 400px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 8px;

    text-align: center;

    > .title {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
      opacity: 0.5;
    }

    > .text {
      font-size: 18px;
      font-weight: 400;
      color: #fff;
      opacity: 0.5;
    }
  }

  flex-shrink: 0;
`;

export const BannerImage = styled.img`
  width: 100%;
  min-height: 344px;

  object-fit: cover;
  object-position: center;
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: fit-content;

  overflow-y: auto;

  z-index: 99;
`;
