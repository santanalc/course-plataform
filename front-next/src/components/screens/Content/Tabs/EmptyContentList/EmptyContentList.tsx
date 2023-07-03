import React from "react";
import StyledButton from "../../../../global/StyledButton";
import * as SC from "./EmptyContentListStyledComponents";

type EmptyContentListProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonOnClick: () => void;
};
export default function EmptyContentList({
  title,
  description,
  buttonLabel,
  buttonOnClick,
}: EmptyContentListProps) {
  return (
    <SC.Container>
      <SC.Wrapper>
        <img src="/global/empty-course-article-list.svg" alt={title} />
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <StyledButton onClick={buttonOnClick}>{buttonLabel}</StyledButton>
      </SC.Wrapper>
    </SC.Container>
  );
}
