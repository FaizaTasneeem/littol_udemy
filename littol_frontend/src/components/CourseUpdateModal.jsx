import { userStore, courseStore, updateCourseModalStore } from '../store/AppStore'
import { updateCourse, getAllCourses } from "../services/courseService";
import CourseForm from './CourseForm';

function CourseUpdateModal() {
  const {accessToken} = userStore();
  const {page, setCourseList} = courseStore();
  const {courseToUpdate, setShowModal} = updateCourseModalStore();

  async function handleCourseUpdateSubmit(event) {
    event.preventDefault();
    const course = new FormData(event.target);
    await sendCourseUpdateRequest(course);
    setShowModal(false);
  }
  
  async function sendCourseUpdateRequest(course) {
    try {
      const response = await updateCourse(courseToUpdate._id, course, accessToken);
      console.log(response.data.updatedCourse);
      const responseAfterUpdate = await getAllCourses(page, 3, accessToken);
      setCourseList(responseAfterUpdate.data.courses);
      console.log("Course updated successfully", response.data.message);
    }
    catch (err) {
      console.log("Error updating course ", err);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
        <form onSubmit={handleCourseUpdateSubmit} key={courseToUpdate?._id} className="h-1/2 overflow-y-auto w-1/2 p-6 border border-gray-400 bg-gray-100 mt-16 rounded-xl flex flex-col relative">
            <div onClick={() => setShowModal(false)} className="absolute px-2 border rounded top-2 right-4 cursor-pointer">X</div>
            <CourseForm formHeader={"Update Course"} courseToUpdate={courseToUpdate}/>
        </form>

    </div>
  )
}

export default CourseUpdateModal