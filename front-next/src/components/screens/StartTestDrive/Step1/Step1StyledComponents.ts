import styled from "@emotion/styled";

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > .title {
    font-size: 64px;
    line-height: 80px;
    font-weight: 900;
    color: #2f2f2f;
    text-align: center;

    @media (max-width: 1760px) and (max-height: 970px) {
      font-size: 56px;
      line-height: 72px;
    }

    @media (max-width: 1440px) and (max-height: 970px) {
      font-size: 48px;
      line-height: 64px;
    }

    @media (max-width: 1280px) and (max-height: 970px) {
      font-size: 40px;
      line-height: 56px;
    }

    @media (max-width: 1760px) and (max-height: 790px) {
      font-size: 40px;
      line-height: 56px;
    }

    @media (max-width: 1600px) and (max-height: 730px) {
      font-size: 40px;
      line-height: 56px;
    }

    //! Ipad PRO style
    @media (min-width: 1356px) and (min-height: 1014px) {
      font-size: 56px;
      line-height: 72px;
    }
  }
`;

export const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 24px;

  .styled-passcode-input {
    width: 64px;
    height: 72px;
  }

  .form-elements-wrapper {
    width: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    grid-gap: 24px;
  }

  > .text {
    font-size: 16px;
    font-weight: 400;
    color: #2f2f2f;
    text-align: center;

    margin-bottom: 16px;
  }

  #styled-button {
    height: 48px;

    margin: 16px 0 0;

    flex: 1;

    font-size: 18px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  .react-tel-input {
    .country-input {
      height: 48px !important;

      border-radius: 32px !important;

      font-size: 16px !important;
    }
  }

  #styled-input {
    height: 48px;

    border-radius: 32px;

    font-size: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }

  > label {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;
