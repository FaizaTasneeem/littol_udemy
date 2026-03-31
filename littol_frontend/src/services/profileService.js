import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_PROFILE || 'http://localhost:5000/api/profile';

export async function sendEditProfileRequest(user, accessToken) {
    const response = await axios.put(`${server}/edit-profile`, user, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
}

export async function sendEditProfilePicRequest(formData, accessToken) {
    const response = await axios.put(`${server}/edit-profile-pic`, formData, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
}