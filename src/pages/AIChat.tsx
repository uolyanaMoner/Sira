import { useEffect, useRef, useState } from "react";
import logo from "../assets/sera.png";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AiChatPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "👋 أهلاً بك في سيرة! اسأل أي سؤال وسأحاول مساعدتك.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      console.log("📤 Sending Question:");
      console.log(question);

      const res = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `
أنت مساعد ذكي داخل تطبيق مسيحي اسمه سيرة.

مهمتك:
- الإجابة على الأسئلة الدينية.
- استخدم لغة عربية بسيطة.
- كن مختصرًا ومفيدًا.
- إذا كان السؤال غير ديني جاوب بشكل طبيعي.
- لا تستخدم لغة معقدة.

السؤال:
${question}
          `,
          }),
        }
      );

      console.log("📥 Status:", res.status);

      const data = await res.json();

      console.log("📥 Full Response:");
      console.log(data);

      if (!res.ok) {
        throw new Error(
          data?.error?.message ||
          data?.error ||
          "Request Failed"
        );
      }

      const aiText =
        data?.choices?.[0]?.message?.content ||
        "مش قادر أجيب إجابة دلوقتي 😢";

      console.log("🤖 AI Text:");
      console.log(aiText);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiText,
        },
      ]);
    } catch (error) {
      console.error("❌ AI ERROR:");
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error instanceof Error
              ? error.message
              : "حصل خطأ في الاتصال بالذكاء الاصطناعي 😢",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-end p-4 z-50">

      <div className="
    w-full
    max-w-md
    h-[75vh]
    bg-[#0f0f0f]
    rounded-3xl
    border
    border-white/10
    shadow-[0_0_40px_rgba(0,0,0,0.5)]
    flex
    flex-col
    overflow-hidden
  ">

        {/* HEADER */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#171717]">
          <img
            src={logo}
            alt="Sira AI"
            className="w-10 h-10 rounded-full"
          />

          <div className="text-center">
            <h2 className="text-white font-bold">
              Sira AI
            </h2>

            <p className="text-xs text-green-400">
              Online
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user"
                ? "justify-end"
                : "justify-start"
                }`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-3xl whitespace-pre-wrap leading-7 text-sm shadow-lg
  ${msg.role === "user"
                    ? "bg-[#c6a96b] text-black rounded-br-md"
                    : "bg-[#1e1e1e] text-white rounded-bl-md"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-white/50 text-sm animate-pulse">
              Sira AI يكتب الآن...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10 bg-[#111] flex gap-2">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="اسأل أي شيء..."
            className="flex-1 p-3 rounded-xl bg-white/5 text-white outline-none border border-white/10 focus:border-[#c6a96b]"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-[#c6a96b] text-black font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}