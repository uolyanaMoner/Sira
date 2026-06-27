import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    const allData = [];

    // 📅 Loop على السنة كلها
    for (let month = 1; month <= 12; month++) {

      for (let day = 1; day <= 31; day++) {

        const dd = String(day).padStart(2, "0");
        const mm = String(month).padStart(2, "0");

        const date = `${dd}-${mm}-2025`;

        try {

          // 📡 Fetch from Katameros
          const response = await fetch(
            `https://api.katameros.app/readings/gregorian/${date}?languageId=3`
          );

          const data = await response.json();

          // 📖 Get Liturgy section
          const liturgy = data?.sections?.find(
            (s) => s.title === "قداس"
          );

          // 📖 Get Synaxarium subsection
          const synaxariumSection =
            liturgy?.subSections?.find((s) =>
              s.title?.includes("سنكسار")
            );

          // 📖 Readings array
          const readings =
            synaxariumSection?.readings || [];

          // 📦 Push data
          readings.forEach((item) => {

            allData.push({
              title: item.title,
              content: item.html,
              copticDate: data.copticDate,
              gregorianDate: date,
            });

          });

          console.log("✅", date);

        } catch (err) {

          console.log("❌", date);

        }
      }
    }

    // 💾 Save JSON file
    fs.writeFileSync(
      "./synaxarium.json",
      JSON.stringify(allData, null, 2),
      "utf-8"
    );

    // ✅ Response
    res.json({
      message: "Synaxarium saved successfully",
      total: allData.length,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

export default router;