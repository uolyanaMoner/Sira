// import { useRef, useState } from "react";
// import { spiritualVerses, type Mood, type Verse } from "../data/spiritualVerses";

// export default function SpiritualGuide() {
//   const [mood, setMood] = useState<Mood | null>(null);
//   const [verse, setVerse] = useState<Verse | null>(null);

//   const [note, setNote] = useState("");
//   const [highlight, setHighlight] = useState("");

//   const lastVerse = useRef<string | null>(null);

//   const getRandomVerse = (m: Mood) => {
//     const list = spiritualVerses[m];

//     let selected;
//     do {
//       selected = list[Math.floor(Math.random() * list.length)];
//     } while (list.length > 1 && selected.ref === lastVerse.current);

//     lastVerse.current = selected.ref;
//     return selected;
//   };

//   const selectMood = (m: Mood) => {
//     setMood(m);
//     setVerse(getRandomVerse(m));
//     setNote("");
//     setHighlight("");
//   };

//   const saveNote = () => {
//     if (!mood || !verse) return;

//     const existing = JSON.parse(
//       localStorage.getItem("spiritual-notes") || "[]"
//     );

//     const newNote = {
//       id: Date.now().toString(),
//       type: "spiritual",
//       mood,
//       verse,
//       content: note,
//       highlight,
//       date: new Date().toISOString(),
//     };

//     existing.push(newNote);

//     localStorage.setItem("spiritual-notes", JSON.stringify(existing));

//     setNote("");
//     setHighlight("");
//     alert("تم الحفظ 🙏");
//   };

//   const refreshVerse = () => {
//     if (!mood) return;
//     setVerse(getRandomVerse(mood));
//   };

//   return (
//     <div className="min-h-screen px-4 py-10 text-white bg-gradient-to-b from-black to-gray-900">

//       <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
//         🧭 دليلك الروحي
//       </h1>

//       {/* MOODS */}
//       {!mood && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//           {[
//             ["sad", "😔 حزين"],
//             ["anxious", "😟 قلقان"],
//             ["hurt", "💔 مجروح"],
//             ["peace", "😌 سلام"],
//             ["tired", "😴 متعب"],
//             ["hope", "🌿 أمل"],
//             ["confused", "❓ محتار"],
//           ].map(([key, label]) => (
//             <button
//               key={key}
//               onClick={() => selectMood(key as Mood)}
//               className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition"
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* RESULT */}
//       {mood && verse && (
//         <div className="max-w-2xl mx-auto mt-10 space-y-6">

//           {/* VERSE */}
//           <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl">
//             <p className="text-lg mb-2">📖 {verse.text}</p>
//             <p className="text-sm opacity-70">{verse.ref}</p>

//             <button
//               onClick={refreshVerse}
//               className="mt-3 text-yellow-300 text-sm"
//             >
//               🔁 آية أخرى
//             </button>
//           </div>

//           {/* NOTE */}
//           <div className="p-6 rounded-2xl bg-white/5 space-y-3">

//             <p>📝 اكتب شعورك</p>

//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               className="w-full h-24 p-3 rounded-xl text-black"
//               placeholder="اكتب هنا..."
//             />

//             {/* ✨ HIGHLIGHT AREA */}
//             <p className="text-sm text-yellow-200">
//               ✨ ظلّل أهم جزء في تأملك (Highlight)
//             </p>

//             <input
//               value={highlight}
//               onChange={(e) => setHighlight(e.target.value)}
//               className="w-full p-3 rounded-xl text-black"
//               placeholder="مثال: أنا محتاج سلام دلوقتي"
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={saveNote}
//                 className="px-4 py-2 bg-yellow-500 text-black rounded-lg"
//               >
//                 حفظ
//               </button>

//               <button
//                 onClick={() => setMood(null)}
//                 className="px-4 py-2 bg-white/10 rounded-lg"
//               >
//                 رجوع
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useRef, useState } from "react";
// import { spiritualVerses, type Mood, type Verse } from "../data/spiritualVerses";
// import MiniTopBar from "../components/MiniTopBar";

// export default function SpiritualGuide() {
//   const [mood, setMood] = useState<Mood | null>(null);
//   const [verse, setVerse] = useState<Verse | null>(null);

//   const lastVerse = useRef<string | null>(null);
//   const pressTimer = useRef<NodeJS.Timeout | null>(null);

//   const [highlightedVerse, setHighlightedVerse] = useState<string | null>(null);

//   const HIGHLIGHTS_KEY = "app-highlights";

