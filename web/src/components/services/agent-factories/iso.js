/*
  Isometric drawing helpers for the visuals of this page (build time only, no DOM).
  World units, the same camera as the home scene: x runs to the upper right, y to the lower right, z up.
  camera(tilt) -> { kx, ky, kz }; projector(camera, ox, oy) -> (x, y, z) => [X, Y] in viewBox units;
  box() -> the three visible faces as polygon point strings; plane() -> SVG matrix of a horizontal plane,
  so flat drawings (markings) can be written in world units.
*/
export function camera(tilt) {
  const kx = Math.SQRT1_2;
  const angle = (tilt * Math.PI) / 180;
  return { kx, ky: Math.cos(angle) * kx, kz: Math.sin(angle) };
}

export function projector({ kx, ky, kz }, ox, oy) {
  return (x, y, z = 0) => [ox + kx * (x + y), oy + ky * (y - x) - kz * z];
}

export const points = (list) => list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

export function box(P, x, y, z, w, d, h) {
  return {
    top: points([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
    left: points([P(x, y, z + h), P(x, y + d, z + h), P(x, y + d, z), P(x, y, z)]),
    right: points([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)]),
  };
}

export function plane({ kx, ky }, [e, f]) {
  return `matrix(${kx.toFixed(4)} ${(-ky).toFixed(4)} ${kx.toFixed(4)} ${ky.toFixed(4)} ${e.toFixed(2)} ${f.toFixed(2)})`;
}
