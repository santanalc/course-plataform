import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import useMediaQuery from "../../../hooks/useMediaQuery";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";

const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--gray-200);

  grid-gap: 24px;
`;

const ModalFooterCSS = css`
  padding: 24px;

  border-top: 1px solid var(--gray-200);

  grid-gap: 16px;
`;

const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;

  padding: 0;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  > #infor-bar-icon-builder {
    padding: 24px !important;
  }

  &.empty {
    justify-content: center;
  }

  @media screen and (min-height: 900px) {
    min-height: 600px;
    max-height: 600px;
  }
`;

const ModalTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-700);
`;

const SpaceBetweenWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;

  #styled-search-input {
    max-width: 240px;

    margin-right: auto;
  }
`;

type State = {
  cropModel: boolean;
  image: string;
};

type ImageCroperProps = {
  source: string;
  updateImage: (newSrc: string) => void;
  isOpen: boolean;
  onClose: () => void;
  widthLimit: number;
  heightLimit: number;
};

export default function ImageCroper(props: ImageCroperProps) {
  const isLargerThan1680 = useMediaQuery("(min-width: 1680px)");

  const [isLoading, setIsLoading] = useState(false);

  const [imageRef, setImageRef] = useState<HTMLImageElement>();

  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: props.widthLimit === 500 ? 100 : 819.2,
    height: props.heightLimit === 500 ? 100 : 460.8,
    aspect: props.widthLimit === 500 ? 1 : 16 / 9,
  });

  const { updateImage, isOpen, onClose } = props;

  function getCroppedImg(
    image: HTMLImageElement,
    crop: Crop,
    fileName: string
  ): string {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    return base64Image;
  }

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image);
  };

  const onCropChange = (crop: Crop, percentCrop?: any) => {
    // You could also use percentCrop:
    setCrop(crop);
  };

  return (
    <Modal
      isCentered
      autoFocus={false}
      size={isLargerThan1680 ? "6xl" : "4xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader css={ModalHeaderCSS}>
          <SpaceBetweenWrapper>
            <ModalTitle>Image Cropper</ModalTitle>
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Icon Builder video"
            />
          </SpaceBetweenWrapper>
        </ModalHeader>
        <ModalBody css={ModalBodyCSS}>
          <div style={{ height: "70vh", width: "100%" }}>
            {props.source !== "" ? (
              <ReactCrop
                src={props.source}
                ruleOfThirds
                crop={crop}
                keepSelection
                onImageLoaded={onImageLoaded}
                onChange={onCropChange}
              />
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter css={ModalFooterCSS}>
          <StyledButton onClick={onClose} variant="outlined">
            Cancel
          </StyledButton>
          <StyledButton
            onClick={async () => {
              try {
                if (isLoading) return;
                setIsLoading(true);
                const croppedImageUrl = getCroppedImg(
                  imageRef!,
                  crop as Crop,
                  "newFile.jpeg"
                );
                updateImage(croppedImageUrl);
              } catch (e) {
                console.log("Cropping image error", e);
              } finally {
                setIsLoading(false);
              }
            }}
            isLoading={false}
          >
            Crop
          </StyledButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
