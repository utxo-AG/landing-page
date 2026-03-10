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
  const t = await getTranslations({ locale, namespace: "Terms" });
  return { title: t("metadata.title") };
}

function renderWithLink(
  text: string,
  placeholder: string,
  href: string,
  linkText: string
) {
  const parts = text.split(placeholder);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <Link
        href={href}
        className="underline underline-offset-2 hover:text-[#111]"
      >
        {linkText}
      </Link>
      {parts[1]}
    </>
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
    <LegalPageLayout
      heading={t("heading")}
      lastUpdated={t("lastUpdated")}
      backToHomeLabel={t("backToHome")}
    >
      <p>{t("intro")}</p>
      <p className="mt-3 font-semibold text-[#111]">{t("b2bNotice")}</p>
      <hr className="my-8 border-[#eee]" />

      {/* 1. Scope of Services */}
      <Section title={t("sections.scopeOfServices.title")}>
        <p>{t("sections.scopeOfServices.content1")}</p>
        <p className="mt-3">{t("sections.scopeOfServices.content2")}</p>
        <ItemList
          items={t.raw("sections.scopeOfServices.serviceTypes") as string[]}
        />
        <p className="mt-3">{t("sections.scopeOfServices.content3")}</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          {(
            t.raw("sections.scopeOfServices.incorporatedDocs") as string[]
          ).map((doc, i) => {
            const placeholders = [
              { key: "{aupLink}", href: "/acceptable-use", textKey: "sections.scopeOfServices.aupLinkText" },
              { key: "{privacyLink}", href: "/privacy", textKey: "sections.scopeOfServices.privacyLinkText" },
              { key: "{dpaLink}", href: "/dpa", textKey: "sections.scopeOfServices.dpaLinkText" },
            ];
            const match = placeholders.find((p) => doc.includes(p.key));
            return (
              <li key={i}>
                {match
                  ? renderWithLink(doc, match.key, match.href, t(match.textKey))
                  : doc}
              </li>
            );
          })}
        </ul>
        <p className="mt-3">{t("sections.scopeOfServices.conflictNote")}</p>
      </Section>

      {/* 2. Onboarding */}
      <Section title={t("sections.onboarding.title")}>
        {(t.raw("sections.onboarding.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      {/* 3. Service Description */}
      <Section title={t("sections.serviceDescription.title")}>
        <p>{t("sections.serviceDescription.content1")}</p>
        <p className="mt-3">{t("sections.serviceDescription.content2")}</p>
        <ItemList
          items={
            t.raw("sections.serviceDescription.acknowledgements") as string[]
          }
        />
        <p className="mt-3">{t("sections.serviceDescription.content3")}</p>
        <p className="mt-3">{t("sections.serviceDescription.content4")}</p>
      </Section>

      {/* 4. Billing */}
      <Section title={t("sections.billing.title")}>
        {(t.raw("sections.billing.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      {/* 5. Term and Termination */}
      <Section title={t("sections.termAndTermination.title")}>
        <p>{t("sections.termAndTermination.content1")}</p>
        <p className="mt-3">{t("sections.termAndTermination.content2")}</p>
        <ItemList
          items={
            t.raw("sections.termAndTermination.causeItems") as string[]
          }
        />
        <p className="mt-3">
          {renderWithLink(
            t.raw("sections.termAndTermination.content3") as string,
            "{aupLink}",
            "/acceptable-use",
            t("sections.termAndTermination.aupLinkText")
          )}
        </p>
        <p className="mt-3">{t("sections.termAndTermination.content4")}</p>
        <p className="mt-3">
          {renderWithLink(
            t.raw("sections.termAndTermination.content5") as string,
            "{dpaLink}",
            "/dpa",
            t("sections.termAndTermination.dpaLinkText")
          )}
        </p>
      </Section>

      {/* 6. Changes and Updates */}
      <Section title={t("sections.changesAndUpdates.title")}>
        {(t.raw("sections.changesAndUpdates.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      {/* 7. Intellectual Property */}
      <Section title={t("sections.intellectualProperty.title")}>
        {(t.raw("sections.intellectualProperty.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      {/* 8. Liability */}
      <Section title={t("sections.liability.title")}>
        <p>{t("sections.liability.content1")}</p>
        <p className="mt-3">{t("sections.liability.content2")}</p>
        <p className="mt-3">{t("sections.liability.content3")}</p>
        <ItemList
          items={
            t.raw("sections.liability.liabilityExclusions") as string[]
          }
        />
        <p className="mt-3">{t("sections.liability.content4")}</p>
        <p className="mt-3">{t("sections.liability.content5")}</p>
      </Section>

      {/* 9. Confidentiality */}
      <Section title={t("sections.confidentiality.title")}>
        <p>{t("sections.confidentiality.content1")}</p>
        <p className="mt-3">{t("sections.confidentiality.content2")}</p>
        <ItemList
          items={
            t.raw("sections.confidentiality.exclusions") as string[]
          }
        />
        <p className="mt-3">{t("sections.confidentiality.content3")}</p>
        <p className="mt-3">{t("sections.confidentiality.content4")}</p>
        <p className="mt-3">{t("sections.confidentiality.content5")}</p>
      </Section>

      {/* 10. Data Protection */}
      <Section title={t("sections.dataProtection.title")}>
        <p>
          {renderWithLink(
            t.raw("sections.dataProtection.content1") as string,
            "{dpaLink}",
            "/dpa",
            t("sections.dataProtection.dpaLinkText")
          )}
        </p>
        <p className="mt-3">{t("sections.dataProtection.content2")}</p>
        <p className="mt-3">{t("sections.dataProtection.content3")}</p>
        <p className="mt-3">
          {renderWithLink(
            t.raw("sections.dataProtection.content4") as string,
            "{privacyLink}",
            "/privacy",
            t("sections.dataProtection.privacyLinkText")
          )}
        </p>
      </Section>

      {/* 11. Support */}
      <Section title={t("sections.support.title")}>
        {(t.raw("sections.support.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      {/* 12. Compliance */}
      <Section title={t("sections.compliance.title")}>
        <p>{t("sections.compliance.content")}</p>
      </Section>

      {/* 13. Force Majeure */}
      <Section title={t("sections.forceMajeure.title")}>
        <p>{t("sections.forceMajeure.content")}</p>
      </Section>

      {/* 14. Governing Law */}
      <Section title={t("sections.governingLaw.title")}>
        {(t.raw("sections.governingLaw.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      {/* 15. Miscellaneous */}
      <section>
        <h2 className="text-[17px] font-bold text-[#111] mb-3">
          {t("sections.miscellaneous.title")}
        </h2>
        {(t.raw("sections.miscellaneous.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </section>

      <hr className="my-8 border-[#eee]" />

      <section>
        <p className="font-semibold text-[#111]">{t("contact.company")}</p>
        <p className="whitespace-pre-line">{t("contact.address")}</p>
        <p>{t("contact.register")}</p>
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
