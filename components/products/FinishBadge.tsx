// Maps finish display name → Tailwind bg class for the 8px swatch dot.
// Classes are written as literals so Tailwind includes them in the bundle.
const FINISH_SWATCH: Record<string, string> = {
  Chrome: "bg-finish-chrome",
  Gold: "bg-finish-gold",
  "Rose Gold": "bg-finish-rosegold",
  "Matt Black": "bg-finish-mattblack",
  Mirror: "bg-finish-mirror",
  Satin: "bg-finish-satin",
  Glossy: "bg-finish-glossy",
  "CP Premium": "bg-finish-cp",
};

interface Props {
  finish: string | null;
  className?: string;
}

export default function FinishBadge({ finish, className = "" }: Props) {
  if (!finish) return null;
  const swatchClass = FINISH_SWATCH[finish] ?? "bg-chrome";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-steel ${className}`}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${swatchClass}`}
        aria-hidden="true"
      />
      {finish}
    </span>
  );
}
