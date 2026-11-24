import { reduced, register } from '../../motion/loop.js';

/*
  Software Development showreel: five screens float in a dark studio, one camera moves through them.
  One pass = 28 s, all times on the 0.4 s grid. The script only sets data attributes on the mockup
  (shot = camera, focus = depth of field, chat / api / dash / app / note = state of one screen, wire = data line);
  CSS transitions do every move. tick() adds a slow camera drift from the loop clock.
  The first camera move starts 1.6 s after the section enters, so scrolling to it starts the film.
    0    chat   push in on the tablet (the entry and the end of each pass show the establishing shot):
                1.6 a message with the mention "@Lena" is typed, 3.2 sent, 3.6 the agent types, 4.4 its reply
    5.6  api    glide up to the API screen; 6.8 (camera clear of the other screens) a data line runs from the chat to its edge;
                8.4 the agent calls the API, 8.8 the request fans out to ERP and file server, 9.6 both answers return,
                10 the answer goes back to the agent and an entry is written to the CRM, 10.8 at rest; the log gains rows
   11.2  dash   glide to the desktop screen while a data line runs from the API to its edge;
                12.8 the new entry arrives and a figure steps, 13.6 the pointer moves, 14.4 it clicks "Monat", the chart re-draws
   16.4  app    push in on the phone: 18.4 tap on "Freigeben", 18.8 the invoice is approved
   20.8  duo    pull back to both phones; 22.4 a data line runs to the edge of the far one,
                23.2 rack focus to it, 24 the notification arrives
   25.2  wide   establishing shot with all five screens, the dashboard in focus, until the pass ends at 28
  Data lines run from bezel edge to bezel edge and are only switched on once the camera sees them clear of every screen face.
  Screens are reset while the camera is on another one, so the loop has no restart point.
  Astro renders the establishing shot with every screen in its final state: the reduced-motion still and the state without JS.
*/
const ENTER = 1.6;
const PERIOD = 28;
const DRIFT = [1.3, 0.7];
const TIMELINE = [
  [0, 'shot', 'chat'], [0, 'focus', 'chat'], [1.6, 'chat', 1], [2, 'app', 0], [2, 'note', 0], [3.2, 'chat', 2], [3.6, 'chat', 3], [4.4, 'chat', 4],
  [5.6, 'shot', 'api'], [5.6, 'focus', 'api'], [6.8, 'wire', 'chat'], [8.4, 'api', 1], [8.8, 'api', 2], [9.2, 'wire', ''], [9.6, 'api', 3], [10, 'api', 4], [10.8, 'api', 5],
  [11.2, 'shot', 'dash'], [11.2, 'focus', 'dash'], [11.2, 'wire', 'api'], [12.8, 'dash', 1], [13.6, 'dash', 2], [13.6, 'wire', ''], [14.4, 'dash', 3],
  [16.4, 'shot', 'app'], [16.4, 'focus', 'app'], [17.6, 'chat', 0], [18, 'api', 0], [18.4, 'app', 1], [18.8, 'app', 2], [19.2, 'dash', 0],
  [20.8, 'shot', 'duo'], [20.8, 'focus', 'duo'], [22.4, 'wire', 'app'], [23.2, 'focus', 'rack'], [24, 'note', 1], [24.8, 'wire', ''],
  [25.2, 'shot', 'wide'], [25.2, 'focus', 'wide'],
];
const START = { shot: 'wide', focus: 'wide', chat: 0, api: 0, dash: 0, app: 0, note: 0, wire: '' };

export function softwareDev(mockup) {
  const drift = mockup.querySelector('.sd-drift');
  const setup = () => Object.assign(mockup.dataset, START);

  function tick(t) {
    const turn = (2 * Math.PI * t) / PERIOD;
    drift.style.transform = `rotateY(${(DRIFT[0] * Math.sin(turn)).toFixed(3)}deg) rotateX(${(DRIFT[1] * Math.sin(2 * turn + 1)).toFixed(3)}deg)`;
  }

  if (!reduced) setup();
  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: PERIOD,
    steps: TIMELINE.map(([at, key, value]) => ({ at, name: key === 'shot' ? value : undefined, run: () => { mockup.dataset[key] = value; } })),
    tick,
    reset: setup,
    slow: mockup,
  });
}
