import { useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/toast";
import gql from "graphql-tag";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CourseContentCurrentSelected,
  CourseIdAtom,
  TopicsAtom,
} from "../../../../../../../../atoms/NewCourseAtom";
import { TopicType } from "../../../../../../../../generated/graphql";
import StyledButton from "../../../../../../../global/StyledButton";
import StyledInput from "../../../../../../../global/StyledInput";
import StyledTextArea from "../../../../../../../global/StyledTextArea";
import * as SC from "./TopicFormStyledComponents";

export const UPDATE_TOPIC = gql`
  mutation UpdateTopic(
    $courseId: String!
    $topicId: String!
    $data: UpdateTopicInput!
  ) {
    updateTopic(courseId: $courseId, topicId: $topicId, data: $data)
  }
`;

export default function TopicForm() {
  const toast = useToast();

  const courseId = useRecoilValue(CourseIdAtom);
  const [topics, setTopics] = useRecoilState(TopicsAtom);
  const [selected, setSelected] = useRecoilState(CourseContentCurrentSelected);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [topic, setTopic] = useState<TopicType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    if (selected.id && selected.selected === "TOPIC") {
      const selectedTopic = topics.filter((topic) => topic.id === selected.id);

      if (selectedTopic && selectedTopic[0]) {
        setTopic(selectedTopic[0]);
      }
    }
  }, [selected]);

  async function handleSubmit() {
    if (!courseId || !topic) return false;

    let hasError = false;

    if (!topic?.title) {
      hasError = true;
      setIsTitleEmpty(true);
    }

    if (!topic?.description) {
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

    const response = await client.mutate({
      mutation: UPDATE_TOPIC,
      variables: {
        courseId,
        topicId: topic.id,
        data: {
          title: topic.title,
          description: topic.description,
        },
      },
    });

    const newTopics = topics.map((top) => {
      if (top.id === topic.id) {
        return {
          ...top,
          title: topic.title,
          description: topic.description,
        };
      } else return top;
    });

    setTopics(newTopics);

    setIsLoading(false);
  }

  return (
    <SC.Container>
      <SC.Header>
        <h1 className="title">Add Topic</h1>
        <MdClose onClick={() => setSelected({ selected: "NOTHING" })} />
      </SC.Header>

      <SC.Wrapper>
        <SC.FormContent>
          <SC.FormWrapper>
            <label>Topic Title</label>
            <StyledInput
              placeholder="Enter topic title"
              value={topic?.title}
              onChange={(e) => {
                setTopic({ ...topic, title: e.target.value } as any);
                setIsTitleEmpty(false);
              }}
              error={isTitleEmpty}
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Topic Description</label>
            <StyledTextArea
              placeholder="Enter topic description"
              value={topic?.description}
              onChange={(e) => {
                setTopic({ ...topic, description: e.target.value } as any);
                setIsDescriptionEmpty(false);
              }}
              error={isDescriptionEmpty}
            />
          </SC.FormWrapper>

          <div className="divider" />

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
