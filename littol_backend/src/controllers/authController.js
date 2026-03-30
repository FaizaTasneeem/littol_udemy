import { catchAsync } from "../middlewares/catchAsync.js";
import { authService } from "../services/authService.js";

export const register = catchAsync(async (req, res) => {
    const { fullname, email, password } = req.body;

    const { updatedUser, accessToken, refreshToken, message } = await authService.createUser({ fullname, email, password });

    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({ updatedUser, accessToken, message });
});

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { updatedUser, accessToken, refreshToken, message } = await authService.loginUser({ email, password });

    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({ updatedUser, accessToken, message });
});

export const refresh = catchAsync(async (req, res) => {
    const token = req.cookies.refreshToken;

    const { updatedUser, accessToken, refreshToken, message } = await authService.refresh({ token });

    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({ updatedUser, accessToken, message });
});

export const logout = catchAsync(async (req, res) => {
    const token = req.cookies.refreshToken;

    const { updatedUser, message } = await authService.logout({ token });

    res.clearCookie("refreshToken");

    return res.status(200).json({ updatedUser, message });
});


function setRefreshTokenCookie(res, refreshToken) {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}