import { register } from '../../../motion/loop.js';
import { DAYS, STILL_DAY, progress, state } from './plan-model.js';

/*
  Test plan, one pass = 12 s = one week: the time marker moves one day per 1.6 s (0 to 11.2 s).
  Every frame the script sets --day (marker) and --p per window (fill); a status changes when the marker passes
  the start or the end of a window. The production window asks for "Ihre Freigabe" 1.2 days before it starts
  and is approved 0.4 days before.
   -1.6  entry: the window rises, the rows fade in (CSS)
    0    Monday: the first test window starts ... 11.2 Sunday night: every window is completed
   11.2  marker and fills fade out (.is-wrap); 12 = 0, the next week starts
  Reset: Monday. Still: STILL_DAY (Friday morning, the approval is pending).
*/
const ENTER = 1.6;
const PER_DAY = 1.6;
const PERIOD = 12;

export function plan(mockup) {
  const view = mockup.querySelector('.ptp-pl');
  const labels = JSON.parse(mockup.dataset.status);
  const rows = JSON.parse(mockup.dataset.rows).map((row, index) => {
    const el = mockup.querySelectorAll('.ptp-pl-row')[index];
    return { ...row, el, fill: el.querySelector('.ptp-pl-win'), pill: el.querySelector('.st') };
  });

  function set(day) {
    view.style.setProperty('--day', day.toFixed(3));
    for (const row of rows) {
      row.fill.style.setProperty('--p', progress(row, day).toFixed(3));
      const next = state(row, day);
      if (row.el.dataset.state === next) continue;
      row.el.dataset.state = next;
      row.pill.textContent = labels[next];
    }
  }

  function frame(day) {
    view.classList.remove('is-wrap');
    set(day);
  }

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD,
    steps: [
      { at: 0, name: 'week', run: () => frame(0) },
      { at: DAYS * PER_DAY, name: 'wrap', run: () => view.classList.add('is-wrap') },
    ],
    tick: (t) => { if (t >= 0 && !view.classList.contains('is-wrap')) set(Math.min(DAYS, t / PER_DAY)); },
    reset: () => frame(0),
    still: () => frame(STILL_DAY),
    slow: mockup,
  });
  if (!mockup.closest('.is-in')) frame(0);
}
