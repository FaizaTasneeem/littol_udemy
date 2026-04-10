import { useState, useEffect } from "react";
import { courseStore, userStore } from "../store/AppStore";
import SearchCourses from "../components/SearchCourses";
import CreateCourse from "../components/CreateCourse";
import Course from "../components/Course";
import { getAllCourses } from "../services/courseService";

function Courses() {
  const {accessToken} = userStore();
  const {courseList, setCourseList} = courseStore();
  const [filteredCourseList, setFilteredCourseList] = useState(courseList);
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
    <div className="w-full p-14 flex flex-col items-start justify-start">
      
      <div className="w-full flex flex-row justify-between">
        <h1 className="font-medium text-3xl">All Courses</h1>
        <button className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg px-4 text-white cursor-pointer" onClick={() => {setCreateCourseClicked(!createCourseClicked)}}>+ Create Course</button>
      </div>
      <p className="pt-2 text-gray-500 text-lg">Explore our comprehensive course catalog</p>

      <SearchCourses setFilteredCourseList={setFilteredCourseList} />
      {createCourseClicked && <CreateCourse />}

      <div className="w-full mt-10 flex flex-row justify-center flex-wrap gap-10 bg-gray-100 rounded-lg">
        {filteredCourseList.length !== 0 && filteredCourseList.map((val) => {
          return <Course key={val._id} id={val._id} title={val.title} description={val.description} instructor={val.instructor} category={val.category} level={val.level} thumbnailFilePath={val.thumbnailFilePath} rating={val.rating}/>
        })}
      </div>
    </div>
  )
}

export default Courses