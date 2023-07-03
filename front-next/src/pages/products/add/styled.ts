import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const Wrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: minmax(480px, 1200px) minmax(672px, auto);
`;

export default () => null;
