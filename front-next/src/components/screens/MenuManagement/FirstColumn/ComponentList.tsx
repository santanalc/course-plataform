import { gql, useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { Reorder } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuImageAtom,
  MenuImageLinkAtom,
  MenuItemsAtom,
} from "../../../../atoms/MenuAtom";
import { UserAtom } from "../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  ImageFileType,
  MenuItemType,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  UploadImageFileToFirestoreMutation,
  UploadImageFileToFirestoreMutationVariables,
} from "../../../../generated/graphql";
import StyledDropImage from "../../../global/StyledDropImage";
import { UPDATE_MENU_ITEM } from "../../../modals/CreateComponentModal/Tabs/Form/FormContainerModal";
import IconModal from "../../../modals/IconModal/IconModal";
import { UPLOAD_IMAGE_FILE_FIRESTORE } from "../../MediaManager/MediaManagerFilterBar/MediaManagerFilterBar";
import ComponentItem from "./ComponentItem";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 144px);

  overflow-y: auto;

  border-right: 1px solid var(--gray-200);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-gap: 24px;

  li {
    width: 100%;

    background: white;

    border-radius: 10px;
    margin-bottom: 10px;

    position: relative;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    cursor: default;

    box-shadow: unset !important;
  }

  ul {
    overflow-y: unset;

    > div > li:last-of-type {
      padding-bottom: 24px;
    }
  }

  .refresh {
    width: 20px;
    height: 20px;

    padding: 10px;

    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;

    position: absolute;
    top: 10px;
    right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  > #styled-drop-image {
    padding: 24px 24px 0;

    @media screen and (max-width: 600px) {
      padding: 16px 16px 0;
    }
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  grid-gap: 24px;
`;

const EmptyListWrapper = styled.div`
  width: calc(100% - 48px);
  height: 100%;

  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid #e2e2e2;
  border-radius: 16px;
`;

const EmptyTextWrapper = styled.div`
  max-width: 640px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  > img {
    width: 96px;

    margin-bottom: 24px;
  }

  > h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-700);
  }

  > p {
    margin: 16px 0 0;
    font-size: 18px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

export const ORDER_MENU_ITEMS = gql`
  mutation OrderMenuItems($path: String!, $menuItemsIds: [String!]!) {
    orderMenuItems(path: $path, menuItemsIds: $menuItemsIds)
  }
`;

export default function ComponentList() {
  const menu = useRecoilValue(MenuAtom);
  const [menuItems, setMenuItems] = useRecoilState(MenuItemsAtom);
  const client = useApolloClient();
  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useRecoilState(MenuImageAtom);
  const [imageLink, setImageLink] = useRecoilState(MenuImageLinkAtom);
  const user = useRecoilValue(UserAtom);
  const vApp = useRecoilValue(VirtualAppAtom);

  const [loadingImage, setLoadingImage] = useState(false);

  async function handleUpdateComponentListSort(menuArray: MenuItemType[]) {
    if (!menuArray.length || !virtualApp) return;

    setMenuItems(menuArray);

    const menuItemsIds = menuArray.map((menuItem) => menuItem.menuId);

    const menuBread = menuBreadcrumbs.slice(-1)[0];

    const path =
      (menuBread?.path === "menu"
        ? `menu/${virtualApp.id}`
        : menuBread?.path) || `menu/${virtualApp.id}`;

    const response = await client.mutate({
      mutation: ORDER_MENU_ITEMS,
      variables: { path, menuItemsIds },
    });
  }

  useEffect(() => {
    menu?.image ? setImageLink(menu?.image) : setImageLink("");
  }, [menu, menuBreadcrumbs]);

  async function handleChangeMenuImage(file: any, isDelete: boolean) {
    if (!user || !vApp) return;

    const menuBread = menuBreadcrumbs.slice(-1)[0];

    const path =
      (menuBread?.path === "menu" ? `menu/${vApp.id}` : menuBread?.path) ||
      `menu/${vApp.id}`;

    if (isDelete) {
      await client.mutate<
        UpdateMenuItemMutation,
        UpdateMenuItemMutationVariables
      >({
        mutation: UPDATE_MENU_ITEM,
        variables: { path, data: { image: "" } },
      });
      setImage({ src: "", alt: "", file: null });
      setImageLink("");
      return;
    }

    const uuid = uuidv4();

    const response = await client.mutate<
      UploadImageFileToFirestoreMutation,
      UploadImageFileToFirestoreMutationVariables
    >({
      mutation: UPLOAD_IMAGE_FILE_FIRESTORE,
      variables: {
        file,
        userId: user.id,
        folderId: uuid,
        folder: "menuImage",
        imageType: ImageFileType.Banner,
      },
    });

    const downloadLink =
      response.data?.uploadImageFileToFirestore?.downloadLink;

    if (downloadLink) {
      await client.mutate<
        UpdateMenuItemMutation,
        UpdateMenuItemMutationVariables
      >({
        mutation: UPDATE_MENU_ITEM,
        variables: { path, data: { image: downloadLink } },
      });

      setImage({ src: "", alt: "", file: null });
      setImageLink(downloadLink);
    }
  }

  return (
    <Container>
      <IconModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        type="menu"
        widthLimit={1280}
        heightLimit={720}
        isImage
      />
      <StyledDropImage
        title="Drop file to upload your branded banner"
        description="1280 x 720px"
        isLoading={loadingImage}
        alt={image.alt}
        src={image.src || imageLink}
        setImage={async (vle) => {
          setLoadingImage(true);
          try {
            if (vle.alt === "" || vle.src === "") {
              setImageLink("");
              await handleChangeMenuImage("", true);
            } else await handleChangeMenuImage(vle.file, false);
            setImage(vle);
          } catch (err) {
            console.log("error changing image", err);
          } finally {
            setLoadingImage(false);
          }
        }}
        handleButtonClick={(e) => {
          setIsModalOpen(true);
        }}
        widthLimit={1280}
        heightLimit={720}
      />

      {menuItems.length > 0 ? (
        <Reorder.Group
          className="reorder-group"
          axis="y"
          onReorder={handleUpdateComponentListSort}
          values={menuItems}
          style={{ width: "100%", overflowY: "auto", padding: "20px" }}
          layoutScroll
        >
          <ListWrapper>
            {menuItems.map((elem, index) => (
              <ComponentItem
                key={`course_item_${elem.name!}`}
                id={index.toString()}
                menuItem={elem}
              />
            ))}
          </ListWrapper>
        </Reorder.Group>
      ) : (
        <EmptyListWrapper>
          <EmptyTextWrapper>
            <img
              src="/global/empty-menu-management-list.svg"
              alt="Empty menu managements list"
            />
            <h1>Add components </h1>
            <p>
              Add the pages, courses, or articles that you want to appear on
              this screen by clicking the “Manage” button above.
            </p>
          </EmptyTextWrapper>
        </EmptyListWrapper>
      )}
    </Container>
  );
}
