import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Meniru __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ke folder tempat menyimpan gambar
const dir1 = path.join(__dirname, "../tmp");
const dir2 = path.join(__dirname, "/tmp");

// Membuat folder jika belum ada
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Pastikan kedua direktori ada
ensureDirectoryExistence(dir1);
ensureDirectoryExistence(dir2);

// Konfigurasi storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pilih direktori berdasarkan ketersediaan
    const dirToUse = fs.existsSync(dir1) ? dir1 : dir2;
    cb(null, dirToUse);
  },
  filename: (req, file, cb) => {
    const uniqueData =
      new Date().toISOString().split("T")[0] + "_" + Math.random();
    const split = file.originalname.split(".");
    const format = split[split.length - 1];
    cb(null, file.fieldname + "_" + uniqueData + "." + format);
  },
});

// Konfigurasi multer dengan batas ukuran dan jenis file
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diperbolehkan"), false);
    }
  },
});

export default upload;
