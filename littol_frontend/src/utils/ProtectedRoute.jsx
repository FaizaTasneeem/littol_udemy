import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { sendRefreshRequest } from '../services/authService';
import { UserContext } from "../context/AppContext";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/';

function ProtectedRoute() {
    const navigate = useNavigate();
    const {accessToken, setAccessToken, setUser, setPreviewUrl} = useContext(UserContext);
    
    const [isLoading, setIsLoading] = useState(true);
    const isRefreshingRef = useRef(false);

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
                setUser(response.data.updatedUser);
                setPreviewUrl(`${server}${response.data.updatedUser.profilePicFilePath}`);
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