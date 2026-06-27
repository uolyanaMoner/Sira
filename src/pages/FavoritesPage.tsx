// import { useMemo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import synaxarium from "../data/synaxarium.json";
// import Text from "../components/Typography";
// import { slugify } from "../utils/slugify";
// import MiniTopBar from "../components/MiniTopBar";
// import Button from "../components/Button";

// export default function FavoritesPage() {
//   const navigate = useNavigate();

//   const [favorites, setFavorites] = useState<string[]>([]);

//   // ❤️ LOAD FAVORITES
//   useEffect(() => {
//     const saved = JSON.parse(
//       localStorage.getItem("saints-favorites") || "[]"
//     );

//     setFavorites(saved);
//   }, []);

//   // 📖 GET FAVORITE SAINTS
//   const favoriteSaints = useMemo(() => {
//     return synaxarium.filter((item: any) => {
//       const slug = slugify(item.title);

//       return favorites.includes(slug);
//     });
//   }, [favorites]);

//   return (
//     <>
//       <MiniTopBar />
//       <div dir="rtl"
//         className="min-h-screen p-6 text-white bg-gradient-to-br from-[#2c2c2c] to-[#c6a96b] ">
//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <Text variant="title">
//             المفضلة ❤️
//           </Text>
//           <Text variant="subtitle">
//             القديسين المحفوظين عندك
//           </Text>
//         </div>
//         {/* EMPTY */}
//         {favoriteSaints.length === 0 && (
//           <div className="text-center text-white/70 mt-20">
//             لا يوجد قديسين محفوظين 😢
//           </div>
//         )}
//         {/* CARDS */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {favoriteSaints.map((saint: any) => {
//             const slug = slugify(saint.title);
//             const preview =
//               saint.content
//                 ?.replace(/<[^>]*>/g, "")
//                 ?.slice(0, 180) || "";
//             return (
//               <div
//                 key={slug}
//                 onClick={() => navigate(`/saint/${slug}`)}
//                 className="group cursor-pointer bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5
//                 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 shadow-xl text-right overflow-hidden relative">
//                 {/* glow */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100
//                   transition duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
//                 {/* DATE */}
//                 <div className="text-sm text-white/70 mb-3 relative z-10">
//                   ⛪ {saint.copticDate}
//                 </div>
//                 {/* TITLE */}
//                 <Text variant="title"
//                   className="text-xl font-bold mb-4 leading-8 relative z-10">
//                   {saint.title}
//                 </Text>
//                 {/* CONTENT */}
//                 <p
//                   className=" text-sm text-white/80 leading-8 line-clamp-4 relative z-10">
//                   {preview}
//                 </p>
//                 {/* CTA */}
//                 <div className="mt-5 relative z-10 flex items-center justify-between">
//                   <div className="text-2xl">
//                     ❤️
//                   </div>
//                   <Button
//                     className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm">
//                     قراءة القصة ✨
//                   </Button>
//                 </div>

//               </div>
//             );
//           })}

//         </div>
//       </div>
//     </>
//   );
// }


import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import synaxarium from "../data/synaxarium.json";
import Text from "../components/Typography";
import { slugify } from "../utils/slugify";
import MiniTopBar from "../components/MiniTopBar";
import Button from "../components/Button";

export default function FavoritesPage() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ❤️ Load favorites
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("saints-favorites") || "[]"
    );

    setFavorites(saved);
  }, []);

  // 📖 Favorite saints
  const favoriteSaints = useMemo(() => {
    return synaxarium.filter((item: any) => {
      const slug = slugify(item.title);
      return favorites.includes(slug);
    });
  }, [favorites]);

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

          {/* EMPTY / GRID SKELETON */}
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
          <Text variant="title">المفضلة ❤️</Text>
          <Text variant="subtitle">
            القديسين المحفوظين عندك
          </Text>
        </div>

        {/* EMPTY STATE */}
        {favoriteSaints.length === 0 && (
          <div className="text-center text-white/70 mt-20">
            لا يوجد قديسين محفوظين 😢
          </div>
        )}

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {favoriteSaints.map((saint: any) => {
            const slug = slugify(saint.title);

            const preview =
              saint.content
                ?.replace(/<[^>]*>/g, "")
                ?.slice(0, 180) || "";

            return (
              <div
                key={slug}
                onClick={() => navigate(`/saint/${slug}`)}
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

                {/* DATE */}
                <div className="text-sm text-white/70 mb-3 relative z-10">
                  ⛪ {saint.copticDate}
                </div>

                {/* TITLE */}
                <Text
                  variant="title"
                  className="text-xl font-bold mb-4 leading-8 relative z-10"
                >
                  {saint.title}
                </Text>

                {/* CONTENT */}
                <p className="text-sm text-white/80 leading-8 line-clamp-4 relative z-10">
                  {preview}
                </p>

                {/* CTA */}
                <div className="mt-5 relative z-10 flex items-center justify-between">
                  <div className="text-2xl">❤️</div>

                  <Button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm">
                    قراءة القصة ✨
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}