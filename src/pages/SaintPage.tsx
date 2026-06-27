import {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import synaxarium from "../data/synaxarium.json";
import Text from "../components/Typography";
import { slugify } from "../utils/slugify";
import {
  trackRead,
  trackFavorite,
  trackNote,
} from "../utils/achievements";
import MiniTopBar from "../components/MiniTopBar";

export default function SaintPage() {
  const { slug } = useParams();
  const saintKey = slug as string;

  const [loading, setLoading] = useState(true);

  // ⏳ Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const saint = useMemo(() => {
    return synaxarium.find(
      (item: any) => slugify(item.title) === slug
    );
  }, [slug]);

  // ❌ Not found
  if (!saint) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#2c2c2c]">
        Not found 😢
      </div>
    );
  }

  useEffect(() => {
    if (!saintKey) return;

    const key = `read-${saintKey}`;
    const last = localStorage.getItem(key);

    const now = Date.now();
    const cooldown = 1000 * 60 * 30; // 30 min

    const sessionKey = `session-${saintKey}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");

    if (!last || now - Number(last) > cooldown) {
      trackRead(saintKey);

      localStorage.setItem(key, String(now));

      const total = Number(
        localStorage.getItem("total-reads") || "0"
      );
      localStorage.setItem(
        "total-reads",
        String(total + 1)
      );
    }
  }, [saintKey]);

  // 📚 last read
  useEffect(() => {
    localStorage.setItem(
      "last-read-saint",
      JSON.stringify({ slug })
    );
  }, [slug]);

  // ❤️ FAVORITES
  const [favorites, setFavorites] = useState<string[]>([]);
  const isFavorite = favorites.includes(saintKey);

  // 📝 NOTE
  const [note, setNote] = useState("");
  const hasTrackedNote = useRef(false);

  // ✨ HIGHLIGHTS
  const [highlights, setHighlights] = useState<string[]>([]);

  // 📦 LOAD DATA
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("saints-favorites") || "[]"
    );
    setFavorites(savedFavorites);

    const savedNotes = JSON.parse(
      localStorage.getItem("saints-notes") || "{}"
    );
    setNote(savedNotes[saintKey] || "");

    const savedHighlights = JSON.parse(
      localStorage.getItem("saints-highlights") || "{}"
    );
    setHighlights(savedHighlights[saintKey] || []);
  }, [saintKey]);

  // ❤️ FAVORITE
  const toggleFavorite = useCallback(() => {
    const updated = isFavorite
      ? favorites.filter((f) => f !== saintKey)
      : [...favorites, saintKey];

    setFavorites(updated);

    localStorage.setItem(
      "saints-favorites",
      JSON.stringify(updated)
    );

    if (!isFavorite) {
      trackFavorite();
    }
  }, [favorites, isFavorite, saintKey]);

  // 📝 NOTE
  const saveNote = useCallback(
    (value: string) => {
      setNote(value);

      const saved = JSON.parse(
        localStorage.getItem("saints-notes") || "{}"
      );

      saved[saintKey] = value;

      localStorage.setItem(
        "saints-notes",
        JSON.stringify(saved)
      );

      if (
        value.trim().length > 0 &&
        !hasTrackedNote.current
      ) {
        trackNote();
        hasTrackedNote.current = true;
      }
    },
    [saintKey]
  );

  // ✨ HIGHLIGHT
  const toggleHighlight = useCallback(
    (word: string) => {
      const clean = word.trim();
      if (!clean) return;

      const updated = highlights.includes(clean)
        ? highlights.filter((w) => w !== clean)
        : [...highlights, clean];

      setHighlights(updated);

      const saved = JSON.parse(
        localStorage.getItem("saints-highlights") || "{}"
      );

      saved[saintKey] = updated;

      localStorage.setItem(
        "saints-highlights",
        JSON.stringify(saved)
      );
    },
    [highlights, saintKey]
  );

  const handleSelect = () => {
    const selection = window.getSelection()?.toString();
    if (!selection) return;
    toggleHighlight(selection);
  };

  // 🔗 SHARE
  const handleShare = async () => {
    const shareData = {
      title: saint.title,
      text: `📖 اقرأ سيرة ${saint.title} على تطبيق السنكسار ✨`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );
        alert("تم نسخ الرابط ✨");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 🎨 CONTENT
  const renderContent = () => {
    const text = saint.content.replace(/<[^>]*>/g, "");

    return text
      .split(" ")
      .map((word: string) => {
        const clean = word.replace(/[.,،]/g, "");
        const isHighlighted = highlights.includes(clean);

        return `
          <span
            style="
              cursor:pointer;
              padding:2px 4px;
              border-radius:6px;
              transition:all 0.2s ease;
              ${
                isHighlighted
                  ? "background:#fde68a;color:#000;font-weight:600;"
                  : ""
              }
            "
          >
            ${word}
          </span>
        `;
      })
      .join(" ");
  };

  // ⏳ LOADING UI
  if (loading) {
    return (
      <>
        <MiniTopBar />
        <div className="min-h-screen p-6 bg-[#2c2c2c] animate-pulse text-white">

          <div className="flex justify-between mb-6">
            <div className="h-10 w-24 bg-white/10 rounded-xl" />
            <div className="h-6 w-40 bg-white/10 rounded-lg" />
          </div>

          <div className="h-10 w-1/2 mx-auto bg-white/10 rounded-lg mb-8" />
          <div className="h-64 w-full bg-white/10 rounded-2xl mb-6" />
          <div className="h-32 w-full bg-white/10 rounded-2xl" />
        </div>
      </>
    );
  }


  //     <div
  //       dir="rtl"
  //       className="min-h-screen text-right p-6 text-white bg-gradient-to-br from-[#2c2c2c] to-[#c6a96b]"
  //     >
  //       {/* TOP */}
  //       <div className="flex items-center justify-between mb-4">
  //         <div className="flex items-center gap-3">
  //           <button
  //             onClick={toggleFavorite}
  //             className="text-3xl hover:scale-110 transition"
  //           >
  //             {isFavorite ? "❤️" : "🤍"}
  //           </button>

  //           <button
  //             onClick={handleShare}
  //             className="px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 transition text-sm"
  //           >
  //             🔗 مشاركة
  //           </button>
  //         </div>

  //         <Text variant="subtitle" className="opacity-70">
  //           {saint.copticDate} - {saint.gregorianDate}
  //         </Text>
  //       </div>

  //       {/* TITLE */}
  //       <Text variant="title" className="text-center mb-5">
  //         {saint.title}
  //       </Text>

  //       {/* CONTENT */}
  //       <div
  //         className="bg-white/10 p-5 rounded-2xl leading-10 select-text"
  //         onMouseUp={handleSelect}
  //         onTouchEnd={handleSelect}
  //         dangerouslySetInnerHTML={{
  //           __html: renderContent(),
  //         }}
  //       />

  //       {/* NOTES */}
  //       <div className="mt-6 bg-white/10 p-5 rounded-2xl">
  //         <div className="mb-3 font-bold text-lg">
  //           📝 تأملاتي
  //         </div>

  //         <textarea
  //           value={note}
  //           onChange={(e) => saveNote(e.target.value)}
  //           className="w-full min-h-[110px] bg-white/5 p-4 rounded-xl text-white outline-none resize-none"
  //           placeholder="اكتب تأملك..."
  //         />
  //       </div>
  //     </div>
  //   </>
  // );
  return (
  <>
    <MiniTopBar />

    <div
      dir="rtl"
      className="
        min-h-screen
        text-right
        px-4
        py-5
        md:p-6
        text-white
        bg-gradient-to-br
        from-[#2c2c2c]
        to-[#c6a96b]
      "
    >
      <div className="max-w-5xl mx-auto">

        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

          <div className="flex items-center gap-2 self-start">
            <button
              onClick={toggleFavorite}
              className="
                text-2xl
                md:text-3xl
                hover:scale-110
                transition
              "
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>

            <button
              onClick={handleShare}
              className="
                px-3
                py-2
                md:px-4
                rounded-xl
                bg-white/10
                hover:bg-white/20
                transition
                text-xs
                md:text-sm
                whitespace-nowrap
              "
            >
              🔗 مشاركة
            </button>
          </div>

          <Text
            variant="subtitle"
            className="
              opacity-70
              text-xs
              md:text-base
              break-words
            "
          >
            {saint.copticDate} - {saint.gregorianDate}
          </Text>
        </div>

        {/* TITLE */}
        <Text
          variant="title"
          className="
            text-center
            mb-6
            text-2xl
            md:text-4xl
            leading-relaxed
          "
        >
          {saint.title}
        </Text>

        {/* CONTENT */}
        <div
          className="
            bg-white/10
            p-4
            md:p-6
            rounded-2xl
            leading-8
            md:leading-10
            text-[15px]
            md:text-lg
            select-text
            break-words
            shadow-lg
          "
          onMouseUp={handleSelect}
          onTouchEnd={handleSelect}
          dangerouslySetInnerHTML={{
            __html: renderContent(),
          }}
        />

        {/* NOTES */}
        <div
          className="
            mt-6
            bg-white/10
            p-4
            md:p-5
            rounded-2xl
            shadow-lg
          "
        >
          <div className="mb-3 font-bold text-lg">
            📝 تأملاتي
          </div>

          <textarea
            value={note}
            onChange={(e) => saveNote(e.target.value)}
            className="
              w-full
              min-h-[140px]
              md:min-h-[110px]
              bg-white/5
              p-4
              rounded-xl
              text-white
              outline-none
              resize-none
              text-sm
              md:text-base
            "
            placeholder="اكتب تأملك..."
          />
        </div>

      </div>
    </div>
  </>
);
}