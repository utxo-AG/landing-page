import { register } from '../../../motion/loop.js';

/*
  Workshop board, one pass = 16 s, all times on the 0.4 s grid:
   0      "Sammeln": the use cases of the round stand in the order they were collected, scores empty
   1.2    "Bewerten": one row every 0.8 s gets its four scores (green while it is being scored)
   7.2    "Ordnen": the rows move to their rank
   8.8    "Shortlist": the gap under the shortlist opens, the white pill (the client decides) and the results show
  14      the rows fade
  14.8    the other round takes the place (both rounds are in the markup, one is hidden), back to "Sammeln"
  Rows move by transform (--pos); nothing is created or removed.
*/
const ENTER = 1.6;
const PERIOD = 16;
const SCORE = 1.2;
const EVERY = 0.8;
const ORDER = 7.2;
const SHORT = 8.8;
const OUT = 14;
const SWAP = 14.8;

export function board(el) {
  const sets = [...el.querySelectorAll('[data-round]')].map((set) => ({ set, rows: [...set.querySelectorAll('[data-rank]')] }));
  const labels = [...el.querySelectorAll('[data-round-label]')];
  const names = [...el.querySelectorAll('[data-phase-name]')];
  const perRound = sets[0].rows.length;
  let current = 0;

  function phase(name) {
    const order = ['collect', 'score', 'order', 'short'];
    el.dataset.phase = name;
    if (order.includes(name)) names.forEach((item, index) => item.classList.toggle('is-on', index === order.indexOf(name)));
  }

  function show(index) {
    current = index;
    sets.forEach(({ set }, i) => set.classList.toggle('is-away', i !== index));
    labels.forEach((label, i) => label.classList.toggle('is-away', i !== index));
  }

  function arrange(rows, ranked) {
    rows.forEach((row, index) => row.style.setProperty('--pos', ranked ? row.dataset.rank : index));
  }

  function clear() {
    for (const { rows } of sets) {
      rows.forEach((row) => { row.dataset.state = 'idle'; });
      arrange(rows, false);
    }
  }

  function setup() {
    show(0);
    clear();
    phase('collect');
  }

  function still() {
    show(0);
    for (const { rows } of sets) {
      rows.forEach((row) => { row.dataset.state = 'done'; });
      arrange(rows, true);
    }
    phase('short');
  }

  function score(index) {
    const { rows } = sets[current];
    if (index > 0) rows[index - 1].dataset.state = 'done';
    if (index < rows.length) rows[index].dataset.state = 'run';
  }

  const steps = [
    { at: 0, name: 'collect', run: () => phase('collect') },
    ...Array.from({ length: perRound }, (_, index) => ({
      at: SCORE + index * EVERY,
      name: index === 0 ? 'score' : undefined,
      run: () => { if (index === 0) phase('score'); score(index); },
    })),
    { at: ORDER, name: 'order', run: () => { score(perRound); phase('order'); arrange(sets[current].rows, true); } },
    { at: SHORT, name: 'short', run: () => phase('short') },
    { at: OUT, name: 'out', run: () => phase('out') },
    { at: SWAP, name: 'swap', run: () => { show((current + 1) % sets.length); clear(); phase('collect'); } },
  ];

  setup();
  register(el.closest('[data-section]'), { focus: el, enter: ENTER, period: PERIOD, steps, still, reset: setup, slow: el });
}
