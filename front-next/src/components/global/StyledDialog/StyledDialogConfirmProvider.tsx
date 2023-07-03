import React, { useRef, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DialogConfirmAtom } from "./StyledDialogHooks";
import { useRecoilState } from "recoil";
import StyledButton from "../StyledButton";
import StyledCheckbox from "../StyledCheckbox";

const AlertDialogContentCSS = css`
  width: calc(100% - 32px);

  padding: 32px 0;

  align-items: center;
  justify-content: center;

  #styled-checkbox-label {
    font-size: 15px;
    font-weight: 400;
    color: #6b6b6b;
  }
`;

const AlertDialogBodyCSS = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #2f2f2f;
`;

const Text = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: #6b6b6b;

  text-align: center;
`;

const ButtonWrapper = styled.span`
  margin-top: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

//!This component should not be used alone
export default function DialogConfirmProvider() {
  const [dialog, setDialog] = useRecoilState(DialogConfirmAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [doNotWarnMeAgain, setDoNotWarnMeAgain] = useState(false);
  const cancelRef = useRef();

  function onClose() {
    setDialog((d) => ({
      ...d,
      isOpen: false,
    }));
    setDoNotWarnMeAgain(false);
  }

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
      isOpen={dialog.isOpen}
      isCentered
      returnFocusOnClose={false}
    >
      <AlertDialogOverlay />

      <AlertDialogContent css={AlertDialogContentCSS}>
        <AlertDialogCloseButton />

        <AlertDialogHeader>{dialog.hasImage && dialog.img}</AlertDialogHeader>

        <AlertDialogBody css={AlertDialogBodyCSS}>
          <Title>{dialog.title}</Title>
          <Text dangerouslySetInnerHTML={{ __html: dialog.description }} />
          <ButtonWrapper>
            <StyledButton variant="outlined" onClick={onClose}>
              {dialog.cancelButtonLabel || "Cancel"}
            </StyledButton>
            <StyledButton
              isLoading={isLoading}
              onClick={async () => {
                if (dialog.onOkPressed) {
                  setIsLoading(true);
                  await dialog.onOkPressed(doNotWarnMeAgain);
                  setIsLoading(false);
                }
                onClose();
              }}
              bgColor={dialog.okButtonColor}
            >
              {dialog.okButtonLabel || "Confirm"}
            </StyledButton>
          </ButtonWrapper>
        </AlertDialogBody>

        {dialog.hasCheckbox && (
          <AlertDialogFooter p="0" mt="32px">
            <StyledCheckbox
              value={doNotWarnMeAgain}
              onClick={() => setDoNotWarnMeAgain(!doNotWarnMeAgain)}
              label="Do not warn me again"
            />
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
