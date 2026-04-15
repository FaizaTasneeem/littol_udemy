import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload_courses } from "../middlewares/fileUpload.middleware.js";
import { getAllCourses, getCoursesFiltered, getCourse, createCourse, updateCourse, deleteCourse, searchCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get("/getAllCourses", getAllCourses);
router.get("/getCoursesFiltered", getCoursesFiltered);
router.get("/getCourse/:id", authenticateToken, getCourse);
router.post("/createCourse/", authenticateToken, upload_courses.single('thumbnail'), createCourse);
router.put("/updateCourse/:id", authenticateToken, upload_courses.single('thumbnail'), updateCourse);
router.delete("/deleteCourse/:id", authenticateToken, deleteCourse);
router.get("/searchCourse", authenticateToken, searchCourse);

export default router;