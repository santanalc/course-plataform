import * as firebaseClientProvider from "firebase/app";
import * as auth from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as FirebaseAuthObject from "firebase/auth/dist/auth/index";
import { Firestore, getFirestore } from "firebase/firestore";
const ONLY_NUMBERS_REGEX = /[^0-9.]/g;

const Configs = require("../../config.json");

export type FirebaseAuth = typeof FirebaseAuthObject;

export const FIREBASE_CLIENT = Configs.DEV_MODE
  ? Configs.FIREBASE_CLIENT_DEV
  : Configs.FIREBASE_CLIENT_PROD;

type FirebaseService = {
  client: firebaseClientProvider.FirebaseApp;
  auth: FirebaseAuth;
  db: Firestore;
};

export function initFirebase(): FirebaseService {
  const client = firebaseClientProvider.initializeApp(FIREBASE_CLIENT);

  const db = getFirestore();

  const firebaseService: FirebaseService = {
    client,
    auth,
    db,
  };

  return firebaseService;
}

export const firebase = initFirebase();

async function login(
  phone: string,
  password: string
): Promise<{ userIdToken: string }> {
  phone = phone.replace(ONLY_NUMBERS_REGEX, "");
  password = password.trim();

  const auth = firebase.auth.getAuth();

  try {
    // This user request might throw
    let firebaseUser = await firebase.auth.signInWithEmailAndPassword(
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

async function changePasscode(
  passcode: string,
): Promise<boolean> {
  const auth = firebase.auth.getAuth();

  try {
    const user = auth.currentUser

    if (!user) return false

    await firebase.auth.updatePassword(user, passcode + "99")

    return true
  } catch (err) {
    throw new Error(err as any);
  }
}

async function getIdToken() {
  const auth = getAuth();

  return new Promise(async (resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        resolve(token);
      } else resolve("");
    });
  });
}

async function clearIdToken() {
  return firebase.auth.getAuth().signOut();
}

export const Firebase = {
  firebase,
  getIdToken,
  clearIdToken,
  login,
  changePasscode
};
