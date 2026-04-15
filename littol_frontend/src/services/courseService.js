import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_COURSE || 'http://localhost:5000/api/course';

export async function getAllCourses(accessToken) {
    const response = await axios.get(`${server}/getAllCourses`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function getCoursesFiltered(page, limit, accessToken) {
    const response = await axios.get(`${server}/getCoursesFiltered`, 
        {
            params: { 
                page,
                limit
            },
            headers: { 'authorization': `Bearer ${accessToken}`}
        });
    return response;
};

export async function createCourse(course, accessToken) {
    const response = await axios.post(`${server}/createCourse`, course, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function updateCourse(id, course, accessToken) {
    const response = await axios.put(`${server}/updateCourse/${id}`, course, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function deleteCourse(id, accessToken) {
    const response = await axios.delete(`${server}/deleteCourse/${id}`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function searchCourse(queryInput, accessToken) {
    const response = await axios.get(`${server}/searchCourse`, 
        {
            params: { 'q': queryInput }, 
            headers: { 'authorization': `Bearer ${accessToken}`}
        });
    return response;
}