import { enumType, extendType, nonNull, objectType, stringArg } from "nexus";

const UserTypeEnum = enumType({
  name: "UserTypeEnum",
  members: {
    SUPER_ADMIN: 0,
    OWNER: 1,
    ADMIN: 2,
    CONTACT: 3,
  },
});

const UserType = objectType({
  name: "UserType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("userName");
    t.nonNull.string("email");
    t.nonNull.string("phone");
    t.nonNull.field("type", { type: "UserTypeEnum" });
    t.boolean("isFirstLogin");

    //VirtualApps that user is owner or admin
    t.list.field("virtualApps", {
      type: "VirtualAppType",
      resolve: async (_root, _args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        return await controllers.virtualApp.getByUserId(userUid);
      },
    });
  },
});

const UserQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getUser", {
      type: "UserType",
      resolve: async (_root, _args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        return await controllers.user.findOne(userUid);
      },
    });
  },
});

const UserMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("sendNotificationToMyself", {
      type: "Boolean",
      args: {
        title: nonNull("String"),
        description: nonNull("String"),
        virtualAppId: nonNull("String"),
        lessonId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { title, description, virtualAppId, lessonId } = args;
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        try {
          await controllers.notification.sendNotificationToSingleUser({
            userUid,
            title,
            description,
            virtualAppId,
            lessonId,
          });
        } catch (err) {
          console.log(err);
          return false;
        }

        return true;
      },
    });
  },
});

export const UserGraphQL = { UserType, UserQuery, UserTypeEnum, UserMutation };
