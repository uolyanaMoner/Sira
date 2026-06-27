// export type AchievementStats = {
//   saintsRead: number;
//   favorites: number;
//   notes: number;
//   highlights: number;
//   shares: number;
// };

// export type StreakData = {
//   currentStreak: number;
//   lastReadDate: string;
// };

// export type Badge = {
//   id: string;
//   title: string;
//   icon: string;
//   unlocked: boolean;
//   current: number;
//   target: number;
// };

// export type AchievementData = {
//   xp: number;
//   level: number;

//   stats: AchievementStats;

//   badges: string[];

//   readSaints: string[];

//   streak: StreakData;
// };

// const STORAGE_KEY = "saints-achievements";

// // 🌟 DEFAULT DATA
// const defaultData: AchievementData = {
//   xp: 0,
//   level: 1,

//   stats: {
//     saintsRead: 0,
//     favorites: 0,
//     notes: 0,
//     highlights: 0,
//     shares: 0,
//   },

//   badges: [],

//   readSaints: [],

//   streak: {
//     currentStreak: 0,
//     lastReadDate: "",
//   },
// };

// // 📦 GET
// export const getAchievements =
//   (): AchievementData => {

//     const saved =
//       localStorage.getItem(
//         STORAGE_KEY
//       );

//     if (!saved) {
//       return defaultData;
//     }

//     try {

//       const parsed =
//         JSON.parse(saved);

//       return {
//         ...defaultData,
//         ...parsed,

//         stats: {
//           ...defaultData.stats,
//           ...parsed.stats,
//         },

//         streak: {
//           ...defaultData.streak,
//           ...parsed.streak,
//         },
//       };

//     } catch {

//       return defaultData;

//     }
//   };

// // 💾 SAVE
// export const saveAchievements = (
//   data: AchievementData
// ) => {

//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify(data)
//   );
// };

// // 📊 LEVEL
// export const calculateLevel = (
//   xp: number
// ) => {

//   return Math.floor(xp / 100) + 1;
// };

// // 🏅 BADGES SYSTEM
// export const badgesList = (
//   data: AchievementData
// ): Badge[] => {



  
//   return [

//     // 📖 READING
//     {
//       id: "read_1",
//       title: "أول قراءة",
//       icon: "📖",
//       current:
//         data.stats.saintsRead,
//       target: 1,
//       unlocked:
//         data.stats.saintsRead >= 1,
//     },

//     {
//       id: "read_10",
//       title: "10 قراءات",
//       icon: "🏆",
//       current:
//         data.stats.saintsRead,
//       target: 10,
//       unlocked:
//         data.stats.saintsRead >= 10,
//     },

//     {
//       id: "read_25",
//       title: "25 قراءة",
//       icon: "👑",
//       current:
//         data.stats.saintsRead,
//       target: 25,
//       unlocked:
//         data.stats.saintsRead >= 25,
//     },

//     // ❤️ FAVORITES
//     {
//       id: "favorite_1",
//       title: "أول مفضلة",
//       icon: "❤️",
//       current:
//         data.stats.favorites,
//       target: 1,
//       unlocked:
//         data.stats.favorites >= 1,
//     },

//     {
//       id: "favorite_5",
//       title: "5 مفضلات",
//       icon: "💖",
//       current:
//         data.stats.favorites,
//       target: 5,
//       unlocked:
//         data.stats.favorites >= 5,
//     },

//     {
//       id: "favorite_15",
//       title: "15 مفضلة",
//       icon: "💘",
//       current:
//         data.stats.favorites,
//       target: 15,
//       unlocked:
//         data.stats.favorites >= 15,
//     },

//     // 📝 NOTES
//     {
//       id: "note_1",
//       title: "أول تأمل",
//       icon: "📝",
//       current:
//         data.stats.notes,
//       target: 1,
//       unlocked:
//         data.stats.notes >= 1,
//     },

//     {
//       id: "note_5",
//       title: "5 تأملات",
//       icon: "✨",
//       current:
//         data.stats.notes,
//       target: 5,
//       unlocked:
//         data.stats.notes >= 5,
//     },

//     {
//       id: "note_20",
//       title: "20 تأمل",
//       icon: "🌟",
//       current:
//         data.stats.notes,
//       target: 20,
//       unlocked:
//         data.stats.notes >= 20,
//     },

//     // 🔥 STREAK
//     {
//       id: "streak_3",
//       title: "3 أيام متتالية",
//       icon: "🔥",
//       current:
//         data.streak.currentStreak,
//       target: 3,
//       unlocked:
//         data.streak.currentStreak >= 3,
//     },

//     {
//       id: "streak_7",
//       title: "7 أيام متتالية",
//       icon: "⚡",
//       current:
//         data.streak.currentStreak,
//       target: 7,
//       unlocked:
//         data.streak.currentStreak >= 7,
//     },

