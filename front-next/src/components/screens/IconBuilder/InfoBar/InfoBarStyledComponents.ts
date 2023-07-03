import styled from "@emotion/styled";

export const Container = styled.nav`
  width: 100%;
  height: 57px;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-200);

  .icon-name {
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
    color: var(--gray-400);
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const ButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  opacity: 0.5;
  cursor: not-allowed;

  svg {
    width: 20px;
    height: 20px;
    color: var(--gray-400);
  }

  p {
    font-size: 16px;
    font-style: italic;
    color: var(--gray-400);
  }
`;
