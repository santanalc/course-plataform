import React from "react";
import { useRecoilValue } from "recoil";
import MobileStatusBar from "../../../../../../../public/global/MobileStatusBar";
import { VirtualAppAtom } from "../../../../../../atoms/VirtualAppAtom";
import { ArticleTabs } from "../../../../../../pages/content/article";
import AddContentPhone from "./AddContentPhone/AddContentPhone";
import * as SC from "./ArticlePhoneMockStyledComponents";
import CreateArticlePhone from "./CreateArticlePhone/CreateArticlePhone";

type ArticlePhoneMockProps = {
  selected: ArticleTabs;
};

export default function ArticlePhoneMock({ selected }: ArticlePhoneMockProps) {
  const virtualApp = useRecoilValue(VirtualAppAtom);

  function returnBody(currentSelected: ArticleTabs) {
    switch (currentSelected) {
      case ArticleTabs.CREATE_ARTICLE:
        return <CreateArticlePhone />;
      case ArticleTabs.ADD_CONTENT:
        return <AddContentPhone />;
      default:
        return <CreateArticlePhone />;
    }
  }

  return (
    <SC.Container>
      <SC.MobileImageWrapper>
        <SC.MobileImage src="/global/mobile-mock.png" alt="Mobile" />
        <SC.ContentWrapper color={virtualApp?.titleBarColor!}>
          <MobileStatusBar color={virtualApp?.titleBarColor!} />
          <SC.StatusBar color={virtualApp?.titleBarColor!}>
            Preview
          </SC.StatusBar>
          {returnBody(selected)}
        </SC.ContentWrapper>
      </SC.MobileImageWrapper>
    </SC.Container>
  );
}
