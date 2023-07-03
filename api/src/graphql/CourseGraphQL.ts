import { extendType, objectType } from "nexus";
import { inputObjectType, list, nonNull } from "nexus/dist/core";

const CourseType = objectType({
  name: "CourseType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("userId");
    t.nonNull.string("tagId");
    t.nonNull.string("virtualAppId");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.int("commentType");
    t.nonNull.int("courseAlerts");
    t.nonNull.int("restrictionType");
    t.nonNull.boolean("protected");
    t.nonNull.boolean("active");
    t.nonNull.boolean("showOrderNumber");
    t.string("createdAt");
    t.string("defaultImage");
    t.string("courseImage");
    t.string("thumbnail");
    t.string("lessonCount");
    t.string("courseVideosCount");

    t.field("author", {
      type: "UserType",
      resolve: async (_root, _args, ctx) => {
        const { userUid, dataLoaders } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        return await dataLoaders.user.load(userUid);
      },
    });

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

const CourseQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getCourse", {
      type: "CourseType",
      args: { courseId: nonNull("String") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId } = args;
        return await controllers.course.findeOne(courseId);
      },
    });

    t.field("getCoursesByUserUid", {
      type: list("CourseType"),
      resolve: async (_root, _args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        return await controllers.course.getByUserId(userUid);
      },
    });

    t.field("getCoursesByVirtualAppId", {
      type: list("CourseType"),
      args: { virtualAppId: nonNull("String") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { virtualAppId } = args;

        return await controllers.course.getByVirtualAppId(virtualAppId);
      },
    });
  },
});

export const CreateCourseInput = inputObjectType({
  name: "CreateCourseInput",
  definition(t) {
    t.nonNull.string("userId");
    t.nonNull.boolean("active");
    t.nonNull.list.nonNull.string("virtualAppIds");
    t.nonNull.string("thumbnail");
    t.nonNull.string("courseImage");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.int("courseAlerts");
    t.nonNull.boolean("protected");
    t.nonNull.int("commentType");
    t.nonNull.int("restrictionType");
    t.nonNull.boolean("showOrderNumber");
  },
});

export const UpdateCourseInput = inputObjectType({
  name: "UpdateCourseInput",
  definition(t) {
    t.nonNull.string("courseId");
    t.nonNull.field("course", { type: "CreateCourseInput" });
  },
});

const CourseMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createCourse", {
      type: "CourseType",
      args: { data: nonNull("CreateCourseInput") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data } = args;

        const response = await controllers.course.create(data);

        return response;
      },
    });
    t.field("updateCourse", {
      type: "Boolean",
      args: { data: nonNull("UpdateCourseInput") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { data } = args;

        await controllers.course.update(data);

        return true;
      },
    });
    t.field("removeCourse", {
      type: "Boolean",
      args: { courseId: nonNull("String") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId } = args;

        await controllers.course.remove(courseId);

        return true;
      },
    });
  },
});

export const CourseGraphQL = {
  CourseType,
  CourseQuery,
  CourseMutation,
  CreateCourseInput,
  UpdateCourseInput,
};
