type TextProps = {
  children: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "paragraph";
  className?: string;
};

export default function Text({
  children,
  variant = "body",
  className = "",
}: TextProps) {
  const styles = {
    title: "text-4xl md:text-3xl mb-4 font-bold ",
    subtitle: "text-lg font-semibold mb-2",
    paragraph: "text-sm md:text-base",
    body: "text-sm md:text-base",
  };

  return (
    <p className={`${styles[variant]} ${className}`}>
      {children}
    </p>
  );
}