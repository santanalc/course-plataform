import { ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import IconBuilderModal from "../IconBuilderModal/IconBuilderModal";
import { IconTabs } from "./IconModal";
import SidebarNavigationModal from "./SidebarNavigationModal";
import ContentIconBuilder from "./Tabs/ContentIconBuilder";
import ContentMediaLibrary from "./Tabs/ContentMediaLibrary/ContentMediaLibrary";
import ContentUploadFile from "./Tabs/ContentUploadFile";

const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  grid-gap: 24px;

  border-bottom: 1px solid var(--gray-200);
`;

const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;
  max-height: 400px;

  padding: 0;

  overflow-y: auto;

  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: flex-start;
  justify-content: start;

  @media screen and (min-height: 720px) {
    min-height: 480px;
    max-height: 480px;
  }
`;

const ModalFooterCSS = css`
  padding: 24px;

  grid-gap: 16px;

  border-top: 1px solid var(--gray-200);
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-700);
`;

const SpaceBetweenWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

type ContentContainerProps = {
  selected: IconTabs;
  handleSelected: (vle: IconTabs) => void;
  onClose: () => void;
  isOpen: boolean;
  setIsOpen: any;
  type: "menu" | "page" | "article" | "course";
  widthLimit: number;
  heightLimit: number;
  isImage?: boolean;
};

type ContentContainerFooterModalProps = Pick<
  ContentContainerProps,
  "selected" | "onClose" | "isOpen" | "setIsOpen" | "type"
>;

function ContentContainerFooterModal({
  selected,
  onClose,
  isOpen,
  setIsOpen,
  type,
}: ContentContainerFooterModalProps) {
  const router = useRouter();
  const ICON_FOOTER_MODAL = [
    {
      buttonLabel: "Next",
      onClick: () => {
        onClose();
      },
    },
    {
      buttonLabel: "Go to icon builder page",
      onClick: () => {
        setIsOpen(true);
      },
    },
    {
      buttonLabel: "Next",
      onClick: () => {
        onClose();
      },
    },
  ];

  function getProps(currentSelected: IconTabs) {
    if (currentSelected === "UPLOAD_FILE") return ICON_FOOTER_MODAL[0];
    if (currentSelected === "ICON_BUILDER") return ICON_FOOTER_MODAL[1];
    if (currentSelected === "MEDIA_LIBRARY") return ICON_FOOTER_MODAL[2];
    return ICON_FOOTER_MODAL[0];
  }

  return (
    <ModalFooter css={ModalFooterCSS}>
      <StyledButton
        onClick={() => {
          onClose();
        }}
        variant="outlined"
      >
        Cancel
      </StyledButton>
      <StyledButton onClick={getProps(selected).onClick}>
        {getProps(selected).buttonLabel}
      </StyledButton>
    </ModalFooter>
  );
}

export default function ContentContainer({
  selected,
  handleSelected,
  onClose,
  type,
  widthLimit,
  heightLimit,
  isImage,
}: ContentContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  function returnBody(currentSelected: IconTabs) {
    if (currentSelected === "UPLOAD_FILE")
      return (
        <ContentUploadFile
          type={type}
          widthLimit={widthLimit}
          heightLimit={heightLimit}
          isImage={isImage}
        />
      );
    if (currentSelected === "ICON_BUILDER") return <ContentIconBuilder />;
    if (currentSelected === "MEDIA_LIBRARY") return <ContentMediaLibrary />;
    return (
      <ContentUploadFile
        type={type}
        widthLimit={widthLimit}
        heightLimit={heightLimit}
        isImage={isImage}
      />
    );
  }

  return (
    <>
      <ModalHeader css={ModalHeaderCSS}>
        <SpaceBetweenWrapper>
          <ModalTitle>{isImage ? "Image" : "Icon"}</ModalTitle>
          <StyledIconButton
            icon={<FaPlay />}
            onClick={() => {}}
            tooltipLabel="Icon video"
          />
        </SpaceBetweenWrapper>
      </ModalHeader>

      <ModalBody css={ModalBodyCSS}>
        <SidebarNavigationModal
          selected={selected}
          handleSelected={handleSelected}
          isImage={isImage}
        />
        {returnBody(selected)}
      </ModalBody>

      <ContentContainerFooterModal
        onClose={onClose}
        selected={selected}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type={type}
      />
      <IconBuilderModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onCloseParent={() => {
          onClose();
        }}
        type={type}
      />
    </>
  );
}
