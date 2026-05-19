import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getSections, createSection, updateSection, deleteSection } from "../controllers/sectionController.js";

const router = express.Router();

router.get("/getSections", getSections);
router.post("/createSection/", authenticateToken, createSection);
router.put("/updateSection/:id", authenticateToken, updateSection);
router.delete("/deleteSection/:id", authenticateToken, deleteSection);

export default router;