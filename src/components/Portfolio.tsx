import { PORTFOLIO } from "@/lib/constants";

const PROJECT_BRANDING: Record<string, { logo: string; bg: string; textColor: string }> = {
  NMKR: {
    logo: "/logos/nmkr.svg",
    bg: "#0a1f0e",
    textColor: "#11F250",
  },
  "Finest Investments": {
    logo: "/logos/finest.svg",
    bg: "#152023",
    textColor: "#EF4A29",
  },
  "Masumi Network": {
    logo: "/logos/masumi.svg",
    bg: "#1a0f24",
    textColor: "#CA63ED",
  },
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-28 border-t border-[#f0f0f0]">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[480px] mb-16">
          <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-[#999] mb-4">
            Portfolio
          </p>
          <h2 className="text-[36px] md:text-[42px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-5">
            Also built by utxo AG
          </h2>
          <p className="text-[16px] text-[#888] leading-[1.65]">
            Products and protocols we&apos;ve built from scratch — now used by thousands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PORTFOLIO.map((project) => {
            const branding = PROJECT_BRANDING[project.name];
            return (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <div
                  className="aspect-[16/9] flex flex-col items-center justify-center gap-4 relative"
                  style={{ backgroundColor: branding?.bg ?? "#fafafa" }}
                >
                  {branding && (
                    <img
                      src={branding.logo}
                      alt={project.name}
                      className="h-6 w-auto object-contain brightness-0 invert"
                    />
                  )}
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.12em] opacity-50"
                    style={{ color: branding?.textColor ?? "#ccc" }}
                  >
                    {project.tag}
                  </span>
                </div>
                <div className="px-6 py-5 bg-[#fafafa] group-hover:bg-[#f5f5f5] transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[15px] font-bold tracking-[-0.2px]">{project.name}</h3>
                    <svg className="text-[#ddd] group-hover:text-[#999] group-hover:translate-x-0.5 transition-all duration-200" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="1" y1="7" x2="13" y2="7" />
                      <polyline points="8,2 13,7 8,12" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-[#999] leading-[1.6]">
                    {project.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
