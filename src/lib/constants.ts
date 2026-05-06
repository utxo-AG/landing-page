export const NAV_ITEMS = [
  { key: "agents" as const, href: "#agents" },
  { key: "howItWorks" as const, href: "#how-it-works" },
  { key: "customerStories" as const, href: "#customer-stories" },
];

export type AgentCategory = "customer" | "employee" | "management";

export const AGENT_CATEGORIES: AgentCategory[] = ["customer", "employee", "management"];

export const AGENTS: { key: string; category: AgentCategory }[] = [
  { key: "angebotserstellung", category: "customer" },
  { key: "rezeption", category: "customer" },
  { key: "supportTriage", category: "customer" },
  { key: "dokumentation", category: "employee" },
  { key: "onboarding", category: "employee" },
  { key: "internalKnowledge", category: "employee" },
  { key: "systemMonitoring", category: "management" },
  { key: "disposition", category: "management" },
  { key: "rechnung", category: "management" },
];

export const CUSTOMER_STORIES = ["hohenloher", "maschinenbauer", "rstDatentechnik"] as const;

export const FOOTER_LINKS = {
  connect: [
    { label: "X / Twitter", href: "https://x.com/utxoag" },
    { label: "LinkedIn", href: "https://linkedin.com/company/utxo-ag" },
    { label: "Github", href: "https://github.com/nftmakerio" },
  ],
};
