/** @jsxImportSource @emotion/react */
import { useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, {
  DetailedHTMLProps,
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { LoadingFilesAtom } from "../../atoms/UploadFilesAtom";
import StyledButton from "./StyledButton";

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

interface StyledDropMediaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  setMedia: (data: IMedia[]) => void;
  handleButtonClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
}

function StyledDropMediaUploader(
  props: StyledDropMediaProps,
  ref: RefUtil<HTMLInputElement>
): JSX.Element {
  const { setMedia, isDisabled } = props;
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useRecoilState(LoadingFilesAtom);

  const onDrop = useCallback((files) => {
    if (!files || files.length == 0) return;
    setIsLoading(true);
    let medias: IMedia[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (file.size > 1024 * 1024 * 1024 * 2) {
        toast({
          title: `File ${file.name} is too large`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        continue;
      }

      let srcFile = URL.createObjectURL(file);

      setLoadingFiles((prev) => [
        ...prev,
        {
          fileName: file.name,
          src: srcFile,
        },
      ]);

      medias = [
        ...medias,
        {
          src: srcFile,
          alt: file.name,
          file,
          contentType: file.type.includes("video") ? "video" : "audio",
        },
      ];
    }

    setMedia(medias);
    setIsLoading(false);
  }, []);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: [".mp3", ".mp4", ".mov", ".m4v", ".m4a"],
    maxFiles: 10,
  });

  useEffect(() => {
    if (fileRejections && fileRejections.length)
      toast({
        title: `10 files are the maximum number of files you can drop here`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
  }, [fileRejections]);

  if (isLoading) return <>Loading...</>;
  return (
    <>
      <DropFilerContainer
        id="styled-drop-image"
        {...(!isDisabled && getRootProps())}
      >
        <DropFilerWrapper>
          {isDisabled ? (
            <Fragment>Select course and topic</Fragment>
          ) : (
            <Fragment>
              <input
                {...props}
                ref={ref}
                type="file"
                multiple={true}
                accept=".mp3, .mp4, .mov, .m4v, .m4a"
                onClick={(e) => (e.currentTarget.value = "")}
                {...getInputProps()}
              />
              <FaCloudUploadAlt />
              <h1 className="title">Drop file to upload media lesson</h1>
              <p className="description">
                2GB Upload Limit • MP3, MP4, MOV, M4V
              </p>
              {props.handleButtonClick && (
                <StyledButton
                  variant="filled"
                  onClick={(e) => {
                    e.currentTarget.value = "";
                    props.handleButtonClick;
                  }}
                >
                  Or click here
                </StyledButton>
              )}
            </Fragment>
          )}
        </DropFilerWrapper>
      </DropFilerContainer>
    </>
  );
}

export default forwardRef<HTMLInputElement, StyledDropMediaProps>(
  StyledDropMediaUploader
);
