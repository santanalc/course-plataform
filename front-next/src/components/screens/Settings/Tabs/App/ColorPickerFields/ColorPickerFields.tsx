import React, { Dispatch, SetStateAction, useRef } from "react";
import { RecoilState, useRecoilState } from "recoil";
import {
  SettingsAppBackgroundColorAtom,
  SettingsAppButtonColorAtom,
  SettingsAppHighlightColorAtom,
  SettingsAppTitleBarColorAtom
} from "../../../../../../atoms/SettingsAppAtom";
import StyledColorPicker from "../../../../../global/StyledColorPicker";
import * as SC from "./ColorPickerFieldsStyledComponents";

enum ColorPickerType {
  TITLE = "TITLE",
  BUTTON = "BUTTON",
  BACKGROUND = "BACKGROUND",
  HIGHLIGHT = "HIGHLIGHT",
}

type ColorPickerStatefulComponentProps = {
  colorAtom: RecoilState<string>;
  type: ColorPickerType;
  isEditing: boolean;
  hasError: boolean;
  setHasError: (value: React.SetStateAction<boolean>) => void;
};

const COLOR_PICKER_LABEL_MAP: { [name in ColorPickerType]: string } = {
  TITLE: "Title bar",
  BUTTON: "Button",
  HIGHLIGHT: "Highlight",
  BACKGROUND: "Background",
};

function ColorPickerStatefulComponent(
  props: ColorPickerStatefulComponentProps
) {
  const { colorAtom, type, hasError, isEditing, setHasError } = props;

  const [color, setColor] = useRecoilState(colorAtom);

  const timeoutRef = useRef<number | null>(null);

  return (
    <SC.FormWrapperDisabledInput>
      <label>{COLOR_PICKER_LABEL_MAP[type]}</label>
      <StyledColorPicker
        readOnly={!isEditing}
        value={color}
        onChange={(e) => {
          if (timeoutRef.current) {
            window.cancelAnimationFrame(timeoutRef.current);
          }

          // Setup the new requestAnimationFrame()
          const color = e.target.value.toLowerCase();
          timeoutRef.current = window.requestAnimationFrame(() => {
            setColor(color);
            setHasError(false);
          });
        }}
        error={hasError}
      />
    </SC.FormWrapperDisabledInput>
  );
}

type ColorPickerFieldsProps = {
  isEditing: boolean;
  buttonColorError: boolean;
  setButtonColorError: Dispatch<SetStateAction<boolean>>;
  titleBarColorError: boolean;
  setTitleBarColorError: Dispatch<SetStateAction<boolean>>;
  backgroundColorError: boolean;
  setBackgroundColorError: Dispatch<SetStateAction<boolean>>;
  highlightColorError: boolean;
  setHighlightColorError: Dispatch<SetStateAction<boolean>>;
};

export default function ColorPickerFields({
  isEditing,
  buttonColorError,
  setButtonColorError,
  titleBarColorError,
  setTitleBarColorError,
  backgroundColorError,
  setBackgroundColorError,
  highlightColorError,
  setHighlightColorError,
}: ColorPickerFieldsProps) {
  return (
    <SC.FormContentColorTheme>
      <ColorPickerStatefulComponent
        isEditing={isEditing}
        colorAtom={SettingsAppTitleBarColorAtom}
        type={ColorPickerType.TITLE}
        hasError={titleBarColorError}
        setHasError={setTitleBarColorError}
      />

      <ColorPickerStatefulComponent
        isEditing={isEditing}
        colorAtom={SettingsAppButtonColorAtom}
        type={ColorPickerType.BUTTON}
        hasError={buttonColorError}
        setHasError={setButtonColorError}
      />

      <ColorPickerStatefulComponent
        isEditing={isEditing}
        colorAtom={SettingsAppBackgroundColorAtom}
        type={ColorPickerType.BACKGROUND}
        hasError={backgroundColorError}
        setHasError={setBackgroundColorError}
      />

      <ColorPickerStatefulComponent
        isEditing={isEditing}
        colorAtom={SettingsAppHighlightColorAtom}
        type={ColorPickerType.HIGHLIGHT}
        hasError={highlightColorError}
        setHasError={setHighlightColorError}
      />
    </SC.FormContentColorTheme>
  );
}
