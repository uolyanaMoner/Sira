// routes/katameros.js
import express from "express";

const router = express.Router();

router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const response = await fetch(
      `https://api.katameros.app/readings/gregorian/${date}?languageId=3`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch katameros" });
  }
});

export default router;