import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { register, login, refresh, logout } from "../controllers/authController.js";
import { profile, editProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/profile", authenticateToken, profile);
router.put("/edit-profile", authenticateToken, editProfile);

export default router;
