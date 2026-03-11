import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, getAccessToken } from './authStore';
import { sendRefreshRequest } from '../services/authService';


function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    // const accessToken = localStorage.getItem("accessToken");
    const accessToken = getAccessToken();

    useEffect(() => {
        async function checkAuth() {
            if (accessToken) {
                setIsLoading(false);
                setIsAuthorized(true);
                return;
            }
                    
            try {
                const response = await sendRefreshRequest();
                console.log("Token refreshed successfully !!!", response);
                setAccessToken(response.data.accessToken);
                setIsLoading(false);
                setIsAuthorized(true);
            }
            catch (err) {
                console.log("Token refresh failed. Redirecting to login...", err);
                navigate("/", { replace: true });
            }
        }
        
        checkAuth();

    }, []);

    if(isLoading) return <>Loading...</>;
    if(!isAuthorized) return null;
    
    return children;
}

export default ProtectedRoute