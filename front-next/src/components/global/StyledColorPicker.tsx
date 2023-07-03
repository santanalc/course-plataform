import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { ChangeEvent } from "react";

const Container = styled.span<{ error?: boolean }>`
  width: 100%;
  height: 42px;

  padding: 16px 16px 16px 0;

  border: 1px solid;
  border-color: var(--gray-200);
  border-radius: 8px;

  display: inline-flex;
  align-items: center;

  ${(props) =>
    props.error &&
    css`
      border: 1px solid #c41700 !important;
      box-shadow: 0px 0px 6px #c417004d !important;
    `}

  &.read-only {
    background-color: var(--chakra-colors-gray-100);
    pointer-events: none;
  }

  input[type="color"] {
    width: auto;
    height: auto;

    margin-right: 8px;

    border: none;
    background: none;
    -webkit-appearance: none;

    cursor: pointer;

    &::-webkit-color-swatch-wrapper {
      width: 40px;
      height: 40px;

      padding: 0;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 4px 0 0 4px;

      padding: 0;
    }
  }

  input[type="text"] {
    width: 100%;

    background: transparent;

    font-size: 16px;
  }
`;

export interface StyledColorPickerProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  error?: boolean;
}

export default function StyledColorPicker({
  onChange,
  value,
  readOnly = false,
  error,
}: StyledColorPickerProps) {
  return (
    <Container
      className={
        readOnly ? "read-only styled-color-picker" : "styled-color-picker"
      }
      error={error}
    >
      <input
        style={{ width: 40, height: 40 }}
        type="color"
        value={value}
        onChange={onChange}
      />
      <input type="text" value={value} onChange={onChange} />
    </Container>
  );
}
