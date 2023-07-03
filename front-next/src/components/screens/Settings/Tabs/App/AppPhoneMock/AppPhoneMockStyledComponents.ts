import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  background: #f4f4f4;

  padding: 48px 64px 0 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  .mobile-status-bar {
    max-width: 100%;
  }
`;

export const SpinnerContainer = styled.div`
  width: 100%;

  background: #f4f4f4;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MobileImageWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  position: relative;
`;

export const MobileImage = styled.img`
  width: 640px;
  height: 100%;

  z-index: 99;
`;

export const ContentWrapper = styled.div<{ color?: string }>`
  max-width: 556px;
  width: 100%;
  height: 764px;

  background: ${(props) => (props.color ? props.color : "#2f2f2f")};

  overflow-y: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: absolute;
`;

export const StatusBar = styled.div<{ color?: string }>`
  width: 100%;
  height: 64px;

  background: ${(props) => (props.color ? props.color : "#2f2f2f")};

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 600;
  color: white;

  flex-shrink: 0;
`;

export const MobileNavigationBarWrapper = styled.div`
  width: 100%;
  height: 96px;

  padding: 0 48px;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;

  position: relative;

  svg {
    width: 40px;
    height: 40px;

    color: #ffffff;

    z-index: 9;
  }

  flex-shrink: 0;
`;

export const MobileNavigationBarBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 8;
`;

export const Body = styled.div<{ color?: string }>`
  width: 100%;
  height: 100%;

  overflow-y: hidden;

  background: ${(props) => (props.color ? props.color : "#ffffff")};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`;

export const Card = styled.div<{ color?: string }>`
  width: 100%;
  height: 112px;

  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  cursor: pointer;

  z-index: 99;

  &.highlighted {
    background: ${(props) => (props.color ? props.color : "#fde7ca")};
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

  .text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
  }
`;

export const IconWrapper = styled.div`
  width: 88px;
  height: 88px;

  flex-shrink: 0;

  overflow: hidden;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;
`;

export const IconFake = styled.div`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  background: #e2e2e2;
`;
