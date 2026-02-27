import jwt from "jsonwebtoken";

export const generateAccessToken = (username) => {
  return jwt.sign({ email: username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (username) => {
  return jwt.sign({ email: username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
