"use client";

import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import MarketReality from "./slides/MarketReality";
import WhyNow from "./slides/WhyNow";
import Problems from "./slides/Problems";
import CompetitivePressure from "./slides/CompetitivePressure";

function PitchArchivDeckInner() {
  return (
    <PitchLayout slideCount={4} pdfFilename="utxo AG — Market.pdf">
      <MarketReality />
      <WhyNow />
      <Problems />
      <CompetitivePressure />
    </PitchLayout>
  );
}

export default function PitchArchivDeck() {
  return (
    <Suspense>
      <PitchArchivDeckInner />
    </Suspense>
  );
}
