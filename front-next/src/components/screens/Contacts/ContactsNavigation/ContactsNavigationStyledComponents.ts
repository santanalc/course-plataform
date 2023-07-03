import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-height: 57px;
  min-height: 57px;

  padding: 0 24px;

  background: white;

  border-bottom: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 9;

  .search-label {
    font-size: 16px;
    font-weight: 600;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;

    > #styled-search-input {
      width: 240px;
      > input {
        height: 36px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const OrangeCSS = css`
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

export const RedCSS = css`
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

export const PopoverTitle = styled.h1`
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

export const PopoverButton = styled.span`
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

export const IconButtonPlay = styled.button<{ variant: "filled" | "outlined" }>`
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  background: ${(props) =>
    props.variant === "filled" ? "var(--orange-300)" : "transparent"};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid;
  border-color: ${(props) =>
    props.variant === "filled" ? "var(--orange-300)" : "var(--gray-300)"};
  border-radius: 50%;

  transition: filter 0.2s ease-in-out;

  svg {
    width: 14px;
    height: 14px;
    color: ${(props) =>
      props.variant === "filled" ? "white" : "var(--gray-600)"};
  }

  &:hover {
    filter: brightness(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media screen and (max-width: 1140px) {
    width: 36px;
    height: 36px;

    svg {
      width: 12px;
      height: 12px;
      color: ${(props) =>
        props.variant === "filled" ? "white" : "var(--gray-600)"};
    }
  }

  @media screen and (max-width: 600px) {
    width: 32px;
    height: 32px;

    svg {
      width: 10px;
      height: 10px;
      color: ${(props) =>
        props.variant === "filled" ? "white" : "var(--gray-600)"};
    }
  }
`;

export const StyledButtonFilter = styled.div`
  width: fit-content;
  height: 36px;

  padding: 0 24px;

  background: #f4f4f4;

  color: var(--gray-400);

  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  transition: all 0.3s ease-in-out;

  cursor: pointer;

  > svg {
    width: 16px;
    height: 16px;
  }

  > .circle {
    width: 18px;
    height: 18px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--orange-300);

    font-size: 12px;
    font-weight: 700;
    color: white;
  }

  > p {
    font-size: 16px;
    font-weight: 700;
  }

  &:hover {
    filter: brightness(0.96);
  }
`;
