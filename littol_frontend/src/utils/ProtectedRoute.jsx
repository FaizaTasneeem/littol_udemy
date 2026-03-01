import { useNavigate } from 'react-router-dom'
import { setAccessToken, getAccessToken } from './authStore';
import { sendRefreshRequest } from '../services/authService';


function ProtectedRoute({children}) {
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = getAccessToken();
    
    if (!accessToken) {
        regenerateTokens();
    }
    
    return children;
}

async function regenerateTokens() {
    const navigate = useNavigate();

    try {
        const response = await sendRefreshRequest();
        console.log("Token refreshed successfully", response);
        setAccessToken(response.data.accessToken);
    }
    catch (err) {
        console.log("Token refresh failed. Redirecting to login.", err);
        navigate("/", { replace: true });}
}
export default ProtectedRoute