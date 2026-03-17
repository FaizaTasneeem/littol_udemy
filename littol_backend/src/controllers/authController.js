import { authService } from "../services/authService.js";

const errorMap = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT_ERROR: 409,
};

export async function register(req, res) {
    try {
        const { fullname, email, password } = req.body;

        const {user, accessToken, refreshToken, message} = await authService.createUser({ fullname, email, password });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user, accessToken, message });
    }
    catch(err) {
        const error_status_code = errorMap[err.code] || 500;
        const message = err.message || 'Internal server error';

        return res.status(error_status_code).json({message});
    }
}

export async function login(req, res){
    try {
        const { email, password } = req.body;

        const {user, accessToken, refreshToken, message} = await authService.loginUser({ fullname, email, password });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user, accessToken, message });     
    }
    catch(err) {
        const error_status_code = errorMap[err.code] || 500;
        const message = err.message || 'Internal server error'

        return res.status(error_status_code).json({message});
    }
    
}

export async function refresh(req, res) {
    try {
        const token = req.cookies.refreshToken;

        const {user, accessToken, refreshToken, message} = await authService.refresh({ token });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user, accessToken, message });     

    }
    catch(err) {
        const error_status_code = errorMap[err.code] || 500;
        const message = err.message || 'Internal server error'

        return res.status(error_status_code).json({message});
    }
}

export async function logout(req, res) {
    try {
        const token = req.cookies.refreshToken;

        const {user, message} = await authService.logout({ token });

        res.clearCookie("refreshToken");

        return res.status(200).json({ user, message });     

    }
    catch(err) {
        const error_status_code = errorMap[err.code] || 500;
        const message = err.message || 'Internal server error'

        return res.status(error_status_code).json({message});
    }   
}