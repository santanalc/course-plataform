import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import * as SC from "./AboutModalStyledComponents";

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [version, setVersion] = useState("v1.0.8");
  const [date, setDate] = useState("10/19/2022");

  return (
    <Modal
      isCentered
      autoFocus={false}
      size="md"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About Uploader</ModalHeader>
        <ModalCloseButton />
        <ModalBody css={SC.ModalBodyCSS}>
          <img
            className="image-logo"
            src="/login/learnistic-text-logo.svg"
            alt="Logo"
          />
          <p>Version: {version}</p>
          <p> ({date})</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
