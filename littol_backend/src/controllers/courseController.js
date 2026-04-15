import { catchAsync } from "../middlewares/catchAsync.js";
import { courseService } from "../services/courseService.js";

export const getAllCourses = catchAsync(async (req, res) => {
    const { courses, message } = await courseService.getAllCourses();
    return res.status(200).json({ courses, message });
});

export const getCoursesFiltered = catchAsync(async (req, res) => {
    const { page, limit } = req.query;
    const { courses, totalPages, message } = await courseService.getCoursesFiltered(page, limit);
    return res.status(200).json({ courses, totalPages, message });
});

export const getCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const { course, message } = await courseService.getCourse({ courseId });
    return res.status(200).json({ course, message });
});

export const createCourse = catchAsync(async (req, res) => {
    const courseObj = req.file ? {...req.body, thumbnailFilePath: req.file.path.replace(/\\/g,'/') }: req.body;
    const { course, message } = await courseService.createCourse(courseObj);
    return res.status(200).json({ course, message });
});

export const updateCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const updates = req.body
    const { updatedCourse, message } = await courseService.updateCourse({ courseId, updates });
    return res.status(200).json({ updatedCourse, message });
});

export const deleteCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const { deletedCourse, message } = await courseService.deleteCourse({ courseId });
    return res.status(200).json({ deletedCourse, message });
});

export const searchCourse = catchAsync(async (req, res) => {
    const query = req.query.q;
    const { searchResultsSuggestion, message } = await courseService.searchCourse({ query });
    return res.status(200).json({ searchResultsSuggestion, message });
});