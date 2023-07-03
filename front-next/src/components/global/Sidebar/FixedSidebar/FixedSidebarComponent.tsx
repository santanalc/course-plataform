import React from "react";
import styled from "@emotion/styled";
import SidebarButtonsList from "./FixedSidebarButtonsList";
import SidebarAvatarPopover from "./FixedSidebarAvatarPopover";
import SystemNotificationsPopover from "./SystemNotificationsPopover/SystemNotificationsPopover";

const Container = styled.nav`
  width: 60px;
  max-width: 60px;
  min-width: 60px;
  min-height: 100%;
  max-height: 100vh;

  background: linear-gradient(#4199cf, #2f75b6);

  padding: 10px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
`;

export default function FixedSidebarComponent() {
  return (
    <Container>
      <Logo src="/sidebar/learnistic-logo-white.svg" alt="Learnistic Logo" />

      <SidebarButtonsList />

      <ProfileWrapper>
        <SystemNotificationsPopover />
        <SidebarAvatarPopover />
      </ProfileWrapper>
    </Container>
  );
}
