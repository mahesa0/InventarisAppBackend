import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resource/images");
  },
  filename: (req, file, cb) => {
    const uniqueData =
      new Date().toISOString().split("T")[0] + "_" + Math.random();
    const split = file.originalname.split(".");
    const format = split[split.length - 1];
    cb(null, file.fieldname + "_" + uniqueData + "." + format);
  },
});

const upload = multer({ storage: storage });

export default upload;
