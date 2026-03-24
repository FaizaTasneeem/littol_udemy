import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./database/mongo.js";
import authRoutes from "./routes/auth.routes.js";
import env from "./config/env.js";

const app = express();

await connectToMongoDB();

app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(env.port, () => {
  console.log(`Server started at port ${env.port}...`);
});
