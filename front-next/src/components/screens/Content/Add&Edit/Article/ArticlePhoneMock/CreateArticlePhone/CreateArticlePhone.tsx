import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import {
  ArticleIconAtom,
  ArticleLinkIconAtom,
  CreateArticleAtom,
} from "../../../../../../../atoms/NewArticleAtom";
import StyledShimmer from "../../../../../../global/StyledShimmer";
import * as SC from "./CreateArticlePhoneStyledComponents";

export default function CreateArticlePhone() {
  const article = useRecoilValue(CreateArticleAtom);
  const articleIcon = useRecoilValue(ArticleIconAtom);
  const articleLinkIcon = useRecoilValue(ArticleLinkIconAtom);

  return (
    <Fragment>
      <SC.BannerWrapper />
      <SC.CourseCard>
        {articleIcon.src || articleLinkIcon ? (
          <img
            src={articleIcon.src || articleLinkIcon}
            alt={articleIcon.alt}
            className="article-icon"
          />
        ) : (
          <StyledShimmer className="icon" />
        )}

        <span className="text-wrapper">
          {article.name ? (
            <p className="article-name">{article.name}</p>
          ) : (
            <StyledShimmer className="title" />
          )}
          {article.description ? (
            <p className="article-description">{article.description}</p>
          ) : (
            <StyledShimmer className="description mt-8px" />
          )}
        </span>
      </SC.CourseCard>
      <SC.CourseCard className="non-brightness">
        <StyledShimmer className="icon" />
        <span className="text-wrapper">
          <StyledShimmer className="title" />
          <StyledShimmer className="description mt-8px" />
        </span>
      </SC.CourseCard>
      <SC.CourseCard className="non-brightness">
        <StyledShimmer className="icon" />
        <span className="text-wrapper">
          <StyledShimmer className="title" />
          <StyledShimmer className="description mt-8px" />
        </span>
      </SC.CourseCard>
    </Fragment>
  );
}
