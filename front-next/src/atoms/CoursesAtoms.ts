import { atom } from "recoil";
import { CourseType } from "../generated/graphql";

export const CoursesAtom = atom<CourseType[]>({
    key: "CoursesAtom",
    default: [],
});

export const CourseAtom = atom<CourseType | null>({
    key: "CourseAtom",
    default: null,
});