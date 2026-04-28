import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { sendAuthRequest } from "../services/authService";
import { validateCredentials } from "../utils/authValidation";
import { userStore } from "../store/AppStore";

const server = import.meta.env.VITE_BACKEND_SERVER || 'http://localhost:5000/';

const initialState = {
    signInClicked: false,
    formValues: {fullname:"", email:"", password:""},
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SIGN_IN":
            return {...state, signInClicked: !signInClicked, error: null};
        case "INPUT_CHANGE":
            return {...state, formValues: {...state.formValues, [action.name]: action.value}};
        case "SET_ERROR":
            return {...state, error: action.error};
        default:
            return state;
    }
}

export function useFormHandler() {
    const navigate = useNavigate();
    const {setAccessToken, setUser, setPreviewUrl} = userStore();

    const [formState, dispatch] = useReducer(reducer, initialState);
    // const [signInClicked, setSignInClicked] = useState(false);
    // const [formValues, setFormValues] = useState(userInput);
    // const [error, setError] = useState(null);

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

        const validationError = validateCredentials(authMode, formValues);
        if(validationError) {
            setError({msg: validationError});
            return;
        }

        try {
            const serverResponse = await sendAuthRequest(authMode, formValues);
            console.log("Success", serverResponse);

            setAccessToken(serverResponse.data.accessToken);
            setUser(serverResponse.data.updatedUser);
            setPreviewUrl(`${server}${serverResponse.data.updatedUser.profilePicFilePath}`);

            navigate("/dashboard");
        }
        catch (err) {
            setError({msg: err?.response?.data?.message ?? err.message })
            console.log(err?.response?.data?.message ?? err.message);
        }
    }

    return {signInClicked, formValues, error, handleSignInClick, handleInputChange, handleLogin};
}