import { deleteCourse, getCoursesFiltered } from "../services/courseService";
import { courseStore, userStore } from "../store/AppStore";

function CourseDeleteButton({id}) {
  const {accessToken} = userStore();
  const {page, filteredCourseList, setFilteredCourseList} = courseStore();

  async function handleCourseDelete() {
    try {
      const response = await deleteCourse(id, accessToken);
      console.log(response.data.deletedCourse);
      const responseAfterDelete = await getCoursesFiltered(page, 3, accessToken);
      const deleted = filteredCourseList.map((arr, idx) => 
        idx === page - 1 ? responseAfterDelete.data.courses : arr
      );
      setFilteredCourseList(deleted);
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