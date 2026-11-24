import { register } from '../../../motion/loop.js';

/*
  Use-case profile, one pass = 20 s, all times on the 0.4 s grid:
   0 … 12.8   the seven sections of the front sheet fill one after the other (FILL holds the start times);
              the section in work carries the green marker, the counter and the ticks in the head follow
  14.8        all sections stand: status "Abgestimmt"
  18          the sheet is filed away (fades downward)
  18.8        it becomes the empty sheet at the back, the sheet behind comes forward; the next pass fills that one
  Both profiles are in the markup, so nothing is created or removed.
*/
const ENTER = 1.6;
const PERIOD = 20;
const FILL = [0, 2.4, 4.4, 6.4, 8.4, 10.8, 12.8];
const AGREED = 14.8;
const OUT = 18;
const SWAP = 18.8;

export function profile(el) {
  const sheets = [...el.querySelectorAll('[data-sheet]')].map((sheet) => ({
    sheet,
    sections: [...sheet.querySelectorAll('[data-order]')].sort((a, b) => a.dataset.order - b.dataset.order),
    ticks: [...sheet.querySelectorAll('[data-tick]')],
    now: sheet.querySelector('[data-now]'),
  }));
  let front = 0;

  /* `count` sections are filled; while `working`, the last of them is the one in work */
  function fill({ sheet, sections, ticks, now }, count, working) {
    const view = Math.max(0, count - 1);
    sections.forEach((section, index) => {
      section.classList.toggle('is-on', index < count);
      section.classList.toggle('is-now', working && index === view);
      section.classList.toggle('is-view', index === view);
    });
    ticks.forEach((tick, index) => {
      tick.classList.toggle('is-on', index < count);
      tick.classList.toggle('is-now', working && index === view);
    });
    now.textContent = view + 1;
    sheet.classList.toggle('is-agreed', count === sections.length && !working);
  }

  function setup() {
    front = 0;
    sheets.forEach((entry, index) => {
      entry.sheet.classList.toggle('is-back', index !== front);
      entry.sheet.classList.remove('is-leaving');
      fill(entry, 0, false);
    });
  }

  function still() {
    fill(sheets[front], sheets[front].sections.length, false);
  }

  function swap() {
    const old = sheets[front];
    front = (front + 1) % sheets.length;
    old.sheet.classList.remove('is-leaving');
    old.sheet.classList.add('is-back');
    fill(old, 0, false);
    sheets[front].sheet.classList.remove('is-back');
  }

  setup();
  register(el.closest('[data-section]'), {
    focus: el,
    enter: ENTER,
    period: PERIOD,
    steps: [
      ...FILL.map((at, index) => ({ at, name: index === 0 ? 'fill' : undefined, run: () => fill(sheets[front], index + 1, true) })),
      { at: AGREED, name: 'agreed', run: still },
      { at: OUT, name: 'out', run: () => sheets[front].sheet.classList.add('is-leaving') },
      { at: SWAP, name: 'swap', run: swap },
    ],
    still,
    reset: setup,
    slow: el,
  });
}
