import { catchAsync } from "../middlewares/catchAsync.js";
import { profileService } from "../services/profileService.js";

export const getProfile = catchAsync(async (req,res) => {
    const email = req.user.email;
    const { user, message } = await profileService.profile({email});
    return res.status(200).json({ user, message });
});

export const editProfile = catchAsync(async (req,res) => {
    const email = req.user.email;
    const { fullname } = req.body;
    const { updatedUser, message } = await profileService.editProfile({email, fullname});
    return res.status(200).json({ updatedUser, message });
});
