/** @jsxImportSource @emotion/react */
import { useState } from "react";
import StyledInput from "../../global/StyledInput";
import StyledButton from "../../global/StyledButton";
import StyledTextArea from "../../global/StyledTextArea";
import StyledSelect from "../../global/StyledSelect";
import * as SC from "./NotificationFormStyledComponents";
import { SingleValue } from "react-select";
import { CONTENT_LINK, TAGS } from "./NotificationFormHelpers";

export default function NotificationForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [contentLink, setContentLink] = useState("");

  function tagsOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setTags(newValue?.value!);
  }

  function contentLinkOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setContentLink(newValue?.value!);
  }

  return (
    <SC.Container>
      <SC.HeaderWrapper>
        <h1 className="title">Request a Custom Push Notification</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quasi
          molestias iure quisquam, doloremque consectetur porro suscipit ducimus
          accusamus dolorum. Eligendi quam earum ab dolor, accusantium tempore
          beatae dolorum libero?
        </p>
      </SC.HeaderWrapper>

      <SC.Content>
        <SC.FormContentFlex>
          <SC.FormWrapper>
            <label>Title</label>
            <StyledInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your title"
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Message</label>
            <StyledTextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
            />
          </SC.FormWrapper>
        </SC.FormContentFlex>
        <SC.FormContentGrid>
          <SC.FormWrapper>
            <label>Tags</label>
            <StyledSelect
              onChange={tagsOnChange}
              options={TAGS}
              placeholder="Enter your tags"
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Content Link</label>
            <StyledSelect
              onChange={contentLinkOnChange}
              options={CONTENT_LINK}
              placeholder="Push without link"
            />
          </SC.FormWrapper>
        </SC.FormContentGrid>

        <div className="divider" />

        <SC.ButtonsWrapper>
          <StyledButton onClick={() => {}} variant="outlined">
            Cancel
          </StyledButton>
          <StyledButton onClick={() => {}}>Submit for approval</StyledButton>
        </SC.ButtonsWrapper>
      </SC.Content>
    </SC.Container>
  );
}
