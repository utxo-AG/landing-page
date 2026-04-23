import { setRequestLocale } from "next-intl/server";
import EmilFreyDeck from "@/components/pitch/EmilFreyDeck";

export const metadata = {
  title: "utxo AG — Emil Frey Marketing",
  description:
    "Präsentation für das Marketing-Team von Emil Frey Schweiz.",
};

export default async function PitchEmilFreyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EmilFreyDeck />;
}
