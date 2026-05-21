import { useState } from "react";
import { getLessons, createLesson } from "../services/lessonService";
import { userStore } from "../store/AppStore";


function AddLesson({sectionId}) {
  const {accessToken} = userStore();

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonList, setLessonList] = useState([]);

  function handleLessonCreateSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const title = form.elements.lessonTitle.value;
    const videoUrl = form.elements.videoUrl.files[0];
    const order = lessonList ? lessonList.length + 1 : 1;
    
    const fields = { title, videoUrl, order, sectionId }

    const lesson = new FormData();
    Object.entries(fields).forEach(([key, value]) => lesson.append(key, value));

    sendLessonCreateRequest(lesson);
  }

  async function sendLessonCreateRequest(lesson) {
    try{
      const response = await createLesson(lesson, accessToken);
      setLessonList([...lessonList, response?.data?.lesson]);
      console.log("✅ Lesson created successfully !!!", response.data.message);
    }
    catch(err) {
      console.log("Error creating lesson ", err);
    }
  }


  return (
    <div className="flex flex-col">
      <form onSubmit={handleLessonCreateSubmit} className="w-full flex flex-row md:flex-col justify-between">
        <input type="text" id="lessonTitle" name="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-1/2 md:w-full cursor-pointer my-4 p-10 py-2 border-2 border-gray-300 rounded-lg" placeholder="Lesson 1: e.g., Getting Started"/>
        
        <label htmlFor="videoUrl" className="w-1/2 md:w-full cursor-pointer my-4 p-10 py-2 border-2 border-dashed hover:border-blue-500 border-gray-300 rounded-lg shadow-lg">
          + Upload Video
        </label>
        <input type="file" name="videoUrl" id="videoUrl" accept="video/*" hidden />

        <button type="submit" className="w-full mt-4 py-2 rounded-lg shadow-xl border-2 border-gray-400 hover:border-blue-800 cursor-pointer">+ Add Lesson</button>
      </form>

    </div>
  )
}

export default AddLesson;
