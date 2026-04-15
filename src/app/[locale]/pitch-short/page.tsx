import { setRequestLocale } from "next-intl/server";
import ShortDeck from "@/components/pitch/ShortDeck";

export const metadata = {
  title: "utxo AG — Short Pitch",
  description: "Email-First AI Agents — fokussiertes Deck für entschiedene Käufer.",
};

export default async function PitchShortPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ShortDeck />;
}
