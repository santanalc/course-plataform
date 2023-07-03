import React from "react";
import styled from "@emotion/styled";
import { IconTabs } from "./IconModal";
import { FaCloudUploadAlt, FaImages, FaTools } from "react-icons/fa";

const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #f4f4f4;

  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 24px;
`;

const ButtonWrapper = styled.div`
  width: 120px;
  height: 120px;

  background: white;

  border: 1px solid var(--gray-200);
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  > svg {
    width: 32px;
    height: 32px;

    color: var(--gray-700);
  }

  > .title {
    margin-top: 8px;

    font-size: 16px;
    font-weight: 400;
    color: var(--gray-700);
  }

  &.active {
    border: 2px solid var(--orange-300);

    > svg {
      color: var(--orange-300);
    }

    > .title {
      font-weight: 600;
      color: var(--orange-300);
    }
  }
`;

type SidebarNavigationModalProps = {
  selected: IconTabs;
  handleSelected: (vle: IconTabs) => void;
  isImage?: boolean;
};

export default function SidebarNavigationModal({
  selected,
  handleSelected,
  isImage,
}: SidebarNavigationModalProps) {
  let SIDEBAR_NAVIGATION_BUTTONS_MODAL = [
    {
      icon: <FaCloudUploadAlt />,
      title: "Upload File",
      currentState: IconTabs.UPLOAD_FILE,
    },
    {
      icon: <FaTools />,
      title: "Icon Builder",
      currentState: IconTabs.ICON_BUILDER,
    },
    {
      icon: <FaImages />,
      title: "Media Library",
      currentState: IconTabs.MEDIA_LIBRARY,
    },
  ];

  if (isImage)
    SIDEBAR_NAVIGATION_BUTTONS_MODAL = SIDEBAR_NAVIGATION_BUTTONS_MODAL.filter(
      (element) => {
        if (element.title != "Icon Builder") return element;
      }
    );

  return (
    <Container>
      {SIDEBAR_NAVIGATION_BUTTONS_MODAL.map((b) => (
        <ButtonWrapper
          className={selected === b.currentState ? "active" : ""}
          key={b.title}
          onClick={() => handleSelected(b.currentState)}
        >
          {b.icon}
          <h2 className="title">{b.title}</h2>
        </ButtonWrapper>
      ))}
    </Container>
  );
}
