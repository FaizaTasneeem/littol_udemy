import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./database/mongo.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

dotenv.config();
await connectToMongoDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}...`);
});
