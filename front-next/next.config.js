module.exports = {
  //target: "web",
  reactStrictMode: true,
  images: {
    domains: ["keycdn.sociallair.io"],
  },
  /* future: { webpack5: true },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  }, */

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:slug*",
  //       destination: "https://uploader-api.lrnapi.co/:slug*",
  //     },
  //   ];
  // },
};
