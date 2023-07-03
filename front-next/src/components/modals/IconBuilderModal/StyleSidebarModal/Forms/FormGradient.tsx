import React from "react";
import styled from "@emotion/styled";
import StyledColorPicker from "../../../../global/StyledColorPicker";
import { useRecoilState } from "recoil";
import {
  BackgroundBottomColorAtom,
  BackgroundTopColorAtom,
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

export default function FormGradient() {
  const [iconColor, setIconColor] = useRecoilState(IconColorAtom);
  const [backgrounTopColor, setBackgrounTopColor] = useRecoilState(
    BackgroundTopColorAtom
  );
  const [backgrounBottomColor, setBackgrounBottomColor] = useRecoilState(
    BackgroundBottomColorAtom
  );

  return (
    <>
      <h1 className="title">Background colors</h1>
      <FormWrapper>
        <label>Top color</label>
        <StyledColorPicker
          value={backgrounTopColor}
          onChange={(e) => setBackgrounTopColor(e.target.value)}
        />
      </FormWrapper>

      <FormWrapper>
        <label>Bottom color</label>
        <StyledColorPicker
          value={backgrounBottomColor}
          onChange={(e) => setBackgrounBottomColor(e.target.value)}
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