//   const getRandomVerse = (m: Mood) => {
//     const list = spiritualVerses[m];

//     let selected;
//     do {
//       selected = list[Math.floor(Math.random() * list.length)];
//     } while (list.length > 1 && selected.ref === lastVerse.current);

//     lastVerse.current = selected.ref;
//     return selected;
//   };

//   const saveHighlight = (text: string) => {
//     if (!text.trim()) return;

//     setHighlightedVerse(text);

//     const existing = JSON.parse(
//       localStorage.getItem(HIGHLIGHTS_KEY) || "[]"
//     );

//     const newItem = {
//       id: Date.now(),
//       text,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem(
//       HIGHLIGHTS_KEY,
//       JSON.stringify([newItem, ...existing])
//     );
//   };

//   const selectMood = (m: Mood) => {
//     setMood(m);
//     setVerse(getRandomVerse(m));
//     setHighlightedVerse(null);
//   };

//   const refreshVerse = () => {
//     if (!mood) return;
//     setVerse(getRandomVerse(mood));
//     setHighlightedVerse(null);
//   };

//   // 👉 Long press handlers
//   const handlePressStart = (text: string) => {
//     pressTimer.current = setTimeout(() => {
//       saveHighlight(text);
//     }, 600);
//   };

//   const handlePressEnd = () => {
//     if (pressTimer.current) {
//       clearTimeout(pressTimer.current);
//       pressTimer.current = null;
//     }
//   };

//   const handlePressCancel = () => {
//     if (pressTimer.current) {
//       clearTimeout(pressTimer.current);
//       pressTimer.current = null;
//     }
//   };

//   return (
//     <>
//       <MiniTopBar />
//       <div className="min-h-screen px-4 py-10 text-white bg-gradient-to-b from-black to-gray-900">

//         <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
//           🧭 دليلك الروحي
//         </h1>

//         {/* MOODS */}
//         {!mood && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             {[
//               ["sad", "😔 حزين"],
//               ["anxious", "😟 قلقان"],
//               ["hurt", "💔 مجروح"],
//               ["peace", "😌 سلام"],
//               ["tired", "😴 متعب"],
//               ["hope", "🌿 أمل"],
//               ["confused", "❓ محتار"],
//             ].map(([key, label]) => (
//               <button
//                 key={key}
//                 onClick={() => selectMood(key as Mood)}
//                 className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition"
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* RESULT */}
//         {mood && verse && (
//           <div className="max-w-2xl mx-auto mt-10 space-y-6">

//             {/* VERSE */}
//             <div
//               dir="rtl"
//               className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl cursor-pointer select-text text-right leading-8"

//               // desktop
//               onDoubleClick={() =>
//                 saveHighlight(`${verse.text} (${verse.ref})`)
//               }

//               // mobile
//               onTouchStart={() =>
//                 handlePressStart(`${verse.text} (${verse.ref})`)
//               }
//               onTouchEnd={handlePressEnd}
//               onTouchCancel={handlePressCancel}
//             >
//               <p className="text-lg">
//                 📖{" "}
//                 <span
//                   className={`transition px-1 rounded-md ${highlightedVerse === `${verse.text} (${verse.ref})`
//                       ? "bg-yellow-300/30 text-yellow-100"
//                       : ""
//                     }`}
//                 >
//                   {verse.text}
//                 </span>
//               </p>

//               <p className="text-sm opacity-70 mt-2">
//                 {verse.ref}
//               </p>

//               <button
//                 onClick={refreshVerse}
//                 className="mt-3 text-yellow-300 text-sm"
//               >
//                 🔁 آية أخرى
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


// import { useRef, useState } from "react";
// import { spiritualVerses, type Mood, type Verse } from "../data/spiritualVerses";
// import MiniTopBar from "../components/MiniTopBar";

// export default function SpiritualGuide() {
//   const [mood, setMood] = useState<Mood | null>(null);
//   const [verse, setVerse] = useState<Verse | null>(null);

//   const lastVerse = useRef<string | null>(null);
//   const pressTimer = useRef<NodeJS.Timeout | null>(null);

//   const [highlightedVerse, setHighlightedVerse] = useState<string | null>(null);

//   const HIGHLIGHTS_KEY = "app-highlights";

//   const getRandomVerse = (m: Mood) => {
//     const list = spiritualVerses[m];

//     let selected;
//     do {
//       selected = list[Math.floor(Math.random() * list.length)];
//     } while (list.length > 1 && selected.ref === lastVerse.current);

