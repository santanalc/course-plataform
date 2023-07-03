import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import {
  CourseDescriptionAtom,
  CourseDonwloadLinkIconAtom,
  CourseDonwloadLinkImageAtom,
  CourseIconAtom,
  CourseImageAtom,
  CourseTitleAtom,
} from "../../../../../../../atoms/NewCourseAtom";
import StyledShimmer from "../../../../../../global/StyledShimmer";
import * as SC from "./CustomizeCoursePhoneStyledComponents";

export default function CustomizeCoursePhone() {
  const title = useRecoilValue(CourseTitleAtom);
  const description = useRecoilValue(CourseDescriptionAtom);
  const icon = useRecoilValue(CourseIconAtom);
  const downloadLinkIcon = useRecoilValue(CourseDonwloadLinkIconAtom);
  const image = useRecoilValue(CourseImageAtom);
  const downloadLinkImage = useRecoilValue(CourseDonwloadLinkImageAtom);

  return (
    <Fragment>
      {image.src || downloadLinkImage ? (
        <SC.CourseImage src={image.src || downloadLinkImage} alt={image.alt} />
      ) : (
        <SC.BannerWrapper />
      )}
      <SC.CourseCard>
        {icon.src || downloadLinkIcon ? (
          <img
            src={icon.src || downloadLinkIcon}
            alt={icon.alt}
            className="course-icon"
          />
        ) : (
          <StyledShimmer className="icon" />
        )}

        <span className="text-wrapper">
          {title ? (
            <p className="course-title">{title}</p>
          ) : (
            <StyledShimmer className="title" />
          )}
          {description ? (
            <p className="course-description">{description}</p>
          ) : (
            <StyledShimmer className="description mt-8px" />
          )}
        </span>
      </SC.CourseCard>
      <SC.CourseCard className="non-brightness">
        <StyledShimmer className="icon" />
        <span className="text-wrapper grid-gap">
          <StyledShimmer className="title" />
          <StyledShimmer className="description" />
        </span>
      </SC.CourseCard>
      <SC.CourseCard className="non-brightness">
        <StyledShimmer className="icon" />
        <span className="text-wrapper grid-gap">
          <StyledShimmer className="title" />
          <StyledShimmer className="description" />
        </span>
      </SC.CourseCard>
    </Fragment>
  );
}
