import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 136px);
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  border-right: 1px solid var(--gray-200);
`;

export const Header = styled.div`
  width: 100%;
  min-height: 72px;
  max-height: 72px;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-200);

  > .title {
    font-size: 18px;
    font-weight: 700;
    color: #2f2f2f;
  }

  > svg {
    width: 24px;
    height: 24px;

    cursor: pointer;

    color: var(--gray-400);
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;

  padding: 24px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }
`;

export const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;

  > .divider {
    width: 100%;
    height: 1px;
    background-color: var(--gray-200);

    padding: 0.5px;
    margin: 24px 0;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const ButtonWrapper = styled.span`
  width: 100%;
  height: fit-content;

  display: flex;

  align-items: center;
  justify-content: end;
  grid-gap: 16px;
`;
