import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const OrangeCSS = css`
  p {
    color: var(--gray-700);
  }

  svg {
    color: var(--gray-700);
  }

  &:hover {
    background-color: var(--orange-300);

    p {
      color: white;
    }

    svg {
      color: white;
    }
  }
`;

export const RedCSS = css`
  p {
    color: #c41700;
  }

  svg {
    color: #c41700;
  }

  &:hover {
    background-color: #c41700;

    p {
      color: white;
    }

    svg {
      color: white;
    }
  }
`;

export const PopoverHeaderCSS = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > .image-name {
    font-size: 18px;
    font-weight: 500;
    color: var(--gray-700);
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-gap: 8px;

    > svg {
      color: var(--blue-300);
    }

    > p {
      font-size: 14px;
      font-weight: 400;
      color: var(--gray-400);
    }
  }
`;

export const PopoverButton = styled.span`
  width: 100%;

  padding: 8px 16px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 8px;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  p {
    font-size: 14px;
    font-weight: 400;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;
