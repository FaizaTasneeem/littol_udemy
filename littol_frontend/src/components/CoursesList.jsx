import React from 'react'

function CoursesList({title, description, instructor, category, level, thumbnailFilePath, rating}) {
  return (
    <div className="w-[50%] md:w-[30%] border flex flex-col rounded-xl">
      <div className="w-full h-40 border rounded-t-xl">
        {thumbnailFilePath}
      </div>
      
      <div className="mt-2 text-gray-500 flex flex-row justify-start">
        <h3 className="pr-2">{category}</h3>
        <h3 className="pr-2">{level}</h3>
      </div>
      
      <div className="font-medium text-xl">{title}</div>
      
      <p className="mt-2 text-gray-500">{description}</p>
      
      <div className="mt-2 text-gray-500 flex flex-row justify-between">
        <h3>{instructor}</h3>
        <h3>Duration</h3>
      </div>
      
      <div className="mt-2 text-gray-500 flex flex-row justify-between">
        <h3>{rating}</h3>
        <h3>Number enrolled</h3>
      </div>
    </div>
  )
}

export default CoursesList