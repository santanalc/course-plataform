import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuItemsAtom,
} from "../../../../atoms/MenuAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import MenuManagementContent from "./MenuManagementContent/MenuManagementContent";
import * as SC from "./MenuManagementPhoneMockStyledComponents";
import { IoArrowBack } from "react-icons/io5";
import { useApolloClient } from "@apollo/client";
import {
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  MenuItemType,
  MenuType,
} from "../../../../generated/graphql";
import {
  GET_MENU_ITEMS_BY_PATH,
  GET_MENU_PAGE_BY_PATH,
} from "../FirstColumn/FirstColumn";
import MobileStatusBar from "../../../../../public/global/MobileStatusBar";

export default function MenuManagementPhoneMock() {
  const menuItems = useRecoilValue(MenuItemsAtom);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);
  const setMenu = useSetRecoilState(MenuAtom);
  const setMenuItems = useSetRecoilState(MenuItemsAtom);

  const client = useApolloClient();

  async function handleChangeBreadcrum(path: string, index: number) {
    let responseMenu = await client.mutate<
      GetMenuPageByPathQuery,
      GetMenuPageByPathQueryVariables
    >({
      mutation: GET_MENU_PAGE_BY_PATH,
      variables: { path },
    });

    if (responseMenu.data?.getMenuPageByPath) {
      setMenu(responseMenu.data?.getMenuPageByPath as MenuType);
    }

    let response = await client.mutate<
      GetMenuItemsByPathQuery,
      GetMenuItemsByPathQueryVariables
    >({
      mutation: GET_MENU_ITEMS_BY_PATH,
      variables: { path },
    });

    if (response.data?.getMenuItemsByPath) {
      setMenuItems(
        (response.data?.getMenuItemsByPath as MenuItemType[])
          .slice()
          .sort((a, b) => a.order - b.order)
      );
      setMenuBreadcrumbs(menuBreadcrumbs.filter((mb, idx) => idx < index));
    }
  }

  return (
    <SC.Container>
      <SC.MobileImageWrapper>
        <SC.MobileImage src="/global/mobile-mock.png" alt="Mobile" />
        <SC.ContentWrapper color={virtualApp?.titleBarColor!}>
          <MobileStatusBar color={virtualApp?.titleBarColor!} />

          <SC.StatusBar color={virtualApp?.titleBarColor!}>
            {menuBreadcrumbs.length > 1 && (
              <SC.BackButtonWrapper
                onClick={() =>
                  handleChangeBreadcrum(`/menu/${virtualApp?.id}`, 1)
                }
              >
                <IoArrowBack />
              </SC.BackButtonWrapper>
            )}

            <p className="breadcumb-text">
              {menuBreadcrumbs[menuBreadcrumbs.length - 1].name}
            </p>

            {menuBreadcrumbs.length > 1 && <div className="empty-div" />}
          </SC.StatusBar>

          <MenuManagementContent
            virtualApp={virtualApp}
            menuItems={menuItems}
          />
        </SC.ContentWrapper>
      </SC.MobileImageWrapper>
    </SC.Container>
  );
}
