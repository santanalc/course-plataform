import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 136px);
  overflow: hidden;

  display: grid;
  grid-template-columns: minmax(480px, 1280px) minmax(672px, auto);
`;

export const AddContentWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const BottomBar = styled.div`
  width: 100%;
  height: 64px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  position: absolute;
  bottom: 0;
`;

export const ButtonBottomBar = styled.button`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: filter 0.3s ease-in-out;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    filter: brightness(0.8);
  }
`;

export const ButtonLabelWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  > .circle-label {
    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: white;

    border-radius: 50%;

    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    color: var(--gray-700);
  }

  > .button-label {
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    color: white;
  }
`;

export default () => null;
