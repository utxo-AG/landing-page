const partners = [
  { name: "EMURGO", logo: "/logos/emurgo.png", iconOnly: true },
  { name: "IOHK", logo: "/logos/iog.svg", iconOnly: false },
  { name: "Serviceplan", logo: "/logos/serviceplan.svg", iconOnly: true },
  { name: "Book.io", logo: "/logos/bookio.png", iconOnly: false },
  { name: "UNHCR", logo: "/logos/unhcr.svg", iconOnly: false },
  { name: "Wolfram", logo: "/logos/wolfram.svg", iconOnly: true },
  { name: "Tiamonds", logo: "/logos/tiamonds.svg", iconOnly: true },
  { name: "LCX", logo: "/logos/lcx.png", iconOnly: false },
  { name: "Goodwall", logo: "/logos/goodwall.svg", iconOnly: false },
];

const grants = [
  { name: "Cardano", subtitle: "Catalyst Fund", logo: "/logos/cardano.svg" },
  { name: "Aptos", subtitle: "Ecosystem Grant", logo: "/logos/aptos.svg" },
  { name: "Midnight", subtitle: "Development Grant", logo: "/logos/midnight.svg" },
];

export default function TrustBar() {
  return (
    <section className="px-6 py-20 border-t border-[#f0f0f0]">
      <div className="max-w-[1120px] mx-auto">
        {/* Partner logos */}
        <div className="mb-20">
          <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#bbb] mb-8 text-center">
            Trusted by and partnered with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((p) =>
              p.iconOnly ? (
                <div
                  key={p.name}
                  className="flex items-center gap-2.5 opacity-35 hover:opacity-60 transition-opacity duration-200"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-6 w-6 object-contain grayscale"
                  />
                  <span className="text-[15px] font-bold tracking-[-0.3px] text-[#333]">
                    {p.name}
                  </span>
                </div>
              ) : (
                <img
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  className="h-8 max-w-[140px] grayscale opacity-35 hover:opacity-60 transition-opacity duration-200 object-contain"
                />
              )
            )}
          </div>
        </div>

        {/* Development grants */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#bbb] mb-3 text-center">
            Over $3M in development grants received from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {grants.map((g) => (
              <div
                key={g.name}
                className="flex items-center gap-3 bg-[#fafafa] border border-[#f0f0f0] rounded-2xl px-5 py-4"
              >
                <img
                  src={g.logo}
                  alt={g.name}
                  className="h-7 w-7 object-contain grayscale opacity-60"
                />
                <div>
                  <p className="text-[14px] font-bold tracking-[-0.2px]">{g.name}</p>
                  <p className="text-[12px] text-[#999]">{g.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
