import { useApolloClient } from "@apollo/client";
import { useDisclosure } from "@chakra-ui/hooks";
import { Reorder } from "framer-motion";
import gql from "graphql-tag";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  CourseContentCurrentSelected,
  CourseIdAtom,
  CourseTitleAtom,
  TopicsAtom,
} from "../../../../../../../atoms/NewCourseAtom";
import { LessonType } from "../../../../../../../generated/graphql";
import StyledButton from "../../../../../../global/StyledButton";
import ArrangeTopicsModal from "../../../../../../modals/ArrangeTopicsModal/ArrangeTopicsModal";
import LessonCard from "./LessonCard/LessonCard";
import TopicCard from "./TopicCard/TopicCard";
import * as SC from "./WrapperTopicsStyledComponents";

export const ORDER_LESSONS = gql`
  mutation OrderLessons(
    $courseId: String!
    $topicId: String!
    $lessonsIds: [String!]!
  ) {
    orderLessons(
      courseId: $courseId
      topicId: $topicId
      lessonsIds: $lessonsIds
    )
  }
`;

export default function WrapperTopics() {
  const topics = useRecoilValue(TopicsAtom);
  const title = useRecoilValue(CourseTitleAtom);
  const {
    isOpen: isOpenArrangeTopicsModal,
    onClose: onCloseArrangeTopicsModal,
    onOpen: onOpenArrangeTopicsModal,
  } = useDisclosure();

  return (
    <SC.Container className={"noselect"}>
      <SC.Header>
        <h1 className="title">{title}</h1>
        <StyledButton onClick={onOpenArrangeTopicsModal} variant="outlined">
          Arrange Topics
        </StyledButton>
      </SC.Header>

      <SC.Wrapper>
        {topics
          ?.slice()
          ?.sort((a, b) => a.order - b.order)
          ?.map((topic, topicIndex) => (
            <SC.WrapperContent key={topic.id}>
              <TopicCard topic={topic} position={topicIndex + 1} />
              {topic?.lessons && (
                <WrapperLessons
                  key={topic.id}
                  lessons={topic.lessons}
                  positionTopic={topicIndex + 1}
                  topicId={topic.id}
                />
              )}
            </SC.WrapperContent>
          ))}
      </SC.Wrapper>
      <ArrangeTopicsModal
        isOpen={isOpenArrangeTopicsModal}
        onClose={onCloseArrangeTopicsModal}
      />
    </SC.Container>
  );
}

interface WrapperLessonsProps {
  lessons: LessonType[];
  positionTopic: number;
  topicId: string;
}

function WrapperLessons(props: WrapperLessonsProps) {
  const { lessons, positionTopic, topicId } = props;

  const courseId = useRecoilValue(CourseIdAtom);
  const client = useApolloClient();
  const [topics, setTopics] = useRecoilState(TopicsAtom);
  const [sortLessons, setSortLessons] = useState(
    lessons?.slice()?.sort((a, b) => a.order - b.order)
  );
  const firstRender = useRef(true);

  const setSelected = useSetRecoilState(CourseContentCurrentSelected);

  useEffect(() => {
    setSortLessons(lessons?.slice()?.sort((a, b) => a.order - b.order));
  }, [lessons]);

  useEffect(() => {
    return () => {
      setSelected({ selected: "NOTHING" });
    };
  }, []);

  async function handleOrder(newOrder: any[]) {
    setSortLessons(newOrder);

    const lessonsOrdered = newOrder.map((tp) => tp.id);

    await client.mutate({
      mutation: ORDER_LESSONS,
      variables: {
        topicId,
        courseId,
        lessonsIds: lessonsOrdered,
      },
    });

    const newTopics = topics.map((topic, index) => {
      if (topic.id === topicId) {
        const newLessons = newOrder.map((lesson, index) => {
          return { ...lesson, order: index + 1 };
        });

        return { ...topic, lessons: newLessons };
      } else return topic;
    });
    setTopics(newTopics);
  }

  if (lessons.length === 0) return <> </>;

  return (
    <Reorder.Group
      axis="y"
      onReorder={handleOrder}
      values={sortLessons}
      style={{ width: "100%", padding: "20px" }}
      layoutScroll
    >
      {sortLessons.map((lesson, index) => {
        return (
          <LessonCard
            key={lesson.id}
            positionTopic={positionTopic}
            positionLesson={index + 1}
            lesson={lesson}
          />
        );
      })}
    </Reorder.Group>
  );
}
