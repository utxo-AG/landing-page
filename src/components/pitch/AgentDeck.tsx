"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PitchLayout from "./PitchLayout";
import WelcomeSlide from "./WelcomeSlide";
import AgentTitle from "./agent-slides/AgentTitle";
import AgentModules from "./agent-slides/AgentModules";
import AgentPricing from "./agent-slides/AgentPricing";
import ThankYouSlide from "./ThankYouSlide";

function AgentDeckInner() {
  const searchParams = useSearchParams();
  const company = searchParams.get("company");
  const contact = searchParams.get("contact") ?? undefined;
  const logo = searchParams.get("logo") ?? undefined;

  const hasWelcome = !!company;
  const slideCount = 4 + (hasWelcome ? 1 : 0);

  return (
    <PitchLayout slideCount={slideCount}>
      {hasWelcome && (
        <WelcomeSlide company={company} contact={contact} logo={logo} />
      )}
      <AgentTitle />
      <AgentModules />
      <AgentPricing />
      <ThankYouSlide />
    </PitchLayout>
  );
}

export default function AgentDeck() {
  return (
    <Suspense>
      <AgentDeckInner />
    </Suspense>
  );
}
