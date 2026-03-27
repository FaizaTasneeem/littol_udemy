import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: String(userId) }, env.accessTokenSecret, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: String(userId) }, env.refreshTokenSecret, {
    expiresIn: "7d",
  });
};
