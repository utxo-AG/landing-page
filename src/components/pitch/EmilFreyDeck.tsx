"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import WhoWeAreMarketing from "./slides/WhoWeAreMarketing";
import WhyUtxoAGMarketing from "./slides/WhyUtxoAGMarketing";
import CoworkerIntro from "./slides/CoworkerIntro";
import HowToWorkWithCoworker from "./slides/HowToWorkWithCoworker";
import OttoAsCoworker from "./slides/OttoAsCoworker";
import MarketingUseCases from "./slides/MarketingUseCases";
import SecurityArchitecture from "./slides/SecurityArchitecture";
import LiveDemo from "./slides/LiveDemo";
import DeliverablesMarketing from "./slides/DeliverablesMarketing";
import BusinessModel from "./slides/BusinessModel";
import CTAMarketing from "./slides/CTAMarketing";

function EmilFreyDeckInner() {
  const searchParams = useSearchParams();
  const isPrint = searchParams.get("print") === "true";

  const slideCount = 11 + (isPrint ? 0 : 1);

  return (
    <PitchLayout slideCount={slideCount} pdfFilename="utxo AG — Emil Frey.pdf">
      <WelcomeSlide
        company="Emil Frey Schweiz"
        contact="Emil Frey Team"
        logo="/logos/emil-frey.svg"
      />
      <WhoWeAreMarketing />
      <WhyUtxoAGMarketing />
      <CoworkerIntro />
      <HowToWorkWithCoworker />
      <OttoAsCoworker />
      <MarketingUseCases />
      <SecurityArchitecture />
      <DeliverablesMarketing />
      {!isPrint && <LiveDemo />}
      <BusinessModel />
      <CTAMarketing />
    </PitchLayout>
  );
}

export default function EmilFreyDeck() {
  return (
    <Suspense>
      <EmilFreyDeckInner />
    </Suspense>
  );
}
