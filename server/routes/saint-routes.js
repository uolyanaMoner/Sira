import express from "express";
import Saint from "../models/Saint.js";

const router = express.Router();

// ➕ إضافة قديس
router.post("/add", async (req, res) => {
  try {
    const saint = await Saint.create(req.body);
    res.status(201).json(saint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📄 جلب كل القديسين
router.get("/", async (req, res) => {
  try {
    const saints = await Saint.find();
    res.json(saints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;