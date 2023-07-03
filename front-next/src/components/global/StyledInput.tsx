import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import { MdClear } from "react-icons/md";
import { Tooltip } from "@chakra-ui/tooltip";

type RefUtil<T> =
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null;

interface HTMLInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean;
  hasIcon?: boolean;
  icon?: JSX.Element;
  handleClearInput?: () => void;
}

const InputWrapper = styled.span`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  > svg {
    width: 16px;
    height: 16px;

    color: var(--gray-300);

    position: absolute;
    left: 16px;
  }

  > .clear-input-button {
    width: fit-content;
    height: fit-content;

    padding: 4px;

    border-radius: 50%;

    position: absolute;
    right: 16px;

    transition: all 0.3s ease-in-out;

    cursor: pointer;

    > svg {
      width: 16px;
      height: 16px;

      color: var(--gray-300);

      transition: all 0.3s ease-in-out;
    }

    &:hover {
      background: var(--orange-300);

      > svg {
        color: white;
      }
    }
  }

  input {
    padding-left: 40px;
    padding-right: 40px;

    border-radius: 32px;
  }
`;

const Input = styled.input<HTMLInputProps>`
  width: 100%;
  height: 40px;

  border: 1px solid;
  border-color: var(--gray-200);
  border-radius: 8px;

  padding: 16px;
  color: var(--gray-700);

  background: white;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  transition: box-shadow 0.3s, border 0.3s;

  :focus {
    box-shadow: 0px 0px 6px var(--orange-400);
    border: 1px solid var(--orange-300);
  }

  :read-only {
    background-color: var(--chakra-colors-gray-100);

    &[value=""] {
      &::placeholder {
        color: transparent;
      }
    }
  }

  &::placeholder {
    font-size: 14px;
    color: var(--chakra-colors-gray-400);
  }

  ${(props) =>
    props.error &&
    css`
      border: 1px solid #c41700 !important;
      box-shadow: 0px 0px 6px #c417004d !important;
    `}
`;

function StyledInput(
  props: HTMLInputProps,
  ref: RefUtil<HTMLInputElement>
): JSX.Element {
  const { hasIcon = false, icon = <BsSearch />, handleClearInput } = props;

  if (hasIcon) {
    return (
      <InputWrapper id="styled-search-input">
        {icon}
        <Input {...props} ref={ref} />
        {handleClearInput && props.value !== "" && (
          <Tooltip hasArrow placement="top" label="Clear">
            <button onClick={handleClearInput} className="clear-input-button">
              <MdClear />
            </button>
          </Tooltip>
        )}
      </InputWrapper>
    );
  }

  return <Input id="styled-input" {...props} ref={ref} />;
}

export default forwardRef<HTMLInputElement, HTMLInputProps>(StyledInput);
