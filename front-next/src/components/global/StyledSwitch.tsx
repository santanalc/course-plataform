import styled from "@emotion/styled";
import React, { FormEvent } from "react";

const Container = styled.div<{ disabled?: boolean }>`
  display: inline-block;

  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  span {
    position: relative;
    width: 48px;
    height: 24px;
    float: left;

    input {
      display: none;
      &:checked + .slider {
        background-color: var(--orange-300);
      }
      &:checked + .slider:before {
        transform: translateX(21px);
      }
      &:focus + .slider {
        box-shadow: 0 0 1px var(--orange-300);
      }
    }
  }

  label {
    line-height: 24px;
    margin-left: 8px;
    font-size: 12px;
    font-weight: 400;

    &.true {
      color: var(--orange-300);
    }

    &.false {
      color: var(--gray-400);
    }
  }

  .slider {
    width: 100%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0;
    outline: none;
    transition: 0.4s;
    border-radius: 16px;
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};

    &:before {
      position: absolute;
      content: "";
      height: 19px;
      width: 19px;
      left: 4px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;

type StyledSwitchProps = {
  value: boolean;
  setValue: (vle: boolean) => void;
  handleSetSwitch?: (e: FormEvent) => void;
  labelActive?: string;
  labelInactive?: string;
  disabled?: boolean;
};

export default function StyledSwitch({
  value,
  setValue,
  labelActive,
  labelInactive,
  handleSetSwitch,
  disabled,
}: StyledSwitchProps) {
  return (
    <Container disabled={disabled}>
      <span>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
        <button
          className="slider"
          type="button"
          onClick={(e) => {
            if (disabled) return;
            else if (handleSetSwitch) handleSetSwitch(e);
            else {
              e.stopPropagation();
              setValue(!value);
            }
          }}
        ></button>
      </span>
      {labelActive && labelInactive && (
        <label className={`${value}`}>
          {value ? labelActive : labelInactive}
        </label>
      )}
    </Container>
  );
}
