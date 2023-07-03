import { useDisclosure } from "@chakra-ui/hooks";
import styled from "@emotion/styled";
import React from "react";
import { useRecoilState } from "recoil";
import { MenuImageAtom } from "../atoms/MenuAtom";
import SeoHead from "../components/global/SeoHead";
import StyledButton from "../components/global/StyledButton";
import { useDialog } from "../components/global/StyledDialog/StyledDialogHooks";
import ArrangeTopicsModal from "../components/modals/ArrangeTopicsModal/ArrangeTopicsModal";
import CreateCategoryModal from "../components/modals/CreateCategoryModal/CreateCategoryModal";
import CreateComponentModal from "../components/modals/CreateComponentModal/CreateComponentModal";
import CreateContactModal from "../components/modals/CreateContactModal/CreateContactModal";
import CreateTagModal from "../components/modals/CreateTagModal/CreateTagModal";
import FileUploadModal from "../components/modals/FileUploadModal/FileUploadModal";
import MenuManagerModal from "../components/modals/MenuManagerModal/MenuManagerModal";

const Container = styled.main`
  width: 100%;
  min-height: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 48px;
`;

const SubjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;

  > .title {
    font-size: 24px;
    font-weight: 700;
    color: var(--gray-700);
  }
`;

const ButtonsWrapper = styled.span`
  max-width: 800px;

  margin: 0 auto;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-gap: 32px;
`;

export default function Modals() {
  const [menuImage, setMenuImage] = useRecoilState(MenuImageAtom);

  const {
    isOpen: isOpenMenuManager,
    onClose: onCloseMenuManager,
    onOpen: onOpenMenuManager,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateComponent,
    onClose: onCloseCreateComponent,
    onOpen: onOpenCreateComponent,
  } = useDisclosure();

  const {
    isOpen: isOpenFileUploadModal,
    onClose: onCloseFileUploadModal,
    onOpen: onOpenFileUploadModal,
  } = useDisclosure();

  const {
    isOpen: isOpenIconModal,
    onClose: onCloseIconModal,
    onOpen: onOpenIconModal,
  } = useDisclosure();

  const {
    isOpen: isOpenArrangeTopicsModal,
    onClose: onCloseArrangeTopicsModal,
    onOpen: onOpenArrangeTopicsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenIconBuilderModal,
    onClose: onCloseIconBuilderModal,
    onOpen: onOpenIconBuilderModal,
  } = useDisclosure();

  const dialog = useDialog();

  const {
    isOpen: isOpenCreateContactModal,
    onClose: onCloseCreateContactModal,
    onOpen: onOpenCreateContactModal,
  } = useDisclosure();

  const {
    isOpen: isOpenImageCroperModal,
    onClose: onCloseImageCroperModal,
    onOpen: onOpenImageCroperModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateCategoryModal,
    onClose: onCloseCreateCategoryModal,
    onOpen: onOpenCreateCategoryModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCreateTagModal,
    onClose: onCloseCreateTagModal,
    onOpen: onOpenCreateTagModal,
  } = useDisclosure();

  return (
    <>
      <SeoHead pageName="Modals" />
      <Container>
        <SubjectWrapper>
          <h1 className="title">Modal</h1>
          <ButtonsWrapper>
            <StyledButton onClick={onOpenMenuManager}>
              Menu Manager
            </StyledButton>
            <StyledButton onClick={onOpenCreateComponent}>
              Component Item
            </StyledButton>
            <StyledButton onClick={onOpenFileUploadModal}>
              File Upload
            </StyledButton>
            <StyledButton onClick={onOpenIconModal}>Icon</StyledButton>
            <StyledButton onClick={onOpenArrangeTopicsModal}>
              Arrange Topics
            </StyledButton>
            <StyledButton onClick={onOpenCreateContactModal}>
              Create Contact
            </StyledButton>
            <StyledButton onClick={onOpenIconBuilderModal}>
              Icon Builder
            </StyledButton>
            <StyledButton onClick={onOpenImageCroperModal}>
              ImageCroper
            </StyledButton>
            <StyledButton onClick={onOpenCreateCategoryModal}>
              Create Category
            </StyledButton>
            <StyledButton onClick={onOpenCreateTagModal}>
              Create Tag
            </StyledButton>
          </ButtonsWrapper>
        </SubjectWrapper>

        <SubjectWrapper>
          <h1 className="title">Alert Dialog</h1>
          <ButtonsWrapper>
            <StyledButton
              onClick={() =>
                dialog.confirm({
                  title: `Remove Banner Image`,
                  hasImage: true,
                  img: (
                    <img src="/alert-dialog/delete-dialog.svg" alt="Delete" />
                  ),
                  description: `We strongly encourage you to add an image on your home screen and other screens in the app. This allows you to personalize and brand the app and make it your own. Remove anyway?`,
                  okButtonLabel: "Delete",
                  onOkPressed: () => {},
                  hasCheckbox: true,
                  okButtonColor: "#c41700",
                })
              }
            >
              Alert Dialog
            </StyledButton>
          </ButtonsWrapper>
        </SubjectWrapper>
      </Container>

      <CreateTagModal
        isOpen={isOpenCreateTagModal}
        onClose={onCloseCreateTagModal}
      />

      <CreateCategoryModal
        isOpen={isOpenCreateCategoryModal}
        onClose={onCloseCreateCategoryModal}
      />

      <FileUploadModal
        isOpen={isOpenFileUploadModal}
        onClose={onCloseFileUploadModal}
      />
      <CreateComponentModal
        isOpen={isOpenCreateComponent}
        onClose={onCloseCreateComponent}
      />
      <MenuManagerModal
        isOpen={isOpenMenuManager}
        onClose={onCloseMenuManager}
      />

      <ArrangeTopicsModal
        isOpen={isOpenArrangeTopicsModal}
        onClose={onCloseArrangeTopicsModal}
      />

      <CreateContactModal
        isOpen={isOpenCreateContactModal}
        onClose={onCloseCreateContactModal}
      />
    </>
  );
}
