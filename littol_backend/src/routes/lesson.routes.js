import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getLessons, createLesson, updateLesson, deleteLesson } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/getLessons", getLessons);
router.post("/createLesson/", authenticateToken, createLesson);
router.put("/updateLesson/:id", authenticateToken, updateLesson);
router.delete("/deleteLesson/:id", authenticateToken, deleteLesson);

export default router;