/** @jsxImportSource @emotion/react */
import { gql, useApolloClient } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { doc, onSnapshot } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { VirtualAppAtom } from "../../atoms/VirtualAppAtom";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import Table from "../../components/screens/UploaderHistory/Table/Table";
import {
  GetVideosLessonByVirtualAppIdQuery,
  GetVideosLessonByVirtualAppIdQueryVariables,
} from "../../generated/graphql";
import { HookFileUploadAtom } from "../../hooks/useUploadFile";
import { firebase } from "../../service/FirebaseService";
import * as SC from "./styled";

export const GET_VIDEOS_LESSON_BY_VIRTUAL_APP_ID_QUERY = gql`
  query GetVideosLessonByVirtualAppId($vAppId: String!) {
    getVideosLessonByVirtualAppId(vAppId: $vAppId) {
      id
      fileName
      createdAt
      status
      courseName
      lessonName
      lessonId
      topicId
      courseId
    }
  }
`;

export interface IVideoHistory {
  id: string;
  fileName: string;
  createdAt: string;
  status: string;
  courseName: string;
  lessonName: string;
  lessonId: string;
  topicId: string;
  courseId: string;
}

export default function UploaderHistory() {
  const client = useApolloClient();
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [videosHistory, setVideosHistory] = useState<IVideoHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uploadFiles = useRecoilValue(HookFileUploadAtom);
  const [hasItem, setHasItem] = useState(false);

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    if (hasItem) window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [hasItem]);

  useEffect(() => {
    if (
      uploadFiles &&
      Object.keys(uploadFiles).filter((fileId) => {
        return ["UPLOADING"].includes(uploadFiles[fileId].status);
      }).length
    ) {
      setHasItem(true);
    } else {
      setHasItem(false);
    }
  }, [uploadFiles]);

  async function getVideosLessonByVirtualAppId(virtualAppId: string) {
    let videosResponse = await client.query<
      GetVideosLessonByVirtualAppIdQuery,
      GetVideosLessonByVirtualAppIdQueryVariables
    >({
      query: GET_VIDEOS_LESSON_BY_VIRTUAL_APP_ID_QUERY,
      variables: { vAppId: virtualAppId },
      fetchPolicy: "no-cache",
    });

    const response = videosResponse.data.getVideosLessonByVirtualAppId;

    if (!response) return;

    let videos = [] as IVideoHistory[];

    if (uploadFiles) {
      let uploadingVideos = Object.keys(uploadFiles).filter((fileId) => {
        return ["UPLOADING", "WAITING"].includes(uploadFiles[fileId].status);
      });

      videos = uploadingVideos.map((fileId) => {
        return {
          id: fileId,
          fileName: uploadFiles[fileId].fileName,
          createdAt: dayjs().toISOString(),
          status: "Uploading",
          courseName: uploadFiles[fileId].courseName,
          lessonName: "Uploading",
          topicId: uploadFiles[fileId].topicId,
          lessonId: uploadFiles[fileId].lessonId,
          courseId: uploadFiles[fileId].courseId,
        };
      });
    }

    setVideosHistory([...(response as any[]), ...videos]);

    const snaps = [
      ...(response as any[]).filter((file) => file.status === "Encoding"),
      ...videos,
    ];

    snaps.forEach((file) => {
      const unsub = onSnapshot(
        doc(
          firebase.db,
          `/temporaryUpload/${file.courseId}/topics/${file.topicId}/lessons/${file.lessonId}`
        ),
        (lessonRef) => {
          if (!lessonRef.exists()) {
            unsub();
            return;
          }

          let lessonData = lessonRef.data();

          if (lessonData?.title?.trim().toLowerCase() === "ready") {
            setVideosHistory((videosH) => {
              let newVideosHistory = videosH.map((video) => {
                if (
                  video.lessonId === lessonRef.id &&
                  video.status === "Encoding"
                ) {
                  return { ...video, status: "Completed" };
                } else {
                  return video;
                }
              });

              return newVideosHistory;
            });
          }

          if (
            lessonData?.title?.trim().toLowerCase() === "encoding" &&
            lessonData.encodeFileId
          ) {
            setVideosHistory((videosH) => {
              let newVideosHistory = videosH.map((video) => {
                if (
                  video.lessonId === lessonRef.id &&
                  video.status === "Uploading"
                ) {
                  return { ...video, status: "Encoding" };
                } else {
                  return video;
                }
              });

              return newVideosHistory;
            });
          }
        }
      );
    });

    setIsLoading(false);
  }

  useEffect(() => {
    if (!virtualApp) return;
    getVideosLessonByVirtualAppId(virtualApp.id);
  }, [virtualApp]);

  return (
    <Fragment>
      <SeoHead pageName="Upload History" />
      <SC.Container>
        <TopBar title="Upload History" />

        <Fragment>
          <SC.Wrapper
            css={
              isLoading &&
              css`
                align-items: center;
              `
            }
          >
            {isLoading ? (
              <Spinner size="lg" color="orange" />
            ) : (
              <Table videos={videosHistory} />
            )}
          </SC.Wrapper>
        </Fragment>
      </SC.Container>
    </Fragment>
  );
}
