import { HOW_IT_WORKS } from "@/lib/constants";

function StepOneGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Email compose window */}
      <div className="w-[240px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#e8e8e8] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#f0f0f0]">
          <div className="w-2 h-2 rounded-full bg-[#e5e5e5]" />
          <div className="w-2 h-2 rounded-full bg-[#e5e5e5]" />
          <div className="w-2 h-2 rounded-full bg-[#e5e5e5]" />
        </div>
        {/* To field */}
        <div className="px-4 py-2 border-b border-[#f5f5f5] flex items-center gap-2">
          <span className="text-[9px] text-[#bbb]">To:</span>
          <span className="text-[10px] text-[#555] font-medium">data-agent@company.com</span>
        </div>
        {/* Subject */}
        <div className="px-4 py-2 border-b border-[#f5f5f5] flex items-center gap-2">
          <span className="text-[9px] text-[#bbb]">Subject:</span>
          <span className="text-[10px] text-[#555]">Q4 revenue by region</span>
        </div>
        {/* Body */}
        <div className="px-4 py-3 space-y-2">
          <div className="h-[6px] bg-[#f0f0f0] rounded-full w-[90%]" />
          <div className="h-[6px] bg-[#f0f0f0] rounded-full w-[70%]" />
          <div className="h-[6px] bg-[#f5f5f5] rounded-full w-[50%]" />
        </div>
        {/* Send button */}
        <div className="px-4 pb-3">
          <div className="bg-[#111] text-white text-[9px] font-medium px-3 py-1.5 rounded-md w-fit flex items-center gap-1.5">
            Send
            <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="7" x2="13" y2="7" />
              <polyline points="8,2 13,7 8,12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTwoGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Processing visualization */}
      <div className="relative">
        {/* Center node */}
        <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8" />
          </svg>
        </div>

        {/* Orbiting connection nodes */}
        <div className="absolute -top-8 -left-10 flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#eee]">
          <div className="w-3 h-3 rounded bg-[#e8e8e8] flex items-center justify-center">
            <span className="text-[5px] font-bold text-[#999]">S</span>
          </div>
          <span className="text-[8px] text-[#999] font-medium">SAP</span>
        </div>

        <div className="absolute -top-8 left-16 flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#eee]">
          <div className="w-3 h-3 rounded bg-[#e8e8e8] flex items-center justify-center">
            <span className="text-[5px] font-bold text-[#999]">C</span>
          </div>
          <span className="text-[8px] text-[#999] font-medium">CRM</span>
        </div>

        <div className="absolute top-14 -left-6 flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#eee]">
          <div className="w-3 h-3 rounded bg-[#e8e8e8] flex items-center justify-center">
            <span className="text-[5px] font-bold text-[#999]">D</span>
          </div>
          <span className="text-[8px] text-[#999] font-medium">Database</span>
        </div>

        <div className="absolute top-14 left-14 flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#eee]">
          <div className="w-3 h-3 rounded bg-[#e8e8e8] flex items-center justify-center">
            <span className="text-[5px] font-bold text-[#999]">A</span>
          </div>
          <span className="text-[8px] text-[#999] font-medium">API</span>
        </div>

        {/* Connecting lines (behind nodes via z-index) */}
        <svg className="absolute -top-8 -left-10 w-[180px] h-[100px] -z-10" viewBox="0 0 180 100" fill="none">
          <line x1="50" y1="20" x2="80" y2="42" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="20" x2="90" y2="42" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="80" x2="75" y2="58" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="130" y1="80" x2="95" y2="58" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
  );
}

function StepThreeGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Reply email with results */}
      <div className="w-[240px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#e8e8e8] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-[#f0f0f0] flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center">
            <span className="text-[6px] text-white font-bold">AI</span>
          </div>
          <div>
            <p className="text-[9px] font-semibold text-[#333]">Data Analysis Agent</p>
            <p className="text-[7px] text-[#bbb]">to: you</p>
          </div>
        </div>
        {/* Body preview */}
        <div className="px-4 py-3 space-y-2">
          <div className="h-[5px] bg-[#f0f0f0] rounded-full w-full" />
          <div className="h-[5px] bg-[#f5f5f5] rounded-full w-[80%]" />
        </div>
        {/* Mini data card */}
        <div className="mx-4 mb-2 bg-[#fafafa] border border-[#f0f0f0] rounded-lg p-2.5 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[7px] text-[#999]">DACH Region</span>
            <span className="text-[8px] font-semibold text-[#333]">CHF 1.1M</span>
          </div>
          <div className="w-full bg-[#eee] rounded-full h-1">
            <div className="bg-[#111] h-1 rounded-full w-[70%]" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[7px] text-[#999]">Western EU</span>
            <span className="text-[8px] font-semibold text-[#333]">CHF 820K</span>
          </div>
          <div className="w-full bg-[#eee] rounded-full h-1">
            <div className="bg-[#111] h-1 rounded-full w-[55%]" />
          </div>
        </div>
        {/* Attachment */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-1.5 bg-[#f5f5f5] rounded-md px-2 py-1 w-fit">
            <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round">
              <path d="M7 1v9M4 7l3 3 3-3" />
              <path d="M2 10v2h10v-2" />
            </svg>
            <span className="text-[7px] text-[#888]">Q4-Report.pdf</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const STEP_GRAPHICS = [StepOneGraphic, StepTwoGraphic, StepThreeGraphic];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-28 border-t border-[#f0f0f0]">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[480px] mb-16">
          <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#999] mb-4">
            How It Works
          </p>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-1.5px] leading-[1.1]">
            Three steps. No onboarding.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, i) => {
            const Graphic = STEP_GRAPHICS[i];
            return (
              <div
                key={item.step}
                className="bg-[#fafafa] border border-[#f0f0f0] rounded-2xl overflow-hidden"
              >
                {/* Graphic area */}
                <div className="h-[240px] relative bg-[#f5f5f5] border-b border-[#eee]">
                  <Graphic />
                </div>
                {/* Text content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[12px] font-mono font-bold text-[#bbb]">
                      {item.step}
                    </span>
                    <h3 className="text-[17px] font-bold tracking-[-0.3px]">{item.title}</h3>
                  </div>
                  <p className="text-[14px] text-[#888] leading-[1.65]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
