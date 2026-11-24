import { register } from '../../../motion/loop.js';
import { wave, rate } from './wave.js';

/*
  Operations view, one pass = 8 s, all times on the 0.4 s grid. Release n = pass.
    0     the list moves down by one row: release n comes in on top and waits for approval (white pill),
          the oldest row leaves below and is parked above the list for release n + 1
    2.4   the pill is pressed, 2.8 the release rolls out (2.4 s), 5.2 it is done
    0.8, 2.8, 4.8, 6.8  one connected system after another is checked (1.2 s each)
  The load curve moves by exactly one of its periods per pass (tick), the point on its right edge and the
  figure "requests per minute" follow it. Astro renders pass 0 before the approval (reduced motion, no JS).
*/
const PERIOD = 8;
const ENTER = 1.6;

export function ops(visual) {
  const { rows: visible, major, minor, states } = JSON.parse(visual.dataset.plan);
  const rows = [...visual.querySelectorAll('.sdp-o-rel li')];
  const systems = [...visual.querySelectorAll('[data-sys]')];
  const curve = visual.querySelector('.sdp-o-clip svg');
  const now = visual.querySelector('.sdp-o-now');
  const figure = visual.querySelector('[data-rate]');
  let shown = Number(figure.textContent);
  let stamp = -1;

  const row = (n) => rows[((n % rows.length) + rows.length) % rows.length];
  function state(n, name) {
    const el = row(n);
    el.dataset.state = name;
    el.querySelector('.st').textContent = states[name === 'roll' || name === 'done' ? name : 'wait'];
  }
  function place(n, newest) {
    const el = row(n);
    const p = newest - n;
    const hidden = p < 0 || p >= visible;
    el.classList.toggle('is-off', p < 0);
    el.classList.toggle('is-out', p >= visible);
    el.style.setProperty('--p', p);
    el.querySelector('b').textContent = `${major}.${minor + n}.0`;
    if (p < 0) state(n, 'next');
    else if (p > 0) state(n, 'done');
    return hidden;
  }
  function arrange(newest) {
    for (let n = newest - visible; n <= newest + 1; n++) place(n, newest);
    state(newest, 'wait');
  }
  function check(k) {
    systems.forEach((el, i) => el.classList.toggle('is-check', i === k));
  }
  function tick(t) {
    const phase = (((t / PERIOD) % 1) + 1) % 1;
    const y = wave(phase);
    curve.style.setProperty('--ph', phase.toFixed(4));
    now.style.setProperty('--v', y.toFixed(4));
    const slot = Math.floor(t / 0.4);
    if (slot !== stamp) {
      stamp = slot;
      const value = rate(y);
      if (value !== shown) figure.textContent = shown = value;
    }
  }
  function idle() {
    arrange(0);
    check(-1);
    tick(0);
  }

  const steps = [
    { at: 0, name: 'run', run: (cycle) => arrange(cycle) },
    { at: 2.4, run: (cycle) => state(cycle, 'press') },
    { at: 2.8, run: (cycle) => state(cycle, 'roll') },
    { at: 5.2, run: (cycle) => state(cycle, 'done') },
    ...systems.flatMap((_, k) => [{ at: 0.8 + k * 2, run: () => check(k) }, { at: 2 + k * 2, run: () => check(-1) }]),
  ];

  register(visual.closest('[data-section]'), { focus: visual, enter: ENTER, period: PERIOD, steps, tick, reset: idle, slow: visual });
}
