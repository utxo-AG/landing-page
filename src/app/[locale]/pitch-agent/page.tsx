import { setRequestLocale } from "next-intl/server";
import AgentDeck from "@/components/pitch/AgentDeck";

export const metadata = {
  title: "utxo AG — Basis-Agent",
  description: "Sofort einsatzbereit. Drei Fähigkeiten, ein Agent.",
};

export default async function PitchAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AgentDeck />;
}
