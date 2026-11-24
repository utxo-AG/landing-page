import { register } from '../../../motion/loop.js';

/*
  Decision view: two purchase orders in turn, one pass = 16 s, times on the 0.4 s grid.
  The script sets data-case and data-beat on the mockup and moves .is-on between the orders ([data-c]);
  CSS does every move with delays counted from the start of an order.
   -2    entry: panels and lines rise in (CSS)
    0    order "a": the case card sets, the rules are evaluated one every 0.4 s (0.4 to 2.0), all met
    2.4  verdict; the route to the automatic steps lights
    2.8  cleared (beat 3): post, reply, log complete one every 0.4 s
    6    order "b": same evaluation, rule 3 (prices) deviates: white mark instead of the tick
    8.4  verdict; the route turns down to the approval, the white approval card rises (9.0)
   10.4  a pointer travels to "Freigeben" (beat 1); 11.2 pressed (beat 2)
   11.6  approved (beat 3): the card shows who approved, the route returns to the automatic steps, they complete
   16    = 0
*/
const ENTER = 2;
const PERIOD = 16;
const SECOND = 6;

export function caseFlow(mockup) {
  const parts = [...mockup.querySelectorAll('[data-c]')];
  const button = mockup.querySelector('.kap-btn--go');
  const card = mockup.querySelector('.kap-ap');
  const pointer = mockup.querySelector('.kap-ptr');
  const still = mockup.dataset.case;

  /* the pointer's target, from layout offsets (the card may still be mid-transition) */
  function aim() {
    pointer.style.setProperty('--px', `${card.offsetLeft + button.offsetLeft + button.offsetWidth * 0.6}px`);
    pointer.style.setProperty('--py', `${card.offsetTop + button.offsetTop + button.offsetHeight * 0.5}px`);
  }

  function show(key, beat = 0) {
    parts.forEach((part) => part.classList.toggle('is-on', part.dataset.c.split(' ').includes(key)));
    mockup.dataset.case = key;
    mockup.dataset.beat = beat;
    aim();
  }
  const beat = (value) => () => { mockup.dataset.beat = value; };

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD,
    steps: [
      { at: 0, name: 'a', run: () => show('a') },
      { at: 2.8, run: beat(3) },
      { at: SECOND, name: 'b', run: () => show('b') },
      { at: SECOND + 4.4, run: beat(1) },
      { at: SECOND + 5.2, run: beat(2) },
      { at: SECOND + 5.6, run: beat(3) },
    ],
    reset: () => show('idle'),
    still: () => show(still, 3),
    slow: mockup,
  });
  if (!mockup.closest('.is-in')) show('idle');
}
