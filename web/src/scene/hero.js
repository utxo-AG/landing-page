import svg from '../assets/wordmark-black.svg?raw';
import { createBlocks } from './blocks.js';
import { createTypeflow } from './typeflow.js';

/*
  One wordmark scene for the page. It lives in the hero stage; when the closing stage ([data-stage-return])
  comes within one viewport the canvas moves there and back on the way up. In each stage the wordmark
  is assembled while more than half of the stage is visible and no header panel is open inside it.
  A panel inside the hero stage is formed from the wordmark's fragments, and one panel from the other's
  (scene/typeflow.js), when the wordmark is whole and the panels' shapes are prepared; otherwise, for the
  full-screen phone menu and with reduced motion the wordmark dissolves and the panel fades in.
*/
export function hero(stage) {
  const blocks = createBlocks(stage, { svg, maxPixelRatio: matchMedia('(max-width: 760px)').matches ? 1.5 : 2 });
  const closing = document.querySelector('[data-stage-return]');
  const panels = [...stage.querySelectorAll('.panel')];
  const ratio = new Map();
  let host = stage;
  const covered = () => Boolean(host.querySelector('.panel:not([hidden])'));
  const assemble = () => blocks.setAssembled(flow?.active || ((ratio.get(host) ?? 0) > 0.5 && !covered()));
  const flow = panels.length && !matchMedia('(prefers-reduced-motion: reduce)').matches ? createTypeflow(blocks, stage, panels, assemble) : null;
  if (import.meta.env.DEV) window.__typeflow = flow;
  document.addEventListener('disclosure', () => {
    flow?.to((host === stage && panels.find((panel) => !panel.hidden && getComputedStyle(panel).position !== 'fixed')) || null);
    assemble();
  });
  const half = new IntersectionObserver((entries) => {
    entries.forEach((entry) => ratio.set(entry.target, entry.intersectionRatio));
    assemble();
  }, { threshold: [0, 0.5, 1] });
  half.observe(stage);
  if (!closing) return;
  half.observe(closing);
  new IntersectionObserver(([entry]) => {
    host = entry.isIntersecting ? closing : stage;
    flow?.cancel();
    blocks.mount(host);
    assemble();
  }, { rootMargin: '100% 0px' }).observe(closing);
}
