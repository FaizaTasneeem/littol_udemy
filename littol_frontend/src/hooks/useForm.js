import { useState, useEffect } from "react";

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
        validateCredentials();
        console.log(formValues);
    }

    function validateCredentials () {
        if(!formValues.email || !formValues.password) {
            setError(true);
            console.log("Email & Password Required");
        }
        else{setError(false)};
    }

    return {signInClicked, formValues, error, handleSignInClick, handleInputChange, handleSubmit};
}