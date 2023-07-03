import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaLayerGroup, FaImage, FaFileAlt } from "react-icons/fa";
import StyledCheckbox from "../../../../../global/StyledCheckbox";
import { ImPlay } from "react-icons/im";

const Container = styled.div`
  width: 100%;
  height: 208px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

const AssetWrapper = styled.div`
  width: 100%;
  height: 176px;

  padding: 24px;

  background: var(--gray-100);
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;

  border-radius: 24px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Illustration = styled.img``;

const LabelWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    color: var(--blue-300);
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

const StyledCheckboxWrapper = styled.button`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 16px;
  left: 16px;

  flex-shrink: 0;

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  transition: all 0.2s ease-in-out;

  #styled-checkbox {
    width: 24px;
    height: 24px;
  }
`;

type CardGridModalProps = {
  type: string;
  src: string;
  name: string;
  kind: string;
  createdAt: Date;
};

export default function CardGridModal({ type, src, name }: CardGridModalProps) {
  const [value, setValue] = useState(false);
  function getIcon(currentSelected: string) {
    if (currentSelected === "icon") return <FaLayerGroup />;
    if (currentSelected === "image") return <FaImage />;
    if (currentSelected === "pdf") return <FaFileAlt />;
    if (currentSelected === "mp4") return <ImPlay />;
    return <FaLayerGroup />;
  }

  function getImage(currentSelected: string) {
    if (currentSelected === "icon") return <Icon src={src} alt={name} />;
    if (currentSelected === "image") return <Image src={src} alt={name} />;
    if (currentSelected === "pdf")
      return <Illustration src="/media-manager/PDF.svg" alt={name} />;
    if (currentSelected === "mp4")
      return <Illustration src="/media-manager/Audio.svg" alt={name} />;
    return <Icon src={src} alt={name} />;
  }

  return (
    <Container>
      <StyledCheckboxWrapper>
        <StyledCheckbox value={value} onClick={() => setValue(!value)} />
      </StyledCheckboxWrapper>

      <AssetWrapper>{getImage(type)}</AssetWrapper>

      <LabelWrapper>
        {getIcon(type)}
        <p>{name}</p>
      </LabelWrapper>
    </Container>
  );
}
