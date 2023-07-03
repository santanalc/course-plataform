import { gql, useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { SingleValue } from "react-select";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { v4 as uuidv4, v4 } from "uuid";
import { LoadingFilesAtom } from "../../../../atoms/UploadFilesAtom";
import { UserAtom } from "../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  ImageFileType,
  SendNotificationToMyselfMutation,
  SendNotificationToMyselfMutationVariables,
} from "../../../../generated/graphql";
import useFirebaseStorage from "../../../../hooks/useFirebaseStorage";
import useUploadFile, {
  HookFileUploadAtom,
  INIT_ENCODE_VIDEO_LESSON,
} from "../../../../hooks/useUploadFile";
import { firebase } from "../../../../service/FirebaseService";
import { IMedia } from "../../../global/StyledDropMedia";
import StyledDropMediaUploader from "../../../global/StyledDropMediaUploader";
import StyledSelect from "../../../global/StyledSelect";
import { CREATE_LESSON } from "../../Content/Add&Edit/Course/AddContent/WrapperTopics/TopicCard/TopicCard";
import * as SC from "./FormUploaderStyledComponents";
import { b64toBlob } from "../../../../utils/b64toBlob";

const GetCourses = gql`
  query GetCoursesByVirtualAppIdFormUploader($virtualAppId: String!) {
    getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
      name
      id
    }
  }
`;

const GetTopics = gql`
  query GetTopicsByCourseIdFormUploader($courseId: String!) {
    getTopicsByCourseId(courseId: $courseId) {
      id
      title
    }
  }
`;

const SEND_NOTIFICATION_TO_MYSELF_MUTATION = gql`
  mutation SendNotificationToMyself(
    $title: String!
    $description: String!
    $virtualAppId: String!
    $lessonId: String!
  ) {
    sendNotificationToMyself(
      title: $title
      description: $description
      virtualAppId: $virtualAppId
      lessonId: $lessonId
    )
  }
`;

export const CREATE_LESSON_BY_VIDEO = gql`
  mutation createLessonByVideoUploading(
    $courseId: String!
    $topicId: String!
    $data: CreateLessonInput!
  ) {
    createLessonByVideoUploading(
      courseId: $courseId
      topicId: $topicId
      data: $data
    ) {
      id
      topicId
      title
      description
      active
      order
    }
  }
`;

export const CurrentCourseUploaderAtom = atom<
  { value: string; label: string } | undefined
>({
  key: "CurrentCourseUploaderAtom",
  default: undefined,
});

export const CurrentTopicUploaderAtom = atom<
  { value: string; label: string } | undefined
>({
  key: "CurrentTopicUploaderAtom",
  default: undefined,
});

function getFileExtension(name: string) {
  const lastIndexOf = name.lastIndexOf(".");
  if (lastIndexOf == -1) {
    return ""; // empty extension
  }
  return name.substring(lastIndexOf);
}

