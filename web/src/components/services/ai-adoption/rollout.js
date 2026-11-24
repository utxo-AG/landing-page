import { register } from '../../../motion/loop.js';

/*
  Introduction in a team, one pass = 17.6 s, all times on the 0.4 s grid:
   0      from the second pass on: back to the state before week 1 (bars sink, faces empty, feedback leaves)
   0.8    week 1; then one week every 1.6 s up to week 10 at 15.2, which stands until the pass ends
  Each week: the people trained this week turn green, then dark; the bar of the week grows (green while it is
  the current week); the usage figure counts to the week's value; feedback items enter at the top in their week
  ("decision open"), are "in work" one week later and "done" after three. Three items are in view.
*/
const ENTER = 1.6;
const PERIOD = 17.6;
const FIRST = 0.8;
const EVERY = 1.6;
const SLOTS = 3;

export function rollout(el) {
  const schedule = JSON.parse(el.dataset.schedule);
  const weeks = schedule.length;
  const faces = [...el.querySelectorAll('[data-member]')].sort((a, b) => a.dataset.member - b.dataset.member);
  const bars = [...el.querySelectorAll('[data-bar]')].map((node) => ({ node, value: Number(node.dataset.bar) }));
  const items = [...el.querySelectorAll('[data-item]')].map((node) => ({ node, at: Number(node.dataset.item) }));
  const weekLabel = el.querySelector('[data-week]');
  const trainedLabel = el.querySelector('[data-trained]');
  const usage = el.querySelector('[data-usage]');
  let target = 0;
  let shown = -1;

  /* week is the index of the current week; -1 is the state before the start */
  function show(week) {
    const trained = week < 0 ? 0 : schedule[week];
    const before = week < 1 ? 0 : schedule[week - 1];
    faces.forEach((face, index) => { face.dataset.state = index < before ? 'done' : index < trained ? 'run' : 'idle'; });
    bars.forEach(({ node }, index) => { node.dataset.state = index < week ? 'done' : index === week ? 'run' : 'idle'; });
    for (const item of items) {
      const age = week - item.at;
      const newer = items.filter((other) => other.at > item.at && other.at <= week).length;
      item.node.dataset.slot = age < 0 ? 'new' : Math.min(SLOTS, newer);
      item.node.dataset.state = age < 1 ? 0 : age < 3 ? 1 : 2;
    }
    weekLabel.textContent = Math.max(1, week + 1);
    trainedLabel.textContent = trained;
    target = week < 0 ? 0 : bars[week].value;
  }

  function count(value) {
    const rounded = Math.round(value);
    if (rounded === shown) return;
    shown = rounded;
    usage.textContent = rounded;
  }

  let value = 0;
  function tick() {
    value += (target - value) * 0.09;
    count(Math.abs(target - value) < 0.5 ? target : value);
  }

  function setup() {
    show(-1);
    value = 0;
    count(0);
  }

  function still() {
    show(weeks - 1);
    count(target);
  }

  setup();
  register(el.closest('[data-section]'), {
    focus: el,
    enter: ENTER,
    period: PERIOD,
    steps: [
      { at: 0, name: 'rewind', run: () => show(-1) },
      ...Array.from({ length: weeks }, (_, week) => ({ at: FIRST + week * EVERY, name: week === 0 ? 'run' : undefined, run: () => show(week) })),
    ],
    tick,
    still,
    reset: setup,
    slow: el,
  });
}
