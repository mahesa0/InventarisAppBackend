import express from "express";
import {
  getCategory,
  postCategory,
  getProductByCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/UserMiddleware.js";

router.get("/", authMiddleware, getCategory);
router.get("/:id", authMiddleware, getProductByCategory);
router.post("/", authMiddleware, adminMiddleware, postCategory);

export default router;
