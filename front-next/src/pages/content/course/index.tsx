/** @jsxImportSource @emotion/react */
import { gql, useApolloClient } from "@apollo/client";
import { Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useRouter } from "next/dist/client/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaPlay, FaTrashAlt } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  CourseCommentSettingsAtom,
  CourseContentNotificationsAtom,
  CourseDescriptionAtom,
  CourseDonwloadLinkIconAtom,
  CourseDonwloadLinkImageAtom,
  CourseIconAtom,
  CourseIdAtom,
  CourseImageAtom,
  CourseIsEditAtom,
  CourseNumberedLessonsAtom,
  CourseStatusAtom,
  CourseTitleAtom,
  ProtectCourseAtom,
  TopicsAtom,
} from "../../../atoms/NewCourseAtom";
import { UserAtom } from "../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../atoms/VirtualAppAtom";
import SeoHead from "../../../components/global/SeoHead";
import StyledButton from "../../../components/global/StyledButton";
import { useDialog } from "../../../components/global/StyledDialog/StyledDialogHooks";
import StyledIconButton from "../../../components/global/StyledIconButton";
import TopBar from "../../../components/global/TopBar";
import WrapperForms from "../../../components/screens/Content/Add&Edit/Course/AddContent/WrapperForms/WrapperForms";
import WrapperTopics from "../../../components/screens/Content/Add&Edit/Course/AddContent/WrapperTopics/WrapperTopics";
import CoursePhoneMock from "../../../components/screens/Content/Add&Edit/Course/CoursePhoneMock/CoursePhoneMock";
import CustomizeCourse from "../../../components/screens/Content/Add&Edit/Course/CustomizeCourse/CustomizeCourse";
import { UPLOAD_IMAGE_FILE_FIRESTORE } from "../../../components/screens/MediaManager/MediaManagerFilterBar/MediaManagerFilterBar";
import {
  CreateCourseDocument,
  CreateCourseMutation,
  CreateCourseMutationVariables,
  GetCourseDocument,
  GetCourseQuery,
  GetCourseQueryVariables,
  GetTopicsByCourseIdDocument,
  GetTopicsByCourseIdQuery,
  GetTopicsByCourseIdQueryVariables,
  ImageFileType,
  TopicType,
  UpdateCourseMutation,
  UpdateCourseMutationVariables,
  UploadImageFileToFirestoreMutation,
  UploadImageFileToFirestoreMutationVariables,
} from "../../../generated/graphql";
import * as SC from "./styled";

export enum CourseTabs {
  CUSTOMIZE_COURSE = "CUSTOMIZE_COURSE",
  ADD_CONTENT = "ADD_CONTENT",
}

export const REMOVE_COURSE = gql`
  mutation RemoveCourse($courseId: String!) {
    removeCourse(courseId: $courseId)
  }
`;

export const CREATE_COURSE = gql`
  mutation CreateCourse($data: CreateCourseInput!) {
    createCourse(data: $data) {
      id
      userId
      tagId
      virtualAppId
      name
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($data: UpdateCourseInput!) {
    updateCourse(data: $data)
  }
`;

export const GET_COURSE = gql`
  query GetCourse($courseId: String!) {
    getCourse(courseId: $courseId) {
      name
      description
      commentType
      courseAlerts
      restrictionType
      protected
      active
      defaultImage
      courseImage
      thumbnail
      showOrderNumber
    }
  }
`;

export const GET_TOPICS_AND_LESSONS = gql`
  query getTopicsByCourseId($courseId: String!) {
    getTopicsByCourseId(courseId: $courseId) {
      id
      title
      description
      order
      lessons {
        id
        topicId
        title
        description
        active
        order
        mediaUrl
        thumbnail
        contenttype
      }
    }
  }
`;

