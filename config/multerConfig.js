import multer from "multer";
import bucket from "./firebaseConfig.js"; // Pastikan Anda mengimpor bucket yang telah dikonfigurasi
import { v4 as uuidv4 } from "uuid"; // Untuk menghasilkan ID unik

const storage = multer.memoryStorage(); // Gunakan memoryStorage untuk menyimpan file di memori

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

// Middleware untuk meng-upload file ke Firebase Cloud Storage
const uploadToFirebase = async (req, res, next) => {
  if (!req.file) return next();

  const token = uuidv4(); // Buat token unik

  const blob = bucket.file(`images/${uuidv4()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: token, // Tambahkan token di sini
      },
    },
  });

  blobStream.on("error", (error) => {
    next(error);
  });

  blobStream.on("finish", async () => {
    // URL dengan download token yang valid
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(blob.name)}?alt=media&token=${token}`;

    // Simpan URL ke dalam req untuk digunakan di controller
    req.imageUrl = imageUrl;
    next();
  });

  blobStream.end(req.file.buffer);
};

export { upload, uploadToFirebase };
