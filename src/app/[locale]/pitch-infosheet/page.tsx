import { setRequestLocale } from "next-intl/server";
import InfosheetDeck from "@/components/pitch/InfosheetDeck";

export const metadata = {
  title: "utxo AG — Infosheet",
  description: "Email-First AI Agents — Ihr digitaler CoWorker auf einen Blick.",
};

export default async function PitchInfosheetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InfosheetDeck />;
}
