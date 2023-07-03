import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import { FaPlay } from "react-icons/fa";
import StyledDropImage from "../../global/StyledDropImage";
import FileUploadCard from "./FileUploadCard";

const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  align-items: center;
  justify-content: space-between;

  grid-gap: 24px;

  border-bottom: 1px solid var(--gray-200);
`;

const ModalFooterCSS = css`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px;

  border-top: 1px solid var(--gray-200);
`;

const HelpDeskWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  > p {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);
  }

  > button {
    font-size: 16px;
    font-weight: 600;
    color: var(--orange-300);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;

  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 32px;

  #styled-drop-image {
    height: 100%;
  }

  @media screen and (min-height: 900px) {
    min-height: 560px;
  }
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-700);
`;

const FileUploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 400px;

  padding: 24px 24px 24px 0;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  .files-number-label {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }

  @media screen and (min-height: 900px) {
    max-height: 560px;
  }
`;

const FileUploadList = styled.ul`
  width: 100%;

  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;
`;

type FileUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FileUploadModal({
  isOpen,
  onClose,
}: FileUploadModalProps) {
  const isLargerThan1680 = useMediaQuery("(min-width: 1680px)");

  return (
    <Modal
      isCentered
      autoFocus={false}
      size={isLargerThan1680 ? "6xl" : "4xl"}
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader css={ModalHeaderCSS}>
          <ModalTitle>File Upload</ModalTitle>
          <StyledIconButton
            icon={<FaPlay />}
            onClick={() => {}}
            tooltipLabel="File Upload video"
          />
        </ModalHeader>

        <ModalBody css={ModalBodyCSS}>
          {/* <StyledDropImage title="Drop files to upload" description="" /> */}
          <FileUploadWrapper>
            <h2 className="files-number-label">Uploading 4 files</h2>
            <FileUploadList>
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
              <FileUploadCard />
            </FileUploadList>
          </FileUploadWrapper>
        </ModalBody>

        <ModalFooter css={ModalFooterCSS}>
          <HelpDeskWrapper>
            <p>Having problems? Please try again or contact</p>
            <button>HelpDesk.</button>
          </HelpDeskWrapper>
          <StyledButton onClick={onClose}>Hide</StyledButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
