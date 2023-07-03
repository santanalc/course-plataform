import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useState } from "react";
import StyledCheckbox from "../../global/StyledCheckbox";
import { ItemSelectedType } from "./MenuManagerModal";

const Container = styled.div`
  width: 100%;
  height: 80px;

  padding: 24px 32px 24px 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  position: relative;

  border: 1px solid var(--gray-200);

  #styled-checkbox {
    width: 20px;
    height: 20px;
  }
`;

export const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  position: relative;

  overflow: hidden;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

  .inactive-wrapper {
    width: 100%;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #bbbbbb;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  object-position: center;
  object-fit: cover;
`;

export const ImageFake = styled.div`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  background: #2f2f2f;
`;

const Content = styled.span`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .component-item-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }

  .component-item-description {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ComponentItemButton = styled.span`
  width: 80px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0 0 8px 8px;

  padding: 8px;

  position: absolute;
  right: -24px;

  transform: rotate(270deg);

  &.CourseType {
    background: #dde8d0;
  }

  &.ArticleType {
    background: #a3b8ff;
  }

  .item-button-text {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-700);
    text-transform: capitalize;
  }
`;

export type ComponentItemModalProps = {
  type: "ArticleType" | "CourseType";
  title: string;
  description: string;
  image: string;
  itemsSelected: ItemSelectedType[];
  id: string;
  setItemsSelected: (items: ItemSelectedType[]) => void;
  isActive?: boolean;
};

export default function ComponentItemModal({
  type,
  title,
  description,
  image,
  id,
  itemsSelected,
  setItemsSelected,
  isActive = true,
}: ComponentItemModalProps) {
  const [openActions, setOpenActions] = useState(false);

  function handleCheck() {
    !!itemsSelected.find((i) => i.id === id)
      ? setItemsSelected(itemsSelected.filter((i) => i.id !== id))
      : setItemsSelected([...itemsSelected, { type, id }]);
  }

  return (
    <Container onClick={handleCheck}>
      <StyledCheckbox
        onClick={handleCheck}
        value={!!itemsSelected.find((i) => i.id === id)}
      />

      {isActive ? (
        <ImageWrapper>
          {image ? <Image src={image} /> : <ImageFake />}
        </ImageWrapper>
      ) : (
        <ImageWrapper>
          {image ? <Image src={image} /> : <ImageFake />}
          <span className="inactive-wrapper">Inactive</span>
        </ImageWrapper>
      )}

      <Content>
        <h1 className="component-item-title">{title}</h1>
        <p className="component-item-description">{description}</p>
      </Content>

      <ComponentItemButton
        className={type}
        onClick={() => {
          setOpenActions(!openActions);
        }}
      >
        <p className="item-button-text">{type?.split("Type")[0]}</p>
      </ComponentItemButton>
    </Container>
  );
}
