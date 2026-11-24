import { register, reduced } from '../../../motion/loop.js';
import { shift } from './model.js';
import { recycle, settle } from './recycle.js';

/*
  One run of the research agent, one pass = 20 s, all times on the 0.4 s grid:
   0     trigger: a new run starts, its number steps, the rows of the run before turn grey   0.4 log
   2.4   sources: four groups are read one after another (3.2 to 4.4), the counter follows   4.8 log
   6     draft: five chapters with their sources                                             8.8 log
   9.2   check: four checks                                                                 11.6 log
  12     approval point: the white pill waits                                               12.4 log
  14.4   "Freigeben" is pressed; 14.8 approved                                              14.8 log
  15.6   result                                                                             16.4 log
  19.2   the rail fades out; the next run begins at 0
  The log always holds seven rows: a new row enters at the bottom and the oldest leaves at the top,
  so the log never empties and there is no restart. Each pass is one hour later on the clock.
*/
const ENTER = 1.2;
const PERIOD = 20;
const AT = [0, 2.4, 6, 9.2, 12, 15.6];
const WIPE = 19.2;
const LOG_AT = [0.4, 4.8, 8.8, 11.6, 12.4, 14.8, 16.4];
const COUNT_FROM = 3.2;
const HOUR = 60;

export function run(root) {
  if (reduced) {
    register(root.closest('[data-section]'), { focus: root });
    return;
  }
  const data = JSON.parse(root.dataset.run);
  const railBox = root.querySelector('.map-run-rail');
  const rail = [...railBox.children];
  const panes = [...root.querySelectorAll('[data-pane]')];
  const approval = panes[4];
  const gate = approval.querySelector('[data-gate]');
  const button = approval.querySelector('[data-approve]');
  const count = root.querySelector('[data-count]');
  const number = root.querySelector('[data-number]');
  const list = root.querySelector('.map-run-log ol');
  const total = data.counts.reduce((sum, n) => sum + n, 0);

  function fill(row, entry, pass) {
    row.firstElementChild.textContent = shift(entry.time, pass * HOUR);
    row.lastElementChild.textContent = entry.text;
    return row;
  }

  function waitAtGate() {
    approval.classList.remove('is-approved');
    button.classList.remove('is-press');
    gate.classList.add('is-human');
    gate.textContent = data.waiting;
  }

  function setup() {
    settle(list);
    [...list.children].forEach((row, i) => fill(row, data.log[i], -1).classList.add('is-old'));
    rail.forEach((station) => station.classList.remove('is-on', 'is-done'));
    railBox.classList.remove('is-wipe');
    panes.forEach((pane) => pane.classList.remove('is-on'));
    number.textContent = data.number;
    count.textContent = total;
    waitAtGate();
  }

  function show(index, pass) {
    if (index === 0) {
      rail.forEach((station) => station.classList.remove('is-on', 'is-done'));
      railBox.classList.remove('is-wipe');
      [...list.children].forEach((row) => row.classList.add('is-old'));
      number.textContent = data.number + pass;
      waitAtGate();
    }
    if (index === 1) count.textContent = 0;
    rail.forEach((station, i) => {
      station.classList.toggle('is-done', i < index);
      station.classList.toggle('is-on', i === index);
    });
    rail[index].style.setProperty('--dur', `${(AT[index + 1] ?? WIPE) - AT[index]}s`);
    panes.forEach((pane, i) => pane.classList.toggle('is-on', i === index));
  }

  /* the oldest row leaves at the top and enters at the bottom as the new one */
  const log = (index, pass) => recycle(list, 'bottom', (row) => fill(row, data.log[index], pass).classList.remove('is-old'));

  function approve() {
    approval.classList.add('is-approved');
    gate.classList.remove('is-human');
    gate.textContent = data.approved;
  }

  const steps = [
    ...AT.map((at, index) => ({ at, name: panes[index].dataset.pane, run: (pass) => show(index, pass) })),
    ...LOG_AT.map((at, index) => ({ at, run: (pass) => log(index, pass) })),
    ...data.counts.map((_, index) => ({ at: COUNT_FROM + index * 0.4, run: () => { count.textContent = data.counts.slice(0, index + 1).reduce((sum, n) => sum + n, 0); } })),
    { at: 14.4, run: () => button.classList.add('is-press') },
    { at: 14.8, run: approve },
    { at: WIPE, run: () => railBox.classList.add('is-wipe') },
  ];

  setup();
  register(root.closest('[data-section]'), { focus: root, enter: ENTER, period: PERIOD, steps, reset: setup, slow: root });
}
