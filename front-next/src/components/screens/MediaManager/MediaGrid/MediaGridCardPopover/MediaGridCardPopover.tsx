/** @jsxImportSource @emotion/react */
import React from "react";
import {
  Popover,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PlacementWithLogical,
} from "@chakra-ui/react";
import * as SC from "./MediaGridCardPopoverStyledComponents";
import { FaFileAlt, FaImage, FaLayerGroup } from "react-icons/fa";
import { ImPlay } from "react-icons/im";
import dayjs from "dayjs";

type popoverButtonsProps = {
  onClick: () => void;
  popoverButtonLabel: string;
  icon?: JSX.Element;
  theme?: string;
};

type MediaGridCardPopoverProps = {
  imageName: string;
  imageType: string;
  imageCreatedAt: Date;
  imageKind: string;
  popoverPlacement?: PlacementWithLogical | undefined;
  popoverTrigger: JSX.Element;
  popoverButtons: popoverButtonsProps[];
};

export default function MediaGridCardPopover({
  imageName,
  imageType,
  imageCreatedAt,
  popoverPlacement = "left-end",
  popoverTrigger,
  popoverButtons,
}: MediaGridCardPopoverProps) {
  function getIcon(currentSelected: string) {
    if (currentSelected === "icon") return <FaLayerGroup />;
    if (currentSelected === "image") return <FaImage />;
    if (currentSelected === "pdf") return <FaFileAlt />;
    if (currentSelected === "mp4") return <ImPlay />;
    return <FaLayerGroup />;
  }

  return (
    <Popover placement={popoverPlacement}>
      <PopoverTrigger>{popoverTrigger}</PopoverTrigger>
      <PopoverContent maxWidth="288px" padding="4px">
        <PopoverHeader css={SC.PopoverHeaderCSS}>
          <h1 className="image-name">{imageName}</h1>
          <span>
            {getIcon(imageType)}
            <p>
              {imageType} • Created on{" "}
              {dayjs(imageCreatedAt).format("MMM D, YYYY")}
            </p>
          </span>
        </PopoverHeader>

        {popoverButtons.map((p) => (
          <SC.PopoverButton
            key={p.popoverButtonLabel}
            onClick={p.onClick}
            css={p.theme === "orange" ? SC.OrangeCSS : SC.RedCSS}
          >
            {p.icon}
            <p>{p.popoverButtonLabel}</p>
          </SC.PopoverButton>
        ))}
      </PopoverContent>
    </Popover>
  );
}
