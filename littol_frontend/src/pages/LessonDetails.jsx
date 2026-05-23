import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLesson } from "../services/lessonService";
import { userStore } from "../store/AppStore";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/';

function LessonDetails() {
  const {accessToken} = userStore();
  
  const [lesson, setLesson] = useState(null);
  const {id} = useParams();
  
  const videoSrc = lesson?.videoUrl ? `${server}${lesson.videoUrl}` : '';

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
    <div className="w-full p-8 flex flex-col">

      {lesson && (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <h2 className="text-2xl font-semibold">{lesson.title}</h2>

          {videoSrc ? (
            <video className="w-full max-w-4xl rounded-lg shadow" controls preload="metadata">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-gray-500">Video not available</p>
          )}
        </div>
      )}

    </div>

  )
}

export default LessonDetails;
