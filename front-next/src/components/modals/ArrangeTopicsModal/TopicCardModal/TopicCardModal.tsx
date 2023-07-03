import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { TopicType } from "../../../../generated/graphql";
import { useRaisedShadow } from "../../../../hooks/useRaisedShadow";
import * as SC from "./TopicCardModalStyledComponents";

type TopicCardModalProps = {
  index: number;
  topic: TopicType;
  sortTopics: TopicType[];
  setSortTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
};

export default function TopicCardModal(props: TopicCardModalProps) {
  const { topic, sortTopics, index, setSortTopics } = props;
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  function arraymove(toIndex: number) {
    if (toIndex < 0) return;

    const newSortTopics = [...sortTopics];

    var element = newSortTopics[index];
    newSortTopics.splice(index, 1);
    newSortTopics.splice(toIndex, 0, element);

    setSortTopics(newSortTopics);
  }

  return (
    <Reorder.Item
      value={topic}
      id={topic.id}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <SC.CardWrapper>
        <SC.DragIconWrapper
          onPointerDown={(event) => dragControls.start(event)}
        >
          <HiMenu />
        </SC.DragIconWrapper>
        <SC.TextWrapper>
          <h1 className="topic-title">{topic.title}</h1>
          <p className="topic-description">{topic.description}</p>
        </SC.TextWrapper>
        <SC.ButtonsWrapper>
          <SC.ArrowWrapper onClick={() => arraymove(index - 1)}>
            <FaArrowUp />
          </SC.ArrowWrapper>
          <SC.ArrowWrapper onClick={() => arraymove(index + 1)}>
            <FaArrowDown />
          </SC.ArrowWrapper>
        </SC.ButtonsWrapper>
      </SC.CardWrapper>
    </Reorder.Item>
  );
}
