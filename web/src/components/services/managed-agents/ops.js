import { register, reduced } from '../../../motion/loop.js';
import { shift, version } from './model.js';
import { recycle, settle } from './recycle.js';

/*
  Operations view, one pass = 18 s, all times on the 0.4 s grid. The runs of each agent drift to the left
  as ticks (a new one grows in on the right and is the running one); three events happen per pass:
   0.8   a run of the first agent fails: the event enters; 2 it is retried; 4 resolved, the tick fills
   6     a run of the second agent fails its check; 7.2 the utxo AG team takes over (white pill); 10.4 resolved
  12     a new version: tests; 13.2 rollout, one agent every 0.8 s; 15.6 rolled out
  The event list always holds three rows: the oldest row moves to the top and becomes the new event.
  Each pass is 20 minutes later on the clock and one version further, so there is no restart.
*/
const ENTER = 2;
const PERIOD = 18;
const PASS = 20;
const SPEED = [1 / 0.8, 1 / 1.2, 1];
const GROW = 0.7;
const SWAP = { duration: 700, easing: 'cubic-bezier(.35,0,0,1)' };
const RUNS_AT = [1.6, 5.2, 8.8, 11.6, 16.4];

export function ops(root) {
  const section = root.closest('[data-section]');
  if (reduced) {
    register(section, { focus: root });
    return;
  }
  const data = JSON.parse(root.dataset.ops);
  const { retry, escalate, rollout } = data.events;
  const list = root.querySelector('.map-ops-events ol');
  const chips = [...root.querySelectorAll('.map-ops-ver')];
  const counters = Object.fromEntries([...root.querySelectorAll('[data-count]')].map((el) => [el.dataset.count, el]));
  const lanes = [...root.querySelectorAll('[data-strip]')].map((strip, index) => ({
    strip,
    speed: SPEED[index % SPEED.length],
    width: strip.clientWidth,
    newest: null,
    failed: null,
    ticks: [...strip.children].map((el, k) => ({ el, k, h: Number(el.style.getPropertyValue('--h')), turn: null })),
  }));
  const count = { ...data.counters };

  const sizes = new ResizeObserver((entries) => {
    for (const entry of entries) lanes.find((lane) => lane.strip === entry.target).width = entry.contentRect.width;
  });
  lanes.forEach((lane) => sizes.observe(lane.strip));

  function fill(row, { time, who, title, state, kind }) {
    row.querySelector('time').textContent = time;
    row.querySelector('.map-ops-what b').textContent = who;
    row.querySelector('.map-ops-what span').textContent = title;
    setState(row, state, kind);
    return row;
  }

  function setState(row, state, kind) {
    const pill = row.querySelector('.st');
    row.dataset.kind = kind;
    pill.textContent = state;
    pill.classList.toggle('is-human', kind === 'human');
  }

  function show(key, value) {
    counters[key].textContent = value;
  }

  function setup() {
    settle(list);
    const [first, second, third] = list.children;
    fill(first, { time: shift(rollout.time, -PASS), who: rollout.who, title: rollout.title.replace('{v}', version(data.version)), state: rollout.states[2], kind: 'done' });
    fill(second, { time: shift(escalate.time, -PASS), who: data.lanes[escalate.lane], title: escalate.title, state: escalate.states[2], kind: 'done' });
    fill(third, { time: shift(retry.time, -PASS), who: data.lanes[retry.lane], title: retry.title, state: retry.states[2], kind: 'done' });
    chips.forEach((chip) => { chip.classList.remove('is-new'); chip.lastElementChild.textContent = version(data.version); });
    Object.assign(count, data.counters);
    Object.keys(count).forEach((key) => show(key, count[key]));
    lanes.forEach((lane) => {
      lane.newest = null;
      lane.failed = null;
      lane.ticks.forEach((tick) => { tick.turn = null; tick.el.classList.remove('is-run', 'is-fail', 'is-fixed'); });
    });
    drift(-ENTER, 0);
  }

  const enter = (entry) => recycle(list, 'top', (row) => fill(row, entry));

  const current = () => list.firstElementChild;

  function fail(index) {
    const lane = lanes[index];
    lane.failed = lane.newest;
    lane.failed?.el.classList.add('is-fail');
  }

  function fix(index, key) {
    const lane = lanes[index];
    lane.failed?.el.classList.replace('is-fail', 'is-fixed');
    lane.failed = null;
    show(key, ++count[key]);
  }

  function roll(index, pass) {
    const chip = chips[index];
    chip.classList.add('is-new');
    chip.lastElementChild.textContent = version(data.version + pass + 1);
    chip.lastElementChild.animate([{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'none' }], SWAP);
  }

  /* every tick sits at (k - time * speed) modulo the number of ticks; one that wraps is a new run */
  function drift(t, pass) {
    const time = pass * PERIOD + t;
    for (const lane of lanes) {
      const n = lane.ticks.length;
      const pitch = lane.width / n;
      let newest = lane.ticks[0];
      let best = -1;
      for (const tick of lane.ticks) {
        const u = tick.k - time * lane.speed;
        const turn = Math.floor(u / n);
        const at = u - turn * n;
        if (turn !== tick.turn) {
          if (tick.turn !== null) tick.el.classList.remove('is-fail', 'is-fixed');
          tick.turn = turn;
        }
        if (at > best) { best = at; newest = tick; }
        tick.el.style.transform = `translate3d(${((at - tick.k) * pitch).toFixed(1)}px,0,0) scaleY(${(tick.h * Math.min(1, (n - at) / GROW)).toFixed(3)})`;
      }
      if (newest !== lane.newest) {
        lane.newest?.el.classList.remove('is-run');
        newest.el.classList.add('is-run');
        lane.newest = newest;
      }
    }
  }

  const later = (pass) => pass * PASS;
  const steps = [
    { at: 0, name: 'run' },
    { at: 0.8, run: (pass) => { fail(retry.lane); enter({ time: shift(retry.time, later(pass)), who: data.lanes[retry.lane], title: retry.title, state: retry.states[0], kind: 'error' }); } },
    { at: 2, run: () => setState(current(), retry.states[1], 'run') },
    { at: 4, run: () => { setState(current(), retry.states[2], 'done'); fix(retry.lane, 'fixed'); } },
    { at: 6, run: (pass) => { fail(escalate.lane); enter({ time: shift(escalate.time, later(pass)), who: data.lanes[escalate.lane], title: escalate.title, state: escalate.states[0], kind: 'error' }); } },
    { at: 7.2, run: () => setState(current(), escalate.states[1], 'human') },
    { at: 10.4, run: () => { setState(current(), escalate.states[2], 'done'); fix(escalate.lane, 'team'); } },
    { at: 12, run: (pass) => enter({ time: shift(rollout.time, later(pass)), who: rollout.who, title: rollout.title.replace('{v}', version(data.version + pass + 1)), state: rollout.states[0], kind: 'run' }) },
    { at: 13.2, run: () => setState(current(), rollout.states[1], 'run') },
    ...lanes.map((_, index) => ({ at: 13.2 + index * 0.8, run: (pass) => roll(index, pass) })),
    { at: 15.6, run: () => { setState(current(), rollout.states[2], 'done'); chips.forEach((chip) => chip.classList.remove('is-new')); } },
    ...RUNS_AT.map((time) => ({ at: time, run: () => show('runs', ++count.runs) })),
  ];

  setup();
  register(section, { focus: root, enter: ENTER, period: PERIOD, steps, tick: drift, reset: setup, slow: root });
}
