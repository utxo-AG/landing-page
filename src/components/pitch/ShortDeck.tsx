"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import WhoWeAre from "./slides/WhoWeAre";
import WhyUtxoAG from "./slides/WhyUtxoAG";
import WhatWeDo from "./slides/WhatWeDo";
import Workflow from "./slides/Workflow";
import TimeSavings from "./slides/TimeSavings";
import SecurityArchitecture from "./slides/SecurityArchitecture";
import Deliverables from "./slides/Deliverables";
import LiveDemo from "./slides/LiveDemo";
import CustomerJourney from "./slides/CustomerJourney";
import WorkshopCTA from "./slides/WorkshopCTA";

function ShortDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;
  const isPrint = searchParams.get("print") === "true";

  const hasWelcome = !!company;
  // 8 always-on slides + CustomerJourney + WorkshopCTA = 10 base (interactive);
  // LiveDemo only shows when !isPrint, Welcome only when a company is set.
  const slideCount = 9 + (hasWelcome ? 1 : 0) + (isPrint ? 0 : 1);

  return (
    <PitchLayout slideCount={slideCount} pdfFilename="utxo AG — Short.pdf">
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <WhoWeAre />
      <WhyUtxoAG />
      <WhatWeDo />
      <Workflow />
      <TimeSavings />
      {!isPrint && <LiveDemo />}
      <SecurityArchitecture />
      <Deliverables />
      <CustomerJourney />
      <WorkshopCTA />
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
