import express from "express";
import {
  register,
  login,
  getUsers,
  getAllUsers,
  updateUser,
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
router.put("/updateUser", authMiddleware, adminMiddleware, updateUser);

export default router;
