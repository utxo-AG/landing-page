export const COMPARISON_ROWS = [
  { key: "Entry", highlight: [true, false, false, false] },
  { key: "Lockin", highlight: [true, false, false, false] },
  { key: "Setup", highlight: [true, false, false, false] },
  { key: "Standalone", highlight: [true, false, false, false] },
  { key: "SME", highlight: [true, false, false, false] },
  { key: "Approach", highlight: [true, false, false, false] },
];

export const COMPARISON_HEADERS = ["Utxo", "Copilot", "Salesforce", "Parloa"];

export const PRICING_TIERS = [
  { key: "tier1", price: "99", recommended: false },
  { key: "tier2", price: "249", recommended: true },
  { key: "tier3", price: "499", recommended: false },
];

export const MARKET_STATS = [
  { key: "stat1", value: "6–17%" },
  { key: "stat2", value: "79%" },
  { key: "stat3", value: "53%" },
];

export const EMAIL_FLOW_STEPS = [
  { key: "step1" },
  { key: "step2" },
  { key: "step3" },
  { key: "step4" },
  { key: "step5", highlighted: true },
];

export const ROADMAP_PROJECTS = [
  { key: "project1" },
  { key: "project2", highlighted: true },
  { key: "project3" },
];

export const CTA_STEPS = [
  { num: "01", key: "step1", highlighted: true },
  { num: "02", key: "step2" },
  { num: "03", key: "step3" },
];

export const HOW_TO_STEPS = [
  { num: 1, key: "step1" },
  { num: 2, key: "step2" },
  { num: 3, key: "step3" },
];

export const DELIVERABLE_FORMATS = [
  { key: "email", icon: "email" },
  { key: "excel", icon: "excel" },
  { key: "summary", icon: "summary" },
  { key: "status", icon: "status" },
  { key: "escalation", icon: "escalation" },
];

export const QUICK_REFERENCE_ITEMS = [
  { key: "quote" },
  { key: "complaint" },
  { key: "report" },
  { key: "followup" },
  { key: "translation" },
  { key: "status" },
];

export const LIMITATIONS = [
  { key: "cannot1", type: "cannot" as const },
  { key: "cannot2", type: "cannot" as const },
  { key: "cannot3", type: "cannot" as const },
  { key: "cannot4", type: "cannot" as const },
  { key: "best1", type: "best" as const },
  { key: "best2", type: "best" as const },
  { key: "best3", type: "best" as const },
  { key: "best4", type: "best" as const },
];

export const CHAT_MESSAGES = [
  { sender: "agent" as const, key: "chat1", time: "09:12", actionCount: 3 },
  { sender: "agent" as const, key: "chat2", time: "09:12", actionCount: 2 },
  { sender: "human" as const, key: "chat3", time: "09:14", actionCount: 0 },
  { sender: "agent" as const, key: "chat4", time: "09:14", actionCount: 2 },
  { sender: "human" as const, key: "chat5", time: "09:15", actionCount: 0 },
  { sender: "agent" as const, key: "chat6", time: "09:15", actionCount: 4 },
];
