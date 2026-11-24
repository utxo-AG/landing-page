import { register, reduced } from '../../../motion/loop.js';

/*
  Rollout of one version across the fleet, one pass = 18 s on the 0.4 s grid. Every pass is the next version
  (3.2, 3.3, ...): the fleet keeps the marking of the pass before, so nothing is put back.
  -2.4  entry: plate, cubes and console set themselves
   0    "test": the change sits in the template, the tests of all agents run (counter 0.4 to 3.2, flash over the fleet)
   3.2  one agent fails: it is dimmed and outlined, its card and flag appear, tests stand at 23 of 24
   4    "gate": the platform team is asked (white pill); 5.6 approved
   6.4  "roll": the fleet updates wave by wave (a diagonal every 0.4 s): lift in phthalo, 0.8 s later settle
        with the new marking; last cube down at 10.4
  11.2  "fix": the held agent was adjusted and passes; its card and flag turn white: a human decides
  12.8  approved: the held cube lifts, 13.6 settles; 24 of 24
  14    "done"; 17.2 the console dims for the hand-over to the next version; 18 = 0
*/
const TESTS = [0.4, 3.2];
const ENTER = 2.4;
const PERIOD = 18;
const WAVE_AT = 6.4;
const WAVE_EVERY = 0.4;
const SETTLE = 0.8;
const MARKS = 3;

export function rollout(visual) {
  const copy = JSON.parse(visual.dataset.copy);
  const cubes = [...visual.querySelectorAll('.afp-ro-cube')].sort((a, b) => a.dataset.n - b.dataset.n);
  const held = cubes[Number(visual.dataset.held)];
  const fleet = cubes.filter((cube) => cube !== held);
  const waves = [];
  fleet.forEach((cube) => (waves[cube.dataset.wave] ??= []).push(cube));
  const one = (query) => visual.querySelector(query);
  const status = one('[data-status]');
  const from = one('[data-from]');
  const to = one('[data-to]');
  const updated = one('[data-updated]');
  const card = one('[data-card]');
  const note = one('[data-note]');
  const flag = one('[data-flag]');
  const rows = Object.fromEntries([...visual.querySelectorAll('[data-row]')].map((row) => [row.dataset.row, {
    row, pill: row.querySelector('.st'), count: row.querySelector('[data-count]'), bar: row.querySelector('.track i'),
  }]));
  const release = Number(copy.version.replace('.', ''));
  const total = cubes.length;
  const version = (cycle) => { const value = release + cycle; return `${Math.floor(value / 10)}.${value % 10}`; };
  let done = 0;
  let tested = -1;

  function stage(name, state, label = copy.states[state]) {
    rows[name].row.dataset.state = state;
    rows[name].pill.textContent = label;
  }
  function count(name, value) {
    rows[name].count.textContent = value;
    rows[name].bar.style.setProperty('--v', (value / total) * 100);
  }
  function phase(name, mode) {
    status.textContent = copy.status[name];
    visual.dataset.phase = mode;
  }
  function decide(state, label, text) {
    card.dataset.state = state;
    card.querySelector('.st').textContent = label;
    if (text) note.textContent = text;
    flag.classList.toggle('is-human', state === 'wait');
  }
  function settle(cube, cycle) {
    cube.dataset.s = '';
    cube.dataset.m = (cycle + 1) % MARKS;
    updated.textContent = ++done;
    count('roll', done);
  }

  function begin(cycle) {
    visual.classList.remove('is-turn');
    cubes.forEach((cube) => { cube.dataset.s = ''; cube.dataset.m = cycle % MARKS; });
    from.textContent = version(cycle - 1);
    to.textContent = version(cycle);
    done = 0;
    tested = -1;
    updated.textContent = 0;
    stage('template', 'done');
    stage('test', 'run');
    stage('gate', 'open');
    stage('roll', 'open');
    count('test', 0);
    count('roll', 0);
    card.classList.remove('is-on');
    flag.classList.remove('is-on');
    phase('test', 'run');
  }

  const steps = [
    { at: 0, name: 'test', run: begin },
    { at: TESTS[1], run: (cycle) => {
      held.dataset.s = 'held';
      stage('test', 'part', copy.states.failed);
      decide('held', copy.states.held, copy.held.fail.replace('{v}', version(cycle - 1)));
      card.classList.add('is-on');
      flag.classList.add('is-on');
    } },
    { at: 4, name: 'gate', run: () => { stage('gate', 'wait', copy.states.approve); phase('wait', 'wait'); } },
    { at: 5.6, run: () => stage('gate', 'done', copy.states.approved) },
    { at: WAVE_AT, name: 'roll', run: () => { stage('roll', 'run'); phase('roll', 'run'); } },
    { at: 11.2, name: 'fix', run: () => {
      count('test', total);
      stage('test', 'done');
      decide('wait', copy.states.approve, copy.held.fixed);
      phase('wait', 'wait');
    } },
    { at: 12.8, run: () => { decide('done', copy.states.approved); held.dataset.s = 'up'; phase('roll', 'run'); } },
    { at: 13.6, run: (cycle) => { settle(held, cycle); note.textContent = copy.held.done.replace('{v}', version(cycle)); flag.classList.remove('is-on'); } },
    { at: 14, name: 'done', run: () => { stage('roll', 'done'); phase('done', 'done'); } },
    { at: 17.2, run: () => { visual.classList.add('is-turn'); card.classList.remove('is-on'); } },
  ];
  waves.forEach((wave, index) => {
    const at = WAVE_AT + index * WAVE_EVERY;
    steps.push({ at, run: () => wave.forEach((cube) => { cube.dataset.s = 'up'; }) });
    steps.push({ at: at + SETTLE, run: (cycle) => wave.forEach((cube) => settle(cube, cycle)) });
  });

  function tick(t) {
    if (t < 0 || t >= TESTS[1]) return;
    const value = Math.round((total - 1) * Math.min(1, Math.max(0, (t - TESTS[0]) / (TESTS[1] - TESTS[0] - 0.2))));
    if (value !== tested) count('test', tested = value);
  }

  if (!reduced) begin(0);
  register(visual.closest('[data-section]'), {
    focus: visual,
    enter: ENTER,
    period: PERIOD,
    steps,
    tick,
    reset: () => begin(0),
    slow: visual,
  });
}
