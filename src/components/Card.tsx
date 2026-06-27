type CardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({
  title,
  description,
  icon,
  children,
  className = "",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-md
        p-5
        shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:bg-white/10
        cursor-pointer
        ${className}
      `}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* Icon */}
      {icon && (
        <div className="mb-4 text-3xl">
          {icon}
        </div>
      )}

      {/* Title */}
      {title && (
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-white/70 leading-6">
          {description}
        </p>
      )}

      {/* Extra Content */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}