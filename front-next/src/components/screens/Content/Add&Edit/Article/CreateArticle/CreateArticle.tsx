/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  ArticleIconAtom,
  ArticleLinkIconAtom,
  CreateArticleAtom,
} from "../../../../../../atoms/NewArticleAtom";
import { MAX_LENGTH_DESCRIPTION } from "../../../../../../pages/content/article";
import StyledDateTimePickerComponent from "../../../../../global/StyledDateTimePicker/StyledDateTimePickerComponent";
import StyledDropImage from "../../../../../global/StyledDropImage";
import StyledInput from "../../../../../global/StyledInput";
import StyledSwitch from "../../../../../global/StyledSwitch";
import StyledTextArea from "../../../../../global/StyledTextArea";
import IconModal from "../../../../../modals/IconModal/IconModal";
import * as SC from "./CreateArticleStyledComponents";

interface Props {
  nameError: boolean;
  handleChangeNameError: () => void;
  authorError: boolean;
  handleChangeAuthorError: () => void;
  publishDateError: boolean;
  handleChangePublishDateError: () => void;
  descriptionError: boolean;
  handleChangeDescriptionError: () => void;
}

export default function CreateArticle(props: Props) {
  const [article, setArticle] = useRecoilState(CreateArticleAtom);
  const [articleIcon, setArticleIcon] = useRecoilState(ArticleIconAtom);
  const [date, setDate] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();

  const [articleLinkIcon, setArticleLinkIcon] =
    useRecoilState(ArticleLinkIconAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function getDateAndTime(fromDate: Date) {
    const offset = fromDate.getTimezoneOffset() * 60 * 1000;
    const localTime = new Date(fromDate.getTime() - offset);
    const [day, timeAndPeriod] = localTime.toISOString().split("T");
    const [hour] = timeAndPeriod.split("Z");
    return [day, hour];
  }

  function handleDateSelect(selectedDate: Date) {
    const [day, hour] = getDateAndTime(selectedDate);
    setDate(day);

    if (time) {
      const mountedDateTime = new Date(`${day} ${time}`);

      setArticle((article) => ({ ...article, publishDate: mountedDateTime }));
    } else {
      let newMinutes = parseInt(hour.split(":")[1], 10);
      let newSelectedDate = new Date(selectedDate);

      const atualMinutes = newMinutes;

      if (newMinutes % 5 === 0) {
        setTime(hour);

        setArticle((article) => ({ ...article, publishDate: selectedDate }));
      } else {
        while (newMinutes % 5 !== 0) {
          newMinutes += 1;
        }

        newSelectedDate = dayjs(newSelectedDate)
          .add(newMinutes - atualMinutes, "minutes")
          .toDate();

        const [, newHour] = getDateAndTime(newSelectedDate);

        setTime(newHour);

        setArticle((article) => ({ ...article, publishDate: newSelectedDate }));
      }
    }
  }

  function handleTimeSelect(selectedDate: Date) {
    const [_, hour] = getDateAndTime(selectedDate);
    setTime(hour);

    if (date) {
      const mountedDateTime = new Date(`${date} ${hour}`);
      setArticle((article) => ({ ...article, publishDate: mountedDateTime }));
    }
  }

  return (
    <SC.Container>
      <SC.FormContent>
        <SC.FormWrapper>
          <SC.LabelWrapper
            css={css`
              justify-content: flex-start;
              align-items: center;
            `}
          >
            <label>Article Status</label>
            {/* 
            <Tooltip
              hasArrow
              placement="right-start"
              label="The status is activated automatically when there is available content"
            >
              <SC.Help>
                <IoHelpCircle />
              </SC.Help>
            </Tooltip> */}
          </SC.LabelWrapper>

          <StyledSwitch
            value={!!article.active}
            setValue={(vle) =>
              setArticle((article) => ({ ...article, active: vle }))
            }
            labelActive="Active"
            labelInactive="Inactive"
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <SC.FormWrapper
        css={css`
          width: 50%;
        `}
      >
        <SC.LabelWrapper>
          <label>Publish Date</label>
        </SC.LabelWrapper>
        <StyledDateTimePickerComponent
          date={article.publishDate}
          onDateSelect={(dt) => {
            handleDateSelect(dt);
            props.handleChangePublishDateError();
          }}
          onTimeSelect={(dt) => {
            handleTimeSelect(dt);
            props.handleChangePublishDateError();
          }}
          showDatePicker
          showTimePicker
          input
          isError={props.publishDateError}
        />
      </SC.FormWrapper>

      <SC.FormContent>
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Article Title</label>
            <label className="optional">
              {article.name.length.toString()}/90
            </label>
          </SC.LabelWrapper>
          <StyledInput
            defaultValue={article.name}
            onChange={(e) => {
              setArticle((article) => ({ ...article, name: e.target.value }));
              props.handleChangeNameError();
            }}
            placeholder="Enter article title"
            error={props.nameError}
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Article Author</label>
          </SC.LabelWrapper>
          <StyledInput
            defaultValue={article.author}
            onChange={(e) => {
              setArticle((article) => ({ ...article, author: e.target.value }));
              props.handleChangeAuthorError();
            }}
            placeholder="Enter article author"
            error={props.authorError}
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <SC.FormWrapper>
        <SC.LabelWrapper>
          <label>Article Description</label>
          <label className="optional">
            {article.description.length.toString()}/{MAX_LENGTH_DESCRIPTION}
          </label>
        </SC.LabelWrapper>
        <StyledTextArea
          defaultValue={article.description}
          onChange={(e) => {
            setArticle((article) => ({
              ...article,
              description: e.target.value,
            }));
            props.handleChangeDescriptionError();
          }}
          placeholder="Enter article description"
          error={props.descriptionError}
        />
      </SC.FormWrapper>
      <SC.FormWrapper>
        <SC.LabelWrapper>
          <label>Article Icon</label>
        </SC.LabelWrapper>
        <StyledDropImage
          title="Drop file to upload article icon"
          description="500 x 500px"
          src={articleIcon.src || articleLinkIcon}
          alt={articleIcon.alt}
          setImage={(vle) => {
            setArticleIcon(vle);
            if (vle.alt === "" || vle.src === "") setArticleLinkIcon("");
          }}
          handleButtonClick={(e) => {
            setIsModalOpen(true);
          }}
          widthLimit={500}
          heightLimit={500}
        />
      </SC.FormWrapper>
      <IconModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        type="article"
        widthLimit={500}
        heightLimit={500}
      />
    </SC.Container>
  );
}
