import { Spinner, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { encode } from "base64-arraybuffer";
import React, {
  DetailedHTMLProps,
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  MouseEventHandler,
  useState,
} from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ImageCroper from "../modals/ImageCrop/ImageCroper";
import StyledButton from "./StyledButton";
import StyledPopover from "./StyledPopover";
import { dataURLtoFile } from "../../utils/DataURLToFile";

type RefUtil<T> =
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null;

const DropFilerContainer = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DropFilerWrapper = styled.div`
  width: 100%;
  height: 240px;

  background: #f2fafd;

  border: 1px dashed #90c4e3;
  border-radius: 8px;

  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  > input {
    width: 100%;
    height: 100%;
    position: absolute;

    opacity: 0;
  }

  > svg {
    width: 64px;
    height: 64px;
    color: #abb5b9;
  }

  > img {
    max-width: 100%;
    max-height: 100%;

    border-radius: 8px;
    object-fit: contain;
  }

  > .title {
    font-size: 16px;
    font-weight: 600;
    color: #15262d;

    margin-top: 8px;
  }

  > .description {
    font-size: 14px;
    font-weight: 400;
    color: #7d7e7e;

    margin-bottom: 16px;
  }

  > #styled-button {
    z-index: 99;
  }
`;

const IconButton = styled.div`
  width: 32px;
  height: 32px;

  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 999;

  border-radius: 8px;

  background: #fb972e;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: filter 0.2s ease-in-out;

  svg {
    width: 20px;
    height: 20px;

    color: #fff;
  }

  &:hover {
    filter: brightness(0.96);
  }
`;

interface StyledDropImageProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  description: string;
  src: string;
  alt: string;
  setImage: (data: { src: string; alt: string; file: any }) => void;
  handleButtonClick?: MouseEventHandler<HTMLButtonElement>;
  widthLimit: number;
  heightLimit: number;
  isLoading?: boolean;
}

function StyledDropImage(
  props: StyledDropImageProps,
  ref: RefUtil<HTMLInputElement>
): JSX.Element {
  const {
    title,
    description,
    src,
    alt,
    setImage,
    widthLimit,
    heightLimit,
    isLoading,
  } = props;
  const toast = useToast();
  const [isImgCropperOpen, setImgCropperOpen] = useState(false);
  const [temporaryImage, setTemporaryImage] = useState<{
    src: string;
    alt: string;
    file: any;
  }>({
    src: "",
    alt: "",
    file: null,
  });

  async function imageFileHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (!event.target.files || event.target.files.length == 0) return;
    const file = event.target.files[0];
    const fileArrayBuffer = await file.arrayBuffer();
    const img = new Image();
    img.src = `data:${file.type};base64,${encode(fileArrayBuffer)}`;

    img.onload = () => {
      if (
        widthLimit &&
        heightLimit &&
        !(img.width >= widthLimit && img.height >= heightLimit)
      ) {
        toast({
          title: "File size not supported",
          description: `Please choose a ${widthLimit}x${heightLimit}px or larger image`,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      } else {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;

          setTemporaryImage({
            src: `data:image/png;base64,${encode(binaryStr as ArrayBuffer)}`,
            alt: file.name,
            file,
          });
        };
        reader.readAsArrayBuffer(file);

        if (
          widthLimit &&
          heightLimit &&
          (img.width > widthLimit || img.height > heightLimit)
        )
          setImgCropperOpen(true);
      }
    };
  }

  function imageClearHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setImage({ src: "", alt: "", file: "" });
  }

  function updateImage(newSrc: string) {
    const file = dataURLtoFile(newSrc, "croppedImage");
    setImage({ alt: "croppedImage", file: file, src: newSrc });
    setImgCropperOpen(false);
  }

  const POPOVER_BUTTONS_CONTACTS = [
    {
      icon: <IoMdCloseCircleOutline />,
      theme: "red",
      popoverButtonLabel: "Remove image",
      onClick: imageClearHandler,
    },
  ];

  return (
    <>
      <DropFilerContainer id="styled-drop-image">
        <DropFilerWrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {src ? (
                <img src={src} alt={alt} />
              ) : (
                <Fragment>
                  <input
                    {...props}
                    ref={ref}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      await imageFileHandler(e);
                    }}
                  />
                  <FaCloudUploadAlt />
                  <h1 className="title">{title}</h1>
                  <p className="description">{description}</p>
                  {props.handleButtonClick && (
                    <StyledButton
                      variant="filled"
                      onClick={props.handleButtonClick}
                    >
                      Or click here
                    </StyledButton>
                  )}
                </Fragment>
              )}

              {temporaryImage && (
                <StyledPopover
                  hasIcon
                  popoverPlacement="left-end"
                  popoverTrigger={
                    <IconButton>
                      <HiDotsHorizontal />
                    </IconButton>
                  }
                  popoverButtons={POPOVER_BUTTONS_CONTACTS}
                />
              )}
            </>
          )}
        </DropFilerWrapper>
      </DropFilerContainer>
      <ImageCroper
        isOpen={isImgCropperOpen}
        onClose={() => {
          setImgCropperOpen(false);
        }}
        updateImage={updateImage}
        source={temporaryImage.src}
        widthLimit={widthLimit}
        heightLimit={heightLimit}
      />
    </>
  );
}

export default forwardRef<HTMLInputElement, StyledDropImageProps>(
  StyledDropImage
);
