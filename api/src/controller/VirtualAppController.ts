import { NexusGenInputs, NexusGenRootTypes } from "../generated/nexus-typegen";

export function initVirtualAppController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  function convertToObject(virtualApp: FirebaseFirestore.DocumentData) {
    return {
      id: virtualApp?.id,
      userId: virtualApp?.userId,
      name: virtualApp?.name,
      description: virtualApp?.description,
      activationLink: virtualApp?.activationLink,
      activationStatus: virtualApp?.activationStatus,
      active: virtualApp?.active,
      appKey: virtualApp?.appKey,
      appStatus: virtualApp?.appStatus,
      appTimeZone: virtualApp?.appTimeZone,
      appOwnerName: virtualApp?.appOwnerName,
      articlesCount: virtualApp?.articlesCount,
      automaticTimezone: virtualApp?.automaticTimezone,
      backgroundColor: virtualApp?.backgroundColor,
      bottomBarPref: virtualApp?.bottomBarPref,
      bottombarHidden: virtualApp?.bottombarHidden,
      companyName: virtualApp?.companyName,
      companyNiche: virtualApp?.companyNiche,
      companyHelpEmail: virtualApp?.companyHelpEmail,
      companyHelpCenter: virtualApp?.companyHelpCenter,
      companyCountryCode: virtualApp?.companyCountryCode,
      companyPhoneNumber: virtualApp?.companyPhoneNumber || 0, //There are a lot of NaN values on firebase
      companyZipCode: virtualApp?.companyZipCode,
      companyCity: virtualApp?.companyCity,
      companyAddress: virtualApp?.companyAddress,
      companyCountry: virtualApp?.companyCountry,
      companyState: virtualApp?.companyState,
      courseVideosCount: virtualApp?.courseVideosCount,
      ctaColor: virtualApp?.ctaColor,
      editProfileDeeplink: virtualApp?.editProfileDeeplink,
      highlightColor: virtualApp?.highlightColor,
      inviteUserLink: virtualApp?.inviteUserLink,
      logo: virtualApp?.logo,
      notificationIntervalHour: virtualApp?.notificationIntervalHour,
      titleBarColor: virtualApp?.titleBarColor,
      mediaHost: virtualApp?.mediaHost,
    };
  }

  async function findOne(
    virtualAppId: string
  ): Promise<NexusGenRootTypes["VirtualAppType"]> {
    try {
      const virtualAppRef = firestore.collection("clients");

      const firebaseVirtualApp = virtualAppRef.where("id", "==", virtualAppId);

      const querySnapshot = await firebaseVirtualApp.get();

      if (!querySnapshot.docs[0])
        throw new Error(`There's no virtualApp with id ${virtualAppId}`);

      const virtualApp = querySnapshot.docs[0].data();

      return convertToObject(virtualApp);
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function getByUserId(
    userId: string
  ): Promise<Array<NexusGenRootTypes["VirtualAppType"]>> {
    try {
      const usersRef = firestore.collection("users");

      const virtualAppsIdQuerySnapshot = await usersRef
        .doc(userId)
        .collection("virtualApps")
        .get();

      let vAppIds = [] as string[];

      virtualAppsIdQuerySnapshot.forEach(async (vApp) => {
        const virtualApp = vApp.data();

        //Getting vApps that user is owner or admin
        if (virtualApp.userRole !== 3) vAppIds.push(virtualApp.vAppId);
      });

      let virtualApps = [] as NexusGenRootTypes["VirtualAppType"][];

      await Promise.all(
        vAppIds.map(async (vAppId) => {
          const virtualAppRef = firestore.collection("clients");

          const firebaseVirtualApp = virtualAppRef.doc(vAppId);

          const querySnapshot = await firebaseVirtualApp.get();

          if (!querySnapshot.exists) return;

          const vApp = querySnapshot.data();

          if (!vApp) return;

          virtualApps.push(convertToObject(vApp));
        })
      );

      return virtualApps;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function update(
    virtualAppId: string,
    data: NexusGenInputs["UpdateVirtualAppInput"]
  ): Promise<boolean> {
    try {
      const virtualAppRef = firestore.collection("clients").doc(virtualAppId);

      const querySnapshot = await virtualAppRef.get();

      const virtualApp = querySnapshot.data();

      if (!querySnapshot.exists || !virtualApp) {
        throw new Error(`There's no vApp with id ${virtualAppId}`);
      }

      virtualAppRef.update({
        ...data,
      });

      return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function create(
    vApp: NexusGenInputs["CreateVirtualAppInput"],
    userId: string
  ): Promise<string> {
    try {
      const vAppResponse = await firestore.collection("clients").add({
        ...vApp,
        bottomBarPref: 2,
        bottombarHidden: false,
        description: "",
        userId,
        activationStatus: false,
        appStatus: 0,
        notificationIntervalHour: 2,
      });

      vAppResponse.update({
        id: vAppResponse.id,
      });

      await firestore.collection("menu").doc(vAppResponse.id).set({
        image: "",
        imageTitle: "Image name",
        link: "",
        type: "page",
        userId,
      });

      return vAppResponse.id;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return { findOne, getByUserId, update, create };
}
