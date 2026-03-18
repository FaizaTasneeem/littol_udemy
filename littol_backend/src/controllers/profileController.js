import { profileService } from "../services/profileService.js";

const errorMap = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT_ERROR: 409,
};

export async function profile(req, res) {
    try{
        const { email } = req.user.email;
        const { user, message } = await profileService.profile({email});
        return res.status(200).json({ user, message })
    }
    catch(error){
        const error_status_code = errorMap[err.code] || 500;
        const message = err.message || 'Internal server error';

        return res.status(error_status_code).json({message});
    }
}

export async function editProfile(req, res) {
    try{

    }
    catch(error){
        const error_status_code = errorMap[err.code] || 500;
        const message = err.message || 'Internal server error';

        return res.status(error_status_code).json({message});
    }
}