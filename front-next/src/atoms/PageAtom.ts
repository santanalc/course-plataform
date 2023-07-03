import { atom } from "recoil";

export const PageIconAtom = atom<{ src: string; alt: string; file: any }>({
  key: "PageIconAtom",
  default: {
    src: "",
    alt: "",
    file: null,
  },
});
