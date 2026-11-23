import { register } from '../../motion/loop.js';

/*
  Managed Agents console, one pass = 20 s, all times on the 0.4 s grid:
   0 .. 18  every 2 s the tracks of all running agents advance one step
   6        the agent that is due reaches "Ihre Freigabe"; the "Freigeben" button appears
   8.8      a pointer travels to the button (the visitor can press it first)
  10        pressed: counters step; 10.4 the row shows "erledigt"
  11.2      the finished row leaves; 11.6 rows move up, then a planned agent from the pool enters
  12        the agent that was planned starts
  Rows are recycled, so the loop has no restart point. `queue` holds the running rows in the
  order they will finish; every row is paced to reach 100 % one tick before its turn.
*/
const ENTER = 3.6;
const PERIOD = 20;
const TICK = 2;
const FULL_AT = 4;
const COUNT_FROM = 0.9;
const COUNT_FOR = 1.4;
const EASE = 'cubic-bezier(.35,0,0,1)';

export function managedAgents(mockup) {
  const labels = JSON.parse(mockup.dataset.labels);
  const view = mockup.querySelector('.console');
  const list = mockup.querySelector('.agents');
  const pool = [...mockup.querySelector('[data-pool]').content.children];
  const pointer = mockup.querySelector('.ma-pointer');
  const counters = Object.fromEntries([...mockup.querySelectorAll('[data-count]')].map((el) => [el.dataset.count, el]));
  const initial = { rows: list.innerHTML, runs: Number(counters.runs.firstChild.textContent), auto: Number(counters.auto.firstChild.textContent) };
  let queue, planned, waiting, drawn, runs, counted;

  const bar = (row) => row.querySelector('.track i');
  const progress = (row) => Number(bar(row).style.getPropertyValue('--v'));
  const setProgress = (row, value) => bar(row).style.setProperty('--v', value.toFixed(1));
  const setState = (row, state) => { row.dataset.state = state; row.querySelector('.st').textContent = labels.status[state]; };
  const count = (key, value) => { counters[key].firstChild.textContent = value; };

  function setup() {
    list.innerHTML = initial.rows;
    const rows = [...list.children];
    queue = rows.filter((row) => row.dataset.state === 'run').sort((a, b) => a.dataset.due - b.dataset.due);
    planned = rows.find((row) => row.dataset.state === 'plan');
    waiting = null;
    drawn = 0;
    runs = initial.runs;
    counted = false;
    count('runs', initial.runs);
    count('auto', initial.auto);
    count('waiting', 0);
    pointer.classList.remove('is-on', 'is-press');
  }

  function advance(at) {
    queue.forEach((row, rank) => {
      const ticksLeft = ((FULL_AT - at + PERIOD) % PERIOD) / TICK + 1 + rank * (PERIOD / TICK);
      const value = progress(row);
      setProgress(row, value + (100 - value) / ticksLeft);
    });
  }

  function ask(withButton) {
    waiting = queue.shift();
    setProgress(waiting, 100);
    setState(waiting, 'wait');
    count('waiting', 1);
    if (!withButton) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'approve';
    button.textContent = labels.approve;
    button.addEventListener('click', () => loop.jump('approve'), { once: true });
    waiting.querySelector('.agent-status').prepend(button);
  }

  function aim() {
    const target = waiting.querySelector('.approve').getBoundingClientRect();
    const frame = view.getBoundingClientRect();
    pointer.style.setProperty('--x', `${target.left - frame.left + target.width * 0.55}px`);
    pointer.style.setProperty('--y', `${target.top - frame.top + target.height * 0.5}px`);
  }

  function approve() {
    waiting.querySelector('.approve').classList.add('is-press');
    if (pointer.classList.contains('is-on')) pointer.classList.add('is-press');
    count('waiting', 0);
    count('runs', ++runs);
  }

  function release() {
    waiting.querySelector('.approve').remove();
    setState(waiting, 'done');
    pointer.classList.remove('is-on', 'is-press');
  }

  function shift() {
    const rows = [...list.children].filter((row) => row !== waiting);
    const before = rows.map((row) => row.getBoundingClientRect().top);
    waiting.remove();
    waiting = null;
    const next = pool[drawn++ % pool.length].cloneNode(true);
    list.append(next);
    rows.forEach((row, i) => {
      const delta = before[i] - row.getBoundingClientRect().top;
      if (delta) row.animate([{ transform: `translateY(${delta}px)` }, { transform: 'none' }], { duration: 700, easing: EASE });
    });
    next.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 300, easing: EASE, fill: 'backwards' });
  }

  function start() {
    setState(planned, 'run');
    planned.querySelector('.agent-task').textContent = planned.dataset.task;
    queue.push(planned);
    planned = list.lastElementChild;
  }

  function tick(t) {
    if (counted) return;
    const k = Math.min(1, Math.max(0, (t + ENTER - COUNT_FROM) / COUNT_FOR));
    const eased = 1 - Math.pow(1 - k, 3);
    count('runs', Math.round(initial.runs * eased));
    count('auto', Math.round(initial.auto * eased));
    counted = k === 1;
  }

  const steps = [
    { at: 6, name: 'ask', run: () => ask(true) },
    { at: 8.4, name: 'aim', run: aim },
    { at: 8.8, name: 'reach', run: () => pointer.classList.add('is-on') },
    { at: 10, name: 'approve', run: approve },
    { at: 10.4, name: 'release', run: release },
    { at: 11.2, name: 'leave', run: () => waiting.classList.add('is-leaving') },
    { at: 11.6, name: 'shift', run: shift },
    { at: 12, name: 'start', run: start },
  ];
  for (let at = 0; at < PERIOD; at += TICK) steps.push({ at, name: at === 0 ? 'run' : undefined, run: () => advance(at) });

  setup();
  const loop = register(mockup.closest('[data-section]'), {
    enter: ENTER,
    period: PERIOD,
    steps,
    tick,
    reset: setup,
    still: () => ask(false),
    slow: mockup.querySelector('.device'),
  });
}
