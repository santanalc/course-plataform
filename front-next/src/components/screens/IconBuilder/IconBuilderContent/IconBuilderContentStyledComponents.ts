import styled from "@emotion/styled";

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  height: 100%;

  margin: auto;

  background: #000000;

  display: flex;
  align-items: center;
  justify-content: center;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat; 

`;

export const IconContainer = styled.div`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  height: 100%;

  margin: auto;

  background: #000000;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 300px;
    height: 300px;
    color: white;
  }
`;

export const BottomBar = styled.div`
  width: 100%;
  max-height: 64px;
  min-height: 64px;

  border-top: 1px solid var(--gray-200);

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .download-icon-button {
    font-size: 16px;
    font-weight: 700;
    color: var(--gray-400);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PercentageButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 48px 24px;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  > button {
    width: 24px;
    height: 24px;

    background: white;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 16px;
      height: 16px;

      color: var(--gray-400);
    }

    transition: all 0.3s ease-in-out;

    &:hover {
      filter: brightness(0.96);
    }
  }

  > .label {
    font-size: 16px;
    color: var(--gray-400);
    text-align: center;
  }
`;
