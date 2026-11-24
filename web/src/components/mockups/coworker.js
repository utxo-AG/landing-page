import { register } from '../../motion/loop.js';

/*
  Agentic CoWorker workspace, one pass = 24 s = three exchanges of 8 s, all times on the 0.4 s grid.
  The exchange that is rendered in the page is the first of the list; the loop continues with the next one.
  Per exchange (offset from its start):
   0    old messages above the visible thread are removed; the person starts typing
   0.8  the request appears; it mentions Lena, so her team row shows the typing state until she has answered
   1.6  Lena starts typing; 2.8 her answer with the question back appears
   4    her task appears in the week strip, the task of the exchange that comes next leaves it
   4.8  the person starts typing; 5.6 the reply appears
   6.4  Lena starts typing; 7.2 the result with the file row appears
  The feed is anchored to the bottom of the thread; every change of its height is played as a
  transform, so the thread moves upward and has no restart point.
*/
const ENTER = 2.4;
const EXCHANGE = 8;
const SCROLL = 700;
const EASE = 'cubic-bezier(.35,0,0,1)';

export function coworker(mockup) {
  const thread = mockup.querySelector('.cw-thread');
  const feed = mockup.querySelector('.cw-feed');
  const exchanges = [...mockup.querySelectorAll('[data-exchange]')].map((template) => [...template.content.children]);
  const tasks = [...mockup.querySelectorAll('[data-task]')].sort((a, b) => a.dataset.task - b.dataset.task);
  const row = mockup.querySelector('[data-coworker]');
  const initial = feed.innerHTML;
  let typing;

  function setup() {
    feed.getAnimations().forEach((animation) => animation.cancel());
    feed.innerHTML = initial;
    tasks.forEach((task, index) => task.classList.toggle('is-on', index === 0));
    row.classList.remove('is-called');
  }

  function grow(change) {
    const before = feed.offsetHeight;
    change();
    const delta = feed.offsetHeight - before;
    if (delta) feed.animate([{ transform: `translateY(${delta}px)` }, { transform: 'none' }], { duration: SCROLL, easing: EASE });
  }

  function prune() {
    while (feed.firstElementChild.offsetHeight <= feed.offsetHeight - thread.clientHeight) feed.firstElementChild.remove();
  }

  function type(message) {
    typing = message.cloneNode(true);
    typing.classList.add('is-new', 'is-typing');
    grow(() => feed.append(typing));
  }

  function show() {
    grow(() => typing.classList.remove('is-typing'));
  }

  function plan(index) {
    tasks[index].classList.add('is-on');
    tasks[(index + 1) % tasks.length].classList.remove('is-on');
  }

  const steps = exchanges.flatMap((_, slot) => {
    const index = (slot + 1) % exchanges.length;
    const [ask, answer, reply, delivery] = exchanges[index];
    const at = slot * EXCHANGE;
    return [
      { at, run: () => { prune(); type(ask); } },
      { at: at + 0.8, name: 'ask', run: () => { show(); row.classList.toggle('is-called', Boolean(typing.querySelector('.cw-mention'))); } },
      { at: at + 1.6, run: () => type(answer) },
      { at: at + 2.8, name: 'answer', run: () => { show(); row.classList.remove('is-called'); } },
      { at: at + 4, name: 'plan', run: () => plan(index) },
      { at: at + 4.8, run: () => type(reply) },
      { at: at + 5.6, name: 'reply', run: show },
      { at: at + 6.4, run: () => type(delivery) },
      { at: at + 7.2, name: 'deliver', run: show },
    ];
  });

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: exchanges.length * EXCHANGE,
    steps,
    reset: setup,
    slow: mockup.querySelector('.cw-win'),
  });
}
