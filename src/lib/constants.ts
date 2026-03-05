export const NAV_ITEMS = [
  { key: "agents" as const, href: "#agents" },
  { key: "howItWorks" as const, href: "#how-it-works" },
  { key: "portfolio" as const, href: "#portfolio" },
];

export const AGENT_KEYS = {
  public: [
    "teacherSupport",
    "adVisuals",
    "brandCi",
    "dataAnalysis",
    "meetingNotes",
    "invoiceProcessing",
  ] as const,
  private: [
    "crmCoworker",
    "supportTriage",
    "internalOps",
    "evaluationQa",
    "complianceMonitor",
    "onboarding",
  ] as const,
};

export const HOW_IT_WORKS_STEPS = ["01", "02", "03"] as const;

export const PORTFOLIO = [
  {
    key: "nmkr" as const,
    name: "NMKR",
    url: "https://nmkr.io",
    tag: "Tokenization",
  },
  {
    key: "finest" as const,
    name: "Finest Investments",
    url: "https://finest.investments",
    tag: "RWA",
  },
  {
    key: "masumi" as const,
    name: "Masumi Network",
    url: "https://masumi.network",
    tag: "AI Agents",
  },
];

export const FOOTER_LINKS = {
  connect: [
    { label: "X / Twitter", href: "https://x.com/utxoag" },
    { label: "LinkedIn", href: "https://linkedin.com/company/utxo-ag" },
    { label: "Github", href: "https://github.com/nftmakerio" },
  ],
};
