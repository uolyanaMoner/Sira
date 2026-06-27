export default function Footer() {
  return (
    <footer
      style={{
        padding: "12px 18px",
        textAlign: "center",
        fontSize: 12,
        color: "rgba(255,255,255,0.7)",
        position: "relative",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14,
          padding: "10px 14px",
          display: "inline-block",
        }}
      >
        © {new Date().getFullYear()} Synaxarium • Made with ✝️
      </div>
    </footer>
  );
}