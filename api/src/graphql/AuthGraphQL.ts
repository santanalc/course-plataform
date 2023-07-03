import { extendType, nonNull, objectType } from "nexus";

const AuthType = objectType({
  name: "AuthType",
  definition: (t) => {
    t.nonNull.string("userIdToken");
  },
});

const AuthMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("login", {
      type: "AuthType",
      args: {
        phone: nonNull("String"),
        password: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { phone, password } = args;
        const { controllers } = ctx;

        return await controllers.auth.doLogin(phone, password);
      },
    });
    t.field("checkPhone", {
      type: "Boolean",
      args: {
        phone: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { phone } = args;
        const { controllers } = ctx;

        return await controllers.auth.checkPhone(phone);
      },
    });
    t.field("testDriveSignUp", {
      type: "Boolean",
      args: {
        countryCode: nonNull("String"),
        phone: nonNull("String"),
        email: nonNull("String"),
        firstName: nonNull("String"),
        lastName: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { phone, countryCode, email, firstName, lastName } = args;
        const { controllers } = ctx;

        return await controllers.auth.testDriveSignUp({
          countryCode,
          phone,
          email,
          firstName,
          lastName,
        });
      },
    });

    t.field("completeTestDriveSignUp", {
      type: "Boolean",
      args: {
        vApp: nonNull("CreateVirtualAppInput"),
        newPassword: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { vApp, newPassword } = args;
        const { controllers, userUid } = ctx;

        if (!userUid) throw new Error("Unauthorized");

        return await controllers.auth.completeTestDriveSignUp(
          vApp,
          userUid,
          newPassword
        );
      },
    });
  },
});

export const AuthGraphQL = { AuthType, AuthMutation };
