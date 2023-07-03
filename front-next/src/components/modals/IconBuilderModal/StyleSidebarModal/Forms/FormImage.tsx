import styled from "@emotion/styled";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import {
  IconBuilderImageAtom,
  IconColorAtom,
} from "../../../../../atoms/IconBuilderAtom";
import StyledColorPicker from "../../../../global/StyledColorPicker";
import StyledDropImage from "../../../../global/StyledDropImage";

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

export default function FormImage() {
  const [iconImage, setIconImage] = useRecoilState(IconBuilderImageAtom);
  const [iconColor, setIconColor] = useRecoilState(IconColorAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <h1 className="title">Background image</h1>
      <FormWrapper>
        <StyledDropImage
          ref={inputRef}
          title="Drop file to upload course icon"
          description="500 x 500px"
          alt={iconImage.alt}
          src={iconImage.src}
          setImage={(vle) => {
            setIconImage(vle);
          }}
          handleButtonClick={(e) => {
            inputRef.current?.click();
          }}
          widthLimit={500}
          heightLimit={500}
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
