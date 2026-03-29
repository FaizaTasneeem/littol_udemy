import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_COURSE || 'http://localhost:5000/api/course';

export async function sendEditProfileRequest(user, accessToken) {
    const response = await axios.put(`${server}/edit-profile`, user, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
}