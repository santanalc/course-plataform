import { gql, useApolloClient } from "@apollo/client";
import { useDisclosure, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import {
  motion,
  Reorder,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FaCog, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuItemsAtom,
} from "../../../../atoms/MenuAtom";
import { UserAtom } from "../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  MenuItemType,
  MenuItemTypeEnum,
  MenuType,
  RemoveMenuItemMutation,
  RemoveMenuItemMutationVariables,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
} from "../../../../generated/graphql";
import { useRaisedShadow } from "../../../../hooks/useRaisedShadow";
import StyledCheckbox from "../../../global/StyledCheckbox";
import { useDialog } from "../../../global/StyledDialog/StyledDialogHooks";
import StyledPopover from "../../../global/StyledPopover";
import CreateComponentModal from "../../../modals/CreateComponentModal/CreateComponentModal";
import { UPDATE_MENU_ITEM } from "../../../modals/CreateComponentModal/Tabs/Form/FormContainerModal";
import { GET_MENU_ITEMS_BY_PATH, GET_MENU_PAGE_BY_PATH } from "./FirstColumn";

const CoursesWrapper = styled(motion.div)`
  width: 100%;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff;
`;

const Container = styled.div`
  width: 100%;
  height: 80px;

  padding: 24px 32px 24px 24px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  position: relative;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .box {
    width: 48px;
    height: 48px;

    flex-shrink: 0;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    background: #05161e;
  }
`;

const DragIconContainer = styled.div`
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  cursor: grab;

  &:hover {
    svg {
      color: #bbbbbb;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    color: #cecece;

    transition: color 0.2s ease-in-out;
  }
`;

const Content = styled.span`
  max-width: 320px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .course-item-title {
    max-width: 288px;

    font-size: 18px;
    font-weight: 600;
    color: #222222;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .course-item-description {
    max-width: 288px;

    font-size: 16px;
    font-weight: 400;
    color: #555555;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ComponentItemButton = styled.button`
  width: 80px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &.COURSE {
    background: #dde8d0;
  }

  &.ARTICLE {
    background: #a3b8ff;
  }

  &.PAGE {
    background: #d6c1f6;
  }

  border-radius: 0 0 8px 8px;

  padding: 8px;

  position: absolute;
  right: -24px;

  transform: rotate(270deg);

  cursor: pointer;

  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.88);
  }

  .item-button-text {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 12px;
    font-weight: 600;
    color: #222222;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #222222;
  }
`;

export const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;

  cursor:pointer;

  flex-shrink: 0;

  position: relative;

  overflow: hidden;

  mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

  .inactive-wrapper {
    width: 100%;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #bbbbbb;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    font-size: 10px;
    font-weight: 600;
    color: #ffffff;
  }
`;

export const Image = styled(motion.img)`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  object-position: center;
  object-fit: cover;
`;

export const ImageFake = styled.div`
  width: 100%;
  height: 100%;

  flex-shrink: 0;

  background: #2f2f2f;
`;

interface Props {
  id: string;
  menuItem: MenuItemType;
}

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export const REMOVE_MENU_ITEM = gql`
  mutation RemoveMenuItem($path: String!) {
    removeMenuItem(path: $path)
  }
`;

const imgVariants = {
  hover: {
    scale: 1.16,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.01, -0.05, 0.95],
    },
  },
};

