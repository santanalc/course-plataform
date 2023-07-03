import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 141px);

  overflow-y: auto;

  padding: 56px 64px calc(56px + 96px);

  background: #f4f4f4;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: relative;
`;

export const TermsOfServiceWrapper = styled.div`
  width: 100%;

  background: white;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  padding: 48px 56px;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  text-align: left;

  color: #000000;

  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const ButtonsWrapper = styled.div`
  height: 96px;

  border-top: 1px solid #e2e2e2;

  background: white;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: end;
  grid-gap: 16px;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 780px;
`;
