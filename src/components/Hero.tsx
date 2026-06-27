import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "./Typography";
import Button from "./Button";

export default function HeroSection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const HERO_IMAGE =
    "https://images.unsplash.com/photo-1595644258108-7e37472bd7b9";

  const getGregorianDate = () =>
    new Date().toLocaleDateString("ar-EG", {
      timeZone: "Africa/Cairo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const getApiDate = () => {
    const dtf = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const parts = dtf.formatToParts(new Date());

    const year =
      parts.find((p) => p.type === "year")?.value;

    const month =
      parts.find((p) => p.type === "month")?.value;

    const day =
      parts.find((p) => p.type === "day")?.value;

    return `${day}-${month}-${year}`;
  };

  const formatRef = (ref: string) => {
    if (!ref) return "—";

    return ref
      .replace(/\s+/g, " ")
      .replace(/\s*:\s*/g, " : ")
      .replace(/\s*-\s*/g, " - ")
      .replace(/\s*,\s*/g, ", ")
      .trim();
  };

  function HeroSkeleton() {
    return (
      <div className="min-h-screen md:min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 animate-pulse">

          <div className="rounded-2xl bg-white/10 h-[400px]" />

          <div className="flex flex-col gap-5">

            <div className="flex gap-2 justify-end">
              <div className="h-10 w-32 bg-white/10 rounded-full" />
              <div className="h-10 w-32 bg-white/10 rounded-full" />
            </div>

            <div className="h-10 w-52 bg-white/10 rounded-xl self-end" />

            <div className="space-y-3">
              <div className="h-14 bg-white/10 rounded-xl" />
              <div className="h-14 bg-white/10 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="p-4 bg-white/10 rounded-2xl"
                >
                  <div className="h-5 w-20 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                </div>
              ))}
            </div>

            <div className="h-12 bg-white/10 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }
 useEffect(() => {
const url = `${API}/katameros/${getApiDate()}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => setData(res))
    .catch((err) => {
      console.error(err);
      setData(null);
    })
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return <HeroSkeleton />;
  }
  if (!data) {
    return (
      <div className="text-red-400 text-center p-6">
        ⚠️ Failed loading data
      </div>
    );
  }

  // =========================
  // 📖 LITURGY
  // =========================

  const liturgy = data.sections?.find((s: any) =>
    s.title?.includes("قداس")
  );

  const subs = liturgy?.subSections || [];

  const extract = (index: number) => {
    const sec = subs[index];
    if (!sec) return "—";

    const reading = sec.readings?.[0];
    const passage = reading?.passages?.[0];

    if (!passage) return "—";

    return `${passage.bookTranslation} ${formatRef(passage.ref)}`;
  };

  const finalReadings = {
    البولس: extract(0),
    الكاثوليكون: extract(1),
    // الابركسيس: extract(2),
  };

  // =========================
  // 📖 GOSPEL + PSALM
  // =========================

  const gospelSec = subs.find(
    (s: any) =>
      s.title?.includes("المزمور") ||
      s.title?.includes("إنجيل")
  );

  let المزمور = "—";
  let الإنجيل = "—";

  if (gospelSec?.readings?.length) {
    const psalm = gospelSec.readings.find(
      (r: any) =>
        r.passages?.[0]?.bookTranslation === "مزامير"
    );

    const gospel = gospelSec.readings.find(
      (r: any) =>
        r.passages?.[0]?.bookTranslation !== "مزامير"
    );

    if (psalm?.passages?.[0]) {
      المزمور = `${psalm.passages[0].bookTranslation} ${formatRef(psalm.passages[0].ref)}`;
    }

    if (gospel?.passages?.[0]) {
      الإنجيل = `${gospel.passages[0].bookTranslation} ${formatRef(gospel.passages[0].ref)}`;
    }
  }

  const readings = {
    ...finalReadings,
    المزمور,
    الإنجيل,
  };

  // =========================
  // 📖 SYNAXARIUM
  // =========================

  const synaxariumSection =
    liturgy?.subSections?.find((s: any) =>
      s.title?.includes("سنكسار")
    );

  const synaxarium =
    synaxariumSection?.readings?.map((r: any) => r.title) || [];

  return (
    <div className="min-h-screen md:min-h-[80vh] flex items-center justify-center bg-transparent p-4 text-white">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">

        {/* IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={HERO_IMAGE}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-5 text-right">

          {/* DATES */}
          <div className="flex gap-2 flex-wrap self-end">
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm">
              📅 {getGregorianDate()}
            </div>

            <div className="px-4 py-2 bg-white/10 rounded-full text-sm">
              ⛪ {data?.copticDate || "—"}
            </div>
          </div>

          {/* SYNAXARIUM */}
          <div>
            <Text variant="title" className="mb-3">
              السنكسار 📖
            </Text>

            {synaxarium.length > 0 ? (
              synaxarium.map((item: string, i: number) => (
                <div
                  key={i}
                  className="p-3 bg-white/10 rounded-xl mb-2"
                >
                  <Text variant="paragraph">
                    {item}
                  </Text>
                </div>
              ))
            ) : (
              <Text variant="paragraph" className="text-white/70">
                لا يوجد سنكسار
              </Text>
            )}
          </div>

          {/* READINGS */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(readings).map(([key, value]) => (
              <div
                key={key}
                className="p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition"
              >
                <Text variant="subtitle" className="mb-2">
                  {key}
                </Text>

                <Text variant="paragraph" className="font-mono text-white/80">
                  {String(value)}
                </Text>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <Button
            variant="accent"
            onClick={() => navigate("/synaxarium")}
          >
            قراءة السنكسار 📖
          </Button>

        </div>
      </div>
    </div>
  );
}