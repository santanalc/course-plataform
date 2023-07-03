import React from "react";
import styled from "@emotion/styled";
import { FaLightbulb } from "react-icons/fa";
import { ComponentTabs } from "../../CreateComponentModal";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;

  > .title {
    font-size: 20px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

const QuickTipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 8px;

  > .description {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

const TitleWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 4px;

  > svg {
    width: 16px;
    height: 16px;
    color: #f8a930;
  }

  > .title {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

type ContentComponentModalProps = {
  selected: ComponentTabs;
};

export default function ContentComponentModal({
  selected,
}: ContentComponentModalProps) {
  const CONTENT_MODAL = [
    {
      title: "Page Component",
      description:
        "Pages are used to organize your app in whatever what you want. Think of pages like “folders” on your computer. <br /> <br /> Each folder can have items in it and even sub-folders. Pages are the same. Each page can have menu items on it and each page can also have sub-pages. You can arrange all of your content in whatever hierarchical format or structure you want. Create some pages and sub-pages and rearrange the content as you see fit. <br /> <br /> To navigate to a page, simply click on its icon in either the left menu navigation or the right preview pane. To edit a page, click the little gear button on the right edge of the page menu item.",
      quickTip:
        "If you have more items that display on the screen without scrolling, then you probably need to use a page to break up the content. It’s best to keep items “above the scroll”.",
    },
    {
      title: "Course Component",
      description:
        "Course are used to organize your app in whatever what you want. Think of pages like “folders” on your computer. <br /> <br />  Create some pages and sub-pages and rearrange the content as you see fit. <br /> <br /> To navigate to a page, simply click on its icon in either the left menu navigation or the right preview pane. To edit a page, click the little gear button on the right edge of the page menu item.",
      quickTip:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ab voluptas fuga.",
    },
    {
      title: "Article Component",
      description:
        "Article are used to organize your app in whatever what you want. <br /> <br /> Each folder can have items in it and even sub-folders. Pages are the same. Each page can have menu items on it and each page can also have sub-pages. You can arrange all of your content in whatever hierarchical format or structure you want. <br /> <br /> To navigate to a page, simply click on its icon in either the left menu navigation or the right preview pane. To edit a page, click the little gear button on the right edge of the page menu item.",
      quickTip:
        "Dolorum ab voluptas fuga. Doloribus architecto facere similique ab sint illum ad? Accusantium iste ut nisi est, earum necessitatibus facilis totam minus?",
    },
  ];

  function getText(currentSelected: ComponentTabs) {
    if (currentSelected === "PAGE") return CONTENT_MODAL[0];
    if (currentSelected === "COURSE") return CONTENT_MODAL[1];
    if (currentSelected === "ARTICLE") return CONTENT_MODAL[2];
    return CONTENT_MODAL[0];
  }

  return (
    <Container>
      <h1 className="title">{getText(selected).title}</h1>

      <p
        className="description"
        dangerouslySetInnerHTML={{ __html: getText(selected).description }}
      />

      <QuickTipWrapper>
        <TitleWrapper>
          <FaLightbulb />
          <div className="title">Quick Tip</div>
        </TitleWrapper>

        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: getText(selected).quickTip }}
        />
      </QuickTipWrapper>
    </Container>
  );
}
