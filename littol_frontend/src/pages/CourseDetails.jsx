import { useState, useEffect } from "react";
import { userStore } from "../store/AppStore";
import { useParams } from 'react-router-dom'
import { getCourse } from "../services/courseService";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000';

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
    <div className="w-full p-4 mt-10 mr-10 flex flex-row justify-stretch border rounded-xl border-gray-400 h-fit">
      <div className="w-1/2 p-4">
        <div className="mt-2 text-gray-500 flex flex-row justify-start">
          <h3 className="pr-2">{courseDetails.category}</h3>
          <h3 className="pr-2">{courseDetails.level}</h3>
        </div>
        
        <div className="font-medium text-3xl truncate">{courseDetails.title}</div>
        
        <p className="mt-2 text-xl text-gray-500 truncate">{courseDetails.description}</p>
        
        <div className="mt-4 text-gray-500 flex flex-row justify-start truncate">
          <h3 className="pr-2">{courseDetails.rating ?? "rating"}</h3>
          <h3 className="pr-2">Duration</h3>
        </div>
        
        <div className="mt-4 text-gray-500 flex flex-col truncate">
          <h3>Instructor</h3>
          <h3>{courseDetails.instructor}</h3>
        </div>

        <div className="mt-4 text-gray-500 flex flex-col truncate">
          <h3>Your Progress</h3>
        </div>
      </div>

      <div className="w-1/2 h-70 p-4 rounded-xl relative">
        <img src={`${server}${courseDetails.thumbnailFilePath}`} alt="" className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  )
}

export default CourseDetails