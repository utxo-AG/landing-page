import { register } from '../../../motion/loop.js';

/*
  One increment per pass (10.4 s, all times on the 0.4 s grid); requirement = pass % 3.
    -1.2  the requirement (number, origin, title) sets itself, the production version shows the last release
     0    01 Konzept: the acceptance criteria are written one after another
     1.6  02 Entwicklung: the change is written line by line
     4    03 Tests: three suites run (counters 0.8 s each, 0.4 s apart);
          at 4.8, 5.2 and 5.6 one acceptance criterion each is ticked
     6    04 Abnahme: code review done, at 6.4 the white pill waits for the client's acceptance,
          7.2 it is pressed
     7.6  05 Produktion: accepted; the new row appears in the application, the version counts up
    10.4  = 0 of the next requirement: titles and artefacts change in one cut
  The column whose stage runs is "active" (its segment fills over the length of the stage), earlier ones "done".
  Column 5 (the application) is always shown; it gets its new row when its stage starts.
*/
const ENTER = 1.6;
const SUITE_GAP = 0.4;
const SUITE_FOR = 0.8;

export function increment(visual) {
  const { seconds, tests, major, minor } = JSON.parse(visual.dataset.plan);
  const cols = [...visual.querySelectorAll('.sdp-i-col')];
  const counters = [...visual.querySelectorAll('[data-count]')];
  const version = visual.querySelector('[data-version]');
  const starts = seconds.map((_, s) => seconds.slice(0, s).reduce((sum, n) => sum + n, 0));
  const period = seconds.reduce((sum, n) => sum + n, 0);
  const shown = counters.map(() => -1);
  let item = 0;

  const set = (name, value) => { visual.dataset[name] = value; };
  const release = (n) => { version.textContent = `${major}.${minor + n}.0`; };
  function stage(n) {
    set('stage', n);
    cols.forEach((col, s) => { col.dataset.state = s + 1 < n ? 'done' : s + 1 === n ? 'active' : 'pending'; });
  }
  function count(t) {
    counters.forEach((counter, j) => {
      const value = Math.round(tests[item][j] * Math.min(1, Math.max(0, (t - starts[2] - j * SUITE_GAP) / SUITE_FOR)));
      if (value !== shown[j]) counter.textContent = shown[j] = value;
    });
  }
  function open(cycle) {
    item = cycle % tests.length;
    set('inc', item);
    set('checked', 0);
    set('accept', '');
    release(cycle);
    stage(0);
  }

  const steps = [
    { at: -1.2, run: open },
    ...starts.slice(0, 4).map((at, s) => ({ at, name: `stage-${s + 1}`, run: () => stage(s + 1) })),
    ...[1, 2, 3].map((n) => ({ at: starts[2] + 0.4 + n * 0.4, run: () => set('checked', n) })),
    { at: starts[3] + 0.4, run: () => set('accept', 'wait') },
    { at: starts[3] + 1.2, run: () => set('accept', 'press') },
    { at: starts[4], name: 'stage-5', run: (cycle) => { set('accept', 'done'); stage(5); release(cycle + 1); } },
  ];

  register(visual.closest('[data-section]'), {
    focus: visual,
    enter: ENTER,
    period,
    steps,
    tick: count,
    reset: () => { open(0); count(0); set('inc', ''); },
    slow: visual,
  });
  if (!visual.closest('.is-in')) { open(0); count(0); set('inc', ''); }
}
