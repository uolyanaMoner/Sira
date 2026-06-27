import { useState } from "react";
import AiChatPopup from "./AIChat";
import logo from "../assets/darklogo.png";
export default function FloatingAIButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-5 right-5
          w-14 h-14 rounded-full
          bg-gradient-to-r from-yellow-500 to-yellow-300
          text-black text-2xl
          shadow-xl
          hover:scale-110 transition
          flex items-center justify-center
          z-50
        "
      >
        <img src={logo} alt="Sira AI" className="w-20 h-20" />
      </button>

      {/* POPUP */}
      {open && <AiChatPopup onClose={() => setOpen(false)} />}
    </>
  );
}