import React from "react";
import { useRecoilValue } from "recoil";
import { CourseContentCurrentSelected } from "../../../../../../../atoms/NewCourseAtom";
import EmptyTopicLessonList from "./EmptyTopicLessonList/EmptyTopicLessonList";
import LessonForm from "./LessonForm/LessonForm";
import TopicForm from "./TopicForm/TopicForm";
import * as SC from "./WrapperFormsStyledComponents";

export default function WrapperForms() {
  const selected = useRecoilValue(CourseContentCurrentSelected);

  function returnBody(currentSelected: string) {
    if (currentSelected === "NOTHING") return <EmptyTopicLessonList />;
    if (currentSelected === "TOPIC") return <TopicForm />;
    if (currentSelected === "LESSON") return <LessonForm />;
    return <EmptyTopicLessonList />;
  }

  return <SC.Container>{returnBody(selected.selected)}</SC.Container>;
}
