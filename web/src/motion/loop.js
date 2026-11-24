/*
  Loop controller: one place that decides when a section enters, plays, pauses and resets.

  register(root, {
    enter,   seconds the entry takes; the loop clock starts at -enter and steps begin at 0
    period,  seconds per loop pass; 0 or omitted means no loop (reveal only)
    steps,   [{ at, name, run(cycle) }] fired when the clock passes `at`; `name` is set as data-step on root
    tick,    (t, cycle) called every frame while playing, for continuous movers
    still,   () sets the reduced-motion frame, called once instead of everything else
    reset,   () restores the initial state after the section left the viewport
    slow,    element that slows the clock while a mouse hovers it
    focus,   element whose visibility ranks this section against the others (default: root);
             mockups pass the mockup itself, so the one that fills the screen plays
  })

  Rules: enter at 35 % visible, pause below 10 %, reset when fully out, pause in a hidden tab,
  only the most visible looping section plays. Visibility is measured against the smaller of
  section height and viewport height, so sections taller than the screen still enter.
  The controller sets .is-in on root; CSS does all easing.
*/
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const ENTER_AT = 0.35;
const PAUSE_BELOW = 0.1;
const HOVER_RATE = 0.35;
const MAX_FRAME = 0.1;
const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

const items = new Map();
let active = null;
let frame = 0;
let last = 0;

function fire(item, step) {
  if (step.name) item.root.dataset.step = step.name;
  step.run?.(item.cycle);
}

function advance(item, dt) {
  item.t += dt * item.rate;
  for (;;) {
    while (item.next < item.steps.length && item.steps[item.next].at <= item.t) fire(item, item.steps[item.next++]);
    if (!item.period || item.t < item.period) break;
    item.t -= item.period;
    item.next = 0;
    item.cycle++;
  }
  item.tick?.(item.t, item.cycle);
}

function run(now) {
  frame = 0;
  if (!active) return;
  advance(active, Math.min(MAX_FRAME, (now - last) / 1000));
  last = now;
  frame = requestAnimationFrame(run);
}

function choose() {
  active = null;
  if (!document.hidden) {
    for (const item of new Set(items.values())) {
      if (item.entered && item.clocked && item.rank >= PAUSE_BELOW && (!active || item.rank > active.rank)) active = item;
    }
  }
  if (active && !frame) {
    last = performance.now();
    frame = requestAnimationFrame(run);
  }
}

function visibleShare(entry) {
  const viewport = entry.rootBounds?.height ?? innerHeight;
  return entry.isIntersecting ? entry.intersectionRect.height / Math.min(entry.boundingClientRect.height, viewport) : 0;
}

const observer = reduced ? null : new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const item = items.get(entry.target);
    const ratio = visibleShare(entry);
    if (entry.target === item.focus) item.rank = ratio;
    if (entry.target !== item.root) continue;
    item.ratio = ratio;
    if (!item.entered && item.ratio >= ENTER_AT) {
      item.entered = true;
      item.t = -item.enter;
      item.next = 0;
      item.cycle = 0;
      item.root.classList.add('is-in');
    } else if (item.entered && !entry.isIntersecting) {
      item.entered = false;
      item.root.classList.remove('is-in');
      delete item.root.dataset.step;
      item.reset?.();
    }
  }
  choose();
}, { threshold: THRESHOLDS });

if (!reduced) document.addEventListener('visibilitychange', choose);

/* true once a root is registered (reduced motion: once it got its .is-in) */
export function registered(root) {
  return items.has(root) || root.classList.contains('is-in');
}

export function register(root, { enter = 0, period = 0, steps = [], tick, still, reset, slow, focus = root } = {}) {
  if (reduced) {
    root.classList.add('is-in');
    still?.();
    return { jump() {} };
  }
  const item = {
    root, focus, enter, period, tick, reset,
    steps: [...steps].sort((a, b) => a.at - b.at),
    clocked: period > 0 || Boolean(tick),
    entered: false, ratio: 0, rank: 0, t: 0, next: 0, cycle: 0, rate: 1,
  };
  items.set(root, item);
  observer.observe(root);
  if (focus !== root) {
    items.set(focus, item);
    observer.observe(focus);
  }
  if (slow) {
    slow.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') item.rate = HOVER_RATE; });
    slow.addEventListener('pointerleave', () => { item.rate = 1; });
  }
  return {
    jump(name) {
      const index = item.steps.findIndex((step) => step.name === name);
      if (index < item.next) return;
      item.t = item.steps[index].at;
      item.next = index;
    },
  };
}
