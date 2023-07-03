import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import { RecoilState, SetterOrUpdater } from "recoil";
import { FileFromArticle } from "../../../atoms/NewArticleAtom";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ContentContainer from "./ContentContainerModal";

export enum IconTabs {
  UPLOAD_FILE = "UPLOAD_FILE",
  ICON_BUILDER = "ICON_BUILDER",
  MEDIA_LIBRARY = "MEDIA_LIBRARY",
}

type IconModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "menu" | "page" | "article" | "course";
  widthLimit: number;
  heightLimit: number;
  isImage?: boolean;
};

export default function IconModal({
  isOpen,
  onClose,
  type,
  widthLimit,
  heightLimit,
  isImage,
}: IconModalProps) {
  const [selected, setSelected] = useState(IconTabs.UPLOAD_FILE);

  function handleSelected(vle: IconTabs) {
    setSelected(vle);
  }

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
        <ContentContainer
          handleSelected={handleSelected}
          onClose={onClose}
          selected={selected}
          isOpen={isOpen}
          setIsOpen={() => null}
          type={type}
          widthLimit={widthLimit}
          heightLimit={heightLimit}
          isImage={isImage}
        />
      </ModalContent>
    </Modal>
  );
}
