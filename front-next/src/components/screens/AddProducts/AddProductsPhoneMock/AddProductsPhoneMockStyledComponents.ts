import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  max-height: calc(100vh - 72px);

  background: #f4f4f4;

  padding: 48px 48px 0;

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
`;

export const MobileImage = styled.img`
  width: 640px;
  height: 100%;
`;
