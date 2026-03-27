import React from 'react'

function Courses() {
  return (
    <div className="w-full p-14 flex flex-col items-start justify-start">
      
      <div className="w-full flex flex-row justify-between">
        <h1 className="font-medium text-3xl">All Courses</h1>
        <button className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg px-4 text-white">+ Create Course</button>
      </div>
      <p className="pt-2 text-gray-500 text-lg">Explore our comprehensive course catalog</p>

      <div className="w-full bg-gray-100 mt-10 rounded-lg flex flex-col">
        <input type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Search Courses...' />
        
        <div className="pt-2 w-full flex flex-row justify-between">
          <div className="w-1/2 flex flex-col">
            <label for="category" className="mx-2">Category</label>
            <select id="category" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
              <option>category1</option>
              <option>category2</option>
            </select>
          </div>
          
          <div className="w-1/2 flex flex-col">
            <label for="level" className="mx-2">Level</label>
            <select id="level" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All'>
              <option>level1</option>
              <option>level2</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Courses