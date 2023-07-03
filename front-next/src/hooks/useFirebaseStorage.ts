import { useApolloClient } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/UserAtom";
import {
  UPLOAD_FILE_FIRESTORE,
  UPLOAD_IMAGE_FILE_FIRESTORE,
} from "../components/screens/MediaManager/MediaManagerFilterBar/MediaManagerFilterBar";
import {
  ImageFileType,
  UploadFileToFirestoreMutation,
  UploadFileToFirestoreMutationVariables,
  UploadImageFileToFirestoreMutation,
  UploadImageFileToFirestoreMutationVariables,
  UserType,
} from "../generated/graphql";

export default function useFirebaseStorage() {
  const client = useApolloClient();
  const user = useRecoilValue(UserAtom);

  async function uploadFileToFirestorage(data: {
    file: File;
    folder: string;
    folderId: string;
  }) {
    const response = await client.mutate<
      UploadFileToFirestoreMutation,
      UploadFileToFirestoreMutationVariables
    >({
      mutation: UPLOAD_FILE_FIRESTORE,
      variables: {
        file: data.file,
        userId: (user as UserType).id,
        folderId: data.folderId,
        folder: data.folder,
      },
    });
    const downloadLink = response.data?.uploadFileToFirestore?.downloadLink;
    return downloadLink;
  }

  async function uploadImageToFirestorage(data: {
    file?: File;
    folder: string;
    type: ImageFileType;
    folderId: string;
  }) {
    const response = await client.mutate<
      UploadImageFileToFirestoreMutation,
      UploadImageFileToFirestoreMutationVariables
    >({
      mutation: UPLOAD_IMAGE_FILE_FIRESTORE,
      variables: {
        file: data.file,
        userId: (user as UserType).id,
        folderId: data.folderId,
        folder: data.folder,
        imageType: data.type,
      },
    });
    const downloadLink =
      response.data?.uploadImageFileToFirestore?.downloadLink;
    return downloadLink || "";
  }

  return { uploadFileToFirestorage, uploadImageToFirestorage };
}
