import express from "express";
import upload from "../config/multerConfig.js";
// import multer from "multer";

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
router.post("/", upload.single("image"), authMiddleware, postProducts);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
