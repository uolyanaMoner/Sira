// // import dotenv from "dotenv";
// // dotenv.config();

// // import mongoose from "mongoose";
// // import SynaxariumDay from "./models/SynaxariumDay.js";
// // import { may } from "./data/synaxarium/may.js";

// // const seedTodayOnly = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URI);

// //     console.log("🔥 Connected to DB");

// //     const now = new Date();

// //     const day = String(now.getDate()).padStart(2, "0");
// //     const month = String(now.getMonth() + 1).padStart(2, "0");

// //     const today = `${day}-${month}`;

// //     console.log("📅 TODAY:", today);

// //     // 🔍 دور على الداتا بتاعة اليوم في ملفك
// //     const todayData = may.find((d) => d.date === today);

// //     if (!todayData) {
// //       console.log("⚠️ No data in file for today:", today);
// //       process.exit();
// //     }

// //     // 🔥 Upsert (لو موجود مايتكررش)
// //     await SynaxariumDay.updateOne(
// //       { date: today },
// //       { $set: todayData },
// //       { upsert: true }
// //     );

// //     console.log("🌱 Today data inserted/updated successfully");

// //     process.exit();
// //   } catch (err) {
// //     console.log("❌ Error:", err);
// //     process.exit(1);
// //   }
// // };

// // seedTodayOnly();


// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import SynaxariumDay from "./models/SynaxariumDay.js";
// import { may } from "./data/synaxarium/may.js";

// const seedTodayOnly = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("🔥 Connected to DB");

//     const now = new Date();

//     const day = String(now.getDate()).padStart(2, "0");
//     const month = String(now.getMonth() + 1).padStart(2, "0");

//     const today = `${day}-${month}`;

//     console.log("📅 TODAY:", today);

//     const todayData = may.find((d) => d.date === today);

//     if (!todayData) {
//       console.log("⚠️ No data for today:", today);
//       process.exit();
//     }

//     await SynaxariumDay.updateOne(
//       { date: today },
//       { $set: todayData },
//       { upsert: true }
//     );

//     console.log("🌱 Today inserted/updated");

//     process.exit();
//   } catch (err) {
//     console.log("❌ Error:", err);
//     process.exit(1);
//   }
// };

// seedTodayOnly();


// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import SynaxariumDay from "./models/SynaxariumDay.js";
// import { may } from "./data/synaxarium/may.js";

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("🔥 Connected");

//     await SynaxariumDay.deleteMany({});

//     console.dir(may, { depth: null });

//     const result = await SynaxariumDay.insertMany(may);

//     console.log("🌱 Seed Done:", result.length);

//     process.exit();
//   } catch (err) {
//     console.log("❌ Error:", err);
//     process.exit(1);
//   }
// };

// seed();


import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import SynaxariumDay from "./models/SynaxariumDay.js";
import { allSynaxarium } from "./data/synaxarium/all.js";

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🔥 Connected");

    await SynaxariumDay.deleteMany({});

    console.log("🧹 Cleared old data");

    const result = await SynaxariumDay.insertMany(allSynaxarium);

    console.log("🌱 Seed Done:", result.length);

    process.exit();
  } catch (err) {
    console.log("❌ Error:", err);
    process.exit(1);
  }
};

seed();