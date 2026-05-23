import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLesson } from "../services/lessonService";
import { userStore } from "../store/AppStore";


function LessonDetails() {
  const {accessToken} = userStore();
  
  const [lesson, setLesson] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    async function fetchLesson() {
      try{
        const response = await getLesson(id, accessToken);
        setLesson(response.data.lesson);
        console.log("✅ Lesson fetched successfully !!!", response.data.message);
      }
      catch(err) {
        console.log("Error fetching lesson ", err);
      }
    }

    fetchLesson();

  }, []);

  return (
    <div className="w-full flex flex-col">

      {lesson && 
        <div className="bg-blue-700">
          {lesson.title}
        </div>
      }

    </div>

  )
}

export default LessonDetails;
