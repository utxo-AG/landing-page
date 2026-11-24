import { createBlocks } from './blocks.js';
import { intro, sequence } from './page.js';

const ACCENTS = { blau: '#2438F5', zinnober: '#FF4A1C', gruen: '#12A36B' };

async function main() {
  const blocks = await createBlocks(document.querySelector('[data-stage]'), { grey: '#8B9099', accent: ACCENTS.blau, rim: '#aab4ff' });
  document.querySelectorAll('[data-accent]').forEach((button) => button.addEventListener('click', () => {
    const value = ACCENTS[button.dataset.accent];
    blocks.setAccent(value);
    document.documentElement.style.setProperty('--accent', value);
    document.querySelectorAll('[data-accent]').forEach((b) => b.toggleAttribute('aria-current', b === button));
  }));
  window.__sceneReady = true;
  document.dispatchEvent(new Event('scene-ready'));
}

intro();
sequence();
main();
