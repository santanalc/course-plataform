import axios from "axios";

// initializing axios
const api = axios.create({
  baseURL: "https://uploader-api.lrnapi.co",
});

// Chunk size must be bigger than or equal to 5MB,
// otherwise AWS will respond with:
// "Your proposed upload is smaller than the minimum allowed size"
const CHUNK_SIZE = 1024 * 1024 * 5;

export type FileModel = {
  id: string;
  name: string;
  status: string;
  chunksUploaded: number;
  totalChunks: number;
  extension: string;
};
interface PartSignedUrl {
  signedUrl: string;
  PartNumber: number;
}

export type UploadFileController = ReturnType<typeof uploadFileController>;

async function uploadFileChunk({
  chunk,
  signedUrl,
}: {
  chunk: Blob;
  signedUrl: PartSignedUrl;
}) {
  try {
    return new Promise((resolve, reject) => {
      // - 1 because PartNumber is an index starting from 1 and not 0
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", signedUrl.signedUrl);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // retrieving the ETag parameter from the HTTP headers
          const ETag = xhr.getResponseHeader("ETag");

          if (ETag) {
            const uploadedPart = {
              PartNumber: signedUrl.PartNumber,
              // removing the " enclosing carachters from
              // the raw ETag
              ETag: ETag.replaceAll('"', ""),
            };

            resolve({ ok: true, uploadedPart });
          }
        }
      };

      xhr.onerror = (error) => {
        reject(error);
      };

      xhr.onabort = () => {
        reject(new Error("Upload canceled by user"));
      };

      xhr.send(chunk);
    });
  } catch (e) {}
}

function uploadFileController(params: {
  file: File;
  filePath: string;

  onChunkUploaded: (params: {
    currentChunk: number;
    totalChunks: number;
    fileId: string;
  }) => void;

  onCompleted: (fileId: string, fileName: string) => void;
}) {
  let { file, filePath, onChunkUploaded, onCompleted } = params;

  // Initial state is with 0 chunks and paused
  let shouldPauseUpload = true;
  let fileId: string | null = null;
  let fileKey: string | null = null;
  let signedUrls: PartSignedUrl[] = [];
  let currentChunk = 0;
  let uploadedParts: any[] = [];

  const ext = file.name.split(".").pop();
  if (ext) {
    filePath += `.${ext}`;
  }

  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  async function registerFile() {
    // Can't start an upload twice

    if (fileId)
      throw new Error(
        "This file already has an id, continue the upload with `upload`"
      );

    // initializing the multipart request
    const videoInitializationUploadInput = {
      name: filePath,
    };
    const initializeReponse = await api.request({
      url: "/uploads/initializeMultipartUpload",
      method: "POST",
      data: videoInitializationUploadInput,
    });
    const AWSFileDataOutput: { fileId: string; fileKey: string } =
      initializeReponse.data;

    fileId = AWSFileDataOutput.fileId;
    fileKey = AWSFileDataOutput.fileKey;

    const AWSMultipartFileDataInput = {
      fileId: AWSFileDataOutput.fileId,
      fileKey: AWSFileDataOutput.fileKey,
      parts: totalChunks,
    };

    const signedUrlsResponse = await api.request({
      url: "/uploads/getMultipartPreSignedUrls",
      method: "POST",
      data: AWSMultipartFileDataInput,
    });

    signedUrls = signedUrlsResponse.data.parts;

    return { fileId };
  }

  async function upload() {
    // Can't call upload twice if it's already running
    if (!shouldPauseUpload) throw new Error("This upload is already running");
    if (!fileId)
      throw new Error(
        "This file doesn't have an id, register it with `registerFile`"
      );

    shouldPauseUpload = false;

    // The current chunk starts from the chunksUploaded and goes to chunksUploaded + 1
    for (let i = currentChunk; i < totalChunks; i++) {
      // This variable is controller by the function below
      if (shouldPauseUpload) {
        return { completed: false };
      }

      const nextChunk = i;

      const signedUrl = signedUrls[nextChunk];

      const sentSize = (signedUrl.PartNumber - 1) * CHUNK_SIZE;
      const chunk = file.slice(sentSize, sentSize + CHUNK_SIZE);

      const response: any = await uploadFileChunk({ chunk, signedUrl });

      // Get the current chunk
      if (response.ok) {
        currentChunk++;
        uploadedParts.push(response.uploadedPart);
      } else {
        i--;
      }

      onChunkUploaded({ currentChunk, totalChunks, fileId });
    }

    await complete();

    return { completed: true };
  }

  async function complete() {
    if (!fileId || !fileKey) return;

    const videoFinalizationMultiPartInput = {
      fileId: fileId,
      fileKey: fileKey,
      parts: uploadedParts,
    };

    await api.request({
      url: "/uploads/finalizeMultipartUpload",
      method: "POST",
      data: videoFinalizationMultiPartInput,
    });

    onCompleted(fileId, fileKey);
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

export const FileUploadAPI = {
  uploadFileController,
};
