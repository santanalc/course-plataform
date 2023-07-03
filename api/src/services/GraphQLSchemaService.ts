import { GraphQLDateTime } from "graphql-iso-date";
import { asNexusMethod, makeSchema } from "nexus";
import path from "path";
import { ArticleGraphQL } from "../graphql/ArticleGraphQL";
import { AuthGraphQL } from "../graphql/AuthGraphQL";
import { ContactGraphQL } from "../graphql/ContactGraphQL";
import { CourseGraphQL } from "../graphql/CourseGraphQL";
import { LessonGraphQL } from "../graphql/LessonGraphQL";
import { MenuGraphQL } from "../graphql/MenuGraphQL";
import { PlacesGraphQL } from "../graphql/PlacesGraphQL";
import { TopicGraphQL } from "../graphql/TopicGraphQL";
import { UploadGraphQL } from "../graphql/UploadGraphQL";
import { VirtualAppGraphQL } from "../graphql/VirtualAppGraphQL";
import { UserGraphQL } from "../graphql/UserGraphQL";
import { MediaManagerGraphQL } from "../graphql/MediaManagerGraphQL";

export function initGraphQLSchema() {
  const GQLDateTime = asNexusMethod(GraphQLDateTime, "date");

  const schema = makeSchema({
    // Query types
    types: [
      ...Object.values(CourseGraphQL),
      ...Object.values(ContactGraphQL),
      ...Object.values(AuthGraphQL),
      ...Object.values(ArticleGraphQL),
      ...Object.values(VirtualAppGraphQL),
      ...Object.values(MenuGraphQL),
      ...Object.values(UploadGraphQL),
      ...Object.values(TopicGraphQL),
      ...Object.values(LessonGraphQL),
      ...Object.values(PlacesGraphQL),
      ...Object.values(UserGraphQL),
      ...Object.values(MediaManagerGraphQL),
      GQLDateTime,
    ],

    // Nexus GraphQL reflection!
    outputs: {
      typegen: path.join(__dirname, "../../src/generated/nexus-typegen.ts"),
      schema: path.join(__dirname, "../../src/generated/schema.graphql"),
    },
    contextType: {
      module: path.join(__dirname, "../../src/index.ts"),
      export: "ContextType",
    },

    //plugins: [connectionPlugin()],
  });

  return schema;
}

if (process.argv[2] === "--generate-only") {
  console.log("Generating typescript types from GraphQL!");
  initGraphQLSchema();
  console.log("Done!");
}
