import { register } from '../../motion/loop.js';

/*
  AI Adoption matrix: use cases placed by benefit and effort. One pass = 3.2 s (0.4 s grid):
   0     the next use case in rank order is selected (white pill: consultant and client decide)
   2.4   it is released again
  The ranked chips rotate, so the loop has no restart. Positions are CSS; the script only moves the pill.
*/
const ENTER = 2;
const PERIOD = 3.2;
const HOLD = 2.4;

export function adoption(mockup) {
  const queue = [...mockup.querySelectorAll('[data-rank]')].sort((a, b) => a.dataset.rank - b.dataset.rank);
  const clear = () => queue.forEach((chip) => chip.classList.remove('is-human'));

  clear();
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD,
    steps: [
      { at: 0, name: 'select', run: (cycle) => queue[cycle % queue.length].classList.add('is-human') },
      { at: HOLD, name: 'release', run: clear },
    ],
    still: () => queue[0].classList.add('is-human'),
    reset: clear,
    slow: mockup.querySelector('.ad-stage'),
  });
}
