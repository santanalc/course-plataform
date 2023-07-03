import { atom } from "recoil";
import {
  ContactType
} from "../generated/graphql";

export const ContactsArrayAtom = atom<ContactType[] | null>({
  key: "ContactsArrayAtom",
  default: null,
});

export const SearchContactsAtom = atom<string>({
  key: "SearchContactsAtom",
  default: "",
});

export const IsLoadingContactsAtom = atom<boolean>({
  key: "IsLoadingContactsAtom",
  default: true,
});

export const SelectedContacts = atom<ContactType[]>({
  key: "SelectedContacts",
  default: [],
});
