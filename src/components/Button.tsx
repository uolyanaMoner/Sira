type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "nav" | "toggle" | "accent";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) {
  const base =
    "px-5 py-2 rounded-full font-sans font-bold text-sm transition-all duration-200 tracking-wide active:scale-95";

  const styles = {
    primary: "bg-black text-white hover:opacity-80",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    ghost: "bg-transparent text-black underline hover:opacity-70",
    nav: "font-bold hover:opacity-70",
    toggle: "text-xs border px-3 py-1 rounded-full hover:opacity-70",
    accent:
      "bg-[#e0c48f] text-black hover:opacity-80 shadow-lg rounded-xl py-3",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}