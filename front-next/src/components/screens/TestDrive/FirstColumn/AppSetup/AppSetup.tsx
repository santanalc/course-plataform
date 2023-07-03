import { gql, useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  AppNameAtom,
  TestDriveBackgroundColorAtom,
  ButtonColorAtom,
  DefaultColorsAtom,
  DefaultColorsProps,
  HighlightColorAtom,
  NewPasscodeAtom,
  StepOptionsAtom,
  TitleBarColorAtom,
} from "../../../../../atoms/TestDriveAtom";
import { UserAtom } from "../../../../../atoms/UserAtom";
import {
  CompleteTestDriveSignUpMutation,
  CompleteTestDriveSignUpMutationVariables,
} from "../../../../../generated/graphql";
import StyledButton from "../../../../global/StyledButton";
import StyledColorPicker from "../../../../global/StyledColorPicker";
import StyledInput from "../../../../global/StyledInput";
import * as SC from "./AppSetupStyledComponents";

const COLORS = [
  {
    label: "REDS",
    hexadecimal: { first: "#E42C2C", second: "#E42C2C" },
  },
  {
    label: "GREENS",
    hexadecimal: { first: "#42C948", second: "#42C948" },
  },
  {
    label: "BLUES",
    hexadecimal: { first: "#2C97E5", second: "#2C97E5" },
  },
  {
    label: "NEUTRALS",
    hexadecimal: { first: "#333333", second: "#333333" },
  },
  {
    label: "PASTELS",
    hexadecimal: { first: "#F2DAAE", second: "#F8C5E1" },
  },
];

const COMPLETE_TEST_DRIVE_SIGNUP = gql`
  mutation CompleteTestDriveSignUp(
    $vApp: CreateVirtualAppInput!
    $newPassword: String!
  ) {
    completeTestDriveSignUp(vApp: $vApp, newPassword: $newPassword)
  }
`;

