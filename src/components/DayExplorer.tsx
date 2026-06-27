import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Text from "../components/Typography";

export default function DayExplorer() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);

  // ⛔ كان غير مستخدم → هنشيله
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleNavigate = () => {
    if (!selectedDate) return;
    navigate(`/day/${formatDate(selectedDate)}`);
  };

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#c6a96b]/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-2xl rounded-[40px] border border-white/10 bg-white/[0.06] backdrop-blur-3xl overflow-hidden shadow-[0_10px_60px_rgba(0,0,0,0.35)] p-8 md:p-12">

        <div className="relative z-10">

          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-[30px] flex items-center justify-center bg-white/10 text-5xl border border-white/10 shadow-[0_0_40px_rgba(245,222,179,0.15)] animate-pulse">
              🗓️
            </div>
          </div>

          <Text variant="title" className="text-center text-3xl md:text-5xl font-black text-white mb-4">
            اكتشف قراءات أي يوم
          </Text>

          <p className="text-center text-white/70 leading-8 max-w-2xl mx-auto mb-10">
            اختار أي يوم وشوف السنكسار والقراءات الخاصة بالكنيسة في اليوم ده 🕊️
          </p>

          <div className="flex justify-center mb-8">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="w-full rounded-3xl bg-white/10 px-14 py-5 text-white text-center"
            />
          </div>

          {selectedDate && (
            <div className="flex justify-center mb-8">
              <div className="px-6 py-3 rounded-2xl bg-white/10 text-white/80 text-sm">
                ✨ التاريخ المختار:{" "}
                {selectedDate.toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleNavigate}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f5deb3] to-[#c6a96b] text-black font-bold"
            >
              عرض قراءات اليوم ✨
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}