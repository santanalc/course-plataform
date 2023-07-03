import { useApolloClient } from "@apollo/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuItemsAtom,
} from "../../../../atoms/MenuAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  MenuItemType,
  MenuType,
} from "../../../../generated/graphql";
import StyledButton from "../../../global/StyledButton";
import MenuManagerModal from "../../../modals/MenuManagerModal/MenuManagerModal";
import { GET_MENU_ITEMS_BY_PATH, GET_MENU_PAGE_BY_PATH } from "./FirstColumn";

const Container = styled.div`
  width: 100%;
  min-height: 72px;
  max-height: 72px;

  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-200);
  border-right: 1px solid var(--gray-200);

  .breadcrumb-link {
    font-size: 16px;
    font-weight: 600;
    color: #3b3b3b;
  }
`;

export default function BreadcrumbTopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const setMenu = useSetRecoilState(MenuAtom);
  const setMenuItems = useSetRecoilState(MenuItemsAtom);
  const client = useApolloClient();

  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);

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
    <Container>
      <Breadcrumb spacing="8px" separator={<FaChevronRight color="#CBCBCB" />}>
        {menuBreadcrumbs.map((br, index) => {
          return (
            <BreadcrumbItem
              key={br.path}
              onClick={() => {
                if (index + 1 === menuBreadcrumbs.length) return;

                if (br.path === "menu") {
                  handleChangeBreadcrum(`/menu/${virtualApp?.id}`, 1);
                } else {
                  handleChangeBreadcrum(br.path, index);
                }
              }}
            >
              <BreadcrumbLink className="breadcrumb-link">
                {br.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <StyledButton onClick={onOpen} size="sm">
        Manage
      </StyledButton>
      <MenuManagerModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
