import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 129px);
  min-height: 100%;

  display: grid;
  grid-template-columns: 360px 1fr 360px;
  align-items: flex-start;
  justify-content: start;

  overflow-y: hidden;
`;

export default () => null;
