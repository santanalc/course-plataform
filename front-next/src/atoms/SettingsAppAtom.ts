import { atom } from "recoil";

export const SettingsAppTitleBarColorAtom = atom<string>({
  key: "SettingsAppTitleBarColorAtom",
  default: "#000000",
});

export const SettingsAppButtonColorAtom = atom<string>({
  key: "SettingsAppButtonColorAtom",
  default: "#000000",
});

export const SettingsAppBackgroundColorAtom = atom<string>({
  key: "SettingsAppBackgroundColorAtom",
  default: "#000000",
});

export const SettingsAppHighlightColorAtom = atom<string>({
  key: "SettingsAppHighlightColorAtom",
  default: "#000000",
});

export const isLoadingOnSettingsAtom = atom<boolean>({
  key: "isLoadingOnSettingsAtom",
  default: true,
});
