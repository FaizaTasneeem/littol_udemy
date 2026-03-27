import { courseRepository } from "../repositories/courseRepository.js";

export const courseService = {
    async getCourses(){
        
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
            error.code = "";
            throw error;
        }
        const oldCourse = await courseRepository.findOneCourse({ _id: courseObj._id });
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
        return { course, message:`Course with ID - ${updatedCourse._id} updated successfully !` }
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

    }

};