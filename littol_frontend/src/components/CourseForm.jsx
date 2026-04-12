function CourseForm({courseToUpdate}) {
  return (
    <div className="flex flex-col">
        <input name="title" type="text" defaultValue={courseToUpdate?.title} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Title' required/>
        <input name="description" type="text" defaultValue={courseToUpdate?.description} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Description...' required/>
        <input name="instructor" type="text" defaultValue={courseToUpdate?.instructor} className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Instructor' required/>
    
        <div className="pt-2 w-full flex flex-row justify-between">
            <div className="w-1/2 flex flex-col">
                <label htmlFor="category" className="mx-2">Category</label>
                <select name="category" defaultValue={courseToUpdate?.category} id="category" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All' required>
                    <option>All</option>
                    <option>category1</option>
                    <option>category2</option>
                </select>
            </div>
        
            <div className="w-1/2 flex flex-col">
                <label htmlFor="level" className="mx-2">Level</label>
                <select name="level" defaultValue={courseToUpdate?.level} id="level" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All' required>
                    <option>All</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>
        </div>


        <div className="w-full flex flex-row justify-between">
            <label htmlFor="thumbnail" className="w-1/3 relative cursor-pointer bg-gray-200 m-2 my-4 p-4 py-2 border border-gray-300 rounded-sm shadow-lg">
                <div className="w-full absolute text-gray-700">Upload Thumbnail</div>
                <input name="thumbnail" id="thumbnail" type="file" hidden />
            </label>
            <button type="submit" className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg py-2 px-4 text-white my-4 mx-2 mb-4 cursor-pointer">Submit</button>
        </div>
    </div>
  )
}

export default CourseForm