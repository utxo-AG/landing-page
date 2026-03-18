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
import Conviction from "./slides/Conviction";
import Solution from "./slides/Solution";
import HowToWorkWithOtto from "./slides/HowToWorkWithOtto";
import EmailArchitecture from "./slides/EmailArchitecture";
import UseCases from "./slides/UseCases";
import Deliverables from "./slides/Deliverables";
import QuickReference from "./slides/QuickReference";
import LiveDemo from "./slides/LiveDemo";
import ComparisonTable from "./slides/ComparisonTable";
import Limitations from "./slides/Limitations";
import SwissTrust from "./slides/SwissTrust";
import PilotPartner from "./slides/PilotPartner";
import BusinessModel from "./slides/BusinessModel";
import ROI from "./slides/ROI";
import Pricing from "./slides/Pricing";
import Roadmap from "./slides/Roadmap";
import CTASlide from "./slides/CTASlide";
import NameYourAgent from "./slides/NameYourAgent";
import TeamImage from "./slides/TeamImage";
import ThankYouSlide from "./ThankYouSlide";

function PitchDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;

  const hasWelcome = !!company;
  const slideCount = 25 + (hasWelcome ? 1 : 0);

  return (
    <PitchLayout slideCount={slideCount}>
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      {/* 1–5: Hook & Pain */}
      <TitleSlide />
      <MarketReality />
      <WhyNow />
      <Problems />
      <CompetitivePressure />
      {/* 6–7: Belief & Vision */}
      <Conviction />
      <Solution />
      {/* 8–10: Product deep-dive */}
      <HowToWorkWithOtto />
      <EmailArchitecture />
      {/* 11: Team */}
      <TeamImage />
      <UseCases />
      {/* 11–12: Tangible proof */}
      <Deliverables />
      <QuickReference />
      <LiveDemo />
      {/* 14–15: Competitive positioning */}
      <Limitations />
      <ComparisonTable />
      {/* 16–18: Trust & Business case */}
      <SwissTrust />
      <ROI />
      {/* 19: The Ask */}
      <PilotPartner />
      <Roadmap />
      {/* Commitment details */}
      <BusinessModel />
      <Pricing />
      <NameYourAgent />
      {/* 23–24: Close */}
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
