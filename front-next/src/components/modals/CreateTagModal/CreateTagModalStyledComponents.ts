import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--gray-200);
`;

export const ModalFooterCSS = css`
  padding: 24px;

  grid-gap: 16px;

  border-top: 1px solid var(--gray-200);
`;

export const ModalBodyCSS = css`
  width: 100%;

  padding: 32px 40px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 24px;
`;

export const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-700);
`;

export const SpaceBetweenWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;
`;

export const LabelWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;
