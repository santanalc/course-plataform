import fetch from "node-fetch";
const Configs = require("../../config.json");

const PUSH_FIREBASE_PRODUCTION_KEY = Configs.DEV_MODE
  ? Configs.DEV_PUSH_KEY
  : Configs.PROD_PUSH_KEY;

export function initNotificationController(params: {
  firestore: FirebaseFirestore.Firestore;
}) {
  const { firestore } = params;

  async function sendNotificationToSingleUser(params: {
    title: string;
    description: string;

    virtualAppId: string;
    lessonId: string;
    userUid: string;
  }) {
    const { virtualAppId, lessonId, userUid, title, description } = params;

    const userDocument = await firestore.collection("users").doc(userUid).get();

    // If the user for some reason doesn't exist, just return silently
    if (!userDocument.exists) return;

    const userDocumentData = userDocument.data()!;

    // const title = "File upload completed";
    // const description = `Your file ${fileName} has completed encoding and is ready to publish. Please change the title, description and/or thumbnail if you want within the CMS.`;

    // Parameters used in both FCM and Notifications
    const defaultParams = {
      title,
      description,

      type: 0,
      deeplink: ``,
      read: false,
      starred: false,
      timestamp: Date.now(),
      active: true,
      virtualAppId,
    };

    // Insert into Notifications
    await firestore
      .collection("Notifications")
      .doc(virtualAppId)
      .collection("notifications")
      .add({
        ...defaultParams,
        senderId: userUid,
        componentId: lessonId,
        userIds: [userUid],
      });

    // If the user doesn't have a device token, exit
    if (!userDocumentData.deviceToken) return;

    console.log(
      JSON.stringify({
        notification: {
          title,
          body: description,
        },

        data: {
          ...defaultParams,

          // KEK, 1 different parameter only, the old code was a clusterfuck
          userId: userUid,
        },

        content_available: true,
        registration_ids: [userDocumentData.deviceToken],
      })
    );

    // Do a fetch to send the notification
    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `key=${PUSH_FIREBASE_PRODUCTION_KEY}`,
      },
      body: JSON.stringify({
        notification: {
          title,
          body: description,
        },

        data: {
          ...defaultParams,

          // KEK, 1 different parameter only, the old code was a clusterfuck
          userId: userUid,
        },

        content_available: true,
        registration_ids: [userDocumentData.deviceToken],
      }),
    });

    console.log(await response.json());
  }

  return {
    sendNotificationToSingleUser,
  };
}
