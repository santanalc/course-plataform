import { extendType, objectType } from "nexus";
import { inputObjectType, list, nonNull } from "nexus/dist/core";

const LessonType = objectType({
  name: "LessonType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("topicId");
    t.nonNull.string("title");
    t.nonNull.string("contenttype");
    t.nonNull.string("description");
    t.nonNull.boolean("active");
    t.nonNull.int("order");
    t.nonNull.string("thumbnail");
    t.nonNull.string("mediaUrl");
    t.float("lessonMinutes");
    // Attributes when is encoding some video
    t.string("maxChunkProcess");
    t.string("currentChunkProcess");
    t.string("encodeFileId");
    t.string("fileMediaId");
    // When a video is .MOV .AVI .M4V, it needs convert to MP4
    t.boolean("videoNeedsTranscoder");
    t.string("transcodingStatus");
  },
});

const VideoLessonType = objectType({
  name: "VideoLessonType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("filePath");
    t.nonNull.string("fileName");
    t.nonNull.float("fileSize");
    t.nonNull.float("fileDuration");
    t.nonNull.string("virtualAppId");
    t.nonNull.string("courseId");
    t.nonNull.string("topicId");
    t.nonNull.string("lessonId");
    t.nonNull.string("courseName");
    t.nonNull.string("lessonName");
    t.nonNull.string("createdAt");
    t.nonNull.string("status");
  },
});

const LessonQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getLessonsByTopicId", {
      type: list("LessonType"),
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, topicId } = args;

        return await controllers.lesson.getByCourseTopic(courseId, topicId);
      },
    });

    t.field("getVideosLessonByVirtualAppId", {
      type: list("VideoLessonType"),
      args: {
        vAppId: nonNull("String"),
      },
      //@ts-ignore
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { vAppId } = args;

        return await controllers.lesson.getVideosLessonByVirtualAppId(vAppId);
      },
    });
  },
});

export const CreateLessonInput = inputObjectType({
  name: "CreateLessonInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("order");
    t.nonNull.list.string("virtualAppIds");
    t.string("contenttype");
    t.boolean("active");
    t.string("thumbnail");
    t.string("mediaUrl");
    t.float("lessonMinutes");
  },
});

export const UpdateLessonInput = inputObjectType({
  name: "UpdateLessonInput",
  definition(t) {
    t.string("title");
    t.string("contenttype");
    t.string("description");
    t.boolean("active");
    t.int("order");
    t.string("thumbnail");
    t.string("mediaUrl");
    t.float("lessonMinutes");
    t.string("maxChunkProcess");
    t.string("currentChunkProcess");
    t.string("encodeFileId");
    t.string("fileMediaId");
  },
});

const LessonMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createLesson", {
      type: "LessonType",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        data: nonNull("CreateLessonInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data, courseId, topicId } = args;

        return await controllers.lesson.create(courseId, topicId, data);
      },
    });

    t.field("createLessonByVideoUploading", {
      type: "LessonType",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        data: nonNull("CreateLessonInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data, courseId, topicId } = args;

        return await controllers.lesson.createByVideoUploading(
          courseId,
          topicId,
          data
        );
      },
    });

    t.field("updateLesson", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        lessonId: nonNull("String"),
        data: nonNull("UpdateLessonInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data, courseId, topicId, lessonId } = args;

        await controllers.lesson.update(courseId, topicId, lessonId, data);

        return true;
      },
    });

    t.field("updateByVideoUploading", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        lessonId: nonNull("String"),
        data: nonNull("UpdateLessonInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data, courseId, topicId, lessonId } = args;

        await controllers.lesson.updateByVideoUploading(
          courseId,
          topicId,
          lessonId,
          data
        );

        return true;
      },
    });

    t.field("removeLesson", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        lessonId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, topicId, lessonId } = args;

        await controllers.lesson.remove(courseId, topicId, lessonId);

        return true;
      },
    });

    t.field("orderLessons", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        lessonsIds: nonNull(list(nonNull("String"))),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, topicId, lessonsIds } = args;

        await controllers.lesson.order(courseId, topicId, lessonsIds);

        return true;
      },
    });

    t.field("initEncodeVideo", {
      type: "Boolean",
      args: {
        virtualAppId: nonNull("String"),
        filePath: nonNull("String"),
        fileName: nonNull("String"),
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        lessonId: nonNull("String"),
        fileId: nonNull("String"),
        createdAt: nonNull("String"),
        fileSize: nonNull("Float"),
        fileDuration: nonNull("Float"),
        status: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const {
          courseId,
          topicId,
          lessonId,
          fileId,
          virtualAppId,
          filePath,
          fileName,
          createdAt,
          fileSize,
          fileDuration,
          status,
        } = args;

        await controllers.lesson.initEncodeVideo({
          courseId,
          topicId,
          lessonId,
          fileId,
          virtualAppId,
          filePath,
          fileName,
          userUid,
          createdAt,
          fileSize,
          fileDuration,
          status,
        });

        return true;
      },
    });

    t.field("updateVideoStatus", {
      type: "Boolean",
      args: {
        fileId: nonNull("String"),
        status: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { fileId, status } = args;

        await controllers.lesson.uploadVideoLesson(fileId, status);

        return true;
      },
    });
  },
});

export const LessonGraphQL = {
  LessonType,
  LessonQuery,
  LessonMutation,
  CreateLessonInput,
  UpdateLessonInput,
  VideoLessonType,
};
