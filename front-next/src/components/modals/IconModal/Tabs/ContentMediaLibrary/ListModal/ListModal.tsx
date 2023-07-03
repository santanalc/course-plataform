import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaSort } from "react-icons/fa";
import StyledCheckbox from "../../../../../global/StyledCheckbox";
import CardListModal from "./CardListModal";
import { MediaCardsArray } from "../../../../../data/MediaCardsArray";

const Container = styled.div`
  width: 100%;
  height: fit-content;

  margin-top: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  #styled-checkbox {
    margin-right: 8px;
  }
`;

const TableHead = styled.div`
  width: calc(100% - 24px);
  height: 64px;

  padding: 0 24px;

  background: var(--gray-100);

  border-radius: 8px;

  display: grid;
  grid-template-columns: 240px 1fr 64px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;

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

  > .title.end {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;

const CardListWrapper = styled.div`
  width: 100%;
  max-height: 208px;

  padding-right: 24px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;
`;

export default function ListModal() {
  const [value, setValue] = useState(false);

  return (
    <Container>
      <TableHead>
        <span className="title">
          <StyledCheckbox value={value} onClick={() => setValue(!value)} />
          <p className="table-head-title">Name</p>
          <FaSort />
        </span>

        <span className="title">
          <p className="table-head-title">Date Created</p>
          <FaSort />
        </span>

        <span className="title end">
          <p className="table-head-title">Kind</p>
          <FaSort />
        </span>
      </TableHead>

      <CardListWrapper>
        {MediaCardsArray.map((c) => (
          <CardListModal
            key={c.name}
            name={c.name}
            src={c.src}
            type={c.type}
            kind={c.kind}
            createdAt={c.createdAt}
          />
        ))}
      </CardListWrapper>
    </Container>
  );
}
