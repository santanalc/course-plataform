import { atom } from "recoil";

export interface IFile {
  fileName: string;
  fileId: string;
  percentage: string;
  virtualAppId: string;
  courseId: string;
  courseName: string;
  topicId: string;
  lessonId: string;
  filePath: string;
  userUid: string;
  fileDuration: number;
  src: string;
  status:
    | "UPLOADING"
    | "TRANSCODING"
    | "ENCODING"
    | "COMPLETED"
    | "FAILED"
    | "WAITING";
  size: string;
  ext: string;
  thumbnail: string;
  thumbnailUrl: string;
  isPaused: boolean;
  pauseResume: () => void;
  cancel: (isWaiting?: boolean) => void;
  isAudio?: boolean;
}

export interface IFileUpload {
  [fileId: string]: IFile;
}

interface IFileLoading {
  fileName: string;
  src: string;
}

export const LoadingFilesAtom = atom<IFileLoading[]>({
  key: "LoadingFilesAtom",
  default: [],
});
