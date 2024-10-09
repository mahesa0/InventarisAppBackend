import express from "express";
import {
  register,
  login,
  getUsers,
  getAllUsers,
  updateProfile,
  updateById,
  deleteProfile,
  deleteById,
  logout,
} from "../controllers/UserController.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/UserMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getUsers);
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);
router.put("/updateProfile", authMiddleware, adminMiddleware, updateProfile);
router.put("/:id", authMiddleware, adminMiddleware, updateById);
router.delete("/deleteProfile", authMiddleware, deleteProfile);
router.delete("/:id", authMiddleware, adminMiddleware, deleteById);

export default router;
