import { useState, useEffect } from "react";
import { userStore, courseStore, updateCourseModalStore } from "../store/AppStore";
import SearchCourses from "../components/SearchCourses";
import CreateCourse from "../components/CreateCourse";
import Course from "../components/Course";
import { getAllCourses } from "../services/courseService";
import CourseUpdateModal from "../components/CourseUpdateModal";

function Courses() {
  const {accessToken} = userStore();
  const {courseList, setCourseList, filteredCourseList, setFilteredCourseList} = courseStore();
  const {showModal} = updateCourseModalStore();
  const [createCourseClicked, setCreateCourseClicked] = useState(false);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await getAllCourses(accessToken);
        setCourseList([...response.data.courses]);
        setFilteredCourseList([...response.data.courses]);
        console.log(response.data.courses);
        console.log(response.data.message);
      }
      catch(err) {
        console.log("Error fetching all courses ", err);
      }
    }

    getCourses();
  }, []);

  useEffect(() => {
    setFilteredCourseList(courseList);
  }, [courseList]);

  return (
    <div className="w-full">
      <div className="w-full p-14 flex flex-col items-start justify-start">

        <div className="w-full flex flex-row justify-between">
          <h1 className="font-medium text-3xl">All Courses</h1>
          <button className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg px-4 text-white cursor-pointer" onClick={() => {setCreateCourseClicked(!createCourseClicked)}} aria-expanded={createCourseClicked} aria-controls="create-course-panel">+ Create Course</button>
        </div>
        <p className="pt-2 text-gray-500 text-lg">Explore our comprehensive course catalog</p>

        <SearchCourses />

        <div id="create-course-panel" className={`w-full overflow-hidden bg-gray-100 rounded-lg transition-all duration-700 ${showModal ? 'blur-sm' : '' } ${createCourseClicked ? 'mt-10 max-h-[700px] opacity-100' : 'mt-0 max-h-0 opacity-0 pointer-events-none'}`}>
          <CreateCourse />
        </div>

        <div className={`w-full p-4 mt-10 flex flex-row justify-center flex-wrap gap-10 bg-gray-100 rounded-lg transition-all duration-700 ${showModal ? 'blur-sm' : '' } ${createCourseClicked ? 'translate-y-2' : 'translate-y-0'}`}>
          {filteredCourseList.length !== 0 && filteredCourseList.map((val) => {
            return <Course key={val._id} id={val._id} title={val.title} description={val.description} instructor={val.instructor} category={val.category} level={val.level} thumbnailFilePath={val.thumbnailFilePath} rating={val.rating}/>
          })}
        </div>
        
        {showModal && <CourseUpdateModal/>}

      </div>
    </div>
  )
}

export default Courses