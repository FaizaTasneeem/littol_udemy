import { catchAsync } from "../middlewares/catchAsync.js";
import { authService } from "../services/authService.js";

export const register = catchAsync(async (req, res) => {
    const { fullname, email, password } = req.body;

    const {user, accessToken, refreshToken, message} = await authService.createUser({ fullname, email, password });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user, accessToken, message });
});

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const {user, accessToken, refreshToken, message} = await authService.loginUser({ email, password });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user, accessToken, message });
});

export const refresh = catchAsync(async (req, res) => {
    const token = req.cookies.refreshToken;

    const {user, accessToken, refreshToken, message} = await authService.refresh({ token });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user, accessToken, message });
});

export const logout = catchAsync(async (req, res) => {
    const token = req.cookies.refreshToken;

    const {user, message} = await authService.logout({ token });

    res.clearCookie("refreshToken");

    return res.status(200).json({ user, message });
});
