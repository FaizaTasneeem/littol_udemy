import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendLogoutRequest } from "../services/authService";
import { userStore } from "../store/AppStore";

export function useLogout() {
    const navigate = useNavigate();
    const [, setError] = useState(null);
    const {setAccessToken, setUser, setPreviewUrl} = userStore();
    
    async function handleLogout() {
        try {
            const response = await sendLogoutRequest();
            console.log("Success", response);

            // localStorage.removeItem("accessToken");
            setAccessToken(null);
            setUser(null);
            setPreviewUrl(null);
            
            navigate("/");
        }
        catch (err) {
            setError({msg: err?.response?.data?.message ?? err.message })
            console.log(err?.response?.data?.message ?? err.message);
        }
        
    }

    return {handleLogout};
}