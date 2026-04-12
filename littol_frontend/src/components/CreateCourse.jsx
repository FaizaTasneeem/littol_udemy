import { userStore, courseStore } from "../store/AppStore";
import { createCourse } from "../services/courseService";
import CourseForm from "./CourseForm";

function CreateCourse() {
    const {accessToken} = userStore();
    const {courseList, setCourseList} = courseStore();
    
    async function handleCourseSubmit(event) {
        event.preventDefault();
        const course = new FormData(event.target);
        try {
            const response = await createCourse(course, accessToken);
            setCourseList([...courseList, response.data.course]);
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
