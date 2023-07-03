import { NexusGenEnums } from "../generated/nexus-typegen";

export function initMediaManagerController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  async function create(data: {
    fileId: string;
    virtualAppId: string;
    filePath: string;
    fileUrl: string;
    type: NexusGenEnums["MediaManagerTypeEnum"];
    actived: boolean;
    name: string;
    extension: string;
    thumbVideoUrl?: string | null | undefined;
  }): Promise<Boolean> {
    try {
      const { fileId, virtualAppId } = data;

      await firestore
        .doc(`mediaManager/${virtualAppId}/files/${fileId}`)
        .set({ ...data });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function update(data: {
    fileId: string;
    virtualAppId: string;
    filePath?: string | null | undefined;
    fileUrl?: string | null | undefined;
    actived?: boolean | null | undefined;
    name?: string | null | undefined;
    thumbVideoUrl?: string | null | undefined;
  }): Promise<Boolean> {
    try {
      const { fileId, virtualAppId } = data;

      await firestore
        .doc(`mediaManager/${virtualAppId}/files/${fileId}`)
        .update({ ...data });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return {
    create,
    update,
  };
}
