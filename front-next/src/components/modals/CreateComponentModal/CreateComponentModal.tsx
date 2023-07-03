import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { MenuItemType } from "../../../generated/graphql";
import useMediaQuery from "../../../hooks/useMediaQuery";
import FormContainerModal from "./Tabs/Form/FormContainerModal";
import PresentationContainerModal from "./Tabs/Presentation/PresentationContainerModal";

export enum ComponentTabs {
  PAGE = "PAGE",
  COURSE = "COURSE",
  ARTICLE = "ARTICLE",
}

export enum ComponentStepTabs {
  PRESENTATION = "PRESENTATION",
  FORM = "FORM",
}

type CreateComponentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isPageEdit?: boolean;
  menuItemEdit?: MenuItemType;
};

export default function CreateComponentModal({
  isOpen,
  onClose,
  isPageEdit,
  menuItemEdit,
}: CreateComponentModalProps) {
  const [selected, setSelected] = useState(ComponentTabs.PAGE);
  const [currentStep, setCurrentStep] = useState(
    isPageEdit ? ComponentStepTabs.FORM : ComponentStepTabs.PRESENTATION
  );

  function handleSelected(vle: ComponentTabs) {
    setSelected(vle);
  }

  const returnBody = useCallback(
    (currentSelected: ComponentStepTabs) => {
      switch (currentSelected) {
        case ComponentStepTabs.PRESENTATION:
          return (
            <PresentationContainerModal
              setCurrentStep={setCurrentStep}
              onClose={onClose}
              selected={selected}
              handleSelected={handleSelected}
            />
          );
        case ComponentStepTabs.FORM:
          return (
            <FormContainerModal
              setCurrentStep={setCurrentStep}
              isPageEdit={isPageEdit}
              menuItemEdit={menuItemEdit}
              onClose={onClose}
            />
          );
        default:
          return (
            <PresentationContainerModal
              setCurrentStep={setCurrentStep}
              onClose={onClose}
              selected={selected}
              handleSelected={handleSelected}
            />
          );
      }
    },
    [selected]
  );

  const isLargerThan1680 = useMediaQuery("(min-width: 1680px)");

  return (
    <Modal
      isCentered
      autoFocus={false}
      size={isLargerThan1680 ? "6xl" : "4xl"}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setCurrentStep(ComponentStepTabs.PRESENTATION);
      }}
    >
      <ModalOverlay />
      <ModalContent>{returnBody(currentStep)}</ModalContent>
    </Modal>
  );
}
