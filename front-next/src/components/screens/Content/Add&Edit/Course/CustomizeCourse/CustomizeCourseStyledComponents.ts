import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 136px);

  position: relative;

  overflow-y: auto;

  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;

  border-right: 1px solid var(--gray-200);

  > .divider {
    width: 100%;
    height: 1px;
    background-color: var(--gray-200);

    padding: 0.5px;
    margin: 24px 0;
  }

  @media screen and (max-width: 600px) {
    padding: 16px 24px;
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

export const MainLabelWrapper = styled(LabelWrapper)`
  margin-bottom: 24px;

  > label {
    font-size: 16px;
  }
`;

export const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Help = styled.div`
  display: flex;
  justify-self: start;
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 15px;

  svg {
    width: 20px;
    height: 20px;
  }
`;
