import { BASE_URL } from "./APIConfig";

export type FileModel = {
  id: string;
  name: string;
  vAppId: string;
  checksum: string;
  status: string;
  chunksUploaded: number;
  totalChunks: number;
  extension: string;
  createdAt: Date;
};

export type UploadFileController = ReturnType<typeof uploadFileController>;

function uploadFileController(params: {
  file: File;
  courseId: string;
  topicId: string;
  lessonId: string;
  vAppId: string;
  userUid: string;

  onChunkUploaded: (params: {
    currentChunk: number;
    totalChunks: number;
    fileId: string;
  }) => void;
}) {
  const {
    file,
    onChunkUploaded,
    courseId,
    topicId,
    lessonId,
    vAppId,
    userUid,
  } = params;

  // Initial state is with 0 chunks and paused
  let shouldPauseUpload = true;
  let fileId: string | null = null;

  // Total chunks of 512kb that will be sent
  const totalChunks = Math.ceil(file.size / (512 * 1000));

  /**
   * Function to register the file on the API. From there on, do a single upload
   * using `upload`.
   *
   * Returns the fileId to be used on `upload`
   */
  async function registerFile() {
    // Can't start an upload twice

    if (fileId)
      throw new Error(
        "This file already has an id, continue the upload with `upload`"
      );

    // Do the first upload, just the tip of it, to register the file as well
    const response: { file: FileModel } = await FileUploadAPI.uploadFileChunk({
      chunkIndex: 0,
      totalChunks,
      file,
      courseId,
      topicId,
      lessonId,
      vAppId,
      userUid,
    });

    fileId = response.file.id;

    // Propagate the first event
    onChunkUploaded({
      currentChunk: response.file.chunksUploaded,
      totalChunks,
      fileId,
    });

    return { fileId };
  }

  /**
   * Function that does the upload for a fileId
   */
  async function upload(params: { fileId: string }) {
    const { fileId: fileIdParam } = params;

    // Can't call upload twice if it's already running
    if (!shouldPauseUpload) throw new Error("This upload is already running");
    if (!fileId)
      throw new Error(
        "This file doesn't have an id, register it with `registerFile`"
      );

    fileId = fileIdParam;
    shouldPauseUpload = false;

    // Get info from the server, to sync where it stopped
    const { file: fileInfo } = await FileUploadAPI.getFileInfo({
      fileId,
    });

    fileId = fileInfo.id!;

    // The current chunk starts from the chunksUploaded and goes to chunksUploaded + 1
    let currentChunk = fileInfo.chunksUploaded;

    for (let i = currentChunk; i < totalChunks; i++) {
      // This variable is controller by the function below
      if (shouldPauseUpload) {
        return { completed: false };
      }

      const response: { file: FileModel } = await FileUploadAPI.uploadFileChunk(
        {
          chunkIndex: i,
          totalChunks,
          file,
          fileId,
        }
      );

      // Get the current chunk
      if (response.file?.chunksUploaded)
        currentChunk = response.file?.chunksUploaded;
      else i--;

      onChunkUploaded({ currentChunk, totalChunks, fileId });
    }

    return { completed: true };
  }

  async function getFileId() {
    return { fileId };
  }

  function pauseUpload() {
    shouldPauseUpload = true;
  }

  return {
    registerFile,
    getFileId,
    upload,
    pauseUpload,
  };
}

async function getFileInfo(params: { fileId: string }) {
  const { fileId } = params;

  const response = await fetch(`${BASE_URL}/file/${fileId}`);
  const responseJSON: { file: FileModel } = await response.json();

  return responseJSON;
}

async function getSignedUrl(params: {
  fileFormat: string;
  courseId: string;
  topicId: string;
  lessonId: string;
  vAppId: string;
}) {
  const { vAppId, courseId, lessonId, topicId, fileFormat } = params;

  const body = new FormData();

  body.append("vAppId", vAppId);
  body.append("courseId", courseId);
  body.append("lessonId", lessonId);
  body.append("topicId", topicId);
  body.append("fileFormat", fileFormat);

  const response = await fetch(`${BASE_URL}/getSignedUrl`, {
    method: "POST",
    body,
  });

  const responseJSON = await response.json();
  
  return responseJSON;
}

async function uploadFileChunk(
  params: {
    totalChunks: number;
    chunkIndex: number;
    file: File;
  } & ( // Either uploading a chunk of a file
    | { fileId: string }
    // Or creating one
    | {
        courseId: string;
        topicId: string;
        lessonId: string;
        vAppId: string;
        userUid: string;
      }
  )
) {
  const {
    chunkIndex,

    totalChunks,
    file,
  } = params;

  const body = new FormData();

  body.append("totalChunks", totalChunks.toString());

  const fileSlice = file.slice(
    chunkIndex * 512 * 1000,
    (chunkIndex + 1) * 512 * 1000
  );

  body.append("file", fileSlice, file.name);

  if ("fileId" in params) {
    const { fileId } = params;
    body.append("fileId", fileId);
  } else if ("vAppId" in params) {
    const { vAppId, courseId, lessonId, topicId, userUid } = params;

    body.append("vAppId", vAppId);
    body.append("courseId", courseId);
    body.append("lessonId", lessonId);
    body.append("topicId", topicId);
    body.append("userUid", userUid);
    body.append(
      "base64FileName",
      btoa(
        unescape(
          encodeURIComponent(
            file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
        )
      )
    );
  }

  if (chunkIndex === 0) {
    const response = await fetch(`${BASE_URL}/file/create`, {
      method: "POST",
      body,
    });

    const responseJSON: { file: FileModel } = await response.json();

    return responseJSON;
  } else {
    const response = await fetch(`${BASE_URL}/file/patch`, {
      method: "PATCH",
      body,
    });

    const responseJSON: { file: FileModel } = await response.json();

    return responseJSON;
  }
}

async function stopFile(params: { fileId: string }) {
  const { fileId } = params;

  const response = await fetch(`${BASE_URL}/file/${fileId}`, {
    method: "DELETE",
  });
  const responseJSON: { fileDeleted: boolean } = await response.json();

  return responseJSON;
}

export const FileUploadAPI = {
  uploadFileChunk,
  getFileInfo,
  stopFile,
  uploadFileController,
  getSignedUrl,
};
