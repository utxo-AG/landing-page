import { register } from '../../motion/loop.js';

/*
  Software Development film: a title card and five scenes, one pass = 20.8 s, all times on the 0.4 s grid.
  The script only sets data-scene and data-beat on the mockup; CSS transitions do every move.
   -2.4  entry: the frame rises, the title card sets itself
    0    intro     "00": label, title (masked line rise) and one line, nothing else in the frame
    2.8  workflow  the title leaves upward, the five cards rise into place: requirement and four steps,
                   the lines draw, the approval path lights up
    6.4  web       the steps become the four figures of a web application that opens around them
   10    mobile    the application moves aside, the open approvals move into a phone;
                   +1.6 "Freigeben" is pressed, +2.0 the request leaves and the count drops
   13.6  api       application and phone close; the figures become the connected systems around the API
   17.2  release   the systems line up as the pipeline, stage after stage completes;
                   the test counter runs from +0.6 to +1.4
   20.8  = 0: the pipeline cards fade out on their way back to the workflow places while the title sets
  Five cards (requirement and four steps) stay on screen from workflow to release and only change place and text.
  Astro renders the web scene, which is the reduced-motion still and the state without JS.
*/
const ENTER = 2.4;
const BEATS = [1.6, 2];
const COUNT_FROM = 0.6;
const COUNT_FOR = 0.8;

export function softwareDev(mockup) {
  const film = JSON.parse(mockup.dataset.film);
  const still = mockup.dataset.scene;
  const counter = mockup.querySelector('[data-count]');
  const total = Number(counter.dataset.count);
  let shown = total;
  let counting = 0;
  let period = 0;

  const show = (scene, beat = 0) => { mockup.dataset.scene = scene; mockup.dataset.beat = beat; };
  const count = (value) => { if (value !== shown) counter.textContent = shown = value; };

  const steps = [{ at: -ENTER, run: () => show(film[0][0]) }];
  for (const [scene, seconds] of film) {
    const start = period;
    if (scene === 'release') counting = start + COUNT_FROM;
    steps.push({ at: start, name: scene, run: () => show(scene) });
    BEATS.forEach((at, beat) => steps.push({ at: start + at, run: () => { mockup.dataset.beat = beat + 1; } }));
    period += seconds;
  }

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period,
    steps,
    tick: (t) => count(Math.round(total * Math.min(1, Math.max(0, (t - counting) / COUNT_FOR)))),
    reset: () => show('idle'),
    still: () => { show(still, BEATS.length); count(total); },
    slow: mockup,
  });
  if (!mockup.closest('.is-in')) show('idle');
}
