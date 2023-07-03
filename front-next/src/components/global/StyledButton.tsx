/** @jsxImportSource @emotion/react */
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  bgColor?: string;
  customCSS?: SerializedStyles;
}

const smCSS = css`
  height: 36px;

  padding: 0 16px;

  font-size: 15px;
`;

const mdCSS = css`
  height: 40px;

  padding: 0 18px;

  font-size: 16px;
`;

const lgCSS = css`
  height: 44px;

  padding: 0 20px;

  font-size: 17px;
`;

const filledCSS = css`
  border-color: var(--orange-300);

  color: white;

  background: var(--orange-300);
`;

const outlinedCSS = css`
  border-color: var(--gray-300);

  color: var(--gray-600);

  background: transparent;
`;

const Button = styled.button`
  width: fit-content;
  min-width: 96px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 64px;
  border: 1px solid;

  font-weight: 600;

  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function StyledButton(props: PropsWithChildren<Props>) {
  const {
    children,
    isLoading,
    variant = "filled",
    size = "md",
    isDisabled,
    bgColor,
  } = props;

  function returnStyleVariant(selected: string) {
    if (selected === "filled") return filledCSS;
    if (selected === "outlined") return outlinedCSS;
    return filledCSS;
  }

  function returnStyleSize(selected: string) {
    if (selected === "sm") return smCSS;
    if (selected === "md") return mdCSS;
    if (selected === "lg") return lgCSS;
    return mdCSS;
  }

  if (bgColor) {
    return (
      <Button
        {...props}
        css={css`
          ${props.customCSS ? props.customCSS : ``}
          ${returnStyleSize(size)};
          ${returnStyleVariant(variant)}
          ${bgColor && `background-color: ${bgColor} !important;`}
          ${bgColor && `border-color: ${bgColor} !important;`}
        `}
        id="styled-button"
        type="button"
        disabled={isLoading || isDisabled}
        onClick={(e) => {
          if (isLoading || isDisabled) return;

          if (props.onClick) props.onClick(e);
        }}
      >
        {!isLoading ? (
          children
        ) : (
          <Spinner color={variant === "filled" ? "white" : "#fb972e"} />
        )}
      </Button>
    );
  }

  return (
    <Button
      {...props}
      css={css`
        ${props.customCSS ? props.customCSS : ``}
        ${returnStyleSize(size)};
        ${returnStyleVariant(variant)}
      `}
      id="styled-button"
      type="button"
      disabled={isLoading || isDisabled}
      onClick={(e) => {
        if (isLoading || isDisabled) return;

        if (props.onClick) props.onClick(e);
      }}
    >
      {!isLoading ? (
        children
      ) : (
        <Spinner color={variant === "filled" ? "white" : "#fb972e"} />
      )}
    </Button>
  );
}
