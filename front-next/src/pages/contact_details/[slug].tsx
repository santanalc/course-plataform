import React, { Fragment } from "react";
import { FaPlay } from "react-icons/fa";
import SeoHead from "../../components/global/SeoHead";
import StyledIconButton from "../../components/global/StyledIconButton";
import TopBar from "../../components/global/TopBar";
import RecentActivities from "../../components/screens/ContactDetails/RecentActivities/RecentActivities";
import ContactDetailsForm from "../../components/screens/ContactDetails/ContactDetailsForm/ContactDetailsForm";
import { useRouter } from "next/dist/client/router";
import * as SC from "./styled";

export default function ContactDetails() {
  const router = useRouter();
  return (
    <Fragment>
      <SeoHead pageName="Contact Details" />
      <SC.Container>
        <TopBar
          title="Contact Details"
          onClickButtonBack={() => router.push("/contacts")}
          buttons={
            <StyledIconButton
              icon={<FaPlay />}
              onClick={() => {}}
              tooltipLabel="Contact details video"
            />
          }
        />

        <SC.Wrapper>
          <ContactDetailsForm />
          <RecentActivities />
        </SC.Wrapper>
      </SC.Container>
    </Fragment>
  );
}
