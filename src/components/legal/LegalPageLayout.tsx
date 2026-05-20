import { Link } from "@/i18n/navigation";

export default function LegalPageLayout({
  heading,
  lastUpdated,
  backToHomeLabel,
  children,
}: {
  heading: string;
  lastUpdated?: string;
  backToHomeLabel: string;
  children: React.ReactNode;
}) {
  return (
    <main className="px-6 py-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="font-display text-[36px] md:text-[48px] font-semibold tracking-[-0.028em] leading-[1] mb-4">
          {heading}
        </h1>
        {lastUpdated && (
          <p className="text-[13px] font-mono text-[#696969] mb-12">{lastUpdated}</p>
        )}

        <div className="text-[15px] text-[#3f3f3f] leading-[1.75]">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-[#e5e4e2]">
          <Link
            href="/"
            className="text-[13px] text-[#696969] hover:text-[#111] transition-colors"
          >
            {backToHomeLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
