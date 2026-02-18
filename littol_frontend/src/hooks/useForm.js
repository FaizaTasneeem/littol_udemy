import { useState, useEffect } from "react";

export function useFormHandler(userInput) {
    const [signInClicked, setSignInClicked] = useState(false);
    const [formValues, setFormValues] = useState(userInput);

    useEffect(() => {
        console.log(signInClicked);
    }, [signInClicked]);

    useEffect(() => {
        console.log(password);
    }, [formValues]);


    function handleSignInClick() {
        setSignInClicked((prev) => !prev);
    }
    
    function handleSubmit() {
    }
    
    function handleInputChange() {
    }

    return {signInClicked, formValues, handleSignInClick, handleSubmit, handleInputChange};
}