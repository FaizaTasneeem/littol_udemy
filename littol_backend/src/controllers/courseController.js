import { catchAsync } from "../middlewares/catchAsync.js";
import { courseService } from "../services/courseService.js";

export const getCourses = catchAsync(async (req, res) => {
    const { page, limit } = req.query;
    const { courses, totalPages, message } = await courseService.getCourses(page, limit);
    return res.status(200).json({ courses, totalPages, message });
});

export const getCourse = catchAsync(async (req, res) => {
    const courseId = req.params.id;
    const { course, message } = await courseService.getCourse({ courseId });
    return res.status(200).json({ course, message });
});

export const createCourse = catchAsync(async (req, res) => {
    const courseObj = {...req.body, thumbnailFilePath: req.file?.path.replace(/\\/g,'/') };
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

export const filterCourse = catchAsync(async (req, res) => {
    const { filter, page, limit } = req.query;
    const parsedFilter = JSON.parse(filter);
    const { filterResults, totalFilterPages, message } = await courseService.filterCourse(parsedFilter, page, limit);
    return res.status(200).json({ filterResults, totalFilterPages, message });
});