import { gql, useApolloClient } from "@apollo/client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuItemsAtom,
} from "../../../atoms/MenuAtom";
import { UserAtom } from "../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../atoms/VirtualAppAtom";
import {
  ArticleType,
  CourseType,
  CreateMenuItem,
  GetArticlesMenuManagerQuery,
  GetArticlesMenuManagerQueryVariables,
  GetCoursesMenuManagerQuery,
  GetCoursesMenuManagerQueryVariables,
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  Maybe,
  MenuItemType,
  MenuItemTypeEnum,
  MenuType,
} from "../../../generated/graphql";
import useMediaQuery from "../../../hooks/useMediaQuery";
import StyledButton from "../../global/StyledButton";
import StyledIconButton from "../../global/StyledIconButton";
import StyledInput from "../../global/StyledInput";
import StyledPopoverFilterDefault from "../../global/StyledPopoverFilter/StyledPopoverFilterDefault";
import {
  GET_MENU_ITEMS_BY_PATH,
  GET_MENU_PAGE_BY_PATH,
} from "../../screens/MenuManagement/FirstColumn/FirstColumn";
import CreateComponentModal from "../CreateComponentModal/CreateComponentModal";
import ComponentItemModal from "./ComponentItemModal";

const ModalHeaderCSS = css`
  width: 100%;

  padding: 24px;

  font-size: unset;
  font-weight: unset;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  grid-gap: 24px;

  border-bottom: 1px solid var(--gray-200);
`;

const ModalFooterCSS = css`
  padding: 24px;

  grid-gap: 16px;

  border-top: 1px solid var(--gray-200);
`;

const ModalBodyCSS = css`
  width: 100%;
  min-height: 400px;
  max-height: 400px;

  overflow-y: auto;

  padding-top: 24px;
  padding-bottom: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  &.empty {
    justify-content: center;
  }

  @media screen and (min-height: 900px) {
    min-height: 560px;
    max-height: 560px;
  }
`;

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  > img {
    width: 96px;
  }

  > .title {
    margin: 32px 0 8px;

    font-size: 18px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    margin-bottom: 24px;

    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

const ModalTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-700);
`;

const SpaceBetweenWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 16px;

  #styled-search-input {
    max-width: 240px;

    margin-right: auto;
  }
`;

type MenuManagementModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const GET_COURSERS_MENU_MANAGER = gql`
  query GetCoursesMenuManager($virtualAppId: String!) {
    getCoursesByVirtualAppId(virtualAppId: $virtualAppId) {
      id
      name
      description
      active
      thumbnail
      protected
      tagId
    }
  }
`;

export const GET_ARTICLES_MENU_MANAGER = gql`
  query GetArticlesMenuManager($virtualAppId: String!) {
    getArticlesByVirtualAppId(virtualAppId: $virtualAppId) {
      id
      name
      thumbnail
      description
      active
      protected
      tagIDs
    }
  }
`;

export const CREATE_MENU_ITEMS = gql`
  mutation CreateMenuItems($path: String!, $datas: [CreateMenuItem!]!) {
    createMenuItems(path: $path, datas: $datas)
  }
`;

