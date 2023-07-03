import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;

  background: linear-gradient(#4199cf, #2f75b6);

  position: relative;
`;

export const Image = styled.img`
  position: absolute;
  bottom: 48px;
  left: 48px;
  cursor: pointer;
`;

export const Logout = styled.div`
  position: absolute;
  bottom: 48px;
  right: 48px;
  cursor: pointer;
  opacity: 0.4;

  :hover{
    opacity: 0.6;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100%;

  padding: 0 48px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1140px) {
    padding: 0 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export default () => null;
