import React from "react";
import { useRecoilValue } from "recoil";
import { StepOptionsAtom } from "../../../../../atoms/TestDriveAtom";
import * as SC from "./StepHeaderStyledComponents";

export default function StepHeader() {
  const testDriveStep = useRecoilValue(StepOptionsAtom);

  return (
    <SC.Container>
      <SC.StepComponent className="active">
        <div className="circle">1</div>
        <p className="label">New Passcode</p>
      </SC.StepComponent>

      <div
        className={`line ${testDriveStep === "NEW_PASSCODE" ? "" : "active"}`}
      />

      <SC.StepComponent
        className={testDriveStep === "NEW_PASSCODE" ? "" : "active"}
      >
        <div className="circle">2</div>
        <p className="label">Terms of Service</p>
      </SC.StepComponent>

      <div
        className={`line ${testDriveStep === "APP_SETUP" ? "active" : ""}`}
      />

      <SC.StepComponent
        className={
          testDriveStep === "NEW_PASSCODE" ||
          testDriveStep === "TERMS_OF_SERVICE"
            ? ""
            : "active"
        }
      >
        <div className="circle">3</div>
        <p className="label">App Setup</p>
      </SC.StepComponent>
    </SC.Container>
  );
}
