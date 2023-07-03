import React from "react";
import styled from "@emotion/styled";
import SidebarButton from "./FixedSidebarButton";
import { BUTTONS } from "../buttonArray";

const Container = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function FixedSidebarButtonsList() {
  return (
    <Container>
      {BUTTONS.map((b) => (
        <SidebarButton
          key={b.path}
          tooltipLabel={b.label}
          path={b.path}
          src={b.src}
        />
      ))}
    </Container>
  );
}
