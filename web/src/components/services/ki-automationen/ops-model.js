/*
  One day of operation for the KI-Automationen "Betrieb" visual: pure functions of the loop clock `t` (seconds), no DOM.
  Used by Ops.astro (frame without JavaScript) and ops.js (every frame), so both agree.
  One second is one hour. `volumes` holds the cases per hour, `events` the exceptions ({ at } in hours after the first hour).
  An exception waits WAIT for its approval, shows "approved" for SHOWN and then leaves the queue.
  After the last hour the day stands for a moment; during the last FOLD seconds the bars fold down for the next day.
*/
export const PERIOD = 14.4;
export const STILL = 7.5;
const WAIT = 1.8;
const SHOWN = 0.6;
const FOLD = 0.4;
const MINUTES = 5;

const clamp = (value) => Math.min(1, Math.max(0, value));

export function dayAt(t, { first, volumes, events }) {
  const hours = volumes.length;
  const now = Math.min(hours, t);
  const fold = clamp((PERIOD - t) / FOLD);
  const share = volumes.map((_, hour) => clamp(now - hour));
  const total = Math.round(volumes.reduce((sum, volume, hour) => sum + volume * share[hour], 0));
  const states = events.map(({ at }) => {
    const age = t - at;
    if (age < 0) return '';
    return age < WAIT ? 'wait' : age < WAIT + SHOWN ? 'done' : 'out';
  });
  let listed = 0;
  const rows = states.map((state) => (state === 'wait' || state === 'done' ? listed++ : -1));
  const minutes = Math.floor((now * 60) / MINUTES) * MINUTES;
  return {
    progress: now / hours,
    bars: share.map((value) => value * fold),
    total,
    auto: total - states.filter(Boolean).length,
    waiting: states.filter((state) => state === 'wait').length,
    states,
    rows: rows.map((row) => (row < 0 ? listed : row)),
    marks: states.map((state) => (fold < 1 ? '' : state === 'out' ? 'done' : state)),
    clock: `${String(first + Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`,
  };
}

export const timeOf = (at, first) => `${String(first + Math.floor(at)).padStart(2, '0')}:${String(Math.round((at % 1) * 60)).padStart(2, '0')}`;
