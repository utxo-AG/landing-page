import { register, reduced } from '../../../motion/loop.js';
import { inboxEvent } from './model.js';
import { recycle, settle } from './recycle.js';

/*
  Approval inbox, one pass = 16 s, all times on the 0.4 s grid. At the start of pass c the rows are:
  item c (revised, waits for approval), item c + 1 (waits), item c + 2 (in preparation).
   1.2   "Freigeben" is pressed on the first row; 1.6 approved                       log
   3.6   "Zurückgeben" is pressed on the second row; 4 the comment shows, in revision  log
   6.4   the approved row leaves; 6.8 the rows move up, item c + 3 enters in preparation
   8.4   the row in preparation is submitted and waits for approval                  log
   9.6   the log is filtered by decisions; 11.2 by agents; 12.8 all rows again
  14     the revised case is submitted again                                         log
  Rows of both lists are recycled (the log always holds six rows), so there is no restart.
*/
const ENTER = 2;
const PERIOD = 16;
const SWAP = { duration: 500, easing: 'cubic-bezier(.35,0,0,1)' };

export function inbox(root) {
  const section = root.closest('[data-section]');
  if (reduced) {
    register(section, { focus: root });
    return;
  }
  const data = JSON.parse(root.dataset.inbox);
  const list = root.querySelector('.map-inbox-list');
  const log = root.querySelector('.map-inbox-log ol');
  const chips = [...root.querySelectorAll('.map-inbox-filters i')];
  const item = (index) => data.items[((index % data.items.length) + data.items.length) % data.items.length];

  function fill(row, entry, state, revised = false) {
    row.dataset.state = state;
    row.querySelector('.label').textContent = entry.agent;
    row.querySelector('b').textContent = entry.title;
    row.querySelector('.st').textContent = data.status[state];
    row.querySelector('.map-inbox-meta').textContent = state === 'run' ? data.working : state === 'rework' ? entry.comment : revised ? entry.revised : entry.meta;
    row.querySelectorAll('.is-press').forEach((el) => el.classList.remove('is-press'));
    row.classList.remove('is-leaving');
  }

  /* a row changes its state in place: status pill and second line swap */
  function turn(row, entry, state, revised) {
    fill(row, entry, state, revised);
    row.querySelector('.map-inbox-meta').animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], SWAP);
  }

  function write(row, n) {
    const event = inboxEvent(n, data.items.length);
    const entry = data.items[event.item];
    row.toggleAttribute('data-human', event.human);
    row.querySelector('time').textContent = event.time;
    row.querySelector('b').textContent = event.human ? data.person : entry.agent;
    row.querySelector('span').textContent = `${data.actions[event.kind]}: ${entry.ref}`;
  }

  const record = (n) => recycle(log, 'top', (row) => write(row, n));

  function filter(index) {
    log.dataset.filter = index;
    chips.forEach((chip, i) => chip.classList.toggle('is-on', i === index));
  }

  function setup() {
    settle(list);
    settle(log);
    [...list.children].forEach((row, i) => fill(row, item(i), i < 2 ? 'wait' : 'run', i === 0));
    [...log.children].forEach((row, i) => write(row, -1 - i));
    filter(0);
  }

  function shift(pass) {
    recycle(list, 'bottom', (leaving) => fill(leaving, item(pass + 3), 'run'));
  }

  const rows = () => list.children;
  const steps = [
    { at: 0, name: 'run' },
    { at: 1.2, run: () => rows()[0].querySelector('[data-approve]').classList.add('is-press') },
    { at: 1.6, run: (pass) => { turn(rows()[0], item(pass), 'done', true); record(pass * 4); } },
    { at: 3.6, run: () => rows()[1].querySelector('[data-back]').classList.add('is-press') },
    { at: 4, run: (pass) => { turn(rows()[1], item(pass + 1), 'rework'); record(pass * 4 + 1); } },
    { at: 6.4, run: () => rows()[0].classList.add('is-leaving') },
    { at: 6.8, run: shift },
    { at: 8.4, run: (pass) => { turn(rows()[1], item(pass + 2), 'wait'); record(pass * 4 + 2); } },
    { at: 9.6, run: () => filter(1) },
    { at: 11.2, run: () => filter(2) },
    { at: 12.8, run: () => filter(0) },
    { at: 14, run: (pass) => { turn(rows()[0], item(pass + 1), 'wait', true); record(pass * 4 + 3); } },
  ];

  setup();
  register(section, { focus: root, enter: ENTER, period: PERIOD, steps, reset: setup, slow: root });
}
