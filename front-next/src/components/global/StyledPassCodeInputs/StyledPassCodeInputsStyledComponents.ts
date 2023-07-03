import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 32px;
`;

interface SingleInputProps {
  error: boolean;
}

export const SingleInput = styled.input<SingleInputProps>`
  width: 100%;
  height: 80px;

  padding: 8px;

  font-size: 24px;
  color: var(--gray-700);
  text-align: center;

  border-radius: 4px;

  border: 1px solid var(--gray-200);

  transition: box-shadow 0.3s, border 0.3s;

  :focus {
    box-shadow: 0px 0px 6px var(--orange-400);
    border: 1px solid var(--orange-300);
  }

  ${(props) =>
    props.error &&
    css`
      border: 1px solid #c41700;
      box-shadow: 0px 0px 6px #c417004d;
    `}
`;
