import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Meniru __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke folder tempat menyimpan gambar
const imagesDir = path.join(__dirname, "../resource/images");

// Membuat folder jika belum ada
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Konfigurasi storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueData =
      new Date().toISOString().split("T")[0] + "_" + Math.random();
    const split = file.originalname.split(".");
    const format = split[split.length - 1];
    cb(null, file.fieldname + "_" + uniqueData + "." + format);
  },
});

const fileFilter = (req, file, cb) => {
  // Hanya izinkan file dengan tipe berikut (MIME types)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Lolos filter
  } else {
    cb(new Error("Hanya file gambar yang diperbolehkan!"), false); // Tolak file
  }
};

// Konfigurasi multer dengan batas ukuran dan jenis file
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Maksimum ukuran file 2MB
  },
  fileFilter: fileFilter,
});

export default upload;
