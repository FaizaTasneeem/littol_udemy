function CreateCourses() {
    return (
        <div className="w-full bg-gray-100 mt-16 rounded-lg flex flex-col">
            <input type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Title' />
            <input type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Description...' />
            <input type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Instructor' />
        
            <div className="pt-2 w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                    <label for="category" className="mx-2">Category</label>
                    <select id="category" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
                        <option>All</option>
                        <option>category1</option>
                        <option>category2</option>
                    </select>
                </div>
            
                <div className="w-1/2 flex flex-col">
                    <label for="level" className="mx-2">Level</label>
                    <select id="level" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
                        <option>All</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-row justify-end">
                <button className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg py-2 px-4 text-white my-4 mx-2 mb-4">Submit</button>
            </div>
        </div>
    )
}

export default CreateCourses
