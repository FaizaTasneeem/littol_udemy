import { useState } from 'react';
import { updateCourse, getAllCourses } from "../services/courseService";
import { courseStore, userStore } from "../store/AppStore";
import Modal from './Modal';

function CourseUpdateButton({id}) {
  const {accessToken} = userStore();
  const {setCourseList, showModal, setShowModal} = courseStore();

  function handleCourseUpdate() {
    setShowModal(!showModal);
  }

  async function sendCourseUpdateRequest() {
    try {
      const response = await updateCourse(id, accessToken);
      console.log(response.data.updatedCourse);
      // const courseListAfterUpdate = courseList.filter(item => item._id !== id);
      // setCourseList(courseListAfterUpdate);
      const response_after_update = await getAllCourses(accessToken);
      setCourseList(response_after_update.data.courses);
      console.log("Course updated successfully", response.data.message);
    }
    catch (err) {
      console.log("Error updating course ", err);
    }
  }

  return (
    <>
      <button onClick={handleCourseUpdate} className="absolute bg-gray-300 top-0 right-10 rounded px-2 cursor-pointer">U</button>

    </>
  )
}

export default CourseUpdateButton