import axios from "axios";
import { useState, useEffect } from "react";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/api/auth';

export function useFormHandler(userInput) {
    const [signInClicked, setSignInClicked] = useState(false);
    const [formValues, setFormValues] = useState(userInput);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(signInClicked);
    }, [signInClicked]);

    // useEffect(() => {
    //     console.log(formValues);
    // }, [formValues]);


    function handleSignInClick() {
        setSignInClicked((prev) => !prev);
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormValues((prev) => ({...prev, [name]: value}));
    }

    async function handleSubmit(signInStatus) {
        // e.preventDefault();
        const authMode = signInStatus ? 'login' : 'signup' ;

        console.log(authMode);
        console.log(formValues);
        
        if (!validateCredentials(authMode)) return;

        try {
            const serverResponse = await sendAuthRequest(authMode);
            console.log("Success", serverResponse);
        }
        catch (err) {
            console.log(err.response.data.message);
        }
    }

    function validateCredentials (authMode) {
        if(authMode === 'login' && (!formValues.email || !formValues.password)) {
            setError(true);
            console.log("Email & Password Required");
            return false;
        }
        else if (authMode === 'signup' && (!formValues.fullname || !formValues.email || !formValues.password)) {
            setError(true);
            console.log("All fields are required");
            return false;
        }
        else{
            setError(false);
            return true;
        };
    }

    async function sendAuthRequest(authMode) {
        const response = await axios.post(`${server}/${authMode}`, formValues);
        return response;
    }

    return {signInClicked, formValues, error, handleSignInClick, handleInputChange, handleSubmit};
}