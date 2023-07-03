import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  height: fit-content;

  padding: 48px;
  margin: 48px auto;

  border: 1px solid var(--gray-200);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  @media screen and (max-width: 1140px) {
    padding: 40px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 16px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  grid-gap: 4px;

  border-bottom: 1px solid var(--gray-200);
  padding-bottom: 32px;
  margin-bottom: 32px;

  > .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const Content = styled.div`
  width: 100%;
  height: fit-content;

  padding: 0 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 24px;

  > .title {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    margin-bottom: 32px;

    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }

  > .divider {
    width: 100%;
    height: 1px;
    background-color: var(--gray-200);

    padding: 0.5px;
    margin: 24px 0;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const FormContentFlex = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;
`;

export const FormContentGrid = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
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

export const ButtonsWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 16px;
`;
