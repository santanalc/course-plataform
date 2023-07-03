import { atom } from "recoil";
import { ArticleType, CourseType } from "../generated/graphql";

export const ArticlesArrayAtom = atom<ArticleType[] | null>({
  key: "ArticlesArrayAtom",
  default: [],
});

export const CoursesArrayAtom = atom<CourseType[] | null>({
  key: "CoursesArrayAtom",
  default: [],
});

export const SearchContentAtom = atom<string>({
  key: "SearchContentAtom",
  default: "",
});
