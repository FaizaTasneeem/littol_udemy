import React from "react";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000';

function CourseDetailsBasicInfo({courseDetails}) {
    return (
        <div className="bg-white w-full p-2 mr-10 flex flex-row justify-stretch border rounded-xl border-gray-300 h-fit">
            <div className="w-1/2 p-4">
                <div className="mt-2 text-gray-500 flex flex-row justify-start">
                    <h3 className="py-2 px-4 rounded-3xl bg-blue-100 text-lg text-blue-800">{courseDetails.category}</h3>
                    <h3 className="p-2 text-lg">{courseDetails.level}</h3>
                </div>
                
                <div className="pl-2 font-medium text-3xl truncate">{courseDetails.title}</div>
                
                <p className="pl-2 mt-2 text-xl text-gray-500 truncate">{courseDetails.description}</p>
                
                <div className="pl-2 mt-4 text-gray-500 flex flex-row justify-start truncate">
                    <h3 className="pr-2">{courseDetails.rating ?? "rating"}</h3>
                    <h3 className="pr-2">Duration</h3>
                </div>
                
                <div className="pl-2 mt-4 text-gray-500 flex flex-col truncate">
                    <h3>Instructor</h3>
                    <h3>{courseDetails.instructor}</h3>
                </div>

                <div className="pl-2 mt-4 text-gray-500 flex flex-col truncate">
                    <div className="flex flex-row justify-between">
                        <h3>Your Progress</h3>
                        <h3>0%</h3>
                    </div>

                    <div className="mt-2 w-full rounded-xl h-4 bg-gray-200"></div>
                </div>
            </div>

            <div className="w-1/2 h-80 p-4 rounded-xl ">
                <img src={`${server}${courseDetails.thumbnailFilePath}`} alt="course-thumbnail" className="w-full h-full object-cover rounded-xl" />
            </div>
        </div>
    )
}

export default CourseDetailsBasicInfo;
