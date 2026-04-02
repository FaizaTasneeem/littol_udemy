import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import connectToMongoDB from "./database/mongo.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import courseRoutes from "./routes/course.routes.js";
import env from "./config/env.js";

const app = express();

const serverFile = fileURLToPath(import.meta.url);
const serverDir = path.dirname(serverFile);
const uploadsDir = path.resolve(serverDir, "../uploads/");

app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/course", courseRoutes);


app.listen(env.port, async () => {
  try {
    await connectToMongoDB();
    console.log(`Server started at port ${env.port}...`);
  }
  catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});