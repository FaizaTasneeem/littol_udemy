import { catchAsync } from "../middlewares/catchAsync.js";
import { lessonService } from "../services/lessonService.js";

export const getLessons = catchAsync(async (req, res) => {
    const { sectionId } = req.query;
    const { lessons, message } = await lessonService.getAllLessonsForASection(sectionId);
    return res.status(200).json({ lessons, message });
});

export const createLesson = catchAsync(async (req, res) => {
    const lessonObj = {...req.body, videoUrl: req.file?.path.replace(/\\/g,'/')};
    const { lesson, message } = await lessonService.createLesson(lessonObj);
    return res.status(200).json({ lesson, message });
});

export const updateLesson = catchAsync(async (req, res) => {
    const lessonId = req.params.id;
    const updates = {...req.body, videoUrl: req.file?.path.replace(/\\/g,'/')};
    const { updatedLesson, message } = await lessonService.updateLesson({ lessonId, updates });
    return res.status(200).json({ updatedLesson, message });
});

export const deleteLesson = catchAsync(async (req, res) => {
    const lessonId = req.params.id;
    const { deletedLesson, message } = await lessonService.deleteLesson(lessonId);
    return res.status(200).json({ deletedLesson, message });
});
