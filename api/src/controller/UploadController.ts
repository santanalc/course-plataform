import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { finished } from "stream/promises";
import { v4 } from "uuid";
import { NexusGenEnums, NexusGenScalars } from "../generated/nexus-typegen";
import { FirebaseStorage } from "../services/FirebaseStorageService";

export function initUploadController(params: {
  firebaseStorage: FirebaseStorage;
}) {
  const { firebaseStorage } = params;

  async function uploadImage(
    userId: string,
    folderId: string,
    folder: string,
    file: NexusGenScalars["Upload"],
    imageType: NexusGenEnums["ImageFileType"]
  ) {
    try {
      const { createReadStream, mimetype, encoding } = await file;

      const stream = createReadStream();
      const dir = path.join(__dirname, `../assets/upload`);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      try {
        v4();
      } catch (err) {
        console.log("err", err);
      }
      let filename = v4();

      const pathName = path.join(__dirname, `../assets/upload/${filename}`);

      const out = fs.createWriteStream(pathName);
      stream.pipe(out);
      await finished(out);

      let imgSharp = sharp(pathName);

      let height = 500;
      let width = 500;

      // Banner
      if (imageType === 1) {
        height = 720;
        width = 1280;
      }

      let metadata = await imgSharp.metadata();

      const fileExtension = metadata.format as keyof sharp.FormatEnum;

      imgSharp.resize(width, height, {
        fit: sharp.fit.fill,
        withoutEnlargement: false,
      });

      await new Promise((resolve, reject) => {
        imgSharp.toFile(pathName + "end." + fileExtension, (err, info) => {
          if (err) {
            console.log("err", err);
            fs.unlinkSync(pathName);
            reject();
          }
          resolve(1);
        });
      });

      const downloadLink = await firebaseStorage.uploadFile({
        filePath: pathName + "end." + fileExtension,
        userId,
        folder,
        folderId,
      });

      fs.unlinkSync(pathName);
      fs.unlinkSync(pathName + "end." + fileExtension);

      return { filename, mimetype, encoding, downloadLink };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function uploadFile(
    userId: string,
    folderId: string,
    folder: string,
    file: NexusGenScalars["Upload"]
  ) {
    try {
      const { createReadStream, mimetype, encoding } = await file;

      const stream = createReadStream();
      const dir = path.join(__dirname, `../assets/upload`);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      let filename = v4();

      const pathName = path.join(__dirname, `../assets/upload/${filename}`);

      const out = fs.createWriteStream(pathName);
      stream.pipe(out);

      await finished(out);

      const downloadLink = await firebaseStorage.uploadFile({
        filePath: pathName,
        userId,
        folder,
        folderId,
      });

      fs.unlinkSync(pathName);

      return { filename, mimetype, encoding, downloadLink };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return {
    uploadImage,
    uploadFile,
  };
}
