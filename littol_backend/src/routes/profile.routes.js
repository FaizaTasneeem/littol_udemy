import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getProfile, editProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/profile", authenticateToken, getProfile);
router.put("/edit-profile", authenticateToken, editProfile);

export default router;
