import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sendLogoutRequest } from "../services/authService";
import { UserContext } from "../context/AppContext";

export function useLogout() {
    const navigate = useNavigate();
    const [, setError] = useState(null);
    const {setUser, setAccessToken} = useContext(UserContext);
    
    async function handleLogout() {
        try {
            const response = await sendLogoutRequest();
            console.log("Success", response);

            // localStorage.removeItem("accessToken");
            setAccessToken(null);
            setUser(null);
            
            navigate("/");
        }
        catch (err) {
            setError({msg: err?.response?.data?.message ?? err.message })
            console.log(err?.response?.data?.message ?? err.message);
        }
        
    }

    return {handleLogout};
}