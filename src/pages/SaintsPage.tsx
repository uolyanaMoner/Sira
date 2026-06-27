// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import synaxarium from "../data/synaxarium.json";
// import Text from "../components/Typography";
// import { slugify } from "../utils/slugify";
// import MiniTopBar from "../components/MiniTopBar";

// export default function SaintsPage() {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   // ❤️ FAVORITES
//   const [favorites, setFavorites] = useState<string[]>(() => {
//     const saved = localStorage.getItem("saints-favorites");

//     return saved ? JSON.parse(saved) : [];
//   });

//   // ❤️ TOGGLE FAVORITE
//   const toggleFavorite = (slug: string) => {
//     let updated: string[] = [];

//     if (favorites.includes(slug)) {
//       updated = favorites.filter((fav) => fav !== slug);
//     } else {
//       updated = [...favorites, slug];
//     }

//     setFavorites(updated);

//     localStorage.setItem(
//       "saints-favorites",
//       JSON.stringify(updated)
//     );
//   };

//   // 🧠 normalize Arabic
//   const normalize = (str: string) =>
//     (str || "")
//       .toLowerCase()
//       .replace(/[\u064B-\u065F]/g, "")
//       .replace(/[إأآا]/g, "ا")
//       .replace(/ة/g, "ه")
//       .replace(/ى/g, "ي");

//   // 🆔 DATA
//   const data = useMemo(() => {
//     return synaxarium.map((item: any) => ({
//       ...item,
//       slug: slugify(item.title),
//     }));
//   }, []);

//   // 🏆 smart ranking
//   const rankResults = (items: any[], q: string) => {
//     return items
//       .map((item) => {
//         const title = normalize(item.title);

//         const content = normalize(
//           item.content?.replace(/<[^>]*>/g, "")
//         );

//         let score = 0;

//         if (title.includes(q)) score += 20;
//         if (content.includes(q)) score += 8;
//         if (title === q) score += 100;
//         if (title.startsWith(q)) score += 50;

//         return {
//           ...item,
//           score,
//         };
//       })
//       .sort((a, b) => b.score - a.score);
//   };

//   // 🔍 SEARCH
//   const filtered = useMemo(() => {
//     if (!query) {
//       return data.slice(0, 10);
//     }

//     const q = normalize(query);

//     const results = data.filter((item: any) => {
//       const text = normalize(
//         `${item.title} ${item.content}`
//       );

//       return text.includes(q);
//     });

//     return rankResults(results, q).slice(0, 10);
//   }, [query, data]);

//   // ✨ HIGHLIGHT
//   const highlight = (text: string, q: string) => {
//     if (!q) return text;

//     const words = (text || "").split(" ");

//     const normalizedQuery = normalize(q);

//     return words
//       .map((word) => {
//         const cleanWord = normalize(word);

//         if (cleanWord.includes(normalizedQuery)) {
//           return `
//             <mark
//               style="
//                 background:#fde68a;
//                 color:#000;
//                 padding:2px 6px;
//                 border-radius:6px;
//                 font-weight:bold;
//               "
//             >
//               ${word}
//             </mark>
//           `;
//         }

//         return word;
//       })
//       .join(" ");
//   };

//   return (
//     <>
//       <MiniTopBar />
//       <div
//         dir="rtl"
//         className="
//         min-h-screen
//         bg-gradient-to-br
//         from-[#2c2c2c]
//         to-[#c6a96b]
//         text-white
//         p-6
//       "
//       >

//         {/* HEADER */}
//         <div className="text-center mb-8">

//           <Text variant="title">
//             سير القديسين
//           </Text>

//           <Text variant="subtitle">
//             ابحث عن حياة القديسين والتذكارات اليومية
//           </Text>

//         </div>

//         {/* SEARCH */}
//         <div className="max-w-2xl mx-auto mb-10">

//           <input
//             type="text"
//             placeholder="ابحث عن قديس أو كلمة داخل السنكسار..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="
//             w-full
//             p-4
//             rounded-2xl
//             bg-white/10
//             text-white
//             border
//             border-white/20
//             outline-none
//             text-right
//             placeholder-white/80
//             backdrop-blur-md
//             focus:bg-white/15
//             focus:border-white/40
//             transition-all
//             duration-300
//           "
//           />

