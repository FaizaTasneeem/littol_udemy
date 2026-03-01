import {Navigate} from 'react-router-dom'
import { getAccessToken } from './authStore';

function ProtectedRoute({children}) {
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = getAccessToken();

    if (!accessToken) {
        console.log("No access token found. Redirecting to login.");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute