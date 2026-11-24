import { register } from '../../../motion/loop.js';

/*
  Task lifecycle, one pass = 24 s = two cases of 12 s, all times on the 0.4 s grid.
  A case runs through seven stages; every element with data-from (and data-to) is shown while from <= stage < to,
  and the five nodes of the line are "todo", "now" or "done" (data-node = the stage at which a node starts).
   0    the case takes the place of the previous one, stage 1: handed over
   1.6  stage 2: the question back         2.8  stage 3: the person's answer
   4    stage 4: draft, the document fills  6.8  stage 5: review, the white pill and the person's note
   8.4  stage 6: the note is worked in      9.6  stage 7: final, held until the next case
  The case that leaves keeps its final stage while it fades and is emptied afterwards, so nothing restarts in view.
*/
const ENTER = 2;
const SLOT = 12;
const STAGES = [[0, 1], [1.6, 2], [2.8, 3], [4, 4], [6.8, 5], [8.4, 6], [9.6, 7]];
const FINAL = 7;

export function lifecycle(mockup) {
  const cases = [...mockup.querySelectorAll('[data-case]')].map((root) => ({
    root,
    parts: [...root.querySelectorAll('[data-from]')].map((el) => ({ el, from: Number(el.dataset.from), to: Number(el.dataset.to ?? FINAL + 1) })),
    nodes: [...root.querySelectorAll('[data-node]')].map((el) => ({ el, from: Number(el.dataset.node) })),
  }));
  const tabs = [...mockup.querySelectorAll('[data-tab]')];

  function stage(item, n) {
    item.root.dataset.stage = n;
    item.parts.forEach(({ el, from, to }) => el.classList.toggle('is-on', n >= from && n < to));
    item.nodes.forEach(({ el, from }, i) => {
      const until = item.nodes[i + 1]?.from ?? FINAL;
      el.dataset.state = n < from ? 'todo' : n >= until ? 'done' : 'now';
    });
  }

  function activate(index) {
    cases.forEach((item, i) => item.root.classList.toggle('is-on', i === index));
    tabs.forEach((tab, i) => tab.classList.toggle('is-on', i === index));
  }

  function setup() {
    cases.forEach((item) => stage(item, 0));
    activate(0);
  }

  function still() {
    cases.forEach((item) => stage(item, FINAL));
    activate(0);
  }

  const steps = cases.flatMap((item, slot) => {
    const at = slot * SLOT;
    const previous = cases[(slot + cases.length - 1) % cases.length];
    return [
      ...STAGES.map(([offset, n]) => ({ at: at + offset, name: `stage-${n}`, run: () => { if (n === 1) activate(slot); stage(item, n); } })),
      { at: at + 0.8, run: () => stage(previous, 0) },
    ];
  });

  setup();
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: cases.length * SLOT,
    steps,
    still,
    reset: setup,
    slow: mockup,
  });
}
