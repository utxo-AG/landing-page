import { createBlocks } from './blocks.js';
import { backdrop, contactMenu, reveal, sequence } from './page.js';

async function main() {
  const stage = document.querySelector('[data-stage]');
  const blocks = await createBlocks(stage, { layers: 3, fill: 1, radius: 0, solid: true, light: '#ffffff', background: null, pulseEvery: 7, pulseTime: 4, sway: 1, zoom: 1.16, fadeIn: true, assembleTime: 1.5 });
  new IntersectionObserver(([e]) => blocks.setAssembled(e.intersectionRatio > 0.5), { threshold: [0, 0.5, 1] }).observe(stage);
  document.body.classList.add('is-ready');
}

backdrop();
contactMenu();
reveal();
sequence();
main();
