import styled from "@emotion/styled";

export const Card = styled.div<{
  backgroundColor?: string;
  highlightColor?: string;
}>`
  width: 100%;
  height: 112px;

  padding: 20px;

  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  cursor: pointer;

  z-index: 99;

  &.highlighted {
    background: ${(props) =>
      props.highlightColor ? props.highlightColor : "#fde7ca"};
  }

  &.non-brightness {
    filter: brightness(0.32);
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .card-description {
    font-size: 16px;
    font-weight: 400;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .shimmer-icon {
    width: 88px;
    height: 88px;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    flex-shrink: 0;
  }

  .shimmer-text-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    grid-gap: 8px;

    > .shimmer-title {
      width: 160px;
      height: 18px;

      border-radius: 32px;
    }

    > .shimmer-description {
      width: 100%;
      height: 18px;

      border-radius: 32px;
    }
  }
`;

export const IconWrapper = styled.div`
  width: 88px;
  height: 88px;

  flex-shrink: 0;

  position: relative;

  overflow: hidden;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

  .inactive-wrapper {
    width: 100%;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #bbbbbb;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
  }
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  object-position: center;
  object-fit: cover;
`;

export const IconFake = styled.div`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  background: #2f2f2f;
`;
