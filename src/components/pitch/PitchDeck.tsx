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
import QuickReference from "./slides/QuickReference";
import LiveDemo from "./slides/LiveDemo";
import Limitations from "./slides/Limitations";
import ComparisonTable from "./slides/ComparisonTable";
import SwissTrust from "./slides/SwissTrust";
import PilotPartner from "./slides/PilotPartner";
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

  const hasWelcome = !!company;
  const slideCount = 21 + (hasWelcome ? 1 : 0);

  return (
    <PitchLayout slideCount={slideCount} pdfFilename="utxo AG — Pitch Deck.pdf">
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <TitleSlide />
      <HowToWorkWithOtto />
      <TimeSavings />
      <Solution />
      <Conviction />
      <UseCases />
      <EmailArchitecture />
      <TeamImage />
      <Deliverables />
      <QuickReference />
      <LiveDemo />
      <Limitations />
      <ComparisonTable />
      <SwissTrust />
      <PilotPartner />
      <Roadmap />
      <BusinessModel />
      <Pricing />
      <NameYourAgent />
      <CTASlide />
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
