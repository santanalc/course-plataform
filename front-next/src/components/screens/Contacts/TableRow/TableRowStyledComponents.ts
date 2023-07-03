import styled from "@emotion/styled";

export const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: var(--gray-100);

  border-radius: 8px;

  display: grid;
  grid-template-columns: 224px 80px 272px 160px 80px 192px 16px;
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

  .first-column {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 8px;

    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .second-column {
  }

  .third-column {
    p {
      color: var(--orange-300);
      font-weight: 600;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    display: flex;
    align-content: center;
    justify-content: start;
  }

  .fourth-column {
  }

  .fifth-column {
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

    &.Not.Confirmed {
      background: #f2f2f2;
      color: #aaaaaa;
    }

    &.Suppressed {
      background: #d6d6d6;
      color: #333333;
    }

    &.Bot.Filled,
    &.Suspended {
      background: #f9e7e5;
      color: #c41700;
    }

    &.Spam {
      background: #feede7;
      color: #e25723;
    }

    &.Unsubscribed,
    &.Admin.Unsubscribed {
      background: #e8ecef;
      color: #688195;
    }
  }

  .sixth-column {
  }

  .seventh-column {
    display: flex;
    align-items: center;
    justify-content: end;

    cursor: pointer;

    > svg {
      color: var(--gray-400);
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
