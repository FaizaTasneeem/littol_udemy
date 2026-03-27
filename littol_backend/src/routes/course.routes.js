import express from express;
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from "../controllers/courseController.js";

const router = express.Router();

router.get("/getCourses", authenticateToken, getCourses);
router.get("/getCourse/:id", authenticateToken, getCourse);
router.post("/createCourse/:id", authenticateToken, createCourse);
router.put("/updateCourse/:id", authenticateToken, updateCourse);
router.delete("/deleteCourse/:id", authenticateToken, deleteCourse);

export default router;