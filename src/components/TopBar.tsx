import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import synaxarium from "../data/synaxarium.json";

import logoLight from "../../src/assets/sera.png";
import logoDark from "../../src/assets/darklogo.png";

export default function TopBar() {
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [dark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);

  const createSlug = (title: string) => {
    return title
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\u0600-\u06FF\w-]/g, "");
  };

  const filtered = query.trim()
    ? synaxarium.filter((item: any) => {
      const searchText = `${item.title} ${item.content}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    })
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (!boxRef.current) return;

      if (!boxRef.current.contains(e.target as Node)) {
        setOpenSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleNavigate = (item: any) => {
    const slug = createSlug(item.title);

    setOpenSearch(false);
    setQuery("");

    setTimeout(() => {
      navigate(`/saint/${slug}`);
    }, 0);
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition ${dark ? "bg-black/80 text-white" : "bg-white/70 text-black"
        }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center shrink-0 cursor-pointer"
        >
          <img
            src={dark ? logoLight : logoDark}
            alt="سيرة"
            className="h-10 md:h-12 object-contain transition-transform duration-300 drop-shadow-md -translate-y-1 scale-125"
          />
        </div>

        {/* DESKTOP SEARCH */}
        <div
          ref={boxRef}
          className="hidden md:block relative w-full max-w-xl mx-6"
        >
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenSearch(true);
            }}
            onFocus={() => setOpenSearch(true)}
            placeholder="ابحث عن قديس أو مناسبة"
            className={`w-full px-5 py-2 rounded-full text-sm text-end border outline-none transition ${dark
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-300"
              } focus:ring-2 focus:ring-yellow-400`}
          />

          {openSearch && (
            <div
              className={`absolute top-12 w-full rounded-xl shadow-xl border z-50 overflow-hidden max-h-[400px] overflow-y-auto ${dark
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
                }`}
            >
              {filtered.length > 0 ? (
                filtered.slice(0, 8).map((item: any, i: number) => (
                  <div
                    key={i}
                    onMouseDown={() => handleNavigate(item)}
                    className="px-4 py-3 cursor-pointer hover:bg-yellow-100/40 transition"
                  >
                    <p className="font-medium text-right">{item.title}</p>
                    <p className="text-xs opacity-60 text-right">
                      {item.copticDate}
                    </p>
                  </div>
                ))
              ) : query.trim() ? (
                <div className="px-4 py-3 text-sm opacity-60">
                  لا توجد نتائج
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <button onClick={() => navigate("../highlight")} className="hover:text-yellow-500 transition">
            المميزات
          </button>

          <button
            onClick={() => navigate("../notes")}
            className="hover:text-yellow-500 transition"
          >
            الملاحظات
          </button>


        </div>

        {/* MOBILE ICONS */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setOpenSearch(true)}>🔍</button>
          <button onClick={() => setMobileMenu(!mobileMenu)}>☰</button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {openSearch && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 p-4 md:hidden">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث..."
              className="w-full px-4 py-2 rounded-lg border outline-none"
            />

            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.slice(0, 8).map((item: any, i: number) => (
                  <div
                    key={i}
                    onMouseDown={() => handleNavigate(item)}
                    onTouchStart={() => handleNavigate(item)}
                    className="py-3 border-b cursor-pointer"
                  >
                    <p className="font-medium text-right">{item.title}</p>
                    <p className="text-xs opacity-60 text-right">
                      {item.copticDate}
                    </p>
                  </div>
                ))
              ) : query.trim() ? (
                <div className="text-center py-4 opacity-60">
                  لا توجد نتائج
                </div>
              ) : null}
            </div>

            <button
              onClick={() => setOpenSearch(false)}
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-semibold">
          <button onClick={() => navigate("../highlight")}>
            المميزات
          </button>

          <button onClick={() => navigate("../notes")}>
            الملاحظات
          </button>
        </div>
      )}
    </header>
  );
}