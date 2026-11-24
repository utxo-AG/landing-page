import { register } from '../../motion/loop.js';

/*
  AI Adoption board, one pass = 15.2 s, all times on the 0.4 s grid:
   0      the best use case left in the field is selected (white pill: consultant and client decide);
          elapsed time and phase durations of the previous use case fade, its bar rewinds within 0.8 s
   0.8    the selected chip travels to the axis and the axis takes its estimate (unit, total, phase
          durations); if the "Im Betrieb" row is full, its oldest chip returns to its place in the
          field and the others move up
   2      the chip is in the pilot slot; the bar grows through Analyse, Auswahl and Pilot (10 s)
          while the elapsed time counts in the unit of this use case ("Woche 2 von ca. 6")
  12      the estimate is reached: the "Betrieb" segment fills
  12.8    the chip settles in the "Im Betrieb" row and shows its duration
  Chips with a rank rotate in rank order, so field and row stay populated and the loop has no restart.
  Every position is CSS (container units on the stage); the script only sets data-at and data-slot.
*/
const ENTER = 2;
const PERIOD = 15.2;
const REWIND = 0.8;
const RUN = 2;
const RUN_FOR = 10;
const LIVE = 12;
const LIVE_FOR = 0.8;
const SLOTS = 3;

const clamp = (value) => Math.min(1, Math.max(0, value));

export function adoption(mockup) {
  const now = mockup.querySelector('[data-now]');
  const unit = mockup.querySelector('.ad-count [data-unit]');
  const total = mockup.querySelector('[data-total]');
  const phase = mockup.querySelector('[data-phase]');
  const segments = [...mockup.querySelectorAll('[data-span]')].map((el) => ({ el, fill: el.querySelector('.ad-fill'), label: el.querySelector('b').textContent, note: el.querySelector('small'), span: Number(el.dataset.span), value: -1 }));
  const phases = [...segments];
  const live = segments.pop();
  const length = segments.reduce((sum, segment) => sum + segment.span, 0);
  const queue = [...mockup.querySelectorAll('[data-rank]')].sort((a, b) => a.dataset.rank - b.dataset.rank);
  const started = queue.filter((chip) => chip.dataset.at === 'ops');
  let ops, turn, chosen, count, shown, current;

  function place(chip, at, slot) {
    chip.dataset.at = at;
    if (slot === undefined) delete chip.dataset.slot;
    else chip.dataset.slot = slot;
  }

  function paint(segment, value) {
    const rounded = Math.round(value * 1000) / 1000;
    if (rounded === segment.value) return;
    segment.value = rounded;
    segment.fill.style.setProperty('--p', rounded);
    segment.el.classList.toggle('is-on', rounded > 0);
  }

  function draw(elapsed, operating) {
    let from = 0;
    for (const segment of segments) {
      paint(segment, clamp((elapsed - from) / segment.span));
      from += segment.span;
    }
    paint(live, operating);
    const reached = operating > 0 ? live : segments.findLast((segment) => segment.value > 0) ?? segments[0];
    if (reached !== current) phase.textContent = (current = reached).label;
    const number = Math.max(1, Math.ceil((elapsed / length) * count));
    if (number !== shown) now.textContent = shown = number;
  }

  function load(chip) {
    const notes = JSON.parse(chip.dataset.notes);
    phases.forEach((segment, index) => { segment.note.textContent = notes[index]; });
    unit.textContent = chip.dataset.unit;
    total.textContent = chip.dataset.count;
    count = Number(chip.dataset.count);
    shown = null;
  }

  function setup() {
    queue.forEach((chip) => { place(chip, 'field'); chip.classList.remove('is-human'); });
    ops = [...started];
    ops.forEach((chip, slot) => place(chip, 'ops', slot));
    turn = ops.length;
    chosen = null;
    load(queue[turn]);
    draw(0, 0);
  }

  function still() {
    place(queue[turn], 'pilot');
    draw(length, 1);
  }

  function select() {
    chosen = queue[turn++ % queue.length];
    chosen.classList.add('is-human');
  }

  function travel() {
    load(chosen);
    place(chosen, 'pilot');
    if (ops.length < SLOTS) return;
    place(ops.shift(), 'field');
    ops.forEach((chip, slot) => place(chip, 'ops', slot));
  }

  function tick(t, cycle) {
    if (t < RUN) {
      const back = cycle ? Math.pow(1 - clamp(t / REWIND), 3) : 0;
      draw(length * back, back);
    } else {
      draw(Math.min(length, ((t - RUN) / RUN_FOR) * length), clamp((t - LIVE) / LIVE_FOR));
    }
  }

  setup();
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD,
    steps: [
      { at: 0, name: 'select', run: select },
      { at: 0.8, name: 'travel', run: travel },
      { at: RUN, name: 'run', run: () => chosen.classList.remove('is-human') },
      { at: LIVE, name: 'live' },
      { at: 12.8, name: 'settle', run: () => place(chosen, 'ops', ops.push(chosen) - 1) },
    ],
    tick,
    still,
    reset: setup,
    slow: mockup.querySelector('.ad-stage'),
  });
}
