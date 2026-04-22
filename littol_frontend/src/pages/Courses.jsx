import { useState, useEffect } from "react";
import { userStore, courseStore, updateCourseModalStore } from "../store/AppStore";
import SearchCourses from "../components/SearchCourses";
import CreateCourse from "../components/CreateCourse";
import Course from "../components/Course";
import { getAllCourses } from "../services/courseService";
import CourseUpdateModal from "../components/CourseUpdateModal";
import NextAndPrevButton from "../components/NextAndPrevButton";

function Courses() {
  const {accessToken} = userStore();
  const {page, totalPages, setTotalPages, courseList, setCourseList, filteredCourseList} = courseStore();
  const {showModal} = updateCourseModalStore();
  const [createCourseClicked, setCreateCourseClicked] = useState(false);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await getAllCourses(page, 3, accessToken);
        setCourseList([...response.data.courses]);
        setTotalPages(response.data.totalPages);
        console.log("totalPages ", totalPages, "page ", page);
      }
      catch(err) {
        console.log("Error fetching all courses ", err);
      }
    }
    getCourses();
  }, [page]);

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

        <div className={`w-full p-4 mt-10 flex flex-col bg-gray-100 rounded-lg transition-all duration-700 ${showModal ? 'blur-sm' : '' } ${createCourseClicked ? 'translate-y-2' : 'translate-y-0'}`}>
          <h1 className="ml-8 p-4 font-medium text-xl">All list -</h1>
          <div className="flex flex-row justify-center gap-10">
            {courseList.map((val) => {
              return <Course key={val._id} id={val._id} title={val.title} description={val.description} instructor={val.instructor} category={val.category} level={val.level} thumbnailFilePath={val.thumbnailFilePath} rating={val.rating}/>
            })}
          </div>
          <NextAndPrevButton mainList={true} />
        </div>

        {filteredCourseList.length !== 0 && <div className={`w-full p-4 mt-10 flex flex-col bg-gray-100 rounded-lg transition-all duration-700 ${showModal ? 'blur-sm' : '' } ${createCourseClicked ? 'translate-y-2' : 'translate-y-0'}`}>
          <h1 className="ml-8 p-4 font-medium text-xl">Filtered List -</h1>
          <div className="flex flex-row justify-center gap-10">
            {filteredCourseList.map((val) => {
              return <Course key={val._id} id={val._id} title={val.title} description={val.description} instructor={val.instructor} category={val.category} level={val.level} thumbnailFilePath={val.thumbnailFilePath} rating={val.rating}/>
            })}
          </div>
          <NextAndPrevButton mainList={false} />
        </div>}
        
        {showModal && <CourseUpdateModal/>}

      </div>
    </div>
  )
}

export default Courses