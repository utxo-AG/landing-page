import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  return (
    <main className="px-6 py-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-4">
          {t("heading")}
        </h1>
        <p className="text-[14px] text-[#999] mb-12">{t("lastUpdated")}</p>

        <div className="text-[15px] text-[#555] leading-[1.75]">
          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.controller.title")}</h2>
            <p>{t("sections.controller.content")}</p>
            <p className="mt-2 whitespace-pre-line">
              <strong>{t("sections.controller.address").split("\n")[0]}</strong>
              {"\n"}
              {t("sections.controller.address").split("\n").slice(1).join("\n")}
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.scope.title")}</h2>
            <p>{t("sections.scope.content1")}</p>
            <p className="mt-3">{t("sections.scope.content2")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.dataWeCollect.title")}</h2>

            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">{t("sections.dataWeCollect.websiteData.title")}</h3>
            <p>{t("sections.dataWeCollect.websiteData.content")}</p>

            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">{t("sections.dataWeCollect.aiAgentInteractionData.title")}</h3>
            <p>{t("sections.dataWeCollect.aiAgentInteractionData.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.dataWeCollect.aiAgentInteractionData.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="text-[15px] font-semibold text-[#333] mt-4 mb-2">{t("sections.dataWeCollect.businessContactData.title")}</h3>
            <p>{t("sections.dataWeCollect.businessContactData.content")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.legalBasis.title")}</h2>
            <p>{t("sections.legalBasis.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.legalBasis.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.aiSpecificProcessing.title")}</h2>
            <p>{t("sections.aiSpecificProcessing.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.aiSpecificProcessing.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.dataSharingAndTransfers.title")}</h2>
            <p>{t("sections.dataSharingAndTransfers.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.dataSharingAndTransfers.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t("sections.dataSharingAndTransfers.transferSafeguards")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.dataRetention.title")}</h2>
            <p>{t("sections.dataRetention.content")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.yourRights.title")}</h2>
            <p>{t("sections.yourRights.content")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {(t.raw("sections.yourRights.items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">{t("sections.yourRights.contactInfo")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.cookiesAndTracking.title")}</h2>
            <p>{t("sections.cookiesAndTracking.content")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.security.title")}</h2>
            <p>{t("sections.security.content")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.changesToPolicy.title")}</h2>
            <p>{t("sections.changesToPolicy.content")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[17px] font-bold text-[#111] mb-3">{t("sections.contact.title")}</h2>
            <p className="whitespace-pre-line">{t("sections.contact.content")}</p>
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
