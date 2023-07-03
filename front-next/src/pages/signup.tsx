import { gql, useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import SeoHead from "../components/global/SeoHead";
import StyledButton from "../components/global/StyledButton";
import StyledFooter from "../components/global/StyledFooter";
import StyledInput from "../components/global/StyledInput";
import {
  TestDriveSignUpMutation,
  TestDriveSignUpMutationVariables,
} from "../generated/graphql";

const Container = styled.main`
  width: 100%;
  min-height: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  position: relative;

  .image-logo {
    position: absolute;
    top: 48px;
    left: 48px;

    @media (max-width: 1600px) and (max-height: 730px) {
      top: 24px;
      left: 24px;
    }
  }

  @media (max-width: 1280px) and (max-height: 970px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1280px) and (max-height: 790px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PhoneWrapper = styled.div`
  width: 100%;
  max-height: 100vh;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  position: relative;

  .image-mobile {
    z-index: 1;

    @media (max-width: 1280px) and (max-height: 970px) {
      max-width: 560px;
      width: 100%;
    }

    @media (max-width: 1760px) and (max-height: 790px) {
      max-width: 480px;
      width: 100%;
    }

    @media (max-width: 1600px) and (max-height: 730px) {
      max-width: 400px;
      width: 100%;
    }
  }

  .image-background {
    min-width: 1600px;
    max-width: 1600px;

    z-index: 0;

    position: fixed;
    bottom: -560px;
    right: -640px;
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 160px 16px 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  z-index: 9;

  @media (max-width: 1280px) and (max-height: 970px) {
    max-width: 640px;

    flex-shrink: 0;
  }

  @media (max-width: 1280px) and (max-height: 790px) {
    max-width: 640px;

    flex-shrink: 0;
  }

  @media (max-width: 1600px) and (max-height: 730px) {
    padding: 96px 16px 24px;
  }
`;

const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > .title {
    font-size: 64px;
    line-height: 80px;
    font-weight: 900;
    color: #2f2f2f;
    text-align: center;

    @media (max-width: 1760px) and (max-height: 970px) {
      font-size: 56px;
      line-height: 72px;
    }

    @media (max-width: 1440px) and (max-height: 970px) {
      font-size: 48px;
      line-height: 64px;
    }

    @media (max-width: 1280px) and (max-height: 970px) {
      font-size: 40px;
      line-height: 56px;
    }

    @media (max-width: 1760px) and (max-height: 790px) {
      font-size: 40px;
      line-height: 56px;
    }

    @media (max-width: 1600px) and (max-height: 730px) {
      font-size: 40px;
      line-height: 56px;
    }

    //! Ipad PRO style
    @media (min-width: 1356px) and (min-height: 1014px) {
      font-size: 56px;
      line-height: 72px;
    }
  }
`;

const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 24px;

  .form-elements-wrapper {
    width: 100%;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    grid-gap: 24px;
  }

  > .text {
    font-size: 16px;
    font-weight: 400;
    color: #2f2f2f;
    text-align: center;

    margin-bottom: 16px;
  }

  #styled-button {
    height: 48px;

    margin-top: 32px;

    flex: 1;

    font-size: 18px;
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  #styled-input {
    height: 48px;

    font-size: 16px;

    &::placeholder {
      font-size: 16px;
    }
  }

  .react-tel-input .form-control {
    width: 100%;
    height: 48px;

    border: 1px solid;
    border-color: var(--gray-200);
    border-radius: 8px;

    color: var(--gray-700);

    transition: box-shadow 0.3s, border 0.3s;

    :focus {
      box-shadow: 0px 0px 6px var(--orange-400);
      border: 1px solid var(--orange-300);
    }
  }

  .react-tel-input .flag-dropdown {
    border-color: var(--gray-200);

    border-radius: 8px 0 0 8px;
  }

  .react-tel-input .country-list {
    width: 500px;
  }

  tel-input .selected-flag.open:before,
  .react-tel-input .selected-flag:focus:before,
  .react-tel-input .selected-flag.open:before {
    border: none;
    box-shadow: none;
  }

  > label {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }
`;

export const SIGN_UP = gql`
  mutation TestDriveSignUp(
    $countryCode: String!
    $phone: String!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    testDriveSignUp(
      countryCode: $countryCode
      phone: $phone
      email: $email
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export default function Signup() {
  const router = useRouter();
  const toast = useToast();
  const [firstName, setFirstName] = useState("");
  const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameIsInvalid, setLastNameIsInvalid] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailAddressIsInvalid, setEmailAddressIsInvalid] = useState(false);
  const [phone, setPhone] = useState({
    userMobile: "",
    countryCode: "",
    completePhone: "",
  });
  const client = useApolloClient();

  async function handleSubmit() {
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

    try {
      const response = await client.mutate<
        TestDriveSignUpMutation,
        TestDriveSignUpMutationVariables
      >({
        mutation: SIGN_UP,
        variables: {
          countryCode: phone.countryCode,
          phone: phone.completePhone,
          email: emailAddress,
          firstName,
          lastName,
        },
      });

      if (response.data?.testDriveSignUp) {
        router.push("/test-drive");
      } else if (response.errors) {
        console.log(response.errors);
      }
    } catch (e) {
      toast({
        title: `Error to create virtual App`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  return (
    <>
      <SeoHead pageName="Start Test Drive" />
      <Container>
        <img
          className="image-logo"
          src="/login/learnistic-text-logo.svg"
          alt="Logo"
        />
        <LoginWrapper>
          <Content>
            <h1 className="title">Start Your Test Drive</h1>
            <FormContainer>
              <p className="text">
                Enter your details below to start your FREE test drive.
              </p>

              <span className="form-elements-wrapper">
                <FormWrapper>
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
                </FormWrapper>

                <FormWrapper>
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
                </FormWrapper>
              </span>

              <FormWrapper>
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
              </FormWrapper>

              <FormWrapper>
                <label>Phone</label>
                <PhoneInput
                  country={"us"}
                  value={phone.completePhone}
                  onChange={(
                    userMobile,
                    country: {
                      countryCode: string;
                      dialCode: string;
                      format: string;
                      name: string;
                    }
                  ) => {
                    setPhone({
                      userMobile: userMobile.slice(country.dialCode.length),
                      countryCode: `+${country.dialCode}`,
                      completePhone: userMobile,
                    });
                  }}
                  placeholder={"(917) 555-5555"}
                />
              </FormWrapper>

              <span className="form-elements-wrapper">
                <StyledButton
                  onClick={() => router.push("/")}
                  variant="outlined"
                >
                  Back
                </StyledButton>
                <StyledButton onClick={handleSubmit} variant="filled">
                  Next
                </StyledButton>
              </span>
            </FormContainer>
          </Content>
          <StyledFooter />
        </LoginWrapper>

        <PhoneWrapper>
          <img className="image-mobile" src="/login/mobile.svg" alt="Mobile" />
          <img
            className="image-background"
            src="/login/faded-logo-background.svg"
            alt="Learnistic"
          />
        </PhoneWrapper>
      </Container>
    </>
  );
}
