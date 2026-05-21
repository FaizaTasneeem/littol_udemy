import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload_lessons } from "../middlewares/fileUpload.middleware.js";
import { getLessons, createLesson, updateLesson, deleteLesson } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/getLessons", getLessons);
router.post("/createLesson/", authenticateToken, upload_lessons.single('videoUrl'), createLesson);
router.put("/updateLesson/:id", authenticateToken, upload_lessons.single('videoUrl'), updateLesson);
router.delete("/deleteLesson/:id", authenticateToken, deleteLesson);

export default router;