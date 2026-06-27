import { useRef, useState } from "react";
import MiniTopBar from "../components/MiniTopBar";
import { spiritualVerses, type Mood, type Verse } from "../data/spiritualVerses";

export default function SpiritualGuide() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [verse, setVerse] = useState<Verse | null>(null);
  const [stage, setStage] = useState<"choose" | "result">("choose");

  const lastVerse = useRef<string | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    const existing = JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY) || "[]");

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

  /* =======================
     MOODS LIST (FIXED TYPES)
  ======================= */
  const moods: [Mood, string][] = [
    ["sad", "😔 حزين"],
    ["anxious", "😟 قلقان"],
    ["hurt", "💔 مجروح"],
    ["peace", "😌 سلام"],
    ["tired", "😴 متعب"],
    ["hope", "🌿 أمل"],
    ["confused", "❓ محتار"],
  ];

  return (
    <>
      <MiniTopBar />

      <div className="min-h-screen p-6 text-white bg-gradient-to-br from-[#2c2c2c] to-[#c6a96b]">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          🧭 دليلك الروحي
        </h1>

        {/* =======================
            MOOD SELECTION
        ======================= */}
        {stage === "choose" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {moods.map(([key, label]) => (
              <div
                key={key}
                onClick={() => selectMood(key)}
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
            RESULT
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