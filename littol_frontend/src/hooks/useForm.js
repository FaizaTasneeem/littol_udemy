import { useState, useEffect } from "react";

export function useFormHandler() {
    const [signInClicked, setSignInClicked] = useState(false);

    function handleSignInClick() {
        setSignInClicked((prev) => !prev);
    }

    useEffect(() => {
        console.log(signInClicked);
    }, [signInClicked]);


    return {signInClicked, handleSignInClick};
}