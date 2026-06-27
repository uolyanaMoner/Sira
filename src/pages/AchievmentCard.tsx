// import { getAchievements } from "../utils/achievements";

// export default function AchievementCard() {
//   const data = getAchievements();

//   return (
//     <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl text-white shadow-xl">

//       {/* TITLE */}
//       <h2 className="text-xl font-bold mb-4">
//         🏆 إنجازاتك
//       </h2>

//       {/* GRID */}
//       <div className="grid grid-cols-2 gap-4 text-sm">

//         <div className="bg-white/5 p-3 rounded-2xl">
//           📖
//           <div className="font-bold text-lg">
//             {data.stats.saintsRead}
//           </div>
//           <div className="text-white/60">
//             قراءات
//           </div>
//         </div>

//         <div className="bg-white/5 p-3 rounded-2xl">
//           ❤️
//           <div className="font-bold text-lg">
//             {data.stats.favorites}
//           </div>
//           <div className="text-white/60">
//             مفضلة
//           </div>
//         </div>

//         <div className="bg-white/5 p-3 rounded-2xl">
//           📝
//           <div className="font-bold text-lg">
//             {data.stats.notes}
//           </div>
//           <div className="text-white/60">
//             تأملات
//           </div>
//         </div>

//         <div className="bg-white/5 p-3 rounded-2xl">
//           ⭐
//           <div className="font-bold text-lg">
//             {data.xp}
//           </div>
//           <div className="text-white/60">
//             XP
//           </div>
//         </div>

//       </div>

//       {/* LEVEL */}
//       <div className="mt-4 text-center bg-white/5 p-3 rounded-2xl">
//         📊 Level:{" "}
//         <span className="font-bold text-yellow-300">
//           {data.level}
//         </span>
//       </div>
//     </div>
//   );
// }



import { getAchievements } from "../utils/achievements";
import  Text  from "../components/Typography";
export default function AchievementCard() {
  const data = getAchievements();

  return (
    <div className="w-full flex justify-center py-10 px-4">
      
      <div className="w-[100%] max-w-6xl bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl text-white shadow-xl">

        {/* TITLE */}
        <Text variant="title" className="text-xl font-bold mb-5 text-center">
          🏆 إنجازاتك
        </Text>

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="bg-white/5 p-4 rounded-2xl text-center">
            <div className="text-xl">📖</div>
            <div className="font-bold text-lg">
              {data.stats.saintsRead}
            </div>
            <div className="text-white/60">قراءات</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl text-center">
            <div className="text-xl">❤️</div>
            <div className="font-bold text-lg">
              {data.stats.favorites}
            </div>
            <div className="text-white/60">مفضلة</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl text-center">
            <div className="text-xl">📝</div>
            <div className="font-bold text-lg">
              {data.stats.notes}
            </div>
            <div className="text-white/60">تأملات</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl text-center">
            <div className="text-xl">⭐</div>
            <div className="font-bold text-lg">
              {data.xp}
            </div>
            <div className="text-white/60">XP</div>
          </div>

        </div>

        {/* LEVEL + STREAK */}
        <div className="mt-5 grid grid-cols-2 gap-4">

          <div className="bg-white/5 p-4 rounded-2xl text-center">
            📊
            <div className="font-bold text-lg text-yellow-300">
              {data.level}
            </div>
            <div className="text-white/60 text-sm">Level</div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl text-center">
            🔥
            <div className="font-bold text-lg text-orange-300">
              {data.streak?.currentStreak || 0}
            </div>
            <div className="text-white/60 text-sm">Streak</div>
          </div>

        </div>

        {/* BADGES */}
        <div className="mt-5 text-right">
          <p className="text-sm text-white/70 mb-2">
            🏅 Badges
          </p>

          <div className="flex flex-wrap gap-2 justify-end">
            {data.badges.length === 0 ? (
              <p className="text-white/50 text-sm">
                لسه مفيش badges 😢
              </p>
            ) : (
              data.badges.map((badge: string, i: number) => (
                <span
                  key={i}
                  className="bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-xl text-xs"
                >
                  {badge}
                </span>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}