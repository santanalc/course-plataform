import styled from "@emotion/styled";

export const Container = styled.nav`
  width: 100%;
  height: 57px;

  border-bottom: 1px solid var(--gray-200);
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
