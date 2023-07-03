import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  background: #f4f4f4;

  padding: 48px 64px 0 64px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
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

  .mobile-status-bar {
    max-width: 100%;
  }
`;

export const StatusBar = styled.div<{ color?: string }>`
  width: calc(100% - 2px);
  height: 64px;

  margin: 0 auto;
  padding: 0 24px;

  background: ${(props) => (props.color ? props.color : "#2f2f2f")};

  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-shrink: 0;

  z-index: 99;

  > .breadcumb-text {
    margin: 0 auto;

    font-size: 24px;
    font-weight: 600;
    color: white;
  }

  > .empty-div {
    width: 24px;
    height: 24px;
  }
`;

export const BackButtonWrapper = styled.button`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;

    color: white;
  }
`;
