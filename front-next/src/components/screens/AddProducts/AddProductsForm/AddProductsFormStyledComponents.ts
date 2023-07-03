import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 72px);
  min-height: 100%;

  position: relative;

  overflow-y: auto;

  padding: 24px 24px 48px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;

  border-right: 1px solid var(--gray-200);

  > #styled-button {
    margin-left: auto;
  }

  > .line {
    width: 100%;

    margin: 24px 0;

    border: 1px solid var(--gray-200);
  }

  @media screen and (max-width: 600px) {
    padding: 32px 16px;
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
`;

export const LabelWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > label.optional {
    font-size: 12px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;
`;
