import { useState } from "react";
import { getLessons, updateLesson, deleteLesson } from "../services/lessonService";
import { userStore } from "../store/AppStore";


function LessonDetailsLessons({sectionId, lessonList, setLessonList}) {
    const {accessToken} = userStore();

    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [lessonId, setLessonId] = useState(null);

    
    function handleNameChange(lessonId, defaultValue) {
        setInputValue(defaultValue || "");
        setEditingId(lessonId);
    }

    async function handleLessonUpdate(idxToUpdate, inputValue) {
        try {
            const response = await updateLesson(idxToUpdate, {title: inputValue}, accessToken);
            const responseAfterUpdate = await getLessons(sectionId, accessToken);
            setLessonList(responseAfterUpdate.data.lessons);
            console.log("Lesson updated successfully", response.data.message);
        }
        catch (err) {
            console.log("Error updating lesson ", err);
        }
        
    }

    async function handleLessonDelete(idxToRemove) {
        try {
            const response = await deleteLesson(idxToRemove, accessToken);
            const responseAfterDelete = await getLessons(sectionId, accessToken);
            setLessonList(responseAfterDelete.data.lessons);
            console.log("Lesson deleted successfully", response.data.message);
        }
        catch (err) {
            console.log("Error deleting lesson ", err);
        }

    }

    return (
        <div>
            {lessonList && lessonList.length > 0 && 
            <div>
                {lessonList.map((lesson, idx) => {
                    return (
                        <div className="p-4 flex flex-col">
                            <div key={idx} onClick={() => setLessonId(prev => prev === lesson._id ? null : lesson._id)} className="p-4 flex flex-row justify-between font-medium text-xl cursor-pointer">
                                {editingId !== lesson._id && <h1 onClick={() => handleNameChange(lesson._id, lesson.title)}>{lesson.title}</h1>}
                                {editingId === lesson._id && <input className="outline-none" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={() => { handleLessonUpdate(lesson._id, inputValue); setEditingId(null); }} autoFocus />}

                                <div className="flex">
                                    <button onClick={() => handleLessonDelete(lesson._id)} className="bg-gray-200 text-gray-600 mr-2 rounded px-2 cursor-pointer">D</button>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default LessonDetailsLessons;
