import React from "react";
import GridCardPopover from "../MediaGridCardPopover/MediaGridCardPopover";
import * as SC from "./MediaGridCardStyledComponents";
import {
  FaLayerGroup,
  FaImage,
  FaEllipsisH,
  FaFileAlt,
  FaTrashAlt,
  FaFileDownload,
  FaCopy,
} from "react-icons/fa";
import { ImPlay } from "react-icons/im";

type MediaGridCardProps = {
  type: string;
  src: string;
  name: string;
  kind: string;
  createdAt: Date;
};

const POPOVER_BUTTONS_ACTIONS = [
  {
    icon: <FaCopy />,
    theme: "orange",
    popoverButtonLabel: "Duplicate image",
    onClick: () => {},
  },
  {
    icon: <FaFileDownload />,
    theme: "orange",
    popoverButtonLabel: "Download image",
    onClick: () => {},
  },
  {
    icon: <FaTrashAlt />,
    theme: "red",
    popoverButtonLabel: "Delete image",
    onClick: () => {},
  },
];

export default function MediaGridCard({
  type,
  src,
  name,
  kind,
  createdAt,
}: MediaGridCardProps) {
  function getIcon(currentSelected: string) {
    if (currentSelected === "icon") return <FaLayerGroup />;
    if (currentSelected === "image") return <FaImage />;
    if (currentSelected === "pdf") return <FaFileAlt />;
    if (currentSelected === "mp4") return <ImPlay />;
    return <FaLayerGroup />;
  }

  function getImage(currentSelected: string) {
    if (currentSelected === "icon") return <SC.Icon src={src} alt={name} />;
    if (currentSelected === "image") return <SC.Image src={src} alt={name} />;
    if (currentSelected === "pdf")
      return <SC.Illustration src="/media-manager/PDF.svg" alt={name} />;
    if (currentSelected === "mp4")
      return <SC.Illustration src="/media-manager/Audio.svg" alt={name} />;
    return <SC.Icon src={src} alt={name} />;
  }

  return (
    <SC.Container>
      <GridCardPopover
        popoverPlacement="bottom-end"
        popoverTrigger={
          <SC.IconButton className="media-card-icon-button">
            <FaEllipsisH />
          </SC.IconButton>
        }
        popoverButtons={POPOVER_BUTTONS_ACTIONS}
        imageName={name}
        imageType={type}
        imageKind={kind}
        imageCreatedAt={createdAt}
      />

      <SC.AssetWrapper>{getImage(type)}</SC.AssetWrapper>

      <SC.LabelWrapper>
        {getIcon(type)}
        <p>{name}</p>
      </SC.LabelWrapper>
    </SC.Container>
  );
}
