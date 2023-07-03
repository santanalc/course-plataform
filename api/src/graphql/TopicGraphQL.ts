import { extendType, inputObjectType, list, nonNull, objectType } from "nexus";
import { LessonGraphQL } from "./LessonGraphQL";

const TopicType = objectType({
  name: "TopicType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("courseId");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.boolean("active");
    t.nonNull.int("order");
    t.nonNull.string("thumbnail");
    t.int("lessonCount");

    t.list.nonNull.field("lessons", {
      type: "LessonType",
      resolve: async (root, _args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, id } = root;

        return await controllers.lesson.getByCourseTopic(courseId, id);
      },
    });
  },
});

const TopicQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getTopicsByCourseId", {
      type: list("TopicType"),
      args: {
        courseId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId } = args;

        return await controllers.topics.getByCourseId(courseId);
      },
    });
  },
});

export const CreateTopicInput = inputObjectType({
  name: "CreateTopicInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.int("order");
  },
});

export const UpdateTopicInput = inputObjectType({
  name: "UpdateTopicInput",
  definition(t) {
    t.string("title");
    t.string("description");
    t.boolean("active");
    t.int("order");
    t.int("lessonCount");
    t.string("thumbnail");
  },
});

const TopicMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createTopic", {
      type: "TopicType",
      args: {
        courseId: nonNull("String"),
        data: nonNull("CreateTopicInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, data } = args;
        return await controllers.topics.create(courseId, data);
      },
    });

    t.field("updateTopic", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
        data: nonNull("UpdateTopicInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, topicId, data } = args;

        return await controllers.topics.update(courseId, topicId, data);
      },
    });

    t.field("removeTopic", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, topicId } = args;

        await controllers.topics.remove(courseId, topicId);

        return true;
      },
    });

    t.field("orderTopics", {
      type: "Boolean",
      args: {
        courseId: nonNull("String"),
        topicsIds: nonNull(list(nonNull("String"))),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { courseId, topicsIds } = args;

        await controllers.topics.order(courseId, topicsIds);

        return true;
      },
    });
  },
});

export const TopicGraphQL = {
  TopicType,
  TopicQuery,
  TopicMutation,
  CreateTopicInput,
  UpdateTopicInput,
};
