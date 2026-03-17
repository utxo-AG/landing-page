"use client";

interface EmailMockupProps {
  variant: "inbox" | "draft" | "report";
  className?: string;
}

export default function EmailMockup({ variant, className = "" }: EmailMockupProps) {
  return (
    <div className={className}>
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect width="480" height="320" rx="12" fill="#fff" stroke="#e8e5df" strokeWidth="1.5" />
        <rect x="0.75" y="0.75" width="478.5" height="36" rx="12" fill="#faf9f7" />
        <circle cx="20" cy="18" r="4.5" fill="#FF5F57" />
        <circle cx="34" cy="18" r="4.5" fill="#FEBC2E" />
        <circle cx="48" cy="18" r="4.5" fill="#28C840" />

        {variant === "inbox" && (
          <>
            <rect x="1" y="37" width="100" height="282" fill="#faf9f7" />
            <rect x="12" y="50" width="76" height="8" rx="2" fill="#e8e5df" />
            <rect x="12" y="68" width="60" height="6" rx="2" fill="#f0ede8" />
            <rect x="12" y="82" width="68" height="6" rx="2" fill="#f0ede8" />
            <rect x="12" y="96" width="55" height="6" rx="2" fill="#f0ede8" />
            <rect x="4" y="66" width="3" height="10" rx="1.5" fill="#1e2a4a" />

            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <rect x="101" y={37 + i * 56} width="379" height="56" fill={i === 0 ? "rgba(30,42,74,0.04)" : "#fff"} />
                <line x1="101" y1={37 + (i + 1) * 56} x2="480" y2={37 + (i + 1) * 56} stroke="#f0ede8" strokeWidth="1" />
                <circle cx="125" cy={65 + i * 56} r="12" fill={i === 0 ? "#111" : "#e8e5df"} stroke={i === 0 ? "#1e2a4a" : "none"} strokeWidth={i === 0 ? "1.5" : "0"} />
                {i === 0 && <text x="125" y="69" textAnchor="middle" className="text-[8px] font-bold fill-white">O</text>}
                <rect x="146" y={54 + i * 56} width={140 - i * 10} height="8" rx="2" fill={i === 0 ? "#111" : "#ddd"} />
                <rect x="146" y={68 + i * 56} width={180 - i * 15} height="6" rx="2" fill={i === 0 ? "#9CA3AF" : "#f0ede8"} />
                <text x="450" y={65 + i * 56} textAnchor="end" className={`text-[9px] font-mono ${i === 0 ? "fill-[#1e2a4a] font-bold" : "fill-[#ddd]"}`}>
                  {i === 0 ? "09:12" : `0${8 - i}:${30 + i * 7}`}
                </text>
                {i === 0 && <circle cx="460" cy={65 + i * 56} r="3" fill="#1e2a4a" />}
              </g>
            ))}
          </>
        )}

        {variant === "draft" && (
          <>
            <rect x="1" y="37" width="478" height="32" fill="#faf9f7" />
            <text x="20" y="58" className="text-[10px] font-mono fill-[#9CA3AF]">An:</text>
            <text x="50" y="58" className="text-[10px] fill-[#333]">bauer@landtechnik.de</text>
            <line x1="1" y1="69" x2="479" y2="69" stroke="#f0ede8" strokeWidth="1" />
            <text x="20" y="86" className="text-[10px] font-mono fill-[#9CA3AF]">Betreff:</text>
            <text x="70" y="86" className="text-[10px] font-bold fill-[#111]">Re: Hydraulikventil — Rückruf Charge 2024-03</text>
            <line x1="1" y1="95" x2="479" y2="95" stroke="#f0ede8" strokeWidth="1" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <rect key={i} x="20" y={110 + i * 18} width={i === 3 ? 0 : (380 - i * 20 + Math.sin(i) * 40)} height="7" rx="2" fill={i < 2 ? "#e8e5df" : "#f0ede8"} />
            ))}
            <line x1="20" y1="265" x2="200" y2="265" stroke="#f0ede8" strokeWidth="1" />
            <rect x="20" y="275" width="100" height="6" rx="2" fill="#e8e5df" />
            <rect x="20" y="287" width="140" height="6" rx="2" fill="#f0ede8" />
            <rect x="380" y="290" width="80" height="24" rx="6" fill="#1e2a4a" />
            <text x="420" y="306" textAnchor="middle" className="text-[10px] font-bold fill-white">Senden</text>
          </>
        )}

        {variant === "report" && (
          <>
            <rect x="1" y="37" width="478" height="24" fill="#faf9f7" />
            {["A", "B", "C", "D", "E"].map((col, i) => (
              <g key={col}>
                <text x={60 + i * 90} y="53" textAnchor="middle" className="text-[9px] font-bold fill-[#9CA3AF]">{col}</text>
                <line x1={15 + (i + 1) * 90} y1="37" x2={15 + (i + 1) * 90} y2="320" stroke="#f0ede8" strokeWidth="1" />
              </g>
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <g key={i}>
                <line x1="1" y1={61 + i * 28} x2="479" y2={61 + i * 28} stroke="#f0ede8" strokeWidth="1" />
                <text x="10" y={78 + i * 28} className="text-[9px] font-mono fill-[#ddd]">{i + 1}</text>
                {[0, 1, 2, 3, 4].map((j) => (
                  <rect key={j} x={30 + j * 90} y={68 + i * 28} width={50 + Math.sin(i + j) * 15} height="7" rx="2" fill={i === 0 ? "#1e2a4a" : j === 0 ? "#e8e5df" : "#f0ede8"} />
                ))}
              </g>
            ))}
            <rect x="105" y="89" width="90" height="28" rx="0" fill="none" stroke="#1e2a4a" strokeWidth="2" />
          </>
        )}
      </svg>
    </div>
  );
}
