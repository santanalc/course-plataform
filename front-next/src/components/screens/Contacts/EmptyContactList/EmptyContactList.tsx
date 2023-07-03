import React from "react";
import StyledButton from "../../../global/StyledButton";
import * as SC from "./EmptyContactListStyledComponents";

type EmptyContactListProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonOnClick: () => void;
};

export default function EmptyContactList({
  title,
  description,
  buttonLabel,
  buttonOnClick,
}: EmptyContactListProps) {
  return (
    <SC.Wrapper>
      <img src="/global/empty-contact-list.svg" alt={title} />
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: description }} />
      <StyledButton onClick={buttonOnClick}>{buttonLabel}</StyledButton>
    </SC.Wrapper>
  );
}
