import styled from "@emotion/styled";

export const FormContentColorTheme = styled.div`
  width: 100%;
  height: fit-content;

  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  @media screen and (max-width: 1760px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const FormWrapperDisabledInput = styled.div`
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
