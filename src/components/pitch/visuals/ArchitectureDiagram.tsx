"use client";

export default function ArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 800 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Outlook / Email Source */}
        <rect x="20" y="100" width="140" height="140" rx="16" fill="#111827" stroke="#1e2a4a" strokeWidth="1" />
        <rect x="40" y="120" width="100" height="14" rx="2" fill="#1e2a4a" />
        <rect x="40" y="142" width="80" height="8" rx="2" fill="rgba(30,42,74,0.2)" />
        <rect x="40" y="158" width="90" height="8" rx="2" fill="rgba(30,42,74,0.15)" />
        <rect x="40" y="178" width="100" height="14" rx="2" fill="#1e2a4a" />
        <rect x="40" y="200" width="70" height="8" rx="2" fill="rgba(30,42,74,0.2)" />
        <rect x="40" y="216" width="85" height="8" rx="2" fill="rgba(30,42,74,0.15)" />
        <text x="90" y="90" textAnchor="middle" className="text-[11px] font-mono fill-[#4a5578] uppercase tracking-wider">Outlook</text>

        {/* Arrow 1 */}
        <path d="M170 170 L220 170" stroke="#2d3a5c" strokeWidth="2" markerEnd="url(#arrowRed)" />

        {/* Otto Agent */}
        <rect x="230" y="80" width="160" height="180" rx="16" fill="#111" stroke="#1e2a4a" strokeWidth="1.5" />
        <circle cx="310" cy="130" r="24" fill="#111827" />
        <circle cx="302" cy="126" r="4" fill="#fff" />
        <circle cx="318" cy="126" r="4" fill="#fff" />
        <path d="M298 140 Q310 152 322 140" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
        <text x="310" y="180" textAnchor="middle" className="text-[13px] font-bold fill-white">Otto</text>
        <text x="310" y="198" textAnchor="middle" className="text-[10px] fill-[#4a5578]">AI CoWorker</text>
        <rect x="265" y="212" width="90" height="6" rx="3" fill="#1e2a4a" />
        <rect x="265" y="224" width="70" height="6" rx="3" fill="#111827" />
        <rect x="265" y="236" width="80" height="6" rx="3" fill="#111827" />

        {/* Arrow 2 */}
        <path d="M400 140 L450 140" stroke="#2d3a5c" strokeWidth="2" strokeOpacity="0.6" markerEnd="url(#arrowRed)" />
        <path d="M400 200 L450 200" stroke="#2d3a5c" strokeWidth="2" strokeOpacity="0.6" markerEnd="url(#arrowRed)" />

        {/* Data Sources */}
        <rect x="460" y="60" width="130" height="70" rx="12" fill="rgba(30,42,74,0.06)" stroke="#e8e5df" strokeWidth="1.5" />
        <text x="525" y="90" textAnchor="middle" className="text-[11px] font-bold fill-[#1e2a4a]">SAP / ERP</text>
        <text x="525" y="108" textAnchor="middle" className="text-[10px] fill-[#9CA3AF]">Daten & Prozesse</text>

        <rect x="460" y="145" width="130" height="70" rx="12" fill="rgba(30,42,74,0.06)" stroke="#e8e5df" strokeWidth="1.5" />
        <text x="525" y="175" textAnchor="middle" className="text-[11px] font-bold fill-[#1e2a4a]">CRM</text>
        <text x="525" y="193" textAnchor="middle" className="text-[10px] fill-[#9CA3AF]">Kunden & Deals</text>

        <rect x="460" y="230" width="130" height="70" rx="12" fill="rgba(30,42,74,0.06)" stroke="#e8e5df" strokeWidth="1.5" />
        <text x="525" y="260" textAnchor="middle" className="text-[11px] font-bold fill-[#1e2a4a]">Dateien</text>
        <text x="525" y="278" textAnchor="middle" className="text-[10px] fill-[#9CA3AF]">SharePoint / Teams</text>

        {/* Connection lines back */}
        <path d="M460 105 L400 145" stroke="#4a5578" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
        <path d="M460 180 L400 170" stroke="#4a5578" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
        <path d="M460 260 L400 200" stroke="#4a5578" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />

        {/* Arrow back to Outlook */}
        <path d="M230 200 L170 200" stroke="#4a5578" strokeWidth="2" markerEnd="url(#arrowRed)" />

        {/* Output */}
        <rect x="640" y="120" width="140" height="100" rx="16" fill="#fff" stroke="#1e2a4a" strokeWidth="2" />
        <circle cx="670" cy="155" r="10" fill="#10B981" />
        <path d="M666 155 L669 158 L675 152" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="720" y="152" textAnchor="middle" className="text-[10px] font-bold fill-[#111]">Entwurf</text>
        <text x="720" y="167" textAnchor="middle" className="text-[9px] fill-[#9CA3AF]">zur Freigabe</text>
        <text x="710" y="200" textAnchor="middle" className="text-[11px] font-bold fill-[#111]">Sie entscheiden</text>

        {/* Arrow Otto to Output */}
        <path d="M390 170 L630 170" stroke="#1e2a4a" strokeWidth="2" markerEnd="url(#arrowRed)" />

        <defs>
          <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#2d3a5c" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
