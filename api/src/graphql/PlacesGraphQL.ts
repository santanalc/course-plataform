import { extendType, list, nonNull, objectType, stringArg } from "nexus";

const PlacesType = objectType({
  name: "PlacesType",
  definition(t) {
    t.nonNull.string("userAddress");
    t.nonNull.string("userCity");
    t.nonNull.string("userCountry");
    t.nonNull.string("userState");
    t.nonNull.string("userZipCode");
  },
});

const AutocompleteOption = objectType({
  name: "AutocompleteOption",
  definition(t) {
    t.string("label");
    t.string("value");
  },
});

const PlacesQuery = extendType({
  type: "Query",
  definition: (t) => {
    t.field("getPlacesAutocompleteOptions", {
      type: list("AutocompleteOption"),
      args: { input: nonNull("String") },
      resolve: async (root, args, ctx) => {
        const { userUid, controllers } = ctx;
        const { input } = args;
        if (!userUid) throw new Error("Unauthorized");
        return await controllers.places.getPlacesAutocompleteOptions({
          input: input,
        });
      },
    });
    t.field("getPlaceDetails", {
      type: "PlacesType",
      args: { place_id: nonNull("String") },
      resolve: async (root, args, ctx) => {
        const { userUid, controllers } = ctx;
        const { place_id } = args;
        if (!userUid) throw new Error("Unauthorized");
        return await controllers.places.getPlaceDetails({
          place_id: place_id,
        });
      },
    });
  },
});

export const PlacesGraphQL = { PlacesType, PlacesQuery, AutocompleteOption };
