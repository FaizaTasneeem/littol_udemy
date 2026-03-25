import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { profile, editProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/profile", authenticateToken, profile);
router.put("/edit-profile", authenticateToken, editProfile);

export default router;
