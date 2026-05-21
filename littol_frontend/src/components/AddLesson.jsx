import { useState, useEffect } from "react";

function AddLesson({lessonList, handleLessonCreateSubmit}) {
  const [lessonTitle, setLessonTitle] = useState("");

  useEffect(() => {
    if (lessonTitle !== "") {
      handleAddButtonClick();
    }

  }, [lessonList])

  function handleAddButtonClick() {
    setLessonTitle(`Lesson ${lessonList ? lessonList.length + 1 : 1}: e.g., Getting Started`);
  }


  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row justify-end items-center">
        <button type="button" onClick={handleAddButtonClick} className="py-2 px-4 rounded-lg bg-blue-100 font-medium text-lg text-blue-800 cursor-pointer">+ Add Lesson</button>
      </div>

      {(lessonTitle === "" && lessonList.length === 0) && <div className="mt-4 p-20 rounded-lg border-2 border-dashed border-gray-400 font-medium text-lg text-gray-400">No lessons yet. Add a lesson to start building your course.
      </div>}

      {lessonTitle !== "" && <form onSubmit={handleLessonCreateSubmit} className="w-full flex flex-row md:flex-col justify-between">
        <input type="text" id="lessonTitle" name="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-1/2 md:w-full my-4 p-10 py-2 border-2 border-gray-300 rounded-lg" placeholder="Lesson 1: e.g., Getting Started"/>
        
        <label htmlFor="videoUrl" className="w-1/2 md:w-full cursor-pointer my-4 p-10 py-2 border-2 border-dashed hover:border-blue-500 border-gray-300 rounded-lg shadow-lg">
          + Upload Video
        </label>
        <input type="file" name="videoUrl" id="videoUrl" accept="video/*" hidden />

        <button type="submit" className="w-full mt-4 py-2 rounded-lg shadow-xl border-2 border-gray-400 hover:border-blue-800 cursor-pointer">+ Add Lesson</button>
      </form>}

    </div>
  )
}

export default AddLesson;
