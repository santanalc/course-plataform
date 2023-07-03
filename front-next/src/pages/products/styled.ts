import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: relative;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 129px);
  min-height: 100%;

  padding: 0 24px;

  overflow-y: auto;

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: fit-content;

  padding: 24px 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: start;
  grid-gap: 32px 48px;

  @media screen and (max-width: 1460px) {
    grid-gap: 16px 24px;
  }

  @media screen and (max-width: 1140px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default () => null;
