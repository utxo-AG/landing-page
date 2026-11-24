import { register } from '../../../motion/loop.js';
import { laneAt, layerAt, state, monthAt, STILL } from './roadmap-model.js';

/*
  Roadmap, one pass = 18 s. The playhead is a pure function of the clock:
   0 … 0.8    from the second pass on: everything rewinds to week 0
   1.2 … 15.6 the playhead runs through all weeks at constant speed; lanes fill, the release pill shows
              around each go-live, counters, team marks and infrastructure layers follow
   15.6 … 18  the final state stands
  Only values that changed are written, so a frame touches a handful of properties.
*/
const ENTER = 2;
const PERIOD = 18;
const REWIND = 0.8;
const RUN = 1.2;
const RUN_FOR = 14.4;

const clamp = (value) => Math.min(1, Math.max(0, value));

export function roadmap(el) {
  const total = Number(el.dataset.weeks);
  const weeksPerMonth = Number(el.dataset.wpm);
  const cache = new Map();
  const set = (node, key, value, write) => {
    let seen = cache.get(node);
    if (!seen) cache.set(node, (seen = {}));
    if (seen[key] === value) return;
    seen[key] = value;
    write(value);
  };
  const lanes = [...el.querySelectorAll('[data-lane]')].map((lane) => ({
    plan: { start: Number(lane.dataset.start), mid: Number(lane.dataset.mid), live: Number(lane.dataset.live), trained: Number(lane.dataset.trained) },
    segments: [...lane.querySelectorAll('.aap-rm-seg')].map((seg) => ({ seg, fill: seg.querySelector('[data-fill]') })),
    dot: lane.querySelector('[data-dot]'),
    gate: lane.querySelector('[data-gate]'),
  }));
  const teams = [...el.querySelectorAll('[data-team]')].map((node) => ({ node, at: Number(node.dataset.team) }));
  const layers = [...el.querySelectorAll('[data-layer]')].map((node) => ({ node, fill: node.querySelector('[data-fill]'), at: Number(node.dataset.layer) }));
  const playhead = el.querySelector('[data-now]');
  const stats = Object.fromEntries([...el.querySelectorAll('[data-stat]')].map((node) => [node.dataset.stat, node]));

  function draw(now) {
    let live = 0;
    for (const lane of lanes) {
      const frame = laneAt(lane.plan, now, total);
      lane.segments.forEach(({ seg, fill }, index) => {
        set(fill, 'p', frame.fills[index], (value) => fill.style.setProperty('--p', value));
        set(seg, 'state', state(frame.fills[index]), (value) => { seg.dataset.state = value; });
      });
      set(lane.dot, 'on', frame.live, (value) => lane.dot.classList.toggle('is-on', value));
      set(lane.gate, 'on', frame.gate, (value) => lane.gate.classList.toggle('is-on', value));
      if (frame.live) live++;
    }
    let trained = 0;
    for (const team of teams) {
      const on = now >= team.at;
      if (on) trained++;
      set(team.node, 'on', on, (value) => team.node.classList.toggle('is-on', value));
    }
    for (const layer of layers) {
      set(layer.fill, 'p', layerAt(layer.at, now, total), (value) => layer.fill.style.setProperty('--p', value));
      set(layer.node, 'on', now >= layer.at, (value) => layer.node.classList.toggle('is-on', value));
    }
    set(playhead, 'now', Math.round((now / total) * 10000) / 10000, (value) => playhead.style.setProperty('--now', value));
    set(stats.month, 'text', monthAt(now, total, weeksPerMonth), (value) => { stats.month.textContent = value; });
    set(stats.live, 'text', live, (value) => { stats.live.textContent = value; });
    set(stats.teams, 'text', trained, (value) => { stats.teams.textContent = value; });
  }

  function tick(t, cycle) {
    if (t < RUN) draw(cycle ? total * Math.pow(1 - clamp(t / REWIND), 3) : 0);
    else draw(clamp((t - RUN) / RUN_FOR) * total);
  }

  const setup = () => draw(0);
  setup();
  register(el.closest('[data-section]'), {
    focus: el,
    enter: ENTER,
    period: PERIOD,
    steps: [{ at: 0, name: 'run' }],
    tick,
    still: () => draw(STILL),
    reset: setup,
    slow: el.querySelector('.aap-rm-chart'),
  });
}
