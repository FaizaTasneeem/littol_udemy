import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    console.log("Authorization error ", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
