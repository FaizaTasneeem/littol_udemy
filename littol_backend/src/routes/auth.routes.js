import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../auth/token.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/login", async (req, res ) => {
  try {
    const { email, password } = req.body;

    //verify email & password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const isValidCredentials = await bcrypt.compare(password, user.passwordHash);
    // if (!isValidCredentials) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    // }

    //generate access + refresh tokens & set cookie
    const {accessToken, refreshToken} = await generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  }
  catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});


router.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    //find user by refresh token
    if (!token) {
      return res.status(401).json({ message: "Refresh token missing" });
    }
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    //validate refresh token & generate access & refresh tokens again
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).json({message: "Invalid refresh token"});
      }

      //generate access & refresh tokens
      const {accessToken, refreshToken} = await generateTokens(payload);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken });
    });
  }
  catch (error) {

  }
});


router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }
  const user = await User.findOne({refreshtoken: token});
  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken");
})


async function generateTokens(user){
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {accessToken, refreshToken};
}

export default router;