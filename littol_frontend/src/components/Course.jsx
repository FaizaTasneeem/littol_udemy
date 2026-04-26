import { useNavigate } from "react-router-dom";
import CourseDetails from "../pages/CourseDetails";
import CourseUpdateButton from "./CourseUpdateButton";
import CourseDeleteButton from "./CourseDeleteButton";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000';

function Course({id, title, description, instructor, category, level, thumbnailFilePath, rating}) {
  const navigate = useNavigate();
  
  function handleCourseClick() {
    navigate(`/courseDetails/${id}`);
  }

  return (
    <div className="w-[50%] md:w-[30%] border border-gray-400 flex flex-col rounded-xl p-2 cursor-pointer">
      <div className="w-full h-40 border rounded-t-xl relative">
        <img src={`${server}${thumbnailFilePath}`} alt="" className="w-full h-full object-cover rounded-t-xl" />
        <CourseUpdateButton id={id} />    
        <CourseDeleteButton id={id} />    
      </div>
      
      <div onClick={handleCourseClick}>
        <div className="mt-2 text-gray-500 flex flex-row justify-start">
          <h3 className="pr-2">{category}</h3>
          <h3 className="pr-2">{level}</h3>
        </div>
        
        <div className="font-medium text-xl truncate">{title}</div>
        
        <p className="mt-2 text-gray-500 truncate">{description}</p>
        
        <div className="mt-2 text-gray-500 flex flex-row justify-between truncate">
          <h3>{instructor}</h3>
          <h3>Duration</h3>
        </div>
        
        <div className="mt-2 text-gray-500 flex flex-row justify-between truncate">
          <h3>{rating}</h3>
          <h3>Number enrolled</h3>
        </div>
      </div>

    </div>
  )
}

export default Course