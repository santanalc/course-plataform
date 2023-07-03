import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 64px;

  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  cursor: pointer;

  > p {
    font-size: 16px;
    font-weight: 600;
    color: #3e3e3e;
  }

  > svg {
    width: 24px;
    height: 24px;
    color: #868482;
  }
`;

export const FilterContainer = styled.div<{ isAccordionOpen: boolean }>`
  width: 100%;
  max-height: ${(props) => (props.isAccordionOpen ? "100%" : "0")};

  overflow: ${(props) => (props.isAccordionOpen ? "visible" : "hidden")};

  opacity: ${(props) => (props.isAccordionOpen ? "1" : "0")};

  transition: all 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

export const FilterWrapper = styled.div<{ isAccordionOpen: boolean }>`
  width: 100%;
  height: fit-content;

  padding: 8px 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;
`;
