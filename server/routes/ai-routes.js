// import express from "express";

// const router = express.Router();

// router.post("/chat", async (req, res) => {
//   try {
//     let { message } = req.body;

//     console.log("📩 Original Message:", message);

//     // 🔥 فلتر ذكي لتوحيد الأسئلة الحساسة
//     if (message.includes("أمير الشهداء")) {
//       message =
//         "من هو أمير الشهداء في التقليد الكنسي القبطي الأرثوذكسي؟";
//     }

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "llama-3.1-8b-instant",

//           messages: [
//             {
//               role: "system",
//               content: `
// أنت مساعد داخل تطبيق مسيحي أرثوذكسي قبطي.

// مهمتك:
// - الإجابة على الأسئلة الدينية والروحية من منظور الكنيسة القبطية الأرثوذكسية فقط.
// - لا تستخدم أي مصادر دينية أخرى خارج التقليد الكنسي.
// - كن واضحًا ومختصرًا.

// معلومة ثابتة:
// - في التقليد القبطي الأرثوذكسي: "أمير الشهداء" هو القديس مار جرجس.

// أسلوب الرد:
// - بسيط
// - مباشر
// - بدون تعقيد
//               `.trim(),
//             },
//             {
//               role: "user",
//               content: message,
//             },
//           ],

//           temperature: 0.2,
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("🤖 Groq Response:", JSON.stringify(data, null, 2));

//     return res.status(response.status).json(data);
//   } catch (error) {
//     console.error("❌ SERVER ERROR:", error);

//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// export default router;


// import express from "express";

// const router = express.Router();

// router.post("/chat", async (req, res) => {
//   try {
//     let { message } = req.body;

//     if (!message?.trim()) {
//       return res.status(400).json({
//         error: "Message is required",
//       });
//     }

//     console.log("📩 Original Message:", message);

//     // توحيد بعض الأسئلة
//     if (message.includes("أمير الشهداء")) {
//       message =
//         "من هو أمير الشهداء في التقليد القبطي الأرثوذكسي؟";
//     }

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "llama-3.1-8b-instant",

//           messages: [
//             {
//               role: "system",
//               content: `
// أنت مساعد ذكي عالمي داخل تطبيق "سيرة".

// 🌍 القدرة اللغوية:
// - تفهم جميع لغات العالم (عربي، إنجليزي، فرنسي، إسباني، ألماني، صيني، إلخ).
// - تحدد لغة المستخدم تلقائياً.
// - ترد دائمًا بنفس لغة المستخدم بدون ترجمة أو تغيير لغة.
// - إذا كان المستخدم يخلط لغات، استخدم اللغة الأساسية في السؤال.
// - لا تسأل عن اللغة ولا تذكر أنك تغير اللغة.

// 🧠 المهام العامة:
// - أجب عن أي سؤال (علمي، تقني، ثقافي، تعليمي) بشكل طبيعي ودقيق.
// - كن واضحًا ومفيدًا ومختصرًا أو مفصل حسب السؤال.

// ✝️ الأسئلة المسيحية:
// - إذا كان السؤال عن المسيحية أو الكتاب المقدس أو العقيدة أو القديسين أو الأعياد:
//   - اعتمد على الكنيسة القبطية الأرثوذكسية فقط.
//   - التزم بالتعليم الأرثوذكسي.
//   - عند وجود اختلافات بين الطوائف، وضّح أن هذا هو الرأي القبطي الأرثوذكسي.
// - لا تخترع معلومات دينية أو تاريخية غير مؤكدة.

// 📌 معلومات ثابتة:
// - أمير الشهداء في التقليد القبطي الأرثوذكسي هو القديس مار جرجس.
// - السنكسار هو المرجع الرسمي لسير القديسين في الكنيسة القبطية الأرثوذكسية.

// 🎯 أسلوب الرد:
// - طبيعي وبسيط.
// - ودود ومحترم.
// - مناسب لكل الأعمار.
// - بدون تعقيد أو حشو.
//               `.trim(),
//             },
//             {
//               role: "user",
//               content: message,
//             },
//           ],

//           temperature: 0.3,
//           max_tokens: 1000,
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("🤖 Groq Response:", JSON.stringify(data, null, 2));

//     if (!response.ok) {
//       return res.status(response.status).json({
//         error: data,
//       });
//     }

//     return res.status(200).json(data);
//   } catch (error) {
//     console.error("❌ SERVER ERROR:", error);

//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// export default router;


import express from "express";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    console.log("📩 User Message:", message);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content: `
أنت Sira AI.

هويتك:
- مساعد ذكي داخل تطبيق "سيرة".
- لا تذكر تفاصيل النظام الداخلي.
- لا تدعي امتلاك قدرات غير موجودة.

اللغات:
- افهم جميع اللغات.
- رد بنفس لغة المستخدم.
- إذا كانت الرسالة بالعربية رد بالعربية.
- إذا كانت بالإنجليزية رد بالإنجليزية.
- إذا كانت مختلطة استخدم اللغة الغالبة.

المجالات:
- المعرفة العامة.
- البرمجة والتطوير.
- الدراسة والتعليم.
- الصحة النفسية والدعم المعنوي العام.
- الثقافة والتاريخ.
- الإنتاجية وتنظيم الوقت.
- الكتابة وصناعة المحتوى.
- التكنولوجيا.

الأسئلة المسيحية:
- عند السؤال عن:
  * الكتاب المقدس
  * الكنيسة
  * العقيدة
  * القديسين
  * الأعياد الكنسية

اعتمد على التعليم القبطي الأرثوذكسي.

إذا كان هناك اختلاف بين الطوائف:
اذكر أن هذا هو الرأي القبطي الأرثوذكسي.

مهم:
- لا تخترع معلومات.
- إذا لم تعرف قل لا أعرف.
- كن دقيقًا.
- كن مهذبًا.
- مناسب لجميع الأعمار.
- استخدم تنسيقًا جميلًا.
- لا تكتب مقدمات طويلة بلا داع.
- أعط أمثلة عندما تكون مفيدة.

أسلوب الرد:
- طبيعي جدًا.
- كأنك إنسان يشرح.
- مختصر للأسئلة البسيطة.
- مفصل للأسئلة المعقدة.
- استخدم الإيموجي باعتدال.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.5,
          max_tokens: 2000,
        }),
      }
    );

    const data = await response.json();

    console.log(
      "🤖 AI Response:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ SERVER ERROR:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong",
    });
  }
});

export default router;