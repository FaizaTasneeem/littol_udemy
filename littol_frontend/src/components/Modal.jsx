import { userStore, courseStore, updateCourseModalStore } from '../store/AppStore'
import { updateCourse, getAllCourses } from "../services/courseService";

function Modal() {
  const {accessToken} = userStore();
  const {setCourseList} = courseStore();
  const {courseToUpdate, setShowModal} = updateCourseModalStore();

  async function handleCourseUpdateSubmit(event) {
    event.preventDefault();
    const course = new FormData(event.target);
    await sendCourseUpdateRequest(course);
    setShowModal(false);
  }
  
  async function sendCourseUpdateRequest(course) {
    try {
      const response = await updateCourse(courseToUpdate._id, course, accessToken);
      console.log(response.data.updatedCourse);
      const responseAfterUpdate = await getAllCourses(accessToken);
      setCourseList(responseAfterUpdate.data.courses);
      console.log("Course updated successfully", response.data.message);
    }
    catch (err) {
      console.log("Error updating course ", err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <form onSubmit={handleCourseUpdateSubmit} key={courseToUpdate?._id} className="w-1/2 p-6 border border-gray-400 bg-gray-100 mt-16 rounded-xl flex flex-col relative">
            <div onClick={() => setShowModal(false)} className="absolute px-2 border rounded top-2 right-4 cursor-pointer">X</div>
            
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
        </form>

    </div>
  )
}

export default Modal