import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  min-height: 88px;
  max-height: 88px;

  background: white;

  border-radius: 16px;

  padding: 16px 24px;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 16px;

  > .circle {
    width: 40px;
    height: 40px;

    border: 1px solid var(--gray-400);
    border-radius: 50%;

    flex-shrink: 0;
  }
`;

export const TextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > h1 {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--gray-700);
  }

  > p {
    font-size: 15px;
    font-weight: 700;
    color: var(--gray-700);
  }
`;

export const DateText = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: var(--gray-300);
  white-space: nowrap;
`;
