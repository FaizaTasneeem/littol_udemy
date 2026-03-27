import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/api/auth';

export async function sendEditProfileRequest(user, accessToken) {
    const response = await axios.put(`${server}/edit-profile`, user, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
}