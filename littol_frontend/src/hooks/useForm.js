import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sendAuthRequest, sendLogoutRequest } from "../services/authService";
import { validateCredentials } from "../utils/authValidation";
import { setAccessToken, clearAccessToken } from "../utils/authStore";
import { UserContext } from "../context/AppContext";


export function useFormHandler(userInput) {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const [signInClicked, setSignInClicked] = useState(false);
    const [formValues, setFormValues] = useState(userInput);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Sign In Clicked - ", signInClicked);
    }, [signInClicked]);

    // useEffect(() => {
    //     console.log(formValues);
    // }, [formValues]);


    function handleSignInClick() {
        setError(null);
        setSignInClicked((prev) => !prev);
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormValues((prev) => ({...prev, [name]: value}));
    }

    async function handleLogin(signInStatus) {
        // e.preventDefault();
        const authMode = signInStatus ? 'login' : 'signup' ;

        console.log(authMode);
        console.log(formValues);
        
        const validationError = validateCredentials(authMode, formValues);
        if(validationError) {
            setError({msg: validationError});
            return;
        }

        try {
            const serverResponse = await sendAuthRequest(authMode, formValues);
            console.log("Success", serverResponse);

            // localStorage.setItem("accessToken", serverResponse.data.accessToken);
            setAccessToken(serverResponse.data.accessToken);
            setUser(serverResponse.data.user);

            navigate("/home");
        }
        catch (err) {
            setError({msg: err?.response?.data?.message ?? err.message })
            console.log(err?.response?.data?.message ?? err.message);
        }
    }

    async function handleLogout() {
        try {
            const response = await sendLogoutRequest();
            console.log("Success", response);

            // localStorage.removeItem("accessToken");
            clearAccessToken();
            setUser(null);
            
            navigate("/");
        }
        catch (err) {
            setError({msg: err?.response?.data?.message ?? err.message })
            console.log(err?.response?.data?.message ?? err.message);
        }
        
    }

    return {signInClicked, formValues, error, handleSignInClick, handleInputChange, handleLogin, handleLogout};
}