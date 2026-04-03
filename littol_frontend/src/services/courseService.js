import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_COURSE || 'http://localhost:5000/api/course';

export async function getAllCourses(accessToken) {
    const response = await axios.get(`${server}/getCourses`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function createCourse(course, accessToken) {
    const response = await axios.post(`${server}/createCourse`, course, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function updateCourse(id, accessToken) {
    const response = await axios.put(`${server}/updateCourse/${id}`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function deleteCourse(id, accessToken) {
    const response = await axios.delete(`${server}/deleteCourse/${id}`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};