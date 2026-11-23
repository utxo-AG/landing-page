import svg from '../assets/wordmark-black.svg?raw';
import { createBlocks } from './blocks.js';

export function hero(stage) {
  const blocks = createBlocks(stage, { svg, maxPixelRatio: matchMedia('(max-width: 760px)').matches ? 1.5 : 2 });
  new IntersectionObserver(([e]) => blocks.setAssembled(e.intersectionRatio > 0.5), { threshold: [0, 0.5, 1] }).observe(stage);
  stage.classList.add('is-live');
}
