import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as SC from "./CreateCategoryModalStyledComponents";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import { FaPlay } from "react-icons/fa";
import StyledInput from "../../global/StyledInput";

type CreateCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateCategoryModal({
  isOpen,
  onClose,
}: CreateCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameIsInvalid, setCategoryNameIsInvalid] = useState(false);

  function handleSubmit() {
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
            <SC.ModalTitle>Create Category</SC.ModalTitle>
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Create category video"
            />
          </SC.SpaceBetweenWrapper>
        </ModalHeader>

        <ModalBody css={SC.ModalBodyCSS}>
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
              placeholder="Enter category name"
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
