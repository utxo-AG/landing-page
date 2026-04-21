"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import WhoWeAre from "./slides/WhoWeAre";
import WhyUtxoAG from "./slides/WhyUtxoAG";
import TitleSlide from "./slides/TitleSlide";
import HowToWorkWithOtto from "./slides/HowToWorkWithOtto";
import TimeSavings from "./slides/TimeSavings";
import EmailArchitecture from "./slides/EmailArchitecture";
import SecurityArchitecture from "./slides/SecurityArchitecture";
import Deliverables from "./slides/Deliverables";
import LiveDemo from "./slides/LiveDemo";
import BusinessModel from "./slides/BusinessModel";
import Pricing from "./slides/Pricing";
import CTASlide from "./slides/CTASlide";

function ShortDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;
  const isPrint = searchParams.get("print") === "true";

  const hasWelcome = !!company;
  const slideCount = 11 + (hasWelcome ? 1 : 0) + (isPrint ? 0 : 1);

  return (
    <PitchLayout slideCount={slideCount} pdfFilename="utxo AG — Short.pdf">
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <WhoWeAre />
      <WhyUtxoAG />
      <TitleSlide />
      <HowToWorkWithOtto />
      <EmailArchitecture />
      <TimeSavings />
      {!isPrint && <LiveDemo />}
      <SecurityArchitecture />
      <Deliverables />
      <BusinessModel />
      <Pricing />
      <CTASlide />
    </PitchLayout>
  );
}

export default function ShortDeck() {
  return (
    <Suspense>
      <ShortDeckInner />
    </Suspense>
  );
}
