import multer from "multer";
import bucket from "./firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diperbolehkan"), false);
    }
  },
});

const uploadToFirebase = async (req, res, next) => {
  if (!req.file) return next();

  const token = uuidv4();

  const blob = bucket.file(`images/${uuidv4()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  blobStream.on("error", (error) => {
    next(error);
  });

  blobStream.on("finish", async () => {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(blob.name)}?alt=media&token=${token}`;

    req.imageUrl = imageUrl;
    next();
  });

  blobStream.end(req.file.buffer);
};

export { upload, uploadToFirebase };
