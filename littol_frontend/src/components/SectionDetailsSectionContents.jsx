import { useState, useEffect } from "react";
import { getLessons, createLesson } from "../services/lessonService";
import { userStore } from "../store/AppStore";

import AddLesson from "./AddLesson";
import SectionDetailsLessons from "./SectionDetailsLessons";

function SectionDetailsSectionContents({sectionId}) {
    const {accessToken} = userStore();
    
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

    useEffect(() => {
        async function fetchLessons() {
            try{
                const response = await getLessons(sectionId, accessToken);
                setLessonList(response?.data?.lessons ?? []);
                console.log("✅ All Lessons fetched successfully !!!", response.data.message);
            }
            catch(err) {
                console.log("Error fetching lessons ", err);
            }
        }

        fetchLessons();
        
    }, []);

    return (
        <div className="w-full p-2 my-2 bg-white border rounded-xl border-gray-300">
            <AddLesson 
                lessonList={lessonList} 
                handleLessonCreateSubmit={handleLessonCreateSubmit} 
            />
            {lessonList && lessonList.length > 0 && 
            <SectionDetailsLessons
                sectionId={sectionId}
                lessonList={lessonList}
                setLessonList={setLessonList}
            />}
        </div>
    )
}

export default SectionDetailsSectionContents;
