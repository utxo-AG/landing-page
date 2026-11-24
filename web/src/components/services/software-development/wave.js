/* Load curve of the operations view: periodic over [0, 1), values between 0 (top) and 1 (bottom). Used at build time for the path and in the browser for the live point. */
const TAU = Math.PI * 2;

export function wave(x) {
  return 0.5 + 0.2 * Math.sin(TAU * 2 * x + 0.6) + 0.12 * Math.sin(TAU * 5 * x + 1.9) + 0.06 * Math.sin(TAU * 11 * x + 0.3);
}

/* requests per minute shown for a curve value */
export function rate(y) {
  return Math.round(620 - y * 420);
}
