"use client";

interface StepIllustrationProps {
  step: 1 | 2 | 3;
  className?: string;
}

export default function StepIllustration({ step, className = "" }: StepIllustrationProps) {
  return (
    <div className={className}>
      <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect width="280" height="180" rx="12" fill="#faf9f7" />

        {step === 1 && (
          <>
            <rect x="40" y="30" width="200" height="120" rx="8" fill="#fff" stroke="#e8e5df" strokeWidth="1.5" />
            <rect x="40" y="30" width="200" height="24" rx="8" fill="#faf9f7" />
            <circle cx="54" cy="42" r="3.5" fill="#FF5F57" />
            <circle cx="64" cy="42" r="3.5" fill="#FEBC2E" />
            <circle cx="74" cy="42" r="3.5" fill="#28C840" />
            <text x="56" y="70" className="text-[8px] font-mono fill-[#9CA3AF]">An: otto@firma.de</text>
            <line x1="50" y1="78" x2="230" y2="78" stroke="#f0ede8" strokeWidth="1" />
            <rect x="56" y="86" width="140" height="6" rx="2" fill="#e8e5df" />
            <rect x="56" y="98" width="160" height="6" rx="2" fill="#f0ede8" />
            <rect x="56" y="110" width="120" height="6" rx="2" fill="#f0ede8" />
            <rect x="170" y="124" width="56" height="18" rx="4" fill="#1e2a4a" />
            <path d="M193 130 L203 133 L193 136 L195 133 Z" fill="#fff" />
          </>
        )}

        {step === 2 && (
          <>
            <clipPath id="ottoPfpStep2">
              <circle cx="140" cy="75" r="32" />
            </clipPath>
            <circle cx="140" cy="75" r="32" fill="#111" />
            <image href="/images/pitch/otto-pfp.png" x="108" y="43" width="64" height="64" clipPath="url(#ottoPfpStep2)" preserveAspectRatio="xMidYMid slice" />
            {/* Animated orbit ring */}
            <circle cx="140" cy="75" r="46" fill="none" stroke="#2d3a5c" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
            <circle cx="140" cy="75" r="56" fill="none" stroke="#2d3a5c" strokeWidth="1" strokeDasharray="3 6" opacity="0.2" />
            {/* Data connectors with red accent */}
            <rect x="40" y="125" width="60" height="28" rx="6" fill="#fff" stroke="#e8e5df" strokeWidth="1" />
            <rect x="40" y="125" width="3" height="28" rx="1.5" fill="#1e2a4a" />
            <text x="73" y="143" textAnchor="middle" className="text-[8px] font-bold fill-[#6B7280]">SAP</text>
            <rect x="112" y="125" width="60" height="28" rx="6" fill="#fff" stroke="#e8e5df" strokeWidth="1" />
            <rect x="112" y="125" width="3" height="28" rx="1.5" fill="#1e2a4a" />
            <text x="145" y="143" textAnchor="middle" className="text-[8px] font-bold fill-[#6B7280]">CRM</text>
            <rect x="184" y="125" width="60" height="28" rx="6" fill="#fff" stroke="#e8e5df" strokeWidth="1" />
            <rect x="184" y="125" width="3" height="28" rx="1.5" fill="#1e2a4a" />
            <text x="217" y="143" textAnchor="middle" className="text-[8px] font-bold fill-[#6B7280]">E-Mail</text>
            <line x1="70" y1="125" x2="120" y2="107" stroke="#4a5578" strokeWidth="1.5" opacity="0.4" />
            <line x1="142" y1="125" x2="140" y2="107" stroke="#4a5578" strokeWidth="1.5" opacity="0.4" />
            <line x1="214" y1="125" x2="160" y2="107" stroke="#4a5578" strokeWidth="1.5" opacity="0.4" />
          </>
        )}

        {step === 3 && (
          <>
            <rect x="40" y="25" width="200" height="130" rx="8" fill="#fff" stroke="#e8e5df" strokeWidth="1.5" />
            <rect x="40" y="25" width="200" height="24" rx="8" fill="#faf9f7" />
            <circle cx="54" cy="37" r="3.5" fill="#FF5F57" />
            <circle cx="64" cy="37" r="3.5" fill="#FEBC2E" />
            <circle cx="74" cy="37" r="3.5" fill="#28C840" />
            <circle cx="62" cy="65" r="10" fill="#111" />
            <text x="62" y="69" textAnchor="middle" className="text-[7px] font-bold fill-white">O</text>
            <rect x="80" y="58" width="100" height="7" rx="2" fill="#111" />
            <rect x="80" y="70" width="140" height="5" rx="2" fill="#e8e5df" />
            <line x1="50" y1="84" x2="230" y2="84" stroke="#f0ede8" strokeWidth="1" />
            <rect x="56" y="92" width="160" height="5" rx="2" fill="#f0ede8" />
            <rect x="56" y="103" width="140" height="5" rx="2" fill="#f0ede8" />
            <rect x="56" y="114" width="150" height="5" rx="2" fill="#f0ede8" />
            <rect x="56" y="128" width="70" height="18" rx="4" fill="#10B981" />
            <text x="91" y="140" textAnchor="middle" className="text-[8px] font-bold fill-white">Freigeben</text>
            <circle cx="220" cy="90" r="16" fill="#ECFDF5" />
            <path d="M212 90 L218 96 L228 84" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </svg>
    </div>
  );
}
