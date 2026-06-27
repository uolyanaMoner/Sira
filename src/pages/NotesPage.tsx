import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import synaxarium from "../data/synaxarium.json";
import Text from "../components/Typography";
import { slugify } from "../utils/slugify";
import MiniTopBar from "../components/MiniTopBar";

export default function NotesPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<any[]>([]);
  const [editingNote, setEditingNote] = useState<any>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const saintsNotes = JSON.parse(
      localStorage.getItem("saints-notes") || "{}"
    );

    const saintItems = Object.entries(saintsNotes)
      .map(([slug, note]) => {
        const saint = synaxarium.find(
          (item: any) => slugify(item.title) === slug
        );

        return {
          id: slug,
          type: "saint",
          slug,
          note,
          saint,
        };
      })
      .filter(
        (item: any) =>
          item.note?.toString().trim().length > 0 && item.saint
      );

    const spiritualItems = JSON.parse(
      localStorage.getItem("spiritual-notes") || "[]"
    )
      .filter((item: any) => item.content?.trim()?.length > 0)
      .map((item: any) => ({
        ...item,
        type: "spiritual",
      }));

    setNotes([...saintItems, ...spiritualItems]);
  };

  const openEditor = (item: any) => {
    setEditingNote(item);
    setEditedText(
      item.type === "saint" ? item.note : item.content
    );
  };

  const saveEdit = () => {
    if (!editingNote || !editedText.trim()) return;

    if (editingNote.type === "saint") {
      const saved = JSON.parse(
        localStorage.getItem("saints-notes") || "{}"
      );

      saved[editingNote.slug] = editedText.trim();

      localStorage.setItem(
        "saints-notes",
        JSON.stringify(saved)
      );
    } else {
      const saved = JSON.parse(
        localStorage.getItem("spiritual-notes") || "[]"
      );

      const updated = saved.map((item: any) =>
        item.id === editingNote.id
          ? { ...item, content: editedText.trim() }
          : item
      );

      localStorage.setItem(
        "spiritual-notes",
        JSON.stringify(updated)
      );
    }

    loadNotes();
    setEditingNote(null);
    setEditedText("");
  };

  if (loading) {
    return (
      <>
        <MiniTopBar />
        <div className="min-h-screen p-6 bg-[#2c2c2c] text-white animate-pulse">
          <div className="text-center mb-10">
            <div className="h-10 w-40 mx-auto bg-white/10 rounded-lg mb-3" />
            <div className="h-5 w-64 mx-auto bg-white/10 rounded-lg" />
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white/5 rounded-3xl border border-white/10"
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
          <Text variant="title">تأملاتي 📝</Text>
          <Text variant="subtitle">
            كل التأملات والملاحظات اللي كتبتها
          </Text>
        </div>

        {/* EMPTY */}
        {notes.length === 0 && (
          <div className="text-center text-white/70 mt-20">
            لا توجد تأملات حتى الآن ✨
          </div>
        )}

        {/* NOTES */}
        <div className="max-w-5xl mx-auto grid gap-6">
          {notes.map((item: any) => {
            if (item.type === "saint") {
              return (
                <div
                  key={item.slug}
                  onClick={() =>
                    navigate(`/saint/${item.slug}`)
                  }
                  className="
                    cursor-pointer
                    bg-white/10 backdrop-blur-xl
                    border border-white/10
                    rounded-3xl p-5
                    hover:bg-white/15
                    hover:-translate-y-1
                    transition-all duration-300
                    shadow-xl
                  "
                >
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2">
                      ✝️ {item.saint.title}
                    </h2>

                    <p className="text-sm text-white/60">
                      ⛪ {item.saint.copticDate}
                    </p>
                  </div>

                  <div className="bg-black/20 rounded-2xl p-4 whitespace-pre-wrap leading-8">
                    {item.note}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-white/60">
                      اضغط للرجوع للقديس ✨
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditor(item);
                      }}
                      className="
                        px-4 py-2
                        rounded-xl
                        bg-yellow-500
                        text-black
                        text-sm
                        hover:scale-105
                        transition
                      "
                    >
                      ✏️ تعديل
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="
                  bg-white/10 backdrop-blur-xl
                  border border-white/10
                  rounded-3xl p-5
                  shadow-xl
                "
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">
                    🙏 تأمل روحي
                  </h2>

                  <p className="text-sm text-white/60">
                    الحالة: {item.mood}
                  </p>
                </div>

                <div className="bg-black/20 rounded-2xl p-4 mb-4">
                  <p className="leading-8">
                    📖 {item.verse?.text}
                  </p>

                  <p className="text-sm text-white/60 mt-2">
                    {item.verse?.ref}
                  </p>
                </div>

                {item.highlight && (
                  <div className="mb-4 bg-yellow-400/20 border border-yellow-300/20 rounded-2xl p-4">
                    <p className="text-yellow-100">
                      ✨ {item.highlight}
                    </p>
                  </div>
                )}

                <div className="bg-black/20 rounded-2xl p-4 whitespace-pre-wrap leading-8">
                  {item.content}

                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditor(item);
                      }}
                      className="
                        px-4 py-2
                        rounded-xl
                        bg-yellow-500
                        text-black
                        text-sm
                        hover:scale-105
                        transition
                      "
                    >
                      ✏️ تعديل
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2c2c2c] rounded-3xl p-6 w-full max-w-2xl border border-white/10">
            <h3 className="text-xl font-bold mb-4">
              ✏️ تعديل الملاحظة
            </h3>

            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="
                w-full h-52
                bg-black/20
                border border-white/10
                rounded-2xl
                p-4
                outline-none
                resize-none
                text-white
              "
            />

            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={() => {
                  setEditingNote(null);
                  setEditedText("");
                }}
                className="px-4 py-2 rounded-xl bg-white/10"
              >
                إلغاء
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-xl bg-yellow-500 text-black font-bold"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}