//         </div>

//         {/* RESULTS */}
//         <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between text-sm text-white/70">

//           <div>
//             ❤️ المفضلة: {favorites.length}
//           </div>

//           <div>
//             {query
//               ? `تم العثور على ${filtered.length} نتيجة`
//               : "عرض أحدث 10 نتائج"}
//           </div>

//         </div>

//         {/* CARDS */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

//           {filtered.length > 0 ? (
//             filtered.map((item: any) => {

//               const cleanContent =
//                 item.content
//                   ?.replace(/<[^>]*>/g, "")
//                   ?.slice(0, 180) || "";

//               const isFavorite =
//                 favorites.includes(item.slug);

//               return (
//                 <div
//                   key={item.slug}
//                   onClick={() =>
//                     navigate(`/saint/${item.slug}`)
//                   }
//                   className="
//                   group
//                   cursor-pointer
//                   bg-white/10
//                   backdrop-blur-xl
//                   border
//                   border-white/10
//                   rounded-3xl
//                   p-5
//                   hover:bg-white/15
//                   hover:-translate-y-1
//                   transition-all
//                   duration-300
//                   shadow-xl
//                   text-right
//                   overflow-hidden
//                   relative
//                 "
//                 >

//                   {/* glow */}
//                   <div
//                     className="
//                     absolute
//                     inset-0
//                     opacity-0
//                     group-hover:opacity-100
//                     transition
//                     duration-500
//                     bg-gradient-to-br
//                     from-white/10
//                     to-transparent
//                     pointer-events-none
//                   "
//                   />

//                   {/* DATE */}
//                   <div className="text-sm text-white/70 mb-3 relative z-10">
//                     ⛪ {item.copticDate}
//                   </div>

//                   {/* TITLE */}
//                   <h2
//                     className="
//                     text-xl
//                     font-bold
//                     mb-4
//                     leading-8
//                     relative
//                     z-10
//                   "
//                     dangerouslySetInnerHTML={{
//                       __html: highlight(item.title, query),
//                     }}
//                   />

//                   {/* CONTENT */}
//                   <div
//                     className="
//                     text-sm
//                     text-white/80
//                     leading-8
//                     line-clamp-4
//                     relative
//                     z-10
//                   "
//                     dangerouslySetInnerHTML={{
//                       __html: highlight(
//                         cleanContent,
//                         query
//                       ),
//                     }}
//                   />

//                   {/* BUTTONS */}
//                   <div className="mt-5 relative z-10 flex items-center justify-between">

//                     {/* ❤️ FAVORITE */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(item.slug);
//                       }}
//                       className="
//                       text-2xl
//                       hover:scale-110
//                       transition
//                     "
//                     >
//                       {isFavorite ? "❤️" : "🤍"}
//                     </button>

//                     {/* READ */}
//                     <button
//                       className="
//                       px-4
//                       py-2
//                       rounded-xl
//                       bg-white/10
//                       hover:bg-white/20
//                       transition
//                       text-sm
//                     "
//                     >
//                       قراءة القصة ✨
//                     </button>

//                   </div>

//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-span-3 text-center py-20">

//               <p className="text-white/70 text-lg">
//                 لا توجد نتائج 😢
//               </p>

//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// }


import { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import synaxarium from "../data/synaxarium.json";
import Text from "../components/Typography";
import { slugify } from "../utils/slugify";
import MiniTopBar from "../components/MiniTopBar";

export default function SaintsPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ❤️ Favorites (lazy init)
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("saints-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ❤️ Toggle favorite
  const toggleFavorite = useCallback(
    (slug: string) => {
      const updated = favorites.includes(slug)
        ? favorites.filter((f) => f !== slug)
        : [...favorites, slug];

      setFavorites(updated);

      localStorage.setItem(
        "saints-favorites",
        JSON.stringify(updated)
      );
    },
    [favorites]
  );

  // 🧠 normalize
  const normalize = useCallback((str: string) => {
    return (str || "")
      .toLowerCase()
      .replace(/[\u064B-\u065F]/g, "")
      .replace(/[إأآا]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي");
  }, []);

  // 🆔 data
  const data = useMemo(() => {
    return synaxarium.map((item: any) => ({
      ...item,
      slug: slugify(item.title),
    }));
  }, []);

  // 🏆 ranking
  const rankResults = useCallback(
    (items: any[], q: string) => {
      return items
        .map((item) => {
          const title = normalize(item.title);
          const content = normalize(
            item.content?.replace(/<[^>]*>/g, "")
          );

          let score = 0;

          if (title.includes(q)) score += 20;
          if (content.includes(q)) score += 8;
          if (title === q) score += 100;
          if (title.startsWith(q)) score += 50;

          return { ...item, score };
        })
        .sort((a, b) => b.score - a.score);
    },
    [normalize]
  );

  // 🔍 filtered results
  const filtered = useMemo(() => {
    if (!query) return data.slice(0, 10);

    const q = normalize(query);

    const results = data.filter((item: any) => {
      const text = normalize(`${item.title} ${item.content}`);
      return text.includes(q);
    });

    return rankResults(results, q).slice(0, 10);
  }, [query, data, normalize, rankResults]);

  // ✨ highlight
  const highlight = useCallback(
    (text: string, q: string) => {
      if (!q) return text;

      const normalizedQuery = normalize(q);

      return (text || "")
        .split(" ")
        .map((word) => {
          const clean = normalize(word);

          if (clean.includes(normalizedQuery)) {
            return `
              <mark
                style="
                  background:#fde68a;
                  color:#000;
                  padding:2px 6px;
                  border-radius:6px;
                  font-weight:bold;
                "
              >
                ${word}
              </mark>
            `;
          }

          return word;
        })
        .join(" ");
    },
    [normalize]
  );

  // ⏳ Skeleton UI
  if (loading) {
    return (
      <>
        <MiniTopBar />
        <div className="min-h-screen bg-[#2c2c2c] p-6 text-white animate-pulse">

          {/* header */}
          <div className="text-center mb-10">
            <div className="h-10 w-48 mx-auto bg-white/10 rounded-lg mb-3" />
            <div className="h-5 w-64 mx-auto bg-white/10 rounded-lg" />
          </div>

          {/* search */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="h-14 bg-white/10 rounded-2xl" />
          </div>

          {/* cards */}
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
        className="min-h-screen bg-gradient-to-br from-[#2c2c2c] to-[#c6a96b] text-white p-6"
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <Text variant="title">سير القديسين</Text>
          <Text variant="subtitle">
            ابحث عن حياة القديسين والتذكارات اليومية
          </Text>
        </div>

        {/* SEARCH */}
        <div className="max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="ابحث عن قديس أو كلمة..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 text-white border border-white/20 outline-none text-right"
          />
        </div>

        {/* RESULTS INFO */}
        <div className="max-w-6xl mx-auto mb-6 flex justify-between text-sm text-white/70">
          <div>❤️ المفضلة: {favorites.length}</div>
          <div>
            {query
              ? `تم العثور على ${filtered.length} نتيجة`
              : "عرض أحدث 10 نتائج"}
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.length > 0 ? (
            filtered.map((item: any) => {
              const isFavorite = favorites.includes(item.slug);

              const cleanContent =
                item.content?.replace(/<[^>]*>/g, "").slice(0, 180) || "";

              return (
                <div
                  key={item.slug}
                  onClick={() => navigate(`/saint/${item.slug}`)}
                  className="cursor-pointer bg-white/10 border border-white/10 rounded-3xl p-5 hover:bg-white/15 transition relative overflow-hidden"
                >
                  <div className="text-sm text-white/70 mb-3">
                    ⛪ {item.copticDate}
                  </div>

                  <h2
                    className="text-xl font-bold mb-4"
                    dangerouslySetInnerHTML={{
                      __html: highlight(item.title, query),
                    }}
                  />

                  <div
                    className="text-sm text-white/80 line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: highlight(cleanContent, query),
                    }}
                  />

                  <div className="mt-5 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.slug);
                      }}
                      className="text-2xl"
                    >
                      {isFavorite ? "❤️" : "🤍"}
                    </button>

                    <button className="px-4 py-2 rounded-xl bg-white/10 text-sm">
                      قراءة القصة ✨
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-20 text-white/70">
              لا توجد نتائج 😢
            </div>
          )}
        </div>
      </div>
    </>
  );
}