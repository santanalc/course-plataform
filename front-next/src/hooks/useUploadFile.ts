import { gql, useApolloClient } from "@apollo/client";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";
import { IFileUpload } from "../atoms/UploadFilesAtom";
import { MediaManagerTypeEnum } from "../generated/graphql";

export const INIT_ENCODE_VIDEO_LESSON = gql`
  mutation InitEncodeVideo(
    $courseId: String!
    $topicId: String!
    $lessonId: String!
    $fileId: String!
    $virtualAppId: String!
    $filePath: String!
    $fileName: String!
    $fileSize: Float!
    $createdAt: String!
    $fileDuration: Float!
    $status: String!
  ) {
    initEncodeVideo(
      courseId: $courseId
      topicId: $topicId
      lessonId: $lessonId
      fileId: $fileId
      virtualAppId: $virtualAppId
      filePath: $filePath
      fileName: $fileName
      fileSize: $fileSize
      createdAt: $createdAt
      fileDuration: $fileDuration
      status: $status
    )
  }
`;

const CREATE_MEDIA = gql`
  mutation CreateMedia(
    $fileId: String!
    $virtualAppId: String!
    $filePath: String!
    $fileUrl: String!
    $type: MediaManagerTypeEnum!
    $actived: Boolean!
    $name: String!
    $extension: String!
    $thumbVideoUrl: String
  ) {
    createMedia(
      fileId: $fileId
      virtualAppId: $virtualAppId
      filePath: $filePath
      fileUrl: $fileUrl
      type: $type
      actived: $actived
      name: $name
      extension: $extension
      thumbVideoUrl: $thumbVideoUrl
    )
  }
`;

export const UPDATE_LESSON_BY_VIDEO = gql`
  mutation updateByVideoUploading(
    $courseId: String!
    $topicId: String!
    $lessonId: String!
    $data: UpdateLessonInput!
  ) {
    updateByVideoUploading(
      courseId: $courseId
      topicId: $topicId
      lessonId: $lessonId
      data: $data
    )
  }
`;

interface RegisterProps {
  fileName: string;
  file: File;
  src: string;
  filePath: string;
  virtualAppId: string;
  userUid: string;
  courseId: string;
  courseName: string;
  topicId: string;
  lessonId: string;
  fileDuration: number;
  thumbnail: string;
  thumbnailUrl: string;
}

export const HookFileUploadAtom = atom<IFileUpload | null>({
  key: "HookFileUploadAtom",
  default: null,
});

export const HookFileKeysOrder = atom<string[]>({
  key: "HookFileIdsOrder",
  default: [],
});

export const HookUploadNext = atom<boolean>({
  key: "HookUploadNext",
  default: true,
});