//     lastVerse.current = selected.ref;
//     return selected;
//   };

//   const saveHighlight = (text: string) => {
//     if (!text.trim()) return;

//     setHighlightedVerse(text);

//     const existing = JSON.parse(
//       localStorage.getItem(HIGHLIGHTS_KEY) || "[]"
//     );

//     const newItem = {
//       id: Date.now(),
//       text,
//       createdAt: new Date().toISOString(),
//     };

//     localStorage.setItem(
//       HIGHLIGHTS_KEY,
//       JSON.stringify([newItem, ...existing])
//     );
//   };

//   const selectMood = (m: Mood) => {
//     setMood(m);
//     setVerse(getRandomVerse(m));
//     setHighlightedVerse(null);
//   };

//   const refreshVerse = () => {
//     if (!mood) return;
//     setVerse(getRandomVerse(mood));
//     setHighlightedVerse(null);
//   };

//   const handlePressStart = (text: string) => {
//     pressTimer.current = setTimeout(() => {
//       saveHighlight(text);
//     }, 600);
//   };

//   const handlePressEnd = () => {
//     if (pressTimer.current) {
//       clearTimeout(pressTimer.current);
//       pressTimer.current = null;
//     }
//   };

//   const handlePressCancel = () => {
//     if (pressTimer.current) {
//       clearTimeout(pressTimer.current);
//       pressTimer.current = null;
//     }
//   };

//   return (
//     <>
//       <MiniTopBar />

//       {/* BACKGROUND */}
//       <div className="min-h-screen px-4 py-10 text-white bg-gradient-to-b from-black via-gray-900 to-black">

//         {/* TITLE */}
//         <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-wide">
//           🧭 دليلك الروحي
//         </h1>

//         {/* MOODS */}
//         {!mood && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             {[
//               ["sad", "😔 حزين"],
//               ["anxious", "😟 قلقان"],
//               ["hurt", "💔 مجروح"],
//               ["peace", "😌 سلام"],
//               ["tired", "😴 متعب"],
//               ["hope", "🌿 أمل"],
//               ["confused", "❓ محتار"],
//             ].map(([key, label]) => (
//               <button
//                 key={key}
//                 onClick={() => selectMood(key as Mood)}
//                 className="
//                   p-4 rounded-2xl 
//                   bg-white/10 backdrop-blur-xl
//                   border border-white/10
//                   hover:bg-white/20 hover:scale-[1.03]
//                   transition-all duration-300
//                   shadow-lg
//                 "
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* RESULT */}
//         {mood && verse && (
//           <div className="max-w-2xl mx-auto mt-10 space-y-6">

//             {/* VERSE CARD */}
//             <div
//               dir="rtl"
//               className="
//                 p-6 rounded-2xl 
//                 bg-white/10 backdrop-blur-xl
//                 border border-white/10
//                 shadow-xl
//                 relative overflow-hidden
//                 cursor-pointer
//                 text-right leading-8
//                 hover:bg-white/15
//                 transition
//               "

//               // desktop
//               onDoubleClick={() =>
//                 saveHighlight(`${verse.text} (${verse.ref})`)
//               }

//               // mobile
//               onTouchStart={() =>
//                 handlePressStart(`${verse.text} (${verse.ref})`)
//               }
//               onTouchEnd={handlePressEnd}
//               onTouchCancel={handlePressCancel}
//             >
//               {/* glow */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

//               {/* ORB */}
//               <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-3xl rounded-full" />

//               {/* TEXT */}
//               <p className="text-lg relative z-10">
//                 📖{" "}
//                 <span
//                   className={`px-1 rounded-md transition ${
//                     highlightedVerse === `${verse.text} (${verse.ref})`
//                       ? "bg-yellow-300/30 text-yellow-100"
//                       : ""
//                   }`}
//                 >
//                   {verse.text}
//                 </span>
//               </p>

//               {/* REF */}
//               <p className="text-sm opacity-70 mt-3 relative z-10">
//                 {verse.ref}
//               </p>

//               {/* BUTTON */}
//               <button
//                 onClick={refreshVerse}
//                 className="
//                   mt-4 text-yellow-300 text-sm
//                   hover:text-yellow-200 transition
//                   relative z-10
//                 "
//               >
//                 🔁 آية أخرى
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import { useRef, useState } from "react";
import MiniTopBar from "../components/MiniTopBar";
import { spiritualVerses, type Mood, type Verse } from "../data/spiritualVerses";

