import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { MenuBreadcrumbAtom, MenuImageAtom } from "../../../../atoms/MenuAtom";
import {
  ArticleIconAtom,
  ArticleImageAtom,
} from "../../../../atoms/NewArticleAtom";
import {
  CourseIconAtom,
  CourseImageAtom,
} from "../../../../atoms/NewCourseAtom";
import { PageIconAtom } from "../../../../atoms/PageAtom";
import { UserAtom } from "../../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../../atoms/VirtualAppAtom";
import {
  ImageFileType,
  UpdateMenuItemMutation,
  UpdateMenuItemMutationVariables,
  UploadImageFileToFirestoreMutation,
  UploadImageFileToFirestoreMutationVariables,
} from "../../../../generated/graphql";
import StyledDropImage from "../../../global/StyledDropImage";
import { UPLOAD_IMAGE_FILE_FIRESTORE } from "../../../screens/MediaManager/MediaManagerFilterBar/MediaManagerFilterBar";
import { UPDATE_MENU_ITEM } from "../../CreateComponentModal/Tabs/Form/FormContainerModal";

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  grid-gap: 16px;

  > .title {
    font-size: 20px;
    font-weight: 600;
    color: var(--gray-700);
  }

  > .description {
    font-size: 16px;
    font-weight: 400;
    color: var(--gray-400);
  }
`;

interface ContentUploadFileProps {
  type: "menu" | "page" | "article" | "course";
  widthLimit: number;
  heightLimit: number;
  isImage?: boolean;
}

export default function ContentUploadFile({
  type,
  widthLimit,
  heightLimit,
  isImage,
}: ContentUploadFileProps) {
  const [courseIcon, setCourseIcon] = useRecoilState(CourseIconAtom);
  const [courseImage, setCourseImage] = useRecoilState(CourseImageAtom);

  const [articleIcon, setArticleIcon] = useRecoilState(ArticleIconAtom);
  const [articleImage, setArticleImage] = useRecoilState(ArticleImageAtom);

  const [menuImage, setMenuImage] = useRecoilState(MenuImageAtom);

  const user = useRecoilValue(UserAtom);
  const vApp = useRecoilValue(VirtualAppAtom);
  const client = useApolloClient();
  const menuBreadcrumbs = useRecoilValue(MenuBreadcrumbAtom);

  const [loadingImage, setLoadingImage] = useState(false);

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
    }
  }

  const [pageIcon, setPageIcon] = useRecoilState(PageIconAtom);

  const inputRef = useRef<HTMLInputElement | null>(null);
  let media;
  const format = isImage ? "image" : "icon";

  switch (type) {
    case "course":
      media = isImage ? courseImage : courseIcon;
      break;
    case "article":
      media = isImage ? articleImage : articleIcon;
      break;
    case "menu":
      media = menuImage;
      break;
    case "page":
      media = pageIcon;
      break;
  }

  return (
    <Container>
      <h1 className="title">Upload File</h1>

      <StyledDropImage
        ref={inputRef}
        title={`Drop file to upload ${type} ${format}`}
        description={`${widthLimit} x ${heightLimit}px`}
        isLoading={loadingImage}
        alt={media.alt}
        src={media.src}
        setImage={async (vle) => {
          switch (type) {
            case "course":
              if (isImage) {
                setCourseImage(vle);
              } else setCourseIcon(vle);
              break;
            case "article":
              if (isImage) setArticleImage(vle);
              else setArticleIcon(vle);
              break;
            case "menu":
              {
                setLoadingImage(true);
                try {
                  if (vle.alt === "" || vle.src === "") {
                    await handleChangeMenuImage("", true);
                  } else await handleChangeMenuImage(vle.file, false);
                  setMenuImage(vle);
                } catch (err) {
                  console.log("error changing image", err);
                } finally {
                  setLoadingImage(false);
                }
              }
              break;
            case "page":
              setPageIcon(vle);
              break;
          }
        }}
        handleButtonClick={(e) => {
          inputRef.current?.click();
        }}
        widthLimit={widthLimit}
        heightLimit={heightLimit}
      />
    </Container>
  );
}
