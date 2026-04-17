import { courseStore, updateCourseModalStore } from "../store/AppStore";

function CourseUpdateButton({id}) {
  const {courseList} = courseStore();
  const {setShowModal, setCourseToUpdate} = updateCourseModalStore();
  

  function handleCourseUpdate() {
    setShowModal(true);
    const courseToUpdate = courseList.flatMap(page => page.filter(course => course._id === id))?.[0];
    setCourseToUpdate(courseToUpdate);
  }

  return (
    <button onClick={handleCourseUpdate} className="absolute bg-gray-300 top-0 right-10 rounded px-2 cursor-pointer">U</button>
  )
}

export default CourseUpdateButton