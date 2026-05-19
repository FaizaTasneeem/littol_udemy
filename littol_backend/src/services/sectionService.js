import { sectionRepository } from "../repositories/sectionRepository.js";

export const sectionService = {
    async getAllSectionsForACourse(courseId){
        if (!courseId) {
            const error = new Error("Course ID required!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const sections = await sectionRepository.findSections({ courseId });
        return { sections, message: `All sections for course - ${courseId} fetched successfully !` };
    },

    async createSection(sectionObj){
        if (!sectionObj.title || !sectionObj.order || !sectionObj.courseId) {
            const error = new Error("All section fields are required to create a section!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const oldSection = await sectionRepository.findSection({ title: sectionObj.title, courseId: sectionObj.courseId });
        if (oldSection) {
            const error = new Error("Section already exists !");
            error.code = "CONFLICT_ERROR";
            throw error;
        }
        const section = await sectionRepository.create(sectionObj);
        return {section, message: "Section created successfully !"};
    },

    async updateSection({ sectionId, updates }){
        if(!sectionId || !updates) {
            const error = new Error("Section ID and Updates are required to update a section!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const section = await sectionRepository.findSection({ _id: sectionId });
        if(!section) {
            const error = new Error("Section not found !");
            error.code = "NOT_FOUND";
            throw error;
        }
        const updatedSection = await sectionRepository.update({ _id: sectionId }, updates);
        return { updatedSection, message:`Section with ID - ${updatedSection._id} updated successfully !` }
    },

    async deleteSection(sectionId){
        if(!sectionId) {
            const error = new Error("Section ID is required to delete a section!");
            error.code = "VALIDATION_ERROR";
            throw error;
        }
        const section = await sectionRepository.findSection({ _id: sectionId });
        if(!section) {
            const error = new Error("Section not found !");
            error.code = "NOT_FOUND";
            throw error;
        }
        const deletedSection = await sectionRepository.delete({ _id: sectionId });
        return { deletedSection, message:`Section with ID - ${deletedSection._id} deleted successfully !`}
    },

};