import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const IconButton = styled.div`
  width: 32px;
  height: 32px;

  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff2e5;

  border-radius: 4px;

  color: #fb972e;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  svg {
    max-width: 100%;
    max-height: 100%;
  }

  &:hover {
    background: #fb972e;

    color: white;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const PopoverHeaderCSS = css`
  height: 56px;

  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: start;

  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

export const PopoverBodyCSS = css`
  padding: 16px 32px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;
`;

export const PopoverFooterCSS = css`
  padding: 16px 32px 32px;

  display: flex;
  align-items: center;
  justify-content: end;
  grid-gap: 12px;

  border-top: none;

  #styled-button {
    width: 72px;

    border-radius: 4px;
  }
`;
