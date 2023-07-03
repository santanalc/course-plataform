import React from "react";
import styled from "@emotion/styled";
import DrawerSidebarButton from "./DrawerSidebarButton";
import { BUTTONS } from "../buttonArray";

const DrawerButtonsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 16px;
`;

export default function DrawerSidebarButtonsList() {
  return (
    <DrawerButtonsList>
      {BUTTONS.map((b) => (
        <DrawerSidebarButton
          key={b.path}
          label={b.label}
          path={b.path}
          src={b.src}
        />
      ))}
    </DrawerButtonsList>
  );
}
