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
        <h1 className="text-[36px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-4">
          {heading}
        </h1>
        {lastUpdated && (
          <p className="text-[14px] text-[#999] mb-12">{lastUpdated}</p>
        )}

        <div className="text-[15px] text-[#555] leading-[1.75]">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-[#eee]">
          <Link
            href="/"
            className="text-[13px] text-[#999] hover:text-[#111] transition-colors"
          >
            {backToHomeLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
