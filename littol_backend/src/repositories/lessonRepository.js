import Lesson from "../models/Lesson.js";

export const LessonRepository = {
    async findLesson(filter) {
        const lesson = await Lesson.findOne(filter);
        return lesson;
    },

    async findLessons(filter) {
        const lessons = await Lesson.find(filter);
        return lessons;
    },
    
    async create(lessonInfo) {
        const newLesson = new Lesson(lessonInfo);
        await newLesson.save();
        return newLesson;
    },
    
    async update(filter, updates) {
        const lesson = await Lesson.findOneAndUpdate(
            filter,
            {$set: updates},
            { new: true, runValidators: true }
        )
        return lesson;
    },

    async delete(filter) {
        const deletedLesson = await Lesson.findOneAndDelete(filter);
        return deletedLesson;
    },
    
}