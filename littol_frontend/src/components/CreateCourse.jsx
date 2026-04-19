import { userStore, courseStore } from "../store/AppStore";
import { createCourse, getAllCourses } from "../services/courseService";
import CourseForm from "./CourseForm";

function CreateCourse() {
    const {accessToken} = userStore();
    const {page, setCourseList} = courseStore();
    
    async function handleCourseSubmit(event) {
        event.preventDefault();
        const course = new FormData(event.target);
        try {
            const response = await createCourse(course, accessToken);
            const responseAfterCreate = await getAllCourses(page, 3, accessToken);
            setCourseList(responseAfterCreate.data.courses);
            console.log("Course created successfully", response.data.message);
        }
        catch(err) {
            console.log("Error creating course ", err);
        }
    }


    return (
        <form onSubmit={handleCourseSubmit} className="w-full bg-gray-100 rounded-lg flex flex-col">
            <CourseForm/>
        </form>
    )
}

export default CreateCourse
