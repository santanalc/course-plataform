module.exports = {
  client: {
    service: {
      name: "graphql-learnistic",
      url: "https://cms-api.learnistic.com",
      // url: "https://localhost:4000",
    },
    excludes: ["src\\generated\\graphql.tsx", "src/generated/graphql.tsx"],
  },
};