export default function FormUploader() {
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const client = useApolloClient();

  const { registerFile } = useUploadFile();

  const [isLoading, setIsLoading] = useState(false);

  const [medias, setMedias] = useState<IMedia[]>([]);
  const setUploadFiles = useSetRecoilState(HookFileUploadAtom);
  const setLoadingFiles = useSetRecoilState(LoadingFilesAtom);
  const dropMediaRef = useRef<HTMLInputElement | null>(null);

  const toast = useToast();

  const [currentCourse, setCurrentCourse] = useRecoilState(
    CurrentCourseUploaderAtom
  );
  const [currentTopic, setCurrentTopic] = useRecoilState(
    CurrentTopicUploaderAtom
  );
  const [keyCurrentTopic, setKeyCurrentTopic] = useState(v4());

  const [courses, setCourses] = useState<{ value: string; label: string }[]>(
    []
  );
  const [topics, setTopics] = useState<{ value: string; label: string }[]>([]);
  const [lessons, setLessons] = useState<
    { value: string; label: string; mediaUrl: string; contenttype: string }[]
  >([]);

  const { uploadFileToFirestorage, uploadImageToFirestorage } =
    useFirebaseStorage();
  const user = useRecoilValue(UserAtom);

  function courseOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setCurrentCourse(newValue as any);
    setCurrentTopic({ value: "", label: "" });
    setKeyCurrentTopic(v4());
  }

  function topicOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setCurrentTopic(newValue as any);
  }

  async function getVideoDurationAndThumbnail(file: File): Promise<{
    videoDuration: number;
    videoThumbnail: string;
  }> {
    return await new Promise((resolve, reject) => {
      let video = document.createElement("video");
      let canvas = document.createElement("canvas");

      video.preload = "metadata";

      video.onloadedmetadata = async () => {};

      video.oncanplay = function () {
        if (video.duration < 10) video.currentTime = video.duration;
        else video.currentTime = 10;
        video.oncanplay = null;
      };

      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")!
          .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        window.URL.revokeObjectURL(video.src);
        resolve({
          videoDuration: video.duration,
          videoThumbnail: canvas.toDataURL("image/png"),
        });
      };
      video.src = URL.createObjectURL(file);
      video.load();
    });
  }

  async function getAudioDuration(file: File): Promise<number> {
    return await new Promise((resolve, reject) => {
      let audio = document.createElement("audio");

      audio.preload = "metadata";

      audio.onloadedmetadata = async () => {
        resolve(audio.duration);
      };

      audio.src = URL.createObjectURL(file);
    });
  }

  async function handleUpload(medias: IMedia[]) {
    let selectedCourse = currentCourse?.value;
    let selectedTopic = currentTopic?.value;

    medias.forEach(async (media, index) => {
      if (
        !media.file ||
        (media.contentType !== "video" && media.contentType !== "audio") ||
        !virtualApp?.id ||
        !user
      )
        return;

      if (media.contentType === "video") {
        try {
          const response = await client.mutate({
            mutation: CREATE_LESSON_BY_VIDEO,
            variables: {
              courseId: selectedCourse,
              topicId: selectedTopic,
              data: {
                title: "Uploading",
                description: "File is still uploading — DO NOT PUBLISH",
                order: lessons.length + 1,
                virtualAppIds: [virtualApp.id],
                contenttype: "video",
              },
            },
          });

          const { videoDuration, videoThumbnail } =
            await getVideoDurationAndThumbnail(media.file);

          const fileBlob = await b64toBlob(videoThumbnail);
          const fileImage = new File([fileBlob], "thumbnail", {
            type: "image/png",
          });
          let thumbnailUrl = await uploadImageToFirestorage({
            file: fileImage,
            folder: "Course",
            folderId: uuidv4(),
            type: ImageFileType.Banner,
          });
            
          const videoUploaderOptions = {
            filePath: response.data.createLessonByVideoUploading.id, //It is gonna change in Media Manager
            fileName: media.file.name,
            file: media.file,
            src: media.src,
            virtualAppId: virtualApp.id,
            courseId: selectedCourse || "",
            courseName: currentCourse?.label || "",
            topicId: selectedTopic || "",
            lessonId: response.data.createLessonByVideoUploading.id,
            userUid: user.id,
            fileDuration: videoDuration || 0,
            thumbnail: videoThumbnail || "",
            thumbnailUrl,
          };

          const fileKey = await registerFile(videoUploaderOptions);

          // Register a firebase listener to check for the title being "Ready"
          const unsub = onSnapshot(
            doc(
              firebase.db,
              `/temporaryUpload/${selectedCourse}/topics/${selectedTopic}/lessons/${response.data.createLessonByVideoUploading.id}`
            ),
            (lessonRef) => {
              if (!lessonRef.exists()) {
                unsub();
                return;
              }
              let lessonData = lessonRef.data();
              if (lessonData?.title?.trim().toLowerCase() === "ready") {
                unsub();
                setUploadFiles((files) => {
                  return files
                    ? {
                        ...files,
                        [fileKey]: {
                          ...files[fileKey],
                          status: "COMPLETED",
                          percentage: "100.00",
                        },
                      }
                    : null;
                });
              }

              if (
                lessonData?.title?.trim().toLowerCase() === "encoding" &&
                lessonData.encodeFileId
              ) {
                let percentage = "";

                percentage = (
                  (parseInt(lessonData.currentChunkProcess) /
                    parseInt(lessonData.maxChunkProcess)) *
                  100
                ).toFixed(2);

                setUploadFiles((files) => {
                  let currentPercentage = files?.[fileKey]?.percentage || "0";
                  if (parseInt(currentPercentage) < parseInt(percentage))
                    currentPercentage = percentage;

                  return files
                    ? {
                        ...files,
                        [fileKey]: {
                          ...files[fileKey],
                          percentage: currentPercentage,
                        },
                      }
                    : null;
                });
              }

              if (lessonData?.title?.trim().toLowerCase() === "error") {
                unsub();
                setUploadFiles((files) => {
                  console.log("Failed!", fileKey, files?.[fileKey]);
                  return files
                    ? {
                        ...files,
                        [fileKey]: { ...files[fileKey], status: "FAILED" },
                      }
                    : null;
                });
              }
            }
          );

          setLessons([
            ...lessons,
            {
              value: response.data.createLessonByVideoUploading.id,
              label: "",
              mediaUrl: "",
              contenttype: "video",
            },
          ]);
        } catch (error) {
          console.log("[ERROR] handleUpload", { error, media });
          toast({
            title: `Error uploading ${media.file?.name} - ${error}`,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });

          setLoadingFiles((loadingFiles) => {
            const newLoadingFiles = loadingFiles.filter(
              (loadingFile) => loadingFile.src !== media.src
            );
            return newLoadingFiles;
          });
        }
      } else if (media.contentType === "audio") {
        const audioId = uuidv4();

        setLoadingFiles((loadingFiles) => {
          const newLoadingFiles = loadingFiles.filter(
            (name) => name.src !== media.src
          );
          return newLoadingFiles;
        });

        const audioDuration = await getAudioDuration(media.file);

        setUploadFiles((uploadFiles) => {
          return {
            ...(uploadFiles || {}),
            [audioId]: {
              percentage: "0",
              fileName: media.file?.name || "",
              fileId: audioId,
              size: ((media.file?.size || 0) / 1024 / 1024).toFixed(2),
              src: media.src,
              status: "UPLOADING",
              ext: getFileExtension(media.file?.name || ""),
              isAudio: true,
              // courseId,
              // lessonId,
              // virtualAppId,
              // userUid,
              // topicId,
              fileDuration: audioDuration,
              // thumbnail,
              courseName: currentCourse?.label || "",
              // thumbnailUrl,
              isPaused: false,
              filePath: "",
              pauseResume: () => {},
              cancel: () => {},
            } as any,
          };
        });

        let thumbnailUrl =
          "https://firebasestorage.googleapis.com/v0/b/learnistic-production.appspot.com/o/dxVMNixAfHg43x7lShUTu5zyZAc2%2Flesson%2F02wnTGLM8qkq9sC9m4Uq?alt=media&token=2beaa12a-615e-496e-8c13-9e986c5ea9ad";

        let mediaUrl = await uploadFileToFirestorage({
          file: media.file,
          folder: "Lesson",
          folderId: uuidv4(),
        });

        const response = await client.mutate({
          mutation: CREATE_LESSON,
          variables: {
            courseId: selectedCourse,
            topicId: selectedTopic,
            data: {
              title: "Ready",
              description: `${
                media.file?.name || ""
              } - Please change the title and description and thumbnail (if desired) prior to publishing`,
              order: lessons.length + 1,
              thumbnail: thumbnailUrl,
              contenttype: media.contentType,
              lessonMinutes: audioDuration,
              mediaUrl,
              virtualAppIds: [virtualApp.id],
            },
          },
        });

        await client.mutate({
          mutation: INIT_ENCODE_VIDEO_LESSON,
          variables: {
            virtualAppId: virtualApp.id,
            courseId: selectedCourse,
            topicId: selectedTopic,
            lessonId: response.data.createLesson.id,
            filePath: mediaUrl,
            fileName: media.file?.name || "",
            userUid: user.id,
            fileId: audioId,
            fileSize: 0,
            createdAt: dayjs().toISOString(),
            fileDuration: audioDuration,
            status: "Completed",
          },
        });

        setUploadFiles((uploadFiles) => {
          return {
            ...(uploadFiles || {}),
            [audioId]: {
              //@ts-ignore
              ...uploadFiles[audioId],
              percentage: "100.00",
              fileName: media.file?.name || "",
              status: "COMPLETED",
            } as any,
          };
        });

        // After the filename extension there were some artifacts. Here, I remove them
        // by stripping the filename altogether
        let fileNameDotArray = (media.file?.name || "").split(".");
        fileNameDotArray.pop();
        let fileNameWithoutExtension = fileNameDotArray.join(".");

        const title = "File upload completed";
        const description = `Your file ${
          fileNameWithoutExtension ? `"${fileNameWithoutExtension}"` : ""
        } has completed encoding and is ready to publish. Please change the title, description and/or thumbnail if you want within the CMS.`;

        // Send a notification to my app saying it's done
        await client.mutate<
          SendNotificationToMyselfMutation,
          SendNotificationToMyselfMutationVariables
        >({
          mutation: SEND_NOTIFICATION_TO_MYSELF_MUTATION,
          variables: {
            title,
            description,
            virtualAppId: virtualApp.id,
            lessonId: response.data.createLesson.id,
          },
        });

        setLessons([
          ...lessons,
          {
            value: response.data.createLesson.id,
            label: "",
            mediaUrl: mediaUrl || "",
            contenttype: "audio",
          },
        ]);
      }
    });
  }

  useEffect(() => {
    if (!medias.length) return;
    const mediasArray = [...medias];
    setMedias([]);
    handleUpload(mediasArray);
  }, [medias]);

  useEffect(() => {
    if (virtualApp?.id) {
      (async () => {
        const getCoursesResponse = await client.query<any>({
          query: GetCourses,
          variables: {
            virtualAppId: virtualApp?.id,
          },
        });

        const newGetCoursesResponse =
          getCoursesResponse.data.getCoursesByVirtualAppId.map(
            (course: any) => {
              return { value: course.id, label: course.name };
            }
          );

        setCourses(newGetCoursesResponse);
      })();
    }
  }, [virtualApp?.id]);

  useEffect(() => {
    if (currentCourse) {
      (async () => {
        setIsLoading(true);

        const getTopicsResponse = await client.query<any>({
          query: GetTopics,
          variables: {
            courseId: currentCourse.value,
          },
        });

        const newGetTopicsResponse =
          getTopicsResponse.data.getTopicsByCourseId.map((topic: any) => {
            return { value: topic.id, label: topic.title };
          });

        setTopics(newGetTopicsResponse);

        if (newGetTopicsResponse.length === 1) {
          setCurrentTopic(newGetTopicsResponse[0] as any);
        }

        setIsLoading(false);
      })();
    }
  }, [currentCourse]);

  return (
    <SC.Container>
      <SC.FormContainer>
        <SC.FormWrapper>
          <label>Select Course</label>
          <StyledSelect
            onChange={courseOnChange}
            options={courses}
            placeholder="Enter or select course"
            defaultValue={currentCourse}
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <label>Select Topic</label>
          <StyledSelect
            key={keyCurrentTopic}
            onChange={topicOnChange}
            options={topics}
            placeholder={isLoading ? "Searching" : "Enter or select topic"}
            isDisabled={isLoading || !currentCourse?.value}
            isLoading={isLoading}
            defaultValue={currentTopic}
          />
        </SC.FormWrapper>
      </SC.FormContainer>

      <StyledDropMediaUploader
        isDisabled={!currentTopic?.value || !currentCourse?.value}
        ref={dropMediaRef}
        setMedia={(vle) => {
          setMedias((media) => [...media, ...vle]);
        }}
        handleButtonClick={() => {
          dropMediaRef.current?.click();
        }}
      />
    </SC.Container>
  );
}
