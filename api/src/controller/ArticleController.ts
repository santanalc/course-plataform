import dayjs from "dayjs";
import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";

export function initArticleController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  function createArticleObject(
    article: FirebaseFirestore.DocumentData,
    id: string
  ): NexusGenRootTypes["ArticleType"] {
    return {
      id: id,
      userId: article?.userId,
      virtualAppId: article?.virtualAppIds[0],
      name: article?.name,
      description: article?.description,
      active: article?.active,
      createdAt: article?.createdAt,
      articleType: article?.articleType,
      author: article?.author,
      tagIDs: article?.tagIDs,
      image: article?.image || "",
      text: article?.text || "",
      isHtml: article?.isHtml || false,
      thumbnail: article?.thumbnail || "",
      publishDate: dayjs(article?.publishDate.toDate()).toDate(),
      mediaUrl: article?.mediaUrl || "",
      videoThumbnail: article?.videoThumbnail || "",
      articleMinutes: article?.articleMinutes || 0,
      protected: article?.protected,
      restrictionType: article?.restrictionType,
    };
  }

  async function create(
    data: NexusGenInputs["CreateArticleInput"]
  ): Promise<NexusGenRootTypes["ArticleType"]> {
    try {
      const objectToInsert = {
        ...data,
        isHtml: true,
        createdAt: dayjs().unix(),
        articleMinutes: 0,
        protected: false,
        restrictionType: 0,
      };

      const snap = await firestore.collection("Articles").add(objectToInsert);

      await snap.update({
        articleId: snap.id,
      });

      return {
        ...objectToInsert,
        id: snap.id,
        createdAt: objectToInsert.createdAt,
        virtualAppId: data?.virtualAppIds[0] || "",
        articleType: 0,
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function findeOne(
    articleId: string
  ): Promise<NexusGenRootTypes["ArticleType"]> {
    try {
      let queryArticle = await firestore
        .collection("Articles")
        .doc(articleId)
        .get();

      let article = queryArticle.data();

      if (!queryArticle.exists || !article)
        throw new Error(`There's no article with id ${articleId}`);

      return createArticleObject(article, queryArticle.id);
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getByUserUid(
    userId: string
  ): Promise<Array<NexusGenRootTypes["ArticleType"]>> {
    try {
      const articlesRef = firestore.collection("Articles");

      const firebaseArticles = articlesRef.where("userId", "==", userId);

      const querySnapshot = await firebaseArticles.get();

      if (querySnapshot.docs.length === 0) return [];

      let articles = [] as NexusGenRootTypes["ArticleType"][];

      querySnapshot.forEach((doc) => {
        const article = doc.data();

        articles.push(createArticleObject(article, doc.id));
      });

      return articles;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getByVirtualAppId(
    virtualAppId: string
  ): Promise<Array<NexusGenRootTypes["ArticleType"]>> {
    try {
      const articlesRef = firestore.collection("Articles");

      const firebaseArticles = articlesRef.where(
        "virtualAppIds",
        "array-contains",
        virtualAppId
      );

      const querySnapshot = await firebaseArticles.get();

      if (querySnapshot.docs.length === 0) return [];

      let articles = [] as NexusGenRootTypes["ArticleType"][];

      querySnapshot.forEach((doc) => {
        const article = doc.data();

        articles.push(createArticleObject(article, doc.id));
      });

      return articles;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function update(
    data: NexusGenInputs["UpdateArticleInput"]
  ): Promise<Boolean> {
    try {
      const articleRef = firestore.collection("Articles").doc(data.articleId);

      const queryArticle = await articleRef.get();

      const article = queryArticle.data();

      if (!queryArticle.exists || !article) {
        throw new Error(`There's no article with id ${data.articleId}`);
      }

      articleRef.update({
        ...data.article,
      });

      if (article.linkedMenu) {
        (article.linkedMenu as string[])?.forEach(async (lm) => {
          if (!(await firestore.doc(lm).get()).exists) return;

          if (article.active === true) {
            firestore.doc(lm).update({
              thumbnail: data.article.thumbnail,
              name: data.article.name,
              active: data.article.active,
              description: data.article.description,
              protected: data.article.active,
              restrictionType: data.article.active === true ? 1 : 0,
            });
          } else {
            firestore.doc(lm).delete();
          }
        });
      }
      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function remove(articleId: string): Promise<Boolean> {
    try {
      const articleRef = firestore.collection("Articles").doc(articleId);

      const queryArticle = await articleRef.get();

      const article = queryArticle.data();

      if (!queryArticle.exists || !article) {
        throw new Error(`There's no article with id ${articleId}`);
      }

      if (article.linkedMenu) {
        (article.linkedMenu as string[])?.forEach(async (lm) => {
          firestore.doc(lm).delete();
        });
      }

      await articleRef.delete();

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return { findeOne, getByUserUid, getByVirtualAppId, create, remove, update };
}
