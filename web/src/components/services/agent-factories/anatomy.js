import { register, reduced } from '../../../motion/loop.js';

/*
  Anatomy of an agent, one pass = 14.4 s on the 0.4 s grid.
  -1.6  entry: the closed cube and its caption rise in
   0    the cube opens into five slabs, the top layer ("Version") is marked
   2.4, 4.8, 7.2, 9.6  the mark moves one layer down
  12    the slabs close to one cube again, the caption of the whole agent returns
  14.4  = 0
  The script only toggles data-open on the visual and .is-on on slab, label and note.
*/
const HOLD = 2.4;
const ENTER = 1.6;

export function anatomy(visual) {
  const slabs = [...visual.querySelectorAll('.afp-an-slab')];
  const texts = ['.afp-an-layers li', '.afp-an-notes p'].map((query) => [...visual.querySelectorAll(query)]);
  const layers = texts[0].length;

  function show(open, marked) {
    visual.toggleAttribute('data-open', open);
    slabs.forEach((slab) => slab.classList.toggle('is-on', Number(slab.dataset.i) === marked));
    texts.forEach((list) => list.forEach((text, index) => text.classList.toggle('is-on', index === marked)));
  }

  const steps = Array.from({ length: layers }, (_, index) => ({ at: index * HOLD, name: 'open', run: () => show(true, index) }));
  steps.push({ at: layers * HOLD, name: 'whole', run: () => show(false, -1) });

  if (!reduced) show(false, -1);
  register(visual.closest('[data-section]'), {
    focus: visual,
    enter: ENTER,
    period: (layers + 1) * HOLD,
    steps,
    reset: () => show(false, -1),
    slow: visual,
  });
}
