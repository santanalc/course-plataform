import { Reorder } from "framer-motion";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoadingFilesAtom } from "../../../../atoms/UploadFilesAtom";
import {
  HookFileKeysOrder,
  HookFileUploadAtom,
} from "../../../../hooks/useUploadFile";
import Card from "./Card/Card";
import LoadingCard from "./Card/LoadingCard";
import * as SC from "./CardListStyledComponents";

export default function CardList() {
  const uploadFiles = useRecoilValue(HookFileUploadAtom);
  const [loadingFiles, setLoadingFiles] = useRecoilState(LoadingFilesAtom);
  const [fileKeysOrder, setFileKeysOrder] = useRecoilState(HookFileKeysOrder);

  useEffect(() => {
    if (!uploadFiles) return;

    setLoadingFiles((loadingFiles) => {
      const newLoadingFiles = loadingFiles.filter((name) => {
        const card = Object.keys(uploadFiles).find(
          (fileKey) => name.src === uploadFiles[fileKey].src
        );

        return !card;
      });
      return newLoadingFiles;
    });
  }, [uploadFiles]);

  return (
    <SC.Container>
      {uploadFiles && (
        <>
          {Object.keys(uploadFiles).length ? (
            <SC.Title>Encoding Queue</SC.Title>
          ) : (
            <></>
          )}

          <Reorder.Group
            className="reorder-group"
            axis="y"
            onReorder={(v) => {}}
            values={Object.keys(uploadFiles)}
            style={{ width: "100%" }}
            layoutScroll
          >
            {Object.keys(uploadFiles).map((fileKey) => {
              if (uploadFiles[fileKey].status === "WAITING") return null;

              return (
                <Card
                  key={fileKey}
                  downloadItem={uploadFiles[fileKey]}
                  fileId={fileKey}
                />
              );
            })}
          </Reorder.Group>
        </>
      )}

      {(uploadFiles || loadingFiles.length > 0) && (
        <>
          {fileKeysOrder.length ? <SC.Title>Waiting to Upload</SC.Title> : <></>}

          {uploadFiles && fileKeysOrder.length ? (
            <Reorder.Group
              className="reorder-group"
              axis="y"
              onReorder={(v) => {
                setFileKeysOrder([...v]);
              }}
              values={fileKeysOrder}
              style={{ width: "100%", overflowY: "auto", minHeight: "200px" }}
              layoutScroll
            >
              {fileKeysOrder.map((fileKey) => {
                const file = uploadFiles[fileKey];
                if (!file) return;

                if (file?.status !== "WAITING") return null;

                return (
                  <Card key={fileKey} downloadItem={file} fileId={fileKey} />
                );
              })}
            </Reorder.Group>
          ) : (
            <></>
          )}

          {loadingFiles.map((file) => {
            return <LoadingCard key={file.fileName} fileName={file.fileName} />;
          })}
        </>
      )}
    </SC.Container>
  );
}
