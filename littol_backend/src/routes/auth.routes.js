import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { register, login, refresh, logout } from "../controllers/authController.js";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../auth/token.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);


// router.post("/signup", async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     //verify email & password
//     if (!fullname || !email || !password) {
//       return res.status(400).json({ message: "Email and Password required !" });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(401).json({ message: "User already exists !" });
//     }
//     console.log("input register data - ", fullname, email, password);

//     //insert a user in db
//     const newUser = new User({
//       fullname: fullname,
//       email: email,
//       passwordHash: password,
//       refreshToken: null,
//     });
//     await newUser.save();
    
//     //generate access + refresh tokens & set cookie
//     const { accessToken, refreshToken } = await generateTokens(newUser);
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.status(201).json({ accessToken, user: newUser, message: "User created successfully !" });
//   } 
//   catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: error.message });
//   }
// });


// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //verify email & password
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and Password required !" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials !" });
//     }
//     // const isValidCredentials = await bcrypt.compare(password, user.passwordHash);
//     // if (!isValidCredentials) {
//     //     return res.status(401).json({ message: "Invalid credentials" });
//     // }
//     console.log("input login data - ", email, password);

//     //generate access + refresh tokens & set cookie
//     const { accessToken, refreshToken } = await generateTokens(user);
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ accessToken, user, message: "User logged in successfully !" });
//   } 
//   catch (error) {
//     console.error("Login error: ", error);
//     return res
//       .status(500)
//       .json({ message: "Something went wrong. Please try again." });
//   }
// });


// router.post("/refresh", async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;

//     //find user by refresh token
//     if (!token) {
//       return res.status(401).json({ message: "Refresh token missing !" });
//     }
//     const user = await User.findOne({ refreshToken: token });
//     if (!user) {
//       return res.status(403).json({ message: "Invalid refresh token !" });
//     }

//     //verify refresh token sent in cookies
//     const decoded_payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

//     //generate new access + refresh tokens & set cookie
//     const { accessToken, refreshToken } = await generateTokens(user);
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ accessToken, user });
//   } 
//   catch (error) {
//     console.log("Refresh error: ", error);
//     return res.status(403).json({ error: error.message });
//   }
// });


// router.post("/logout", async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;

//     //find user by refresh token
//     if (!token) {
//       return res.status(401).json({ message: "Refresh token missing !" });
//     }
//     const user = await User.findOne({ refreshToken: token });
//     if (!user) {
//       return res.status(403).json({ message: "Invalid refresh token !" });
//     }

//     //clear refresh token in user + cookie
//     user.refreshToken = null;
//     await user.save();
//     res.clearCookie("refreshToken");
//     return res.status(200).json({ message: "Logged out successfully" })
//   } 
//   catch (error) {
//     console.log("Logout error: ", error);
//     return res.status(403).json({ error: error.message });
//   }
// });


router.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  console.log(user);

  return res
    .status(200)
    .json({ message: `Authorization Successful for ${user.email}` });
});


router.put("/edit-profile", authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  user.fullname = req.body.fullname ;
  await user.save();
  
  return res.status(200).json({ message: "User name updated !" });
});


async function generateTokens(user) {
  const accessToken = generateAccessToken(user.email);
  const refreshToken = generateRefreshToken(user.email);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
}

export default router;
