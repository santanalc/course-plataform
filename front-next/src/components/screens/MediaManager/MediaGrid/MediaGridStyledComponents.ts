import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;

  padding: 24px 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 40px 32px;
  align-items: center;
  justify-content: center;
`;
