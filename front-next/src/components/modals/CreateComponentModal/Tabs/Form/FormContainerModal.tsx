import { gql, useApolloClient } from "@apollo/client";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  MenuAtom,
  MenuBreadcrumbAtom,
  MenuItemsAtom,
} from "../../../../../atoms/MenuAtom";
import { PageIconAtom } from "../../../../../atoms/PageAtom";
import { UserAtom } from "../../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../../atoms/VirtualAppAtom";
import {
  GetMenuItemsByPathQuery,
  GetMenuItemsByPathQueryVariables,
  GetMenuPageByPathQuery,
  GetMenuPageByPathQueryVariables,
  ImageFileType,
  MenuItemType,
  MenuItemTypeEnum,
  MenuType,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  UploadImageFileToFirestoreMutation,
  UploadImageFileToFirestoreMutationVariables,
} from "../../../../../generated/graphql";
import StyledButton from "../../../../global/StyledButton";
import StyledDropImage from "../../../../global/StyledDropImage";
import StyledIconButton from "../../../../global/StyledIconButton";
import StyledInput from "../../../../global/StyledInput";
import StyledShimmer from "../../../../global/StyledShimmer";
import StyledSwitch from "../../../../global/StyledSwitch";
import { UPLOAD_IMAGE_FILE_FIRESTORE } from "../../../../screens/MediaManager/MediaManagerFilterBar/MediaManagerFilterBar";
import {
  GET_MENU_ITEMS_BY_PATH,
  GET_MENU_PAGE_BY_PATH,
} from "../../../../screens/MenuManagement/FirstColumn/FirstColumn";
import IconModal from "../../../IconModal/IconModal";
import { CREATE_MENU_ITEMS } from "../../../MenuManagerModal/MenuManagerModal";
import { ComponentStepTabs } from "../../CreateComponentModal";

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

const ModalBodyCSS = css`
  width: 100%;

  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;

  display: grid;
  grid-template-columns: 1fr 400px;
  align-items: flex-end;
  justify-content: start;
  grid-gap: 32px;
`;

const ModalFooterCSS = css`
  padding: 24px;

  grid-gap: 16px;

  border-top: 1px solid var(--gray-200);
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

const FormContent = styled.div`
  width: 100%;
  height: fit-content;

  padding: 24px 0;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: 8px;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-700);
  }

  &.flex {
    justify-content: start;
    flex-direction: row;
    grid-gap: 16px;
  }
`;

export const MobileContainer = styled.div`
  width: 100%;

  padding: 0 24px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

export const MobileImageWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  position: relative;
`;

export const MobileImage = styled.img`
  width: 640px;
  height: 100%;

  z-index: 99;
`;

export const ContentWrapper = styled.div`
  max-width: 328px;
  width: 100%;
  height: 448.45px;

  background: #2f2f2f;

  overflow-y: hidden;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;

  position: absolute;
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 600;
  color: white;

  flex-shrink: 0;
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 176px;

  background: #404040;

  flex-shrink: 0;
