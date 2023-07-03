import React, { Fragment } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import TopBar from "../../components/global/TopBar";
import StyledIconButton from "../../components/global/StyledIconButton";
import NotificationForm from "../../components/screens/NotificationForm/NotificationForm";
import * as SC from "./styled";

export default function Notifications() {
  return (
    <Fragment>
      <SeoHead pageName="Notification" />
      <SC.Container>
        <TopBar
          title="Notification"
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Notification video"
            />
          }
        />
        <SC.Wrapper>
          <NotificationForm />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
