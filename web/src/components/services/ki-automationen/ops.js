import { register } from '../../../motion/loop.js';
import { PERIOD, STILL, dayAt } from './ops-model.js';

/*
  A day of operation, one pass = 14.4 s; one second is one hour (07:00 to 19:00). Every frame is derived from the
  clock alone (ops-model.js), so there are no steps besides the marker for CSS.
   -1.6  entry: the window rises (CSS); the day stands at 07:00
    0    the time line starts to cross the chart; the bar of the running hour fills (phthalo), the counters follow
         at their time an exception gets its marker in the lane and enters the queue with the white pill;
         1.8 s later it is approved (grey pill, the marker shrinks to a dot), 0.6 s later it leaves and the rows below move up
   12    the day is complete and stands
   14    the bars fold down; 14.4 = 0, the next day starts
  The seven queue rows and markers are fixed nodes; only their state and row change.
*/
const ENTER = 1.6;

export function ops(mockup) {
  const data = JSON.parse(mockup.dataset.day);
  const bars = [...mockup.querySelectorAll('.kap-ops-bars div')];
  const marks = [...mockup.querySelectorAll('.kap-ops-mark')];
  const items = [...mockup.querySelectorAll('.kap-ops-item')];
  const now = mockup.querySelector('.kap-ops-now');
  const clock = mockup.querySelector('[data-clock]');
  const counts = Object.fromEntries([...mockup.querySelectorAll('[data-count]')].map((el) => [el.dataset.count, el]));

  const write = (el, text) => { if (el.textContent !== text) el.textContent = text; };
  const state = (el, value) => { if (el.dataset.s !== value) el.dataset.s = value; };

  function render(t) {
    const day = dayAt(t, data);
    const current = Math.min(bars.length - 1, Math.floor(t));
    bars.forEach((bar, hour) => {
      bar.firstElementChild.style.transform = `scaleY(${day.bars[hour].toFixed(3)})`;
      bar.classList.toggle('is-now', hour === current && t < bars.length);
    });
    now.style.transform = `translateX(${(day.progress * 100).toFixed(2)}%)`;
    marks.forEach((mark, index) => state(mark, day.marks[index]));
    items.forEach((item, index) => {
      state(item, day.states[index]);
      const row = String(day.rows[index]);
      if (item.style.getPropertyValue('--r') !== row) item.style.setProperty('--r', row);
    });
    write(clock, day.clock);
    for (const key in counts) write(counts[key], String(day[key]));
  }

  render(0);
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD,
    steps: [{ at: 0, name: 'run' }],
    tick: (t) => render(Math.max(0, t)),
    reset: () => render(0),
    still: () => render(STILL),
    slow: mockup,
  });
}
