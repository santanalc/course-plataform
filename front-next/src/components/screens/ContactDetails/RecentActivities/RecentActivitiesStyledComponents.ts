import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #f4f4f4;

  padding: 32px 48px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  > .title {
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-700);
  }
`;

export const ListWrapper = styled.div`
  width: 100%;

  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 16px;
`;
