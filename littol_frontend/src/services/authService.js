import axios from "axios";

const server = import.meta.env.VITE_BACKEND_SERVER_AUTH || 'http://localhost:5000/api/auth';

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
