import S3 from "aws-sdk/clients/s3";

const Configs = require("../../config.json");

export const s3 = new S3({
  apiVersion: "latest",
  region: Configs.S3.region,
  signatureVersion: Configs.S3.signatureVersion,
  credentials: {
    accessKeyId: Configs.S3.accessKeyId,
    secretAccessKey: Configs.S3.secretAccessKey,
  },
});

export const initObjectStorage = () => {
  return {};
};
