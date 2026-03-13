"use client";

export default function NavigationDots({
  count,
  active,
  onDotClick,
  dark = false,
}: {
  count: number;
  active: number;
  onDotClick: (index: number) => void;
  dark?: boolean;
}) {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-2.5 transition-colors duration-500">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Slide ${i + 1}`}
          className="flex items-center gap-2"
        >
          {i === active && (
            <span className={`text-[10px] font-mono tabular-nums transition-colors duration-500 ${
              dark ? "text-[#666]" : "text-[#999]"
            }`}>
              {i + 1}
            </span>
          )}
          <span
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? `w-2.5 h-2.5 scale-125 ${dark ? "bg-white" : "bg-[#111]"}`
                : `w-2 h-2 ${dark ? "bg-[#555] hover:bg-[#888]" : "bg-[#ccc] hover:bg-[#999]"}`
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
