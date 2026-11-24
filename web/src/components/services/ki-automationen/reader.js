import { register } from '../../../motion/loop.js';

/*
  Reader: two purchase orders in turn, one pass = 14.4 s (7.2 s per order), times on the 0.4 s grid.
   -1.6  entry: the window rises (CSS)
    0    order 1 slides onto the desk; "liest": the reading line runs down (0.4 to 3.6),
         each detail it passes is marked on the paper and lands in the record 0.15 s later (delays in Reader.astro)
    3.6  "prüft": the record is checked against master data, one tick every 0.2 s
    5.2  result: "bereit zur Buchung"
    7.2  order 2, same beats; its price in position 2 deviates: the mark turns into a dark frame,
         the record row is flagged and the status is the white pill "zur Freigabe"
   14.4  = 0
  The script only sets data-phase on the mockup and moves .is-on between the two orders ([data-d]); CSS does every move.
*/
const ENTER = 1.6;
const PER_DOC = 7.2;
const CHECK = 3.6;
const DONE = 5.2;

export function reader(mockup) {
  const parts = [...mockup.querySelectorAll('[data-d]')];
  const still = parts.find((part) => part.classList.contains('is-on')).dataset.d;
  const docs = [...new Set(parts.map((part) => part.dataset.d))];

  function show(doc, phase) {
    parts.forEach((part) => part.classList.toggle('is-on', part.dataset.d === doc));
    mockup.dataset.phase = phase;
  }

  const steps = docs.flatMap((doc, index) => [
    { at: index * PER_DOC, name: 'read', run: () => show(doc, 'read') },
    { at: index * PER_DOC + CHECK, name: 'check', run: () => { mockup.dataset.phase = 'check'; } },
    { at: index * PER_DOC + DONE, name: 'done', run: () => { mockup.dataset.phase = 'done'; } },
  ]);

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: docs.length * PER_DOC,
    steps,
    reset: () => show(null, 'idle'),
    still: () => show(still, 'done'),
    slow: mockup,
  });
  if (!mockup.closest('.is-in')) show(null, 'idle');
}
