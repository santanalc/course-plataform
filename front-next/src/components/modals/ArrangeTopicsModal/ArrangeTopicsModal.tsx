import { useApolloClient } from "@apollo/client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Reorder } from "framer-motion";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { CourseIdAtom, TopicsAtom } from "../../../atoms/NewCourseAtom";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import { ORDER_TOPICS } from "../../screens/Content/Add&Edit/Course/AddContent/WrapperTopics/TopicCard/TopicCard";
import * as SC from "./ArrangeTopicsModalStyledComponents";
import TopicCardModal from "./TopicCardModal/TopicCardModal";

type ArrangeTopicsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ArrangeTopicsModal({
  isOpen,
  onClose,
}: ArrangeTopicsModalProps) {
  const [topics, setTopics] = useRecoilState(TopicsAtom);
  const [sortTopics, setSortTopics] = useState(
    topics.slice().sort((a, b) => a.order - b.order)
  );
  const courseId = useRecoilValue(CourseIdAtom);
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(false);

  function handleApply() {
    const topicsOrdered = sortTopics.map((tp) => tp.id);

    client.mutate({
      mutation: ORDER_TOPICS,
      variables: {
        courseId: courseId,
        topicsIds: topicsOrdered,
      },
    });

    const newTopics = sortTopics.map((topic, index) => {
      return { ...topic, order: index + 1 };
    });
    setTopics(newTopics);
    onClose();
    setIsLoading(false);
  }

  return (
    <Modal
      isCentered
      autoFocus={false}
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader css={SC.ModalHeaderCSS}>
          <SC.SpaceBetweenWrapper>
            <SC.ModalTitle>Arrange Topics</SC.ModalTitle>
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Arrange Topics video"
            />
          </SC.SpaceBetweenWrapper>
        </ModalHeader>

        <ModalBody css={SC.ModalBodyCSS}>
          <Reorder.Group
            axis="y"
            onReorder={setSortTopics}
            values={sortTopics}
            style={{ width: 500, overflowY: "auto", padding: "20px" }}
            layoutScroll
          >
            {sortTopics.map((topic, index) => {
              return (
                <TopicCardModal
                  index={index}
                  key={topic.id}
                  topic={topic}
                  sortTopics={sortTopics}
                  setSortTopics={setSortTopics}
                />
              );
            })}
          </Reorder.Group>
        </ModalBody>

        <ModalFooter css={SC.ModalFooterCSS}>
          <StyledButton onClick={onClose} variant="outlined">
            Cancel
          </StyledButton>
          <StyledButton
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              handleApply();
            }}
          >
            Apply
          </StyledButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
