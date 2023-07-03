import { gql, useApolloClient } from "@apollo/client";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React, { FormEvent, useState } from "react";
import { FaCopy, FaEllipsisH, FaTrashAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CourseContentCurrentSelected,
  CourseIdAtom,
  TopicsAtom,
} from "../../../../../../../../atoms/NewCourseAtom";
import { LessonType } from "../../../../../../../../generated/graphql";
import { useRaisedShadow } from "../../../../../../../../hooks/useRaisedShadow";
import { useDialog } from "../../../../../../../global/StyledDialog/StyledDialogHooks";
import StyledPopover from "../../../../../../../global/StyledPopover";
import StyledSwitch from "../../../../../../../global/StyledSwitch";
import { UPDATE_LESSON } from "../../WrapperForms/LessonForm/LessonForm";
import * as SC from "./LessonCardStyledComponents";

export const REMOVE_LESSON = gql`
  mutation RemoveLesson(
    $courseId: String!
    $topicId: String!
    $lessonId: String!
  ) {
    removeLesson(courseId: $courseId, topicId: $topicId, lessonId: $lessonId)
  }
`;

type LessonCardProps = {
  lesson: LessonType;
  positionTopic: number;
  positionLesson: number;
};

export default function LessonCard({
  lesson,
  positionTopic,
  positionLesson,
}: LessonCardProps) {
  const dialog = useDialog();
  const [selected, setSelected] = useRecoilState(CourseContentCurrentSelected);
  const [topics, setTopics] = useRecoilState(TopicsAtom);
  const client = useApolloClient();
  const courseId = useRecoilValue(CourseIdAtom);

  const [isActiveState, setIsActiveState] = useState(lesson.active);

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  async function handleRemoveLesson() {
    await client.mutate({
      mutation: REMOVE_LESSON,
      variables: {
        courseId,
        topicId: lesson.topicId,
        lessonId: lesson.id,
      },
    });

    const newTopics = topics.map((top) => {
      if (top.id === lesson.topicId) {
        const newLessons = top.lessons?.filter((les) => les.id !== lesson.id);
        return { ...top, lessons: newLessons };
      } else return top;
    });

    if (selected.id === lesson.id) {
      setSelected({ selected: "NOTHING" });
    }

    setTopics(newTopics);
  }

  async function handleSetSwitch(e: FormEvent) {
    e.stopPropagation();

    const response = client.mutate({
      mutation: UPDATE_LESSON,
      variables: {
        courseId,
        topicId: lesson.topicId,
        lessonId: lesson.id,
        data: {
          active: !isActiveState,
        },
      },
    });

    setIsActiveState(!isActiveState);

    const newTopics = topics.map((top) => {
      if (top.id === lesson.topicId) {
        const newLessons = top.lessons?.map((les) => {
          if (les.id === lesson.id) {
            return {
              ...les,
              active: !isActiveState,
            };
          } else return les;
        });

        return { ...top, lessons: newLessons };
      } else return top;
    });

    setTopics(newTopics);
  }

  const POPOVER_BUTTONS_LESSON = [
    {
      icon: <FaCopy />,
      theme: "orange",
      popoverButtonLabel: "Duplicate Lesson",
      onClick: () => {},
    },
    {
      icon: <FaTrashAlt />,
      theme: "red",
      popoverButtonLabel: "Delete Lesson",
      onClick: () =>
        dialog.confirm({
          title: `Delete Lesson`,
          hasImage: true,
          img: <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />,
          description: `Are you sure you want to permanently delete the lesson <b>"${lesson.title}"</b> and all of the data in this content? This action cannot be undone.`,
          okButtonLabel: "Delete",
          onOkPressed: () => {
            handleRemoveLesson();
          },
          hasCheckbox: false,
          okButtonColor: "#c41700",
        }),
    },
  ];

  return (
    <SC.Container>
      <h1 className="number">
        {positionTopic}.{positionLesson}
      </h1>
      <Reorder.Item
        value={lesson}
        id={lesson.id}
        style={{ boxShadow, y }}
        dragListener={false}
        dragControls={dragControls}
      >
        <SC.CardWrapper
          className={`${!isActiveState && "disabled"} ${
            selected.selected === "LESSON" &&
            selected.id === lesson.id &&
            "active"
          }`}
        >
          <SC.DragIconWrapper
            onPointerDown={(event) => dragControls.start(event)}
          >
            <HiMenu />
          </SC.DragIconWrapper>

          <SC.TextWrapper
            onClick={() =>
              setSelected({
                id: lesson.id,
                selected: "LESSON",
                topicId: lesson.topicId,
              })
            }
          >
            <h1 className={`lesson-title ${!lesson.title && "empty"}`}>
              {lesson.title ? lesson.title : "Untitled Lesson"}
            </h1>
            <p
              className={`lesson-description ${!lesson.description && "empty"}`}
            >
              {lesson.description ? lesson.description : "Nondescript Lesson"}
            </p>
          </SC.TextWrapper>

          <StyledSwitch
            value={isActiveState}
            setValue={setIsActiveState}
            handleSetSwitch={handleSetSwitch}
            labelActive=""
            labelInactive=""
          />

          <StyledPopover
            hasIcon
            popoverPlacement="left-start"
            popoverTrigger={
              <SC.MoreActionsWrapper>
                <FaEllipsisH />
              </SC.MoreActionsWrapper>
            }
            popoverButtons={POPOVER_BUTTONS_LESSON}
          />
        </SC.CardWrapper>
      </Reorder.Item>
    </SC.Container>
  );
}
