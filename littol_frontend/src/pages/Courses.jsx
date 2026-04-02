import { useState } from "react";
import SearchCourses from "../components/SearchCourses";
import CreateCourse from "../components/CreateCourse";
import CoursesList from "../components/CoursesList";

function Courses() {
  const [createCourseClicked, setCreateCourseClicked] = useState(false);


  return (
    <div className="w-full p-14 flex flex-col items-start justify-start">
      
      <div className="w-full flex flex-row justify-between">
        <h1 className="font-medium text-3xl">All Courses</h1>
        <button className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg px-4 text-white cursor-pointer" onClick={() => {setCreateCourseClicked(!createCourseClicked)}}>+ Create Course</button>
      </div>
      <p className="pt-2 text-gray-500 text-lg">Explore our comprehensive course catalog</p>

      <SearchCourses />
      {createCourseClicked && <CreateCourse />}

      <div className="w-full flex flex-row">
        <CoursesList/>
      </div>
    </div>
  )
}

export default Courses