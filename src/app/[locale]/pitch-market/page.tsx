import { setRequestLocale } from "next-intl/server";
import PitchArchivDeck from "@/components/pitch/PitchArchivDeck";

export const metadata = {
  title: "utxo AG — Market Context",
  robots: "noindex, nofollow",
};

export default async function PitchMarketPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PitchArchivDeck />;
}
