import { register } from '../../../motion/loop.js';

/*
  Architecture view, one pass = 12 s: three transactions of 4 s each, all times on the 0.4 s grid.
  Per transaction r (start s):
    s        caption and column line of r switch on, the tile in the top layer shows its event
    s + 0.4  the pulse leaves for the next layer (0.8 s per hop); the tile it reaches shows its event
             at s + 1.2, s + 2.0 and s + 2.8
    s + 3.6  events, pulse and line fade; the tiles show their resting note again
  Nothing is created or removed. Astro renders transaction 0 completed (reduced motion, no JS).
*/
const ENTER = 1.6;
const SLOT = 4;
const HOP = 0.8;

export function arch(visual) {
  const plan = JSON.parse(visual.dataset.plan);
  const still = visual.dataset.route;
  const layers = plan[0].map((_, l) => [...visual.querySelectorAll(`.sdp-a-tile[data-l="${l}"]`)]);
  const pulses = [...visual.querySelectorAll('.sdp-a-pulse')];
  const tile = (r, l) => layers[l][plan[r][l]];

  function clear() {
    visual.querySelectorAll('.sdp-a-tile[data-on]').forEach((el) => { delete el.dataset.on; });
    pulses.forEach((pulse) => { delete pulse.dataset.hop; });
  }
  function idle() {
    clear();
    visual.dataset.route = '';
  }

  const steps = [];
  plan.forEach((_, r) => {
    const s = r * SLOT;
    steps.push({ at: s, name: `route-${r}`, run: () => { clear(); visual.dataset.route = r; tile(r, 0).dataset.on = r; pulses[r].dataset.hop = 0; } });
    for (let l = 1; l < layers.length; l++) {
      steps.push({ at: s + 0.4 + (l - 1) * HOP, run: () => { pulses[r].dataset.hop = l; } });
      steps.push({ at: s + 0.4 + l * HOP, run: () => { tile(r, l).dataset.on = r; } });
    }
    steps.push({ at: s + 3.6, run: idle });
  });

  register(visual.closest('[data-section]'), {
    focus: visual,
    enter: ENTER,
    period: plan.length * SLOT,
    steps,
    reset: idle,
    still: () => { visual.dataset.route = still; },
    slow: visual,
  });
  if (!visual.closest('.is-in')) idle();
}
