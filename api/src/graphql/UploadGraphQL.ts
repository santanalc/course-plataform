import { GraphQLUpload } from "graphql-upload";
import { enumType, extendType, nonNull, objectType } from "nexus";

export const Upload = GraphQLUpload;

const FileType = objectType({
  name: "FileType",
  definition: (t) => {
    t.nonNull.string("filename");
    t.nonNull.string("mimetype");
    t.nonNull.string("encoding");
    t.string("downloadLink");
  },
});

const ImageFileType = enumType({
  name: "ImageFileType",
  members: {
    ICON: 0,
    BANNER: 1,
  },
});

const UploadMutations = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("uploadImageFileToFirestore", {
      type: "FileType",
      args: {
        userId: nonNull("String"),
        folderId: nonNull("String"),
        folder: nonNull("String"),
        file: nonNull(Upload),
        imageType: nonNull("ImageFileType"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { userId, folderId, folder, file, imageType } = args;

        return ctx.controllers.upload.uploadImage(
          userId,
          folderId,
          folder,
          file,
          imageType
        );
      },
    });
    t.field("uploadFileToFirestore", {
      type: "FileType",
      args: {
        userId: nonNull("String"),
        folderId: nonNull("String"),
        folder: nonNull("String"),
        file: nonNull(Upload),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { userId, folderId, file, folder } = args;

        return ctx.controllers.upload.uploadFile(
          userId,
          folderId,
          folder,
          file
        );
      },
    });
  },
});

export const UploadGraphQL = { UploadMutations, FileType, ImageFileType };
