import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { SingleValue } from "react-select";
import { useRecoilState } from "recoil";
import {
  CourseCommentSettingsAtom,
  CourseContentNotificationsAtom,
  CourseDescriptionAtom,
  CourseDonwloadLinkIconAtom,
  CourseDonwloadLinkImageAtom,
  CourseIconAtom,
  CourseImageAtom,
  CourseNumberedLessonsAtom,
  CourseStatusAtom,
  CourseTitleAtom,
  ProtectCourseAtom,
} from "../../../../../../atoms/NewCourseAtom";
import StyledDropImage from "../../../../../global/StyledDropImage";
import StyledInput from "../../../../../global/StyledInput";
import StyledSelect from "../../../../../global/StyledSelect";
import StyledSwitch from "../../../../../global/StyledSwitch";
import StyledTextArea from "../../../../../global/StyledTextArea";
import IconModal from "../../../../../modals/IconModal/IconModal";
import {
  COMMENT_SETTINGS,
  CONTENT_NOTIFICATION,
} from "./CustomizeCourseHelpers";
import * as SC from "./CustomizeCourseStyledComponents";

interface Props {
  courseTitleError: boolean;
  handleChangeCourseTitleError: () => void;
  courseDescriptionError: boolean;
  handleChangeCourseDescriptionError: () => void;
  contentNotificationError: boolean;
  handleChangeContentNotificationError: () => void;
  commentSettingsError: boolean;
  handleChangeCommentSettingsError: () => void;
}

export default function FirstColumn(props: Props) {
  const {
    courseTitleError,
    handleChangeCourseTitleError,
    courseDescriptionError,
    handleChangeCourseDescriptionError,
    contentNotificationError,
    handleChangeContentNotificationError,
    commentSettingsError,
    handleChangeCommentSettingsError,
  } = props;
  const [status, setStatus] = useRecoilState(CourseStatusAtom);
  const [title, setTitle] = useRecoilState(CourseTitleAtom);
  const [description, setDescription] = useRecoilState(CourseDescriptionAtom);
  const [icon, setIcon] = useRecoilState(CourseIconAtom);
  const [image, setImage] = useRecoilState(CourseImageAtom);
  const [numberedLessons, setNumberedLessons] = useRecoilState(
    CourseNumberedLessonsAtom
  );
  const [protectCourse, setProtectCourse] = useRecoilState(ProtectCourseAtom);
  const [contentNotifications, setContentNotifications] = useRecoilState(
    CourseContentNotificationsAtom
  );
  const [commentSettings, setCommentSettings] = useRecoilState(
    CourseCommentSettingsAtom
  );
  const [downloadLinkIcon, setDownloadLinkIcon] = useRecoilState(
    CourseDonwloadLinkIconAtom
  );
  const [downloadLinkImage, setDownloadLinkImage] = useRecoilState(
    CourseDonwloadLinkImageAtom
  );

  /* const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseIcon, setCourseIcon] = useRecoilState(CourseIconAtom); */

  const {
    isOpen: isOpenIconModal,
    onClose: onCloseIconModal,
    onOpen: onOpenIconModal,
  } = useDisclosure();

  const {
    isOpen: isOpenImageModal,
    onClose: onCloseImageModal,
    onOpen: onOpenImageModal,
  } = useDisclosure();

  function contentNotificationsOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setContentNotifications(newValue?.value!);
    handleChangeContentNotificationError();
  }

  function commentSettingsOnChange(
    newValue: SingleValue<{ value: string; label: string }>
  ) {
    setCommentSettings(newValue?.value!);
    handleChangeCommentSettingsError();
  }

  return (
    <SC.Container>
      <SC.FormWrapper>
        <SC.LabelWrapper>
          <label>Course Status</label>
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
          value={status}
          setValue={setStatus}
          labelActive="Active"
          labelInactive="Inactive"
        />
      </SC.FormWrapper>

      <SC.FormWrapper>
        <SC.LabelWrapper>
          <label>Course Title</label>
          <label className="optional">{title.length.toString()}/90</label>
        </SC.LabelWrapper>
        <StyledInput
          value={title}
          onChange={(e) => {
            handleChangeCourseTitleError();
            setTitle(e.target.value);
          }}
          placeholder="Enter course title"
          error={courseTitleError}
        />
      </SC.FormWrapper>

      <SC.FormWrapper>
        <SC.LabelWrapper>
          <label>Course Description</label>
          <label className="optional">
            {description.length.toString()}/150
          </label>
        </SC.LabelWrapper>
        <StyledTextArea
          value={description}
          onChange={(e) => {
            handleChangeCourseDescriptionError();
            setDescription(e.target.value);
          }}
          placeholder="Enter course description"
          error={courseDescriptionError}
        />
      </SC.FormWrapper>

      <SC.FormContent>
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Course Icon</label>
          </SC.LabelWrapper>
          <StyledDropImage
            title="Drop file to upload course icon"
            description="500 x 500px"
            alt={icon.alt}
            src={icon.src || downloadLinkIcon}
            setImage={(vle) => {
              setIcon(vle);
              if (vle.alt === "" || vle.src === "") setDownloadLinkIcon("");
            }}
            handleButtonClick={onOpenIconModal}
            widthLimit={500}
            heightLimit={500}
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Course Image</label>
          </SC.LabelWrapper>
          <StyledDropImage
            title="Drop file to upload course image"
            description="1280 x 720px"
            alt={image.alt}
            src={image.src || downloadLinkImage}
            setImage={(vle) => {
              setImage(vle);
              if (vle.alt === "" || vle.src === "") setDownloadLinkImage("");
            }}
            handleButtonClick={onOpenImageModal}
            widthLimit={1280}
            heightLimit={720}
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <div className="divider" />

      <SC.FormContent>
        <SC.FormWrapper>
          <SC.MainLabelWrapper>
            <label>Numbered Lessons</label>
            <StyledSwitch
              value={numberedLessons}
              setValue={setNumberedLessons}
              labelActive=""
              labelInactive=""
            />
          </SC.MainLabelWrapper>
          <SC.LabelWrapper>
            <label>Content Notifications</label>
          </SC.LabelWrapper>

          <StyledSelect
            onChange={contentNotificationsOnChange}
            options={CONTENT_NOTIFICATION}
            placeholder="Select a content notification option"
            error={contentNotificationError}
            defaultValue={
              contentNotifications
                ? {
                    value: contentNotifications,
                    label:
                      CONTENT_NOTIFICATION[parseInt(contentNotifications) - 1]
                        .label,
                  }
                : undefined
            }
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <SC.MainLabelWrapper>
            <label>Protect Course</label>
            <StyledSwitch
              value={protectCourse}
              setValue={setProtectCourse}
              labelActive=""
              labelInactive=""
            />
          </SC.MainLabelWrapper>
          <SC.LabelWrapper>
            <label>Comment Settings</label>
          </SC.LabelWrapper>

          <StyledSelect
            onChange={commentSettingsOnChange}
            options={COMMENT_SETTINGS}
            placeholder="Select a comment settings option"
            error={commentSettingsError}
            defaultValue={
              commentSettings
                ? {
                    value: commentSettings,
                    label:
                      COMMENT_SETTINGS[parseInt(commentSettings) - 1].label,
                  }
                : undefined
            }
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <IconModal
        isOpen={isOpenIconModal}
        onClose={onCloseIconModal}
        type="course"
        widthLimit={500}
        heightLimit={500}
      />
      <IconModal
        isOpen={isOpenImageModal}
        onClose={onCloseImageModal}
        type="course"
        widthLimit={1280}
        heightLimit={720}
        isImage
      />
    </SC.Container>
  );
}
