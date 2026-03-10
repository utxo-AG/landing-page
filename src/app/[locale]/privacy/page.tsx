import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import {
  Section,
  SubSection,
  ItemList,
  LegalTable,
} from "@/components/legal/LegalSection";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: t("metadata.title") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  const dpaLinkContent = (t.raw("sections.purposesOfProcessing.serviceProvision.content") as string).split("{dpaLink}");

  return (
    <LegalPageLayout
      heading={t("heading")}
      lastUpdated={t("lastUpdated")}
      backToHomeLabel={t("backToHome")}
    >
      <p>{t("intro")}</p>
      <p className="mt-3">{t("introCompliance")}</p>
      <hr className="my-8 border-[#eee]" />

      {/* 1. Controller and Contact */}
      <Section title={t("sections.controllerAndContact.title")}>
        <p>{t("sections.controllerAndContact.content")}</p>
        <p className="mt-3 font-semibold text-[#111]">
          {t("sections.controllerAndContact.company")}
        </p>
        <p className="whitespace-pre-line">
          {t("sections.controllerAndContact.address")}
        </p>
        <p>{t("sections.controllerAndContact.register")}</p>
        <p className="mt-3">
          {t("sections.controllerAndContact.contactLabel")}{" "}
          <a
            href={`mailto:${t("sections.controllerAndContact.contactEmail")}`}
            className="underline underline-offset-2 hover:text-[#111]"
          >
            {t("sections.controllerAndContact.contactEmail")}
          </a>
        </p>
        <p className="mt-3">
          {t("sections.controllerAndContact.contactNote")}
        </p>
      </Section>

      {/* 2. Purposes of Processing */}
      <Section title={t("sections.purposesOfProcessing.title")}>
        <p>{t("sections.purposesOfProcessing.content")}</p>
        <LegalTable
          headers={
            t.raw("sections.purposesOfProcessing.tableHeaders") as string[]
          }
          rows={
            t.raw("sections.purposesOfProcessing.tableRows") as string[][]
          }
        />

        <SubSection
          title={t("sections.purposesOfProcessing.serviceProvision.title")}
        >
          <p>
            {dpaLinkContent[0]}
            <Link
              href="/dpa"
              className="underline underline-offset-2 hover:text-[#111]"
            >
              {t(
                "sections.purposesOfProcessing.serviceProvision.dpaLinkText"
              )}
            </Link>
            {dpaLinkContent[1]}
          </p>
        </SubSection>

        <SubSection
          title={t("sections.purposesOfProcessing.accountManagement.title")}
        >
          <p>
            {t("sections.purposesOfProcessing.accountManagement.content")}
          </p>
        </SubSection>

        <SubSection
          title={t("sections.purposesOfProcessing.billing.title")}
        >
          <p>{t("sections.purposesOfProcessing.billing.content")}</p>
        </SubSection>

        <SubSection
          title={t("sections.purposesOfProcessing.support.title")}
        >
          <p>{t("sections.purposesOfProcessing.support.content")}</p>
        </SubSection>

        <SubSection
          title={t("sections.purposesOfProcessing.marketing.title")}
        >
          <p>{t("sections.purposesOfProcessing.marketing.content")}</p>
        </SubSection>

        <SubSection
          title={t("sections.purposesOfProcessing.analytics.title")}
        >
          <p>{t("sections.purposesOfProcessing.analytics.content")}</p>
        </SubSection>

        <SubSection
          title={t("sections.purposesOfProcessing.legalCompliance.title")}
        >
          <p>
            {t("sections.purposesOfProcessing.legalCompliance.content")}
          </p>
        </SubSection>
      </Section>

      {/* 3. AI-Specific Processing */}
      <Section title={t("sections.aiSpecificProcessing.title")}>
        <p>{t("sections.aiSpecificProcessing.content1")}</p>
        <ItemList
          items={
            t.raw("sections.aiSpecificProcessing.providers") as string[]
          }
        />
        <p className="mt-3">
          {t("sections.aiSpecificProcessing.content2")}
        </p>
        <p className="mt-3">
          {t("sections.aiSpecificProcessing.content3")}
        </p>
        <p className="mt-3">
          {t("sections.aiSpecificProcessing.content4")}
        </p>
      </Section>

      {/* 4. Cookies */}
      <Section title={t("sections.cookiesAndTracking.title")}>
        <p>{t("sections.cookiesAndTracking.content1")}</p>
        <p className="mt-3">{t("sections.cookiesAndTracking.content2")}</p>
      </Section>

      {/* 5. Sharing with Third Parties */}
      <Section title={t("sections.sharingWithThirdParties.title")}>
        <p>{t("sections.sharingWithThirdParties.content")}</p>

        <SubSection
          title={t("sections.sharingWithThirdParties.subProcessors.title")}
        >
          <p>
            {t("sections.sharingWithThirdParties.subProcessors.content")}
          </p>
          <LegalTable
            headers={
              t.raw(
                "sections.sharingWithThirdParties.subProcessors.tableHeaders"
              ) as string[]
            }
            rows={
              t.raw(
                "sections.sharingWithThirdParties.subProcessors.tableRows"
              ) as string[][]
            }
          />
          <p>
            {t("sections.sharingWithThirdParties.subProcessors.note")}
          </p>
        </SubSection>

        <SubSection
          title={t(
            "sections.sharingWithThirdParties.legalObligations.title"
          )}
        >
          <p>
            {t(
              "sections.sharingWithThirdParties.legalObligations.content"
            )}
          </p>
        </SubSection>
      </Section>

      {/* 6. International Transfers */}
      <Section title={t("sections.internationalTransfers.title")}>
        <p>{t("sections.internationalTransfers.content")}</p>
        <ItemList
          items={
            t.raw("sections.internationalTransfers.items") as string[]
          }
        />
        <p className="mt-3">
          {t("sections.internationalTransfers.note")}
        </p>
      </Section>

      {/* 7. Retention Periods */}
      <Section title={t("sections.retentionPeriods.title")}>
        <p>{t("sections.retentionPeriods.content")}</p>
        <LegalTable
          headers={
            t.raw("sections.retentionPeriods.tableHeaders") as string[]
          }
          rows={
            t.raw("sections.retentionPeriods.tableRows") as string[][]
          }
        />
        <p>{t("sections.retentionPeriods.note")}</p>
      </Section>

      {/* 8. Your Rights */}
      <Section title={t("sections.yourRights.title")}>
        <p>{t("sections.yourRights.content")}</p>
        <ItemList
          items={t.raw("sections.yourRights.items") as string[]}
        />
        <p className="mt-3">{t("sections.yourRights.contactInfo")}</p>
      </Section>

      {/* 9. Supervisory Authorities */}
      <Section title={t("sections.supervisoryAuthorities.title")}>
        <p>{t("sections.supervisoryAuthorities.content")}</p>
        <p className="mt-3 font-semibold text-[#111]">
          {t("sections.supervisoryAuthorities.authority")}
        </p>
        <p className="whitespace-pre-line">
          {t("sections.supervisoryAuthorities.authorityAddress")}
        </p>
        <p>
          <a
            href={t("sections.supervisoryAuthorities.authorityUrl")}
            className="underline underline-offset-2 hover:text-[#111]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sections.supervisoryAuthorities.authorityUrl")}
          </a>
        </p>
        <p className="mt-3">
          {t("sections.supervisoryAuthorities.euNote")}
        </p>
      </Section>

      {/* 10. Automated Decision-Making */}
      <Section title={t("sections.automatedDecisionMaking.title")}>
        <p>{t("sections.automatedDecisionMaking.content")}</p>
      </Section>

      {/* 11. Minors */}
      <Section title={t("sections.minors.title")}>
        <p>{t("sections.minors.content")}</p>
      </Section>

      {/* 12. Changes */}
      <section>
        <h2 className="text-[17px] font-bold text-[#111] mb-3">
          {t("sections.changesToPolicy.title")}
        </h2>
        <p>{t("sections.changesToPolicy.content")}</p>
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
