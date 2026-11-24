import { register } from '../../../motion/loop.js';

/*
  Project run, one pass = 12.8 s, all times on the 0.4 s grid.
    0     the point appears at the start (step 1) and from 0.4 travels to the loop of step 3 (2.4 s; step 2 from 1.6)
    2.8   step 3: three turns of 1.2 s; "0.1", "0.2", "0.3" light up at 4.0, 5.2, 6.4
    6.4   on to the gate of step 4 (0.8 s); 7.2 the pill turns white and waits, 8.4 it is pressed
    8.8   accepted: "1.0" lights up, the point travels to the loop of step 5 (0.8 s)
    9.6   step 5: two turns; "1.1" at 10.8, "1.2" at 12.0, then the point leaves to the right and fades
   12.8   = 0: the version marks go back to grey, the point appears at the start
  On the loops the travelling point is swapped for the point of a rotor at the same place.
  Astro renders the wait at the gate (reduced motion, no JS).
*/
const ENTER = 1.6;
const TURN = 1.2;

export function run(visual) {
  const dot = visual.querySelector('.sdp-r-dot');
  const rotors = [...visual.querySelectorAll('.sdp-r-rot')];
  const gate = visual.querySelector('.sdp-r-gate');
  const marks = [...visual.querySelectorAll('.sdp-r-v')];

  const seg = (n) => { visual.dataset.seg = n; };
  const light = (n) => marks[n].classList.add('is-lit');
  const at = (place) => { dot.dataset.at = place; };
  function spin(rotor, turn) {
    dot.classList.add('is-off');
    rotor.classList.remove('is-off');
    rotor.style.setProperty('--turn', turn);
  }
  function leave(rotor) {
    rotor.classList.add('is-off');
    rotor.style.setProperty('--turn', 0);
    dot.classList.remove('is-off');
  }
  function start() {
    marks.forEach((mark) => mark.classList.remove('is-lit'));
    gate.classList.remove('is-human', 'is-press');
    rotors.forEach(leave);
    at('start');
    seg(1);
  }
  function idle() {
    start();
    seg('');
    dot.classList.add('is-off');
  }

  const steps = [
    { at: 0, name: 'run', run: start },
    { at: 0.4, run: () => at('loop') },
    { at: 1.6, run: () => seg(2) },
    { at: 2.8, run: () => { seg(3); spin(rotors[0], 1); } },
    { at: 2.8 + TURN, run: () => { light(0); spin(rotors[0], 2); } },
    { at: 2.8 + 2 * TURN, run: () => { light(1); spin(rotors[0], 3); } },
    { at: 6.4, run: () => { light(2); leave(rotors[0]); at('gate'); } },
    { at: 7.2, run: () => { seg(4); gate.classList.add('is-human'); } },
    { at: 8.4, run: () => gate.classList.add('is-press') },
    { at: 8.8, run: () => { gate.classList.remove('is-human', 'is-press'); light(3); at('next'); } },
    { at: 9.6, run: () => { seg(5); spin(rotors[1], 1); } },
    { at: 9.6 + TURN, run: () => { light(4); spin(rotors[1], 2); } },
    { at: 12, run: () => { light(5); leave(rotors[1]); at('end'); } },
  ];

  register(visual.closest('[data-section]'), { focus: visual, enter: ENTER, period: 12.8, steps, reset: idle, slow: visual });
  if (!visual.closest('.is-in')) idle();
}
