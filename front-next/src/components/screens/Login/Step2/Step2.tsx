import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../../../../atoms/UserAtom";
import {
  GetUserInfoQuery,
  GetUserInfoQueryVariables,
  UserType,
} from "../../../../generated/graphql";
import { LoginSteps } from "../../../../pages";
import { Firebase } from "../../../../service/FirebaseService";
import StyledButton from "../../../global/StyledButton";
import StyledPassCodeInputs from "../../../global/StyledPassCodeInputs/StyledPassCodeInputs";
import * as SC from "./Step2StyledComponents";

interface Props {
  phone: string;
  handleSelected: (vle: LoginSteps) => void;
}

const LOGIN_MUTATION = gql`
  mutation login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      userIdToken
    }
  }
`;

export const GET_USER = gql`
  query getUserInfo {
    getUser {
      id
      userName
      email
      phone
      type
      isFirstLogin
      virtualApps {
        id
        name
        highlightColor
        logo
        backgroundColor
        mediaHost
      }
    }
  }
`;

export default function Step2(props: Props) {
  const [passcode, setPasscode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const setUser = useSetRecoilState(UserAtom);
  const router = useRouter();
  const { phone, handleSelected } = props;

  async function handleSubmit() {
    if (loading) return;

    try {
      const userIdToken = (await Firebase.login(phone, passcode.join("")))
        .userIdToken;

      if (!userIdToken) {
        setError("User not found");
      } else {
        let getUserResponse = await client.query<
          GetUserInfoQueryVariables,
          GetUserInfoQuery
        >({
          query: GET_USER,
        });

        if (getUserResponse.errors || !getUserResponse.data.getUser) {
          setError("User not found");
        } else {
          setUser(getUserResponse.data.getUser);

          if ((getUserResponse.data.getUser as UserType).isFirstLogin)
            router.push("/test-drive");
          else router.push("/apps?mode=login");
        }
      }
    } catch (e) {
      console.error(e);
      setError("Error");
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
    <SC.FormWrapper>
      <StyledPassCodeInputs
        focusOnMount
        passcode={passcode}
        handleChangePasscode={(newPassCode) => {
          setPasscode(newPassCode);
        }}
        error={error !== ""}
        handleChangeError={(newError) => setError(newError)}
      />
      <StyledButton
        size="lg"
        onClick={() => {
          setLoading(true);
          handleSubmit();
        }}
        isLoading={loading}
        isDisabled={passcode.join("").length < 4}
      >
        Next
      </StyledButton>
      <button
        onClick={() => handleSelected(LoginSteps.STEP1)}
        className="link-button"
      >
        Back
      </button>
    </SC.FormWrapper>
  );
}
