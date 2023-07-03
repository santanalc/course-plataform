import { extendType, nonNull, objectType, stringArg } from "nexus";
import { enumType, inputObjectType, list } from "nexus/dist/core";

//When create article it can put article or video or image or without anything
const ArticleTypeEnum = enumType({
  name: "ArticleTypeEnum",
  members: {
    EMPTY: 0, //When there isn't image/audio/video on article
    IMAGE: 1,
    AUDIO: 2,
    VIDEO: 3,
  },
});

const ArticleType = objectType({
  name: "ArticleType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("userId");
    t.nonNull.string("virtualAppId");
    t.nonNull.string("name");
    t.nonNull.string("author");
    t.nonNull.string("text");
    t.nonNull.string("description");
    t.nonNull.boolean("active");
    t.nonNull.field("articleType", { type: "ArticleTypeEnum" });
    t.nonNull.list.int("tagIDs");

    t.nonNull.date("publishDate");

    t.nonNull.string("image"); //Url image
    t.nonNull.string("mediaUrl"); //Url video/audio
    t.nonNull.string("thumbnail"); //Article Icon
    t.nonNull.string("videoThumbnail"); //Thumb video/audio

    t.boolean("isHtml"); //Created by tiptap
    t.nonNull.float("articleMinutes");
    t.nonNull.boolean("protected");
    t.nonNull.int("restrictionType");

    t.int("createdAt");

    t.field("virtualApp", {
      type: "VirtualAppType",
      resolve: async (root, _args, ctx) => {
        const { userUid, dataLoaders } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { virtualAppId } = root;

        return await dataLoaders.virtualApp.load(virtualAppId);
      },
    });
  },
});

const ArticleQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getArticle", {
      type: "ArticleType",
      args: { articleId: nonNull("String") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { articleId } = args;
        return await controllers.article.findeOne(articleId);
      },
    });

    t.field("getArticlesByUserUid", {
      type: list("ArticleType"),
      resolve: async (_root, _args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        return await controllers.article.getByUserUid(userUid);
      },
    });

    t.field("getArticlesByVirtualAppId", {
      type: list("ArticleType"),
      args: {
        virtualAppId: nonNull("String"),
      },

      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { virtualAppId } = args;

        return await controllers.article.getByVirtualAppId(virtualAppId);
      },
    });
  },
});

export const CreateArticleInput = inputObjectType({
  name: "CreateArticleInput",
  definition(t) {
    t.nonNull.string("userId");
    t.nonNull.string("name");
    t.nonNull.string("author");
    t.nonNull.string("text");
    t.nonNull.string("description");
    t.nonNull.boolean("active");
    t.nonNull.list.int("tagIDs");
    t.nonNull.list.string("virtualAppIds");
    t.nonNull.date("publishDate");
    t.nonNull.string("thumbnail");
    t.nonNull.field("articleType", { type: "ArticleTypeEnum" });
    t.nonNull.date("publishDate");
    t.nonNull.string("image");
    t.nonNull.string("mediaUrl");
    t.nonNull.string("thumbnail");
    t.nonNull.string("videoThumbnail");
    t.nonNull.float("articleMinutes");
    t.nonNull.boolean("protected");
    t.nonNull.int("restrictionType");
    t.boolean("isHtml");
  },
});

export const UpdateArticleInput = inputObjectType({
  name: "UpdateArticleInput",
  definition(t) {
    t.nonNull.string("articleId");
    t.nonNull.field("article", { type: "CreateArticleInput" });
  },
});

const ArticleMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createArticle", {
      type: "ArticleType",
      args: { data: nonNull("CreateArticleInput") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data } = args;

        const newArticle = await controllers.article.create(data);

        return newArticle;
      },
    });

    t.field("updateArticle", {
      type: "Boolean",
      args: { data: nonNull("UpdateArticleInput") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data } = args;

        await controllers.article.update(data);

        return true;
      },
    });

    t.field("removeArticle", {
      type: "Boolean",
      args: { articleId: nonNull("String") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { articleId } = args;

        await controllers.article.remove(articleId);

        return true;
      },
    });
  },
});

export const ArticleGraphQL = {
  ArticleType,
  ArticleQuery,
  ArticleMutation,
  ArticleTypeEnum,
  CreateArticleInput,
  UpdateArticleInput,
};
