import { useEffect, useState, useMemo } from "react";
import MiniTopBar from "./MiniTopBar";
import { trackSynaxariumRead } from "../utils/achievements";
import Text from "./Typography";

// 🎧 SOUND
const playXpSound = () => {
  try {
    const audio = new Audio("/sounds/xp.mp3");
    audio.volume = 0.5;
    audio.play();
  } catch (e) {
    console.log("sound error");
  }
};

export default function SynaxariumPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const API = import.meta.env.VITE_API_URL;

  // 🔥 Font size
  const [fontSize, setFontSize] = useState(() => {
    return Number(localStorage.getItem("synax-font") || 16);
  });

  // ⏳ Fetch data
  useEffect(() => {
    const getApiDate = () => {
      const d = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "Africa/Cairo",
        })
      );

      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const dateKey = getApiDate();
    const url = `${API}/katameros/${dateKey}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);

        const result = trackSynaxariumRead(dateKey);
        if (result) playXpSound();
      })
      .catch((err) => {
        console.error(err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 💾 Save font size
  useEffect(() => {
    localStorage.setItem("synax-font", String(fontSize));
  }, [fontSize]);

  // 🎛 Font controls
  const increaseFont = () =>
    setFontSize((p) => Math.min(p + 2, 30));

  const decreaseFont = () =>
    setFontSize((p) => Math.max(p - 2, 12));

  // 📦 Extract synaxarium safely
  const synaxarium = useMemo(() => {
    const sections = data?.sections || [];

    const liturgy = sections.find(
      (s: any) => s.title === "قداس"
    );

    const synaxariumSection = liturgy?.subSections?.find(
      (s: any) => s.title?.includes("سنكسار")
    );

    return synaxariumSection?.readings || [];
  }, [data]);

  // ⏳ Skeleton UI
  if (loading) {
    return (
      <>
        <MiniTopBar />
        <div className="min-h-screen p-6 bg-[#2c2c2c] text-white animate-pulse">

          {/* HEADER */}
          <div className="flex justify-between mb-6">
            <div className="h-8 w-48 bg-white/10 rounded-lg" />
            <div className="flex gap-2">
              <div className="w-10 h-8 bg-white/10 rounded" />
              <div className="w-10 h-8 bg-white/10 rounded" />
            </div>
          </div>

          <div className="h-4 w-32 bg-white/10 rounded mb-8" />

          {/* CARDS */}
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white/5 rounded-2xl border border-white/10"
              />
            ))}
          </div>

        </div>
      </>
    );
  }

  // ❌ No data
  if (!data) {
    return (
      <div className="p-6 text-red-400">
        ⚠️ لا توجد بيانات
      </div>
    );
  }

  return (
    <>
      <MiniTopBar />

      <div
        dir="rtl"
        className="min-h-screen p-6 text-white bg-gradient-to-br from-[#2c2c2c] to-[#c6a96b]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <Text variant="title">السنكسار اليوم</Text>

          {/* FONT CONTROLS */}
          <div className="flex gap-2">
            <button
              onClick={decreaseFont}
              className="px-3 py-1 rounded bg-white/10"
            >
              A-
            </button>

            <button
              onClick={increaseFont}
              className="px-3 py-1 rounded bg-white/10"
            >
              A+
            </button>
          </div>
        </div>

        <div className="opacity-80 mb-5">
          ⛪ {data?.copticDate || "—"}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-5">
          {synaxarium.length > 0 ? (
            synaxarium.map((item: any, i: number) => (
              <div
                key={i}
                className="
                  p-4 rounded-2xl
                  bg-white/10
                  backdrop-blur-xl
                  border border-white/10
                  shadow-lg
                "
              >
                {/* TITLE */}
                <div className="text-lg font-bold mb-2">
                  ✝️ {item?.title}
                </div>

                {/* CONTENT */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.html || "",
                  }}
                  style={{
                    fontSize,
                    lineHeight: 1.9,
                    opacity: 0.95,
                  }}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-white/70">
              لا يوجد سنكسار اليوم
            </div>
          )}
        </div>
      </div>
    </>
  );
}