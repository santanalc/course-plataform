import {
  enumType,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

const VirtualAppType = objectType({
  name: "VirtualAppType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("userId");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.string("activationLink");
    t.boolean("activationStatus");
    t.boolean("active");
    t.string("appKey");
    t.int("appStatus");
    t.string("appTimeZone");
    t.string("appOwnerName");
    t.int("articlesCount");
    t.boolean("automaticTimezone");
    t.string("backgroundColor");
    t.nonNull.field("bottomBarPref", { type: "BottomBarTypeEnum" });
    t.boolean("bottombarHidden");
    t.string("companyName");
    t.string("companyNiche");
    t.string("companyHelpEmail");
    t.string("companyHelpCenter");
    t.string("companyCountryCode");
    t.float("companyPhoneNumber");
    t.string("companyZipCode");
    t.string("companyCity");
    t.string("companyAddress");
    t.string("companyCountry");
    t.string("companyState");
    t.int("courseVideosCount");
    t.string("ctaColor");
    t.string("editProfileDeeplink");
    t.string("highlightColor");
    t.string("inviteUserLink");
    t.string("logo");
    t.int("notificationIntervalHour");
    t.string("titleBarColor");
    t.int("mediaHost");

    t.list.field("courses", {
      type: "CourseType",
      resolve: async (root, _args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        return await controllers.course.getByVirtualAppId(root.id);
      },
    });

    t.list.field("contacts", {
      type: "ContactType",
      args: {
        contactId: "String",
      },
      resolve: async (root, args, ctx) => {
        const { contactId } = args;
        const { userUid, controllers } = ctx;

        if (!userUid) throw new Error("Unauthorized");

        if (contactId)
          return [
            await controllers.contact.findOne({
              contactId,
              virtualAppId: root.id,
            }),
          ];

        return await controllers.contact.getByVirtualAppId(root.id);
      },
    });
  },
});

const BottomBarTypeEnum = enumType({
  name: "BottomBarTypeEnum",
  members: {
    LIGHT_THEME: 0,
    MEDIUM_THEME: 1,
    TITLE_COLOR: 2,
    DARK_THEME: 3,
  },
});

export const UpdateVirtualAppInput = inputObjectType({
  name: "UpdateVirtualAppInput",
  definition(t) {
    t.string("userId");
    t.string("name");
    t.string("description");
    t.string("activationLink");
    t.boolean("activationStatus");
    t.boolean("active");
    t.string("appKey");
    t.int("appStatus");
    t.string("appTimeZone");
    t.string("appOwnerName");
    t.int("articlesCount");
    t.boolean("automaticTimezone");
    t.string("backgroundColor");
    t.field("bottomBarPref", { type: "BottomBarTypeEnum" });
    t.boolean("bottombarHidden");
    t.string("companyName");
    t.string("companyNiche");
    t.string("companyHelpEmail");
    t.string("companyHelpCenter");
    t.string("companyCountryCode");
    t.float("companyPhoneNumber");
    t.string("companyZipCode");
    t.string("companyCity");
    t.string("companyAddress");
    t.string("companyCountry");
    t.string("companyState");
    t.int("courseVideosCount");
    t.string("ctaColor");
    t.string("editProfileDeeplink");
    t.string("highlightColor");
    t.string("inviteUserLink");
    t.string("logo");
    t.int("notificationIntervalHour");
    t.string("titleBarColor");
  },
});

export const CreateVirtualAppInput = inputObjectType({
  name: "CreateVirtualAppInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("activationLink");
    t.nonNull.string("appOwnerName");
    t.nonNull.string("backgroundColor");
    t.nonNull.string("ctaColor");
    t.nonNull.string("highlightColor");
    t.nonNull.string("logo");
    t.nonNull.string("titleBarColor");
  },
});

const VirtualAppQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getVirtualApp", {
      type: "VirtualAppType",
      args: { virtualAppId: nonNull("String") },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { virtualAppId } = args;

        return await controllers.virtualApp.findOne(virtualAppId);
      },
    });
  },
});

const VirtualAppMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("updateVirtualApp", {
      type: "Boolean",
      args: {
        virtualAppId: nonNull("String"),
        data: nonNull("UpdateVirtualAppInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { virtualAppId, data } = args;

        await ctx.controllers.virtualApp.update(virtualAppId, data);

        return true;
      },
    });
  },
});

export const VirtualAppGraphQL = {
  VirtualAppType,
  VirtualAppQuery,
  VirtualAppMutation,
  UpdateVirtualAppInput,
  CreateVirtualAppInput,
  BottomBarTypeEnum,
};
