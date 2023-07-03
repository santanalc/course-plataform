import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  width: 100%;

  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > #styled-button {
    margin-top: 16px;

    width: 100%;
  }

  > .link-button {
    margin-top: 32px;

    font-size: 16px;
    font-weight: 600;
    color: var(--orange-300);

    &:hover {
      text-decoration: underline;
    }
  }
`;
