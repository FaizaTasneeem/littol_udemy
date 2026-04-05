import { useContext } from "react";
import { deleteCourse } from "../services/courseService";
import { CourseContext, UserContext } from "../context/AppContext";

function CourseDeleteButton({id}) {
  const {accessToken} = useContext(UserContext);
  const {courseList, setCourseList} = useContext(CourseContext);

  async function handleCourseDelete() {
    try {
      const response = await deleteCourse(id, accessToken);
      console.log(response.data.deletedCourse);
      const courseListAfterDelete = courseList.filter(item => item._id !== id);
      setCourseList(courseListAfterDelete);
      console.log("Course deleted successfully", response.data.message);
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