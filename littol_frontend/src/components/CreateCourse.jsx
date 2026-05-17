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
        <div className="flex flex-col">
            <h1 className="p-6 font-medium text-2xl">Create New Course</h1>
            <hr className="mx-4 pl-6 pr-2 border-gray-300"></hr>
            <form onSubmit={handleCourseSubmit} className="w-full p-4 bg-white rounded-lg flex flex-col">
                <CourseForm/>
            </form>
        </div>
    )
}

export default CreateCourse
