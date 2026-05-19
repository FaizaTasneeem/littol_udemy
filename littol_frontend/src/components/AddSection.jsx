import { useState, useEffect } from "react";

function AddSection({sectionArray, createSection, handleAddButtonClick, handleDeleteButtonClick, updateSectionTitle}) {

    return (
        <form onSubmit={createSection} className="w-full p-2 flex flex-col">
            <div className="w-full flex flex-row justify-between">
                <h2 className="m-2 font-medium text-xl">Course Content</h2>
                <button type="button" onClick={handleAddButtonClick} className="py-2 px-4 rounded-lg bg-blue-100 font-medium text-lg text-blue-800 cursor-pointer">+ Add Section</button>
            </div>

            {sectionArray.length === 0 && <div className="mt-4 p-10 rounded-lg border-2 border-dashed border-gray-400 font-medium text-lg text-gray-400">No sections yet. Add a section to start building your course.
            </div>}

            {sectionArray.length > 0 && 
            sectionArray.map((sectionTitle, idx) => {
                return <div key={idx} className="mt-4 p-10 rounded-lg border border-gray-400 font-medium text-lg text-gray-400">
                    <div className="flex flex-row justify-between">
                        <input type="text" value={sectionTitle} onChange={(e) => updateSectionTitle(e, idx)} className="w-3/4 rounded-lg border border-gray-400 p-2"/>
                        <button type="button" onClick={() => handleDeleteButtonClick(idx)} className="bg-gray-200 rounded-lg py-2 px-4 cursor-pointer">D</button>
                    </div>

                    <button type="button" className="w-full mt-4 py-2 rounded-lg border-2 border-dashed cursor-pointer">+ Add Lesson</button>

                    <button className="w-full mt-4 py-2 rounded-lg bg-blue-100 border cursor-pointer shadow-lg hover:scale-102">+ Create</button>
                </div>

            })}
        </form>
    )
}

export default AddSection;
