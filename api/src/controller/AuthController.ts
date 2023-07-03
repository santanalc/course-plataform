import { app } from "firebase-admin";
import * as FirebaseAuthObject from "firebase/auth/dist/auth/index";
import { ControllersType } from "..";
import { NexusGenInputs } from "../generated/nexus-typegen";
import { validationEmail } from "../utils/EmailValidation";
const ONLY_NUMBERS_REGEX = /[^0-9.]/g;
const Config = require("../../config.json");

export type FirebaseAuth = typeof FirebaseAuthObject;

export function initAuthController(params: {
  firestore: FirebaseFirestore.Firestore;
  firebaseAuth: FirebaseAuth;
  contactController: ControllersType["contact"];
  userController: ControllersType["user"];
  virtualAppController: ControllersType["virtualApp"];
  firebaseAdmin: app.App;
}) {
  const {
    firestore,
    firebaseAuth,
    contactController,
    userController,
    virtualAppController,
    firebaseAdmin,
  } = params;

  async function testDriveSignUp(data: {
    countryCode: string;
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<boolean> {
    //Virtual App from Test Drive
    const TD_VAPP = "LEARNASIUM";

    let { countryCode, phone, email, firstName, lastName } = data;

    if (countryCode[0] !== "+") {
      countryCode = "+" + countryCode;
    }

    email = email.toLowerCase();

    if (!validationEmail(email)) {
      return false;
    }

    // Check if the user already exists with userName or userEmail
    let userRequest = await firestore
      .collection("users")
      .where("userName", "==", countryCode.slice(1) + phone)
      .get();

    /**
     * Create a new user
     */
    if (userRequest.empty) {
      const userUid = userController.createByTestDrive({
        countryCode,
        phone,
        email,
        firstName,
        lastName,
      });

      return true;
    } else {
      /**
       * Update an existing user with the testdrive
       */

      const user = userRequest.docs[0];
      const userData = userRequest.docs[0].data();
      const virtualApps = await user.ref.collection("virtualApps").get();

      if (userData.userType === 1) {
        /**
         * The user is already an owner of an app
         * so he is not elegible to a test drive
         */
        return false;
      }

      let hasTestDriveVApp = false;

      // Check the user is already a contact on LEARNASIUM
      virtualApps.docs.forEach((vApp) => {
        const vAppData = vApp.data();
        if (vAppData.vAppId === TD_VAPP) {
          hasTestDriveVApp = true;
        }
      });

      if (hasTestDriveVApp) {
        /**
         * If the user has LEARNASIUM, it means that he
         * already had a test drive
         */
        return false;
      }

      /**
       * Add LEARNASIUM to the user
       * the function below returns false when cannot add the vAppId
       */

      const addVAppResponse = await userController.addVirtualApp({
        userId: userData.id,
        virtualAppId: TD_VAPP,
        userRole: 3,
      });

      if (!addVAppResponse) {
        return false;
      }

      // Remove AGORA
      await userController.removeVirtualApp({
        userId: userData.id,
        virtualAppId: "AGORA",
      });

      const defaultAddress = {
        userAddress: "",
        userCity: "",
        userCountry: "",
        userState: "",
        userZipCode: "",
      };

      contactController.addContact({
        contact: {
          active: true,
          billingAddress: defaultAddress,
          shippingAddress: defaultAddress,
          countryCode,
          userEmail: email,
          userFirstName: firstName,
          userLastName: lastName,
          userMobile: phone,
          userName: countryCode.slice(1) + phone,
          userNotes: "",
          userType: 1,
        },
        virtualAppId: TD_VAPP,
      });

      await user.ref.update({
        userType: 1,
        lastVAppSignedUp: TD_VAPP,
        activationLink: Config.TD_LINK + "learn",
      });

      return true;
    }
  }

  async function completeTestDriveSignUp(
    vApp: NexusGenInputs["CreateVirtualAppInput"],
    userId: string,
    newPassword: string
  ): Promise<boolean> {
    const usersDocumentSnap = await firestore
      .collection("users")
      .doc(userId)
      .get();

    const user = usersDocumentSnap.data();

    if (!usersDocumentSnap.exists || !user)
      throw new Error(`There's no user with uid ${userId}`);

    const vAppId = await virtualAppController.create(vApp, userId);

    if (!vAppId) throw new Error(`Virtual App wasn't create`);

    await usersDocumentSnap.ref.collection("virtualApps").doc(vAppId).set({
      userRole: 1,
      vAppId,
    });

    await usersDocumentSnap.ref.update({
      isFirstLogin: false,
    });

    //Update user password
    await firebaseAdmin.auth().updateUser(userId, {
      password: `${newPassword}99`,
    });

    return true;
  }

  async function doLogin(
    phone: string,
    password: string
  ): Promise<{ userIdToken: string }> {
    phone = phone.replace(ONLY_NUMBERS_REGEX, "");
    password = password.trim();

    const auth = firebaseAuth.getAuth();

    try {
      // This user request might throw
      let firebaseUser = await firebaseAuth.signInWithEmailAndPassword(
        auth,
        `${phone}@learnistic.com`,
        `${password}99`
      );

      let userIdToken = await firebaseUser.user.getIdToken(true);

      return {
        userIdToken,
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function checkPhone(phone: string): Promise<boolean> {
    try {
      const usersRef = firestore.collection("users");

      const firebaseUser = usersRef.where("userName", "==", phone);

      const querySnapshot = await firebaseUser.get();

      if (!querySnapshot.docs[0]) return false;
      else return true;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  return { testDriveSignUp, completeTestDriveSignUp, doLogin, checkPhone };
}
