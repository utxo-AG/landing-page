import { register } from '../../../motion/loop.js';

/*
  Test rounds, one pass = 14.4 s (2.4 s per round), times on the 0.4 s grid.
   -1.2  entry: the rounds rise in (sp-rise), all lit in their final state
    0    round 1 is lit, the others dim; its findings appear one after the other (0.05 s apart),
         from 1.1 s the fixed ones turn pale, the open ones keep their fill
    2.4  round 2, 4.8 round 3, 7.2 round 4 (after the release), 9.6 round 5, 12 round 6, 14.4 = 0
  The script only moves .is-on and .is-run between the rounds. Still and reset: all rounds lit, no animation.
*/
const ENTER = 1.2;
const EACH = 2.4;

export function rounds(mockup) {
  const items = [...mockup.querySelectorAll('.ptp-rd li')];

  const light = (active) => items.forEach((item, index) => {
    item.classList.toggle('is-on', active < 0 || index === active);
    item.classList.toggle('is-run', index === active);
  });

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: items.length * EACH,
    steps: items.map((_, index) => ({ at: index * EACH, name: `round-${index}`, run: () => light(index) })),
    reset: () => light(-1),
    still: () => light(-1),
  });
}
