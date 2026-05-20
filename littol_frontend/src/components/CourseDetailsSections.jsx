import { useState } from "react";
import { getSections, updateSection, deleteSection } from "../services/sectionService";
import { userStore } from "../store/AppStore";


function CourseDetailsSections({id, sectionArray, setSectionArray}) {
    const {accessToken} = userStore();

    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);

    
    function handleNameChange(sectionId, defaultValue) {
        setInputValue(defaultValue || "");
        setEditingId(sectionId);
    }

    async function handleSectionUpdate(idxToUpdate, inputValue) {
        try {
            const response = await updateSection(idxToUpdate, {title: inputValue}, accessToken);
            const responseAfterUpdate = await getSections(id, accessToken);
            setSectionArray(responseAfterUpdate.data.sections);
            console.log("Section updated successfully", response.data.message);
        }
        catch (err) {
            console.log("Error updating section ", err);
        }
        
    }

    async function handleSectionDelete(idxToRemove) {
        try {
            const response = await deleteSection(idxToRemove, accessToken);
            const responseAfterDelete = await getSections(id, accessToken);
            setSectionArray(responseAfterDelete.data.sections);
            console.log("Section deleted successfully", response.data.message);
        }
        catch (err) {
            console.log("Error deleting section ", err);
        }

    }

    return (
        <div>
            {sectionArray && sectionArray.length > 0 && 
            <div>
                {sectionArray.map((section, idx) => {
                    return (
                        <div className="p-4 flex flex-col">
                            <div key={idx} className="p-4 flex flex-row justify-between font-medium text-xl">
                                {editingId !== section._id && <h1 onClick={() => handleNameChange(section._id, section.title)}>{section.title}</h1>}
                                {editingId === section._id && <input className="outline-none" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onBlur={() => { handleSectionUpdate(section._id, inputValue); setEditingId(null); }} autoFocus />}

                                
                                <div className="flex">
                                    <button onClick={() => handleSectionDelete(section._id)} className="bg-gray-200 text-gray-600 mr-2 rounded px-2 cursor-pointer">D</button>
                                </div>
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
