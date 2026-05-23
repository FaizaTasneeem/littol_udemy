import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLessons, updateLesson, deleteLesson } from "../services/lessonService";
import { userStore } from "../store/AppStore";


function LessonDetailsLessons({sectionId, lessonList, setLessonList}) {
    const {accessToken} = userStore();

    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [lessonTitle, setLessonTitle] = useState("");

    const navigate = useNavigate();

    function handleUpdateButtonClick(lessonId, title) {
        setEditingId(lessonId);
        setLessonTitle(title);
    }
        
    async function handleLessonUpdate(event, idToUpdate) {
        event.preventDefault();
        setEditingId(null)
        setLessonTitle("");
        const form = event.currentTarget;
        
        const title = form.elements.lessonTitle.value;
        const videoUrl = form.elements.videoUrl.files[0];
        
        const updatedLesson = new FormData();
        if (title !== "") updatedLesson.append("title", title);
        if (videoUrl !== undefined) updatedLesson.append("videoUrl", videoUrl);

        sendLessonUpdateRequest(idToUpdate, updatedLesson);
    }
    
    async function sendLessonUpdateRequest(idToUpdate, lesson) {
        try {
            const response = await updateLesson(idToUpdate, lesson, accessToken);
            const responseAfterUpdate = await getLessons(sectionId, accessToken);
            setLessonList(responseAfterUpdate.data.lessons);
            console.log("Lesson updated successfully", response.data.message);
        }
        catch (err) {
            console.log("Error updating lesson ", err);
        }
    }

    async function handleLessonDelete(idToRemove) {
        try {
            const response = await deleteLesson(idToRemove, accessToken);
            const responseAfterDelete = await getLessons(sectionId, accessToken);
            setLessonList(responseAfterDelete.data.lessons);
            console.log("Lesson deleted successfully", response.data.message);
        }
        catch (err) {
            console.log("Error deleting lesson ", err);
        }

    }

    function handleLessonClick(lessonId) {
        console.log("clicked")
        navigate(`/lessonDetails/${lessonId}`);
    }

    return (
        <div>
            {lessonList && lessonList.length > 0 && 
            <div>
                {lessonList.map((lesson, idx) => {
                    return (
                        <div className="p-4 flex flex-col">
                            <div key={idx} className="p-4 flex flex-row justify-between font-medium text-lg">
                                <h1 onClick={() => handleLessonClick(lesson._id)} className="cursor-pointer">{lesson.title}</h1>
                                <div className="flex">
                                    <button onClick={() => handleUpdateButtonClick(lesson._id, lesson.title)} className="bg-gray-200 text-gray-600 mr-2 rounded px-2 cursor-pointer">U</button>
                                    <button onClick={() => handleLessonDelete(lesson._id)} className="bg-gray-200 text-gray-600 mr-2 rounded px-2 cursor-pointer">D</button>
                                </div>
                            </div>

                            {editingId === lesson._id && 
                                <form onSubmit={(event) => handleLessonUpdate(event, editingId)} className="px-4 pb-10 flex flex-col justify-between">
                                    <div className="w-full flex flex-row justify-between items-center">
                                        
                                        <div className="w-full flex flex-row justify-start">
                                            <input type="text" id="lessonTitle" name="lessonTitle" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="w-1/3 my-4 mr-4 p-10 py-2 border-2 border-gray-300 rounded-lg" placeholder={`Lesson ${lesson.order}: e.g., Getting Started`}/>
                                            
                                            <label htmlFor="videoUrl" className="w-1/3 cursor-pointer my-4 p-10 py-2 border-2 border-dashed hover:border-blue-500 border-gray-300 rounded-lg shadow-lg">
                                                + Upload Video
                                            </label>
                                            <input type="file" name="videoUrl" id="videoUrl" accept="video/*" hidden />
                                        </div>
                                        <button type="button" onClick={() => setEditingId(null)} className="mr-2 bg-gray-200 rounded-lg py-2 px-4 cursor-pointer">X</button>

                                    </div>

                                    <button type="submit" className="mr-2 w-full mt-4 py-2 rounded-lg shadow-xl border-2 border-gray-400 hover:border-blue-800 cursor-pointer"> Update Lesson</button>
                                </form>
                            }

                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default LessonDetailsLessons;
