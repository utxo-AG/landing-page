import { register } from '../../../motion/loop.js';

/*
  Onboarding rail, one pass = 10 s, all times on the 0.4 s grid. The portrait stands at one of five stations (--k);
  stations before it are "done", its own is "now", the rest "todo".
   0.4  shown at station 1      2.4, 4.4, 6.4, 8.4  moves to stations 2 to 5
   9.2  portrait and line fade   9.6  back to station 1 while hidden
*/
const ENTER = 1.2;
const PERIOD = 10;
const STAY = 2;

export function onboard(rail) {
  const stations = [...rail.querySelectorAll('li')];

  function go(k) {
    rail.style.setProperty('--k', k);
    stations.forEach((station, i) => { station.dataset.state = i < k ? 'done' : i === k ? 'now' : 'todo'; });
  }

  function setup() {
    rail.classList.remove('is-wrap');
    go(0);
  }

  const steps = [
    ...stations.map((_, k) => ({ at: 0.4 + k * STAY, name: `station-${k + 1}`, run: () => { rail.classList.remove('is-wrap'); go(k); } })),
    { at: 9.2, run: () => rail.classList.add('is-wrap') },
    { at: 9.6, run: () => go(0) },
  ];

  setup();
  register(rail.closest('[data-section]'), {
    focus: rail,
    enter: ENTER,
    period: PERIOD,
    steps,
    still: () => go(stations.length - 1),
    reset: setup,
  });
}
