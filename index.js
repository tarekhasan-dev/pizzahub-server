import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./src/config/db.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Phase 8 এ webhook route এখানে বসবে, express.json() এর আগে

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "PizzaHub API is running" });
});

app.get("/api/health", async (req, res, next) => {
  try {
    await connectDB();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const port = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;