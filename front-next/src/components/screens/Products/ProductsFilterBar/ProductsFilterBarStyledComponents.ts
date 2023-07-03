import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-height: 57px;
  min-height: 57px;

  padding: 0 24px;

  background: white;

  border-bottom: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 99;

  .search-label {
    font-size: 16px;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  #styled-search-input {
    width: 240px;

    > input {
      height: 36px;
    }
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
