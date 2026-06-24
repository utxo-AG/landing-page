export const PRICING_TIERS = [
  { key: "tier1", price: "99", recommended: false },
  { key: "tier2", price: "249", recommended: true },
  { key: "tier3", price: "499", recommended: false },
];

export const CTA_STEPS = [
  { num: "01", key: "step1", highlighted: true },
  { num: "02", key: "step2" },
  { num: "03", key: "step3" },
];

export const DELIVERABLE_FORMATS = [
  { key: "email", icon: "email", category: "comm", color: "#c4a882" },
  { key: "excel", icon: "excel", category: "doc", color: "#1e2a4a" },
  { key: "pdf", icon: "pdf", category: "doc", color: "#1e2a4a" },
  { key: "proposal", icon: "proposal", category: "doc", color: "#1e2a4a" },
  { key: "monitoring", icon: "monitoring", category: "monitor", color: "#10b981" },
  { key: "escalation", icon: "escalation", category: "monitor", color: "#10b981" },
  { key: "landing", icon: "landing", category: "web", color: "#7c5cbf" },
  { key: "marketing", icon: "marketing", category: "comm", color: "#c4a882" },
];

export const WORKFLOW_STAGES = [
  { num: 1, key: "stage1", accent: "#4a5578" },
  { num: 2, key: "stage2", accent: "#1e2a4a" },
  { num: 3, key: "stage3", accent: "#c4a882" },
  { num: 4, key: "stage4", accent: "#10b981" },
] as const;

export const JOURNEY_STAGES = [
  { num: 1, key: "stage1", accent: "#4a5578", now: true },
  { num: 2, key: "stage2", accent: "#1e2a4a", now: false },
  { num: 3, key: "stage3", accent: "#1e2a4a", now: false },
  { num: 4, key: "stage4", accent: "#1e2a4a", now: false },
  { num: 5, key: "stage5", accent: "#c4a882", now: false },
  { num: 6, key: "stage6", accent: "#10b981", now: false },
] as const;
