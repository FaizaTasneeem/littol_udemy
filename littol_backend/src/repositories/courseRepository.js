import Course from "../models/Course.js";

export const courseRepository = {
    async findCourses(skip, limit) {
        const [courses, totalCourses] = await Promise.all([
            Course.find().sort({ _id: -1 }).skip(skip).limit(limit),
            Course.countDocuments()
        ]);
        return [courses, totalCourses];
    },

    async findOneCourse(filter) {
        const course = await Course.findOne(filter) || null;
        return course;
    },

    async create(courseData) {
        const newCourse = new Course({...courseData});
        await newCourse.save();
        return newCourse;
    },
    
    async update(filter, updates) {
        const course = await Course.findOneAndUpdate(
            filter,
            {$set: updates},
            { new: true, runValidators: true }
        )
        return course;
    },

    async delete(filter) {
        const deletedCourse = await Course.findOneAndDelete(filter);
        return deletedCourse;
    },

    async searchCourse({query}) {
        const searchResultsSuggestion = await Course.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
        return searchResultsSuggestion;
    },

    async filterCourse(filter, skip, limit) {
        const [filterResults, totalFilterResults] = await Promise.all([
            Course.find(filter).sort({ _id: -1 }).skip(skip).limit(limit),
            Course.countDocuments(filter)
        ]);
        return [filterResults, totalFilterResults];
    }
}