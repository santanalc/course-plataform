import styled from "@emotion/styled";

export const Container = styled.nav`
  width: 100%;
  height: 57px;

  border-bottom: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-right: 24px;

  @media screen and (max-width: 600px) {
    padding-right: 16px;
  }
`;

export const Grid = styled.div`
  width: fit-content;

  position: relative;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;

  transform: translateZ(0);
`;

export const NavigationButton = styled.button`
  padding: 16px 24px;

  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: #2f2f2f;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  text-align: center;

  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > #styled-search-input {
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
