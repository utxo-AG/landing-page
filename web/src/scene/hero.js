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

  Lite mode (.is-lite on <html>, rules in styles/base.css): without hardware acceleration the scene is not
  created at all, and a scene that cannot hold its frame rate in the second after its entry is given up
  (loop stopped, observers disconnected, WebGL context released). The stages then show the still wordmark
  and the panels simply appear (.is-still). On phones Hero.astro does not load this module at all.
*/
const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|basic render|mesa offscreen/i;
const ENTRY = 2600;
const SLOW = 40;

/* True where WebGL is missing or runs on the CPU. The probe context is released at once. */
function software() {
  const gl = document.createElement('canvas').getContext('webgl2', { failIfMajorPerformanceCaveat: true });
  if (!gl) return true;
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = `${gl.getParameter(gl.RENDERER)} ${info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : ''}`;
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return SOFTWARE.test(renderer);
}

/* Calls `then` if the page averages more than SLOW ms per frame in the second after the scene's entry (only measured while the tab stays visible). */
function whenSlow(then) {
  setTimeout(() => {
    let from = 0;
    let frames = 0;
    let watched = !document.hidden;
    const left = () => { watched = false; };
    document.addEventListener('visibilitychange', left, { once: true });
    requestAnimationFrame(function tick(now) {
      from ||= now;
      if (now - from < 1000) { frames++; requestAnimationFrame(tick); return; }
      document.removeEventListener('visibilitychange', left);
      if (watched && (now - from) / frames > SLOW) then();
    });
  }, ENTRY);
}

export function hero(stage) {
  const forced = import.meta.env.DEV && location.search.includes('scene=on');
  if (!forced && software()) { document.documentElement.classList.add('is-lite', 'is-still'); return; }
  const blocks = createBlocks(stage, { svg, maxPixelRatio: matchMedia('(max-width: 760px)').matches ? 1.5 : 2 });
  const closing = document.querySelector('[data-stage-return]');
  const panels = [...stage.querySelectorAll('.panel')];
  const ratio = new Map();
  let host = stage;
  const covered = () => Boolean(host.querySelector('.panel:not([hidden])'));
  const assemble = () => blocks.setAssembled(flow?.active || ((ratio.get(host) ?? 0) > 0.5 && !covered()));
  const flow = panels.length && !matchMedia('(prefers-reduced-motion: reduce)').matches ? createTypeflow(blocks, stage, panels, assemble) : null;
  if (import.meta.env.DEV) window.__typeflow = flow;
  const disclosed = () => {
    flow?.to((host === stage && panels.find((panel) => !panel.hidden && getComputedStyle(panel).position !== 'fixed')) || null);
    assemble();
  };
  document.addEventListener('disclosure', disclosed);
  const half = new IntersectionObserver((entries) => {
    entries.forEach((entry) => ratio.set(entry.target, entry.intersectionRatio));
    assemble();
  }, { threshold: [0, 0.5, 1] });
  half.observe(stage);
  const near = new IntersectionObserver(([entry]) => {
    host = entry.isIntersecting ? closing : stage;
    flow?.cancel();
    blocks.mount(host);
    assemble();
  }, { rootMargin: '100% 0px' });
  if (closing) {
    half.observe(closing);
    near.observe(closing);
  }
  if (!forced) whenSlow(() => {
    document.removeEventListener('disclosure', disclosed);
    half.disconnect();
    near.disconnect();
    flow?.destroy();
    blocks.destroy();
    document.documentElement.classList.add('is-lite', 'is-still');
  });
}
