import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 129px);

  padding: 48px;

  border-right: 1px solid var(--gray-200);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  overflow-y: auto;

  .shimmer {
    height: 24px;

    border-radius: 4px;
  }

  @media screen and (max-width: 1140px) {
    padding: 40px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 16px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  grid-gap: 4px;

  border-bottom: 1px solid var(--gray-200);
  padding-bottom: 32px;
  margin-bottom: 32px;

  > .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0 auto;

  .avatar-name {
    margin: 16px 0 0;

    font-size: 20px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const AvatarWrapper = styled.div`
  width: 128px;
  height: 128px;

  border-radius: 32px;
  background: var(--gray-200);

  position: relative;

  .icon-wrapper {
    width: fit-content;
    height: fit-content;

    border: 2px solid white;
    border-radius: 50%;

    position: absolute;
    top: -8px;
    right: -8px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: fit-content;

  padding: 0 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > .title {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    margin-bottom: 32px;

    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }

  > .divider {
    width: 100%;
    height: 1px;
    background-color: var(--gray-200);

    padding: 0.5px;
    margin: 24px 0;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const FormContentColorTheme = styled.div`
  width: 100%;
  height: fit-content;

  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  @media screen and (max-width: 1760px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;
`;

export const FormWrapper = styled.div<{ dontHaveBorderBottom?: boolean }>`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: 192px 1fr;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  padding-bottom: ${(props) => (props.dontHaveBorderBottom ? "unset" : "24px")};
  border-bottom: ${(props) =>
    props.dontHaveBorderBottom ? "unset" : "1px solid var(--gray-200)"};

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .result {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }
`;

export const FormWrapperDisabledInput = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  > input {
    border-radius: 8px 0 0 8px;
  }

  > .refresh {
    width: 40px;
    height: 40px;
    border-radius: 0;
    border-right-color: rgba(0, 0, 0, 0.08);
  }

  > .copy {
    width: 40px;
    height: 40px;
    border-radius: 0 8px 8px 0;
  }
`;

export const ButtonsWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 16px;
`;