export default function AppSetup() {
  const [isShowingAdvancedOptions, setIsShowingAdvancedOptions] =
    useState(false);
  const setTestDriveStep = useSetRecoilState(StepOptionsAtom);

  const [titleBarColor, setTitleBarColor] = useRecoilState(TitleBarColorAtom);
  const [buttonColor, setButtonColor] = useRecoilState(ButtonColorAtom);
  const [backgroundColor, setBackgroundColor] =
    useRecoilState(TestDriveBackgroundColorAtom);
  const [highlightColor, setHighlightColor] =
    useRecoilState(HighlightColorAtom);
  const [currentColor, setCurrentColor] = useRecoilState(DefaultColorsAtom);
  const [appName, setAppName] = useRecoilState(AppNameAtom);
  const client = useApolloClient();
  const toast = useToast();
  const user = useRecoilValue(UserAtom);
  const [loading, setLoading] = useState(false);
  const passcode = useRecoilValue(NewPasscodeAtom);
  const router = useRouter();

  const returnColor = useCallback(
    (currentSelected: DefaultColorsProps) => {
      switch (currentSelected) {
        case "REDS":
          return {
            titleBar: "#800000",
            button: "#B22222",
            background: "#FFFFFF",
            highlight: "#FFCFC8",
          };
        case "GREENS":
          return {
            titleBar: "#052F05",
            button: "#5CB85C",
            background: "#FFFFFF",
            highlight: "#E5FFE5",
          };
        case "BLUES":
          return {
            titleBar: "#0075BB",
            button: "#009BD5",
            background: "#FFFFFF",
            highlight: "#E5F5FB",
          };
        case "NEUTRALS":
          return {
            titleBar: "#000000",
            button: "#363636",
            background: "#FFFFFF",
            highlight: "#C0C0C0",
          };
        case "PASTELS":
          return {
            titleBar: "#B0E0E6",
            button: "#E6E6FA",
            background: "#FFFFFF",
            highlight: "#F0FFFF",
          };
        default:
          return {
            titleBar: "#0075BB",
            button: "#009BD5",
            background: "#FFFFFF",
            highlight: "#E5F5FB",
          };
      }
    },
    [currentColor]
  );

  useEffect(() => {
    setTitleBarColor(returnColor(currentColor).titleBar);
    setButtonColor(returnColor(currentColor).button);
    setBackgroundColor(returnColor(currentColor).background);
    setHighlightColor(returnColor(currentColor).highlight);
  }, [currentColor]);

  async function handleSubmit() {
    if (!user) return;

    try {
      await client.mutate<
        CompleteTestDriveSignUpMutation,
        CompleteTestDriveSignUpMutationVariables
      >({
        mutation: COMPLETE_TEST_DRIVE_SIGNUP,
        variables: {
          vApp: {
            activationLink: "",
            appOwnerName: "",
            backgroundColor,
            ctaColor: buttonColor,
            highlightColor,
            logo: "",
            name: appName,
            titleBarColor,
          },
          newPassword: passcode.join(""),
        },
      });

      router.push("/apps");
    } catch (e) {
      toast({
        title: `Error to create virtual App`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SC.Container>
      <SC.FormWrapper>
        <span className="label-wrapper">
          <p className="label">App Name</p>
          <p className="label-length">0/30</p>
        </span>
        <StyledInput
          placeholder="Enter your app name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          error={appName.length > 30}
        />
      </SC.FormWrapper>

      <SC.FormColor>
        <span className="label-wrapper">
          <p className="label">Choose Your Colors</p>
          <p className="label-description">
            Choose your primary color and we’ll show you different color
            schemes!
          </p>
        </span>

        <SC.ColorButtonsWrapper>
          {COLORS.map((color) => (
            <SC.ColorButton
              key={color.label}
              firstColor={color.hexadecimal.first}
              secondColor={color.hexadecimal.second}
              className={currentColor === color.label ? "active" : ""}
              onClick={() => {
                setIsShowingAdvancedOptions(false);
                setCurrentColor(color.label as DefaultColorsProps);
              }}
            >
              <div className="color-wrapper">
                <div className="color" />
                <p className="color-name">{color.label.toLowerCase()}</p>
              </div>
            </SC.ColorButton>
          ))}
        </SC.ColorButtonsWrapper>

        <SC.PreviewWrapper>
          <p className="text">
            Press “Preview” to randomly choose a color scheme from the palette.
            You can keep pressing it to see more… have fun!
          </p>

          <StyledButton>Preview</StyledButton>
        </SC.PreviewWrapper>

        <SC.ColorPaletteWrapper>
          <SC.ColorPaletteComponent color={titleBarColor}>
            <div className="label">Title bar</div>
            <div className="box-color" />
          </SC.ColorPaletteComponent>
          <SC.ColorPaletteComponent color={buttonColor}>
            <div className="label">Button</div>
            <div className="box-color no-border-left" />
          </SC.ColorPaletteComponent>
          <SC.ColorPaletteComponent color={backgroundColor}>
            <div className="label">background</div>
            <div className="box-color no-border-left" />
          </SC.ColorPaletteComponent>
          <SC.ColorPaletteComponent color={highlightColor}>
            <div className="label">Highlight</div>
            <div className="box-color no-border-left" />
          </SC.ColorPaletteComponent>
        </SC.ColorPaletteWrapper>

        <span className="label-wrapper">
          <p className="label">Advanced Options</p>
          <p className="label-description">
            If you know the color codes you want, customize your color scheme
            below.
          </p>

          {isShowingAdvancedOptions ? (
            <span
              onClick={() => {
                setIsShowingAdvancedOptions(false);
                setCurrentColor("GREENS");
              }}
              className="button"
            >
              Back to default colors
            </span>
          ) : (
            <span
              onClick={() => {
                setIsShowingAdvancedOptions(true);
              }}
              className="button"
            >
              Customize your color scheme
            </span>
          )}
        </span>

        {isShowingAdvancedOptions && (
          <SC.ColorButtonsWrapper>
            <SC.ColorButton>
              <StyledColorPicker
                value={titleBarColor}
                onChange={(e) => setTitleBarColor(e.target.value)}
              />
            </SC.ColorButton>
            <SC.ColorButton>
              <StyledColorPicker
                value={buttonColor}
                onChange={(e) => setButtonColor(e.target.value)}
              />
            </SC.ColorButton>
            <SC.ColorButton>
              <StyledColorPicker
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </SC.ColorButton>
            <SC.ColorButton>
              <StyledColorPicker
                value={highlightColor}
                onChange={(e) => setHighlightColor(e.target.value)}
              />
            </SC.ColorButton>
          </SC.ColorButtonsWrapper>
        )}
      </SC.FormColor>

      <SC.ButtonsWrapper>
        <StyledButton
          onClick={() => setTestDriveStep("TERMS_OF_SERVICE")}
          variant="outlined"
        >
          Back
        </StyledButton>
        <StyledButton
          onClick={() => {
            if (loading) return;

            setLoading(true);

            handleSubmit();
          }}
        >
          Create Your App
        </StyledButton>
      </SC.ButtonsWrapper>
    </SC.Container>
  );
}
