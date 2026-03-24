"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import TitleSlide from "./slides/TitleSlide";
import HowToWorkWithOtto from "./slides/HowToWorkWithOtto";
import TimeSavings from "./slides/TimeSavings";
import EmailArchitecture from "./slides/EmailArchitecture";
import ComparisonTable from "./slides/ComparisonTable";
import InfosheetCTA from "./slides/InfosheetCTA";

function InfosheetDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;

  const hasWelcome = !!company;
  const slideCount = 6 + (hasWelcome ? 1 : 0);

  return (
    <PitchLayout slideCount={slideCount} pdfFilename="utxo AG — Infosheet.pdf">
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <TitleSlide />
      <HowToWorkWithOtto />
      <TimeSavings />
      <EmailArchitecture />
      <ComparisonTable />
      <InfosheetCTA />
    </PitchLayout>
  );
}

export default function InfosheetDeck() {
  return (
    <Suspense>
      <InfosheetDeckInner />
    </Suspense>
  );
}
