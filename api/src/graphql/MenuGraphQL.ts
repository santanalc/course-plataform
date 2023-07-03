import { extendType, nonNull, objectType, stringArg } from "nexus";
import { enumType, inputObjectType, list } from "nexus/dist/core";

const MenuItemTypeEnum = enumType({
  name: "MenuItemTypeEnum",
  members: {
    PAGE: 0,
    COURSE: 1,
    ARTICLE: 2,
  },
});

const MenuItemType = objectType({
  name: "MenuItemType",
  definition: (t) => {
    t.nonNull.string("id");
    t.nonNull.string("menuId");
    t.nonNull.string("virtualAppId");
    t.nonNull.string("userId");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.int("order");
    t.nonNull.field("type", { type: "MenuItemTypeEnum" });
    t.nonNull.string("path");
    t.nonNull.string("thumbnail");
    t.string("image"); // Page type, there is an image to app
    t.boolean("background");
    t.boolean("protected");
    t.boolean("active");
  },
});

const MenuType = objectType({
  name: "MenuType",
  definition: (t) => {
    t.nonNull.string("virtualAppId");
    t.nonNull.string("userId");
    t.string("image");
    t.string("imageTitle");
    t.boolean("active");
    t.string("link");
  },
});

export const CreateMenuItem = inputObjectType({
  name: "CreateMenuItem",
  definition(t) {
    t.string("id"); //When the item is courseType send courseId, when is article send articleId, but page doesn't have id
    t.nonNull.list.nonNull.string("virtualAppIds");
    t.nonNull.string("userId");
    t.nonNull.string("name");
    t.nonNull.string("description");
    t.nonNull.int("order");
    t.nonNull.field("type", { type: "MenuItemTypeEnum" });
    t.nonNull.string("thumbnail");
    t.nonNull.boolean("background");
    t.nonNull.boolean("active");
    t.nonNull.boolean("protected");
    t.list.int("tagIDs");
    t.int("restrictionType");
  },
});

export const UpdateMenuItem = inputObjectType({
  name: "UpdateMenuItem",
  definition(t) {
    t.string("name");
    t.string("description");
    t.int("order");
    t.string("thumbnail");
    t.string("image");
    t.boolean("background");
    t.boolean("active");
    t.boolean("protected");
  },
});

const MenuQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getMenuPageByPath", {
      type: "MenuType",
      args: {
        path: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { path } = args;

        return await controllers.menu.getMenuPageByPath(path);
      },
    });

    t.field("getMenuItemsByPath", {
      type: list("MenuItemType"),
      args: {
        path: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { path } = args;

        return await ctx.controllers.menu.getMenuItemsByPath(path);
      },
    });
  },
});

const MenuMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createMenuItems", {
      type: "Boolean",
      args: {
        path: nonNull("String"),
        datas: nonNull(list(nonNull("CreateMenuItem"))),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { path, datas } = args;

        await ctx.controllers.menu.createMenuItems(path, datas);

        return true;
      },
    });

    t.field("removeMenuItem", {
      type: "Boolean",
      args: {
        path: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { path } = args;

        await ctx.controllers.menu.removeMenuItem(path);

        return true;
      },
    });

    t.field("orderMenuItems", {
      type: "Boolean",
      args: {
        path: nonNull("String"),
        menuItemsIds: nonNull(list(nonNull("String"))),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { path, menuItemsIds } = args;

        await ctx.controllers.menu.orderMenuItems(path, menuItemsIds);

        return true;
      },
    });

    t.field("updateMenuItem", {
      type: "Boolean",
      args: {
        path: nonNull("String"),
        data: nonNull("UpdateMenuItem"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { path, data } = args;

        await ctx.controllers.menu.updateMenuItem(path, data);

        return true;
      },
    });
  },
});

export const MenuGraphQL = {
  MenuType,
  MenuQuery,
  MenuMutation,
  MenuItemType,
  MenuItemTypeEnum,
  CreateMenuItem,
  UpdateMenuItem,
};
