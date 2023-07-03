import { atom, useResetRecoilState } from "recoil";
import {
  CurrentCourseUploaderAtom,
  CurrentTopicUploaderAtom
} from "../components/screens/Uploader/FormUploader/FormUploader";
import { ArticleType, ArticleTypeEnum } from "../generated/graphql";
import {
  HookFileKeysOrder,
  HookFileUploadAtom,
  HookUploadNext
} from "../hooks/useUploadFile";

export interface FileFromArticle {
  src: string;
  alt: string;
  file: File | null;
}

const DEFAULT_ARTICLE: Omit<ArticleType, "id"> = {
  name: "",
  active: false,
  author: "",
  description: "",
  text: "",
  userId: "",
  virtualAppId: "",
  articleType: ArticleTypeEnum.Empty,
  articleMinutes: 0,
  image: "",
  mediaUrl: "",
  protected: false,
  publishDate: "",
  restrictionType: 0,
  tagIDs: [],
  thumbnail: "",
  videoThumbnail: "",
};

export const CreateArticleAtom = atom<Omit<ArticleType, "id">>({
  key: "CreateArticleAtom",
  default: DEFAULT_ARTICLE,
});

export const ArticleIconAtom = atom<FileFromArticle>({
  key: "ArticleIconAtom",
  default: {
    src: "",
    alt: "",
    file: null,
  },
});

export const ArticleImageAtom = atom<FileFromArticle>({
  key: "ArticleImageAtom",
  default: {
    src: "",
    alt: "",
    file: null,
  },
});

export const ArticleContentAtom = atom<string>({
  key: "ArticleContentAtom",
  default: "",
});

export const ArticleLinkIconAtom = atom<string>({
  key: "ArticleLinkIconAtom",
  default: "",
});

export const ArticleLinkImageAtom = atom<string>({
  key: "ArticleLinkImageAtom",
  default: "",
});

export const ArticleIsEditAtom = atom<boolean>({
  key: "ArticleIsEditAtom",
  default: false,
});

export const ArticleIdAtom = atom<string>({
  key: "ArticleIdAtom",
  default: "",
});

export function resetCreateArticleAtoms() {
  const resetCreateArticleAtom = useResetRecoilState(CreateArticleAtom);
  const resetArticleIconAtom = useResetRecoilState(ArticleIconAtom);
  const resetArticleImageAtom = useResetRecoilState(ArticleImageAtom);
  const resetArticleContent = useResetRecoilState(ArticleContentAtom);
  const resetArticleLinkIcon = useResetRecoilState(ArticleLinkIconAtom);
  const resetArticleLinkImage = useResetRecoilState(ArticleLinkImageAtom);
  const resetArticleEdit = useResetRecoilState(ArticleIsEditAtom);
  const resetArticleId = useResetRecoilState(ArticleIdAtom);
  const resetTopicAtom = useResetRecoilState(CurrentTopicUploaderAtom);
  const resetCourseAtom = useResetRecoilState(CurrentCourseUploaderAtom);
  const resetCardsAtom = useResetRecoilState(HookFileUploadAtom);
  const resetFileKeysAtom = useResetRecoilState(HookFileKeysOrder);
  const resetUploadNextAtom = useResetRecoilState(HookUploadNext);

  function reset() {
    resetCreateArticleAtom();
    resetArticleIconAtom();
    resetArticleImageAtom();
    resetArticleContent();
    resetArticleLinkIcon();
    resetArticleLinkImage();
    resetArticleEdit();
    resetArticleId();
    resetTopicAtom();
    resetCourseAtom();
    resetCardsAtom();
    resetFileKeysAtom();
    resetUploadNextAtom();
  }

  return reset;
}
