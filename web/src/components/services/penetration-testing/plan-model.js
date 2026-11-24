/*
  Test plan, pure functions shared by the component (still frame at build time) and the loop.
  A row is a test window { from, to, approval } in days of the week (0 = Monday 00:00, 7 = Sunday 24:00).
*/
export const DAYS = 7;
export const STILL_DAY = 4.4;
const ASK_FROM = 1.2;
const ASK_UNTIL = 0.4;

export const progress = (row, day) => Math.min(1, Math.max(0, (day - row.from) / (row.to - row.from)));

export function state(row, day) {
  if (day >= row.to) return 'done';
  if (day >= row.from) return 'running';
  if (row.approval && day >= row.from - ASK_FROM && day < row.from - ASK_UNTIL) return 'wait';
  return 'planned';
}
