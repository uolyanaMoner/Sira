import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Text from "../components/Typography";

export default function DayExplorer() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);

const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleDateChange = (date: Date | null) => {
  setSelectedDate(date);
};

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // 📅 Format date
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // 🚀 Navigate
  const handleNavigate = () => {
    if (!selectedDate) return;
    navigate(`/day/${formatDate(selectedDate)}`);
  };

  // ⏳ Skeleton UI
  if (loading) {
    return (
      <section className="relative w-full flex justify-center px-4 pb-24 overflow-hidden">
        <div className="w-full max-w-2xl rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl p-8 md:p-12 animate-pulse">

          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-[30px] bg-white/10" />
          </div>

          <div className="h-10 w-2/3 mx-auto bg-white/10 rounded-lg mb-4" />
          <div className="h-4 w-full max-w-md mx-auto bg-white/10 rounded-lg mb-10" />

          <div className="h-14 w-full max-w-[320px] mx-auto bg-white/10 rounded-3xl mb-8" />

          <div className="h-10 w-48 mx-auto bg-white/10 rounded-2xl" />

        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full flex justify-center px-4 pb-24 overflow-hidden">

      {/* 🌟 BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#c6a96b]/10 blur-3xl pointer-events-none" />

      {/* ✨ CARD */}
      <div className="relative w-full max-w-2xl rounded-[40px] border border-white/10 bg-white/[0.06] backdrop-blur-3xl overflow-hidden shadow-[0_10px_60px_rgba(0,0,0,0.35)] p-8 md:p-12">

        {/* LIGHT EFFECT */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />

        {/* GOLD OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5deb3]/5 via-transparent to-[#c6a96b]/10 pointer-events-none" />

        <div className="relative z-10">

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-[30px] flex items-center justify-center bg-white/10 text-5xl border border-white/10 shadow-[0_0_40px_rgba(245,222,179,0.15)] animate-pulse">
              🗓️
            </div>
          </div>

          {/* TITLE */}
          <Text
            variant="title"
            className="text-center text-3xl md:text-5xl font-black text-white mb-4"
          >
            اكتشف قراءات أي يوم
          </Text>

          {/* DESC */}
          <p className="text-center text-white/70 leading-8 max-w-2xl mx-auto mb-10">
            اختار أي يوم وشوف السنكسار والقراءات الخاصة بالكنيسة في اليوم ده 🕊️
          </p>

          {/* DATE PICKER */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-[320px]">

              <div className="absolute top-1/2 right-5 -translate-y-1/2 text-2xl z-20 pointer-events-none">
                📅
              </div>

              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date("2100-01-01")}
                popperClassName="z-50"
                calendarClassName="!bg-[#2b2b2b] !border !border-white/10 !rounded-3xl !shadow-2xl"
                dayClassName={() =>
                  "!text-white hover:!bg-[#c6a96b] hover:!text-black !rounded-xl !transition-all"
                }
                className="w-full rounded-3xl border border-[#f5deb3]/20 bg-white/10 backdrop-blur-2xl px-14 py-5 text-center text-white 
                text-xl font-bold outline-none shadow-[0_0_30px_rgba(245,222,179,0.12)] transition-all duration-300 focus:border-[#f5deb3]/60
                focus:bg-white/15 hover:border-[#f5deb3]/40"
              />

            </div>
          </div>

          {/* PREVIEW */}
          {selectedDate && (
            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl text-white/80 text-sm shadow-lg">
                ✨ التاريخ المختار:
                <span className="text-[#f5deb3] font-bold mr-2">
                  {selectedDate.toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}

          {/* BUTTON */}
          <div className="flex justify-center">
            <button
              onClick={handleNavigate}
              className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f5deb3] to-[#c6a96b] text-black font-bold 
              shadow-[0_10px_30px_rgba(198,169,107,0.35)] transition-all duration-500 hover:scale-105 
              hover:shadow-[0_20px_50px_rgba(198,169,107,0.45)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-all duration-1000" />

              <span className="relative z-10">
                عرض قراءات اليوم ✨
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}