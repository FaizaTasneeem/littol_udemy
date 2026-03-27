import { catchAsync } from "../middlewares/catchAsync.js";
import { profileService } from "../services/profileService.js";

export const getProfile = catchAsync(async (req,res) => {
    const userId = req.user._id;
    const { user, message } = await profileService.profile({ userId });
    return res.status(200).json({ user, message });
});

export const editProfile = catchAsync(async (req,res) => {
    const userId = req.user._id;
    const { fullname } = req.body;
    const { updatedUser, message } = await profileService.editProfile({ userId, fullname });
    return res.status(200).json({ updatedUser, message });
});
