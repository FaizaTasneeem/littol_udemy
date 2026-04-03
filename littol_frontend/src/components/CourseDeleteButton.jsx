import { useContext } from "react";
import { deleteCourse } from "../services/courseService";
import { UserContext } from "../context/AppContext";

function CourseDeleteButton({id}) {
  const {accessToken} = useContext(UserContext);

  async function handleCourseDelete() {
    try {
      const response = await deleteCourse(id, accessToken);
      console.log("Course created successfully", response.data.message);
    }
    catch (err) {
      console.log("Error deleting course ", err);
    }
  }

  return (
    <button onClick={handleCourseDelete} className="absolute bg-gray-300 top-0 right-2 rounded px-2 cursor-pointer">D</button>
  )
}

export default CourseDeleteButton