export default function AddCourse() {
  const router = useRouter();
  const dialog = useDialog();
  const [selected, setSelected] = useState<CourseTabs>(
    CourseTabs.CUSTOMIZE_COURSE
  );
  const { id } = router.query;
  const toast = useToast();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [courseTitleError, setCourseTitleError] = useState(false);
  const [courseDescriptionError, setCourseDescriptionError] = useState(false);

  const [contentNotificationError, setContentNotificationError] =
    useState(false);
  const [commentSettingsError, setCommentSettingsError] = useState(false);
  const [courseId, setCourseId] = useRecoilState(CourseIdAtom);

  const [isCourseEdit, setIsCourseEdit] = useRecoilState(CourseIsEditAtom);
  const [title, setTitle] = useRecoilState(CourseTitleAtom);
  const [description, setDescription] = useRecoilState(CourseDescriptionAtom);
  const [icon, setIcon] = useRecoilState(CourseIconAtom);
  const [image, setImage] = useRecoilState(CourseImageAtom);
  const [downloadLinkIcon, setDownloadLinkIcon] = useRecoilState(
    CourseDonwloadLinkIconAtom
  );
  const [downloadLinkImage, setDownloadLinkImage] = useRecoilState(
    CourseDonwloadLinkImageAtom
  );

  const [contentNotifications, setContentNotifications] = useRecoilState(
    CourseContentNotificationsAtom
  );
  const [commentSettings, setCommentSettings] = useRecoilState(
    CourseCommentSettingsAtom
  );
  const [status, setStatus] = useRecoilState(CourseStatusAtom);
  const [protectCourse, setProtectCourse] = useRecoilState(ProtectCourseAtom);
  const [numberedLessons, setNumberedLessons] = useRecoilState(
    CourseNumberedLessonsAtom
  );
  const user = useRecoilValue(UserAtom);
  const vApp = useRecoilValue(VirtualAppAtom);
  const setTopics = useSetRecoilState(TopicsAtom);
  const client = useApolloClient();

  useEffect(() => {
    if (!id) return;

    setIsCourseEdit(true);
    setCourseId(id as string);

    (async () => {
      const response = await client.query<
        GetCourseQuery,
        GetCourseQueryVariables
      >({
        query: GetCourseDocument,
        variables: {
          courseId: id as string,
        },
      });

      const course = response.data.getCourse;

      if (course) {
        setTitle(course.name);
        setDescription(course.description);
        setDownloadLinkIcon(course?.thumbnail || "");
        setDownloadLinkImage(course?.courseImage || "");
        setContentNotifications(`${course.courseAlerts}`);
        setCommentSettings(`${course.commentType}`);
        setStatus(course.active);
        setProtectCourse(course.protected);
        setNumberedLessons(course.showOrderNumber);
      }
    })();
  }, [id]);

  // Reseting the atoms
  useEffect(() => {
    return () => {
      setTopics([]);
      setTitle("");
      setDescription("");
      setDownloadLinkIcon("");
      setDownloadLinkImage("");
      setContentNotifications("1");
      setCommentSettings("1");
      setStatus(false);
      setProtectCourse(false);
      setNumberedLessons(false);
      setIcon({ src: "", alt: "", file: null });
      setImage({ src: "", alt: "", file: null });
      setCourseId(null);
      setIsCourseEdit(false);
    };
  }, []);

  useEffect(() => {
    if (!isCourseEdit || !courseId) return;

    (async () => {
      const response = await client.query<
        GetTopicsByCourseIdQuery,
        GetTopicsByCourseIdQueryVariables
      >({
        query: GetTopicsByCourseIdDocument,
        variables: {
          courseId: courseId,
        },
      });

      if (response.data.getTopicsByCourseId) {
        setTopics(response.data.getTopicsByCourseId as Array<TopicType>);
      }
    })();
  }, [isCourseEdit]);

  const handleFileChange = async (
    file: any,
    folder: string,
    type: ImageFileType
  ) => {
    if (!file) return;
    if (!user) return;

    const uuid = uuidv4();

    const response = await client.mutate<
      UploadImageFileToFirestoreMutation,
      UploadImageFileToFirestoreMutationVariables
    >({
      mutation: UPLOAD_IMAGE_FILE_FIRESTORE,
      variables: {
        file,
        userId: user.id,
        folderId: uuid,
        folder: folder,
        imageType: type,
      },
    });

    const downloadLink =
      response.data?.uploadImageFileToFirestore?.downloadLink;

    return downloadLink;
  };

  async function validationCourse() {
    if (!vApp || !user) return false;

    let hasError = false;

    if (!title) {
      setCourseTitleError(true);
      hasError = true;
    }

    if (!description) {
      setCourseDescriptionError(true);
      hasError = true;
    }

    if (!contentNotifications) {
      setContentNotificationError(true);
      hasError = true;
    }

    if (!commentSettings) {
      setCommentSettingsError(true);
      hasError = true;
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
      setLoadingSave(false);

      return false;
    }

    let newDownloadLinkIcon;

    let newDownloadLinkImage;

    if (icon.file) {
      newDownloadLinkIcon =
        (await handleFileChange(icon.file, "course", ImageFileType.Icon)) || "";
      setDownloadLinkIcon(newDownloadLinkIcon);
      setIcon({ ...icon, file: null });
    }

    if (image.file) {
      newDownloadLinkImage =
        (await handleFileChange(
          image.file,
          "courseImage",
          ImageFileType.Banner
        )) || "";
      setDownloadLinkImage(newDownloadLinkImage);
      setImage({ ...image, file: null });
    }

    const data = {
      userId: user.id,
      active: status,
      virtualAppIds: [vApp?.id],
      thumbnail: newDownloadLinkIcon || downloadLinkIcon,
      courseImage: newDownloadLinkImage || downloadLinkImage,
      name: title,
      description: description,
      courseAlerts: parseInt(contentNotifications),
      protected: protectCourse,
      commentType: parseInt(commentSettings),
      restrictionType: protectCourse ? 1 : 0, // I don't know wtf is it
      showOrderNumber: numberedLessons,
    };

    return data;
  }

  async function handleCreateCourse() {
    const data = await validationCourse();

    if (!data) {
      return;
    }

    const response = await client.mutate<
      CreateCourseMutation,
      CreateCourseMutationVariables
    >({
      mutation: CreateCourseDocument,
      variables: { data },
    });

    const courseCreated = response.data?.createCourse;

    if (courseCreated) {
      setIsCourseEdit(true);
      setCourseId(courseCreated.id);

      toast({
        title: `The "${title}" course was successfully created`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setLoadingSave(false);
  }

  async function handleEditCourse() {
    const data = await validationCourse();

    if (!data || !courseId) return;

    const response = await client.mutate<
      UpdateCourseMutation,
      UpdateCourseMutationVariables
    >({
      mutation: UPDATE_COURSE,
      variables: {
        data: {
          course: data,
          courseId: courseId,
        },
      },
    });

    toast({
      title: `The "${title}" course was successfully edited`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setLoadingSave(false);
  }

  async function handleRemoveCourse() {
    if (!courseId) return;

    const response = await client.mutate({
      mutation: REMOVE_COURSE,
      variables: {
        courseId: courseId,
      },
    });

    toast({
      title: `The "${title}" course was successfully deleted`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setLoadingDelete(false);
    router.push("/content");
  }

  return (
    <Fragment>
      <SeoHead pageName={isCourseEdit ? "Edit Course" : "New Course"} />
      <SC.Container>
        <TopBar
          title={isCourseEdit ? "Edit Course" : "New Course"}
          onClickButtonBack={() => router.push("/content")}
          buttons={
            <Flex>
              {selected === CourseTabs.CUSTOMIZE_COURSE && (
                <Flex>
                  {isCourseEdit && (
                    <StyledButton
                      css={css`
                        margin-right: 10px;

                        svg {
                          margin-right: 5px;
                          margin-bottom: 1px;
                        }
                      `}
                      onClick={() =>
                        dialog.confirm({
                          title: `Delete Course`,
                          hasImage: true,
                          img: (
                            <img
                              src="/alert-dialog/delete-dialog.svg"
                              alt="Delete"
                            />
                          ),
                          description: `Are you sure you want to delete the course <b>"${title}"</b>?`,
                          okButtonLabel: "Delete",
                          onOkPressed: () => {
                            if (loadingDelete) return;
                            setLoadingDelete(true);
                            handleRemoveCourse();
                          },
                          hasCheckbox: false,
                          okButtonColor: "#c41700",
                        })
                      }
                      variant={"outlined"}
                      isLoading={loadingDelete}
                    >
                      <FaTrashAlt />
                      Delete
                    </StyledButton>
                  )}

                  <StyledButton
                    css={css`
                      margin-right: 10px;
                    `}
                    onClick={() => {
                      if (loadingSave) return;

                      setLoadingSave(true);
                      isCourseEdit ? handleEditCourse() : handleCreateCourse();
                    }}
                    isLoading={loadingSave}
                  >
                    Save
                  </StyledButton>
                </Flex>
              )}

              <StyledIconButton
                icon={<FaPlay />}
                onClick={() => {}}
                tooltipLabel="New course video"
              />
            </Flex>
          }
        />
        {(() => {
          switch (selected) {
            case CourseTabs.CUSTOMIZE_COURSE:
              return (
                <SC.Wrapper>
                  <CustomizeCourse
                    courseTitleError={courseTitleError}
                    handleChangeCourseTitleError={() =>
                      setCourseTitleError(false)
                    }
                    courseDescriptionError={courseDescriptionError}
                    handleChangeCourseDescriptionError={() =>
                      setCourseDescriptionError(false)
                    }
                    contentNotificationError={contentNotificationError}
                    handleChangeContentNotificationError={() =>
                      setContentNotificationError(false)
                    }
                    commentSettingsError={commentSettingsError}
                    handleChangeCommentSettingsError={() =>
                      setCommentSettingsError(false)
                    }
                  />
                  <CoursePhoneMock />
                </SC.Wrapper>
              );
            case CourseTabs.ADD_CONTENT:
              return (
                <SC.AddContentWrapper>
                  <WrapperTopics />
                  <WrapperForms />
                </SC.AddContentWrapper>
              );
          }
        })()}
        <SC.BottomBar>
          <SC.ButtonBottomBar
            css={css`
              background: #6b6b6b;
            `}
            onClick={() => setSelected(CourseTabs.CUSTOMIZE_COURSE)}
          >
            <SC.ButtonLabelWrapper>
              <div className="circle-label">1</div>
              <p className="button-label">Customize Course</p>
            </SC.ButtonLabelWrapper>
          </SC.ButtonBottomBar>
          <SC.ButtonBottomBar
            css={css`
              background: #a8a8a8;
            `}
            disabled={!isCourseEdit}
            onClick={() => setSelected(CourseTabs.ADD_CONTENT)}
          >
            <SC.ButtonLabelWrapper>
              <div className="circle-label">2</div>
              <p className="button-label">Add Content</p>
            </SC.ButtonLabelWrapper>
          </SC.ButtonBottomBar>
        </SC.BottomBar>
      </SC.Container>
    </Fragment>
  );
}
