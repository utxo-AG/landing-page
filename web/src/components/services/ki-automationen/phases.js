import { register } from '../../../motion/loop.js';

/*
  Phase diagram, one pass = 9.6 s (3.2 s per row), times on the 0.4 s grid.
   -1.2  entry: the rows rise in (sp-rise), all lit
    0    row 1 is lit, the others dim; a pulse runs along its twelve dots (0.09 s apart)
    3.2  row 2, 6.4 row 3, 9.6 = 0
  The script only moves .is-on and .is-run between the rows. Still and reset: all rows lit, no pulse.
*/
const ENTER = 1.2;
const PER_ROW = 3.2;

export function phases(mockup) {
  const rows = [...mockup.querySelectorAll('li')];

  const light = (active) => rows.forEach((row, index) => {
    row.classList.toggle('is-on', active < 0 || index === active);
    row.classList.toggle('is-run', index === active);
  });

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: rows.length * PER_ROW,
    steps: rows.map((_, index) => ({ at: index * PER_ROW, name: `row-${index}`, run: () => light(index) })),
    reset: () => light(-1),
    still: () => light(-1),
  });
}
