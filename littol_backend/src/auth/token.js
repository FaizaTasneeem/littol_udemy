import jwt from "jsonwebtoken";

export const generateAccessToken = (email) => {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (email) => {
  return jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
