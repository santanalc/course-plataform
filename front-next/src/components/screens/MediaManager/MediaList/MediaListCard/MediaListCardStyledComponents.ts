import styled from "@emotion/styled";

export const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: var(--gray-100);

  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr 224px 192px 16px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

export const TableRow = styled(TableStructure)`
  p {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }

  > .first-column {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 16px;

    > img {
      width: 24px;
    }

    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  > .last-column {
    display: flex;
    align-items: center;
    justify-content: end;

    cursor: pointer;

    > svg {
      color: var(--gray-400);
    }
  }
`;

export const TableBody = styled.div`
  width: 100%;

  margin-top: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;
`;
