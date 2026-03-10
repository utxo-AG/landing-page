import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Section, ItemList } from "@/components/legal/LegalSection";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AcceptableUse" });
  return { title: t("metadata.title") };
}

export default async function AcceptableUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AcceptableUse");

  return (
    <LegalPageLayout
      heading={t("heading")}
      lastUpdated={t("lastUpdated")}
      backToHomeLabel={t("backToHome")}
    >
      <p>{t("intro")}</p>
      <hr className="my-8 border-[#eee]" />

      <Section title={t("sections.generalObligations.title")}>
        {(t.raw("sections.generalObligations.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.prohibitedUses.title")}>
        <p>{t("sections.prohibitedUses.content")}</p>
        <ItemList
          items={t.raw("sections.prohibitedUses.items") as string[]}
        />
      </Section>

      <Section title={t("sections.euAIAct.title")}>
        <p>{t("sections.euAIAct.content")}</p>
        <ItemList items={t.raw("sections.euAIAct.items") as string[]} />
      </Section>

      <Section title={t("sections.highRiskProhibition.title")}>
        <p>{t("sections.highRiskProhibition.content")}</p>
      </Section>

      <Section title={t("sections.reverseEngineering.title")}>
        {(t.raw("sections.reverseEngineering.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.enforcement.title")}>
        <p>{t("sections.enforcement.content1")}</p>
        <p className="mt-3">{t("sections.enforcement.content2")}</p>
        <ItemList
          items={t.raw("sections.enforcement.items") as string[]}
        />
        <p className="mt-3">{t("sections.enforcement.content3")}</p>
      </Section>

      <section>
        <h2 className="text-[17px] font-bold text-[#111] mb-3">
          {t("sections.reporting.title")}
        </h2>
        <p>
          {(t.raw("sections.reporting.content") as string)
            .split("support@utxoag.com")
            .map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <a
                    href="mailto:support@utxoag.com"
                    className="underline underline-offset-2 hover:text-[#111]"
                  >
                    support@utxoag.com
                  </a>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
        </p>
      </section>

      <hr className="my-8 border-[#eee]" />

      <section>
        <p className="font-semibold text-[#111]">{t("contact.company")}</p>
        <p className="whitespace-pre-line">{t("contact.address")}</p>
        <p>
          <a
            href={`mailto:${t("contact.email")}`}
            className="underline underline-offset-2 hover:text-[#111]"
          >
            {t("contact.email")}
          </a>
        </p>
      </section>
    </LegalPageLayout>
  );
}
