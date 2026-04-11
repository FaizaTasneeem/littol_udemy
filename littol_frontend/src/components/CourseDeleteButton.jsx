import { deleteCourse, getAllCourses } from "../services/courseService";
import { courseStore, userStore } from "../store/AppStore";

function CourseDeleteButton({id}) {
  const {accessToken} = userStore();
  const {setCourseList} = courseStore();

  async function handleCourseDelete() {
    try {
      const response = await deleteCourse(id, accessToken);
      console.log(response.data.deletedCourse);
      // const courseListAfterDelete = courseList.filter(item => item._id !== id);
      // setCourseList(courseListAfterDelete);
      const response_after_delete = await getAllCourses(accessToken);
      setCourseList(response_after_delete.data.courses);
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