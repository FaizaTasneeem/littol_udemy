import { catchAsync } from "../middlewares/catchAsync";
import { courseService } from "../services/courseService";

export const getCourses = catchAsync(async (req, res) => {

});

export const getCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const { course, message } = await courseService.getCourse({ courseId });
    return res.status(200).json({ course, message });
});

export const createCourse = catchAsync(async (req, res) => {
    const courseObj = req.body;
    const { course, message } = await courseService.createCourse(courseObj);
    return res.status(200).json({ course, message });
});

export const updateCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const updates = req.body
    const { course, message } = await courseService.updateCourse({ courseId, updates });
    return res.status(200).json({ course, message });
});

export const deleteCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const { course, message } = await courseService.deleteCourse({ courseId });
    return res.status(200).json({ course, message });
});