import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import {
  ArticleContentAtom,
  ArticleImageAtom,
  ArticleLinkImageAtom,
} from "../../../../../../../atoms/NewArticleAtom";
import StyledShimmer from "../../../../../../global/StyledShimmer";
import * as SC from "./AddContentPhoneStyledComponents";

export default function AddContentPhone() {
  const articleContent = useRecoilValue(ArticleContentAtom);
  const articleImage = useRecoilValue(ArticleImageAtom);
  const articleLinkImage = useRecoilValue(ArticleLinkImageAtom);

  return (
    <Fragment>
      {articleLinkImage || articleImage.src ? (
        <SC.ArticleImage
          src={articleLinkImage || articleImage.src}
          alt={articleImage.alt}
        />
      ) : (
        <SC.BannerWrapper>
          <img src="/global/mobile-empty-img-banner.svg" alt="Empty banner" />
          <p className="banner-text">Your article media goes here</p>
        </SC.BannerWrapper>
      )}
      <SC.TextWrapper>
        {articleContent.length > 7 ? (
          <p
            className="ProseMirror"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        ) : (
          <Fragment>
            <StyledShimmer className="full-text" />
            <StyledShimmer className="full-text" />
            <StyledShimmer className="full-text" />
            <StyledShimmer className="full-text" />
            <StyledShimmer className="full-text" />
            <StyledShimmer className="half-text" />
          </Fragment>
        )}
      </SC.TextWrapper>
    </Fragment>
  );
}
