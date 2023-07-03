import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 72px);

  padding: 48px;

  border-right: 1px solid var(--gray-200);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  overflow-y: auto;

  @media screen and (max-width: 1140px) {
    padding: 40px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 16px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;

  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;

  z-index: 100;
`;

export const ButtonContainer = styled.div`
  width: 100% ;
  margin-top: 20px;
  

`

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

  &.flex {
    justify-content: start;
    flex-direction: row;
    grid-gap: 16px;
  }
`;
