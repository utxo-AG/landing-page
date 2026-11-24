/*
  Roadmap model, shared by Roadmap.astro (the still frame in the markup) and roadmap.js (every frame).
  All values are weeks. A lane is { start, analysis, pilot } from the json:
  analysis runs from start to mid, the pilot from mid to live, operation from live to the end of the chart.
*/
export const STILL = 33.5;
export const GATE_BEFORE = 0.4;
export const GATE_AFTER = 1.8;
export const TRAINED_AFTER = 2;

const clamp = (value) => Math.min(1, Math.max(0, value));
const round = (value) => Math.round(value * 1000) / 1000;

export function plan(lane) {
  const mid = lane.start + lane.analysis;
  const live = mid + lane.pilot;
  return { start: lane.start, mid, live, trained: live + TRAINED_AFTER };
}

/* fill of the three segments (0 to 1), the gate pill and the two facts the counters need */
export function laneAt({ start, mid, live, trained }, now, total) {
  return {
    fills: [round(clamp((now - start) / (mid - start))), round(clamp((now - mid) / (live - mid))), round(clamp((now - live) / (total - live)))],
    gate: now >= live - GATE_BEFORE && now < live + GATE_AFTER,
    live: now >= live,
    trained: now >= trained,
  };
}

export const layerAt = (at, now, total) => round(clamp((now - at) / (total - at)));
export const state = (fill) => (fill >= 1 ? 'done' : fill > 0 ? 'run' : 'plan');
export const monthAt = (now, total, weeksPerMonth) => Math.min(total / weeksPerMonth, Math.floor(now / weeksPerMonth) + 1);
