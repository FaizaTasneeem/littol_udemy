import { useState, useEffect } from "react";

export function useFormHandler(userInput) {
    const [signInClicked, setSignInClicked] = useState(false);
    const [formValues, setFormValues] = useState(userInput);

    useEffect(() => {
        console.log(signInClicked);
    }, [signInClicked]);

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);


    function handleSignInClick() {
        setSignInClicked((prev) => !prev);
    }

    function handleInputChange() {
    }

    function handleSubmit() {
    }


    return {signInClicked, formValues, handleSignInClick, handleSubmit, handleInputChange};
}