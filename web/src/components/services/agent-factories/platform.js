import { register, reduced } from '../../../motion/loop.js';
import { logLine, mod } from './log.js';

/*
  The shared layer, one pass = 12 s on the 0.4 s grid: ten requests, one every 1.2 s, and one model change.
  A request (n = pass * 10 + r, agent n % 4):
   +0    its agent is marked, a pulse runs from the agent to the layer; the data source of the request before clears
   +0.4  the three checks of the layer light up one after another; the log line is prepared above the list
   +0.8  a pulse runs on to the model in use; the log line moves in, the others move down, the data source is marked
  The model change, once per pass (from model pass % 3 to the next one):
   6     the next model is "in review", 6.8 a grey trial pulse runs to it
   7.2   "Modellwechsel" with the white pill: a human decides
   8.4   approved: the next model is active, the one before is ready; requests from 9.2 on use it
  10.4   the note fades
  The agents are never touched. Four log lines are recycled; nothing is created or removed.
*/
const EVERY = 1.2;
const REQUESTS = 10;
const SWITCH_FROM = 7;
const CHECK = 6;
const PROBE = 6.8;
const ASK = 7.2;
const GO = 8.4;
const CLEAR = 10.4;
const ENTER = 2;
const LAST = 3;

export function platform(visual) {
  const copy = JSON.parse(visual.dataset.copy);
  const all = (query) => [...visual.querySelectorAll(query)];
  const agents = all('.afp-in-agents li');
  const models = all('.afp-in-models li');
  const rails = all('[data-rail]');
  const agentWires = all('[data-wire="agent"]');
  const modelWires = all('[data-wire="model"]');
  const drops = { agent: visual.querySelector('[data-drop="agent"]'), model: visual.querySelector('[data-drop="model"]') };
  const core = visual.querySelector('.afp-in-core');
  const swap = visual.querySelector('[data-swap]');
  const pill = swap.querySelector('.st');
  const lines = all('.afp-in-log li');
  const chips = all('.afp-in-data li');
  const place = new Map();

  const current = (cycle) => mod(cycle, models.length);
  const upcoming = (cycle) => mod(cycle + 1, models.length);
  const off = (list) => list.forEach((item) => item.classList.remove('is-on', 'is-probe'));
  const put = (line, slot) => { place.set(line, slot); line.style.setProperty('--p', slot); };

  function use(active, review = -1) {
    models.forEach((model, index) => {
      const state = index === active ? 'active' : index === review ? 'check' : 'ready';
      model.dataset.state = state;
      model.querySelector('.st').textContent = copy.states[state];
      rails[index].classList.toggle('is-live', index === active);
    });
  }

  function write(line, n, model) {
    const entry = logLine(copy, n, model);
    const [time, agent, action, name] = line.children;
    time.textContent = entry.time;
    agent.textContent = entry.agent;
    action.textContent = entry.action;
    name.textContent = entry.model;
    line.dataset.source = entry.source;
  }

  function prepare(n, model) {
    const line = lines.find((item) => place.get(item) === LAST) ?? lines.find((item) => place.get(item) === -1);
    line.classList.add('is-off');
    put(line, -1);
    write(line, n, model);
  }

  function advance() {
    lines.forEach((line) => { line.classList.remove('is-off'); put(line, place.get(line) + 1); });
    const newest = lines.find((line) => place.get(line) === 0);
    chips[Number(newest.dataset.source)].classList.add('is-on');
  }

  function setup() {
    lines.forEach((line, index) => { line.classList.add('is-off'); put(line, index - 1); write(line, -index, 0); });
    off([...agents, ...agentWires, ...modelWires, drops.agent, drops.model, core, swap, ...chips]);
    use(0);
  }

  const steps = [
    { at: 0, name: 'run', run: (cycle) => use(current(cycle)) },
    { at: CHECK, run: (cycle) => use(current(cycle), upcoming(cycle)) },
    { at: PROBE, run: (cycle) => modelWires[upcoming(cycle)].classList.add('is-on', 'is-probe') },
    { at: ASK, name: 'ask', run: () => { pill.textContent = copy.swap.approve; pill.classList.add('is-human'); swap.classList.add('is-on'); } },
    { at: GO, name: 'run', run: (cycle) => { use(upcoming(cycle)); pill.textContent = copy.swap.approved; pill.classList.remove('is-human'); } },
    { at: CLEAR, run: () => swap.classList.remove('is-on') },
  ];
  for (let r = 0; r < REQUESTS; r++) {
    const at = r * EVERY;
    const request = (cycle) => cycle * REQUESTS + r;
    const model = (cycle) => (r >= SWITCH_FROM ? upcoming(cycle) : current(cycle));
    steps.push({ at, run: (cycle) => {
      const agent = mod(request(cycle), agents.length);
      off(chips);
      agents[agent].classList.add('is-on');
      agentWires[agent].classList.add('is-on');
      drops.agent.classList.add('is-on');
    } });
    steps.push({ at: at + 0.4, run: (cycle) => {
      off([...modelWires, drops.model]);
      core.classList.add('is-on');
      prepare(request(cycle), model(cycle));
    } });
    steps.push({ at: at + 0.8, run: (cycle) => {
      off([...agents, ...agentWires, drops.agent, core]);
      modelWires[model(cycle)].classList.add('is-on');
      drops.model.classList.add('is-on');
      advance();
    } });
  }

  if (!reduced) setup();
  register(visual.closest('[data-section]'), {
    focus: visual,
    enter: ENTER,
    period: REQUESTS * EVERY,
    steps,
    reset: setup,
    slow: visual,
  });
}
