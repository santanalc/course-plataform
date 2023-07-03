import * as FileType from "file-type";
import { storage } from "firebase-admin/lib/storage";
import { v4 as uuidv4 } from "uuid";
import { FIREBASE_CLIENT } from "./FirebaseService";

export type FirebaseStorage = {
  uploadFile: (params: {
    filePath: string;
    userId: string;
    folderId: string;
    folder: string;
  }) => Promise<string>;
};

export function initFirebaseStorage(params: {
  storage: storage.Storage;
}): FirebaseStorage {
  const { storage } = params;

  const createPersistentDownloadUrl = (
    bucket: string,
    pathToFile: string,
    downloadToken: string
  ) => {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      pathToFile
    )}?alt=media&token=${downloadToken}`;
  };

  /*
    Firebase Storage to access the folder, the path is userId/folder/folderId
    Folder can be Article, Course, Lesson, VApp etc..
    FolderId, if you put on course folder, the id is gonna be courseId or articleId etc...
  */
  async function uploadFile(params: {
    filePath: string;
    userId: string;
    folderId: string;
    folder: string;
  }) {
    const { filePath, userId, folderId, folder } = params;

    const type = await FileType.fromFile(filePath);

    const destination = `${userId}/${folder}/${folderId}`;

    const uuid = uuidv4();

    await storage.bucket().upload(filePath, {
      destination,
      metadata: {
        contentType: type?.mime,
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });

    const downloadLink = createPersistentDownloadUrl(
      FIREBASE_CLIENT.storageBucket,
      destination,
      uuid
    );

    return downloadLink;
  }

  return {
    uploadFile,
  };
}
