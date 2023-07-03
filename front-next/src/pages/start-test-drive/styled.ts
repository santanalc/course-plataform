import styled from "@emotion/styled";

export const Container = styled.main`
  width: 100%;
  min-height: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  position: relative;

  .image-logo {
    position: absolute;
    top: 48px;
    left: 48px;

    @media (max-width: 1600px) and (max-height: 730px) {
      top: 24px;
      left: 24px;
    }
  }

  @media (max-width: 1280px) and (max-height: 970px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1280px) and (max-height: 790px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PhoneWrapper = styled.div`
  width: 100%;
  max-height: 100vh;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  position: relative;

  .image-mobile {
    z-index: 1;

    @media (max-width: 1280px) and (max-height: 970px) {
      max-width: 560px;
      width: 100%;
    }

    @media (max-width: 1760px) and (max-height: 790px) {
      max-width: 480px;
      width: 100%;
    }

    @media (max-width: 1600px) and (max-height: 730px) {
      max-width: 400px;
      width: 100%;
    }
  }

  .image-background {
    min-width: 1600px;
    max-width: 1600px;

    z-index: 0;

    position: fixed;
    bottom: -560px;
    right: -640px;
  }
`;

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 160px 16px 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  z-index: 9;

  @media (max-width: 1600px) {
    padding: 112px 16px 48px;
  }

  @media (max-width: 1280px) and (max-height: 970px) {
    max-width: 640px;

    flex-shrink: 0;
  }

  @media (max-width: 1280px) and (max-height: 790px) {
    max-width: 640px;

    flex-shrink: 0;
  }

  @media (max-width: 1600px) and (max-height: 730px) {
    padding: 96px 16px 24px;
  }
`;

export default () => null;
