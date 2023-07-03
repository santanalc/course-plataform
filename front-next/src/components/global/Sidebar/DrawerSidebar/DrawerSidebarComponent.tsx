import React from "react";
import styled from "@emotion/styled";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import DrawerSidebarButtonsList from "./DrawerSidebarButtonsList";

const DrawerContentCSS = css`
  background: linear-gradient(#4199cf, #2f75b6);

  > .drawer-header {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 8px;

    > .title {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
  }
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

type DrawerSidebarComponentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DrawerSidebarComponent({
  isOpen,
  onClose,
}: DrawerSidebarComponentProps) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent css={DrawerContentCSS}>
        <DrawerCloseButton color="white" />
        <DrawerHeader className="drawer-header">
          <Logo
            src="/sidebar/learnistic-logo-white.svg"
            alt="Learnistic Logo"
          />
          <h1 className="title">Learnistic CMS 2</h1>
        </DrawerHeader>

        <DrawerBody>
          <DrawerSidebarButtonsList />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
