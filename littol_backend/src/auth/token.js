import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (email) => {
  return jwt.sign({ email: email }, env.accessTokenSecret, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (email) => {
  return jwt.sign({ email: email }, env.refreshTokenSecret, {
    expiresIn: "7d",
  });
};
