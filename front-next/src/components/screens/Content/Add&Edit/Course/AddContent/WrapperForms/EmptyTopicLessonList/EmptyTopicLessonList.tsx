import React from "react";
import * as SC from "./EmptyTopicLessonListStyledComponents";

export default function EmptyTopicLessonList() {
  return (
    <SC.Wrapper>
      <img
        src="/global/empty-topic-lesson-list.svg"
        alt="Select a topic or lesson"
      />
      <h1>Select a topic or lesson</h1>
      <p>Select a topic or a lesson on the left to view or edit.</p>
    </SC.Wrapper>
  );
}
