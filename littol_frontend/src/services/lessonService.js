import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_SECTION || 'http://localhost:5000/api/lesson';

export async function getLessons(sectionId, accessToken) {
    const response = await axios.get(`${server}/getLessons`, 
        {
            params: { sectionId },
            headers: { 'authorization': `Bearer ${accessToken}`}
        });
    return response;
};

export async function createLesson(lesson, accessToken) {
    const response = await axios.post(`${server}/createLesson`, lesson, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function updateLesson(id, lesson, accessToken) {
    const response = await axios.put(`${server}/updateLesson/${id}`, lesson, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function deleteLesson(id, accessToken) {
    const response = await axios.delete(`${server}/deleteLesson/${id}`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};
