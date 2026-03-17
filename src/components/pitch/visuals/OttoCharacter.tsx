"use client";

interface OttoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-16 h-16 md:w-20 md:h-20",
  md: "w-32 h-32 md:w-40 md:h-40",
  lg: "w-64 h-64 md:w-80 md:h-80",
};

export default function OttoCharacter({ size = "lg", className = "" }: OttoProps) {
  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Antenna glow */}
        <circle cx="160" cy="12" r="12" fill="#1e2a4a" opacity="0.2" />
        <circle cx="160" cy="12" r="8" fill="#1e2a4a" opacity="0.15">
          <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.08;0.15" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Head */}
        <circle cx="160" cy="120" r="80" fill="#111" />
        {/* Eyes */}
        <circle cx="132" cy="110" r="10" fill="#fff" />
        <circle cx="188" cy="110" r="10" fill="#fff" />
        <circle cx="135" cy="108" r="4" fill="#111" />
        <circle cx="191" cy="108" r="4" fill="#111" />
        {/* Smile */}
        <path d="M135 140 Q160 165 185 140" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* Antenna */}
        <line x1="160" y1="40" x2="160" y2="16" stroke="#111" strokeWidth="3" strokeLinecap="round" />
        <circle cx="160" cy="12" r="6" fill="#1e2a4a" />
        <circle cx="160" cy="12" r="2.5" fill="#4a5578" />
        {/* Body */}
        <rect x="110" y="210" width="100" height="120" rx="20" fill="#111" />
        {/* Neck */}
        <rect x="145" y="195" width="30" height="25" rx="4" fill="#111" />
        {/* Arms */}
        <rect x="60" y="220" width="50" height="16" rx="8" fill="#111" />
        <rect x="210" y="220" width="50" height="16" rx="8" fill="#111" />
        {/* Hands */}
        <circle cx="270" cy="215" r="12" fill="#111" />
        <circle cx="50" cy="228" r="12" fill="#111" />
        {/* Chest email icon - red accent */}
        <rect x="143" y="245" width="34" height="24" rx="3" fill="#1e2a4a" />
        <path d="M145 247 L160 259 L175 247" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Legs */}
        <rect x="125" y="330" width="22" height="50" rx="10" fill="#111" />
        <rect x="173" y="330" width="22" height="50" rx="10" fill="#111" />
        {/* Feet */}
        <ellipse cx="136" cy="382" rx="18" ry="8" fill="#111" />
        <ellipse cx="184" cy="382" rx="18" ry="8" fill="#111" />
      </svg>
    </div>
  );
}
