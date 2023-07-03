import React, { useMemo, useRef, useState } from "react";
import { FileUploadAPI, UploadFileController } from "../api/FileUploadAPI";

export default function VideoUploadScreen() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileUploadPercentage, setFileUploadPercentage] = useState("");
  const [uploadState, setUploadState] = useState<
    "DONE" | "PAUSED" | "UPLOADING"
  >("DONE");

  const uploadFileControllerRef = useRef<UploadFileController | null>(null);

  const chunks = useMemo(() => {
    if (!selectedFile) return 0;

    return Math.ceil(selectedFile.size / (512 * 1000));
  }, [selectedFile]);

  async function registerFileAndDoUpload() {
    // if (!selectedFile) return;
    // let fileId: string | null = null;
    // if (!uploadFileControllerRef.current) {
    //   // Create the controller
    //   uploadFileControllerRef.current = FileUploadAPI.uploadFileController({
    //     file: selectedFile,
    //     onChunkUploaded: ({ currentChunk, totalChunks }) =>
    //       setFileUploadPercentage(
    //         // Transform1/4 => 25.00%
    //         ((currentChunk / totalChunks) * 100).toFixed(2)
    //       ),
    //   });
    //   // Register the file and get it's id
    //   let fileUploadRegister =
    //     await uploadFileControllerRef.current.registerFile();
    //   fileId = fileUploadRegister.fileId;
    // }
    // if (!fileId)
    //   throw new Error(
    //     "An error occured! After registering the `fileId` was not created properly!"
    //   );
    // // Get the ID into the component and start the upload
    // setSelectedFileId(fileId);
    // await uploadFileControllerRef.current.upload({
    //   fileId,
    // });
  }

  async function continueUpload() {
    // Do checks to ensure everything is in place for continue upload
    if (!selectedFileId) return;
    if (!uploadFileControllerRef.current) return;

    // Start the upload
    // const { completed } = await uploadFileControllerRef.current.upload({
    //   fileId: selectedFileId,
    // });

    // It can either be paused or completed
    // if (completed) {
    //   setUploadState("DONE");
    // } else {
    //   setUploadState("PAUSED");
    // }
  }

  return (
    <div>
      <input
        type={"file"}
        onChange={(evt) => {
          if (!evt.target.files) return;

          const file = evt.target.files[0];

          setSelectedFile(file);
          setFileUploadPercentage("");
          setUploadState("DONE");
        }}
      />

      {selectedFile && <div>{selectedFile.size / 1000} KB</div>}
      <div>{chunks} total chunks</div>
      <div>File Id: #{selectedFileId}</div>

      <div>File upload percentage: {fileUploadPercentage}%</div>

      <br />

      {selectedFileId && (
        <button
          onClick={() => {
            setSelectedFileId(null);
            uploadFileControllerRef.current = null;
            setFileUploadPercentage("");
          }}
        >
          Clear file upload
        </button>
      )}
      <br />

      {selectedFileId && uploadState !== "PAUSED" && (
        <>
          <button
            onClick={() => {
              uploadFileControllerRef.current?.pauseUpload();
              setUploadState("PAUSED");
            }}
          >
            Pause upload
          </button>
        </>
      )}
      <br />

      {selectedFileId && uploadState === "PAUSED" && (
        <>
          <button
            onClick={() => {
              continueUpload();
              setUploadState("UPLOADING");
            }}
          >
            Continue upload
          </button>
        </>
      )}
      <br />

      {chunks && uploadState === "DONE" ? (
        <button
          onClick={() => {
            registerFileAndDoUpload();
          }}
        >
          Start upload
        </button>
      ) : (
        ""
      )}
    </div>
  );
}


// Hostname:
// ewr1.vultrobjects.com
// Secret Key:
// S2F68XlpWUETj9FCiJWD1iWpmKi2YJvSImDeJDoT
// Access Key:
// SXOO58AKPESD77CPVA07