export default function ComponentItem(props: Props): JSX.Element | null {
  const { id, menuItem } = props;
  const dialog = useDialog();
  const toast = useToast();
  const setMenu = useSetRecoilState(MenuAtom);
  const setMenuItems = useSetRecoilState(MenuItemsAtom);
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);
  const client = useApolloClient();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  const router = useRouter();
  const {
    isOpen: isOpenCreateComponentModal,
    onOpen: onOpenCreateComponentModal,
    onClose: onCloseCreateComponentModal,
  } = useDisclosure();
  const user = useRecoilValue(UserAtom);

  function handleClick() {
    if (menuItem.type === MenuItemTypeEnum.Article) {
      router.push(`/content/article?id=${menuItem.id}`);
      return;
    }
    if (menuItem.type === MenuItemTypeEnum.Course) {
      router.push(`/content/course?id=${menuItem.id}`);
      return;
    }
    if (menuItem.type === MenuItemTypeEnum.Page) {
      handleSelectPage();
    }
  }

  function handleClickEdit() {
    if (menuItem.type === MenuItemTypeEnum.Article) {
      router.push(`/content/article?id=${menuItem.id}`);
      return;
    }
    if (menuItem.type === MenuItemTypeEnum.Course) {
      router.push(`/content/course?id=${menuItem.id}`);
      return;
    }
    if (menuItem.type === MenuItemTypeEnum.Page) {
      onOpenCreateComponentModal();
    }
  }

  const POPOVER_BUTTONS_ACTIONS = [
    {
      icon: <FaPencilAlt />,
      theme: "orange",
      popoverButtonLabel: "Edit",
      onClick: () => {
        handleClickEdit();
      },
    },
    {
      icon: <FaTrashAlt />,
      theme: "red",
      popoverButtonLabel: "Remove",
      onClick: () => {
        handleRemoveMenuItem();
      },
    },
  ];

  async function handleSelectPage() {
    if (!virtualApp?.id) return;

    let responseMenu = await client.mutate<
      GetMenuPageByPathQuery,
      GetMenuPageByPathQueryVariables
    >({
      mutation: GET_MENU_PAGE_BY_PATH,
      variables: { path: menuItem.path },
    });

    if (responseMenu.data?.getMenuPageByPath) {
      setMenu(responseMenu.data?.getMenuPageByPath as MenuType);
    }

    let response = await client.mutate<
      GetMenuItemsByPathQuery,
      GetMenuItemsByPathQueryVariables
    >({
      mutation: GET_MENU_ITEMS_BY_PATH,
      variables: { path: menuItem.path },
    });

    if (response.data?.getMenuItemsByPath) {
      setMenuItems(
        (response.data?.getMenuItemsByPath as MenuItemType[])
          .slice()
          .sort((a, b) => a.order - b.order)
      );

      setMenuBreadcrumbs([
        ...menuBreadcrumbs,
        { name: menuItem.name, path: menuItem.path },
      ]);
    }
  }

  async function handleRemoveMenuItem() {
    if (!virtualApp?.id) return;

    let response = await client.mutate<
      RemoveMenuItemMutation,
      RemoveMenuItemMutationVariables
    >({
      mutation: REMOVE_MENU_ITEM,
      variables: { path: menuItem.path },
    });

    dialog.confirm({
      title: `Delete ${capitalizeFirstLetter(menuItem.type)}`,
      hasImage: true,
      img: <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />,
      description: `Are you sure you want to delete the <b>"${
        menuItem.name
      }"</b> <b>${menuItem.type.toLocaleLowerCase()}</b>?`,
      okButtonLabel: "Delete",
      onOkPressed: () => {
        if (response.data?.removeMenuItem) {
          setMenuItems((prevMenuItems) => {
            return prevMenuItems.filter((pm) => pm.id !== menuItem.id);
          });
        }

        toast({
          title: `The "${
            menuItem.name
          }" ${menuItem.type.toLocaleLowerCase()} was successfully deleted`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      },
      hasCheckbox: false,
      okButtonColor: "#c41700",
    });
  }

  async function handleUpdateMenuBackground(isHighlight: boolean) {
    if (!user || !virtualApp) return;

    const response = await client.mutate<
      UpdateMenuItemMutation,
      UpdateMenuItemMutationVariables
    >({
      mutation: UPDATE_MENU_ITEM,
      variables: { path: menuItem.path, data: { background: isHighlight } },
    });

    if (response.data?.updateMenuItem) {
      setMenuItems((prevMenuItems) => {
        const newMenuItems = prevMenuItems.map((pm) => {
          if (pm.id === menuItem.id) return { ...pm, background: isHighlight };
          else return pm;
        });

        return newMenuItems;
      });
    }
  }

  return (
    <Reorder.Item
      value={menuItem}
      id={menuItem.id}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <CoursesWrapper className="noselect">
        <Container key={`course_item_${menuItem.id}`}>
          <DragIconContainer
            onPointerDown={(event) => dragControls.start(event)}
          >
            <HiMenu />
          </DragIconContainer>

          {menuItem.active ? (
            <ImageWrapper onClick={handleClick}>
              {menuItem.thumbnail ? (
                <Image variants={imgVariants} src={menuItem.thumbnail} />
              ) : (
                <ImageFake />
              )}
            </ImageWrapper>
          ) : (
            <ImageWrapper onClick={handleClick}>
              {menuItem.thumbnail ? (
                <Image variants={imgVariants} src={menuItem.thumbnail} />
              ) : (
                <ImageFake />
              )}
              <span className="inactive-wrapper">Inactive</span>
            </ImageWrapper>
          )}

          <Content>
            <h1 className="course-item-title">{menuItem.name}</h1>
            <p className="course-item-description">{menuItem.description}</p>
          </Content>

          <StyledPopover
            hasIcon
            popoverPlacement="end-start"
            popoverTrigger={
              <ComponentItemButton className={menuItem.type}>
                <p className="item-button-text">
                  {capitalizeFirstLetter(menuItem.type)}
                </p>
                <FaCog />
              </ComponentItemButton>
            }
            popoverButtons={POPOVER_BUTTONS_ACTIONS}
            popoverFooter={
              <StyledCheckbox
                value={menuItem.background || false}
                onClick={() => {
                  handleUpdateMenuBackground(!menuItem.background);
                }}
                label="Highlight"
              />
            }
          />
        </Container>
      </CoursesWrapper>

      <CreateComponentModal
        isOpen={isOpenCreateComponentModal}
        onClose={onCloseCreateComponentModal}
        isPageEdit
        menuItemEdit={menuItem}
      />
    </Reorder.Item>
  );
}
