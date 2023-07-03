import React from "react";
import styled from "@emotion/styled";
import StyledDropImage from "../../../../global/StyledDropImage";
import StyledColorPicker from "../../../../global/StyledColorPicker";
import { useRecoilState } from "recoil";
import {
  IconBuilderImageAtom,
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

export default function FormImage() {
  const [iconImage, setIconImage] = useRecoilState(IconBuilderImageAtom);
  const [iconColor, setIconColor] = useRecoilState(IconColorAtom);

  return (
    <>
      <h1 className="title">Background image</h1>
      <FormWrapper>
        {/* <StyledDropImage
          title="Drop file to upload article icon"
          description="1600 x 900px"
          src={iconImage.src}
          alt={iconImage.alt}
          setImage={setIconImage}
        /> */}
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
