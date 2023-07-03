import { IconType } from "react-icons";
import { FaCheck } from "react-icons/fa";
import { atom } from "recoil";

export const IconNameAtom = atom<string>({
  key: "IconNameAtom",
  default: "",
});

export const ZoomAtom = atom<number>({
  key: "ZoomAtom",
  default: 100,
});

export const IconColorAtom = atom<string>({
  key: "IconColorAtom",
  default: "#ffffff",
});

export const IconBuilderBackgroundColorAtom = atom<string>({
  key: "IconBuilderBackgroundColorAtom",
  default: "#000000",
});

export const BackgroundBottomColorAtom = atom<string>({
  key: "BackgroundBottomColorAtom",
  default: "#000000",
});

export const BackgroundTopColorAtom = atom<string>({
  key: "BackgroundTopColorAtom",
  default: "#000000",
});

export const IconBuilderImageAtom = atom<{ src: string; alt: string }>({
  key: "IconBuilderImageAtom",
  default: {
    src: "",
    alt: "",
  },
});

export type IconBuilderProps = {
  background_type: "GRADIENT" | "SOLID" | "IMAGE";
  icon_name: IconType;
};

export const IconBuilderAtom = atom<IconBuilderProps>({
  key: "IconBuilderAtom",
  default: {
    icon_name: FaCheck,
    background_type: "GRADIENT",
  },
});
