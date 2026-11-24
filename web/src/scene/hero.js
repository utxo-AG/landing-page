import svg from '../assets/wordmark-black.svg?raw';
import { createBlocks } from './blocks.js';

/*
  One wordmark scene for the page. It lives in the hero stage; when the closing stage ([data-stage-return])
  comes within one viewport the canvas moves there and back on the way up. In each stage the wordmark
  is assembled while more than half of the stage is visible and no header panel is open inside it.
*/
export function hero(stage) {
  const blocks = createBlocks(stage, { svg, maxPixelRatio: matchMedia('(max-width: 760px)').matches ? 1.5 : 2 });
  const closing = document.querySelector('[data-stage-return]');
  const ratio = new Map();
  let host = stage;
  const covered = () => Boolean(host.querySelector('.panel:not([hidden])'));
  const assemble = () => blocks.setAssembled((ratio.get(host) ?? 0) > 0.5 && !covered());
  document.addEventListener('disclosure', assemble);
  const half = new IntersectionObserver((entries) => {
    entries.forEach((entry) => ratio.set(entry.target, entry.intersectionRatio));
    assemble();
  }, { threshold: [0, 0.5, 1] });
  half.observe(stage);
  if (!closing) return;
  half.observe(closing);
  new IntersectionObserver(([entry]) => {
    host = entry.isIntersecting ? closing : stage;
    blocks.mount(host);
    assemble();
  }, { rootMargin: '100% 0px' }).observe(closing);
}
