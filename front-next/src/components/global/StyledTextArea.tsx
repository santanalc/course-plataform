import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, {
  DetailedHTMLProps,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

type RefUtil<T> =
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null;

interface HTMLTextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: boolean;
}

const TextArea = styled.textarea<HTMLTextAreaProps>`
  width: 100%;
  min-height: 160px;

  border: 1px solid;
  border-color: var(--gray-200);
  border-radius: 8px;

  padding: 16px;
  color: var(--gray-700);

  background: white;
  resize: none;

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

function StyledTextArea(
  props: HTMLTextAreaProps,
  ref: RefUtil<HTMLTextAreaElement>
): JSX.Element {
  const { placeholder } = props;

  return (
    <TextArea
      id="styled-textarea"
      ref={ref}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default forwardRef<HTMLTextAreaElement, HTMLTextAreaProps>(
  StyledTextArea
);
