import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/api/auth';

export async function sendAuthRequest(authMode, formValues) {
    const response = await axios.post(`${server}/${authMode}`, formValues);
    return response;
}

export async function sendRefreshRequest() {
    const response = await axios.post(`${server}/refresh`);
    return response;
}

export async function sendLogoutRequest() {
    const response = await axios.post(`${server}/logout`);
    return response;
}

export async function sendEditProfileRequest(user, accessToken) {
    const response = await axios.put(`${server}/edit-profile`, user, {headers: { 'authorization': `Bearer ${accessToken}`}});
    return response;
}