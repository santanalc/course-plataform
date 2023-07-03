import { atom } from "recoil";
import { UserType } from "../generated/graphql";

export const UserAtom = atom<UserType | null>({
    key: "UserAtom",
    default: null,
});