`;

export const CourseCard = styled.div`
  width: 100%;
  height: 72px;

  padding: 12px;

  background: #ffffff;

  border-bottom: 1px solid var(--gray-300);

  display: flex;
  align-items: center;
  justify-content: start;
  grid-gap: 12px;

  &.non-brightness {
    filter: brightness(0.32);
  }

  .course-icon {
    width: 40px;
    height: 40px;

    object-fit: cover;
    object-position: center;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    flex-shrink: 0;
  }

  .course-title {
    font-size: 16px;
    font-weight: 600;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .course-description {
    font-size: 14px;
    font-weight: 400;
    color: #2f2f2f;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .icon {
    width: 40px;
    height: 40px;

    mask: url("/global/apple-app-mask.svg") center/100% 100% no-repeat;

    flex-shrink: 0;
  }

  .text-wrapper {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    grid-gap: 8px;

    > .title {
      width: 160px;
      height: 14px;

      border-radius: 32px;
    }

    > .description {
      width: 100%;
      height: 14px;

      border-radius: 32px;
    }
  }
`;

type FormContainerModalProps = {
  isPageEdit?: boolean;
  menuItemEdit?: MenuItemType;
  setCurrentStep: React.Dispatch<React.SetStateAction<ComponentStepTabs>>;
  onClose: () => void;
};

export const UPDATE_MENU_ITEM = gql`
  mutation UpdateMenuItem($path: String!, $data: UpdateMenuItem!) {
    updateMenuItem(path: $path, data: $data)
  }
`;

export default function FormContainerModal({
  setCurrentStep,
  isPageEdit,
  menuItemEdit,
  onClose,
}: FormContainerModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const [pageTitle, setPageTitle] = useState(
    menuItemEdit ? menuItemEdit.name : ""
  );
  const [pageSubtitle, setPageSubtitle] = useState(
    menuItemEdit ? menuItemEdit.description : ""
  );
  const [pageHighlighted, setPageHighlighted] = useState(
    menuItemEdit ? menuItemEdit?.background || false : false
  );
  const [icon, setIcon] = useRecoilState(PageIconAtom);
  const [iconLink, setIconLink] = useState(
    menuItemEdit ? menuItemEdit.thumbnail : ""
  );
  const user = useRecoilValue(UserAtom);
  const client = useApolloClient();
  const [menuItems, setMenuItems] = useRecoilState(MenuItemsAtom);

  const virtualApp = useRecoilValue(VirtualAppAtom);
  const [isLoading, setIsLoading] = useState(false);
  const setMenu = useSetRecoilState(MenuAtom);

  const [menuBreadcrumbs, setMenuBreadcrumbs] =
    useRecoilState(MenuBreadcrumbAtom);

  const handleFileChange = async (
    file: any,
    folder: string,
    type: ImageFileType
  ) => {
    if (!file) return;
    if (!user) return;

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
        folder: folder,
        imageType: type,
      },
    });

    const downloadLink =
      response.data?.uploadImageFileToFirestore?.downloadLink;

    return downloadLink;
  };

  async function handleEditComponent() {
    if (!virtualApp || !user || !menuItemEdit) return;

    let newLinkIcon;

    if (icon.file) {
      newLinkIcon =
        (await handleFileChange(icon.file, "menu", ImageFileType.Icon)) || "";

      setIconLink(newLinkIcon);
      setIcon({ ...icon, file: null });
    }

    let updateItem = {
      name: pageTitle,
      description: pageSubtitle,
      background: pageHighlighted,
      thumbnail: newLinkIcon || iconLink || "",
    };

    await client.mutate<
      UpdateMenuItemMutation,
      UpdateMenuItemMutationVariables
    >({
      mutation: UPDATE_MENU_ITEM,
      variables: { path: menuItemEdit.path, data: updateItem },
    });

    const menuBread = menuBreadcrumbs.slice(-1)[0];

    const path =
      (menuBread?.path === "menu"
        ? `menu/${virtualApp.id}`
        : menuBread?.path) || `menu/${virtualApp.id}`;

    await handleGetMenuItens(path);

    toast({
      title: `The "${pageTitle}" page was successfully edited`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
    setIsLoading(false);
    onClose();
  }

  async function handleAddComponent() {
    if (!virtualApp || !user) return;

    const order = menuItems.length + 1;

    let newLinkIcon;

    if (icon.file) {
      newLinkIcon =
        (await handleFileChange(icon.file, "menu", ImageFileType.Icon)) || "";

      setIconLink(newLinkIcon);
      setIcon({ ...icon, file: null });
    }

    let newItems = {
      virtualAppIds: [virtualApp.id],
      userId: user?.id,
      name: pageTitle,
      description: pageSubtitle,
      order,
      type: MenuItemTypeEnum.Page,
      thumbnail: newLinkIcon || iconLink || "",
      background: pageHighlighted,
      active: false,
    };

    const menuBread = menuBreadcrumbs.slice(-1)[0];

    const path =
      (menuBread?.path === "menu"
        ? `menu/${virtualApp.id}`
        : menuBread?.path) || `menu/${virtualApp.id}`;

    await client.mutate({
      mutation: CREATE_MENU_ITEMS,
      variables: { path, datas: [newItems] },
    });

    await handleGetMenuItens(path);

    toast({
      title: `The "${pageTitle}" page was successfully created`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
    setIsLoading(false);
    onClose();
  }

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
      <ModalHeader css={ModalHeaderCSS}>
        <SpaceBetweenWrapper>
          <ModalTitle>
            {isPageEdit ? "Edit Page Component" : "Create Page Component"}
          </ModalTitle>

          <StyledIconButton
            icon={<FaPlay />}
            onClick={() => {}}
            tooltipLabel="Create Page Component video"
          />
        </SpaceBetweenWrapper>
      </ModalHeader>

      <ModalBody css={ModalBodyCSS}>
        <FormContent>
          <FormWrapper>
            <label>Page Title</label>
            <StyledInput
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Enter page title"
            />
          </FormWrapper>

          <FormWrapper>
            <label>Page Subtitle</label>
            <StyledInput
              value={pageSubtitle}
              onChange={(e) => setPageSubtitle(e.target.value)}
              placeholder="Enter page subtitle"
            />
          </FormWrapper>

          <FormWrapper className="flex">
            <label>Apply Highlight?</label>
            <StyledSwitch
              value={pageHighlighted}
              setValue={setPageHighlighted}
              labelActive="Applied"
              labelInactive="Not applied"
            />
          </FormWrapper>

          <FormWrapper>
            <label>Icon</label>

            <StyledDropImage
              title="Drop file to upload your icon"
              description="500 x 500px"
              alt={icon.alt}
              src={icon.src || iconLink}
              setImage={(vle) => {
                setIcon(vle);
                if (vle.alt === "" || vle.src === "") setIconLink("");
              }}
              handleButtonClick={(e) => {
                setIsModalOpen(true);
              }}
              widthLimit={500}
              heightLimit={500}
            />
          </FormWrapper>
        </FormContent>

        <MobileContainer>
          <MobileImageWrapper>
            <MobileImage src="/global/mobile-mock.png" alt="Mobile" />
            <ContentWrapper>
              <img
                src="/global/mobile-status-bar.svg"
                alt="Mobile Status Bar"
              />
              <StatusBar>Preview</StatusBar>
              <BannerWrapper />
              <CourseCard>
                {icon.src || iconLink ? (
                  <img
                    src={icon.src || iconLink}
                    alt={icon.alt}
                    className="course-icon"
                  />
                ) : (
                  <StyledShimmer className="icon" />
                )}

                <span className="text-wrapper">
                  {pageTitle ? (
                    <p className="course-title">{pageTitle}</p>
                  ) : (
                    <StyledShimmer className="title" />
                  )}
                  {pageSubtitle ? (
                    <p className="course-description">{pageSubtitle}</p>
                  ) : (
                    <StyledShimmer className="description" />
                  )}
                </span>
              </CourseCard>
              <CourseCard className="non-brightness">
                <StyledShimmer className="icon" />
                <span className="text-wrapper">
                  <StyledShimmer className="title" />
                  <StyledShimmer className="description" />
                </span>
              </CourseCard>
              <CourseCard className="non-brightness">
                <StyledShimmer className="icon" />
                <span className="text-wrapper">
                  <StyledShimmer className="title" />
                  <StyledShimmer className="description" />
                </span>
              </CourseCard>
            </ContentWrapper>
          </MobileImageWrapper>
        </MobileContainer>
      </ModalBody>

      <ModalFooter css={ModalFooterCSS}>
        <StyledButton
          onClick={() => {
            if (!isPageEdit) setCurrentStep(ComponentStepTabs.PRESENTATION);
            else onClose();
          }}
          variant="outlined"
        >
          Back
        </StyledButton>
        <StyledButton
          isLoading={isLoading}
          onClick={() => {
            if (isLoading) return;
            setIsLoading(true);
            if (isPageEdit) handleEditComponent();
            else handleAddComponent();
          }}
        >
          {isPageEdit ? "Edit" : "Add"}
        </StyledButton>
      </ModalFooter>
      <IconModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        type="page"
        widthLimit={500}
        heightLimit={500}
      />
    </>
  );
}
