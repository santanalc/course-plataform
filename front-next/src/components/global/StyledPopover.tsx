/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PlacementWithLogical,
  PopoverFooter,
} from "@chakra-ui/react";
import { css } from "@emotion/react";

const PopoverFooterCSS = css`
  width: 100%;

  padding: 8px 16px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 10px;

  border-top: 1px solid var(--gray-200);
`;

const OrangeCSS = css`
  p {
    color: var(--gray-700) !important;
  }

  svg {
    color: var(--gray-700) !important;
  }

  &:hover {
    background-color: var(--orange-300) !important;

    p {
      color: white !important;
    }

    svg {
      color: white !important;
    }
  }
`;

const RedCSS = css`
  p {
    color: #c41700 !important;
  }

  svg {
    color: #c41700 !important;
  }

  &:hover {
    background-color: #c41700 !important;

    p {
      color: white !important;
    }

    svg {
      color: white !important;
    }
  }
`;

const PopoverTitle = styled.h1`
  width: 100%;

  padding: 8px 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--gray-400) !important;
`;

const PopoverButton = styled.span`
  width: 100%;

  padding: 8px 16px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 10px;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  p {
    font-size: 16px;
    font-weight: 400;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

type PopoverButtonsProps = {
  onClick: (event?: any) => void;
  popoverButtonLabel: string;
  icon?: JSX.Element;
  theme?: string;
};

type StyledPopoverProps = {
  hasIcon?: boolean;
  popoverPlacement?: PlacementWithLogical | undefined;
  popoverTrigger: JSX.Element;
  popoverTitle?: string;
  popoverButtons: PopoverButtonsProps[];
  popoverFooter?: JSX.Element | null;
};

export default function StyledPopover({
  hasIcon = false,
  popoverPlacement = "left-end",
  popoverTrigger,
  popoverTitle,
  popoverButtons,
  popoverFooter,
}: StyledPopoverProps) {
  if (hasIcon) {
    return (
      <Popover placement={popoverPlacement}>
        <PopoverTrigger>{popoverTrigger}</PopoverTrigger>
        <PopoverContent minWidth="240px" width="fit-content" padding="4px">
          {popoverTitle && <PopoverTitle>{popoverTitle}</PopoverTitle>}
          {popoverButtons.map((p) => (
            <PopoverButton
              key={p.popoverButtonLabel}
              onClick={p.onClick}
              css={p.theme === "orange" ? OrangeCSS : RedCSS}
            >
              {p.icon}
              <p>{p.popoverButtonLabel}</p>
            </PopoverButton>
          ))}
          {popoverFooter && (
            <PopoverFooter css={PopoverFooterCSS}>
              {popoverFooter}
            </PopoverFooter>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover placement={popoverPlacement}>
      <PopoverTrigger>{popoverTrigger}</PopoverTrigger>
      <PopoverContent minWidth="240px" width="fit-content" padding="4px">
        {popoverTitle && <PopoverTitle>{popoverTitle}</PopoverTitle>}
        {popoverButtons.map((p) => (
          <PopoverButton
            key={p.popoverButtonLabel}
            onClick={p.onClick}
            css={OrangeCSS}
          >
            <p>{p.popoverButtonLabel}</p>
          </PopoverButton>
        ))}
        {popoverFooter && (
          <PopoverFooter css={PopoverFooterCSS}>{popoverFooter}</PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
}