//   ];
// };

// // 🏆 SAVE UNLOCKED BADGES
// export const checkBadges = (
//   data: AchievementData
// ) => {

//   const unlocked =
//     badgesList(data)
//       .filter(
//         (badge) =>
//           badge.unlocked
//       )
//       .map(
//         (badge) =>
//           badge.id
//       );

//   data.badges = unlocked;

//   return data;
// };

// // 📖 TRACK READ
// export const trackRead = (
//   saintSlug: string
// ) => {

//   const data =
//     getAchievements();

//   if (
//     data.readSaints.includes(
//       saintSlug
//     )
//   ) {
//     return data;
//   }

//   data.readSaints.push(
//     saintSlug
//   );

//   data.stats.saintsRead += 1;

//   // ⭐ XP
//   data.xp += 10;

//   // 🔥 STREAK
//   const today =
//     new Date()
//       .toISOString()
//       .split("T")[0];

//   const yesterdayDate =
//     new Date();

//   yesterdayDate.setDate(
//     yesterdayDate.getDate() - 1
//   );

//   const yesterday =
//     yesterdayDate
//       .toISOString()
//       .split("T")[0];

//   if (
//     data.streak.lastReadDate ===
//     today
//   ) {
//     // already counted
//   }

//   else if (
//     data.streak.lastReadDate ===
//     yesterday
//   ) {

//     data.streak.currentStreak += 1;

//   }

//   else {

//     data.streak.currentStreak = 1;

//   }

//   data.streak.lastReadDate =
//     today;

//   // 📊 LEVEL
//   data.level =
//     calculateLevel(data.xp);

//   // 🏅 BADGES
//   checkBadges(data);

//   saveAchievements(data);

//   return data;
// };

// // ❤️ FAVORITE
// export const trackFavorite =
//   () => {

//     const data =
//       getAchievements();

//     data.stats.favorites += 1;

//     data.xp += 5;

//     data.level =
//       calculateLevel(data.xp);

//     checkBadges(data);

//     saveAchievements(data);

//     return data;
//   };

// // 📝 NOTE
// export const trackNote = () => {

//   const data =
//     getAchievements();

//   data.stats.notes += 1;

//   data.xp += 15;

//   data.level =
//     calculateLevel(data.xp);

//   checkBadges(data);

//   saveAchievements(data);

//   return data;
// };

// // ✨ HIGHLIGHT
// export const trackHighlight =
//   () => {

//     const data =
//       getAchievements();

//     data.stats.highlights += 1;

//     data.xp += 2;

//     data.level =
//       calculateLevel(data.xp);

//     checkBadges(data);

//     saveAchievements(data);

//     return data;
//   };

// // 🔗 SHARE
// export const trackShare = () => {

//   const data =
//     getAchievements();

//   data.stats.shares += 1;

//   data.xp += 8;

//   data.level =
//     calculateLevel(data.xp);

//   checkBadges(data);

//   saveAchievements(data);

//   return data;
// };


// // 📖 SYNAXARIUM DAILY TRACK (once per day)
// export const trackSynaxariumRead = (dateKey: string) => {
//   const data = getAchievements();

//   const key = `synaxarium-${dateKey}`;

//   // ❌ already counted today
//   if (localStorage.getItem(key)) {
//     return data;
//   }

//   // ✅ mark as read today
//   localStorage.setItem(key, "true");

//   // 📊 stats update
//   data.stats.saintsRead += 1;

//   // ⭐ XP reward
//   data.xp += 10;

//   // 📊 level update
//   data.level = calculateLevel(data.xp);

//   // 🏅 badges update
//   checkBadges(data);

//   // 💾 save
//   saveAchievements(data);

//   return data;
// };


export type AchievementStats = {
  saintsRead: number;
  synaxariumRead: number; // 📖 NEW (separate)
  favorites: number;
  notes: number;
  highlights: number;
  shares: number;
};

export type StreakData = {
  currentStreak: number;
  lastReadDate: string;
};

export type Badge = {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  current: number;
  target: number;
};

export type AchievementData = {
  xp: number;
  level: number;

  stats: AchievementStats;

  badges: string[];

  readSaints: string[];

  streak: StreakData;
};

const STORAGE_KEY = "saints-achievements";

// 🌟 DEFAULT DATA
const defaultData: AchievementData = {
  xp: 0,
  level: 1,

  stats: {
    saintsRead: 0,
    synaxariumRead: 0,
    favorites: 0,
    notes: 0,
    highlights: 0,
    shares: 0,
  },

  badges: [],

  readSaints: [],

  streak: {
    currentStreak: 0,
    lastReadDate: "",
  },
};

// 📦 GET
export const getAchievements = (): AchievementData => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return defaultData;

  try {
    const parsed = JSON.parse(saved);

    return {
      ...defaultData,
      ...parsed,

      stats: {
        ...defaultData.stats,
        ...parsed.stats,
      },

      streak: {
        ...defaultData.streak,
        ...parsed.streak,
      },
    };
  } catch {
    return defaultData;
  }
};