export default function useUploadFile() {
  const [uploadFiles, setUploadFiles] = useRecoilState<IFileUpload | null>(
    HookFileUploadAtom
  );
  const [fileKeysOrder, setFileKeysOrder] = useRecoilState(HookFileKeysOrder);
  const [uploadNext, setUploadNext] = useRecoilState(HookUploadNext);
  const firstRender = useRef(true);
  const client = useApolloClient();

  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 10, maxFileSize: 1024 * 1024 * 2300 },
    autoProceed: true,
  });

  uppy.use(Tus, {
    endpoint: "https://tus-api.learnistic.com/r2-files/",
    limit: 10,
    //@ts-ignore
    headers: (file) => {
      return {
        "x-file-data": file.meta["x-file-data"],
        "batch-uploader": true,
      };
    },
  });

  uppy.on("upload-error", (file, error, response) => {
    console.log("[GABIRU] upload-error", file, error, response);
    // if (!file) return;
    //
    // uppy.retryUpload(file.id);
  });

  uppy.on("upload-progress", (file, progress) => {
    if (!file) return;

    setUploadFiles((uploadFiles) => {
      if (!uploadFiles) return null;

      return {
        ...uploadFiles,
        [file.name]: {
          ...uploadFiles[file.name],
          percentage: (
            (progress.bytesUploaded / progress.bytesTotal) *
            100
          ).toFixed(2),
          status: "UPLOADING",
        },
      };
    });
  });

  uppy.on("file-removed", (file, reason) => {
    const fileKey = file?.name;
    if (!fileKey) return;

    setUploadFiles((uploadFiles) => {
      const filesAux = { ...uploadFiles };

      if (filesAux[fileKey]) {
        delete filesAux[fileKey];
      }

      return filesAux;
    });
  });

  uppy.on("files-added", async (files) => {
    for (const file of files) {
      uppy.pauseResume(file.id);

      setFileKeysOrder((f) => [...f, file.name]);
    }
  });

  uppy.on("upload-success", (file) => {
    const fileKey = file?.name;
    if (!fileKey) return;

    setUploadFiles((uploadFiles) => {
      if (!uploadFiles) return null;
      const uploadFile = uploadFiles[fileKey];

      if (!uploadFile) return uploadFiles;

      const {
        courseId,
        virtualAppId,
        topicId,
        lessonId,
        fileName,
        userUid,
        fileDuration,
        filePath,
        thumbnailUrl,
      } = uploadFile;

      fetch(`https://encode-mono.lrnapi.co/start_encoding`, {
        method: "POST",
        body: JSON.stringify({
          fileUrl: filePath,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const responseJSON = await response.json();
        const encodeFileId = responseJSON.job.id;
        const { mediaUrl } = responseJSON;

        client.mutate({
          mutation: INIT_ENCODE_VIDEO_LESSON,
          variables: {
            virtualAppId,
            courseId,
            topicId,
            lessonId,
            filePath,
            fileName,
            userUid,
            fileId: encodeFileId,
            fileSize: file.size,
            createdAt: dayjs().toISOString(),
            fileDuration,
            status: "Encoding",
          },
        });

        client.mutate({
          mutation: CREATE_MEDIA,
          variables: {
            fileId: encodeFileId,
            virtualAppId,
            filePath,
            fileUrl: mediaUrl,
            type: MediaManagerTypeEnum.Video,
            actived: false,
            name: fileName,
            extension: fileName.split(".")[1],
            thumbVideoUrl: thumbnailUrl,
          },
        });

        client.mutate({
          mutation: UPDATE_LESSON_BY_VIDEO,
          variables: {
            courseId,
            topicId,
            lessonId,
            data: {
              title: "Encoding",
              description: `${fileName} - Please change the title and description and thumbnail (if desired) prior to publishing`,
              maxChunkProcess: "0",
              currentChunkProcess: "0",
              encodeFileId: encodeFileId,
              fileMediaId: encodeFileId,
              mediaUrl,
              thumbnail: thumbnailUrl,
              lessonMinutes: fileDuration,
            },
          },
        });
      });

      // Little check to get if file requires transcode so I add it to the array properly
      const requiresTranscode = fileName.toLowerCase().includes(".mp4")
        ? false
        : true;
      console.log({ fileName, filePath });
      return {
        ...uploadFiles,
        [fileKey]: {
          ...uploadFiles[fileKey],
          status: requiresTranscode ? "TRANSCODING" : "ENCODING",
          percentage: "0",
        },
      };
    });

    setUploadNext(true);
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!uploadNext || !uploadFiles || fileKeysOrder.length === 0) return;

    const fileKeysOrderAux = [...fileKeysOrder];
    const fileKey = fileKeysOrderAux.shift();
    if (!fileKey) return;

    uploadFiles[fileKey] && uploadFiles[fileKey].pauseResume();

    uploadFiles[fileKey] &&
      setUploadFiles((uploadFiles) => {
        if (!uploadFiles) return null;

        return {
          ...uploadFiles,
          [fileKey]: {
            ...uploadFiles[fileKey],
            status: "UPLOADING",
          },
        };
      });

    setUploadNext(false);
    setFileKeysOrder(fileKeysOrderAux);
  }, [fileKeysOrder, uploadNext, uploadFiles]);

  async function registerFile(props: RegisterProps) {
    const {
      file,
      fileName,
      courseId,
      lessonId,
      virtualAppId,
      userUid,
      topicId,
      fileDuration,
      thumbnail,
      thumbnailUrl,
      courseName,
    } = props;
    const blob = new Blob([file], { type: file.type });

    const fileKey = `${nanoid()}-${encodeURIComponent(fileName)}`;
    const fileId = uppy.addFile({
      name: fileKey, // file name
      type: file.type, // file type
      data: blob, // file blob
      meta: {
        "x-file-data": `/courses/${courseId}/topics/${topicId}/lessons/${lessonId}`,
      },
    });

    setUploadFiles((uploadFiles) => ({
      ...(uploadFiles || {}),
      [fileKey as string]: {
        percentage: "0",
        fileId,
        fileName: props.file.name,
        size: (props.file.size / 1024 / 1024).toFixed(2),
        src: props.src,
        status: "WAITING",
        ext: props.file.name.split(".").pop() as string,
        courseId,
        lessonId,
        virtualAppId,
        userUid,
        topicId,
        fileDuration,
        thumbnail,
        courseName,
        thumbnailUrl,
        isPaused: false,
        filePath: fileKey,
        pauseResume: () => {
          uppy.pauseResume(fileId);
        },
        cancel: (isWaiting?: boolean) => {
          uppy.removeFile(fileId);
          if (isWaiting) {
            setFileKeysOrder((f) => f.filter((f) => f !== fileKey));
            return;
          }
          setUploadNext(true);
        },
      },
    }));

    return fileKey;
  }

  return { registerFile };
}
