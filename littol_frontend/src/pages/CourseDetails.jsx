import { useState, useEffect } from "react";
import { userStore } from "../store/AppStore";
import { useParams } from 'react-router-dom'
import { getCourse } from "../services/courseService";
import CourseDetailsBasicInfo from "../components/CourseDetailsBasicInfo";
import CourseDetailsCourseContents from "../components/CourseDetailsCourseContents";

function CourseDetails() {
  const {accessToken} = userStore();
  const {id} = useParams();
  const [courseDetails, setCourseDetails] = useState({}); 

  useEffect(() => {
    async function sendGetCourseRequest() {
      try {
        const response = await getCourse(id, accessToken);
        setCourseDetails(response.data.course);
        console.log(`Successfully fetched a course with id - ${id} `, response.data.message);
      }
      catch (error) {
        console.log("Error fetching a course ", err);
      }
    }
    sendGetCourseRequest();
  }, [])

  return (
    <div className="w-full p-2 mt-10 mr-10 flex flex-col">
      <CourseDetailsBasicInfo courseDetails={courseDetails}/>
      <CourseDetailsCourseContents courseId={id}/>
    </div>
    
  )
}

export default CourseDetails