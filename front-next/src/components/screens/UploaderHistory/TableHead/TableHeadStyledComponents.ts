import styled from "@emotion/styled";

export const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: #fff;

  border-radius: 8px;

  display: grid;
  grid-template-columns: repeat(5,1fr) 50px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

export const THead = styled(TableStructure)`
  > .title {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 8px;

    /* cursor: pointer; */

    &:hover {
      > svg {
        visibility: visible;
      }
    }

    > .table-head-title {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--gray-400);
    }

    > svg {
      width: 8px;
      color: var(--gray-400);
      visibility: hidden;
    }
  }

  > .title.actions {
    display: flex;
    align-items: center;
    justify-content: end;

    position: relative;
  }
`;
