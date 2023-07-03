import dayjs from "dayjs";
import fsPromises from "fs/promises";
import { customAlphabet } from "nanoid";
import { alphanumeric, numbers } from "nanoid-dictionary";
import { ControllersType } from "..";
import { NexusGenRootTypes } from "../generated/nexus-typegen";
import { EmailService } from "../services/EmailService";
import { TwilioService } from "../services/TwilioService";
import { applyTemplate } from "../utils/ApplyEmailTemplate";
import { FirebaseAuth } from "./AuthController";

const Config = require("../../config.json");

const nanoIdToken = customAlphabet(alphanumeric, 10);
const nanoIdPasscode = customAlphabet(numbers, 4);

export function initUserController(params: {
  firestore: FirebaseFirestore.Firestore;
  firebaseAuth: FirebaseAuth;
  contactController: ControllersType["contact"];
  twilio: TwilioService;
  emailService: EmailService;
  virtualAppController: ControllersType["virtualApp"];
}) {
  const {
    firestore,
    firebaseAuth,
    contactController,
    twilio,
    emailService,
    virtualAppController,
  } = params;

  async function findOne(
    userId: string
  ): Promise<NexusGenRootTypes["UserType"]> {
    try {
      const usersRef = firestore.collection("users");

      const querySnapshot = await usersRef.doc(userId).get();

      const user = querySnapshot.data();

      if (!querySnapshot.exists || !user)
        throw new Error(`There's no user with uid ${userId}`);

      //The docs on firebase is confusion, sometimes the value is TYPE others is USERTYPE...
      //Can ben that there are other variables with this way
      return {
        id: user.id,
        userName: user.userName,
        email: user.userEmail,
        phone: user.countryCode + user.userMobile,
        type: user.type || user.userType,
        isFirstLogin: user?.isFirstLogin,
      };
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function createByTestDrive(data: {
    countryCode: string;
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
  }) {
    let { countryCode, phone, email } = data;

    const TD_VAPP = "LEARNASIUM";

    const auth = firebaseAuth.getAuth();

    // Ensure countryCode starts with "+"
    if (countryCode[0] !== "+") {
      countryCode = "+" + countryCode;
    }

    // Remove all not numbers characters from phone
    phone = phone.replace(/[^\d]/g, "");

    // Remove 0 from the start of the phone
    if (phone[0] === "0") {
      phone = phone.slice(1);
    }

    const twilioRequestNumber = countryCode + phone;

    const phoneNumberValidationRequest = await twilio.preparePhoneNumber(
      twilioRequestNumber
    );

    // Example: 1456789878@learnistic.com
    const authEmail = countryCode.slice(1) + phone + "@learnistic.com";

    let password = nanoIdPasscode();
    let token = nanoIdToken();

    const passwordToAuth = password + "99";

    // Create the user on Firebase Authentication
    const authData = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      authEmail,
      passwordToAuth
    );

    if (!authData.user || !authData.user.uid) {
      throw new Error("Could not create the user on Authentication");
    }

    const userName = countryCode.slice(1) + phone;

    const activationLink = Config.TDLINK + "learn";

    const dataToSave = {
      id: authData.user.uid,
      countryCode: countryCode,
      userMobile: phone,
      userEmail: email,
      userName: userName,
      token: token,
      activationLink,
      userType: 1,
      isFirstLogin: true,
      lastVAppSignedUp: "LEARNASIUM",
      lastPasscodeSent: password,
      createdAt: new Date(),
    };

    // Create a new user with a specific ID (same as the auth uid)
    await firestore.collection("users").doc(authData.user.uid).set(dataToSave);

    if (email && email !== "") {
      const secretUsername =
        "xxxxxxxx" + userName.substring(userName.length - 4);

      await sendWelcomeTestDriveEmail(secretUsername, password, email);
    }

    await sendWelcomeTestDriveSMS({
      phone: phoneNumberValidationRequest,
      password,
    });

    const addVAppResponse = await addVirtualApp({
      userId: authData.user.uid,
      virtualAppId: TD_VAPP,
      userRole: 3,
    });

    if (!addVAppResponse) {
      return false;
    }

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
        userFirstName: "",
        userLastName: "",
        userMobile: phone,
        userName: countryCode.slice(1) + phone,
        userNotes: "",
        userType: 1,
      },
      virtualAppId: TD_VAPP,
    });
    return authData.user.uid;
  }

  async function createByContactViaPhone(data: {
    countryCode: string;
    phone: string;
    email: string;
    virtualAppId: string;
  }) {
    let { countryCode, phone, email, virtualAppId } = data;

    const auth = firebaseAuth.getAuth();

    // Ensure countryCode starts with "+"
    if (countryCode[0] !== "+") {
      countryCode = "+" + countryCode;
    }

    // Remove all not numbers characters from phone
    phone = phone.replace(/[^\d]/g, "");

    // Remove 0 from the start of the phone
    if (phone[0] === "0") {
      phone = phone.slice(1);
    }

    const twilioRequestNumber = countryCode + phone;

    const phoneNumberValidationRequest = await twilio.preparePhoneNumber(
      twilioRequestNumber
    );

    // Example: 1456789878@learnistic.com
    const authEmail = countryCode.slice(1) + phone + "@learnistic.com";

    let password = nanoIdPasscode();
    let token = nanoIdToken();

    const passwordToAuth = password + "99";

    // Create the user on Firebase Authentication
    const authData = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      authEmail,
      passwordToAuth
    );

    if (!authData.user || !authData.user.uid) {
      throw new Error("Could not create the user on Authentication");
    }

    const userName = countryCode.slice(1) + phone;

    const dataToSave = {
      id: authData.user.uid,
      countryCode: countryCode,
      userMobile: phone,
      userEmail: email,
      userName: userName,
      token: token,
      userType: 3,
      isFirstLogin: true,
      lastPasscodeSent: password,
      createdAt: new Date(),
    };

    // Create a new user with a specific ID (same as the auth uid)
    await firestore.collection("users").doc(authData.user.uid).set(dataToSave);

    if (email) {
      await sendWelcomeAppDriveEmail(password, email, virtualAppId);
    }

    await sendWelcomeAppSMS({
      phone: phoneNumberValidationRequest,
      appName: "",
      password,
    });

    return authData.user.uid;
  }

  async function createByContactViaEmail(data: {
    email: string;
    virtualAppId: string;
  }) {
    let { email, virtualAppId } = data;

    const auth = firebaseAuth.getAuth();

    let password = nanoIdPasscode();
    let token = nanoIdToken();

    const passwordToAuth = password + "99";

    // Create the user on Firebase Authentication
    // The user needs to register on app and It is gonna change the auth email
    const authData = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      passwordToAuth
    );

    if (!authData.user || !authData.user.uid) {
      throw new Error("Could not create the user on Authentication");
    }

    const userName = "";

    const dataToSave = {
      id: authData.user.uid,
      countryCode: "",
      userMobile: "",
      userEmail: email,
      userName: userName,
      token: token,
      userType: 3,
      isFirstLogin: true,
      lastPasscodeSent: password,
      createdAt: new Date(),
    };

    // Create a new user with a specific ID (same as the auth uid)
    await firestore.collection("users").doc(authData.user.uid).set(dataToSave);

    if (email) {
      await sendCompleteProfileEmail(password, email, virtualAppId, token);
    }

    return authData.user.uid;
  }

  async function addVirtualApp(data: {
    userId: string;
    virtualAppId: string;
    userRole: number;
  }): Promise<Boolean> {
    try {
      const { userId, virtualAppId, userRole } = data;

      // Get User
      const usersRef = firestore.collection("users").doc(userId);

      const userQuerySnapshot = await usersRef.get();

      const user = userQuerySnapshot.data();

      if (!userQuerySnapshot.exists || !user)
        throw new Error(`There's no user with uid ${userId}`);

      // Get VirtualApp
      const virtualAppRef = firestore.collection("clients").doc(virtualAppId);

      const virtualAppQuerySnapshot = await virtualAppRef.get();

      const virtualApp = virtualAppQuerySnapshot.data();

      if (!virtualAppQuerySnapshot.exists || !virtualApp) {
        throw new Error(`There's no vApp with id ${virtualAppId}`);
      }

      //Add vApp on User
      const courseResponse = await usersRef
        .collection("virtualApps")
        .doc(virtualAppId)
        .set({
          userRole,
          vAppId: virtualAppId,
        });

      return !!courseResponse;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function removeVirtualApp(data: {
    userId: string;
    virtualAppId: string;
  }): Promise<Boolean> {
    try {
      const { userId, virtualAppId } = data;
      // Get User
      const usersRef = firestore.collection("users").doc(userId);

      const userQuerySnapshot = await usersRef.get();

      const user = userQuerySnapshot.data();

      if (!userQuerySnapshot.exists || !user)
        throw new Error(`There's no user with uid ${userId}`);

      // Remove vApp on User
      const courseResponse = await usersRef
        .collection("virtualApps")
        .doc(virtualAppId)
        .delete();

      return !!courseResponse;
    } catch (err) {
      throw new Error(err as any);
    }
  }

  async function sendWelcomeTestDriveEmail(
    username: string,
    password: string,
    userEmail: string
  ) {
    const htmlData = await fsPromises.readFile(
      `src/templates/testDriveWelcome.html`
    );
    const htmlTemplate = htmlData.toString();

    const body = applyTemplate(htmlTemplate, {
      currentYear: dayjs().year(),
      username,
      password,
    });

    await emailService.sendEmail({
      to: [userEmail],
      body,
      subject: "Welcome to Learnistic",
    });
  }

  async function sendWelcomeAppDriveEmail(
    password: string,
    userEmail: string,
    virtualAppId: string
  ) {
    const vApp = await virtualAppController.findOne(virtualAppId);

    let appOwner = vApp.appOwnerName;
    let appName = vApp.name;
    let appContactEmail = vApp.companyHelpEmail;
    let appContactLink = vApp.companyHelpCenter;
    let appContactPhone =
      (vApp.companyCountryCode || "") + (vApp.companyPhoneNumber || "");

    let signature;

    if (appContactEmail) {
      signature = appContactEmail;
    } else if (appContactLink) {
      signature = appContactLink;
    } else {
      signature = appContactPhone;
    }

    const htmlData = await fsPromises.readFile(`src/templates/appWelcome.html`);
    const htmlTemplate = htmlData.toString();

    const body = applyTemplate(htmlTemplate, {
      currentYear: dayjs().year(),
      password,
      userEmail,
      appOwner,
      appName,
    });

    await emailService.sendEmail({
      to: [userEmail],
      body,
      subject: "Welcome to Learnistic",
    });
  }

  async function sendCompleteProfileEmail(
    password: string,
    userEmail: string,
    virtualAppId: string,
    token: string
  ) {
    const vApp = await virtualAppController.findOne(virtualAppId);

    let appOwner = vApp.appOwnerName;
    let appName = vApp.name;
    let appContactEmail = vApp.companyHelpEmail;
    let appContactLink = vApp.companyHelpCenter;
    let appContactPhone =
      (vApp.companyCountryCode || "") + (vApp.companyPhoneNumber || "");

    let signature;

    if (appContactEmail) {
      signature = appContactEmail;
    } else if (appContactLink) {
      signature = appContactLink;
    } else {
      signature = appContactPhone;
    }

    const htmlData = await fsPromises.readFile(
      `src/templates/completeProfile.html`
    );
    const htmlTemplate = htmlData.toString();

    const body = applyTemplate(htmlTemplate, {
      currentYear: dayjs().year(),
      password,
      userEmail,
      appOwner,
      appName,
      signature,
    });

    await emailService.sendEmail({
      to: [userEmail],
      body,
      subject: `You've been invited to ${appName}`,
    });
  }

  async function sendWelcomeTestDriveSMS(params: {
    phone: string;
    password: string;
  }) {
    let { phone, password } = params;

    let body;

    body = "Welcome to Learnistic! Your temporary passcode is " + password;

    await twilio.sendSms({
      to: phone,
      body,
    });
  }

  async function sendWelcomeAppSMS(params: {
    phone: string;
    appName: string;
    password: string;
  }) {
    let { phone, appName, password } = params;

    let body;

    if (appName.length >= 30) {
      appName = appName.substring(0, 27);
    }

    body =
      'You have been invited to "' +
      appName +
      '". Your temporary passcode is ' +
      password +
      ". Go to https://r.learnistic.com/ga for instructions.";

    await twilio.sendSms({
      to: phone,
      body,
    });
  }

  return {
    findOne,
    addVirtualApp,
    removeVirtualApp,
    createByTestDrive,
    createByContactViaPhone,
    createByContactViaEmail,
  };
}
