import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MiniTopBar from "../components/MiniTopBar";

export default function DayPage() {
    const { date } = useParams();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL;
    // 📡 FORMAT DATE FOR API
    const getApiDate = (inputDate: string) => {
        const [year, month, day] = inputDate.split("-");
        return `${day}-${month}-${year}`;
    };
    // 🧹 FORMAT REF
    const formatRef = (ref: string) => {
        if (!ref) return "—";
        return ref
            .replace(/\s+/g, " ")
            .replace(/\s*:\s*/g, " : ")
            .replace(/\s*-\s*/g, " - ")
            .replace(/\s*,\s*/g, ", ")
            .trim();
    };
    // 📡 FETCH DATA
useEffect(() => {
    if (!date) return;

    const apiDate = getApiDate(date);

    setLoading(true);

    fetch(`${API}/katameros/${apiDate}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then((res) => setData(res))
        .catch((err) => {
            console.error(err);
            setData(null);
        })
        .finally(() => setLoading(false));

}, [date, API]);
    // ⏳ LOADING
    if (loading) {
        return (
            <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] via-[#2c2419] to-[#c6a96b] text-white" >
                <div className=" px-8 py-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 text-2xl font-bold shadow-2xl" >
                    ⏳ جاري التحميل...
                </div>
            </div>
        );
    }

    // ❌ ERROR
    if (!data) {
        return (
            <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] via-[#2c2419] to-[#c6a96b] text-red-300" >
                <div className="px-8 py-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-red-300/20 text-2xl font-bold">
                    ⚠️ لا توجد بيانات
                </div>
            </div>
        );
    }

    // 📖 DATA
    const sections = data?.sections || [];

    const liturgy = sections.find(
        (s: any) => s.title === "قداس"
    );

    const subs = liturgy?.subSections || [];

    // 📖 EXTRACT READINGS
    const extract = (index: number) => {
        const sec = subs[index];
        if (!sec) return null;

        const reading = sec.readings?.[0];
        if (!reading) return null;

        const passage = reading?.passages?.[0];

        return {
            title: passage?.bookTranslation || "",
            ref: formatRef(passage?.ref || ""),
            text:
                reading?.html ||
                reading?.text ||
                reading?.content ||
                "",
        };
    };

    const readings = {
        البولس: extract(0),
        الكاثوليكون: extract(1),
    };

    // 📖 GOSPEL + PSALM
    const gospelSec = subs.find(
        (s: any) =>
            s.title?.includes("المزمور") ||
            s.title?.includes("إنجيل")
    );

    const getPsalmAndGospel = () => {
        if (!gospelSec?.readings?.length) {
            return {
                المزمور: null,
                الإنجيل: null,
            };
        }

        const psalm = gospelSec.readings.find(
            (r: any) =>
                r.passages?.[0]?.bookTranslation === "مزامير"
        );

        const gospel = gospelSec.readings.find(
            (r: any) =>
                r.passages?.[0]?.bookTranslation !== "مزامير"
        );

        return {
            المزمور: psalm
                ? {
                    title:
                        psalm.passages?.[0]?.bookTranslation || "",
                    ref: formatRef(
                        psalm.passages?.[0]?.ref || ""
                    ),
                    text:
                        psalm.html ||
                        psalm.text ||
                        psalm.content ||
                        "",
                }
                : null,

            الإنجيل: gospel
                ? {
                    title:
                        gospel.passages?.[0]?.bookTranslation || "",
                    ref: formatRef(
                        gospel.passages?.[0]?.ref || ""
                    ),
                    text:
                        gospel.html ||
                        gospel.text ||
                        gospel.content ||
                        "",
                }
                : null,
        };
    };

    const psalmAndGospel = getPsalmAndGospel();

    const finalReadings = {
        ...readings,
        ...psalmAndGospel,
    };

    // =========================
    // 📖 SYNAXARIUM
    // =========================
    const synaxariumSection = subs.find((s: any) =>
        s.title?.includes("سنكسار")
    );

    const synaxarium =
        synaxariumSection?.readings || [];

    // =========================
    // 📅 DISPLAY DATE FIX
    // =========================
    const displayDate = date
        ? new Date(
            `${date}T12:00:00`
        ).toLocaleDateString(
            "ar-EG",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        )
        : "";

    return (
        <>
            <MiniTopBar />
            <div
                className=" min-h-screen px-4 py-10 text-white bg-gradient-to-br from-[#1f1f1f] via-[#2d2418] to-[#c6a96b]" dir="rtl">
                {/* 🌟 BG GLOW */}
                <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#f5deb3]/10 blur-3xl pointer-events-none" />
                {/* 📅 HEADER */}
                <div className="max-w-6xl mx-auto mb-10 relative z-10">
                    <div className=" p-6 rounded-[32px] bg-white/[0.08] backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                        <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#f5deb3]">
                            ✨ قراءات اليوم
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            <div className=" px-5 py-3 rounded-2xl bg-black/20 border border-white/10 text-sm md:text-base">
                                📅 {displayDate}
                            </div>
                            <div className="px-5 py-3 rounded-2xl bg-black/20 border border-white/10 text-sm md:text-base">
                                ⛪ {data?.copticDate || "—"}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 📖 SYNAXARIUM */}
                <div className="max-w-6xl mx-auto mb-12 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className=" w-14 h-14 rounded-2xl bg-[#f5deb3]/15 border border-[#f5deb3]/20 flex items-center justify-center text-2xl ">
                            ✝️
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#f5deb3] ">
                            السنكسار
                        </h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        {synaxarium.length > 0 ? (
                            synaxarium.map((item: any, i: number) => {
                                const title = item?.title;
                                const content = item?.html || "";
                                return (
                                    <div
                                        key={i}
                                        className="relative overflow-hidden p-7 rounded-[32px] bg-white/[0.08]
                                    backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:bg-white/[0.1] transition-all duration-500" >
                                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f5deb3] to-transparent" />
                                        <div className=" text-2xl font-black mb-5 text-[#f5deb3] leading-relaxed">
                                            ✝️ {title}
                                        </div>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: content,
                                            }}
                                            className=" text-white/95 text-[15px] md:text-[16px] leading-[2.1] [&_p]:mb-5 [&_strong]:text-[#f5deb3]" />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 rounded-3xl bg-white/10 text-white/70">
                                لا يوجد سنكسار اليوم
                            </div>
                        )}

                    </div>
                </div>
                {/* 📖 READINGS */}
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className=" w-14 h-14 rounded-2xl bg-[#f5deb3]/15 border border-[#f5deb3]/20 flex items-center justify-center text-2xl ">
                            📖
                        </div>
                        <h2 className=" text-3xl md:text-4xl font-black text-[#f5deb3]" >
                            القراءات
                        </h2>
                    </div>
                    {/* ✅ GRID 2 CARDS */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(finalReadings).map(
                            ([key, value]: any) => (
                                <div key={key}
                                    className="relative overflow-hidden p-6 h-fit rounded-[32px] bg-white/[0.08] backdrop-blur-2xl border
                                border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:bg-white/[0.1] hover:-translate-y-1 transition-all duration-500 ">
                                    {/* GLOW */}
                                    <div className=" absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#f5deb3] to-transparent" />
                                    {/* TITLE */}
                                    <div
                                        className="text-2xl font-black mb-3 text-[#f5deb3]">
                                        📖 {key}
                                    </div>
                                    {value && (
                                        <>
                                            {/* REF */}
                                            <div className=" inline-flex px-4 py-2 rounded-2xl bg-black/20 border border-white/10 text-white/75 text-sm mb-5">
                                                {value.title} {value.ref}
                                            </div>
                                            {/* CONTENT */}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: value.text,
                                                }}
                                                className="text-white/95 text-[15px] md:text-[16px] leading-[2.1] [&_p]:mb-5 [&_strong]:text-[#f5deb3] [&_h1]:text-[#f5deb3] [&_h2]:text-[#f5deb3]" />
                                        </>
                                    )}
                                </div>
                            )
                        )}

                    </div>

                </div>
            </div>
        </>
    );
}