import { formatNumber } from '../../page/format.js';
import { register } from '../../motion/loop.js';
import { START, STILL, countAt, lifeOf, placeAt, plan, sincePass, stateAt, tokenAt, waitingAt } from './automation-model.js';

/*
  KI-Automationen conveyor. No loop period: every frame is derived from the clock alone (automation-model.js).
  Entry (2.4 s, CSS): 0 the systems plate rises, 0.3 the conveyor plate, labels follow, 1.2 wires and counters,
  1.3 the cases fade in; the conveyor stands at START and accelerates to full speed during the last second.
  Conveyor (clock c):
   every 1.6 s  a flat case leaves "Eingang"; 9 s to the end of the line, where the counter adds one
   1.8 s        "Lesen": first marking          3.6 s  "Prüfen": second marking
   5.4 s        "Buchen": the case rises to a cube   7.2 s  "Antwort": third marking
   every sixth  case turns onto the siding at "Prüfen" with an open marking, waits 2 s at "Ihre Freigabe"
                (the pill turns white), gets its marking and rejoins at "Buchen" 2.4 s late,
                centred between the two cases that follow it
   A pulse runs down a wire to the system below whenever a case passes the station.
  Eight case nodes are reused in turn (a case lives 11.4 s at most, a node is reused after 12.8 s).
*/
const ENTER = 2.4;
const RAMP = -2 * START;
const FADE = 0.4;
const PULSE = 0.8;

const clock = (t) => (t >= 0 ? t : START + Math.max(0, t + RAMP) ** 2 / (2 * RAMP));

export function automation(mockup) {
  const { geo, total, number } = JSON.parse(mockup.dataset.flow);
  const flow = plan(geo);
  const cases = [...mockup.querySelectorAll('.au-case')];
  const wires = [...mockup.querySelectorAll('.au-wire')];
  const gate = mockup.querySelector('.au-gate');
  const waitingCount = mockup.querySelector('[data-count="waiting"]');
  const totalCount = mockup.querySelector('[data-count="total"]');

  const write = (el, text) => { if (el.textContent !== text) el.textContent = text; };

  function render(c) {
    cases.forEach((el, slot) => {
      const { held, age, alive } = tokenAt(c, slot);
      const shown = alive ? Math.min(1, age / FADE, (lifeOf(held) - age) / FADE).toFixed(2) : '0';
      if (el.style.getPropertyValue('--o') !== shown) el.style.setProperty('--o', shown);
      const state = alive ? stateAt(age, held, flow) : '';
      if (el.dataset.s !== state) el.dataset.s = state;
      if (!alive) return;
      const [x, y] = placeAt(age, held, flow);
      el.style.transform = `translate3d(calc(${x.toFixed(2)} * var(--u)),calc(${y.toFixed(2)} * var(--u)),0)`;
    });
    wires.forEach((wire, index) => wire.classList.toggle('is-on', sincePass(c, index, flow) < PULSE));
    const waiting = waitingAt(c, flow);
    gate.classList.toggle('is-human', waiting);
    write(waitingCount, waiting ? '1' : '0');
    write(totalCount, formatNumber(countAt(c, total), number));
  }

  render(START);
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    steps: [{ at: 0, name: 'run' }],
    tick: (t) => render(clock(t)),
    reset: () => render(START),
    still: () => render(STILL),
    slow: mockup,
  });
}
