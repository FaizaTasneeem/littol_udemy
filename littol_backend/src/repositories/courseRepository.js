import Course from "../models/Course.js";

export const courseRepository = {
    async findCourses() {
        const courses = await Course.find({});
        return courses;
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
    }
}