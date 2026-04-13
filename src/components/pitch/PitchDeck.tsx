"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import TitleSlide from "./slides/TitleSlide";
import HowToWorkWithOtto from "./slides/HowToWorkWithOtto";
import Conviction from "./slides/Conviction";
import Solution from "./slides/Solution";
import TimeSavings from "./slides/TimeSavings";
import UseCases from "./slides/UseCases";
import EmailArchitecture from "./slides/EmailArchitecture";
import TeamImage from "./slides/TeamImage";
import Deliverables from "./slides/Deliverables";
import LiveDemo from "./slides/LiveDemo";
import Limitations from "./slides/Limitations";
import ComparisonTable from "./slides/ComparisonTable";
import SwissTrust from "./slides/SwissTrust";
import SecurityArchitecture from "./slides/SecurityArchitecture";
import Roadmap from "./slides/Roadmap";
import BusinessModel from "./slides/BusinessModel";
import Pricing from "./slides/Pricing";
import NameYourAgent from "./slides/NameYourAgent";
import CTASlide from "./slides/CTASlide";
import ThankYouSlide from "./ThankYouSlide";

function PitchDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;
  const isPrint = searchParams.get("print") === "true";

  const hasWelcome = !!company;
  const slideCount = (hasWelcome ? 1 : 0) + 18 + (isPrint ? 0 : 2);

  return (
    <PitchLayout slideCount={slideCount} pdfFilename="utxo AG — Pitch Deck.pdf">
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <TitleSlide />
      <HowToWorkWithOtto />
      <Solution />
      <TimeSavings />
      <Conviction />
      <UseCases />
      <EmailArchitecture />
      <TeamImage />
      <Deliverables />
      {!isPrint && <LiveDemo />}
      <Limitations />
      <ComparisonTable />
      <SwissTrust />
      <SecurityArchitecture />
      <Roadmap />
      <BusinessModel />
      <Pricing />
      <NameYourAgent />
      {!isPrint && <CTASlide />}
      <ThankYouSlide />
    </PitchLayout>
  );
}

export default function PitchDeck() {
  return (
    <Suspense>
      <PitchDeckInner />
    </Suspense>
  );
}
