import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || "5000",
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/littol_db",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export default env;