import { gql, useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import "react-phone-input-2/lib/bootstrap.css";
import {
  CheckPhoneMutation,
  CheckPhoneMutationVariables,
} from "../../../../generated/graphql";
import { LoginSteps } from "../../../../pages";
import StyledButton from "../../../global/StyledButton";
import StyledCountryInput from "../../../global/StyledCountryInput";
import StyledPhoneInput from "../../../global/StyledPhoneInput";
import * as SC from "./Step1StyledComponents";
import { useRouter } from "next/dist/client/router";

interface Props {
  phone: string;
  handleChangePhone: (vle: string) => void;
  country: string;
  handleChangeCountry: (vle: string) => void;
  handleSelected: (vle: LoginSteps) => void;
}

export const CHECK_PHONE = gql`
  mutation checkPhone($phone: String!) {
    checkPhone(phone: $phone)
  }
`;

export default function Step1(props: Props) {
  const {
    phone,
    handleChangePhone,
    country,
    handleChangeCountry,
    handleSelected,
  } = props;
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    let response = await client.mutate<
      CheckPhoneMutation,
      CheckPhoneMutationVariables
    >({
      mutation: CHECK_PHONE,
      variables: { phone },
    });

    if (response.errors || !response.data?.checkPhone) {
      setError(true);
    } else {
      handleSelected(LoginSteps.STEP2);
    }

    setLoading(false);
  }

  return (
    <SC.FormWrapper>
      <StyledCountryInput
        phone={phone}
        handleChangePhone={handleChangePhone}
        country={country}
        handleChangeCountry={handleChangeCountry}
      />
      <StyledPhoneInput
        phone={phone}
        country={country}
        error={error}
        handleChangePhone={handleChangePhone}
        handleChangeCountry={handleChangeCountry}
        handleChangeError={(vle) => setError(vle)}
        handleEnterPressed={() => {
          if (loading) return;
          setLoading(true);
          handleSubmit();
        }}
      />
      <StyledButton
        size="lg"
        onClick={() => {
          if (loading) return;
          setLoading(true);
          handleSubmit();
        }}
        isDisabled={phone.length < 9}
        isLoading={loading}
      >
        Next
      </StyledButton>
      <StyledButton
        size="lg"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </StyledButton>
    </SC.FormWrapper>
  );
}
