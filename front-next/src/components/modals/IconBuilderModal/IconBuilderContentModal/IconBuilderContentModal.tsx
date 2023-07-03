/** @jsxImportSource @emotion/react */
import { Icon } from "@chakra-ui/react";
import { css } from "@emotion/react";
import * as htmlToImage from "html-to-image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BackgroundBottomColorAtom,
  IconBuilderBackgroundColorAtom,
  BackgroundTopColorAtom,
  IconBuilderAtom,
  IconBuilderImageAtom,
  IconColorAtom,
  ZoomAtom,
} from "../../../../atoms/IconBuilderAtom";
import * as SC from "./IconBuilderContentModalStyledComponents";
const download = require("downloadjs");

type IconWrapperComponentProps = {
  zoom: number;
};

function IconWrapperComponent({ zoom }: IconWrapperComponentProps) {
  const iconBuilder = useRecoilValue(IconBuilderAtom);
  const iconColor = useRecoilValue(IconColorAtom);
  const backgroundColor = useRecoilValue(IconBuilderBackgroundColorAtom);
  const backgroundTopColor = useRecoilValue(BackgroundTopColorAtom);
  const backgroundBottomColor = useRecoilValue(BackgroundBottomColorAtom);
  const iconImage = useRecoilValue(IconBuilderImageAtom);

  const GRADIENT_CSS = css`
    background: linear-gradient(
      ${backgroundTopColor},
      ${backgroundBottomColor}
    );
    svg {
      color: ${iconColor};
    }
  `;

  const SOLID_CSS = css`
    background: ${backgroundColor};
    svg {
      color: ${iconColor};
    }
  `;

  const IMAGE_CSS = css`
    background-image: url(${iconImage.src});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    svg {
      color: ${iconColor};
    }
  `;

  function returnStyle(currentSelected: string) {
    if (currentSelected === "GRADIENT") return GRADIENT_CSS;
    if (currentSelected === "SOLID") return SOLID_CSS;
    if (currentSelected === "IMAGE") return IMAGE_CSS;
    return GRADIENT_CSS;
  }

  return (
    <SC.IconWrapper zoom={zoom} css={returnStyle(iconBuilder.background_type)}>
      <SC.IconContainer
        id="created-icon"
        css={returnStyle(iconBuilder.background_type)}
      >
        <Icon as={iconBuilder.icon_name} />
      </SC.IconContainer>
    </SC.IconWrapper>
  );
}

export default function IconBuilderContentModal() {
  const [zoom, setZoom] = useRecoilState(ZoomAtom);

  function addZoom() {
    setZoom(zoom + 25);
  }

  function removeZoom() {
    setZoom(zoom - 25);
  }

  return (
    <SC.Content>
      <IconWrapperComponent zoom={zoom} />

      <SC.BottomBar>
        <SC.PercentageButtonWrapper>
          <button
            className={zoom === 25 ? "disabled" : ""}
            onClick={zoom === 25 ? () => {} : removeZoom}
          >
            <FaMinus />
          </button>
          <p className="label">{zoom}%</p>
          <button
            className={zoom === 100 ? "disabled" : ""}
            onClick={zoom === 100 ? () => {} : addZoom}
          >
            <FaPlus />
          </button>
        </SC.PercentageButtonWrapper>

        <button
          className="download-icon-button"
          onClick={async () => {
            const dataUrl = await htmlToImage.toPng(
              document.getElementById("created-icon") as HTMLElement,
              { width: 500, height: 500 } 
            );
            download(dataUrl, "created-icon.png");
          }}
        >
          Download Flat Icon
        </button>
      </SC.BottomBar>
    </SC.Content>
  );
}
