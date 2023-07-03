import { atom } from "recoil";
import { TopicType } from "../generated/graphql";

//! Customize Course
export const CourseStatusAtom = atom<boolean>({
  key: "CourseStatusAtom",
  default: true,
});

export const CourseTitleAtom = atom<string>({
  key: "CourseTitleAtom",
  default: "",
});

export const CourseDescriptionAtom = atom<string>({
  key: "CourseDescriptionAtom",
  default: "",
});

export const CourseIconAtom = atom<{ src: string; alt: string; file: any }>({
  key: "CourseIconAtom",
  default: {
    src: "",
    alt: "",
    file: null
  },
});

export const CourseImageAtom = atom<{ src: string; alt: string; file: null }>({
  key: "CourseImageAtom",
  default: {
    src: "",
    alt: "",
    file: null
  },
});

export const CourseDonwloadLinkIconAtom = atom<string>({
  key: "CourseDonwloadLinkIconAtom",
  default: "",
});

export const CourseDonwloadLinkImageAtom = atom<string>({
  key: "CourseDonwloadLinkImageAtom",
  default: "",
});

export const CourseIdAtom = atom<string | null>({
  key: "CourseIdAtom",
  default: null,
});

export const CourseIsEditAtom = atom<boolean>({
  key: "CourseIsEditAtom",
  default: false,
});

export const CourseNumberedLessonsAtom = atom<boolean>({
  key: "CourseNumberedLessonsAtom",
  default: false,
});

export const ProtectCourseAtom = atom<boolean>({
  key: "ProtectCourseAtom",
  default: false,
});

export const CourseContentNotificationsAtom = atom<string>({
  key: "CourseContentNotificationsAtom",
  default: "1",
});

export const CourseCommentSettingsAtom = atom<string>({
  key: "CourseCommentSettingsAtom",
  default: "1",
});

//! Add Content
type CourseContentCurrentSelectedProps = {
  id?: string;
  topicId?: string;
  selected: "TOPIC" | "LESSON" | "NOTHING";
};

export const CourseContentCurrentSelected =
  atom<CourseContentCurrentSelectedProps>({
    key: "CourseContentCurrentSelected",
    default: { selected: "NOTHING" },
  });


export const TopicsAtom = atom<TopicType[]>({
  key: "TopicsAtom",
  default: [],
});

export const SortTopicsAtom = atom<string[]>({
  key: "SortTopicsAtom",
  default: [],
});

