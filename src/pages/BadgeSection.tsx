import { useEffect, useMemo, useState } from "react";
import { getAchievements } from "../utils/achievements";
import Text from "../components/Typography";

export default function BadgesSection() {
  const data = getAchievements();
  const [loading, setLoading] = useState(true);

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ❤️ Favorites (safe for SSR)
  const favorites = useMemo(() => {
    if (typeof window === "undefined") return 0;

    return JSON.parse(localStorage.getItem("saints-favorites") || "[]")
      .length;
  }, []);

  const notes = data.stats.notes;
  const reads = data.stats.saintsRead;

  // 📦 Cards data
  const cards = useMemo(
    () => [
      {
        icon: "📖",
        title: reads <= 1 ? "أول قراءة" : `${reads} قراءات`,
        desc:
          reads <= 1
            ? "بدأت رحلتك في السنكسار ✨"
            : `قرأت ${reads} قديسين 🔥`,
        progress: Math.min((reads / 25) * 100, 100),
        next:
          reads < 10 ? "10 قراءات" : reads < 25 ? "25 قراءة" : "مكتمل 👑",
        glow: "from-blue-400/20 to-cyan-300/10",
      },
      {
        icon: "❤️",
        title: favorites <= 1 ? "أول مفضلة" : `${favorites} مفضلات`,
        desc:
          favorites <= 1
            ? "حفظت أول قديس في المفضلة 💖"
            : `عندك ${favorites} قديسين مفضلين ⭐`,
        progress: Math.min((favorites / 15) * 100, 100),
        next:
          favorites < 5
            ? "5 مفضلات"
            : favorites < 15
              ? "15 مفضلة"
              : "مكتمل 💘",
        glow: "from-pink-400/20 to-rose-300/10",
      },
      {
        icon: "📝",
        title: notes <= 1 ? "أول تأمل" : `${notes} تأملات`,
        desc:
          notes <= 1
            ? "كتبت أول تأمل ليك 🙏"
            : `كتبت ${notes} تأملات روحية 🕊️`,
        progress: Math.min((notes / 20) * 100, 100),
        next: notes < 5 ? "5 تأملات" : notes < 20 ? "20 تأمل" : "مكتمل 🌟",
        glow: "from-purple-400/20 to-indigo-300/10",
      },
    ],
    [reads, favorites, notes]
  );

  // ⏳ Skeleton UI
  if (loading) {
    return (
      <div className="w-full flex justify-center pt-12 px-4 pb-14">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <div className="h-8 w-40 mx-auto bg-white/10 rounded-lg mb-2 animate-pulse" />
            <div className="h-4 w-64 mx-auto bg-white/10 rounded-lg animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[32px] p-6 bg-white/5 border border-white/10 backdrop-blur-2xl animate-pulse"
              >
                <div className="w-20 h-20 bg-white/10 rounded-3xl mb-5" />
                <div className="h-6 w-32 bg-white/10 rounded mb-3" />
                <div className="h-4 w-full bg-white/10 rounded mb-2" />
                <div className="h-4 w-3/4 bg-white/10 rounded mb-6" />
                <div className="h-2.5 w-full bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center pt-12 px-4 pb-14">
      <div className="w-full max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-8">
          <Text
            variant="title"
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            🏅 إنجازاتك
          </Text>
          <p className="text-white/60 text-sm">
            استمر وافتح إنجازات جديدة ✨
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative rounded-[32px] overflow-hidden border border-white/10
                bg-white/[0.06] backdrop-blur-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.25)]
                transition-all duration-500 hover:-translate-y-1 hover:border-[#f5deb3]/30">
              {/* GLOW */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-80`}
              />
              {/* SHINE */}
              <div className=" absolute -top-16 -left-16 w-40 h-40
                rounded-full bg-white/10 blur-3xl opacity-70 group-hover:scale-125 transition-all duration-700" />
              {/* CONTENT */}
              <div className="relative z-10 text-right">
                {/* ICON */}
                <div className=" w-20 h-20 flex items-center justify-center rounded-3xl bg-white/10 text-4xl justify-self-end mb-5">
                  {card.icon}
                </div>
                {/* TITLE */}
                <Text className="text-white text-2xl font-bold mb-2">
                  {card.title}
                </Text>
                {/* DESC */}
                <p className="text-white/70 text-sm leading-7 mb-6">
                  {card.desc}
                </p>

                {/* NEXT */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/60 text-xs">
                    الإنجاز القادم
                  </span>
                  <span className="text-[#f5deb3] text-xs font-bold">
                    {card.next}
                  </span>
                </div>
                {/* BAR */}
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full
                      bg-gradient-to-r from-[#f5deb3] to-[#c6a96b] transition-all duration-700"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}