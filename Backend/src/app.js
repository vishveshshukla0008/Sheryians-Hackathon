import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import incidentRoutes from "./routes/incident.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";
import postmortemRoutes from "./routes/postmortem.routes.js";
import statusRoutes from "./routes/status.routes.js";
import contactRoutes from "./routes/contact.routes.js";

import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(cookieParser());

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/incidents", postmortemRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
