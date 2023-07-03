import React from "react";
import styled from "@emotion/styled";
import CardGridModal from "./CardGridModal";
import { MediaCardsArray } from "../../../../../data/MediaCardsArray";

const Container = styled.div`
  width: 100%;
  max-height: 298px;

  overflow-y: auto;

  padding: 24px 24px 24px 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 40px 32px;
  align-items: center;
  justify-content: center;
`;

export default function GridModal() {
  return (
    <Container>
      {MediaCardsArray.map((m) => (
        <CardGridModal
          key={m.name}
          name={m.name}
          createdAt={m.createdAt}
          kind={m.kind}
          src={m.src}
          type={m.type}
        />
      ))}
    </Container>
  );
}
