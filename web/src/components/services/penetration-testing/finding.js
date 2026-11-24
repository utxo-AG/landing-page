import { register } from '../../../motion/loop.js';

/*
  Finding view: two findings in turn, 10 s each, one pass = 20 s, times on the 0.4 s grid.
  The script sets data-case and data-beat and moves .is-on between the findings ([data-c]);
  CSS does every move with delays counted from the start of a finding.
   -1.6  entry: the three columns rise in (CSS)
    0    finding 1: the card sets, the four factors appear one every 0.4 s (0.4 to 1.6), 2.2 the risk
    2.8  notification, 3.6 recommendation, 4.4 remediation: each step gets its result and a phthalo tick
    5.2  the white decision card rises: "Ihre Freigabe"
    7.2  the button is pressed (beat 1); 7.6 decided (beat 2): the card shows the decision, 8.4 the retest result,
         9.0 the state of the finding
    9.6  the finding clears; 10 finding 2 runs the same way with its own decision; 19.6 clears; 20 = 0
*/
const ENTER = 1.6;
const EACH = 10;

export function finding(mockup) {
  const parts = [...mockup.querySelectorAll('[data-c]')];
  const cases = mockup.querySelectorAll('.ptp-fi-card [data-c]').length;
  const frame = { case: mockup.dataset.case, beat: mockup.dataset.beat };

  function show(key, beat = 0) {
    parts.forEach((part) => part.classList.toggle('is-on', part.dataset.c.split(' ').includes(String(key))));
    mockup.dataset.case = key;
    mockup.dataset.beat = beat;
  }
  const beat = (value) => () => { mockup.dataset.beat = value; };

  const steps = [];
  for (let index = 0; index < cases; index++) {
    const from = index * EACH;
    steps.push(
      { at: from, name: `case-${index}`, run: () => show(index) },
      { at: from + 7.2, run: beat(1) },
      { at: from + 7.6, run: beat(2) },
      { at: from + 9.6, run: () => show('idle') },
    );
  }

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: cases * EACH,
    steps,
    reset: () => show('idle'),
    still: () => show(frame.case, frame.beat),
    slow: mockup,
  });
  if (!mockup.closest('.is-in')) show('idle');
}
