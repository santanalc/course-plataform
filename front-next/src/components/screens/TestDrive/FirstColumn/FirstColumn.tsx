import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import {
  StepOptionsAtom,
  StepOptionsProps,
} from "../../../../atoms/TestDriveAtom";
import AppSetup from "./AppSetup/AppSetup";
import * as SC from "./FirstColumnStyledComponents";
import NewPasscode from "./NewPasscode/NewPasscode";
import StepHeader from "./StepHeader/StepHeader";
import TermsOfService from "./TermsOfService/TermsOfService";

export default function FirstColumn() {
  const testDriveStep = useRecoilValue(StepOptionsAtom);

  const returnBody = useCallback(
    (currentSelected: StepOptionsProps) => {
      switch (currentSelected) {
        case "NEW_PASSCODE":
          return <NewPasscode />;
        case "TERMS_OF_SERVICE":
          return <TermsOfService />;
        case "APP_SETUP":
          return <AppSetup />;
        default:
          return <NewPasscode />;
      }
    },
    [testDriveStep]
  );

  return (
    <SC.Container>
      <StepHeader />

      {returnBody(testDriveStep)}
    </SC.Container>
  );
}
