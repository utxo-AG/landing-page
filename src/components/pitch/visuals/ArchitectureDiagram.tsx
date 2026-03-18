"use client";

export default function ArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 800 370" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Outlook / Email Source */}
        <rect x="20" y="100" width="140" height="140" rx="16" fill="#111827" stroke="#1e2a4a" strokeWidth="1" />
        <rect x="40" y="120" width="100" height="14" rx="2" fill="#1e2a4a" />
        <rect x="40" y="142" width="80" height="8" rx="2" fill="rgba(30,42,74,0.2)" />
        <rect x="40" y="158" width="90" height="8" rx="2" fill="rgba(30,42,74,0.15)" />
        <rect x="40" y="178" width="100" height="14" rx="2" fill="#1e2a4a" />
        <rect x="40" y="200" width="70" height="8" rx="2" fill="rgba(30,42,74,0.2)" />
        <rect x="40" y="216" width="85" height="8" rx="2" fill="rgba(30,42,74,0.15)" />
        <text x="90" y="90" textAnchor="middle" className="text-[14px] font-mono fill-white/50 uppercase tracking-wider">Outlook</text>

        {/* Line: Outlook → Otto */}
        <line x1="160" y1="160" x2="230" y2="160" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* Line: Otto → Outlook (reply, dashed) */}
        <line x1="230" y1="190" x2="160" y2="190" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Otto Agent */}
        <rect x="230" y="80" width="160" height="180" rx="16" fill="#111" stroke="#1e2a4a" strokeWidth="1.5" />
        <clipPath id="ottoPfpClip">
          <circle cx="310" cy="130" r="24" />
        </clipPath>
        <image href="/images/pitch/otto-pfp.png" x="286" y="106" width="48" height="48" clipPath="url(#ottoPfpClip)" preserveAspectRatio="xMidYMid slice" />
        <text x="310" y="180" textAnchor="middle" className="text-[15px] font-bold fill-white">Otto</text>
        <text x="310" y="198" textAnchor="middle" className="text-[12px] fill-[#4a5578]">AI CoWorker</text>
        <rect x="265" y="212" width="90" height="6" rx="3" fill="#1e2a4a" />
        <rect x="265" y="224" width="70" height="6" rx="3" fill="#111827" />
        <rect x="265" y="236" width="80" height="6" rx="3" fill="#111827" />

        {/* Lines: Otto ↔ Data Sources (clean fan-out) */}
        <line x1="390" y1="130" x2="460" y2="95" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="390" y1="170" x2="460" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="390" y1="210" x2="460" y2="265" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* Data Sources / APIs */}
        <rect x="460" y="60" width="140" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="530" y="90" textAnchor="middle" className="text-[14px] font-bold fill-white">SAP / ERP</text>
        <text x="530" y="108" textAnchor="middle" className="text-[10px] fill-white/40 font-mono">API · Daten &amp; Prozesse</text>

        <rect x="460" y="145" width="140" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="530" y="175" textAnchor="middle" className="text-[14px] font-bold fill-white">CRM</text>
        <text x="530" y="193" textAnchor="middle" className="text-[10px] fill-white/40 font-mono">API · Kunden &amp; Deals</text>

        <rect x="460" y="230" width="140" height="70" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="530" y="260" textAnchor="middle" className="text-[14px] font-bold fill-white">Dateien</text>
        <text x="530" y="278" textAnchor="middle" className="text-[10px] fill-white/40 font-mono">SharePoint / Teams</text>

        {/* Output: Draft for approval */}
        <rect x="640" y="120" width="140" height="100" rx="16" fill="#fff" stroke="#1e2a4a" strokeWidth="2" />
        <circle cx="670" cy="155" r="10" fill="#10B981" />
        <path d="M666 155 L669 158 L675 152" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="720" y="152" textAnchor="middle" className="text-[13px] font-bold fill-[#111]">Entwurf</text>
        <text x="720" y="167" textAnchor="middle" className="text-[11px] fill-[#9CA3AF]">zur Freigabe</text>
        <text x="710" y="200" textAnchor="middle" className="text-[13px] font-bold fill-[#111]">Sie entscheiden</text>

        {/* Line: Otto → Output (routed below, lighter) */}
        <path d="M310 260 L310 340 L710 340 L710 220" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
        <text x="510" y="335" textAnchor="middle" className="text-[10px] fill-white/30 font-mono">Entwurf erstellt</text>
      </svg>
    </div>
  );
}
