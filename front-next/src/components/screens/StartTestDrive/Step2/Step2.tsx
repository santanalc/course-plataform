import { useInterval, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StartTestDriveSteps } from "../../../../pages/start-test-drive";
import StyledButton from "../../../global/StyledButton";
import StyledPassCodeInputs from "../../../global/StyledPassCodeInputs/StyledPassCodeInputs";
import * as SC from "./Step2StyledComponents";

type Step2Props = {
  setSelected: Dispatch<SetStateAction<StartTestDriveSteps>>;
};

export default function Step2({ setSelected }: Step2Props) {
  const toast = useToast();
  const router = useRouter();

  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [passcodeError, setPasscodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [useIntervalSensibility, setUseIntervalSensibility] = useState<
    number | null
  >(1000);

  const twoDigits = (num: number) => String(num).padStart(2, "0");
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useInterval(() => {
    if (secondsRemaining > 0) {
      setSecondsRemaining(secondsRemaining - 1);
    } else {
      toast({
        title: "Resend passcode",
        description: `Resend passcode description`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setUseIntervalSensibility(null);
    }
  }, useIntervalSensibility);

  function handleSubmit() {
    if (loading) return;

    try {
      // const userIdToken = (await Firebase.login(phone, passcode.join("")))
      //   .userIdToken;
      // if (!userIdToken) {
      //   setPasscodeError("User not found");
      // } else {
      //   let getUserResponse = await client.query<
      //     GetUserInfoQueryVariables,
      //     GetUserInfoQuery
      //   >({
      //     query: GET_USER,
      //   });
      //   if (getUserResponse.errors || !getUserResponse.data.getUser) {
      //     setPasscodeError("User not found");
      //   } else {
      //     setUser(getUserResponse.data.getUser);
      //     router.push("/apps?mode=login");
      //   }
      // }

      router.push("/test-drive");
    } catch (e) {
      console.error(e);
      setPasscodeError("Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (passcode.join("").length === 4) {
      setLoading(true);
      handleSubmit();
    }
  }, [passcode]);

  return (
    <SC.Content>
      <h1 className="title">Start Your Test Drive</h1>
      <SC.FormContainer>
        <p className="text">
          Please enter the temporary passcode sent to your mobile number and
          email address.
        </p>

        <StyledPassCodeInputs
          focusOnMount
          passcode={passcode}
          handleChangePasscode={(newPassCode) => {
            setPasscode(newPassCode);
          }}
          error={passcodeError !== ""}
          handleChangeError={(newError) => setPasscodeError(newError)}
        />

        <span className="form-elements-wrapper">
          <StyledButton
            onClick={() => setSelected(StartTestDriveSteps.STEP1)}
            variant="outlined"
          >
            Back
          </StyledButton>
          <StyledButton onClick={handleSubmit} variant="filled">
            Next
          </StyledButton>
        </span>

        <SC.ResendPasscodeWrapper>
          <p>
            Did not receive Resend passcode in {twoDigits(minutesToDisplay)}:
            {twoDigits(secondsToDisplay)}
          </p>
          <button className="link">Resend passcode</button>
        </SC.ResendPasscodeWrapper>
      </SC.FormContainer>
    </SC.Content>
  );
}
