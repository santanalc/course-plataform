import { atom } from "recoil";

export const FirstNameAtom = atom<string>({
  key: "FirstNameAtom",
  default: "",
});

export const LastNameAtom = atom<string>({
  key: "LastNameAtom",
  default: "",
});

export const EmailAddressAtom = atom<string>({
  key: "EmailAddressAtom",
  default: "",
});

export const MobileNumberAtom = atom<string>({
  key: "MobileNumberAtom",
  default: "",
});

export type StepOptionsProps =
  | "NEW_PASSCODE"
  | "TERMS_OF_SERVICE"
  | "APP_SETUP";

export const StepOptionsAtom = atom<StepOptionsProps>({
  key: "StepOptionsAtom",
  default: "NEW_PASSCODE",
});

export type DefaultColorsProps =
  | "REDS"
  | "GREENS"
  | "BLUES"
  | "NEUTRALS"
  | "PASTELS";

export const DefaultColorsAtom = atom<DefaultColorsProps>({
  key: "DefaultColorsAtom",
  default: "BLUES",
});

export const TitleBarColorAtom = atom<string>({
  key: "TitleBarColorAtom",
  default: "#0075BB",
});

export const ButtonColorAtom = atom<string>({
  key: "ButtonColorAtom",
  default: "#009BD5",
});

export const TestDriveBackgroundColorAtom = atom<string>({
  key: "TestDriveBackgroundColorAtom",
  default: "#FFFFFF",
});

export const HighlightColorAtom = atom<string>({
  key: "HighlightColorAtom",
  default: "#E5F5FB",
});

export const AppNameAtom = atom<string>({
  key: "AppNameAtom",
  default: "",
});

export const NewPasscodeAtom = atom<string[]>({
  key: "NewPasscodeAtom",
  default: ["", "", "", ""],
});
