import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background: white;

  padding: 48px 0;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: relative;

  .line {
    width: 100%;

    border: 1px solid var(--gray-200);
  }

  .line.margin-40 {
    margin: 40px 0;
  }

  .line.margin-20 {
    margin: 20px 0;
  }

  #styled-button {
    position: absolute;
    right: 32px;
    top: 32px;
  }
`;

export const AvatarWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin: 0 auto;

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

  .contact-name {
    margin-top: 16px;

    font-size: 20px;
    font-weight: 700;
    color: #2f2f2f;
  }

  .contact-email {
    font-size: 16px;
    font-weight: 700;
    color: #fb972e;
  }
`;

export const FormContent = styled.div`
  max-width: 860px;
  width: 100%;

  padding: 0 32px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const FormHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FormHeaderText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  > .title {
    font-size: 16px;
    font-weight: 700;
    color: #2f2f2f;
  }

  > .text {
    font-size: 14px;
    font-weight: 400;
    color: #6b6b6b;
  }
`;

export const FormListWrapper = styled.div`
  width: 100%;

  padding: 0 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;

export const FormWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 128px 1fr;
  align-items: center;

  > .label {
    font-size: 16px;
    font-weight: 700;
    color: #333333;
  }

  > .information {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
  }

  > .empty {
    font-style: italic;
    color: #6b6b6b !important;
  }
`;

export const TagListWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  grid-gap: 16px 8px;
`;

export const TagCard = styled.div`
  width: fit-content;
  height: fit-content;

  padding: 4px 12px;

  border-radius: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  background-image: linear-gradient(
    -90deg,
    var(--blue-300) 0%,
    var(--blue-400) 50%,
    var(--blue-300) 100%
  );

  background-size: 400% 400%;

  animation: shimmer 1.2s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }

  > p {
    max-width: 128px;

    font-size: 15px;
    font-weight: 400;
    color: white;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > svg {
    width: 18px;
    height: 18px;
    color: white;

    opacity: 0;

    transition: all 0.2s ease-in-out;

    cursor: pointer;
  }

  &:hover {
    > svg {
      opacity: 1;
    }
  }
`;

export const DeleteContactButton = styled.div`
  width: fit-content;
  height: fit-content;

  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  cursor: pointer;

  transition: all 0.2s ease-in-out;

  > svg {
    width: 16px;
    height: 16px;
    color: #c41700;
  }

  > .button-label {
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    color: #c41700;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;
