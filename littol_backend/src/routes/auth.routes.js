import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { users } from "../data/users.js";
import { generateAccessToken, generateRefreshToken } from "../auth/token.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //   if (!email || !password) {
  //     return res.status(400).json({ message: "Email and password required" });
  //   }

  const user = users.find((u) => u.email === email);
  // if (!user) {
  //     return res.status(401).json({ message: "Invalid credentials" });
  // }

  // const isValidCredentials = await bcrypt.compare(password, user.passwordHash);
  // if (!isValidCredentials) {
  //     return res.status(401).json({ message: "Invalid credentials" });
  // }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

router.post("/refresh", (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const user = users.find((u) => u.refreshToken === token);
  // if (!user) {
  //   return res.status(403).json({ message: "Invalid refresh token" });
  // }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    user.refreshToken = newRefreshToken;

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  });
});

router.get("/check-cookie", (req, res) => {
  console.log(req.cookies.refreshToken);
  res.json({ refreshToken: req.cookies.refreshToken });
});

router.post("/check-cookie", (req, res) => {
  console.log(req.cookies.refreshToken);
  res.json({ refreshToken: req.cookies.refreshToken });
});

export default router;
