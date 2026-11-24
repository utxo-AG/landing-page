import { register } from '../../motion/loop.js';

/*
  Agent Factory, one pass = 18 s = 45 units of 0.4 s. A cube is born every 9 units (3.6 s), five per pass,
  and every cube runs the same life, in units after its birth:
   0  grows out of "Vorlage"            3  moves to "Anbindung", 5 first marking
   9  moves to "Test", 11 second        15 moves to "Freigabe", 17 the pill turns white and waits
  21  released: third marking           22 moves to the lift, 24 rises to the top plate
  26  flies over its slot               27 the oldest cube in that slot sinks (once the grid is full)
  28  settles                           29 counters step, the sunk cube is parked at "Vorlage" for reuse
  Pulses run up the wires while a cube travels to or works at the station above.
  Cube n is born at (n - 3) * 9 units, so three cubes are already on their way at 0 and the state
  is a pure function of n: slot n % 24, element n % 28. Nothing is created or removed, so there is no restart.
*/
const UNIT = 0.4;
const PERIOD = 45;
const EVERY = 9;
const AHEAD = 3;
const ENTER = 2.8;
const PULSE = 2;
const RISERS = [[7], [3, 6], [0, 3], [6, 0], [4]];
const TRUNKS = [[1, 19, 37], [10, 28]];

const mod = (n, m) => ((n % m) + m) % m;

export function factory(mockup) {
  const { stops, slots, open } = JSON.parse(mockup.dataset.geo);
  const cubes = [...mockup.querySelectorAll('.fa-cube')];
  const pulses = [...mockup.querySelectorAll('.fa-pulse')];
  const gate = mockup.querySelector('[data-gate]');
  const running = mockup.querySelector('[data-count="running"]');
  const version = mockup.querySelector('[data-count="version"]');
  const release = Number(version.textContent.replace('.', ''));
  const lift = stops[stops.length - 1];
  const perPass = PERIOD / EVERY;

  const cube = (n) => cubes[mod(n, cubes.length)];
  const slot = (n) => slots[mod(n, slots.length)];
  const mark = (el, marks) => { el.dataset.marks = marks; };

  function put(el, [x, y], plate, hover = 0, raised = 0) {
    el.style.setProperty('--x', x);
    el.style.setProperty('--y', y);
    el.style.setProperty('--l', plate);
    el.style.setProperty('--h', hover);
    el.style.setProperty('--r', raised);
  }

  function park(el) {
    el.classList.add('is-flat', 'is-off');
    put(el, stops[0], 1);
    mark(el, 0);
  }

  function count(n) {
    running.textContent = Math.min(slots.length, slots.length - open + n + 1);
    const next = release + Math.max(0, n - open + 1);
    version.textContent = `${Math.floor(next / 10)}.${next % 10}`;
  }

  function arrange(seated, flights) {
    const placed = [...flights];
    for (let n = open - slots.length; n < seated; n++) placed.push([n, slot(n), 2, 0, 3]);
    cubes.forEach(park);
    for (const [n, place, level, hover, marks] of placed) {
      cube(n).classList.remove('is-flat', 'is-off');
      put(cube(n), place, level, hover);
      mark(cube(n), marks);
    }
    pulses.forEach((pulse) => pulse.classList.remove('is-on'));
    gate.classList.add('is-human');
    count(seated - 1);
  }

  const setup = () => arrange(0, [[0, slot(0), 2, 1, 3], [1, stops[3], 1, 0, 2], [2, stops[1], 1, 0, 1]]);
  const still = () => arrange(open, [[open, stops[3], 1, 0, 2]]);

  const life = [
    [0, (n) => cube(n).classList.remove('is-flat', 'is-off')],
    [3, (n) => put(cube(n), stops[1], 1)],
    [5, (n) => mark(cube(n), 1)],
    [9, (n) => put(cube(n), stops[2], 1)],
    [11, (n) => mark(cube(n), 2)],
    [15, (n) => put(cube(n), stops[3], 1)],
    [17, () => gate.classList.add('is-human')],
    [21, (n) => { mark(cube(n), 3); gate.classList.remove('is-human'); }],
    [22, (n) => put(cube(n), lift, 1)],
    [24, (n) => put(cube(n), lift, 1, 1, 1)],
    [26, (n) => put(cube(n), slot(n), 2, 1)],
    [27, (n) => { if (n >= open) cube(n - slots.length).classList.add('is-flat'); }],
    [28, (n) => put(cube(n), slot(n), 2)],
    [29, (n) => { count(n); if (n >= open) park(cube(n - slots.length)); }],
  ];

  const steps = [];
  function pulse(wire, at, units) {
    steps.push({ at: at * UNIT, run: () => pulses[wire].classList.add('is-on') });
    steps.push({ at: ((at + units) % PERIOD) * UNIT, run: () => pulses[wire].classList.remove('is-on') });
  }
  for (let k = 0; k < perPass; k++) {
    for (const [offset, run] of life) {
      const at = k * EVERY + offset;
      const passes = Math.floor(at / PERIOD);
      steps.push({ at: (at % PERIOD) * UNIT, name: at === 0 ? 'run' : undefined, run: (cycle) => run((cycle - passes) * perPass + k + AHEAD) });
    }
    RISERS.forEach((phases, wire) => phases.forEach((phase) => pulse(wire, k * EVERY + phase, PULSE)));
  }
  TRUNKS.forEach((phases, trunk) => phases.forEach((at) => pulse(RISERS.length + trunk, at, PULSE + 1)));

  setup();
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD * UNIT,
    steps,
    still,
    reset: setup,
    slow: mockup.querySelector('.fa-scene'),
  });
}
