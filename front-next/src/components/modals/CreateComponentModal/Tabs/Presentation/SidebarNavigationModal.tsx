import React from "react";
import styled from "@emotion/styled";
import { MdClass, MdDescription, MdVideocam } from "react-icons/md";
import { ComponentTabs } from "../../CreateComponentModal";

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

    font-size: 18px;
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
  selected: ComponentTabs;
  handleSelected: (vle: ComponentTabs) => void;
};

export default function SidebarNavigationModal({
  selected,
  handleSelected,
}: SidebarNavigationModalProps) {
  const SIDEBAR_NAVIGATION_BUTTONS_MODAL = [
    {
      icon: <MdClass />,
      title: "Page",
      currentState: ComponentTabs.PAGE,
    },
    {
      icon: <MdVideocam />,
      title: "Course",
      currentState: ComponentTabs.COURSE,
    },
    {
      icon: <MdDescription />,
      title: "Article",
      currentState: ComponentTabs.ARTICLE,
    },
  ];

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
