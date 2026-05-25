import { courseRepository } from "../repositories/courseRepository.js";
import { sectionService } from "./sectionService.js";

export const courseService = {
    async getCourses(page, limit){
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if(
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1
        ) {
            const error = new Error("Page and limit must be positive integers !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const skip = (pageNumber - 1) * limitNumber;
        const [courses, totalCourses] = await courseRepository.findCourses(skip, limitNumber);
        const totalPages = Math.ceil(totalCourses / limitNumber);
        return { courses, totalPages, message: `All Courses for page - ${pageNumber} fetched successfully !` };
    },

    async getCourse({ courseId }){
        if(!courseId) {
            const error = new Error("Course ID is required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const course = await courseRepository.findOneCourse({ _id: courseId });
        if(!course) {
            const error = new Error("Course not found !");
            error.code = "NOT_FOUND";
            throw error;
        }
        return { course, message:`Course with ID - ${course._id} fetched successfully !` };
    },

    async createCourse(courseObj){
        if (!courseObj) {
            const error = new Error("All Course fields are required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const oldCourse = await courseRepository.findOneCourse({ title: courseObj.title });
        if (oldCourse) {
            const error = new Error("Course already exists !");
            error.code = "CONFLICT_ERROR";
            throw error;
        }
        const course = await courseRepository.create({...courseObj});
        return {course, message: "Course created successfully !"};
    },

    async updateCourse({ courseId, updates }){
        if(!courseId || !updates) {
            const error = new Error("Course ID and Updates are required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const course = await courseRepository.findOneCourse({ _id: courseId });
        if(!course) {
            const error = new Error("Course not found !");
            error.code = "NOT_FOUND";
            throw error;
        }
        const updatedCourse = await courseRepository.update({ _id: courseId }, updates);
        return { updatedCourse, message:`Course with ID - ${updatedCourse._id} updated successfully !` }
    },

    async deleteCourse({ courseId }){
        if(!courseId) {
            const error = new Error("Course ID is required !");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const course = await courseRepository.findOneCourse({ _id: courseId });
        if(!course) {
            const error = new Error("Course not found !");
            error.code = "NOT_FOUND";
            throw error;
        }

        const { sections } = await sectionService.getAllSectionsForACourse(courseId);

        await Promise.all(
            sections.map((section) => section.deleteSection(section._id))
        );
        
        const deletedCourse = await courseRepository.delete({ _id: courseId });

        return { deletedCourse, message:`Course with ID - ${deletedCourse._id} deleted successfully !`}
    },

    async searchCourse({ query }){
        if(!query) {
            const error = new Error("Query is required !");
            error.code = "BAD_REQUEST";
            throw error;
        }
        const searchResultsSuggestion = await courseRepository.searchCourse({ query });
        return { searchResultsSuggestion, message:`Search Results Suggestions sent successfully !`}
    },

    async filterCourse(filter, page, limit){
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if(!filter) {
            const error = new Error("Filter is required !");
            error.code = "BAD_REQUEST";
            throw error;
        }

        if(
            !Number.isInteger(pageNumber) ||
            !Number.isInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1
        ) {
            const error = new Error("Page and limit must be positive integers !");
            error.code = "BAD_REQUEST";
            throw error;
        }
        const skip = (pageNumber - 1) * limitNumber;
        const [filterResults, totalFilterResults] = await courseRepository.filterCourse(filter, skip, limitNumber);
        const totalFilterPages = Math.ceil(totalFilterResults / limitNumber);
        return { filterResults, totalFilterPages, message:`Filter Results sent successfully !`}
    }
};