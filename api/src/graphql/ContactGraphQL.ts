import { extendType, inputObjectType, nonNull, objectType } from "nexus";
import { list } from "nexus/dist/core";

const AddressType = objectType({
  name: "AddressType",
  definition(t) {
    t.string("userAddress");
    t.string("userCity");
    t.string("userCountry");
    t.string("userState");
    t.string("userZipCode");
  },
});

const AddressInput = inputObjectType({
  name: "AddressInput",
  definition(t) {
    t.nonNull.string("userAddress");
    t.nonNull.string("userCity");
    t.nonNull.string("userCountry");
    t.nonNull.string("userState");
    t.nonNull.string("userZipCode");
  },
});

const ContactType = objectType({
  name: "ContactType",
  definition: (t) => {
    t.boolean("active");
    t.field("billingAddress", { type: nonNull("AddressType") });
    t.field("shippingAddress", { type: nonNull("AddressType") });
    t.string("contactId");
    t.string("countryCode");
    t.string("createdAt");
    t.string("id"); //userId
    t.string("userEmail");
    t.string("userFirstName");
    t.string("userImage");
    t.string("userLastName");
    t.string("userMobile");
    t.string("userName");
    t.string("userNotes");
    t.field("userType", { type: "UserTypeEnum" });
  },
});

const CreateContactInput = inputObjectType({
  name: "CreateContactInput",
  definition: (t) => {
    t.nonNull.boolean("active");
    t.nonNull.field("billingAddress", { type: nonNull("AddressInput") });
    t.nonNull.field("shippingAddress", { type: nonNull("AddressInput") });
    t.nonNull.string("userEmail");
    t.nonNull.string("userName");
    t.nonNull.string("userFirstName");
    t.nonNull.string("userLastName");
    t.nonNull.string("countryCode");
    t.nonNull.string("userMobile");
    t.nonNull.string("userNotes");
    t.nonNull.field("userType", { type: "UserTypeEnum" });
    t.boolean("userEmailVerified");
  },
});

const ContactQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getContactById", {
      type: "ContactType",
      args: {
        contactId: nonNull("String"),
        virtualAppId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        const { contactId, virtualAppId } = args;
        if (!userUid) throw new Error("Unauthorized");

        return await controllers.contact.findOne({ contactId, virtualAppId });
      },
    });
  },
});

const ContactMutation = extendType({
  type: "Mutation",
  definition: (t) => {
    t.field("createContact", {
      type: "Boolean",
      args: {
        contact: nonNull("CreateContactInput"),
        virtualAppId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        if (!userUid) throw new Error("Unauthorized");

        const { contact, virtualAppId } = args;

        await controllers.contact.createContact({
          contact,
          virtualAppId,
        });

        return true;
      },
    });
    t.field("deleteContact", {
      type: "Boolean",
      args: {
        contactId: nonNull("String"),
        virtualAppId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        const { contactId, virtualAppId } = args;
        if (!userUid) throw new Error("Unauthorized");

        await controllers.contact.deleteContact({
          contactId,
          virtualAppId: virtualAppId,
        });

        return true;
      },
    });
    t.field("deleteMultipleContacts", {
      type: "Boolean",
      args: {
        contactIds: nonNull(list(nonNull("String"))),
        virtualAppId: nonNull("String"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        const { contactIds, virtualAppId } = args;
        if (!userUid) throw new Error("Unauthorized");

        await controllers.contact.deleteMultipleContacts({
          contactIds,
          virtualAppId,
        });

        return true;
      },
    });
    t.field("updateContact", {
      type: "Boolean",
      args: {
        contactId: nonNull("String"),
        virtualAppId: nonNull("String"),
        updateFields: nonNull("CreateContactInput"),
      },
      resolve: async (_root, args, ctx) => {
        const { userUid, controllers } = ctx;
        const { contactId, virtualAppId, updateFields } = args;
        if (!userUid) throw new Error("Unauthorized");

        await controllers.contact.updateContact({
          contactId,
          virtualAppId,
          updateFields,
        });

        return true;
      },
    });
  },
});

export const ContactGraphQL = {
  ContactType,
  CreateContactInput,
  ContactQuery,
  ContactMutation,
  AddressType,
  AddressInput,
};
