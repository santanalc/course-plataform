import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: fit-content;

  margin: 48px auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  @media screen and (max-width: 1140px) {
    padding: 40px 32px;
  }

  @media screen and (max-width: 768px) {
    padding: 32px 24px;
  }

  @media screen and (max-width: 600px) {
    padding: 24px 16px;
  }
`;

export const Table = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  #styled-checkbox {
    margin-right: 8px;
  }
`;

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

export const TableHead = styled(TableStructure)`
  > .title {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 8px;

    cursor: pointer;

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
