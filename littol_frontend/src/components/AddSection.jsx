import { useState, useEffect } from "react";
import AddLesson from "./AddLesson";

function AddSection({sectionArray, handleSectionCreateSubmit}) {
    const [title, setTitle] = useState("");
    const [showLesson, setShowLesson] = useState(false);

    useEffect(() => {
        if (title !== "") {
            handleAddButtonClick();
        }

    }, [sectionArray])

    function handleAddButtonClick() {
        setTitle(`Section ${sectionArray ? sectionArray.length + 1 : 1}: e.g., Getting Started`);
    }

    return (
        <form onSubmit={(event) => handleSectionCreateSubmit(event, setShowLesson)} className="w-full p-2 flex flex-col">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="m-2 font-medium text-2xl">Course Content</h2>
                    <span className="px-2">{sectionArray.length} Sections</span>

                </div>
                <button type="button" onClick={handleAddButtonClick} className="py-2 px-4 rounded-lg bg-blue-100 font-medium text-lg text-blue-800 cursor-pointer">+ Add Section</button>
            </div>

            {(title === "" && sectionArray.length === 0) && <div className="mt-4 p-20 rounded-lg border-2 border-dashed border-gray-400 font-medium text-lg text-gray-400">No sections yet. Add a section to start building your course.
            </div>}

            {title !== "" && <div className="mt-4 p-10 rounded-lg border border-gray-400 font-medium text-lg text-gray-400">
                <div className="flex flex-row justify-between">
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-3/4 rounded-lg border border-gray-400 p-2"/>
                    <button type="button" onClick={() => {setTitle(""); setShowLesson(false);}} className="bg-gray-200 rounded-lg py-2 px-4 cursor-pointer">X</button>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-blue-100 text-blue-800 border cursor-pointer shadow-lg hover:scale-102">+ Create</button>

                {/* {showLesson && <AddLesson/>} */}
            </div>}

            <hr className="my-4 border-gray-400"/>

        </form>
    )
}

export default AddSection;
