import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";
import {
  EmailAddressAtom,
  FirstNameAtom,
  LastNameAtom,
  MobileNumberAtom,
} from "../../../../atoms/TestDriveAtom";
import { StartTestDriveSteps } from "../../../../pages/start-test-drive";
import StyledButton from "../../../global/StyledButton";
import StyledInput from "../../../global/StyledInput";
import StyledPhoneCountryInput from "../../../global/StyledPhoneCountryInput";
import * as SC from "./Step1StyledComponents";

type Step1Props = {
  setSelected: Dispatch<SetStateAction<StartTestDriveSteps>>;
};

export default function Step1({ setSelected }: Step1Props) {
  const [firstName, setFirstName] = useRecoilState(FirstNameAtom);
  const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
  const [lastName, setLastName] = useRecoilState(LastNameAtom);
  const [lastNameIsInvalid, setLastNameIsInvalid] = useState(false);
  const [emailAddress, setEmailAddress] = useRecoilState(EmailAddressAtom);
  const [emailAddressIsInvalid, setEmailAddressIsInvalid] = useState(false);
  const [mobilePhone, setMobilePhone] = useRecoilState(MobileNumberAtom);
  const [mobilePhoneError, setMobilePhoneError] = useState(false);

  const toast = useToast();
  const router = useRouter();

  function handleSubmit() {
    let hasError = false;

    if (!firstName) {
      hasError = true;
      setFirstNameIsInvalid(true);
    }

    if (!lastName) {
      hasError = true;
      setLastNameIsInvalid(true);
    }

    if (!emailAddress) {
      hasError = true;
      setEmailAddressIsInvalid(true);
    }

    if (!mobilePhone) {
      hasError = true;
      setMobilePhoneError(true);
    }

    if (hasError) {
      toast({
        title: "Form error",
        description: "Fields invalids",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    setSelected(StartTestDriveSteps.STEP2);
  }

  return (
    <SC.Content>
      <h1 className="title">Start Your Test Drive</h1>
      <SC.FormContainer>
        <p className="text">
          Enter your details below to start your FREE test drive.
        </p>

        <span className="form-elements-wrapper">
          <SC.FormWrapper>
            <label>First Name</label>
            <StyledInput
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameIsInvalid(false);
              }}
              placeholder="Enter first name"
              error={firstNameIsInvalid}
            />
          </SC.FormWrapper>

          <SC.FormWrapper>
            <label>Last Name</label>
            <StyledInput
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameIsInvalid(false);
              }}
              placeholder="Enter last name"
              error={lastNameIsInvalid}
            />
          </SC.FormWrapper>
        </span>

        <SC.FormWrapper>
          <label>Email Address</label>
          <StyledInput
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
              setEmailAddressIsInvalid(false);
            }}
            placeholder="Enter email address"
            error={emailAddressIsInvalid}
          />
        </SC.FormWrapper>

        <SC.FormWrapper>
          <label>Mobile Number</label>
          <StyledPhoneCountryInput
            error={mobilePhoneError}
            phone={mobilePhone}
            handleChangePhone={(e) => {
              setMobilePhone(e);
              setMobilePhoneError(false);
            }}
          />
        </SC.FormWrapper>

        <span className="form-elements-wrapper">
          <StyledButton onClick={() => router.push("/")} variant="outlined">
            Back
          </StyledButton>
          <StyledButton onClick={handleSubmit} variant="filled">
            Next
          </StyledButton>
        </span>
      </SC.FormContainer>
    </SC.Content>
  );
}
