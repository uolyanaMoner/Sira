// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import katamerosRoutes from "./routes/katameros.js";
// import synaxariumRoutes from "./routes/synaxarium-routes.js";
// import allSynaxarium from "./routes/allSynaxarium-routes.js";
// import aiRoutes from "./routes/ai-routes.js";
// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());

// // DB CONNECT
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected ✅"))
//   .catch((err) => console.log("MongoDB error ❌", err));

// // ROUTES
// app.use("/api/synaxarium", synaxariumRoutes);
// app.use("/api/katameros", katamerosRoutes);
// app.use("/api/all-synaxarium", allSynaxarium);
// app.use("/api/ai", aiRoutes);

// app.get("/", (req, res) => {
//   res.json({ ok: true, message: "API is running" });
// });

// console.log("KEY:", process.env.GROQ_API_KEY);
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

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

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;

  console.log("MongoDB connected ✅");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/api/synaxarium", synaxariumRoutes);
app.use("/api/katameros", katamerosRoutes);
app.use("/api/all-synaxarium", allSynaxarium);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API running",
  });
});

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}