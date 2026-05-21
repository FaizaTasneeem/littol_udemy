import { useState, useEffect } from "react";
import { getSections, createSection } from "../services/sectionService";
import { userStore } from "../store/AppStore";

import AddSection from "./AddSection";
import CourseDetailsSections from "./CourseDetailsSections";

function CourseDetailsCourseContents({id, courseDetails}) {
    const {accessToken} = userStore();
    
    const [sectionList, setSectionList] = useState([]);
    
    async function handleSectionCreateSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const title = form.elements.title.value;
        
        const section = {
            title,
            order: sectionList ? sectionList.length + 1 : 1,
            courseId: id
        };

        sendSectionCreateRequest(section);
    }
    
    async function sendSectionCreateRequest(section) {
        try{
            const response = await createSection(section, accessToken);
            setSectionList([...sectionList, response?.data?.section]);
            console.log("✅ Section created successfully !!!", response.data.message);
        }
        catch(err) {
            console.log("Error creating section ", err);
        }
    }

    useEffect(() => {
        async function fetchSections() {
            try{
                const response = await getSections(id, accessToken);
                setSectionList(response?.data?.sections ?? []);
                console.log("✅ All Sections fetched successfully !!!", response.data.message);

            }
            catch(err) {
                console.log("Error fetching sections ", err);
            }
        }

        fetchSections();
        
    }, []);

    return (
        <div className="w-full p-2 my-10 bg-white border rounded-xl border-gray-300">
            <AddSection 
                sectionList={sectionList} 
                handleSectionCreateSubmit={handleSectionCreateSubmit} 
            />
            {sectionList && sectionList.length > 0 && 
            <CourseDetailsSections
                id={id}
                sectionList={sectionList}
                setSectionList={setSectionList}
            />}
        </div>
    )
}

export default CourseDetailsCourseContents;
