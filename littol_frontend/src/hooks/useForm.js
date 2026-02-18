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

    function handleInputChange(e) {
        const {name, value} = e.target;
        setFormValues((prev) => ({...prev, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formValues);
    }


    return {signInClicked, formValues, handleSignInClick, handleInputChange, handleSubmit};
}