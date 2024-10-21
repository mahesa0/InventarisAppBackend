import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.js"; // Ganti dengan path ke file kunci layanan Anda

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://my-project-a764c.appspot.com", // Ganti dengan nama bucket Anda
});

const bucket = admin.storage().bucket();

export default bucket;
