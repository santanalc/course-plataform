/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import * as SC from "./StyledPassCodeInputsStyledComponents";
import msk from "msk";

interface StyledPassCodeInputsProps {
  passcode: string[];
  error: boolean;
  focusOnMount?: boolean;
  handleChangePasscode: (passcode: string[]) => void;
  handleChangeError: (error: string) => void;
}

export default function StyledPassCodeInputs(props: StyledPassCodeInputsProps) {
  const { passcode, handleChangePasscode, error, handleChangeError } = props;

  const inputs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  function handlePasswordKeyPressed(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    const pass = [...passcode];
    if (index <= 3 && index >= -1) {
      switch (event.key) {
        case "Backspace":
          if (pass[index] === "") pass[index - 1] = "";
          else pass[index] = "";
          handleChangePasscode(pass);
          inputs[index - 1]?.current?.focus();
          return;
        case "ArrowLeft":
          inputs[index - 1]?.current?.focus();
          return;

        case "ArrowRight":
          inputs[index + 1]?.current?.focus();
          return;

        default:
          if (event.key.charCodeAt(0) >= 48 && event.key.charCodeAt(0) <= 57) {
            const maskedValue = msk.fit(event.key, "S");

            pass[index] = maskedValue;
            handleChangePasscode(pass);

            if (index < 3 && index >= -1) inputs[index + 1].current?.focus();
            handleChangeError("");
          }

          break;
      }
    }
  }

  useEffect(() => {
    if (props.focusOnMount) {
      inputs[0].current?.focus();
    }
  }, []);

  return (
    <SC.Container id="styled-passcode-inputs-wrapper">
      {inputs.map((_, index) => (
        <SC.SingleInput
          className="styled-passcode-input"
          onKeyDown={(evt) => handlePasswordKeyPressed(evt, index)}
          key={`input_${index}`}
          onChange={() => {}}
          error={error}
          ref={inputs[index]}
          type="password"
          value={passcode[index]}
          pattern="[0-9]*"
          inputMode="numeric"
          data-lpignore="true"
          autoComplete="off"
        />
      ))}
    </SC.Container>
  );
}
