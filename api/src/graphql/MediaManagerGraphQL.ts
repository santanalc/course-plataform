import { enumType, extendType, nonNull, objectType } from "nexus";

const MediaManagerTypeEnum = enumType({
  name: "MediaManagerTypeEnum",
  members: {
    VIDEO: 0,
    AUDIO: 1,
    IMAGE: 2,
    PDF: 3,
    DOCUMENT: 4,
  },
});

const MediaManagerType = objectType({
  name: "MediaManagerType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("virtualAppId");
    t.nonNull.field("type", { type: "MediaManagerTypeEnum" });
    t.nonNull.string("filePath");
    t.nonNull.string("extension");
    t.nonNull.boolean("actived");
    t.nonNull.string("name");
    t.nonNull.string("fileUrl");
    //When is VIDEO, there is a thumbnail
    t.string("thumbVideoUrl");
  },
});

const MediaManagerMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createMedia", {
      type: "Boolean",
      args: {
        fileId: nonNull("String"),
        virtualAppId: nonNull("String"),
        filePath: nonNull("String"),
        fileUrl: nonNull("String"),
        type: nonNull("MediaManagerTypeEnum"),
        actived: nonNull("Boolean"),
        name: nonNull("String"),
        extension: nonNull("String"),
        thumbVideoUrl: "String",
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        try {
          await controllers.mediaManager.create({ ...args });

          return true;
        } catch (e) {
          return false;
        }
      },
    });

    t.field("updateMedia", {
      type: "Boolean",
      args: {
        fileId: nonNull("String"),
        virtualAppId: nonNull("String"),
        fileUrl: "String",
        filePath: "String",
        actived: "Boolean",
        name: "String",
        thumbVideoUrl: "String",
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        try {
          await controllers.mediaManager.update({ ...args });

          return true;
        } catch (e) {
          return false;
        }
      },
    });
  },
});

export const MediaManagerGraphQL = {
  MediaManagerTypeEnum,
  MediaManagerType,
  MediaManagerMutation,
};
