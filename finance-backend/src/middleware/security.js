import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const securityMiddleware = [
  helmet(), // Security headers
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
];