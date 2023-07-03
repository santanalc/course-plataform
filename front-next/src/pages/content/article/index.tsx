/** @jsxImportSource @emotion/react */
import { gql, useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { useRouter } from "next/dist/client/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaPlay, FaTrashAlt } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  ArticleContentAtom,
  ArticleIconAtom,
  ArticleIdAtom,
  ArticleImageAtom,
  ArticleIsEditAtom,
  ArticleLinkIconAtom,
  ArticleLinkImageAtom,
  CreateArticleAtom,
  resetCreateArticleAtoms,
} from "../../../atoms/NewArticleAtom";
import { UserAtom } from "../../../atoms/UserAtom";
import { VirtualAppAtom } from "../../../atoms/VirtualAppAtom";
import SeoHead from "../../../components/global/SeoHead";
import StyledButton from "../../../components/global/StyledButton";
import { useDialog } from "../../../components/global/StyledDialog/StyledDialogHooks";
import StyledIconButton from "../../../components/global/StyledIconButton";
import TopBar from "../../../components/global/TopBar";
import AddContentArticle from "../../../components/screens/Content/Add&Edit/Article/AddContentArticle/AddContentArticle";
import ArticlePhoneMock from "../../../components/screens/Content/Add&Edit/Article/ArticlePhoneMock/ArticlePhoneMock";
import CreateArticle from "../../../components/screens/Content/Add&Edit/Article/CreateArticle/CreateArticle";
import {
  ArticleTypeEnum,
  CreateArticleInput,
  CreateArticleMutation,
  CreateArticleMutationVariables,
  GetArticleQuery,
  GetArticleQueryVariables,
  ImageFileType,
  UpdateArticleMutation,
  UpdateArticleMutationVariables,
} from "../../../generated/graphql";
import useFirebaseStorage from "../../../hooks/useFirebaseStorage";
import * as SC from "./styled";

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($data: CreateArticleInput!) {
    createArticle(data: $data) {
      id
      userId
      virtualAppId
      name
      author
      text
      description
      publishDate
      tagIDs
      image
      mediaUrl
      active
      thumbnail
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($data: UpdateArticleInput!) {
    updateArticle(data: $data)
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($articleId: String!) {
    getArticle(articleId: $articleId) {
      restrictionType
      protected
      userId
      articleMinutes
      isHtml
      id
      virtualAppId
      name
      author
      text
      description
      active
      articleType
      tagIDs
      publishDate
      createdAt
      image
      mediaUrl
      thumbnail
      videoThumbnail
    }
  }
`;

export const REMOVE_ARTICLE = gql`
  mutation RemoveArticle($articleId: String!) {
    removeArticle(articleId: $articleId)
  }
`;

export enum ArticleTabs {
  CREATE_ARTICLE = "CREATE_ARTICLE",
  ADD_CONTENT = "ADD_CONTENT",
}

export const MAX_LENGTH_DESCRIPTION = 150;

export default function AddArticle() {
  const router = useRouter();
  const dialog = useDialog();
  const [selected, setSelected] = useState<ArticleTabs>(
    ArticleTabs.CREATE_ARTICLE
  );
  const user = useRecoilValue(UserAtom);
  const vApp = useRecoilValue(VirtualAppAtom);
  const [article, setArticle] = useRecoilState(CreateArticleAtom);
  const articleIcon = useRecoilValue(ArticleIconAtom);
  const articleImage = useRecoilValue(ArticleImageAtom);
  const [articleContent, setArticleContent] =
    useRecoilState(ArticleContentAtom);

  const [articleLinkIcon, setArticleLinkIcon] =
    useRecoilState(ArticleLinkIconAtom);
  const [articleLinkImage, setArticleLinkImage] =
    useRecoilState(ArticleLinkImageAtom);

  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { uploadFileToFirestorage, uploadImageToFirestorage } =
    useFirebaseStorage();
  const client = useApolloClient();
  const resetAtom = resetCreateArticleAtoms();
  const { id } = router.query;
  const toast = useToast();

  const [isArticleEdit, setIsArticleEdit] = useRecoilState(ArticleIsEditAtom);
  const [articleId, setArticleId] = useRecoilState(ArticleIdAtom);

  const [nameError, setNameError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [publishDateError, setPublishDateError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    return () => resetAtom();
  }, []);

  useEffect(() => {
    if (!id) return;

    setIsArticleEdit(true);
    setArticleId(id as string);

    (async () => {
      const response = await client.query<
        GetArticleQuery,
        GetArticleQueryVariables
      >({
        query: GET_ARTICLE,
        variables: {
          articleId: id as string,
        },
      });

      const article = response.data.getArticle;

      if (article) {
        setArticle({
          name: article.name,
          active: article.active,
          author: article.author,
          description: article.description,
          text: article.text,
          userId: article.userId,
          virtualAppId: article.virtualAppId,
          publishDate: dayjs(article.publishDate).toDate(),
          articleType: article.articleType,
          articleMinutes: article.articleMinutes,
          image: article.image,
          mediaUrl: article.mediaUrl,
          protected: article.protected,
          restrictionType: article.restrictionType,
          tagIDs: article.tagIDs as any,
          thumbnail: article.thumbnail,
          videoThumbnail: article.videoThumbnail,
        });

        if (article.text) {
          const response = await fetch(article.text);
          const content = await response.text();
          setArticleContent(content);
        }

        setArticleLinkIcon(article.thumbnail || "");
        setArticleLinkImage(article.image || "");
        setArticleId(article.id);
      }
    })();
  }, [id]);

  function returnBody(currentSelected: ArticleTabs) {
    switch (currentSelected) {
      case ArticleTabs.CREATE_ARTICLE:
        return (
          <CreateArticle
            nameError={nameError}
            handleChangeNameError={() => setNameError(false)}
            authorError={authorError}
            handleChangeAuthorError={() => setAuthorError(false)}
            publishDateError={publishDateError}
            handleChangePublishDateError={() => setPublishDateError(false)}
            descriptionError={descriptionError}
            handleChangeDescriptionError={() => setDescriptionError(false)}
          />
        );
      case ArticleTabs.ADD_CONTENT:
        return <AddContentArticle />;
      default:
        return <AddContentArticle />;
    }
  }

  async function validationArticle() {
    if (!user || !vApp) return false;
    setIsLoadingSave(true);

    let hasError = false;

    if (!article.name) {
      setNameError(true);

      hasError = true;
    }

    if (!article.description) {
      setDescriptionError(true);

      hasError = true;
    }

    if (!article.publishDate) {
      setPublishDateError(true);

      hasError = true;
    }

    if (!article.author) {
      setAuthorError(true);

      hasError = true;
    }

    if (hasError) {
      toast({
        title: "Form error",
        description: "Fields invalids",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setIsLoadingSave(false);

      return false;
    }

    let iconLink;
    let imageLink;
    let contentLink;

    if (articleIcon.file) {
      iconLink = await uploadImageToFirestorage({
        file: articleIcon.file,
        folder: "Article",
        type: ImageFileType.Icon,
        folderId: uuidv4(),
      });
    }

    if (articleImage.file) {
      imageLink = await uploadImageToFirestorage({
        file: articleImage.file,
        folder: "ArticleImage",
        type: ImageFileType.Banner,
        folderId: uuidv4(),
      });
    }

    if (articleContent) {
      contentLink = await uploadFileToFirestorage({
        file: new File([new Blob([articleContent])], "content", {
          type: "text/html",
        }),
        folder: "ArticleHtml",
        folderId: uuidv4(),
      });
    }

    let newArticle: any = {
      ...article,
      thumbnail: iconLink || articleLinkIcon || "",
      image: imageLink || articleLinkImage || "",
      text: contentLink || article.text || "",
      userId: user.id,
      virtualAppIds: [vApp.id],
      mediaUrl: "",
      videoThumbnail: "",
      articleMinutes: 0,
      protected: false,
      restrictionType: 0,
      articleType: ArticleTypeEnum.Empty,
      tagIDs: [],
    };

    delete newArticle.virtualAppId;

    return newArticle as CreateArticleInput;
  }

  async function handleCreateArticle() {
    const data = await validationArticle();

    if (!data || !vApp) {
      return;
    }

    const response = await client.mutate<
      CreateArticleMutation,
      CreateArticleMutationVariables
    >({
      mutation: CREATE_ARTICLE,
      variables: {
        data: { ...data },
      },
    });

    if (response.data?.createArticle) {
      setArticleId((response.data?.createArticle as any).id);
      setIsArticleEdit(true);
      toast({
        title: `The "${article.name}" article was successfully created`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }

    setIsLoadingSave(false);
  }

  async function handleEditArticle() {
    const data = await validationArticle();

    if (!data || !vApp) {
      return;
    }

    const response = await client.mutate<
      UpdateArticleMutation,
      UpdateArticleMutationVariables
    >({
      mutation: UPDATE_ARTICLE,
      variables: {
        data: {
          articleId: articleId,
          article: {
            ...data,
            virtualAppIds: [vApp.id],
            articleMinutes: 0,
            mediaUrl: "",
            protected: false,
          },
        },
      },
    });

    toast({
      title: `The "${article.name}" article was successfully edited`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setIsLoadingSave(false);
  }

  async function handleRemoveArticle() {
    if (!articleId) return;

    const response = await client.mutate({
      mutation: REMOVE_ARTICLE,
      variables: {
        articleId,
      },
    });

    toast({
      title: `The "${article.name}" article was successfully deleted`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });

    setIsLoadingDelete(false);
    router.push("/content");
  }

  return (
    <Fragment>
      <SeoHead pageName="New Article" />
      <SC.Container>
        <TopBar
          title={isArticleEdit ? "Edit Article" : "New Article"}
          onClickButtonBack={() => router.push("/content")}
          buttons={
            <SC.HeaderButtons>
              {isArticleEdit && (
                <StyledButton
                  css={css`
                    svg {
                      margin-right: 5px;
                      margin-bottom: 1px;
                    }
                  `}
                  onClick={() =>
                    dialog.confirm({
                      title: `Delete Article`,
                      hasImage: true,
                      img: (
                        <img
                          src="/alert-dialog/delete-dialog.svg"
                          alt="Delete"
                        />
                      ),
                      description: `Are you sure you want to delete the article <b>"${article.name}"</b>?`,
                      okButtonLabel: "Delete",
                      onOkPressed: () => {
                        if (isLoadingDelete) return;
                        setIsLoadingDelete(true);
                        handleRemoveArticle();
                      },
                      hasCheckbox: false,
                      okButtonColor: "#c41700",
                    })
                  }
                  variant={"outlined"}
                  isLoading={isLoadingDelete}
                >
                  <FaTrashAlt />
                  Delete
                </StyledButton>
              )}

              <StyledButton
                onClick={() => {
                  isArticleEdit ? handleEditArticle() : handleCreateArticle();
                }}
                isLoading={isLoadingSave}
              >
                Save
              </StyledButton>

              <StyledIconButton
                icon={<FaPlay />}
                onClick={() => {}}
                tooltipLabel="New article video"
              />
            </SC.HeaderButtons>
          }
        />

        <SC.Wrapper>
          {returnBody(selected)}
          <ArticlePhoneMock selected={selected} />
        </SC.Wrapper>

        <SC.BottomBar>
          <SC.ButtonBottomBar
            css={css`
              background: #6b6b6b;
            `}
            onClick={() => setSelected(ArticleTabs.CREATE_ARTICLE)}
          >
            <SC.ButtonLabelWrapper>
              <div className="circle-label">1</div>
              <p className="button-label">Create Article</p>
            </SC.ButtonLabelWrapper>
          </SC.ButtonBottomBar>
          <SC.ButtonBottomBar
            css={css`
              background: #a8a8a8;
            `}
            disabled={!isArticleEdit}
            onClick={() => setSelected(ArticleTabs.ADD_CONTENT)}
          >
            <SC.ButtonLabelWrapper>
              <div className="circle-label">2</div>
              <p className="button-label">Add Content</p>
            </SC.ButtonLabelWrapper>
          </SC.ButtonBottomBar>
        </SC.BottomBar>
      </SC.Container>
    </Fragment>
  );
}
