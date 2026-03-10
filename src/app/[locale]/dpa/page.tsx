import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import {
  Section,
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
  const t = await getTranslations({ locale, namespace: "DPA" });
  return { title: t("metadata.title") };
}

export default async function DPAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DPA");

  return (
    <LegalPageLayout
      heading={t("heading")}
      lastUpdated={t("lastUpdated")}
      backToHomeLabel={t("backToHome")}
    >
      <p>{t("intro")}</p>
      <p className="mt-3">{t("autoAcceptance")}</p>
      <p className="mt-3">{t("definitions")}</p>
      <hr className="my-8 border-[#eee]" />

      <Section title={t("sections.generalProvisions.title")}>
        {(t.raw("sections.generalProvisions.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.scopeAndPurpose.title")}>
        {(t.raw("sections.scopeAndPurpose.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.controllerObligations.title")}>
        {(t.raw("sections.controllerObligations.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.processorObligations.title")}>
        {(t.raw("sections.processorObligations.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.dataBreachNotification.title")}>
        <p>{t("sections.dataBreachNotification.content1")}</p>
        <p className="mt-3">{t("sections.dataBreachNotification.content2")}</p>
        <ItemList
          items={
            t.raw("sections.dataBreachNotification.notificationItems") as string[]
          }
        />
        <p className="mt-3">{t("sections.dataBreachNotification.content3")}</p>
      </Section>

      <Section title={t("sections.dataSubjectsRights.title")}>
        {(t.raw("sections.dataSubjectsRights.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.subProcessors.title")}>
        {(t.raw("sections.subProcessors.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      <Section title={t("sections.internationalTransfers.title")}>
        <p>{t("sections.internationalTransfers.content1")}</p>
        <ItemList
          items={
            t.raw("sections.internationalTransfers.safeguards") as string[]
          }
        />
        <p className="mt-3">
          {t("sections.internationalTransfers.content2")}
        </p>
        <p className="mt-3">
          {t("sections.internationalTransfers.content3")}
        </p>
      </Section>

      <Section title={t("sections.auditRights.title")}>
        {(t.raw("sections.auditRights.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      <Section title={t("sections.dataSecrecy.title")}>
        {(t.raw("sections.dataSecrecy.items") as string[]).map((item, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {item}
          </p>
        ))}
      </Section>

      <Section title={t("sections.technicalMeasures.title")}>
        {(t.raw("sections.technicalMeasures.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.termAndTermination.title")}>
        {(t.raw("sections.termAndTermination.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      <Section title={t("sections.dataDeletionAndReturn.title")}>
        {(t.raw("sections.dataDeletionAndReturn.items") as string[]).map(
          (item, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {item}
            </p>
          )
        )}
      </Section>

      {/* Appendix 1 */}
      <Section title={t("appendix1.title")}>
        <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">
          {t("appendix1.purpose.title")}
        </h3>
        <p>{t("appendix1.purpose.content")}</p>

        <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">
          {t("appendix1.dataSubjects.title")}
        </h3>
        <p>{t("appendix1.dataSubjects.content")}</p>
        <ItemList
          items={t.raw("appendix1.dataSubjects.items") as string[]}
        />

        <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">
          {t("appendix1.dataCategories.title")}
        </h3>
        <p>{t("appendix1.dataCategories.content")}</p>
        <ItemList
          items={t.raw("appendix1.dataCategories.items") as string[]}
        />

        <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">
          {t("appendix1.specialCategories.title")}
        </h3>
        <p>{t("appendix1.specialCategories.content")}</p>

        <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">
          {t("appendix1.duration.title")}
        </h3>
        <p>{t("appendix1.duration.content")}</p>
      </Section>

      {/* Appendix 2 */}
      <Section title={t("appendix2.title")}>
        <p>{t("appendix2.content")}</p>
        <LegalTable
          headers={t.raw("appendix2.tableHeaders") as string[]}
          rows={t.raw("appendix2.tableRows") as string[][]}
        />
        <p className="mt-3">{t("appendix2.note")}</p>
      </Section>

      {/* Appendix 3 */}
      <Section title={t("appendix3.title")}>
        <p>{t("appendix3.intro")}</p>
        {(
          t.raw("appendix3.measures") as { title: string; content: string }[]
        ).map((measure, i) => (
          <div key={i} className="mt-4">
            <h3 className="text-[15px] font-semibold text-[#333] mb-2">
              {measure.title}
            </h3>
            <p>{measure.content}</p>
          </div>
        ))}
        <p className="mt-4">{t("appendix3.closing")}</p>
      </Section>

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
