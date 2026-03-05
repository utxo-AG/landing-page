import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return { title: t("metadata.title") };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <section>
        <h2 className="text-[17px] font-bold text-[#111] mb-3">{title}</h2>
        {children}
      </section>
      <hr className="my-8 border-[#eee]" />
    </>
  );
}

function ItemList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 mt-2 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  return (
    <main className="px-6 py-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-4">
          {t("heading")}
        </h1>
        <p className="text-[14px] text-[#999] mb-12">{t("lastUpdated")}</p>

        <div className="text-[15px] text-[#555] leading-[1.75]">
          <Section title={t("sections.scope.title")}>
            <p>{t("sections.scope.content1")}</p>
            <p className="mt-3">{t("sections.scope.content2")}</p>
          </Section>

          <Section title={t("sections.natureOfAIAgentServices.title")}>
            <p>{t("sections.natureOfAIAgentServices.content")}</p>
            <ItemList items={t.raw("sections.natureOfAIAgentServices.items") as string[]} />
          </Section>

          <Section title={t("sections.intellectualProperty.title")}>
            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">{t("sections.intellectualProperty.ourIP.title")}</h3>
            <p>{t("sections.intellectualProperty.ourIP.content")}</p>
            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">{t("sections.intellectualProperty.yourData.title")}</h3>
            <p>{t("sections.intellectualProperty.yourData.content")}</p>
            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">{t("sections.intellectualProperty.aiGeneratedOutputs.title")}</h3>
            <p>{t("sections.intellectualProperty.aiGeneratedOutputs.content")}</p>
          </Section>

          <Section title={t("sections.limitationOfLiability.title")}>
            <p className="font-semibold text-[#111]">{t("sections.limitationOfLiability.preamble")}</p>
            <ItemList items={t.raw("sections.limitationOfLiability.items") as string[]} />
          </Section>

          <Section title={t("sections.indemnification.title")}>
            <p>{t("sections.indemnification.content")}</p>
          </Section>

          <Section title={t("sections.noGuarantees.title")}>
            <p>{t("sections.noGuarantees.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.noGuarantees.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t("sections.euAIAct.title")}>
            <p>{t("sections.euAIAct.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.euAIAct.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t("sections.euAIAct.disclaimer")}</p>
          </Section>

          <Section title={t("sections.dataProcessing.title")}>
            <p>
              {(t.raw("sections.dataProcessing.content") as string).split("{privacyLink}")[0]}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-[#111]">
                {t("sections.dataProcessing.privacyLinkText")}
              </Link>
              {(t.raw("sections.dataProcessing.content") as string).split("{privacyLink}")[1]}
            </p>
          </Section>

          <Section title={t("sections.acceptableUse.title")}>
            <p>{t("sections.acceptableUse.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.acceptableUse.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title={t("sections.termination.title")}>
            <p>{t("sections.termination.content")}</p>
          </Section>

          <Section title={t("sections.modifications.title")}>
            <p>{t("sections.modifications.content")}</p>
          </Section>

          <Section title={t("sections.governingLaw.title")}>
            <p>{t("sections.governingLaw.content1")}</p>
            <p className="mt-3">{t("sections.governingLaw.content2")}</p>
          </Section>

          <Section title={t("sections.severability.title")}>
            <p>{t("sections.severability.content")}</p>
          </Section>

          <Section title={t("sections.entireAgreement.title")}>
            <p>{t("sections.entireAgreement.content")}</p>
          </Section>

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.contact.title")}</h2>
            <p>
              {t("sections.contact.content")}<br />
              {t("sections.contact.address")}<br />
              <a href={`mailto:${t("sections.contact.email")}`} className="underline underline-offset-2 hover:text-[#111]">
                {t("sections.contact.email")}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[#eee]">
          <Link href="/" className="text-[13px] text-[#999] hover:text-[#111] transition-colors">
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
