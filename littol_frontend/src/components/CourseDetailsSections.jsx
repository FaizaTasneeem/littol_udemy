import { useState } from "react";
import { getSections, updateSection, deleteSection } from "../services/sectionService";
import { userStore } from "../store/AppStore";
import SectionDetailsSectionContents from "./SectionDetailsSectionContents";


function CourseDetailsSections({courseId, sectionList, setSectionList}) {
    const {accessToken} = userStore();

    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [sectionId, setSectionId] = useState(null);

    
    function handleNameChange(sectionId, defaultValue) {
        setInputValue(defaultValue || "");
        setEditingId(sectionId);
    }

    async function handleSectionUpdate(idxToUpdate, inputValue) {
        try {
            const response = await updateSection(idxToUpdate, {title: inputValue}, accessToken);
            const responseAfterUpdate = await getSections(courseId, accessToken);
            setSectionList(responseAfterUpdate.data.sections);
            console.log("Section updated successfully", response.data.message);
        }
        catch (err) {
            console.log("Error updating section ", err);
        }
        
    }

    async function handleSectionDelete(idxToRemove) {
        try {
            const response = await deleteSection(idxToRemove, accessToken);
            const responseAfterDelete = await getSections(courseId, accessToken);
            setSectionList(responseAfterDelete.data.sections);
            console.log("Section deleted successfully", response.data.message);
        }
        catch (err) {
            console.log("Error deleting section ", err);
        }

    }

    return (
        <div>
            {sectionList && sectionList.length > 0 && 
            <div>
                {sectionList.map((section, idx) => {
                    return (
                        <div className="p-4 flex flex-col">
                            <div key={idx} onClick={() => setSectionId(prev => prev === section._id ? null : section._id)} className="p-4 flex flex-row justify-between font-medium text-xl cursor-pointer">
                                {editingId !== section._id && <h1 onClick={() => handleNameChange(section._id, section.title)}>{section.title}</h1>}
                                {editingId === section._id && <input className="outline-none" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={() => { handleSectionUpdate(section._id, inputValue); setEditingId(null); }} autoFocus />}

                                <div className="flex">
                                    <button onClick={() => handleSectionDelete(section._id)} className="bg-gray-200 text-gray-600 mr-2 rounded px-2 cursor-pointer">D</button>
                                </div>
                            </div>

                            <div className={`w-full overflow-hidden transition-all duration-700 ${sectionId === section._id ? 'mt-10 opacity-100' : 'mt-0 max-h-0 opacity-0 '}`}>
                                <SectionDetailsSectionContents sectionId={sectionId}/>
                            </div>
                            
                            <hr className="my-4 border-gray-400"/>

                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default CourseDetailsSections;
