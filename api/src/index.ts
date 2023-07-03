import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
import { AsyncReturnType } from "type-fest";
import { initArticleController } from "./controller/ArticleController";
import { initAuthController } from "./controller/AuthController";
import {
  ContactController,
  initContactController,
} from "./controller/ContactController";
import { initCourseController } from "./controller/CourseController";
import { initLessonController } from "./controller/LessonController";
import { initMediaManagerController } from "./controller/MediaManagerController";
import { initMenuController } from "./controller/MenuController";
import { initNotificationController } from "./controller/NotificationController";
import { initPlacesController } from "./controller/PlacesController";
import { initTopicController } from "./controller/TopicController";
import { initUploadController } from "./controller/UploadController";
import { initUserController } from "./controller/UserController";
import { initVirtualAppController } from "./controller/VirtualAppController";
import { initDataLoaders } from "./services/DataLoadersService";
import { initEmailService } from "./services/EmailService";
import { initFirebase } from "./services/FirebaseService";
import { initFirebaseStorage } from "./services/FirebaseStorageService";
import { initGraphQLSchema } from "./services/GraphQLSchemaService";
import { initTwilio } from "./services/TwilioService";

let contactController!: ContactController;

let twilio = initTwilio();

let emailService = initEmailService();

let firebase = initFirebase();

let firebaseStorage = initFirebaseStorage({ storage: firebase.storage });

let firestore = firebase.admin.firestore();

let articleController = initArticleController({ firestore });

let courseController = initCourseController({ firestore });

let lessonController = initLessonController({ firestore });

let menuController = initMenuController({ firestore });

let placesController = initPlacesController({ firestore });

let topicsController = initTopicController({ firestore });

let uploadController = initUploadController({ firebaseStorage });

let virtualAppController = initVirtualAppController({ firestore });

let mediaManagerController = initMediaManagerController({ firestore });

let userController = initUserController({
  firestore,
  firebaseAuth: firebase.auth,
  contactController,
  twilio,
  emailService,
  virtualAppController,
});

contactController = initContactController({ firestore, userController });

let authController = initAuthController({
  firebaseAuth: firebase.auth,
  firestore,
  contactController,
  userController,
  virtualAppController,
  firebaseAdmin: firebase.admin,
});

let notificationController = initNotificationController({
  firestore,
});

let controllers = {
  article: articleController,
  course: courseController,
  contact: contactController,
  lesson: lessonController,
  menu: menuController,
  places: placesController,
  topics: topicsController,
  upload: uploadController,
  user: userController,
  virtualApp: virtualAppController,
  auth: authController,
  notification: notificationController,
  mediaManager: mediaManagerController,
};

export type ControllersType = typeof controllers;
export type FirebaseType = ReturnType<typeof initFirebase>;

// Helper function that gets the context, so we can export it from here
async function getContext(event: ExpressContext) {
  const idToken = event.req.headers.authorization?.split("Bearer ")[1];
  let userUid: string | null = null;

  const dataLoaders = initDataLoaders({
    controllers,
  });

  if (idToken) {
    try {
      let idTokenDecoded = await firebase.admin.auth().verifyIdToken(idToken);
      userUid = idTokenDecoded.uid;
    } catch (err) {
      console.log(err);
    }
  }

  return {
    controllers,
    dataLoaders,
    firebase,
    firebaseStorage,
    userUid,
  };
}

export type ContextType = AsyncReturnType<typeof getContext>;

async function run() {
  // For better development, schema should ALWAYS be the first here
  const schema = initGraphQLSchema();

  const app = express();

  const httpServer = http.createServer(app);

  // Apollo server to host
  const server = new ApolloServer({
    schema,
    context: getContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app, path: "/" });

  app.use(cors());
  const PORT = 4000;
  await new Promise<void>((r) => app.listen({ port: PORT }, r));
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
}

run();
