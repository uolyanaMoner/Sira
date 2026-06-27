// import { useEffect, useState } from "react";
// import MiniTopBar from "../components/MiniTopBar";

// type HighlightItem = {
//   id: number;
//   text: string;
//   createdAt: string;
// };

// const HIGHLIGHTS_KEY = "app-highlights";

// export default function HighlightsPage() {
//   const [items, setItems] = useState<HighlightItem[]>([]);

//   useEffect(() => {
//     loadHighlights();
//   }, []);

//   const loadHighlights = () => {
//     const data = JSON.parse(
//       localStorage.getItem(HIGHLIGHTS_KEY) || "[]"
//     );

//     setItems(data);
//   };

//   const deleteHighlight = (id: number) => {
//     const updated = items.filter((item) => item.id !== id);

//     localStorage.setItem(
//       HIGHLIGHTS_KEY,
//       JSON.stringify(updated)
//     );

//     setItems(updated);
//   };

//   const clearAll = () => {
//     localStorage.removeItem(HIGHLIGHTS_KEY);
//     setItems([]);
//   };

//   return (
//     <>
//       <MiniTopBar />
//       <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-black to-gray-900 text-white">

//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold">✨ Highlights</h1>
//           <p className="text-white/60 mt-2">
//             كل الآيات والتأملات اللي عملت لها تمييز
//           </p>
//         </div>

//         {/* EMPTY STATE */}
//         {items.length === 0 && (
//           <div className="text-center text-white/50 mt-20">
//             مفيش Highlights لسه ✨
//           </div>
//         )}

//         {/* LIST */}
//         <div className="max-w-3xl mx-auto space-y-4">
//           {items.map((item) => (
//             <div
//               key={item.id}
//               className="
//               p-5 rounded-2xl
//               bg-white/10 backdrop-blur-xl
//               border border-white/10
//               shadow-lg
//               hover:bg-white/15
//               transition
//             "
//             >
//               {/* TEXT */}
//               <p
//                 dir="rtl"
//                 className="text-right leading-8 text-lg text-yellow-100"
//               >
//                 📖 {item.text}
//               </p>

//               {/* DATE + ACTIONS */}
//               <div className="flex justify-between items-center mt-4 text-sm text-white/60">
//                 <span>
//                   🕒{" "}
//                   {new Date(item.createdAt).toLocaleString("ar-EG")}
//                 </span>

//                 <button
//                   onClick={() => deleteHighlight(item.id)}
//                   className="text-red-400 hover:text-red-300"
//                 >
//                   حذف 🗑️
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CLEAR ALL */}
//         {items.length > 0 && (
//           <div className="text-center mt-10">
//             <button
//               onClick={clearAll}
//               className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30"
//             >
//               حذف الكل
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import MiniTopBar from "../components/MiniTopBar";
import Text from "../components/Typography";

type HighlightItem = {
  id: number;
  text: string;
  createdAt: string;
};

const HIGHLIGHTS_KEY = "app-highlights";

export default function HighlightsPage() {
  const [items, setItems] = useState<HighlightItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // 📥 Load highlights
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(HIGHLIGHTS_KEY) || "[]"
    );

    setItems(data);
  }, []);

  const deleteHighlight = (id: number) => {
    const updated = items.filter((item) => item.id !== id);

    localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(updated));
    setItems(updated);
  };

  const clearAll = () => {
    localStorage.removeItem(HIGHLIGHTS_KEY);
    setItems([]);
  };

  // ⏳ Skeleton UI
  if (loading) {
    return (
      <>
        <MiniTopBar />
        <div className="min-h-screen p-6 bg-[#2c2c2c] text-white animate-pulse">

          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="h-10 w-40 mx-auto bg-white/10 rounded-lg mb-3" />
            <div className="h-5 w-64 mx-auto bg-white/10 rounded-lg" />
          </div>

          {/* GRID SKELETON */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white/5 rounded-3xl border border-white/10"
              />
            ))}
          </div>

        </div>
      </>
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
        <div className="text-center mb-10">
          <Text variant="title">المفضلات ✨</Text>
          <Text variant="subtitle">
            كل الآيات والتأملات المميزة عندك
          </Text>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="text-center text-white/70 mt-20">
            لا يوجد Highlights لسه ✨
          </div>
        )}

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                group cursor-pointer
                bg-white/10 backdrop-blur-xl
                border border-white/10
                rounded-3xl p-5
                hover:bg-white/15 hover:-translate-y-1
                transition-all duration-300
                shadow-xl text-right overflow-hidden relative
              "
            >
              {/* glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              {/* TEXT */}
              <p
                dir="rtl"
                className="text-lg leading-8 text-yellow-100 relative z-10"
              >
                {item.text}
              </p>

              {/* DATE */}
              <div className="mt-4 text-sm text-white/60 relative z-10 flex items-center gap-2">
                <span className="bg-white/10 px-2 py-1 rounded-lg">🕒</span>
                <span>{new Date(item.createdAt).toLocaleString("ar-EG")}</span>
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex items-center justify-between relative z-10">
                <button
                  onClick={() => deleteHighlight(item.id)}
                  className="
                    px-3 py-2 rounded-xl
                    bg-white/10 hover:bg-white/20
                    text-sm transition
                  "
                >
                  حذف 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CLEAR ALL */}
        {items.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={clearAll}
              className="
                px-5 py-2 rounded-xl
                bg-red-500/20 text-red-300
                hover:bg-red-500/30 transition
              "
            >
              حذف الكل
            </button>
          </div>
        )}
      </div>
    </>
  );
}