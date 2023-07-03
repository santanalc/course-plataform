import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 72px);

  padding: 48px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;

  overflow-y: scroll;

  @media screen and (max-width: 1140px) {
    padding: 40px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 16px;
  }

  .reorder-group {
    grid-gap: 24px;

    li {
      margin-bottom: 10px;
    }
  }

  ul {
    list-style-type: none;
  }
`;

export const Title = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-700);
`;
