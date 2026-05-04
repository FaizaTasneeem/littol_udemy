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
            return {...state, signInClicked: !state.signInClicked, error: null};
        case "INPUT_CHANGE":
            return {...state, formValues: {...state.formValues, [action.name]: action.value}};
        case "SET_ERROR":
            return {...state, error: action.msg};
        default:
            return state;
    }
}

export function useFormHandler() {
    const navigate = useNavigate();
    const {setAccessToken, setUser, setPreviewUrl} = userStore();

    const [formState, dispatch] = useReducer(reducer, initialState);

    async function handleLogin(signInStatus) {
        // e.preventDefault();
        const authMode = signInStatus ? 'login' : 'signup' ;

        const validationError = validateCredentials(authMode, formState.formValues);
        if(validationError) {
            dispatch({ type: 'SET_ERROR', msg: validationError });
            return;
        }

        try {
            const serverResponse = await sendAuthRequest(authMode, formState.formValues);
            console.log("Success", serverResponse);

            setAccessToken(serverResponse.data.accessToken);
            setUser(serverResponse.data.updatedUser);
            setPreviewUrl(`${server}${serverResponse.data.updatedUser.profilePicFilePath}`);

            navigate("/dashboard");
        }
        catch (err) {
            dispatch({ type: 'SET_ERROR', msg: err?.response?.data?.message ?? err.message });
            console.log(err?.response?.data?.message ?? err.message);
        }
    }

    return {formState, dispatch, handleLogin};
}