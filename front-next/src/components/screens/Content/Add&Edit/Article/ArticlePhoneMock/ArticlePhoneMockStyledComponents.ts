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

  svg {
    max-width: 100%;
  }
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
