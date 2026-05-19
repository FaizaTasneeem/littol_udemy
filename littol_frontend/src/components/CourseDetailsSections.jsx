import { getSections, updateSection, deleteSection } from "../services/sectionService";
import { userStore } from "../store/AppStore";


function CourseDetailsSections({id, sectionArray, setSectionArray}) {
    const {accessToken} = userStore();

    async function handleSectionUpdate(idxToUpdate) {
        try {
            const response = await updateSection(idxToUpdate, accessToken);
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
                            <div key={idx} className="p-4 flex flex-row justify-between">
                                {section.title}
                                <div className="flex">
                                    <button onClick={() => handleSectionUpdate(section._id)} className="bg-gray-200 mr-2 rounded px-2 cursor-pointer">U</button>
                                    <button onClick={() => handleSectionDelete(section._id)} className="bg-gray-200 mr-2 rounded px-2 cursor-pointer">D</button>
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