export default function SpiritualGuide() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [verse, setVerse] = useState<Verse | null>(null);

  const [stage, setStage] = useState<"choose" | "result">("choose");

  const lastVerse = useRef<string | null>(null);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const [highlightedVerse, setHighlightedVerse] = useState<string | null>(null);

  const HIGHLIGHTS_KEY = "app-highlights";

  /* =======================
     RANDOM VERSE
  ======================= */
  const getRandomVerse = (m: Mood) => {
    const list = spiritualVerses[m];

    let selected;
    do {
      selected = list[Math.floor(Math.random() * list.length)];
    } while (list.length > 1 && selected.ref === lastVerse.current);

    lastVerse.current = selected.ref;
    return selected;
  };

  /* =======================
     SAVE HIGHLIGHT
  ======================= */
  const saveHighlight = (text: string) => {
    if (!text.trim()) return;

    setHighlightedVerse(text);

    const existing = JSON.parse(
      localStorage.getItem(HIGHLIGHTS_KEY) || "[]"
    );

    const newItem = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      HIGHLIGHTS_KEY,
      JSON.stringify([newItem, ...existing])
    );
  };

  /* =======================
     SELECT MOOD
  ======================= */
  const selectMood = (m: Mood) => {
    setMood(m);
    setVerse(getRandomVerse(m));
    setHighlightedVerse(null);
    setStage("result");
  };

  const refreshVerse = () => {
    if (!mood) return;
    setVerse(getRandomVerse(mood));
    setHighlightedVerse(null);
  };

  /* =======================
     LONG PRESS (mobile)
  ======================= */
  const handlePressStart = (text: string) => {
    pressTimer.current = setTimeout(() => {
      saveHighlight(text);
    }, 600);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handlePressCancel = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <>
      <MiniTopBar />

      <div  className="min-h-screen p-6 text-white bg-gradient-to-br from-[#2c2c2c] to-[#c6a96b]">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          🧭 دليلك الروحي
        </h1>

        {/* =======================
            MOOD SELECTION
        ======================= */}
        {stage === "choose" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              ["sad", "😔 حزين"],
              ["anxious", "😟 قلقان"],
              ["hurt", "💔 مجروح"],
              ["peace", "😌 سلام"],
              ["tired", "😴 متعب"],
              ["hope", "🌿 أمل"],
              ["confused", "❓ محتار"],
            ].map(([key, label]) => (
              <div
                key={key}
                onClick={() => selectMood(key as Mood)}
                className="
                  cursor-pointer
                  bg-white/10 backdrop-blur-xl
                  border border-white/10
                  rounded-3xl p-6
                  text-center
                  hover:bg-white/20 hover:scale-[1.05]
                  transition-all duration-300
                  shadow-xl
                "
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* =======================
            RESULT (SPOTLIGHT CARD)
        ======================= */}
        {stage === "result" && mood && verse && (
          <div className="flex justify-center items-center mt-10">

            <div
              dir="rtl"
              className="
                relative w-full max-w-xl
                p-8 rounded-3xl
                bg-white/10 backdrop-blur-xl
                border border-white/10
                shadow-2xl
                text-right
                transition-all duration-500
              "
              onDoubleClick={() =>
                saveHighlight(`${verse.text} (${verse.ref})`)
              }
              onTouchStart={() =>
                handlePressStart(`${verse.text} (${verse.ref})`)
              }
              onTouchEnd={handlePressEnd}
              onTouchCancel={handlePressCancel}
            >

              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 rounded-3xl" />

              {/* mood */}
              <div className="text-sm text-white/60 mb-3 relative z-10">
                ✨ حالتك: {mood}
              </div>

              {/* verse */}
              <p className="text-xl leading-9 relative z-10">
                📖{" "}
                <span
                  className={`px-1 rounded-md transition ${
                    highlightedVerse === `${verse.text} (${verse.ref})`
                      ? "bg-yellow-300/30 text-yellow-100"
                      : ""
                  }`}
                >
                  {verse.text}
                </span>
              </p>

              {/* ref */}
              <p className="text-sm text-white/60 mt-4 relative z-10">
                {verse.ref}
              </p>

              {/* actions */}
              <div className="mt-6 flex justify-between items-center relative z-10">

                <button
                  onClick={refreshVerse}
                  className="text-yellow-300 text-sm hover:text-yellow-200 transition"
                >
                  🔁 آية أخرى
                </button>

                <button
                  onClick={() => setStage("choose")}
                  className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition text-sm"
                >
                  تغيير الحالة
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}