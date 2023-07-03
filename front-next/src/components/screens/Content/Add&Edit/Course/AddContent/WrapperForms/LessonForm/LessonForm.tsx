import { gql, useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/toast";
import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CourseContentCurrentSelected,
  CourseIdAtom,
  TopicsAtom,
} from "../../../../../../../../atoms/NewCourseAtom";
import { UserAtom } from "../../../../../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../../../../../atoms/VirtualAppAtom";
import {
  ImageFileType,
  LessonType,
} from "../../../../../../../../generated/graphql";
import useFirebaseStorage from "../../../../../../../../hooks/useFirebaseStorage";
import StyledButton from "../../../../../../../global/StyledButton";
import StyledDropImage from "../../../../../../../global/StyledDropImage";
import StyledDropMedia, {
  IMedia,
} from "../../../../../../../global/StyledDropMedia";
import StyledInput from "../../../../../../../global/StyledInput";
import StyledTextArea from "../../../../../../../global/StyledTextArea";
import * as SC from "./LessonFormStyledComponents";
import { v4 as uuidv4 } from "uuid";
export const UPDATE_LESSON = gql`
  mutation UpdateLesson(
    $courseId: String!
    $topicId: String!
    $lessonId: String!
    $data: UpdateLessonInput!
  ) {
    updateLesson(
      courseId: $courseId
      topicId: $topicId
      lessonId: $lessonId
      data: $data
    )
  }
`;
export default function LessonForm() {
  const toast = useToast();
  const [topics, setTopics] = useRecoilState(TopicsAtom);
  const [selected, setSelected] = useRecoilState(CourseContentCurrentSelected);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const courseId = useRecoilValue(CourseIdAtom);
  const client = useApolloClient();
  const vApp = useRecoilValue(VirtualAppAtom);
  const [media, setMedia] = useState<IMedia>({
    src: "",
    alt: "",
  });
  const [thumbnail, setThumbnail] = useState<IMedia>({
    src: "",
    alt: "",
  });
  // const { registerFileAndDoUpload } = useUploadFile();
  const dropMediaRef = useRef<HTMLInputElement | null>(null);
  const { uploadFileToFirestorage, uploadImageToFirestorage } =
    useFirebaseStorage();
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    if (selected.id && selected.selected === "LESSON" && selected.topicId) {
      const selectedLesson = topics
        .filter((topic) => topic.id == selected.topicId)[0]
        .lessons?.filter((lesson) => lesson.id === selected.id)[0];

      if (selectedLesson) {
        setLesson(selectedLesson);
        setMedia({
          src: selectedLesson.mediaUrl || "",
          alt: "",
          contentType: selectedLesson.contenttype,
        });
        setThumbnail({ src: selectedLesson.thumbnail || "", alt: "" });
      }
    }
  }, [selected]);

  async function handleSubmit() {
    if (!courseId || !lesson || !vApp || !user) return false;

    let hasError = false;

    if (!lesson?.title) {
      hasError = true;
      setIsTitleEmpty(true);
    }

    if (!lesson?.description) {
      hasError = true;
      setIsDescriptionEmpty(true);
    }

    if (hasError) {
      toast({
        title: "Form error",
        description: "Fields invalids",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsLoading(false);
      return;
    }

    let thumbnailUrl: string | null | undefined = null;

    if (thumbnail.file) {
      thumbnailUrl = await uploadImageToFirestorage({
        file: thumbnail.file,
        folder: "Article",
        type: ImageFileType.Banner,
        folderId: uuidv4(),
      });
    }

    let mediaUrl: string | null | undefined = null;

    if (media.file) {
      switch (media.contentType) {
        case "video":
          // registerFileAndDoUpload({
          //   file: media.file,
          //   src: media.src,
          //   courseId: courseId,
          //   topicId: lesson.topicId,
          //   lessonId: lesson.id,
          //   vAppId: vApp.id,
          //   thumbnailUrl,
          //   userUid: user.id,
          // });
          mediaUrl = `https://learnistic-p1.s3.us-east-2.amazonaws.com/${vApp.id}/courses/${courseId}/topics/${lesson.topicId}/lessons/${lesson.id}/master.m3u8`;
          break;

        case "audio":
          mediaUrl = await uploadFileToFirestorage({
            file: media.file,
            folder: "Lesson",
            folderId: uuidv4(),
          });
          break;

        default:
          break;
      }
    }

    const response = await client.mutate({
      mutation: UPDATE_LESSON,
      variables: {
        courseId,
        topicId: lesson.topicId,
        lessonId: lesson.id,
        data: {
          title: lesson.title,
          description: lesson.description,
          ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
          ...(media.contentType && { contenttype: media.contentType }),
          ...(mediaUrl && {
            mediaUrl,
          }),
        },
      },
    });

    const newTopics = topics.map((top) => {
      if (top.id === lesson.topicId) {
        const newLessons = top.lessons?.map((les) => {
          if (les.id === lesson.id) {
            return {
              ...les,
              title: lesson.title,
              description: lesson.description,
            };
          } else return les;
        });

        return { ...top, lessons: newLessons };
      } else return top;
    });

    setTopics(newTopics);

    setIsLoading(false);
  }

  return (
    <SC.Container>
      <SC.Header>
        <h1 className="title">New Lesson</h1>
        <MdClose onClick={() => setSelected({ selected: "NOTHING" })} />
      </SC.Header>
      <SC.Wrapper>
        <SC.FormContent>
          {/* <SC.FormWrapper>
            <label>Lesson Status</label>
            <StyledSwitch
              value={lesson?.active!}
              setValue={(vle) => {
                setLesson({ ...lesson, active: vle } as any); //Need to fix types
              }}
              
              labelActive="Active"
              labelInactive="Disabled"
            />
          </SC.FormWrapper> */}

          <SC.FormWrapper>
            <label>Lesson Title</label>
            <StyledInput
              placeholder="Enter lesson title"
              value={lesson?.title}
              onChange={(e) => {
                setLesson({ ...lesson, title: e.target.value } as any); //Need to fix types

                setIsTitleEmpty(false);
              }}
              error={isTitleEmpty}
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Lesson Description</label>
            <StyledTextArea
              placeholder="Enter lesson title"
              value={lesson?.description}
              onChange={(e) => {
                setLesson({ ...lesson, description: e.target.value } as any); //Need to fix types

                setIsDescriptionEmpty(false);
              }}
              error={isDescriptionEmpty}
            />
          </SC.FormWrapper>

          <div className="divider" />
          <SC.FormWrapper>
            <label>Default Media Lesson</label>
            <StyledDropMedia
              {...media}
              ref={dropMediaRef}
              setMedia={setMedia}
              title="Drop file to upload media lesson"
              description="1GB Upload Limit • MP4, MOV, MP3, AVI, M4V, PDF"
              thumbnail={thumbnail.src}
              handleButtonClick={() => {
                dropMediaRef.current?.click();
              }}
            />
          </SC.FormWrapper>

          <div className="divider" />

          {media.src && (
            <>
              <SC.FormWrapper>
                <label>Lesson Thumbnail</label>
                <StyledDropImage
                  {...thumbnail}
                  title="Drop file to upload your icon"
                  description="1280 x 720px"
                  setImage={(vle) => {
                    setThumbnail(vle);
                  }}
                  handleButtonClick={(e) => {}}
                  widthLimit={1280}
                  heightLimit={720}
                />
              </SC.FormWrapper>
              <div className="divider" />
            </>
          )}

          <SC.ButtonWrapper>
            <StyledButton
              onClick={() => setSelected({ selected: "NOTHING" })}
              variant="outlined"
            >
              Cancel
            </StyledButton>
            <StyledButton
              isLoading={isLoading}
              onClick={() => {
                if (isLoading) return;
                setIsLoading(true);
                handleSubmit();
              }}
            >
              Save
            </StyledButton>
          </SC.ButtonWrapper>
        </SC.FormContent>
      </SC.Wrapper>
    </SC.Container>
  );
}
