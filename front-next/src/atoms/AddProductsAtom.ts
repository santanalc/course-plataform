import { atom } from "recoil";

export const ProductTitleAtom = atom<string>({
  key: "ProductTitleAtom",
  default: "",
});

export const ProductSelectedArticleAtom = atom<string>({
  key: "ProductSelectedArticleAtom",
  default: "",
});

export const ProductMediaAtom = atom<{ src: string, alt: string, file: any }>({
  key: "ProductMediaAtom",
  default: {
    src: "",
    alt: "",
    file: null
  },
});

export const ProductSelectedCourseAtom = atom<string>({
  key: "ProductSelectedCourseAtom",
  default: "",
});

export const ProductIAPPriceAtom = atom<string>({
  key: "ProductIAPPriceAtom",
  default: "",
});
