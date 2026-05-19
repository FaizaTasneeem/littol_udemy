import { userStore } from "../store/AppStore";
import { useNavigate } from "react-router-dom";

import { createCourse, getAllCourses } from "../services/courseService";
import CourseForm from "./CourseForm";
import CourseDetails from "../pages/CourseDetails";


function CreateCourse() {
    const navigate = useNavigate();

    const {accessToken} = userStore();
    
    async function handleCourseSubmit(event) {
        event.preventDefault();
        const course = new FormData(event.target);
        try {
            const response = await createCourse(course, accessToken);
            console.log("Course created successfully", response.data.message);
            navigate(`/courseDetails/${response.data.course._id}`);
        }
        catch(err) {
            console.log("Error creating course ", err);
        }
    }


    return (
        <div className="flex flex-col">
            <form onSubmit={handleCourseSubmit} className="w-full p-4 bg-white rounded-lg flex flex-col">
                <CourseForm formHeader={"Create New Course"}/>
            </form>
        </div>
    )
}

export default CreateCourse
