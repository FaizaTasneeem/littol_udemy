import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload_lessons } from "../middlewares/fileUpload.middleware.js";
import { getLessons, getLesson, createLesson, updateLesson, deleteLesson } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/getLessons", authenticateToken, getLessons);
router.get("/getLesson/:id", authenticateToken, getLesson);
router.post("/createLesson/", authenticateToken, upload_lessons.single('videoUrl'), createLesson);
router.put("/updateLesson/:id", authenticateToken, upload_lessons.single('videoUrl'), updateLesson);
router.delete("/deleteLesson/:id", authenticateToken, deleteLesson);

export default router;