import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Imprint" });
  return { title: t("metadata.title") };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Imprint");

  return (
    <main className="px-6 py-32">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-[36px] font-extrabold tracking-[-1.5px] leading-[1.1] mb-12">
          {t("heading")}
        </h1>

        <div className="text-[15px] text-[#555] leading-[1.75]">
          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.company.label")}
            </h2>
            <p className="font-semibold text-[#111]">{t("sections.company.name")}</p>
            <p>{t("sections.company.street")}</p>
            <p>{t("sections.company.zip")}</p>
            <p>{t("sections.company.country")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.commercialRegister.label")}
            </h2>
            <p>{t("sections.commercialRegister.number")}</p>
            <p>{t("sections.uid.label")}: {t("sections.uid.number")}</p>
            <p>{t("sections.betriebsnummer.label")}: {t("sections.betriebsnummer.number")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.representedBy.label")}
            </h2>
            <p>{t("sections.representedBy.person")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.contact.label")}
            </h2>
            <p>
              <a href={`mailto:${t("sections.contact.email")}`} className="underline underline-offset-2 hover:text-[#111] transition-colors">
                {t("sections.contact.email")}
              </a>
            </p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.disclaimer.label")}
            </h2>
            <p>{t("sections.disclaimer.paragraph1")}</p>
            <p className="mt-3">{t("sections.disclaimer.paragraph2")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.liabilityForLinks.label")}
            </h2>
            <p>{t("sections.liabilityForLinks.paragraph")}</p>
          </section>

          <hr className="my-8 border-[#eee]" />

          <section>
            <h2 className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#999] mb-3">
              {t("sections.copyright.label")}
            </h2>
            <p>{t("sections.copyright.paragraph")}</p>
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
