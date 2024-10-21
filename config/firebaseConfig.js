import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://my-project-a764c.appspot.com",
});

const bucket = admin.storage().bucket();

export default bucket;
