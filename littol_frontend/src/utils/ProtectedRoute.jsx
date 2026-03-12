import { useState, useEffect, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { setAccessToken, getAccessToken } from './authStore';
import { sendRefreshRequest } from '../services/authService';


function ProtectedRoute() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const isRefreshingRef = useRef(false);
    const accessToken = getAccessToken();

    useEffect(() => {
        async function checkAuth() {
            if (accessToken) {
                setIsLoading(false);
                return;
            }

            // Prevent multiple concurrent refresh attempts (fixes StrictMode double effect calls)
            if (isRefreshingRef.current) {
                console.log("🛑 Blocking concurrent refresh attempt");
                return;
            }
            isRefreshingRef.current = true;
                    
            try {
                console.log("🔄 Starting refresh request...");
                const response = await sendRefreshRequest();
                console.log("✅ Token refreshed successfully !!!", response);
                setAccessToken(response.data.accessToken);
                setIsLoading(false);
            }
            catch (err) {
                console.log("❌ Token refresh failed. Redirecting to login...", err);
                navigate("/", { replace: true });
            }
        }
        
        checkAuth();

    }, []);  

    if(isLoading) return <>Loading...</>;
    
    return <Outlet/>;
}

export default ProtectedRoute