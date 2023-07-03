import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import styled from "@emotion/styled";
import { Tooltip, PlacementWithLogical } from "@chakra-ui/react";

export interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  tooltipLabel?: string;
  tooltipPlacement?: PlacementWithLogical;
  icon: JSX.Element;
  variant?: "filled" | "outlined";
}

const IconButtonPlay = styled.button<{ variant: "filled" | "outlined" }>`
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

export default function StyledIconButton(props: PropsWithChildren<Props>) {
  const {
    icon,
    tooltipLabel,
    tooltipPlacement = "auto",
    variant = "outlined",
  } = props;

  if (tooltipLabel) {
    return (
      <Tooltip hasArrow placement={tooltipPlacement} label={tooltipLabel}>
        <IconButtonPlay {...props} type="button" variant={variant}>
          {icon}
        </IconButtonPlay>
      </Tooltip>
    );
  }

  return (
    <IconButtonPlay {...props} type="button" variant={variant}>
      {icon}
    </IconButtonPlay>
  );
}
