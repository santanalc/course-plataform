import { atom } from "recoil";
import { VirtualAppType } from "../generated/graphql";

export const VirtualAppAtom = atom<VirtualAppType | null>({
  key: "VirtualAppAtom",
  default: null,
});
