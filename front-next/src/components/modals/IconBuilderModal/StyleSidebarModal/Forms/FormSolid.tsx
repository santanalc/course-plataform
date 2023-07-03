import React from "react";
import styled from "@emotion/styled";
import StyledColorPicker from "../../../../global/StyledColorPicker";
import { useRecoilState } from "recoil";
import {
  IconBuilderBackgroundColorAtom,
  IconColorAtom,
} from "../../../../../atoms/IconBuilderAtom";

const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export default function FormSolid() {
  const [iconColor, setIconColor] = useRecoilState(IconColorAtom);
  const [backgroundColor, setBackgroundColor] =
    useRecoilState(IconBuilderBackgroundColorAtom);

  return (
    <>
      <h1 className="title">Background color</h1>
      <FormWrapper>
        <label>Main color</label>
        <StyledColorPicker
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </FormWrapper>

      <FormWrapper>
        <label>Icon color</label>
        <StyledColorPicker
          value={iconColor}
          onChange={(e) => setIconColor(e.target.value)}
        />
      </FormWrapper>
    </>
  );
}
