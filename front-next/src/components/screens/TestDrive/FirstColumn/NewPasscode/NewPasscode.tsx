import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  NewPasscodeAtom,
  StepOptionsAtom,
} from "../../../../../atoms/TestDriveAtom";
import StyledPassCodeInputs from "../../../../global/StyledPassCodeInputs/StyledPassCodeInputs";
import * as SC from "./NewPasscodeStyledComponents";

type PasscodeStep = "CREATE" | "CONFIRM";

export default function NewPasscode() {
  const [testDriveStep, setTestDriveStep] = useRecoilState(StepOptionsAtom);
  const [passcodeStep, setPasscodeStep] = useState<PasscodeStep>("CREATE");
  const [newPasscode, setNewPasscode] = useState(["", "", "", ""]);
  const [repeatPasscode, setRepeatPasscode] = useState(["", "", "", ""]);
  const setNewTDPasscode = useSetRecoilState(NewPasscodeAtom);
  const [error, setError] = useState("");

  useEffect(() => {
    if (newPasscode.join("").length === 4) {
      setPasscodeStep("CONFIRM");
    }
  }, [newPasscode]);

  useEffect(() => {
    if (repeatPasscode.join("").length === 4) {
      if (repeatPasscode.join("") !== newPasscode.join("")) setError("error");
      else {
        setNewTDPasscode(repeatPasscode);
        setTestDriveStep("TERMS_OF_SERVICE");
      }
    }
  }, [repeatPasscode]);

  return (
    <SC.Container>
      <p className="text">
        {passcodeStep === "CREATE"
          ? "Please create a new secure 4-digit passcode to log into Learnistic"
          : "Please retype your passcode to confirm"}
      </p>
      <SC.PasscodeInputsWrapper>
        {passcodeStep === "CREATE" ? (
          <StyledPassCodeInputs
            key={passcodeStep}
            focusOnMount
            passcode={newPasscode}
            handleChangePasscode={(newPassCode) => {
              setNewPasscode(newPassCode);
              setError("");
            }}
            error={error !== ""}
            handleChangeError={(newError) => {
              setError(newError);
            }}
          />
        ) : (
          <StyledPassCodeInputs
            key={passcodeStep}
            focusOnMount
            passcode={repeatPasscode}
            handleChangePasscode={(newPassCode) => {
              setRepeatPasscode(newPassCode);
              setError("");
            }}
            error={error !== ""}
            handleChangeError={(newError) => {
              setError(newError);
            }}
          />
        )}
      </SC.PasscodeInputsWrapper>
    </SC.Container>
  );
}
