import React, { useState } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import StyledCheckbox from "../../../../../global/StyledCheckbox";

const TableStructure = styled.div`
  width: 100%;
  height: 64px;

  padding: 0 24px;

  background: var(--gray-100);

  border-radius: 8px;

  display: grid;
  grid-template-columns: 240px 1fr 64px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

const TableRow = styled(TableStructure)`
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

  > .end {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;

const TableBody = styled.div`
  width: 100%;

  margin-top: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;
`;

type CardListModalProps = {
  type: string;
  src: string;
  name: string;
  kind: string;
  createdAt: Date;
};

export default function CardListModal({
  type,
  src,
  name,
  kind,
  createdAt,
}: CardListModalProps) {
  const [value, setValue] = useState(false);

  return (
    <TableBody>
      <TableRow>
        <span className="first-column">
          <StyledCheckbox value={value} onClick={() => setValue(!value)} />
          {type !== "mp4" && type !== "pdf" && <img src={src} alt={name} />}
          <p>{name}</p>
        </span>

        <p>{dayjs(createdAt).format("MMM D, YYYY [@] h:mm a")}</p>

        <p className="end">{kind}</p>
      </TableRow>
    </TableBody>
  );
}
