import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import katamerosRoutes from "./routes/katameros.js";
import synaxariumRoutes from "./routes/synaxarium-routes.js";
import allSynaxarium from "./routes/allSynaxarium-routes.js";
import aiRoutes from "./routes/ai-routes.js";

const app = express();

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sira1-eta.vercel.app",
    ],
    credentials: true,
  })
);app.use(express.json());

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

// ROUTES
app.use("/api/synaxarium", synaxariumRoutes);
app.use("/api/katameros", katamerosRoutes);
app.use("/api/all-synaxarium", allSynaxarium);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

console.log("KEY:", process.env.GROQ_API_KEY);
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;