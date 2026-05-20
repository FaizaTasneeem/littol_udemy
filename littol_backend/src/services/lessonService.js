import { lessonRepository } from "../repositories/lessonRepository.js";

export const lessonService = {
    async getAllLessonsForASection(sectionId){
        if (!sectionId) {
            const error = new Error("Course ID required!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const lessons = await lessonRepository.findLessons({ sectionId });
        return { lessons, message: `All Lessons for course - ${sectionId} fetched successfully !` };
    },

    async createLesson(lessonObj){
        if (!lessonObj.title || !lessonObj.order || !lessonObj.sectionId) {
            const error = new Error("All Lesson fields are required to create a Lesson!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const oldLesson = await lessonRepository.findLesson({ title: lessonObj.title, sectionId: lessonObj.sectionId });
        if (oldLesson) {
            const error = new Error("Lesson already exists !");
            error.code = "CONFLICT_ERROR";
            throw error;
        }
        const lesson = await lessonRepository.create(lessonObj);
        return {lesson, message: "Lesson created successfully !"};
    },

    async updateLesson({ lessonId, updates }){
        if(!lessonId || !updates) {
            const error = new Error("Lesson ID and Updates are required to update a Lesson!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const lesson = await lessonRepository.findLesson({ _id: lessonId });
        if(!lesson) {
            const error = new Error("Lesson not found !");
            error.code = "NOT_FOUND";
            throw error;
        }
        const updatedLesson = await lessonRepository.update({ _id: lessonId }, updates);
        return { updatedLesson, message:`Lesson with ID - ${updatedLesson._id} updated successfully !` }
    },

    async deleteLesson(lessonId){
        if(!lessonId) {
            const error = new Error("Lesson ID is required to delete a Lesson!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const lesson = await lessonRepository.findLesson({ _id: lessonId });
        if(!lesson) {
            const error = new Error("Lesson not found !");
            error.code = "NOT_FOUND";
            throw error;
        }
        const deletedLesson = await lessonRepository.delete({ _id: lessonId });
        return { deletedLesson, message:`Lesson with ID - ${deletedLesson._id} deleted successfully !`}
    },

};