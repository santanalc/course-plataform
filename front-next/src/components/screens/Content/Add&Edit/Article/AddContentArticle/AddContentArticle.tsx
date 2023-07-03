/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ArticleImageAtom,
  ArticleLinkImageAtom,
} from "../../../../../../atoms/NewArticleAtom";
import StyledDropImage from "../../../../../global/StyledDropImage";
import IconModal from "../../../../../modals/IconModal/IconModal";
import * as SC from "./AddContentArticleStyledComponents";
import ArticleContentTiptap from "./ArticleContentTiptap";

export default function AddContentArticle() {
  const [articleImage, setArticleImage] = useRecoilState(ArticleImageAtom);
  const [articleLinkImage, setArticleLinkImage] =
    useRecoilState(ArticleLinkImageAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SC.Container>
      <IconModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        type="article"
        widthLimit={1280}
        heightLimit={720}
        isImage
      />
      <SC.FormContent>
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Article Media</label>
          </SC.LabelWrapper>
          <StyledDropImage
            title="Drop file to upload article media"
            description="1280 x 720px"
            src={articleImage.src || articleLinkImage}
            alt={articleImage.alt}
            setImage={(vle) => {
              setArticleImage(vle);
              if (vle.alt === "" || vle.src === "") setArticleLinkImage("");
            }}
            widthLimit={1280}
            heightLimit={720}
            handleButtonClick={(e) => {
              setIsModalOpen(true);
            }}
          />
        </SC.FormWrapper>
      </SC.FormContent>

      <SC.FormContent>
        <SC.FormWrapper>
          <SC.LabelWrapper>
            <label>Article Content</label>
          </SC.LabelWrapper>
          <ArticleContentTiptap />
        </SC.FormWrapper>
      </SC.FormContent>
    </SC.Container>
  );
}
