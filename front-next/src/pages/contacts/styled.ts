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

  padding: 0 48px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  overflow-y: auto;

  @media screen and (max-width: 1140px) {
    padding: 0 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 72px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => null;
