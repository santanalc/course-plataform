import React, { Fragment, useCallback, useState } from "react";
import SeoHead from "../../components/global/SeoHead";
import StyledFooter from "../../components/global/StyledFooter";
import Step2 from "../../components/screens/StartTestDrive/Step2/Step2";
import Step1 from "../../components/screens/StartTestDrive/Step1/Step1";
import * as SC from "./styled";

export enum StartTestDriveSteps {
  STEP1 = "STEP1",
  STEP2 = "STEP2",
}

export default function StartTestDrive() {
  const [selected, setSelected] = useState(StartTestDriveSteps.STEP1);

  const returnBody = useCallback(
    (selected: StartTestDriveSteps) => {
      switch (selected) {
        case StartTestDriveSteps.STEP1:
          return <Step1 setSelected={setSelected} />;
        case StartTestDriveSteps.STEP2:
          return <Step2 setSelected={setSelected} />;
        default:
          return <Step1 setSelected={setSelected} />;
      }
    },
    [selected]
  );

  return (
    <Fragment>
      <SeoHead pageName="Start Test Drive" />
      <SC.Container>
        <img
          className="image-logo"
          src="/login/learnistic-text-logo.svg"
          alt="Logo"
        />
        <SC.LoginWrapper>
          {returnBody(selected)}

          <StyledFooter />
        </SC.LoginWrapper>

        <SC.PhoneWrapper>
          <img className="image-mobile" src="/login/mobile.svg" alt="Mobile" />
          <img
            className="image-background"
            src="/login/faded-logo-background.svg"
            alt="Learnistic"
          />
        </SC.PhoneWrapper>
      </SC.Container>
    </Fragment>
  );
}
