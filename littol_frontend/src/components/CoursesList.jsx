import React from 'react'

function CoursesList() {
  return (
    <div className="w-[50%] md:w-[30%] border flex flex-col rounded-xl">
      <div className="w-full border rounded-t-xl">
        Thumbnail
      </div>
      
      <div className="mt-2 text-gray-500 flex flex-row justify-start">
        <h3 className="pr-2">Category</h3>
        <h3 className="pr-2">Level</h3>
      </div>
      
      <div className="font-medium text-xl">Title</div>
      
      <p className="mt-2 text-gray-500">Description</p>
      
      <div className="mt-2 text-gray-500 flex flex-row justify-between">
        <h3>Instructor</h3>
        <h3>Duration</h3>
      </div>
      
      <div className="mt-2 text-gray-500 flex flex-row justify-between">
        <h3>Rating</h3>
        <h3>Number enrolled</h3>
      </div>
    </div>
  )
}

export default CoursesList