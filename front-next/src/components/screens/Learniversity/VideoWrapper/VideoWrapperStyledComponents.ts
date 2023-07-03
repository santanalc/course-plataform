import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: fit-content;

  padding: 40px 32px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 40px;

  @media screen and (max-width: 768px) {
    padding: 32px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }
`;
