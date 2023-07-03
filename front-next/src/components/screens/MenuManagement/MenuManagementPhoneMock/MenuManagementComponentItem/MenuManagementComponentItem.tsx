import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuItemsAtom,
} from "../../../../../atoms/MenuAtom";
import { VirtualAppAtom } from "../../../../../atoms/VirtualAppAtom";
import {
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  MenuItemType,
  MenuItemTypeEnum,
  MenuType,
} from "../../../../../generated/graphql";
import StyledShimmer from "../../../../global/StyledShimmer";
import {
  GET_MENU_ITEMS_BY_PATH,
  GET_MENU_PAGE_BY_PATH,
} from "../../FirstColumn/FirstColumn";
import * as SC from "./MenuManagementComponentItemStyledComponents";

type MenuManagementComponentItemProps = {
  menu?: MenuItemType;
  isShimmer?: boolean;
};

export default function MenuManagementComponentItem({
  menu,
  isShimmer = false,
}: MenuManagementComponentItemProps) {
  const router = useRouter();
  const client = useApolloClient();
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const setMenuItems = useSetRecoilState(MenuItemsAtom);
  const setMenu = useSetRecoilState(MenuAtom);
  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);

  function handleClick() {
    if (menu?.type === MenuItemTypeEnum.Article) {
      router.push(`/content/article?id=${menu?.id}`);
      return;
    }
    if (menu?.type === MenuItemTypeEnum.Course) {
      router.push(`/content/course?id=${menu?.id}`);
      return;
    }
    if (menu?.type === MenuItemTypeEnum.Page) {
      handleSelectPage();
    }
  }

  async function handleSelectPage() {
    if (!virtualApp?.id) return;

    let responseMenu = await client.mutate<
      GetMenuPageByPathQuery,
      GetMenuPageByPathQueryVariables
    >({
      mutation: GET_MENU_PAGE_BY_PATH,
      variables: { path: menu?.path! },
    });

    if (responseMenu.data?.getMenuPageByPath) {
      setMenu(responseMenu.data?.getMenuPageByPath as MenuType);
    }

    let response = await client.mutate<
      GetMenuItemsByPathQuery,
      GetMenuItemsByPathQueryVariables
    >({
      mutation: GET_MENU_ITEMS_BY_PATH,
      variables: { path: menu?.path! },
    });

    if (response.data?.getMenuItemsByPath) {
      setMenuItems(
        (response.data?.getMenuItemsByPath as MenuItemType[])
          .slice()
          .sort((a, b) => a.order - b.order)
      );

      setMenuBreadcrumbs([
        ...menuBreadcrumbs,
        { name: menu?.name!, path: menu?.path! },
      ]);
    }
  }

  if (isShimmer) {
    return (
      <SC.Card>
        <StyledShimmer className="shimmer-icon" />
        <span className="shimmer-text-wrapper">
          <StyledShimmer className="shimmer-title" />
          <StyledShimmer className="shimmer-description" />
        </span>
      </SC.Card>
    );
  }

  return (
    <SC.Card
      className={menu?.background ? "highlighted" : ""}
      key={menu?.id}
      onClick={handleClick}
      backgroundColor={virtualApp?.backgroundColor!}
      highlightColor={virtualApp?.highlightColor!}
    >
      {menu?.active ? (
        <SC.IconWrapper>
          {menu?.thumbnail ? (
            <SC.Icon src={menu?.thumbnail} />
          ) : (
            <SC.IconFake />
          )}
        </SC.IconWrapper>
      ) : (
        <SC.IconWrapper>
          {menu?.thumbnail ? (
            <SC.Icon src={menu?.thumbnail} />
          ) : (
            <SC.IconFake />
          )}
          <span className="inactive-wrapper">Inactive</span>
        </SC.IconWrapper>
      )}

      <span className="text-wrapper">
        <p className="card-title">{menu?.name}</p>
        <p className="card-description">{menu?.description}</p>
      </span>
    </SC.Card>
  );
}
