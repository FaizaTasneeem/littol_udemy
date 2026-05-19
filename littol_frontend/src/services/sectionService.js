import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_SECTION || 'http://localhost:5000/api/section';

export async function getSections(courseId, accessToken) {
    const response = await axios.get(`${server}/getSections`, 
        {
            params: { courseId },
            headers: { 'authorization': `Bearer ${accessToken}`}
        });
    return response;
};

export async function createSection(section, accessToken) {
    const response = await axios.post(`${server}/createSection`, section, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function updateSection(id, section, accessToken) {
    const response = await axios.put(`${server}/updateSection/${id}`, Section, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};

export async function deleteSection(id, accessToken) {
    const response = await axios.delete(`${server}/deleteSection/${id}`, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
};
