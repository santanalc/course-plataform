/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";
import { FaCheck } from "react-icons/fa";

type Props = {
  value: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  disabled?: boolean;
  label?: string;
};

type CheckboxContainerProps = Pick<Props, "value" | "disabled">;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
  cursor: pointer;
  
  .label {
    font-size: 16px;
    font-weight: 400;
  }
`;

const CheckboxContainer = styled.div<CheckboxContainerProps>`
  width: 16px;
  height: 16px;

  flex-shrink: 0;

  background-color: ${(props) => (props.value ? "var(--orange-300)" : "white")};

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid
    ${(props) => (props.value ? "var(--orange-300)" : "var(--gray-200)")};
  border-radius: 2px;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  pointer-events: ${(props) => (props.disabled ? "none" : "unset")};
  opacity: ${(props) => (props.disabled ? "0.64" : "1")};

  svg {
    width: 10px;
    height: 10px;
    color: white;
  }

  &:hover {
    filter: brightness(0.96);
  }
`;

export default function StyledCheckbox(props: Props): JSX.Element {
  const { value, onClick, disabled = false, label } = props;

  return (
    <CheckboxWrapper onClick={onClick}>
      <CheckboxContainer id="styled-checkbox" value={value} disabled={disabled}>
        {value && <FaCheck />}
      </CheckboxContainer>
      {label && <p id="styled-checkbox-label">{label}</p>}
    </CheckboxWrapper>
  );
}
