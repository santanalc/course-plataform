import styled from "@emotion/styled";

export const Container = styled.div<{ isFilterOpen: boolean }>`
  max-width: 400px;
  width: 100%;
  height: 100vh;
  min-height: 100%;

  background: white;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.isFilterOpen ? "0" : "-400px")};
  z-index: 9;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  transition: all 0.4s ease-in-out;

  .circle {
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

  .selected-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 8px;

    > p {
      font-size: 16px;
      font-weight: 600;
      color: #3e3e3e;
    }
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 64px;

  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: start;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #3e3e3e;
  }
`;

export const SelectedPlaceholderWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > .clear-all-button {
    font-size: 16px;
    font-weight: 600;
    color: var(--orange-300);

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
