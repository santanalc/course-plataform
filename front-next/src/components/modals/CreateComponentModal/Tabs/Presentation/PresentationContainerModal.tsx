import React from "react";
import { useRouter } from "next/dist/client/router";
import { ModalBody, ModalHeader, ModalFooter } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FaPlay } from "react-icons/fa";
import StyledIconButton from "../../../../global/StyledIconButton";
import StyledButton from "../../../../global/StyledButton";
import SidebarNavigationModal from "./SidebarNavigationModal";
import ContentComponentModal from "./ContentComponentModal";
import { ComponentStepTabs, ComponentTabs } from "../../CreateComponentModal";

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
  grid-template-columns: 200px auto;
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

  #styled-search-input {
    max-width: 240px;

    margin-right: auto;
  }
`;

type PresentationContainerModalProps = {
  selected: ComponentTabs;
  handleSelected: (vle: ComponentTabs) => void;
  onClose: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<ComponentStepTabs>>;
};

type PresentationFooterModalProps = Pick<
  PresentationContainerModalProps,
  "selected" | "onClose" | "setCurrentStep"
>;

function PresentationFooterModal({
  selected,
  onClose,
  setCurrentStep,
}: PresentationFooterModalProps) {
  const router = useRouter();
  const PRESENTATION_FOOTER_MODAL = [
    {
      buttonLabel: "Next",
      onClick: () => {
        setCurrentStep(ComponentStepTabs.FORM);
      },
    },
    {
      buttonLabel: "Go to add course page",
      onClick: () => {
        onClose();
        router.push("/content/course");
      },
    },
    {
      buttonLabel: "Go to add article page",
      onClick: () => {
        onClose();
        router.push("/content/article");
      },
    },
  ];

  function getProps(currentSelected: ComponentTabs) {
    if (currentSelected === "PAGE") return PRESENTATION_FOOTER_MODAL[0];
    if (currentSelected === "COURSE") return PRESENTATION_FOOTER_MODAL[1];
    if (currentSelected === "ARTICLE") return PRESENTATION_FOOTER_MODAL[2];
    return PRESENTATION_FOOTER_MODAL[0];
  }

  return (
    <ModalFooter css={ModalFooterCSS}>
      <StyledButton
        onClick={() => {
          onClose();
          setCurrentStep(ComponentStepTabs.PRESENTATION);
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

export default function PresentationContainerModal({
  selected,
  handleSelected,
  onClose,
  setCurrentStep,
}: PresentationContainerModalProps) {
  return (
    <>
      <ModalHeader css={ModalHeaderCSS}>
        <SpaceBetweenWrapper>
          <ModalTitle>Create Component</ModalTitle>
          <StyledIconButton
            icon={<FaPlay />}
            onClick={() => {}}
            tooltipLabel="Create Component video"
          />
        </SpaceBetweenWrapper>
      </ModalHeader>

      <ModalBody css={ModalBodyCSS}>
        <SidebarNavigationModal
          selected={selected}
          handleSelected={handleSelected}
        />
        <ContentComponentModal selected={selected} />
      </ModalBody>

      <PresentationFooterModal
        onClose={onClose}
        selected={selected}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
}
