import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Text from "./Typography";
import { useNavigate } from "react-router-dom";

export default function CardSection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // 📦 Cards data
  const cards = useMemo(
    () => [
      {
        title: "المفضلة",
        description: "احفظ قديسينك المفضلين عندك وارجع لهم وقت ما تحب",
        icon: "❤️",
        route: "/favorites",
      },
      {
        title: "القديسين",
        description: "تعرف على سير وحياة القديسين كل يوم",
        icon: "👑",
        route: "/saints",
      },
      {
        title: "دليلك الروحي",
        description: "آيات ورسائل حسب حالتك النفسية في اللحظة",
        icon: "🧭",
        route: "/spiritual-guide",
      },
    ],
    []
  );

  // ⏳ Skeleton UI
  if (loading) {
    return (
      <section className="relative overflow-hidden px-4 py-16 md:px-8 text-white">
        <div className="max-w-6xl mx-auto">

          {/* TITLE SKELETON */}
          <div className="text-center mb-10">
            <div className="h-8 w-64 mx-auto bg-white/10 rounded-lg mb-3 animate-pulse" />
            <div className="h-5 w-80 mx-auto bg-white/10 rounded-lg animate-pulse" />
          </div>

          {/* CARDS SKELETON */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
                  min-h-[250px]
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                  p-6
                  animate-pulse
                "
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl mb-6" />
                <div className="h-5 w-32 bg-white/10 rounded mb-3" />
                <div className="h-4 w-full bg-white/10 rounded mb-2" />
                <div className="h-4 w-3/4 bg-white/10 rounded mb-6" />
                <div className="h-10 w-32 bg-white/10 rounded-lg" />
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden px-4 py-16 bg-transparent md:px-8 text-white">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#d6b97b]/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <div className="mb-10 text-center">
          <Text variant="title" className="mb-3">
            هتستكشف إيه النهاردة؟
          </Text>
          <Text variant="subtitle">
            اختار قسم وابدأ رحلتك الروحية
          </Text>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 text-center gap-6 md:grid-cols-2 lg:grid-cols-3">

          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              onClick={() => navigate(card.route)}
              className="min-h-[250px] bg-white/10 border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <Button variant="accent">
                استكشف الآن
              </Button>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
}