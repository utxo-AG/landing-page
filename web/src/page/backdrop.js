export function backdrop() {
  let queued = false;
  const update = () => {
    queued = false;
    const range = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--sp', range > 0 ? (scrollY / range).toFixed(4) : '0');
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}