// 💾 SAVE
export const saveAchievements = (data: AchievementData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 📊 LEVEL
export const calculateLevel = (xp: number) => {
  return Math.floor(xp / 100) + 1;
};

// 🏅 BADGES SYSTEM
export type BadgeType = {
  id: string;
  title: string;
  icon: string;
  current: number;
  target: number;
  unlocked: boolean;
};

export const badgesList = (data: AchievementData): BadgeType[] => {
  return [
    // 📖 READ SAINTS
    {
      id: "read_1",
      title: "أول قراءة",
      icon: "📖",
      current: data.stats.saintsRead,
      target: 1,
      unlocked: data.stats.saintsRead >= 1,
    },
    {
      id: "read_10",
      title: "10 قراءات",
      icon: "🏆",
      current: data.stats.saintsRead,
      target: 10,
      unlocked: data.stats.saintsRead >= 10,
    },

    // 📖 SYNAXARIUM
    {
      id: "synax_1",
      title: "أول سنكسار",
      icon: "⛪",
      current: data.stats.synaxariumRead,
      target: 1,
      unlocked: data.stats.synaxariumRead >= 1,
    },
    {
      id: "synax_7",
      title: "7 أيام سنكسار",
      icon: "🔥",
      current: data.stats.synaxariumRead,
      target: 7,
      unlocked: data.stats.synaxariumRead >= 7,
    },

    // ❤️ FAVORITES
    {
      id: "fav_1",
      title: "أول مفضلة",
      icon: "❤️",
      current: data.stats.favorites,
      target: 1,
      unlocked: data.stats.favorites >= 1,
    },

    // 📝 NOTES
    {
      id: "note_1",
      title: "أول تأمل",
      icon: "📝",
      current: data.stats.notes,
      target: 1,
      unlocked: data.stats.notes >= 1,
    },

    // 🔥 STREAK
    {
      id: "streak_3",
      title: "3 أيام متتالية",
      icon: "🔥",
      current: data.streak.currentStreak,
      target: 3,
      unlocked: data.streak.currentStreak >= 3,
    },
  ];
};

// 🏆 CHECK BADGES
export const checkBadges = (data: AchievementData) => {
  const unlocked = badgesList(data)
    .filter((b) => b.unlocked)
    .map((b) => b.id);

  data.badges = unlocked;

  return data;
};

// 📖 TRACK GENERAL READ
export const trackRead = (saintSlug: string) => {
  const data = getAchievements();

  if (data.readSaints.includes(saintSlug)) {
    return data;
  }

  data.readSaints.push(saintSlug);
  data.stats.saintsRead += 1;

  data.xp += 10;

  const today = new Date().toISOString().split("T")[0];

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const yesterday = yesterdayDate.toISOString().split("T")[0];

  if (data.streak.lastReadDate === yesterday) {
    data.streak.currentStreak += 1;
  } else if (data.streak.lastReadDate !== today) {
    data.streak.currentStreak = 1;
  }

  data.streak.lastReadDate = today;

  data.level = calculateLevel(data.xp);

  checkBadges(data);

  saveAchievements(data);

  return data;
};

// ❤️ FAVORITE
export const trackFavorite = () => {
  const data = getAchievements();

  data.stats.favorites += 1;
  data.xp += 5;

  data.level = calculateLevel(data.xp);

  checkBadges(data);

  saveAchievements(data);

  return data;
};

// 📝 NOTE
export const trackNote = () => {
  const data = getAchievements();

  data.stats.notes += 1;
  data.xp += 15;

  data.level = calculateLevel(data.xp);

  checkBadges(data);

  saveAchievements(data);

  return data;
};

// ✨ HIGHLIGHT
export const trackHighlight = () => {
  const data = getAchievements();

  data.stats.highlights += 1;
  data.xp += 2;

  data.level = calculateLevel(data.xp);

  checkBadges(data);

  saveAchievements(data);

  return data;
};

// 🔗 SHARE
export const trackShare = () => {
  const data = getAchievements();

  data.stats.shares += 1;
  data.xp += 8;

  data.level = calculateLevel(data.xp);

  checkBadges(data);

  saveAchievements(data);

  return data;
};

// 📖 SYNAXARIUM TRACK (DAILY ONLY)
export const trackSynaxariumRead = (dateKey: string) => {
  const data = getAchievements();

  const key = `synaxarium-read-${dateKey}`;

  if (localStorage.getItem(key)) {
    return data;
  }

  localStorage.setItem(key, "true");

  data.stats.synaxariumRead += 1;

  data.xp += 10;

  data.level = calculateLevel(data.xp);

  checkBadges(data);

  saveAchievements(data);

  return data;
};