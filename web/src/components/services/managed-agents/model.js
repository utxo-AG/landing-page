/* Pure helpers shared by the page build (initial markup) and the visuals' scripts. */

/* "HH:MM" for a number of minutes since midnight (wraps around the day) */
export function clock(minutes) {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/* shifts a "HH:MM" string by a number of minutes */
export function shift(time, minutes) {
  const [h, m] = time.split(':').map(Number);
  return clock(h * 60 + m + minutes);
}

/* version number 23 -> "2.3" */
export const version = (n) => `${Math.floor(n / 10)}.${n % 10}`;

/*
  Approval inbox: the log is an endless sequence of events, four per loop pass. Event n belongs to pass
  floor(n / 4); in pass c the item c is approved, item c + 1 is sent back, item c + 2 is submitted and
  item c + 1 comes back revised (item numbers wrap around the list of items).
*/
export const INBOX_EVENTS = ['approve', 'back', 'submit', 'revise'];
const OFFSET = [0, 1, 2, 1];
const START = 9 * 60 + 41;
const EVERY = 3;

export function inboxEvent(n, items) {
  const k = ((n % 4) + 4) % 4;
  const pass = Math.floor(n / 4);
  const item = (((pass + OFFSET[k]) % items) + items) % items;
  return { kind: INBOX_EVENTS[k], item, human: k < 2, time: clock(START + n * EVERY) };
}
