/** @jsxImportSource @emotion/react */
import { useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Hls from "hls.js";
import React, {
  DetailedHTMLProps,
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import StyledButton from "./StyledButton";
import StyledPopover from "./StyledPopover";

export interface IMedia {
  src: string;
  alt: string;
  file?: File;
  contentType?: string;
}

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

    object-fit: contain;
  }

  > video {
    max-width: 100%;
    max-height: 100%;

    border-radius: 8px;
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

const AudioImg = styled.div`
  max-width: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  background-color: #f3f0f4;

  padding-top: 10px;
`;

interface StyledDropMediaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title: string;
  description: string;
  maxSize?: number;
  src: string;
  alt: string;
  thumbnail?: string;
  contentType?: string;
  setMedia: (data: IMedia) => void;
  handleButtonClick?: MouseEventHandler<HTMLButtonElement>;
  onlyVideo?: boolean;
}

function StyledDropMedia(
  props: StyledDropMediaProps,
  ref: RefUtil<HTMLInputElement>
): JSX.Element {
  const { title, description, maxSize, setMedia, src } = props;

  const toast = useToast();
  const hlsRef = useRef<Hls | null>(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    hlsRef.current = new Hls();

    return () => {
      URL.revokeObjectURL(src);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !src || props.contentType !== "video") return;
    if (Hls.isSupported() && !src.includes("blob") && hlsRef.current) {
      hlsRef.current.loadSource(src);
      hlsRef.current.attachMedia(videoRef.current);
    }
  }, [videoRef, src]);

  const POPOVER_BUTTONS_CONTACTS = [
    {
      icon: <IoMdCloseCircleOutline />,
      theme: "red",
      popoverButtonLabel: "Remove media",
      onClick: mediaClearHandler,
    },
  ];

  function fileHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (!event.target.files || event.target.files.length == 0) return;
    const file = event.target.files[0];

    if (maxSize && file.size > maxSize) {
      toast({
        title: `File is too large`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });

      return;
    }

    setMedia({
      src: URL.createObjectURL(file),
      alt: file.name,
      file,
      contentType: file.type.includes("video") ? "video" : "audio",
    });
  }

  function mediaClearHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setMedia({ src: "", alt: "" });
  }

  if (src)
    return (
      <DropFilerContainer id="styled-drop-image" key={src}>
        <DropFilerWrapper>
          {props.contentType === "video" ? (
            <video ref={videoRef} poster={props.thumbnail} controls>
              <source src={src} />
            </video>
          ) : (
            <AudioImg>
              <img src="/sound-wave/sound-wave.svg" />
              <audio controls>
                <source src={src} />
              </audio>
            </AudioImg>
          )}

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
        </DropFilerWrapper>
      </DropFilerContainer>
    );

  return (
    <>
      <DropFilerContainer id="styled-drop-image">
        <DropFilerWrapper>
          <Fragment>
            <input
              {...props}
              ref={ref}
              type="file"
              accept={
                props.onlyVideo
                  ? "video/mp4,video/x-m4v,video/*"
                  : "audio/*,video/*,.pdf"
              }
              onChange={fileHandler}
            />
            <FaCloudUploadAlt />
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
            {props.handleButtonClick && (
              <StyledButton variant="filled" onClick={props.handleButtonClick}>
                Or click here
              </StyledButton>
            )}
          </Fragment>
        </DropFilerWrapper>
      </DropFilerContainer>
    </>
  );
}

export default forwardRef<HTMLInputElement, StyledDropMediaProps>(
  StyledDropMedia
);
