import React from "react";
import styled from "@emotion/styled";
import { useDisclosure } from "@chakra-ui/hooks";
import DrawerSidebarComponent from "./Sidebar/DrawerSidebar/DrawerSidebarComponent";
import { HiMenu } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  min-height: 72px;
  max-height: 72px;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-200);

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

const TitleWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  > svg {
    width: 24px;
    height: 24px;
    color: var(--gray-400);

    cursor: pointer;

    @media screen and (max-width: 1140px) {
      width: 22px;
      height: 22px;
    }

    @media screen and (max-width: 600px) {
      width: 20px;
      height: 20px;
    }
  }

  > h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-700);

    @media screen and (max-width: 1140px) {
      font-size: 22px;
    }

    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }

  > p {
    font-size: 18px;
    font-weight: 400;
    color: var(--gray-400);

    @media screen and (max-width: 1140px) {
      font-size: 16px;
    }

    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
`;

const ButtonsWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

const DrawerButton = styled.div`
  width: fit-content;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: start;

  svg {
    width: 20px;
    height: 20px;
    color: var(--chakra-colors-gray-600);
  }

  display: none;

  @media screen and (max-width: 720px) {
    display: flex;
  }
`;

interface TopBarProps {
  title: string;
  description?: string;
  buttons?: JSX.Element;
  onClickButtonBack?: () => void;
}

export default function TopBar({
  title,
  buttons,
  description,
  onClickButtonBack,
}: TopBarProps) {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Container>
        <DrawerButton onClick={onOpen}>
          <HiMenu />
        </DrawerButton>

        <TitleWrapper>
          {onClickButtonBack && <IoIosArrowBack onClick={onClickButtonBack} />}
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </TitleWrapper>

        <ButtonsWrapper>{buttons}</ButtonsWrapper>
      </Container>
      <DrawerSidebarComponent isOpen={isOpen} onClose={onClose} />
    </>
  );
}
