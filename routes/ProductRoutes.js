import express from "express";
import { upload, uploadToFirebase } from "../config/multerConfig.js";

import {
  getProducts,
  getProductsById,
  postProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/UserMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.get("/:productName", authMiddleware, getProductsById);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadToFirebase,
  postProducts
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadToFirebase,
  updateProduct
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
