/*
  Conveyor model for the KI-Automationen mockup: pure functions of the clock `c` (seconds), no DOM.
  Used by Automation.astro (frame without JavaScript) and automation.js (every frame), so both agree.
  Case k leaves "Eingang" at k * GAP; every sixth case is held and takes the branch.
  Positions are world units of the scene; CSS turns them into pixels, so nothing depends on the screen size.
*/
export const GAP = 1.6;
export const CROSS = 9;
export const HOLD = 2;
export const REJOIN = 2.4;
export const SLOTS = 8;
export const BRANCH = 2;
export const START = -0.5;
const EVERY = 6;
const HELD = 3;
const STILL_AGE = 5.4;
const WORDS = ['read', 'check', 'book', 'sent'];

const mod = (a, n) => ((a % n) + n) % n;
const isHeld = (k) => mod(k, EVERY) === HELD;
export const STILL = HELD * GAP + STILL_AGE;
export const lifeOf = (held) => CROSS + (held ? REJOIN : 0);

/* A polyline with its running length, the path table of the conveyor. */
function route(points) {
  const run = [0];
  for (let i = 1; i < points.length; i++) run.push(run[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  return { points, run, total: run[run.length - 1] };
}

function along({ points, run, total }, fraction) {
  const distance = Math.min(1, Math.max(0, fraction)) * total;
  let i = 1;
  while (i < run.length - 1 && run[i] < distance) i++;
  const f = (distance - run[i - 1]) / (run[i] - run[i - 1]);
  return [points[i - 1][0] + (points[i][0] - points[i - 1][0]) * f, points[i - 1][1] + (points[i][1] - points[i - 1][1]) * f];
}

/* `stations` are distances along the line of length `length`; `siding` is the branch from station BRANCH
   to the next one, with the waiting point in its middle. Times are seconds after leaving "Eingang". */
export function plan({ length, stations, siding }) {
  const pass = stations.map((at) => (at / length) * CROSS);
  const leg = (pass[BRANCH + 1] - pass[BRANCH] + REJOIN - HOLD) / 2;
  const dock = pass[BRANCH] + leg;
  const main = route([[0, 0], [0, length]]);
  const branch = route(siding);
  return { main, branch, pass, leg, dock, release: dock + HOLD, rejoin: pass[BRANCH + 1] + REJOIN, speed: (main.total / CROSS) * leg / (branch.total / 2) };
}

export function tokenAt(c, slot) {
  const k = slot + SLOTS * Math.floor((c / GAP - slot) / SLOTS);
  const held = isHeld(k);
  const age = c - k * GAP;
  return { held, age, alive: age < lifeOf(held) };
}

/* Leaves at line speed (`speed` relative to the mean speed of the leg) and comes to rest at u = 1. */
const brake = (u, speed) => speed * u + (3 - 2 * speed) * u * u + (speed - 2) * u * u * u;

export function placeAt(age, held, flow) {
  if (!held || age < flow.pass[BRANCH]) return along(flow.main, age / CROSS);
  if (age >= flow.rejoin) return along(flow.main, (age - REJOIN) / CROSS);
  if (age < flow.dock) return along(flow.branch, brake((age - flow.pass[BRANCH]) / flow.leg, flow.speed) / 2);
  if (age < flow.release) return along(flow.branch, 0.5);
  return along(flow.branch, 1 - brake((flow.rejoin - age) / flow.leg, flow.speed) / 2);
}

/* What the stations have done to a case so far, as words for [data-s~="..."]. */
export function stateAt(age, held, flow) {
  const delay = held ? REJOIN : 0;
  const marks = [flow.pass[1], held ? flow.release : flow.pass[BRANCH], flow.pass[3] + delay, flow.pass[4] + delay];
  const words = WORDS.filter((_, index) => age >= marks[index]);
  if (held && age >= flow.pass[BRANCH] && age < flow.release) words.push('ask');
  return words.join(' ');
}

/* Seconds since a case passed station `index`. */
export function sincePass(c, index, flow) {
  const newest = Math.floor((c - flow.pass[index]) / GAP);
  let last = -Infinity;
  for (let k = newest; k > newest - 3; k--) {
    const at = k * GAP + flow.pass[index] + (index > BRANCH && isHeld(k) ? REJOIN : 0);
    if (at <= c && at > last) last = at;
  }
  return c - last;
}

/* Whether a held case waits at "Ihre Freigabe". */
export function waitingAt(c, flow) {
  let k = Math.floor((c - flow.dock) / GAP);
  while (!isHeld(k)) k--;
  return c < k * GAP + flow.release;
}

const arrivals = (c) => Array.from({ length: EVERY }, (_, k) => Math.floor((c - k * GAP - lifeOf(isHeld(k))) / (EVERY * GAP))).reduce((sum, n) => sum + n, 0);
export const countAt = (c, base) => base + arrivals(c) - arrivals(START);
