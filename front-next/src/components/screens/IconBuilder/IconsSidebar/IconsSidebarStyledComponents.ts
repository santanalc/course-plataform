import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 129px);
  min-height: 100%;

  padding: 32px 0 32px 24px;

  border-left: 1px solid var(--gray-200);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;
`;

export const PaddingRightWrapper = styled.div`
  width: 100%;
  height: fit-content;

  padding-right: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;

  > .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
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

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const TypeIconButtonsWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
`;

export const TypeIconButton = styled.div`
  width: 100%;
  height: fit-content;

  border: 1px solid var(--gray-200);
  border-radius: 32px;

  font-size: 14px;
  font-weight: 700;
  color: var(--gray-400);

  padding: 8px 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease-in-out;

  cursor: pointer;

  &.active {
    border-color: var(--orange-100);
    background: var(--orange-100);
    color: var(--orange-300);
  }

  &:hover:not(.active) {
    border-color: var(--orange-300);
    background: var(--orange-300);
    color: white;
  }
`;

export const IconsListWrapper = styled.div`
  width: 100%;
  max-height: 100%;

  padding-right: 24px;

  overflow-y: auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;
  border-radius: 16px;

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &.active {
    border-color: var(--orange-300);
  }

  svg {
    width: 32px;
    height: 32px;
    color: var(--default-tex);
  }

  &:hover:not(.active) {
    background: var(--gray-100);
  }
`;
