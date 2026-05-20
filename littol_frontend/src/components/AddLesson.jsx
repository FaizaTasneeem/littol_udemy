import { useState } from "react";

function AddLesson() {
  const [lessonTitle, setLessonTitle] = useState("");

  async function handleVideoUpload(e) {
    const imgFile = e.target.files?.[0];
    if (!imgFile) {
      console.log("No image selected");
      return;
    }
    // console.log(imgFile);
    const formData = new FormData();
    formData.append("image", imgFile);
    await updateProfile(formData);
  }

  return (
    <div className="flex flex-col">
      <form className="w-full flex flex-row md:flex-col justify-between">
        <input type="text" id="lessonTitle" name="lessonTitle" value={lessonTitle} className="w-1/2 md:w-full cursor-pointer my-4 p-10 py-2 border-2 border-gray-300 rounded-lg" placeholder="Lesson 1: e.g., Getting Started"/>
        
        <label htmlFor="videoUrl" className="w-1/2 md:w-full cursor-pointer my-4 p-10 py-2 border-2 border-dashed hover:border-blue-500 border-gray-300 rounded-lg shadow-lg">
           + Upload Video
        </label>
        <input name="videoUrl" id="videoUrl" type="file" hidden />
      </form>
      
      <button type="button" className="w-full mt-4 py-2 rounded-lg shadow-lg border-2 border-dashed hover:border-blue-800 cursor-pointer">+ Add Lesson</button>

    </div>
  )
}

export default AddLesson;
