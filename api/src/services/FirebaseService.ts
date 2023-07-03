import firebaseAdminProvider, { storage } from "firebase-admin";
import * as firebaseClientProvider from "firebase/app";
import * as auth from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseAuth } from "../controller/AuthController";
const Configs = require("../../config.json");

export const FIREBASE_CREDENTIALS = Configs.DEV_MODE
  ? Configs.FIREBASE_CREDENTIALS_DEV
  : Configs.FIREBASE_CREDENTIALS_PROD;

export const FIREBASE_CLIENT = Configs.DEV_MODE
  ? Configs.FIREBASE_CLIENT_DEV
  : Configs.FIREBASE_CLIENT_PROD;

type FirebaseService = {
  client: firebaseClientProvider.FirebaseApp;
  auth: FirebaseAuth;
  db: Firestore;
  admin: firebaseAdminProvider.app.App;
  storage: storage.Storage;
};

export function initFirebase(): FirebaseService {
  const client = firebaseClientProvider.initializeApp(FIREBASE_CLIENT);

  const admin = firebaseAdminProvider.initializeApp({
    credential: firebaseAdminProvider.credential.cert(FIREBASE_CREDENTIALS),
    databaseURL: FIREBASE_CREDENTIALS.databaseURL,
    storageBucket: "learnistic-production.appspot.com",
  });

  console.log("Firebase service initialized!");

  const db = getFirestore();

  const storage = admin.storage();

  const firebaseSerive: FirebaseService = {
    client,
    auth,
    db,
    admin,
    storage,
  };

  return firebaseSerive;
}