export interface ItemSelectedType {
  id: string;
  type: string;
}
export default function MenuManagerModal({
  isOpen,
  onClose,
}: MenuManagementModalProps) {
  const toast = useToast();
  const [courseComponent, setCourseComponent] = useState(false);
  const [articleComponent, setArticleComponent] = useState(false);

  const isLargerThan1680 = useMediaQuery("(min-width: 1680px)");
  const [menuItems, setMenuItems] = useRecoilState(MenuItemsAtom);

  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState<CourseType[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const client = useApolloClient();
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const user = useRecoilValue(UserAtom);
  const [itemsSelected, setItemsSelected] = useState<ItemSelectedType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const setMenu = useSetRecoilState(MenuAtom);

  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);

  const {
    isOpen: isOpenCreateComponentModal,
    onOpen: onOpenCreateComponentModal,
    onClose: onCloseCreateComponentModal,
  } = useDisclosure();

  useEffect(() => {
    (async () => {
      if (!virtualApp) return;

      let response = await client.query<
        GetCoursesMenuManagerQuery,
        GetCoursesMenuManagerQueryVariables
      >({
        query: GET_COURSERS_MENU_MANAGER,
        variables: { virtualAppId: virtualApp?.id },
        fetchPolicy: "no-cache",
      });

      if (response.data.getCoursesByVirtualAppId) {
        setCourses(response.data.getCoursesByVirtualAppId as CourseType[]);
      }
    })();
  }, [virtualApp]);

  useEffect(() => {
    (async () => {
      if (!virtualApp) return;

      let response = await client.query<
        GetArticlesMenuManagerQuery,
        GetArticlesMenuManagerQueryVariables
      >({
        query: GET_ARTICLES_MENU_MANAGER,
        variables: { virtualAppId: virtualApp?.id },
        fetchPolicy: "no-cache",
      });

      if (response.data.getArticlesByVirtualAppId) {
        setArticles(response.data.getArticlesByVirtualAppId as ArticleType[]);
      }
    })();
  }, [virtualApp]);

  async function handleAddComponent() {
    if (!virtualApp || !user) return;

    let filterComponents = itemsSelected.filter((item) => {
      if (menuItems.find((elem) => elem.id === item.id)) {
        return false;
      }
      return true;
    });

    let componetsToAdd = filterComponents?.map((item) => {
      let articlesItems = [] as ArticleType[];
      let coursesItems = [] as CourseType[];

      if (item.type === "ArticleType") {
        articlesItems = articles?.filter((a) => a.id === item.id);
        return articlesItems[0];
      }
      if (item.type === "CourseType") {
        coursesItems = courses?.filter((c) => c.id === item.id);
        return coursesItems[0];
      } else {
        return courses[0];
      }
    });

    let newItems: CreateMenuItem[] = componetsToAdd?.map((it, ind) => {
      const type =
        it.__typename === "ArticleType"
          ? MenuItemTypeEnum.Article
          : MenuItemTypeEnum.Course;

      const order = menuItems.length + ind + 1;

      let tagIDs: Maybe<number>[] = [];

      if (it.__typename === "CourseType")
        tagIDs = it.tagId ? [parseInt(it.tagId)] : [];
      else if (it.__typename === "ArticleType")
        tagIDs = it.tagIDs ? it.tagIDs : [];

      return {
        virtualAppIds: [virtualApp.id],
        id: it.id,
        userId: user?.id,
        name: it.name,
        description: it.description || "",
        order,
        type,
        thumbnail: it.thumbnail || "",
        background: false,
        active: it.active || false,
        protected: it.protected || false,
        tagIDs,
        restrictionType: it.restrictionType,
      };
    });

    if (newItems.length) {
      const menuBread = menuBreadcrumbs.slice(-1)[0];

      const path =
        (menuBread?.path === "menu"
          ? `menu/${virtualApp.id}`
          : menuBread?.path) || `menu/${virtualApp.id}`;

      let response = await client.mutate({
        mutation: CREATE_MENU_ITEMS,
        variables: { path, datas: newItems },
      });

      await handleGetMenuItens(path);

      setIsLoading(false);
      onClose();
      toast({
        title:
          itemsSelected.length > 2
            ? "Contents added successfully"
            : "Content added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  const POPOVER_BUTTONS_VIEW = [
    {
      value: courseComponent,
      setValue: setCourseComponent,
      buttonLabel: "Courses",
    },
    {
      value: articleComponent,
      setValue: setArticleComponent,
      buttonLabel: "Articles",
    },
  ];

  async function handleGetMenuItens(path: string) {
    if (!virtualApp?.id) return;

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
      variables: { path: path },
    });

    if (response.data?.getMenuItemsByPath) {
      setMenuItems(
        (response.data?.getMenuItemsByPath as MenuItemType[])
          .slice()
          .sort((a, b) => a.order - b.order)
      );
    }
  }

  return (
    <>
      <Modal
        isCentered
        autoFocus={false}
        size={isLargerThan1680 ? "6xl" : "4xl"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {[...courses, ...articles].filter((cc) => cc.active).length > 0 ? (
            <>
              <ModalHeader css={ModalHeaderCSS}>
                <SpaceBetweenWrapper>
                  <ModalTitle>Menu Manager</ModalTitle>

                  <StyledIconButton
                    icon={<FaPlay />}
                    onClick={() => {}}
                    tooltipLabel="Menu Manager video"
                  />
                </SpaceBetweenWrapper>

                <SpaceBetweenWrapper>
                  <StyledPopoverFilterDefault
                    title="components"
                    buttons={POPOVER_BUTTONS_VIEW}
                    placeholder="All components"
                  />

                  <StyledInput
                    placeholder="Search"
                    hasIcon
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <StyledButton
                    onClick={() => {
                      onClose();
                      onOpenCreateComponentModal();
                    }}
                  >
                    Create Component
                  </StyledButton>
                </SpaceBetweenWrapper>
              </ModalHeader>

              <ModalBody css={ModalBodyCSS}>
                {[...courses, ...articles]
                  .filter((cc) => {
                    let flagToFilter = false;

                    if (courseComponent && cc.__typename === "CourseType") {
                      flagToFilter = !!(
                        cc.active && cc.__typename === "CourseType"
                      );
                      console.log("ArticleFIlter",flagToFilter)

                    }
                    if (articleComponent && cc.__typename === "ArticleType") {
                      flagToFilter = !!(
                        cc.active && cc.__typename === "ArticleType"
                      );
                      console.log("ArticleFIlter",flagToFilter)

                    }
                    if (!courseComponent && !articleComponent) {
                      flagToFilter = !!cc.active;
                    }

                    if (
                      cc.name
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase().trim())
                    ) {
                      return flagToFilter;
                    } else return false;
                  })
                  .map((c) => (
                    <ComponentItemModal
                      key={c.id}
                      id={c.id}
                      type={c.__typename || "ArticleType"}
                      title={c.name}
                      description={c.description || ""}
                      image={c.thumbnail || ""}
                      itemsSelected={itemsSelected}
                      setItemsSelected={setItemsSelected}
                      isActive={c.active}
                    />
                  ))}
              </ModalBody>

              <ModalFooter css={ModalFooterCSS}>
                <StyledButton
                  onClick={() => {
                    onClose();
                    setItemsSelected([]);
                  }}
                  variant="outlined"
                >
                  Cancel
                </StyledButton>
                <StyledButton
                  isLoading={isLoading}
                  onClick={() => {
                    if (isLoading) return;
                    setIsLoading(true);
                    handleAddComponent();
                  }}
                >
                  Add component
                </StyledButton>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader css={ModalHeaderCSS}>
                <SpaceBetweenWrapper>
                  <ModalTitle>Menu Manager</ModalTitle>

                  <StyledIconButton
                    icon={<FaPlay />}
                    onClick={() => {}}
                    tooltipLabel="Menu Manager video"
                  />
                </SpaceBetweenWrapper>
              </ModalHeader>

              <ModalBody className="empty" css={ModalBodyCSS}>
                <EmptyWrapper>
                  <img
                    src="/global/empty-menu-management-list.svg"
                    alt="Empty list"
                  />
                  <h1 className="title">Your menu manager is empty.</h1>
                  <p className="description">
                    Get started by creating a component.
                  </p>
                  <StyledButton
                    onClick={() => {
                      onClose();
                      onOpenCreateComponentModal();
                    }}
                  >
                    Create Component
                  </StyledButton>
                </EmptyWrapper>
              </ModalBody>

              <ModalFooter css={ModalFooterCSS}>
                <StyledButton
                  onClick={() => {
                    onClose();
                  }}
                  variant="outlined"
                >
                  Cancel
                </StyledButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CreateComponentModal
        isOpen={isOpenCreateComponentModal}
        onClose={onCloseCreateComponentModal}
      />
    </>
  );
}
