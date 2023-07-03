import { atom } from "recoil";
import { MenuItemType, MenuType } from "../generated/graphql";

export const MenuAtom = atom<MenuType | null>({
    key: "MenuAtom",
    default: null,
});

export const MenuItemsAtom = atom<MenuItemType[]>({
    key: "MenuItemsAtom",
    default: [],
});

export const MenuImageAtom = atom<{ src: string; alt: string; file: any }>({
    key: "MenuImageAtom",
    default: {
        src: "",
        alt: "",
        file: null
    },
});

export const MenuImageLinkAtom = atom<string>({
    key: "MenuImageLinkAtom",
    default: "",
});

interface MenuBreadcrumbType {
    name: string
    path: string
}

export const MenuBreadcrumbAtom = atom<MenuBreadcrumbType[]>({
    key: "MenuBreadcrumbAtom",
    default: [
        {
            name: "Home",
            path: "menu"
        }
    ],
});