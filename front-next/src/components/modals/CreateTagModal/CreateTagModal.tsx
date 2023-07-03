import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as SC from "./CreateTagModalStyledComponents";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import { FaPlay } from "react-icons/fa";
import StyledInput from "../../global/StyledInput";

type CreateTagModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateTagModal({
  isOpen,
  onClose,
}: CreateTagModalProps) {
  const [tagName, setTagName] = useState("");
  const [tagNameIsInvalid, setTagNameIsInvalid] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameIsInvalid, setCategoryNameIsInvalid] = useState(false);

  function handleSubmit() {
    if (!tagName) {
      setTagNameIsInvalid(true);
      return;
    }

    if (!categoryName) {
      setCategoryNameIsInvalid(true);
      return;
    }

  }

  return (
    <Modal
      isCentered
      autoFocus={false}
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader css={SC.ModalHeaderCSS}>
          <SC.SpaceBetweenWrapper>
            <SC.ModalTitle>Create Tag</SC.ModalTitle>
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Create tag video"
            />
          </SC.SpaceBetweenWrapper>
        </ModalHeader>

        <ModalBody css={SC.ModalBodyCSS}>
          <SC.FormWrapper>
            <SC.LabelWrapper>
              <label>Tag Name</label>
            </SC.LabelWrapper>
            <StyledInput
              value={tagName}
              onChange={(e) => {
                setTagName(e.target.value);
                setTagNameIsInvalid(false);
              }}
              error={tagNameIsInvalid}
              placeholder="Enter tag name"
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <SC.LabelWrapper>
              <label>Category Name</label>
            </SC.LabelWrapper>
            <StyledInput
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setCategoryNameIsInvalid(false);
              }}
              error={categoryNameIsInvalid}
              placeholder="Enter or select a category for this tag"
            />
          </SC.FormWrapper>
        </ModalBody>

        <ModalFooter css={SC.ModalFooterCSS}>
          <StyledButton onClick={() => {}} variant="outlined">
            Cancel
          </StyledButton>
          <StyledButton onClick={handleSubmit}>Save</StyledButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
