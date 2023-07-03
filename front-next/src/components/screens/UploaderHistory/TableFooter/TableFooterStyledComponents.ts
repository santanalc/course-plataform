import styled from "@emotion/styled";

export const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: var(--gray-100);

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: end;
  grid-gap: 48px;
`;

export const SelectWrapper = styled.span`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > p {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }
`;

export const ContactsPerPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > p {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }
`;

export const ButtonsWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > button {
    width: 28px;
    height: 28px;

    padding: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.2s ease-in-out;

    &:hover:not(:disabled) {
      transform: scale(1.32);
    }

    &:active:not(:disabled) {
      transform: scale(1.64);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    > svg {
      width: 100%;
      height: 100%;

      color: var(--gray-400);
    }
  }
`;
