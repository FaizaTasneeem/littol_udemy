import Course from "../models/Course";

export const courseRepository = {
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
    
    async findByCourseProperty(filter) {
        const course = await Course.findOne(filter) || null;
        return course;
    },
}