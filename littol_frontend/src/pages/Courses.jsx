import { useState, useEffect } from "react";
import { userStore, courseStore, updateCourseModalStore } from "../store/AppStore";
import SearchCourses from "../components/SearchCourses";
import CreateCourse from "../components/CreateCourse";
import Course from "../components/Course";
import { getAllCourses, getCoursesFiltered } from "../services/courseService";
import CourseUpdateModal from "../components/CourseUpdateModal";

function Courses() {
  const {accessToken} = userStore();
  const {page, setPage, courseList, setCourseList, filteredCourseList, setFilteredCourseList} = courseStore();
  const {showModal} = updateCourseModalStore();
  const [createCourseClicked, setCreateCourseClicked] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getCourses() {
      try {
        if (filteredCourseList.length < page) {
          const response = await getCoursesFiltered(page, 3, accessToken);
          setCourseList([...courseList, response.data.courses]);
          setFilteredCourseList([...filteredCourseList, response.data.courses]);
        }
      }
      catch(err) {
        console.log("Error fetching courses ", err);
      }
    }

    getCourses();
  }, [page]);

  useEffect(() => {
    setFilteredCourseList(courseList);
    console.log("filteredCourseList ", filteredCourseList);
  }, [courseList]);

  
  useEffect(() => {
    setTotalPages(filteredCourseList.length);
  }, [filteredCourseList]);

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
          <div className="px-8 flex flex-row justify-start gap-10">
            {filteredCourseList.length !== 0 && 
              filteredCourseList
              .filter((_, idx) => idx === page-1)
              .flatMap((arr) => {
                return arr.map((val) => {
                  return <Course key={val._id} id={val._id} title={val.title} description={val.description} instructor={val.instructor} category={val.category} level={val.level} thumbnailFilePath={val.thumbnailFilePath} rating={val.rating}/>
                })
              })
            }
          </div>
          
          <div className="mt-2 flex flex-row justify-between">
            <button onClick={() => setPage(page-1)} disabled={page === 1} className="ml-5 shadow rounded-lg p-4 flex items-center mr-2 cursor-pointer bg-[linear-gradient(135deg,rgba(129,122,235,0.42),rgba(168,162,255,0.30))] text-gray-500">{'<<'}</button>
            <button onClick={() => setPage(page+1)} disabled={page === totalPages} className="mr-5 shadow rounded-lg p-4 flex items-center mr-2 cursor-pointer bg-[linear-gradient(135deg,rgba(104,96,232,0.52),rgba(79,70,229,0.36))] text-gray-500">{'>>'}</button>
          </div>
        </div>
        
        {showModal && <CourseUpdateModal/>}

      </div>
    </div>
  )
}

export default Courses