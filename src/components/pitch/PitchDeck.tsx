"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import TitleSlide from "./slides/TitleSlide";
import MarketReality from "./slides/MarketReality";
import WhyNow from "./slides/WhyNow";
import Problems from "./slides/Problems";
import CompetitivePressure from "./slides/CompetitivePressure";
import Solution from "./slides/Solution";
import EmailArchitecture from "./slides/EmailArchitecture";
import UseCases from "./slides/UseCases";
import ComparisonTable from "./slides/ComparisonTable";
import SwissTrust from "./slides/SwissTrust";
import PilotPartner from "./slides/PilotPartner";
import Conviction from "./slides/Conviction";
import BusinessModel from "./slides/BusinessModel";
import Pricing from "./slides/Pricing";
import ROI from "./slides/ROI";
import LiveDemo from "./slides/LiveDemo";
import Roadmap from "./slides/Roadmap";
import CTASlide from "./slides/CTASlide";
import ThankYouSlide from "./ThankYouSlide";

function PitchDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;

  const hasWelcome = !!company;
  const slideCount = 19 + (hasWelcome ? 1 : 0);

  return (
    <PitchLayout slideCount={slideCount}>
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <TitleSlide />
      <MarketReality />
      <WhyNow />
      <Problems />
      <CompetitivePressure />
      <Conviction />
      <Solution />
      <EmailArchitecture />
      <UseCases />
      <LiveDemo />
      <ComparisonTable />
      <SwissTrust />
      <PilotPartner />
      <BusinessModel />
      <ROI />
      <Pricing />
      <Roadmap />
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
