/*
  Lists that never grow: the row at the far end leaves, is refilled and enters at the other end
  ('top' or 'bottom'), while the rows in between move by one row. Transforms and opacity only.
*/
const MOVE = 700;
const EASE = 'cubic-bezier(.35,0,0,1)';

export function recycle(list, end, fill) {
  const top = end === 'top';
  const row = top ? list.lastElementChild : list.firstElementChild;
  const shift = row.offsetHeight * (top ? -1 : 1);
  fill(row);
  if (top) list.prepend(row);
  else list.append(row);
  for (const item of list.children) {
    if (item !== row) item.animate([{ transform: `translateY(${shift}px)` }, { transform: 'none' }], { duration: MOVE, easing: EASE });
  }
  row.animate([{ opacity: 0, transform: `translateY(${shift * 0.5}px)` }, { opacity: 1, transform: 'none' }], { duration: MOVE, easing: EASE });
  return row;
}

export function settle(list) {
  list.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
}
