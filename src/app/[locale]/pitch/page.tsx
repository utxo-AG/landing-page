import { setRequestLocale } from "next-intl/server";
import PitchDeck from "@/components/pitch/PitchDeck";

export const metadata = {
  title: "utxo AG — Sales Deck",
  description: "KI-CoWorker für den Mittelstand. Einfach per E-Mail.",
};

export default async function PitchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PitchDeck />;
}
