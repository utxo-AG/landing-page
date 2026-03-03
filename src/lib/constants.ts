export const NAV_ITEMS = [
  { label: "Agents", href: "#agents" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Portfolio", href: "#portfolio" },
];

export const AGENTS = {
  public: [
    {
      name: "Teacher Support Agent",
      description:
        "Lesson planning, curriculum alignment, and teaching support — entirely via email.",
    },
    {
      name: "Ad Visuals Generator",
      description:
        "Turns short briefs into campaign-ready visuals. Send a one-liner, get back designs.",
    },
    {
      name: "Brand & CI Extraction Agent",
      description:
        "Analyzes existing material and extracts brand rules, tone, and visual logic.",
    },
    {
      name: "Data Analysis Agent",
      description:
        "Ask business questions in plain English. Get answers from your data.",
    },
    {
      name: "Meeting Notes Agent",
      description:
        "Forward meeting recordings or transcripts. Get structured summaries, action items, and follow-ups.",
    },
    {
      name: "Invoice Processing Agent",
      description:
        "Send invoices as attachments. Gets them categorized, validated, and ready for approval.",
    },
  ],
  private: [
    {
      name: "CRM Coworker Agent",
      description:
        "Reads inbound emails, updates CRM records, drafts replies, flags deals.",
    },
    {
      name: "Support Triage Agent",
      description:
        "Classifies, prioritizes, and routes support requests automatically.",
    },
    {
      name: "Internal Ops Agent",
      description:
        "Handles repetitive operational workflows across teams and tools.",
    },
    {
      name: "Evaluation & QA Agent",
      description:
        "Scores outputs, checks quality, and logs every decision for audit.",
    },
    {
      name: "Compliance Monitor Agent",
      description:
        "Continuously checks processes against regulatory requirements and flags violations.",
    },
    {
      name: "Onboarding Agent",
      description:
        "Guides new hires through setup, documentation, and team introductions via email.",
    },
  ],
};

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Send an email",
    description:
      "Write to the agent like you'd write to a colleague. Plain language, attachments, whatever you need.",
  },
  {
    step: "02",
    title: "The agent does the work",
    description:
      "It reads your request, connects to your systems — CRM, databases, APIs — and executes the task.",
  },
  {
    step: "03",
    title: "You get the result",
    description:
      "A reply lands in your inbox with the completed work. Review it, reply to refine, or move on.",
  },
];

export const PORTFOLIO = [
  {
    name: "NMKR",
    description:
      "The largest NFT infrastructure on Cardano. 2.4M+ tokens minted, multi-chain support across Cardano, Solana, Aptos, and Midnight. Backed by EMURGO.",
    url: "https://nmkr.io",
    tag: "Tokenization",
  },
  {
    name: "Finest Investments",
    description:
      "BaFin-compliant tokenization launchpad for real-world assets. Fractional ownership of real estate, diamonds, and commodities. Built with FluidTokens and IAMX.",
    url: "https://finest.investments",
    tag: "RWA",
  },
  {
    name: "Masumi Network",
    description:
      "Decentralized protocol for the AI agent economy. Identity, payments, and discovery for autonomous agents. Co-developed with Serviceplan Group.",
    url: "https://masumi.network",
    tag: "AI Agents",
  },
];

export const FOOTER_LINKS = {
  navigate: [
    { label: "Agents", href: "#agents" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Portfolio", href: "#portfolio" },
  ],
  connect: [
    { label: "X / Twitter", href: "https://x.com/utxoag" },
    { label: "LinkedIn", href: "https://linkedin.com/company/utxo-ag" },
    { label: "Github", href: "https://github.com/nftmakerio" },
  ],
  contact: [{ label: "business@utxo.ag", href: "mailto:business@utxo.ag" }],
};
