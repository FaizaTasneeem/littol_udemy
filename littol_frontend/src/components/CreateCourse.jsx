import { useContext } from "react";
import { UserContext } from "../context/AppContext";
import { createCourse } from "../services/courseService";

function CreateCourse({courseList, setCourseList}) {
    const {accessToken} = useContext(UserContext);

    async function handleCourseSubmit(event) {
        event.preventDefault();
        const course = new FormData(event.target);
        try {
            const response = await createCourse(course, accessToken);
            setCourseList([...courseList, response.data.course]);
            console.log("Course created successfully", response.data.message);
        }
        catch(err) {
            console.log("Error creating course ", err);
        }
    }


    return (
        <form onSubmit={handleCourseSubmit} className="w-full bg-gray-100 mt-16 rounded-lg flex flex-col">
            <input name="title" type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Title' required/>
            <input name="description" type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Description...' required/>
            <input name="instructor" type="text" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='Instructor' required/>
        
            <div className="pt-2 w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="category" className="mx-2">Category</label>
                    <select name="category" id="category" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All' required>
                        <option>All</option>
                        <option>category1</option>
                        <option>category2</option>
                    </select>
                </div>
            
                <div className="w-1/2 flex flex-col">
                    <label htmlFor="level" className="mx-2">Level</label>
                    <select name="level" id="level" className="bg-white m-2 p-4 py-2 border border-gray-300 rounded-lg" placeholder='All' required>
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
                <button type="submit" className="bg-[linear-gradient(to_right,#6860e8,#817aeb)] rounded-lg py-2 px-4 text-white my-4 mx-2 mb-4">Submit</button>
            </div>
        </form>
    )
}

export default CreateCourse
