import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AppContext";
import SearchCourses from "../components/SearchCourses";
import CreateCourse from "../components/CreateCourse";
import CoursesList from "../components/CoursesList";
import { getAllCourses } from "../services/courseService";

function Courses() {
  const {accessToken} = useContext(UserContext);
  const [createCourseClicked, setCreateCourseClicked] = useState(false);
  const [courseList, setCourseList] = useState([]);

  
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await getAllCourses(accessToken);
        setCourseList([...response.data.courses]);
        console.log(response.data.courses);
        console.log(response.data.message);
      }
      catch(err) {
        console.log("Error fetching all courses ", err);
      }
    }

    getCourses();
  }, []);

  return (
    <div className="w-full p-14 flex flex-col items-start justify-start">
      
      <div className="w-full flex flex-row justify-between">
        <h1 className="font-medium text-3xl">All Courses</h1>
        <button className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg px-4 text-white cursor-pointer" onClick={() => {setCreateCourseClicked(!createCourseClicked)}}>+ Create Course</button>
      </div>
      <p className="pt-2 text-gray-500 text-lg">Explore our comprehensive course catalog</p>

      <SearchCourses />
      {createCourseClicked && <CreateCourse courseList={courseList} setCourseList={setCourseList}/>}

      <div className="w-full mt-10 flex flex-row flex-wrap gap-8 bg-gray-100 rounded-lg">
        {courseList.length !== 0 && courseList.map((val) => {
          return <CoursesList title={val.title} description={val.description} instructor={val.instructor} category={val.category} level={val.level} thumbnailFilePath={val.thumbnailFilePath} rating={val.rating}/>
        })}
        {/* <CoursesList/>
        <CoursesList/>
        <CoursesList/>
        <CoursesList/> */}
      </div>
    </div>
  )
}

export default Courses