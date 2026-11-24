import { register } from '../../../motion/loop.js';

/*
  Three channels, one task list. One pass = 14.4 s = three windows of 4.8 s, all times on the 0.4 s grid.
  Per window (offset from its start):
   0    the window lifts, the CoWorker's reply is taken back and she is typing; its row shows the state before the reply
   1.6  her reply appears
   2.4  a dot runs down the wire to the task list
   3.2  the row of this channel takes the state after the reply
   4.4  the window settles
  Only the window in turn changes, the other two keep their finished state, so the picture has no restart.
*/
const ENTER = 2;
const SLOT = 4.8;

export function channels(mockup) {
  const windows = [...mockup.querySelectorAll('[data-win]')];
  const wires = [...mockup.querySelectorAll('.acp-ch-wire')];
  const rows = [...mockup.querySelectorAll('[data-row]')];

  function setup() {
    windows.forEach((win) => win.classList.remove('is-on', 'is-typing'));
    wires.forEach((wire) => wire.classList.remove('is-on'));
    rows.forEach((row) => { row.dataset.state = 'after'; });
  }

  const steps = windows.flatMap((win, index) => {
    const at = index * SLOT;
    return [
      { at, name: 'ask', run: () => { win.classList.add('is-on', 'is-typing'); rows[index].dataset.state = 'before'; } },
      { at: at + 1.6, name: 'reply', run: () => win.classList.remove('is-typing') },
      { at: at + 2.4, run: () => wires[index].classList.add('is-on') },
      { at: at + 3.2, name: 'list', run: () => { wires[index].classList.remove('is-on'); rows[index].dataset.state = 'after'; } },
      { at: at + 4.4, run: () => win.classList.remove('is-on') },
    ];
  });

  register(mockup.closest('[data-section]'), {
    focus: mockup,
    enter: ENTER,
    period: windows.length * SLOT,
    steps,
    reset: setup,
    slow: mockup,
  });
}
