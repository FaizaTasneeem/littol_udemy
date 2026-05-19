import { useState, useEffect } from "react";
import { getSections } from "../services/sectionService";
import AddSection from "./AddSection";
import CourseDetailsSections from "./CourseDetailsSections";

function CourseDetailsCourseContents({courseDetails}) {
    const [addSecBtnClicked, setAddSecBtnClicked] = useState(false);
    const [sectionArray, setSectionArray] = useState([]);

    function handleAddButtonClick() {
        setAddSecBtnClicked(true);
        setSectionArray(prev => [...prev, `Section ${prev.length + 1}: e.g., Getting Started`]);
    }

    function handleDeleteButtonClick(indexToRemove) {
        const updatedArray = sectionArray.filter((val, idx) => idx !== indexToRemove);
        setSectionArray(updatedArray);
    }

    function updateSectionTitle(event, indexToUpdate) {
        const updatedArray = sectionArray.map((section, idx) => {
            if (idx === indexToUpdate) {
                return event.target.value;
            }
            return section;
        })
        setSectionArray(updatedArray);
    }

    function createSection() {

    }

    useEffect(() => {
        if(sectionArray.length === 0) {
            setAddSecBtnClicked(false);
        }
    }, [sectionArray]);


    return (
        <div className="w-full p-2 my-10 bg-white border rounded-xl border-gray-300">
            <AddSection 
                sectionArray={sectionArray} 
                createSection={createSection} 
                handleAddButtonClick={handleAddButtonClick} 
                handleDeleteButtonClick={handleDeleteButtonClick} 
                updateSectionTitle={updateSectionTitle}
            />
            <CourseDetailsSections
                sectionArray={sectionArray} 
            />
        </div>
    )
}

export default CourseDetailsCourseContents;
