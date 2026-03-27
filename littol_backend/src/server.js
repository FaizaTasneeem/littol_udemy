import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./database/mongo.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import courseRoutes from "./routes/course.routes.js";
import env from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/course", courseRoutes);


async function bootstrap() {
  try {
    await connectToMongoDB();

    app.listen(env.port, () => {
      console.log(`Server started at port ${env.port}...`);
    });
  } 
  catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

bootstrap();