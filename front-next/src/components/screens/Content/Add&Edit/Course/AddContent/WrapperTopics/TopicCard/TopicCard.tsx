/** @jsxImportSource @emotion/react */
import { useApolloClient } from "@apollo/client";
import { css } from "@emotion/react";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { FaCopy, FaEllipsisH, FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdBook, MdPlaylistAdd } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CourseContentCurrentSelected,
  CourseIdAtom,
  TopicsAtom,
} from "../../../../../../../../atoms/NewCourseAtom";
import { VirtualAppAtom } from "../../../../../../../../atoms/VirtualAppAtom";
import { TopicType } from "../../../../../../../../generated/graphql";
import { useDialog } from "../../../../../../../global/StyledDialog/StyledDialogHooks";
import StyledPopover from "../../../../../../../global/StyledPopover";
import * as SC from "./TopicCardStyledComponents";

type TopicCardProps = {
  topic: TopicType;
  position: number;
};

export const ORDER_TOPICS = gql`
  mutation OrderTopics($courseId: String!, $topicsIds: [String!]!) {
    orderTopics(courseId: $courseId, topicsIds: $topicsIds)
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic($courseId: String!, $data: CreateTopicInput!) {
    createTopic(courseId: $courseId, data: $data) {
      id
      courseId
      title
      description
      order
      active
      thumbnail
    }
  }
`;

export const CREATE_LESSON = gql`
  mutation CreateLesson(
    $courseId: String!
    $topicId: String!
    $data: CreateLessonInput!
  ) {
    createLesson(courseId: $courseId, topicId: $topicId, data: $data) {
      id
      topicId
      title
      description
      active
      order
    }
  }
`;

const REMOVE_TOPIC = gql`
  mutation RemoveTopic($courseId: String!, $topicId: String!) {
    removeTopic(courseId: $courseId, topicId: $topicId)
  }
`;

export default function TopicCard({ topic, position }: TopicCardProps) {
  const dialog = useDialog();

  const [selected, setSelected] = useRecoilState(CourseContentCurrentSelected);
  const [topics, setTopics] = useRecoilState(TopicsAtom);
  const vApp = useRecoilValue(VirtualAppAtom)

  const client = useApolloClient();
  const courseId = useRecoilValue(CourseIdAtom);
  const [updateOrder, setUpdateOrder] = useState(false);

  const ADD_BUTTONS = [
    {
      icon: (
        <MdPlaylistAdd
          css={css`
            transform: rotate(180deg);
          `}
        />
      ),
      theme: "orange",
      popoverButtonLabel: "Add Topic Before",
      onClick: () => {
        setUpdateOrder(true);
        handleCreateTopic(position - 1);
      },
    },
    {
      icon: <MdPlaylistAdd />,
      theme: "orange",
      popoverButtonLabel: "Add Topic After",
      onClick: () => {
        setUpdateOrder(true);
        handleCreateTopic(position + 1);
      },
    },
    {
      icon: <MdBook />,
      theme: "orange",
      popoverButtonLabel: "Add Lesson",
      onClick: () => {
        handleCreateLesson();
      },
    },
  ];

  const ACTIONS_BUTTONS = [
    {
      icon: <FaCopy />,
      theme: "orange",
      popoverButtonLabel: "Duplicate Topic",
      onClick: () => {},
    },
    {
      icon: <FaTrashAlt />,
      theme: "red",
      popoverButtonLabel: "Delete Topic",
      onClick: () =>
        dialog.confirm({
          title: `Delete Topic`,
          hasImage: true,
          img: <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />,
          description: `Are you sure you want to permanently delete the topic <b>"${topic.title}"</b> and all of the data in this content? This action cannot be undone.`,
          okButtonLabel: "Delete",
          onOkPressed: () => {
            setUpdateOrder(true);
            handleRemoveTopic();
          },
          hasCheckbox: false,
          okButtonColor: "#c41700",
        }),
    },
  ];

  //When create a topic or remove one of them, It is necessary reorder all topic.
  //Updating the topics with the new value or removing it and after updating the topics order
  useEffect(() => {
    if (updateOrder) {
      (async () => {
        const topicsOrdered = topics
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((tp) => tp.id);

        await client.mutate({
          mutation: ORDER_TOPICS,
          variables: {
            courseId: courseId,
            topicsIds: topicsOrdered,
          },
        });

        const newTopics = topicsOrdered.map((topicId, index) => {
          const topic = topics.find((t) => t.id === topicId) as TopicType;

          return { ...topic, order: index + 1 };
        });
        setTopics(newTopics);
        setUpdateOrder(false);
      })();
    }
  }, [topics]);

  async function handleRemoveTopic() {
    await client.mutate({
      mutation: REMOVE_TOPIC,
      variables: {
        courseId,
        topicId: topic.id,
      },
    });

    const newTopics = topics.filter((top) => top.id !== topic.id);

    setTopics(newTopics);

    if (selected.id === topic.id) {
      setSelected({ selected: "NOTHING" });
    }
  }

  async function handleCreateTopic(order: number) {
    if (!courseId) return;
    const response = await client.mutate({
      mutation: CREATE_TOPIC,
      variables: {
        courseId: courseId,

        data: {
          title: "Untitled Topic",
          description: "Nondescript Topic",
          order: order,
        },
      },
    });

    if (response.data.createTopic) {
      const newOrder = position > order ? position - 0.5 : position + 0.5;
      setTopics([...topics, { ...response.data.createTopic, order: newOrder }]);
    }
  }

  async function handleCreateLesson() {
    if (!courseId) return;
    let orderLesson = 0;
    topic.lessons?.forEach((l) => {
      if (l.order > orderLesson) {
        orderLesson = l.order;
      }
    });

    const response = await client.mutate({
      mutation: CREATE_LESSON,
      variables: {
        courseId: courseId,
        topicId: topic.id,
        data: {
          title: "Untitled Lesson",
          description: "Nondescript Lesson",
          order: orderLesson + 1,
          virtualAppIds: [vApp?.id]
        },
      },
    });

    if (response.data.createLesson) {
      const newTopics = topics.map((top) => {
        if (top.id === topic.id) {
          if (top.lessons)
            return {
              ...top,
              lessons: [...top.lessons, response.data.createLesson],
            };
          else return { ...top, lessons: [response.data.createLesson] };
        } else return top;
      });

      setTopics(newTopics);
    }
  }

  return (
    <SC.Container>
      <StyledPopover
        hasIcon
        popoverPlacement="left-start"
        popoverTrigger={
          <button className="plus-button">
            <FaPlus />
          </button>
        }
        popoverButtons={ADD_BUTTONS}
      />

      <h1 className="number">{position}</h1>
      <SC.CardWrapper
        className={
          selected.selected === "TOPIC" && selected.id === topic.id
            ? "active"
            : ""
        }
      >
        <SC.TextWrapper
          onClick={() => setSelected({ id: topic?.id, selected: "TOPIC" })}
        >
          <h1 className={`topic-title ${!topic?.title && "empty"}`}>
            {topic?.title ? topic.title : "Untitled Topic"}
          </h1>
          <p className={`topic-description ${!topic?.description && "empty"}`}>
            {topic?.description ? topic?.description : "Nondescript Topic"}
          </p>
        </SC.TextWrapper>

        <StyledPopover
          hasIcon
          popoverPlacement="left-start"
          popoverTrigger={
            <SC.MoreActionsWrapper>
              <FaEllipsisH />
            </SC.MoreActionsWrapper>
          }
          popoverButtons={ACTIONS_BUTTONS}
        />
      </SC.CardWrapper>
    </SC.Container>
  );
}
