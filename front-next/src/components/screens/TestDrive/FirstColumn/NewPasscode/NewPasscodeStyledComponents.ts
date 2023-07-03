import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 32px;

  .text {
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    text-align: center;
  }
`;

export const PasscodeInputsWrapper = styled.div`
  width: 352px;
`;
