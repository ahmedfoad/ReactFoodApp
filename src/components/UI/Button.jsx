const variants = {
  primary:
    "bg-coral text-white shadow-sm hover:bg-[#d85e44] active:scale-[0.98]",
  secondary:
    "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-leaf",
  textOnly: "bg-transparent text-forest shadow-none hover:bg-leaf",
};

export default function Button({
  children,
  variant = "primary",
  textOnly = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseClasses =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[textOnly ? "textOnly" : variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
