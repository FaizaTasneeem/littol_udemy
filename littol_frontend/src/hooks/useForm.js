import axios from "axios";
import { useState, useEffect } from "react";

const server = process.env.BACKEND_SERVER || 'http://localhost:5500';

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

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formValues);
        
        validateCredentials();


    }

    function validateCredentials () {
        if(!formValues.email || !formValues.password) {
            setError(true);
            console.log("Email & Password Required");
        }
        else{setError(false)};
    }

    async function sendLoginRequest() {
        const response = await axios.post();
    }



    return {signInClicked, formValues, error, handleSignInClick, handleInputChange, handleSubmit};
}