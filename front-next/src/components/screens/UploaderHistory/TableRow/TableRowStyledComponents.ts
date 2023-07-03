import styled from "@emotion/styled";

export const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: #fff;

  border-radius: 8px;

  display: grid;
  grid-template-columns: repeat(5, 1fr) 50px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

export const TR = styled(TableStructure)`
  p {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }

  .column {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 8px;
  }

  .filename {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    cursor: default
  }

  .status-column {
    width: max-content;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 4px;
    display: flex;
    align-items: center;

    &.Confirmed {
      background: #eaf5e7;
      color: var(--green-300);
    }

    &.Pending {
      background: #fdf5e1;
      color: #e3a600e3;
    }

    &.Encoding {
      background: #e5f5fb;
      color: #0986b4;
    }

    &.Suspended {
      background: #f9e7e5;
      color: #c41700;
    }
  }
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
`;

export const IconButton = styled.div`
  width: 32px;
  height: 32px;

  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff2e5;

  border-radius: 4px;

  color: #fb972e;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  svg {
    max-width: 100%;
    max-height: 100%;
  }

  &:hover {
    background: #fb972e;

    color: white;
  }
`;
