import styled from "@emotion/styled";

export const Container = styled.nav`
  width: 100%;
  height: 57px;

  border-bottom: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  .search-label {
    font-size: 16px;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  #styled-search-input {
    > input {
      height: 36px;
    }
  }
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid;
  border-color: var(--gray-300);
  border-radius: 50%;

  transition: filter 0.2s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-600);
  }

  &:hover {
    filter: brightness(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledButtonFilter = styled.div`
  width: fit-content;
  height: 36px;

  padding: 0 24px;

  background: #f4f4f4;

  color: var(--gray-400);

  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  transition: all 0.3s ease-in-out;

  cursor: pointer;

  > svg {
    width: 16px;
    height: 16px;
  }

  > .circle {
    width: 18px;
    height: 18px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--orange-300);

    font-size: 12px;
    font-weight: 700;
    color: white;
  }

  > p {
    font-size: 16px;
    font-weight: 700;
  }

  &:hover {
    filter: brightness(0.96);
  }
`;
