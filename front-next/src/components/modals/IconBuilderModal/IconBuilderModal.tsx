import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as htmlToImage from "html-to-image";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { ArticleIconAtom } from "../../../atoms/NewArticleAtom";
import { CourseIconAtom } from "../../../atoms/NewCourseAtom";
import { PageIconAtom } from "../../../atoms/PageAtom";
import useMediaQuery from "../../../hooks/useMediaQuery";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import InfoBar from "../../screens/IconBuilder/InfoBar/InfoBar";
import IconBuilderContentModal from "./IconBuilderContentModal/IconBuilderContentModal";
import IconsSidebarModal from "./IconsSidebarModal/IconsSidebarModal";
import StyleSidebarModal from "./StyleSidebarModal/StyleSidebarModal";

const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--gray-200);

  grid-gap: 24px;
`;

const ModalFooterCSS = css`
  padding: 24px;

  border-top: 1px solid var(--gray-200);

  grid-gap: 16px;
`;

const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;

  padding: 0;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  > #infor-bar-icon-builder {
    padding: 24px !important;
  }

  &.empty {
    justify-content: center;
  }

  @media screen and (min-height: 900px) {
    min-height: 600px;
    max-height: 600px;
  }
`;

const ModalTitle = styled.h1`
  font-size: 20px;
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

  #styled-search-input {
    max-width: 240px;

    margin-right: auto;
  }
`;

const IconBuilderColumnsWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 360px 1fr 360px;
  align-items: flex-start;
  justify-content: start;
`;

type IconBuilderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCloseParent: () => void;
  type: "menu" | "page" | "article" | "course";
};

export default function IconBuilderModal({
  isOpen,
  onClose,
  onCloseParent,
  type,
}: IconBuilderModalProps) {
  const isLargerThan1680 = useMediaQuery("(min-width: 1680px)");
  const router = useRouter();
  const setCourseIcon = useSetRecoilState(CourseIconAtom);
  const setArticleIcon = useSetRecoilState(ArticleIconAtom);
  const setPageIcon = useSetRecoilState(PageIconAtom);

  //BRANDED BANNER
  let icon;

  return (
    <>
      <Modal
        isCentered
        autoFocus={false}
        size={isLargerThan1680 ? "6xl" : "4xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader css={ModalHeaderCSS}>
            <SpaceBetweenWrapper>
              <ModalTitle>Icon Builder</ModalTitle>
              <StyledIconButton
                icon={<FaPlay />}
                onClick={() => {}}
                tooltipLabel="Icon Builder video"
              />
            </SpaceBetweenWrapper>
          </ModalHeader>
          <ModalBody css={ModalBodyCSS}>
            <InfoBar />
            <IconBuilderColumnsWrapper>
              <StyleSidebarModal />
              <IconBuilderContentModal />
              <IconsSidebarModal />
            </IconBuilderColumnsWrapper>
          </ModalBody>
          <ModalFooter css={ModalFooterCSS}>
            <StyledButton onClick={onClose} variant="outlined">
              Cancel
            </StyledButton>
            <StyledButton
              onClick={async () => {
                const dataUrl = await htmlToImage.toPng(
                  document.getElementById("created-icon") as HTMLElement,
                  {
                    width: 500,
                    height: 500,
                    canvasWidth: 500,
                    canvasHeight: 500,
                  }
                );

                const blob = await htmlToImage.toBlob(
                  document.getElementById("created-icon") as HTMLElement,
                  {
                    width: 500,
                    height: 500,
                    canvasWidth: 500,
                    canvasHeight: 500,
                  }
                );

                const iconObj = {
                  src: dataUrl,
                  alt: "created-icon",
                  file: blob
                    ? new File([blob], "File name", { type: "image/png" })
                    : null,
                };

                switch (type) {
                  case "course":
                    setCourseIcon(iconObj);
                    break;
                  case "article":
                    setArticleIcon(iconObj);
                    break;
                  case "page":
                    setPageIcon(iconObj);
                    break;
                }
                onCloseParent();
                onClose();
              }}
              isLoading={false}
            >
              Save
            </StyledButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
