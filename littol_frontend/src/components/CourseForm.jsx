import AddSection from "./AddSection";

function CourseForm({formHeader, courseToUpdate}) {
  return (
    <div className="flex flex-col">
        <h1 className="p-2 font-medium text-2xl">{formHeader}</h1>
        <hr className="px-2 pb-4 border-gray-300"></hr>
        <h2 className="m-2 font-medium text-xl">Basic Information</h2>
        
        <label htmlFor="title" className="m-2 font-medium text-sm text-gray-500">Course Title *</label>
        <input id="title" name="title" type="text" defaultValue={courseToUpdate?.title} className="bg-white m-2 p-4 py-2 border border-gray-400 rounded-lg" placeholder='e.g., Advanced React Patterns' required/>
        
        <label htmlFor="description" className="m-2 font-medium text-sm text-gray-500">Description *</label>
        <textarea id="description" name="description" type="text" defaultValue={courseToUpdate?.description} className="bg-white m-2 p-4 pb-10 border border-gray-400 rounded-lg" placeholder='Describe what students will learn...' required></textarea>
        
        <label htmlFor="instructor" className="m-2 font-medium text-sm text-gray-500">Instructor *</label>
        <input id="instructor" name="instructor" type="text" defaultValue={courseToUpdate?.instructor} className="bg-white m-2 p-4 py-2 border border-gray-400 rounded-lg" placeholder='e.g., John Doe' required/>
    
        <div className="pt-2 w-full flex flex-row justify-between">
            <div className="w-1/2 flex flex-col">
                <label htmlFor="category" className="mx-2 font-medium text-sm text-gray-500">Category *</label>
                <select name="category" defaultValue={courseToUpdate?.category} id="category" className="bg-white m-2 p-4 py-2 border border-gray-400 rounded-lg" placeholder='All' required>
                    <option>All</option>
                    <option>category1</option>
                    <option>category2</option>
                </select>
            </div>
        
            <div className="w-1/2 flex flex-col">
                <label htmlFor="level" className="mx-2 font-medium text-sm text-gray-500">Level *</label>
                <select name="level" defaultValue={courseToUpdate?.level} id="level" className="bg-white m-2 p-4 py-2 border border-gray-400 rounded-lg" placeholder='All' required>
                    <option>All</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>
        </div>


        <label htmlFor="thumbnail" className="cursor-pointer m-2 my-4 p-10 py-2 border-2 border-dashed border-gray-300 rounded-lg shadow-lg">
           + Upload Thumbnail URL
        </label>
        <input name="thumbnail" id="thumbnail" type="file" hidden />

        <AddSection/>

        <hr className="mt-4 pl-6 pr-2 border-gray-300"></hr>
        <div className="flex flex-row justify-end">
            <button type="submit" className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg font-medium text-lg py-2 px-4 text-white my-4 mx-2 cursor-pointer">Submit</button>
        </div>

    </div>
  )
}

export default CourseForm