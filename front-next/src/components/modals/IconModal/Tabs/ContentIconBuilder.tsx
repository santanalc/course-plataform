import React from "react";
import styled from "@emotion/styled";
import { FaLightbulb } from "react-icons/fa";

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

export default function ContentIconBuilder() {
  return (
    <Container>
      <h1 className="title">Icon Builder</h1>

      <p className="description">
        The Icon Builder is a fun little tool that allows you to easily create
        icons that look great with your app without all of the hassle of using
        Photoshop or relying on outside designers. It’s meant to help guide you
        through the creation process in a way that yields ideal results. It will
        help you create icons that look good with your color palette and use
        best practices.
      </p>

      <QuickTipWrapper>
        <TitleWrapper>
          <FaLightbulb />
          <div className="title">Quick Tip</div>
        </TitleWrapper>

        <p className="description">
          When creating an icon, it’s recommended to use a gradient background
          as they stand out a little better and are a bit softer on the eyes.
          For that reason we suggest a gradient background by default based upon
          your selected color palette. If your colors are medium to dark, the
          best icon color is white, so again, that’s why we suggest it. But
          you’ll see that you have full control to play with it yourself, so
          enjoy!
        </p>
      </QuickTipWrapper>
    </Container>
  );
}
