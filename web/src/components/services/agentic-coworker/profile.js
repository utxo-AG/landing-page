import { register } from '../../../motion/loop.js';

/*
  Role profile, one pass = 12 s = three access requests of 4 s, all times on the 0.4 s grid.
  The rotating access row starts with request 0 waiting for its approval. Per slot (offset from its start):
   0    the person approves: the row shows "granted"
   1.6  the next request takes the row, state "requested"
   2.8  it waits for the named person (white pill) until the next slot
  The pass ends in the state it started with, so there is no restart.
*/
const ENTER = 2.4;
const SLOT = 4;

export function profile(mockup) {
  const row = mockup.querySelector('.acp-pf-req');
  const variants = [...row.querySelectorAll('.acp-pf-var')];

  function show(index, state) {
    variants.forEach((variant, i) => variant.classList.toggle('is-on', i === index));
    row.dataset.state = state;
  }

  const setup = () => show(0, 'wait');

  const steps = variants.flatMap((_, slot) => {
    const next = (slot + 1) % variants.length;
    const at = slot * SLOT;
    return [
      { at, name: 'granted', run: () => show(slot, 'ok') },
      { at: at + 1.6, name: 'requested', run: () => show(next, 'req') },
      { at: at + 2.8, name: 'waiting', run: () => show(next, 'wait') },
    ];
  });

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: variants.length * SLOT,
    steps,
    still: setup,
    reset: setup,
    slow: mockup.querySelector('.acp-pf-card'),
  });
}
