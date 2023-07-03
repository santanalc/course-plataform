import styled from "@emotion/styled";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import SeoHead from "../components/global/SeoHead";
import StyledFooter from "../components/global/StyledFooter";
import Step1 from "../components/screens/Login/Step1/Step1";
import Step2 from "../components/screens/Login/Step2/Step2";
import { Firebase } from "../service/FirebaseService";

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
  grid-gap: 32px;

  @media (max-height: 790px) {
    grid-gap: 24px;
  }

  @media (max-height: 730px) {
    grid-gap: 16px;
  }

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

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > .text {
    font-size: 16px;
    font-weight: 400;
    color: #6b6b6b;
    text-align: center;
  }
`;

export enum LoginSteps {
  STEP1 = "STEP1",
  STEP2 = "STEP2",
}

export default function Login() {
  let [phone, setPhone] = useState("");
  let [country, setCountry] = useState("United States");
  const [thereIsToken, setThereIsToken] = useState(true);
  const [selected, setSelected] = useState(LoginSteps.STEP1);
  const auth = getAuth();

  function handleSelected(vle: LoginSteps) {
    setSelected(vle);
  }

  useEffect(() => {
    (async () => {
      const token = await Firebase.getIdToken();
      if (token) return;
      setThereIsToken(false);
    })();
  }, []);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken(true);
      return user.getIdToken(true);
    } else {
      return null;
    }
  });

  const returnText = useCallback(
    (currentSelected: LoginSteps) => {
      if (currentSelected === "STEP1")
        return "Please select your country code and enter your mobile phone number to continue.";
      else if (currentSelected === "STEP2")
        return "Please enter your 4-digit passcode to login.";
      else
        return "Please select your country code and enter your mobile phone number to continue.";
    },
    [selected]
  );

  const returnBody = useCallback(
    (currentSelected: LoginSteps) => {
      switch (currentSelected) {
        case LoginSteps.STEP1:
          return (
            <Step1
              handleSelected={handleSelected}
              phone={phone}
              handleChangePhone={(vle) => setPhone(vle)}
              country={country}
              handleChangeCountry={(vle) => setCountry(vle)}
            />
          );
        case LoginSteps.STEP2:
          return <Step2 handleSelected={handleSelected} phone={phone} />;
        default:
          return (
            <Step1
              handleSelected={handleSelected}
              phone={phone}
              handleChangePhone={(vle) => setPhone(vle)}
              country={country}
              handleChangeCountry={(vle) => setCountry(vle)}
            />
          );
      }
    },
    [selected, phone, country, setPhone, setCountry]
  );

  //! TODO: Paula - loading effect
  if (thereIsToken) {
    return null;
  }

  return (
    <>
      <SeoHead pageName="Login" />
      <Container>
        <img
          className="image-logo"
          src="/login/learnistic-text-logo.svg"
          alt="Logo"
        />
        <LoginWrapper>
          <Content>
            <h1 className="title">
              Run Your Entire Business <br /> From The Palm <br /> Of Your Hot
              Little Hand
            </h1>
            <FormWrapper>
              <p className="text">{returnText(selected)}</p>
              {returnBody(selected)}
            </FormWrapper>
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
