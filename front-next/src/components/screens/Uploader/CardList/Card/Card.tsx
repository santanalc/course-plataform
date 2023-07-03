import { useApolloClient } from "@apollo/client";
import { Progress, Spinner } from "@chakra-ui/react";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaPauseCircle,
  FaPlayCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { IFile } from "../../../../../atoms/UploadFilesAtom";
import { useRaisedShadow } from "../../../../../hooks/useRaisedShadow";
import { HookFileUploadAtom } from "../../../../../hooks/useUploadFile";
import { REMOVE_LESSON } from "../../../Content/Add&Edit/Course/AddContent/WrapperTopics/LessonCard/LessonCard";
import * as SC from "./CardStyledComponents";

type CardProps = {
  downloadItem: IFile;
  fileId: string;
};

export default function Card({ downloadItem, fileId }: CardProps) {
  const [downloadStatus, setDownloadStatus] = useState("loading");
  const [uploadFiles, setUploadFiles] = useRecoilState(HookFileUploadAtom);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  const client = useApolloClient();

  useEffect(() => {
    if (downloadItem.status === "COMPLETED") {
      setDownloadStatus("success");
    }

    if (downloadItem.status === "FAILED") setDownloadStatus("error");
  }, [downloadItem.percentage, downloadItem.status]);

  useEffect(() => {
    if (uploadFiles && uploadFiles[fileId].isPaused)
      setDownloadStatus("paused");
  }, [uploadFiles]);

  const returnIcon = () => {
    switch (downloadStatus) {
      case "success":
        return (
          <FaCheckCircle className="hidden-on-hover" color="var(--green-300)" />
        );
      case "error":
        return (
          <FaExclamationTriangle className="hidden-on-hover" color="#F8BF00" />
        );

      case "paused":
        return (
          <SC.Icons>
            <FaPlayCircle
              onClick={() => {
                downloadItem.pauseResume();
                setDownloadStatus("loading");
                if (uploadFiles)
                  setUploadFiles({
                    ...uploadFiles,
                    [fileId]: {
                      ...uploadFiles[fileId],
                      isPaused: false,
                    },
                  });
              }}
              className="hidden-on-hover"
              color="var(--green-300)"
            />
            <FaTimesCircle
              onClick={async () => {
                setDownloadStatus("paused");
                downloadItem.cancel();

                await client.mutate({
                  mutation: REMOVE_LESSON,
                  variables: {
                    courseId: downloadItem.courseId,
                    topicId: downloadItem.topicId,
                    lessonId: downloadItem.lessonId,
                  },
                });
              }}
              className="hidden-on-hover"
              color="#c41700"
            />
          </SC.Icons>
        );

      case "loading":
        return (
          <SC.Icons>
            <FaPauseCircle
              onClick={() => {
                downloadItem.pauseResume();
                setDownloadStatus("paused");

                if (uploadFiles)
                  setUploadFiles({
                    ...uploadFiles,
                    [fileId]: {
                      ...uploadFiles[fileId],
                      isPaused: true,
                    },
                  });
              }}
              className="visible-on-hover"
              color="var(--orange-300)"
            />
            <FaTimesCircle
              onClick={async () => {
                setDownloadStatus("paused");
                downloadItem.cancel();

                await client.mutate({
                  mutation: REMOVE_LESSON,
                  variables: {
                    courseId: downloadItem.courseId,
                    topicId: downloadItem.topicId,
                    lessonId: downloadItem.lessonId,
                  },
                });
              }}
              className="hidden-on-hover"
              color="#c41700"
            />
          </SC.Icons>
        );

      default:
        return (
          <Spinner
            className="hidden-on-hover"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.300"
            size="md"
          />
        );
    }
  };

  console.log(downloadItem);

  return (
    <Reorder.Item
      value={fileId}
      id={fileId}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <SC.Container
        className="noselect"
        waiting={downloadItem.status === "WAITING"}
      >
        <SC.ProgressInfoWrapper>
          {downloadItem.status === "WAITING" && (
            <SC.DragIconContainer
              onPointerDown={(event) => {
                dragControls.start(event);
              }}
            >
              <HiMenu />
            </SC.DragIconContainer>
          )}

          <SC.FirstColumnWrapper>
            <h2 className="file-name">{downloadItem.fileName}</h2>
            <Progress
              size="sm"
              width="100%"
              value={
                parseInt(downloadItem.percentage)
                  ? parseInt(downloadItem.percentage)
                  : 0
              }
              css={SC.ProgressCSS}
            />
            <SC.StatusWrapper>
              <div className="flex">
                <p className="file-size ">{downloadItem.size} mb •</p>
                <p className="file-size ml">
                  {downloadItem.fileDuration < 3600
                    ? new Date(downloadItem.fileDuration * 1000)
                        .toISOString()
                        .substring(12, 19)
                    : new Date(downloadItem.fileDuration * 1000)
                        .toISOString()
                        .substring(12, 19)}
                </p>
              </div>
              {false ? (
                <SC.UploadFailedWrapper>
                  <p className="text">Upload failed</p>
                  <button>Retry</button>
                </SC.UploadFailedWrapper>
              ) : (
                <p className="progress-label">
                  {(() => {
                    switch (downloadItem.status) {
                      case "ENCODING": {
                        if (parseInt(downloadItem.percentage) > 0)
                          return `Encoding: ${
                            parseInt(downloadItem.percentage)
                              ? downloadItem.percentage
                              : "0"
                          }%`;
                        else return "Waiting to encode";
                      }

                      case "TRANSCODING": {
                        if (parseInt(downloadItem.percentage) > 0)
                          return `Transcoding: ${
                            parseInt(downloadItem.percentage)
                              ? downloadItem.percentage
                              : "0"
                          }%`;
                        else return "Waiting to transcode";
                      }

                      case "UPLOADING":
                        return `Uploading: ${downloadItem.percentage}%`;

                      case "COMPLETED":
                        return "Processed";

                      case "FAILED":
                        return "Upload Failed";

                      case "WAITING":
                        return "Waiting to upload";

                      default:
                        return "Upload Failed";
                    }
                  })()}
                </p>
              )}
            </SC.StatusWrapper>
          </SC.FirstColumnWrapper>
          <SC.DownloadStatusWrapper>
            {(downloadItem.status === "UPLOADING" ||
              downloadItem.status === "COMPLETED") &&
            !downloadItem?.isAudio ? (
              returnIcon()
            ) : downloadItem.status === "ENCODING" ||
              downloadItem.status === "TRANSCODING" ||
              (downloadItem?.isAudio && downloadItem.status === "UPLOADING") ? (
              parseInt(downloadItem.percentage) <= 0 ||
              !downloadItem.percentage ||
              downloadItem.percentage === "NaN" ? null : (
                <Spinner
                  className="hidden-on-hover"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="orange.300"
                  size="md"
                />
              )
            ) : downloadItem?.isAudio && downloadItem.status === "COMPLETED" ? (
              <FaCheckCircle
                className="hidden-on-hover"
                color="var(--green-300)"
              />
            ) : (
              <FaTimesCircle
                onClick={() => {
                  setDownloadStatus("paused");
                  downloadItem.cancel(downloadItem.status === "WAITING");

                  // client.mutate({
                  //   mutation: REMOVE_LESSON,
                  //   variables: {
                  //     courseId: downloadItem.courseId,
                  //     topicId: downloadItem.topicId,
                  //     lessonId: downloadItem.lessonId,
                  //   },
                  // });
                }}
                className="hidden-on-hover"
                color="#c41700"
              />
            )}
          </SC.DownloadStatusWrapper>
        </SC.ProgressInfoWrapper>
      </SC.Container>
    </Reorder.Item>
  );
}
