// // import express from "express";
// // import SynaxariumDay from "../models/SynaxariumDay.js";

// // const router = express.Router();

// // router.get("/today", async (req, res) => {
// //   try {
// //     const now = new Date();

// //     const day = String(now.getDate()).padStart(2, "0");
// //     const month = String(now.getMonth() + 1).padStart(2, "0");

// //     const date = `${day}-${month}`;

// //     const data = await SynaxariumDay.findOne({ date });

// //     if (!data) {
// //       return res.json({
// //         ok: false,
// //         message: "No data for today",
// //         date,
// //       });
// //     }

// //     return res.json({
// //       ok: true,
// //       data,
// //     });

// //   } catch (err) {
// //     return res.status(500).json({
// //       ok: false,
// //       message: err.message,
// //     });
// //   }
// // });

// // export default router;


// import express from "express";
// import SynaxariumDay from "../models/SynaxariumDay.js";

// const router = express.Router();

// router.get("/today", async (req, res) => {
//   try {
//     const now = new Date();

//     const day = String(now.getDate()).padStart(2, "0");
//     const month = String(now.getMonth() + 1).padStart(2, "0");

//     const date = `${day}-${month}`;

//     const data = await SynaxariumDay.findOne({ date });

//     if (!data) {
//       return res.json({
//         ok: false,
//         message: "No data for today",
//         date,
//       });
//     }

//     return res.json({
//       ok: true,
//       data,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       ok: false,
//       message: err.message,
//     });
//   }
// });

// export default router;


// import express from "express";
// import SynaxariumDay from "../models/SynaxariumDay.js";

// const router = express.Router();

// router.get("/today", async (req, res) => {
//   try {
//     const now = new Date();

//     const day = String(now.getDate()).padStart(2, "0");
//     const month = String(now.getMonth() + 1).padStart(2, "0");

//     const date = `${day}-${month}`;

//     const data = await SynaxariumDay.findOne({ date });

//     return res.json({
//       ok: !!data,
//       data,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       ok: false,
//       message: err.message,
//     });
//   }
// });

// export default router;
// import express from "express";
// import SynaxariumDay from "../models/SynaxariumDay.js";

// const router = express.Router();

// const copticMonths = [
//   "توت", "بابه", "هاتور", "كيهك",
//   "طوبة", "أمشير", "برمهات", "برمودة",
//   "بشنس", "بؤونة", "أبيب", "مسرى", "النسيء"
// ];

// // 📌 ثابت: بداية السنة القبطية
// const COPTIC_START = { month: 8, day: 11 }; // 11 سبتمبر

// router.get("/today", async (req, res) => {
//   try {
//     const now = new Date();

//     const start = new Date(now.getFullYear(), COPTIC_START.month, COPTIC_START.day);

//     // لو قبل 11 سبتمبر → نرجع سنة قبل
//     if (now < start) {
//       start.setFullYear(start.getFullYear() - 1);
//     }

//     const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

//     let day = (diffDays % 30) + 1;
//     let monthIndex = Math.floor(diffDays / 30);

//     // الشهر الصغير
//     if (monthIndex >= 12) {
//       monthIndex = 12;
//     }

//     const date = `${String(day).padStart(2, "0")}-${String(monthIndex + 1).padStart(2, "0")}`;

//     const data = await SynaxariumDay.findOne({ date });

//     return res.json({
//       ok: !!data,
//       data,
//       copticDate: `${day} ${copticMonths[monthIndex]}`,
//       gregorianDate: now.toLocaleDateString("ar-EG"),
//     });

//   } catch (err) {
//     console.error("❌ ERROR:", err);
//     return res.status(500).json({
//       ok: false,
//       message: err.message,
//     });
//   }
// });

// export default router;

import express from "express";

const router = express.Router();

const copticMonths = [
  "توت", "بابه", "هاتور", "كيهك",
  "طوبة", "أمشير", "برمهات", "برمودة",
  "بشنس", "بؤونة", "أبيب", "مسرى", "النسيء"
];

// 11 سبتمبر = بداية السنة القبطية (تقريب)
const COPTIC_START = { month: 8, day: 11 };

router.get("/today", (req, res) => {
  const now = new Date();

  const start = new Date(now.getFullYear(), COPTIC_START.month, COPTIC_START.day);

  if (now < start) {
    start.setFullYear(start.getFullYear() - 1);
  }

  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

  const day = (diffDays % 30) + 1;
  const monthIndex = Math.floor(diffDays / 30);

  const monthName = copticMonths[Math.min(monthIndex, 12)];

  return res.json({
    ok: true,
    copticDate: `${day} ${monthName}`,
    gregorianDate: now.toLocaleDateString("ar-EG"),
  });
});

router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const { languageId = 3 } = req.query; // 👈 هنا

    const response = await fetch(
      `https://api.katameros.app/readings/gregorian/${date}?languageId=${languageId}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch katameros" });
  }
});

export default router;