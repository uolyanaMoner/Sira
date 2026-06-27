import { useMemo, useState, useEffect } from "react";
import { getAchievements } from "../utils/achievements";
import Text from "../components/Typography";

export default function AchievementSlider() {
  const data = getAchievements();

  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  // ⏳ Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ❤️ Favorites (sync with localStorage)
  const favorites = useMemo(() => {
    if (typeof window === "undefined") return 0;

    return JSON.parse(localStorage.getItem("saints-favorites") || "[]")
      .length;
  }, []);

  // 📊 Stats
  const reads = data.stats.saintsRead;
  const notes = data.stats.notes;

  const readingLevels = [5, 10, 25, 50, 100, 250];
  const favoriteLevels = [3, 5, 10, 20, 50];

  const nextReadTarget =
    readingLevels.find((level) => reads < level) ||
    readingLevels[readingLevels.length - 1];

  const nextFavoriteTarget =
    favoriteLevels.find((level) => favorites < level) ||
    favoriteLevels[favoriteLevels.length - 1];

  // 🎯 XP & Level
  const currentLevelXP = data.xp % 100;

  // 🎯 Slides
  const slides = useMemo(
    () => [
      {
        icon: "📖",
        title: "القراءات",
        value: reads,
        target: nextReadTarget,
        color: "from-[#d4b06a] to-[#f5deb3]",
      },
      {
        icon: "❤️",
        title: "المفضلة",
        value: favorites,
        target: nextFavoriteTarget,
        color: "from-[#ff7b7b] to-[#ffd1d1]",
      },
      {
        icon: "📝",
        title: notes <= 1 ? "أول تأمل" : " تأملات",
        value: notes,
        target: 5,
        color: "from-[#9ad0ff] to-[#dff2ff]",
      },
      {
        icon: "⭐",
        title: "XP",
        value: currentLevelXP,
        target: 100,
        color: "from-[#ffe08a] to-[#fff4c7]",
      },
      {
        icon: "🏆",
        title: "Level",
        value: data.level,
        target: 10,
        color: "from-[#c9a0ff] to-[#eee0ff]",
      },
      {
        icon: "🔥",
        title: "Streak",
        value: data.streak?.currentStreak || 0,
        target: 7,
        color: "from-[#ff9966] to-[#ffd1b8]",
      },
    ],
    [data, favorites, reads, notes, currentLevelXP]
  );

  const getRemainingText = (slide: (typeof slides)[number]) => {
    const remaining = Math.max(
      slide.target - Number(slide.value),
      0
    );

    if (remaining === 0) {
      switch (slide.title) {
        case "أول قراءة":
        case "القراءات":
          return `📖 متبقي ${remaining} قراءة للوصول للمستوى التالي`;

        case "أول مفضلة":
        case "المفضلة":
          return `❤️ متبقي ${remaining} عنصر للمستوى التالي`;

        case "أول تأمل":
        case " تأملات":
          return "📝 ممتاز! استمر في كتابة التأملات";

        case "XP":
          return `⭐ جاهز للوصول إلى Level ${data.level + 1}`;

        case "Level":
          return "🏆 وصلت إلى الهدف الحالي";

        case "Streak":
          return "🔥 سلسلة رائعة! استمر";

        default:
          return "🎉 تم الإنجاز";
      }
    }

    switch (slide.title) {
      case "أول قراءة":
      case " قراءات":
        return `📖 متبقي ${remaining} قراءة`;

      case "أول مفضلة":
      case " مفضلات":
        return `❤️ متبقي ${remaining} مفضلة`;

      case "أول تأمل":
      case " تأملات":
        return `📝 متبقي ${remaining} تأمل`;

      case "XP":
        return `⭐ متبقي ${remaining} XP للوصول إلى Level ${data.level + 1
          }`;

      case "Level":
        return `🏆 متبقي ${remaining} مستويات`;

      case "Streak":
        return `🔥 متبقي ${remaining} أيام`;

      default:
        return `متبقي ${remaining}`;
    }
  };
  // ⏱ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-[32px] px-8 py-10 bg-white/5 backdrop-blur-2xl border border-white/10 animate-pulse">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-white/10" />
            </div>

            <div className="h-8 w-40 mx-auto rounded-xl bg-white/10 mb-4" />
            <div className="h-12 w-24 mx-auto rounded-xl bg-white/10 mb-6" />
            <div className="w-full h-3 rounded-full bg-white/10" />
            <div className="h-4 w-24 mx-auto rounded-lg bg-white/10 mt-4" />
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="w-2 h-2 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const current = slides[index];

  const progress = Math.min(
    (Number(current.value) / current.target) * 100,
    100
  );

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        {/* CARD */}
        <div className="relative overflow-hidden rounded-[32px] px-8 py-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.25)] transition-all duration-700">
          {/* GLOW */}
          <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-[#c6a96b]/10 via-transparent to-[#f5deb3]/10 pointer-events-none" />

          {/* LIGHT */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#f5deb3]/10 blur-3xl rounded-full" />

          {/* ICON */}
          <div className="text-center mb-4">
            <div className="text-6xl drop-shadow-lg">{current.icon}</div>
          </div>

          {/* TITLE */}
          <Text className="text-center text-2xl font-bold mb-2 text-white">
            {current.title}
          </Text>

          {/* VALUE */}
          <div className="text-center text-4xl font-black mb-6 text-[#f5deb3]">
            {current.value}
          </div>

          {/* PROGRESS */}
          <div className="w-full h-3 rounded-full overflow-hidden bg-white/10">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${current.color} transition-all duration-1000`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* TEXT */}
          <div className="mt-4 text-center">
            <div className="text-sm text-white/60">
              {current.value} / {current.target}
            </div>

            <div className="mt-2 text-sm font-medium text-[#f5deb3]">
              {getRemainingText(current)}
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === index
                ? "w-8 h-2 bg-[#f5deb3]"
                : "w-2 h-2 bg-white/30"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}