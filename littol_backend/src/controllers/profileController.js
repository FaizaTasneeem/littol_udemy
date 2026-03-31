import { catchAsync } from "../middlewares/catchAsync.js";
import { profileService } from "../services/profileService.js";

export const getProfile = catchAsync(async (req,res) => {
    const userId = req.user.id;
    const { user, message } = await profileService.profile({ userId });
    return res.status(200).json({ user, message });
});

export const editProfile = catchAsync(async (req,res) => {
    const userId = req.user.id;
    const updates = req.body;
    const { updatedUser, message } = await profileService.editProfile({ userId, updates });
    return res.status(200).json({ updatedUser, message });
});

export const editProfilePic = catchAsync(async (req,res) => {
    const userId = req.user.id;
    const updates = { profilePicFilePath: req.file.path };
    const { updatedUser, message } = await profileService.editProfile({ userId, updates });
    return res.status(200).json({ updatedUser, message });
});
