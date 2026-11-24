import { register } from '../../../motion/loop.js';

/*
  Report, one pass = 12.8 s (3.2 s per finding), times on the 0.4 s grid.
   -1.6  entry: the window rises, the risk segments grow, list and detail fade in (CSS)
    0    finding 1 is selected: marker in the list, dot in the risk matrix, description and recommendation
    3.2  finding 2, 6.4 finding 3, 9.6 finding 4, 12.8 = 0
  The script moves .is-on between the findings ([data-f]) and sets --sel, --ix, --iy. Still and reset: finding 1.
*/
const ENTER = 1.6;
const EACH = 3.2;

export function report(mockup) {
  const view = mockup.querySelector('.ptp-rep');
  const parts = [...mockup.querySelectorAll('[data-f]')];
  const rows = parts.filter((part) => part.dataset.x);

  function select(index) {
    parts.forEach((part) => part.classList.toggle('is-on', Number(part.dataset.f) === index));
    view.style.setProperty('--sel', index);
    view.style.setProperty('--ix', rows[index].dataset.x);
    view.style.setProperty('--iy', rows[index].dataset.y);
  }

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: rows.length * EACH,
    steps: rows.map((_, index) => ({ at: index * EACH, name: `f${index}`, run: () => select(index) })),
    reset: () => select(0),
    still: () => select(0),
    slow: mockup,
  });
}
