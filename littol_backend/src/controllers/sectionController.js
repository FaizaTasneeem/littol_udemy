import { catchAsync } from "../middlewares/catchAsync.js";
import { sectionService } from "../services/sectionService.js";

export const getSections = catchAsync(async (req, res) => {
    const { courseId } = req.query;
    const { sections, message } = await sectionService.getAllSectionsForACourse(courseId);
    return res.status(200).json({ sections, message });
});

export const createSection = catchAsync(async (req, res) => {
    const sectionObj = req.body;
    const { section, message } = await sectionService.createSection(sectionObj);
    return res.status(200).json({ section, message });
});

export const updateSection = catchAsync(async (req, res) => {
    const sectionId = req.params.id;
    const updates = req.body
    const { updatedSection, message } = await sectionService.updateSection({ sectionId, updates });
    return res.status(200).json({ updatedSection, message });
});

export const deleteSection = catchAsync(async (req, res) => {
    const sectionId = req.params.id;
    const { deletedSection, message } = await sectionService.deleteSection(sectionId);
    return res.status(200).json({ deletedSection, message });
});
