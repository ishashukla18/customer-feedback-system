import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", (req, res) => res.json({ message: "API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong on the server" });
});
const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
  .catch((error) => { console.error(error.message); process.exit(1); });
