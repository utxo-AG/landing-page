import * as THREE from 'three';

/*
  The wordmark turns into the content of a header panel and back, and one panel into the other (home: the
  contact panel and the menu panel inside the hero stage). One THREE.Points layer in the scene of blocks.js;
  every particle is animated in the vertex shader from buffers written before the click and a few uniforms,
  so a click only flips a goal.

  Forms:   0 is the wordmark, 1 and 2 are the panels. A particle has one place in each form.
  Wordmark: points on the wordmark mask of blocks.js: an even lattice on the front face, clipped to the logo
           outline while at rest, and about a third at random inside the body. The body itself stays on
           screen and is carved cell by cell (blocks.carve) in a wave from the left; the particles of a
           cell appear in the frame its cell is cut, so every cube of the body bursts into its fragments.
  Panels:  the hidden panel is laid out invisibly for one synchronous measurement. Text is measured word by
           word and drawn with the page font, icons (svg rect and path) are stroked from their own paths,
           both into a 2D canvas of the size of the drawing buffer; every covered pixel becomes one particle
           that lands on that pixel with its colour and coverage. Filled surfaces (the contact tiles) are
           not drawn: they are covered by a coarse grid of square particles in the surface's own colour and
           alpha, so a faint tile is a faint, even field of fragments and costs few particles.
           All forms share the particles; a panel that needs fewer lets the rest land invisibly.
  Pairing: every form is ordered in vertical strips, top to bottom, so neighbours stay neighbours and a
           panel is written from the left while the form before it erodes from the left.
  Flight:  in view space between the places the camera sees, so a landing is exact for any camera position;
           particles lift towards the camera, curve and tumble on the way. A flight runs from form a to
           form b; if a third form is asked for in mid-flight, the particles leave that flight for it from
           wherever they are (second stage), and may return into it.
  Hand-over, set on the stage for the CSS in Hero.astro and Panels.astro:
           data-flow="fly"  canvas stays visible, the open panel is laid out but invisible
           data-flow="type" the particles have landed: the panel itself fades in over them, then they go
  Buffers are rebuilt in idle time after fonts load and after every resize of the stage; until then
  `ready` is false and scene/hero.js falls back to the dissolve.

  createTypeflow(blocks, stage, panels, onEnd) with at most two panels returns
    to(panel)  fly to that panel, or with null back to the wordmark; onEnd() is called once the wordmark
               is whole again. Leaving a panel that had taken over, it draws at once, so the particles are
               on screen in the frame the panel disappears. Does nothing if a flight cannot start (not ready, wordmark not whole, panel
               covers the screen); the panel then fades in as without this layer
    cancel()   stop at once and leave the wordmark dissolved (resize, canvas moves to another stage);
               an open panel then simply shows itself
    seek(p, to, from)  development only: hold the flight from form `from` to form `to` at progress p
    ready, active, count (particles)
*/
const CAPACITY = 200000; // particles the buffers hold; above it the type is sampled more coarsely
const SURFACE = 30000; // particles spent on filled surfaces
const OPEN = 1.25; // seconds to a panel
const CLOSE = 1.1; // seconds back to the wordmark
const HOLD = 0.06; // seconds the landed particles stay under the panel that fades in
const FADE = 0.06; // seconds they take to go
const INSIDE = 0.3; // share of the particles that start inside the body
const INK = 24; // least coverage (0 to 255) of a pixel that gets a particle
const SLOT = 2 ** 20; // room for the index in a sort key
const SPREAD = 1.4; // how far the starts are spread, in flight durations
const WAVE = 0.62; // share of the start delay that runs from left to right
const OWN = 0.1; // share that is the particle's own
const FACE = 0.972; // brightness of the body's front
const CORE = 0.86; // brightness of a fragment from inside
const MARK = 0; // the wordmark's form

const vertexShader = `
#define SPREAD ${SPREAD}
#define OWN ${OWN}
#define FACE ${FACE}
// position: place on the wordmark (world). aTo1, aTo2: place in a panel (NDC) and size there (pixels).
// aInk1, aInk2: colour and alpha there. aSeed: delay of the particle's cell, two random numbers,
// brightness as a loose fragment.
attribute vec3 aTo1;
attribute vec3 aTo2;
attribute vec4 aInk1;
attribute vec4 aInk2;
attribute vec4 aSeed;
uniform vec3 uForms;
uniform vec2 uProgress;
uniform float uDist;
uniform float uScale;
uniform float uStart;
varying vec4 vInk;
varying vec3 vShard;
varying vec2 vRest;

void form(float id, vec3 home, out vec3 pos, out float size, out vec4 ink) {
  if (id < 0.5) {
    pos = home;
    size = uStart * uScale / -home.z;
    ink = vec4(vec3(FACE), 1.0);
    return;
  }
  vec3 to = id < 1.5 ? aTo1 : aTo2;
  pos = vec3(to.xy * uDist / vec2(projectionMatrix[0][0], projectionMatrix[1][1]), -uDist);
  size = to.z;
  ink = id < 1.5 ? aInk1 : aInk2;
}
// How firmly a particle still belongs to a form it has left by e (linear) or s (eased).
float grip(float id, float e, float s) {
  return id < 0.5 ? 1.0 - smoothstep(0.0, 0.2, e) : 1.0 - smoothstep(0.0, 0.6, s);
}
float started(float progress) {
  return progress * (1.0 + SPREAD) - aSeed.x * SPREAD;
}
float ease(float e) {
  return e * e * e * (e * (e * 6.0 - 15.0) + 10.0);
}
float arc(float s) {
  float a = sin(s * 3.14159265);
  return a * mix(1.0, a, s);
}
vec2 bend(vec2 way) {
  vec2 drift = vec2(sin(position.y * 0.9 + aSeed.x * 6.0), cos(position.x * 0.7 + aSeed.x * 4.0));
  return vec2(-way.y, way.x) * 0.16 + drift * 0.5 + (aSeed.yz - 0.5) * 0.25;
}
void main() {
  vec3 home = (viewMatrix * vec4(position, 1.0)).xyz;
  vec3 pa, pb, pc;
  float sa, sb, sc;
  vec4 ia, ib, ic;
  form(uForms.x, home, pa, sa, ia);
  form(uForms.y, home, pb, sb, ib);
  form(uForms.z, home, pc, sc, ic);
  float late = OWN * aSeed.y * SPREAD;
  float e1 = clamp(started(uProgress.x) - late, 0.0, 1.0);
  float e2 = clamp(started(uProgress.y) - late, 0.0, 1.0);
  float s1 = ease(e1);
  float s2 = ease(e2);
  float arc1 = arc(s1) * (1.0 - s2);
  float arc2 = arc(s2);
  vec3 between = mix(pa, pb, s1);
  vec3 pos = mix(between, pc, s2);
  pos.xy += bend(pb.xy - pa.xy) * arc1 + bend(pc.xy - between.xy) * arc2;
  pos.z += (arc1 + arc2) * (1.0 + 5.0 * fract(aSeed.x * 7.0) + 2.0 * aSeed.z);

  float second = step(-0.5, uForms.z);
  float keep = 1.0 - second * smoothstep(0.0, 0.6, s2);
  float ga = grip(uForms.x, e1, s1) * keep;
  float gb = grip(uForms.y, 1.0 - e1, 1.0 - s1) * keep;
  float gc = second * grip(uForms.z, 1.0 - e2, 1.0 - s2);
  float loose = max(0.0, 1.0 - ga - gb - gc);
  gl_PointSize = sa * ga + sb * gb + sc * gc + uStart * uScale / -pos.z * (0.45 + 0.75 * aSeed.y) * loose;
  vInk = ia * ga + ib * gb + ic * gc + vec4(vec3(aSeed.w), 1.0) * loose;
  float mark = ga * step(uForms.x, 0.5) + gb * step(uForms.y, 0.5) + gc * step(uForms.z, 0.5);
  vShard = vec3((arc1 + arc2) * (aSeed.z - 0.5) * 14.0, loose, mark);
  vRest = position.xy;

  // A particle is not drawn while its cell is part of the body (the same test as carved() below, a touch earlier).
  float left1 = started(uProgress.x);
  float left2 = started(uProgress.y);
  float done = (1.0 + OWN * SPREAD) + 0.001;
  bool inFirst = uForms.x < 0.5 ? left1 < -0.001 : uForms.y < 0.5 && left1 > done;
  bool body = second > 0.5 ? (uForms.z < 0.5 ? left2 > done : inFirst && left2 < -0.001) : inFirst;
  gl_Position = body ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * vec4(pos, 1.0);
}`;

const fragmentShader = `
uniform float uFade;
uniform float uStart;
uniform vec2 uExtent;
uniform sampler2D uMask;
varying vec4 vInk;
varying vec3 vShard;
varying vec2 vRest;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  vec2 at = vRest + vec2(p.x, -p.y) * uStart;
  float body = texture2D(uMask, vec2(at.x / uExtent.x + 0.5, 0.5 - at.y / uExtent.y)).r;
  float cut = mix(1.0, clamp((body - 0.5) / max(fwidth(body), 0.0001) + 0.5, 0.0, 1.0), vShard.z);
  float c = cos(vShard.x);
  float s = sin(vShard.x);
  vec2 q = vec2(c * p.x - s * p.y, s * p.x + c * p.y) * (abs(c) + abs(s));
  if (max(abs(q.x), abs(q.y)) > 0.5) discard;
  if (q.x * 0.8 + q.y * 0.6 > mix(1.0, 0.12, vShard.y)) discard;
  float light = mix(1.0, 0.6 + 0.4 * abs(cos(vShard.x * 0.7 + vRest.x * 9.0)), vShard.y);
  gl_FragColor = vec4(vInk.rgb * light, vInk.a * cut * uFade);
}`;

const idle = window.requestIdleCallback ?? ((task) => setTimeout(task, 60));

/* Indices of n points ordered in vertical strips of equal count, top to bottom within a strip (keys carry the index). */
function strips(xs, ys, n) {
  const keys = new Float64Array(n);
  for (let i = 0; i < n; i++) keys[i] = xs[i] * SLOT + i;
  keys.sort();
  const per = Math.ceil(n / Math.ceil(Math.sqrt(n) / 3));
  for (let rank = 0; rank < n; rank++) {
    const i = keys[rank] % SLOT;
    keys[rank] = (Math.floor(rank / per) * 65536 + ys[i]) * SLOT + i;
  }
  return keys.sort();
}

export function createTypeflow(blocks, stage, panels, onEnd) {
  const { camera, renderer, wordmark } = blocks;
  const canvas = renderer.domElement;
  const mask = wordmark.mask;
  const unit = wordmark.width / mask.width;

  const geometry = new THREE.BufferGeometry();
  const start = new Float32Array(CAPACITY * 3);
  const seed = new Float32Array(CAPACITY * 4);
  geometry.setAttribute('position', new THREE.BufferAttribute(start, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
  const sets = [1, 2].map((id) => {
    const set = { to: new Float32Array(CAPACITY * 3), ink: new Uint8Array(CAPACITY * 4), usable: false };
    geometry.setAttribute(`aTo${id}`, new THREE.BufferAttribute(set.to, 3));
    geometry.setAttribute(`aInk${id}`, new THREE.BufferAttribute(set.ink, 4, true));
    return set;
  });
  geometry.setDrawRange(0, 0);
  const uniforms = {
    uForms: { value: new THREE.Vector3(MARK, MARK, -1) },
    uProgress: { value: new THREE.Vector2() },
    uDist: { value: 1 },
    uScale: { value: 1 },
    uStart: { value: 0 },
    uFade: { value: 1 },
    uMask: { value: wordmark.texture },
    uExtent: { value: new THREE.Vector2(wordmark.width, wordmark.height) },
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthTest: false, depthWrite: false });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.visible = false;

  let ready = false;
  let warming = 0;
  let active = false;
  let paused = false;
  let landed = -1;
  /* The flight: `first` runs from form a to form b, `second` from wherever that stands to form c (-1: none). */
  let a = MARK;
  let b = MARK;
  let c = -1;
  const first = { progress: 0, goal: 0, speed: 0 };
  const second = { progress: 0, goal: 0, speed: 0 };

  const cellDelay = Float32Array.from({ length: wordmark.cols * wordmark.rows }, (_, i) => WAVE * ((i % wordmark.cols) / wordmark.cols) + (1 - WAVE - OWN) * Math.random());
  const cut = new Uint8Array(cellDelay.length);
  let solid = null;
  let inside = null;
  function wordmarkPixels() {
    const data = mask.getContext('2d').getImageData(0, 0, mask.width, mask.height).data;
    solid = new Uint8Array(mask.width * mask.height);
    let n = 0;
    for (let i = 0; i < solid.length; i++) if (data[i * 4 + 3] > 128) { solid[i] = 1; n++; }
    inside = new Uint32Array(n);
    for (let i = 0, k = 0; i < solid.length; i++) if (solid[i]) inside[k++] = i;
  }

  /* What a laid-out panel shows, with places in the viewport (CSS px): words, icons and filled surfaces. */
  function contents(panel) {
    const words = [];
    const icons = [];
    const surfaces = [];
    const range = document.createRange();
    const walker = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const style = getComputedStyle(node.parentElement);
      for (const match of node.data.matchAll(/\S+/g)) {
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const box = range.getBoundingClientRect();
        if (!box.width) continue;
        words.push({ text: style.textTransform === 'uppercase' ? match[0].toUpperCase() : match[0], x: box.left, top: box.top, font: style.font, spacing: style.letterSpacing, color: style.color });
      }
    }
    for (const svg of panel.querySelectorAll('svg')) {
      const box = svg.getBoundingClientRect();
      if (!box.width) continue;
      const style = getComputedStyle(svg);
      const path = new Path2D();
      for (const shape of svg.querySelectorAll('rect, path')) {
        if (shape.tagName === 'path') path.addPath(new Path2D(shape.getAttribute('d')));
        else path.roundRect(shape.x.baseVal.value, shape.y.baseVal.value, shape.width.baseVal.value, shape.height.baseVal.value, shape.rx.baseVal.value);
      }
      icons.push({ path, x: box.left, y: box.top, scale: box.width / svg.viewBox.baseVal.width, width: parseFloat(style.strokeWidth), cap: style.strokeLinecap, join: style.strokeLinejoin, color: style.color });
    }
    for (const element of panel.querySelectorAll('*')) {
      const style = getComputedStyle(element);
      const [red, green, blue, alpha = 1] = style.backgroundColor.match(/[\d.]+/g).map(Number);
      const box = element.getBoundingClientRect();
      if (alpha && box.width) surfaces.push({ box, radius: parseFloat(style.borderTopLeftRadius), red, green, blue, alpha });
    }
    return { words, icons, surfaces };
  }

  function measure(panel) {
    panel.classList.add('is-measuring');
    const box = canvas.getBoundingClientRect();
    const found = getComputedStyle(panel).position === 'fixed' ? null : { ...contents(panel), origin: { x: Math.round(box.left * devicePixelRatio) / devicePixelRatio, y: Math.round(box.top * devicePixelRatio) / devicePixelRatio } };
    panel.classList.remove('is-measuring');
    return found;
  }

  /*
    Words and icons as pixels of the drawing buffer, `grain` buffer pixels per sample. The 2D canvas is in the
    document while it draws, so its text takes the page's font smoothing and has the weight of the real text.
    Baselines are placed as the browser does: the ascent of the font at its device size and the position,
    rounded to device pixels; the canvas itself is shown from the nearest whole device pixel (`origin`).
  */
  const sheet = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  sheet.canvas.hidden = true;
  function drawn({ words, icons, origin }, grain) {
    document.body.append(sheet.canvas);
    const width = Math.ceil(canvas.width / grain);
    const height = Math.ceil(canvas.height / grain);
    sheet.canvas.width = width;
    sheet.canvas.height = height;
    sheet.setTransform(renderer.getPixelRatio() / grain, 0, 0, renderer.getPixelRatio() / grain, 0, 0);
    for (const word of words) {
      sheet.letterSpacing = word.spacing === 'normal' ? '0px' : word.spacing;
      sheet.fillStyle = word.color;
      sheet.font = word.font.replace(/[\d.]+(?=px)/, (size) => size * devicePixelRatio);
      const ascent = Math.round(sheet.measureText(word.text).fontBoundingBoxAscent);
      sheet.font = word.font;
      sheet.fillText(word.text, word.x - origin.x, Math.round(word.top * devicePixelRatio + ascent) / devicePixelRatio - origin.y);
    }
    for (const icon of icons) {
      sheet.save();
      sheet.translate(icon.x - origin.x, icon.y - origin.y);
      sheet.scale(icon.scale, icon.scale);
      sheet.lineWidth = icon.width;
      sheet.lineCap = icon.cap;
      sheet.lineJoin = icon.join;
      sheet.strokeStyle = icon.color;
      sheet.stroke(icon.path);
      sheet.restore();
    }
    const data = new Uint32Array(sheet.getImageData(0, 0, width, height).data.buffer);
    sheet.canvas.remove();
    let n = 0;
    for (let i = 0; i < data.length; i++) if (data[i] >>> 24 >= INK) n++;
    return { data, width, height, grain, n };
  }

  /* A rectangle of whole buffer pixels tiled exactly with squares of at most `grain` pixels: the grid first, then what is left at the right and below with smaller ones. */
  function squares(x, y, width, height, grain, each) {
    if (width < 1 || height < 1) return;
    const side = Math.min(grain, width, height);
    const cols = Math.floor(width / side);
    const rows = Math.floor(height / side);
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) each(x + (col + 0.5) * side, y + (row + 0.5) * side, side);
    squares(x + cols * side, y, width - cols * side, rows * side, side, each);
    squares(x, y + rows * side, width, height - rows * side, side, each);
  }

  /* A filled surface as squares of its colour inside its rounded outline, edges on device pixels as the browser paints them. */
  function tiles({ box, radius, red, green, blue, alpha }, origin, grain, each) {
    const ratio = renderer.getPixelRatio();
    const left = Math.round((box.left - origin.x) * ratio);
    const top = Math.round((box.top - origin.y) * ratio);
    const width = Math.round((box.right - origin.x) * ratio) - left;
    const height = Math.round((box.bottom - origin.y) * ratio) - top;
    const round = radius * ratio;
    const color = ((Math.round(alpha * 255) << 24) | (blue << 16) | (green << 8) | red) >>> 0;
    squares(0, 0, width, height, grain, (x, y, side) => {
      const dx = Math.max(round - x, x - (width - round), 0);
      const dy = Math.max(round - y, y - (height - round), 0);
      if (dx * dx + dy * dy <= round * round) each(left + x, top + y, side, color);
    });
  }

  /* All samples of a panel: place (buffer pixels), size and colour of every particle it needs. */
  function sample(found) {
    let type = drawn(found, 1);
    for (let grain = 2; type.n > CAPACITY - 2 * SURFACE; grain *= 2) type = drawn(found, grain);
    const area = found.surfaces.reduce((sum, { box }) => sum + box.width * box.height, 0) * renderer.getPixelRatio() ** 2;
    const coarse = Math.max(2, Math.ceil(Math.sqrt(area / SURFACE)));
    let n = type.n;
    for (const surface of found.surfaces) tiles(surface, found.origin, coarse, () => n++);
    const x = new Float32Array(n);
    const y = new Float32Array(n);
    const size = new Uint8Array(n);
    const pixel = new Uint32Array(n);
    let k = 0;
    const add = (px, py, grain, color) => { x[k] = px; y[k] = py; size[k] = grain; pixel[k++] = color; };
    for (const surface of found.surfaces) tiles(surface, found.origin, coarse, add);
    for (let row = 0, i = 0; row < type.height; row++) for (let col = 0; col < type.width; col++, i++) if (type.data[i] >>> 24 >= INK) add((col + 0.5) * type.grain, (row + 0.5) * type.grain, type.grain, type.data[i]);
    return { x, y, size, pixel, n };
  }

  /* Places on the wordmark (mask pixels) for n particles: an even lattice on the front face, the rest at random inside the body. */
  function marks(n) {
    const x = new Uint16Array(n);
    const y = new Uint16Array(n);
    const pitch = Math.sqrt(inside.length / (n * (1 - INSIDE)));
    let faces = 0;
    for (let py = pitch / 2; py < mask.height; py += pitch) for (let px = pitch / 2; px < mask.width && faces < n; px += pitch) {
      if (!solid[Math.floor(py) * mask.width + Math.floor(px)]) continue;
      x[faces] = px;
      y[faces++] = py;
    }
    for (let k = faces; k < n; k++) {
      const at = inside[Math.floor(Math.random() * inside.length)];
      x[k] = at % mask.width;
      y[k] = at / mask.width;
    }
    return { x, y, faces, pitch, order: strips(x, y, n) };
  }

  /* A panel's samples spread over n particles in strip order; particles beyond its own samples share a place and land invisibly. */
  function spread(samples, n) {
    const source = new Uint32Array(n);
    const x = new Uint16Array(n);
    const y = new Uint16Array(n);
    for (let k = 0; k < n; k++) {
      source[k] = k < samples.n ? k : Math.floor(Math.random() * samples.n);
      x[k] = samples.x[source[k]];
      y[k] = samples.y[source[k]];
    }
    return { source, order: strips(x, y, n) };
  }

  function write(mark, spreads, samples, n) {
    for (let k = 0; k < n; k++) {
      const m = mark.order[k] % SLOT;
      const face = m < mark.faces;
      start[k * 3] = (mark.x[m] + (face ? 0.5 : Math.random())) * unit - wordmark.width / 2;
      start[k * 3 + 1] = (mask.height / 2 - mark.y[m] - (face ? 0.5 : Math.random())) * unit;
      start[k * 3 + 2] = wordmark.front - (face ? 0 : Math.random() * wordmark.depth);
      seed[k * 4] = cellDelay[Math.floor(mark.y[m] / wordmark.cell) * wordmark.cols + Math.floor(mark.x[m] / wordmark.cell)];
      seed[k * 4 + 1] = Math.random();
      seed[k * 4 + 2] = Math.random();
      seed[k * 4 + 3] = face ? FACE : CORE;
    }
    sets.forEach((set, i) => {
      set.usable = Boolean(samples[i]);
      if (!set.usable) return;
      const { x, y, size, pixel } = samples[i];
      const { source, order } = spreads[i];
      for (let k = 0; k < n; k++) {
        const rank = order[k] % SLOT;
        const s = source[rank];
        set.to[k * 3] = (x[s] / canvas.width) * 2 - 1;
        set.to[k * 3 + 1] = 1 - (y[s] / canvas.height) * 2;
        set.to[k * 3 + 2] = size[s];
        set.ink[k * 4] = pixel[s] & 255;
        set.ink[k * 4 + 1] = (pixel[s] >>> 8) & 255;
        set.ink[k * 4 + 2] = (pixel[s] >>> 16) & 255;
        set.ink[k * 4 + 3] = rank < samples[i].n ? pixel[s] >>> 24 : 0;
      }
    });
    for (const attribute of Object.values(geometry.attributes)) attribute.needsUpdate = true;
    geometry.setDrawRange(0, n);
    uniforms.uStart.value = mark.pitch * unit * 2.2;
    warming = 1;
    points.visible = true;
    uniforms.uFade.value = 0;
    uniforms.uForms.value.set(MARK, 1, -1);
    uniforms.uProgress.value.set(0.5, 0);
  }

  /*
    Rebuild the buffers, one idle slice per step; a newer run (resize, fonts) drops an older one. It waits
    until the stage has finished its entry and the panels are closed; a panel that covers the screen (the
    menu on phones) gets no form. The first frame after the last step draws the layer once, in flight and
    fully transparent, so shader and buffers are on the GPU before the first click; then `ready` is true.
  */
  let run = 0;
  let timer = 0;
  function rebuild() {
    cancel();
    ready = false;
    warming = 0;
    points.visible = false;
    const mine = ++run;
    const found = [];
    const samples = [];
    const spreads = [];
    let mark;
    let n = 0;
    const steps = [
      () => {
        if (panels.some((panel) => !panel.hidden) || !document.documentElement.classList.contains('is-ready') || getComputedStyle(stage).transform !== 'none') { timer = setTimeout(rebuild, 400); return false; }
        if (!inside) wordmarkPixels();
      },
      ...panels.flatMap((panel, i) => [
        () => { found[i] = measure(panel); },
        () => {
          samples[i] = found[i] && sample(found[i]);
          if (samples[i] && !samples[i].n) samples[i] = null;
          n = Math.min(CAPACITY, Math.max(n, samples[i]?.n ?? 0));
        },
      ]),
      () => {
        if (!n) return false;
        mark = marks(n);
      },
      ...panels.map((panel, i) => () => { spreads[i] = samples[i] && spread(samples[i], n); }),
      () => write(mark, spreads, samples, n),
    ];
    const next = () => idle(() => { if (mine === run && steps.shift()() !== false && steps.length) next(); });
    clearTimeout(timer);
    timer = setTimeout(next, 200);
  }
  document.fonts.ready.then(() => new ResizeObserver(rebuild).observe(stage));

  /* True once a cell is cut out of the body: one of its particles has left and not all are back. */
  function carved(delay) {
    const left1 = first.progress * (1 + SPREAD) - delay * SPREAD;
    const left2 = second.progress * (1 + SPREAD) - delay * SPREAD;
    const done = 1 + OWN * SPREAD;
    if (c === MARK) return left2 < done;
    const inFirst = a === MARK ? left1 <= 0 : b === MARK && left1 >= done;
    return !(inFirst && left2 <= 0);
  }

  function show() {
    points.visible = true;
    uniforms.uFade.value = 1;
    landed = -1;
  }

  function advance(flight, dt) {
    const rate = (flight.goal ? 1 : -1) / ((flight.goal ? (flight === first ? b : c) : a) === MARK ? CLOSE : OPEN);
    flight.speed += (rate - flight.speed) * Math.min(1, dt * 14);
    flight.progress = Math.min(1, Math.max(0, flight.progress + flight.speed * dt));
    if (flight.progress === flight.goal) flight.speed = 0;
  }

  function sync() {
    uniforms.uForms.value.set(a, b, c);
    uniforms.uProgress.value.set(first.progress, second.progress);
    for (let i = 0; i < cut.length; i++) cut[i] = carved(cellDelay[i]) ? 255 : 0;
    blocks.carve(cut);
  }

  function frame(dt) {
    uniforms.uDist.value = camera.position.length();
    uniforms.uScale.value = camera.projectionMatrix.elements[5] * canvas.height / 2;
    if (warming) {
      if (warming++ === 2) { points.visible = false; warming = 0; ready = true; }
      return;
    }
    if (!active) return;
    if (!paused) {
      if (c < 0 || !second.goal) advance(first, dt);
      if (c >= 0) {
        advance(second, dt);
        if (second.progress === 1) { a = c; first.progress = 0; first.goal = 0; }
        if (second.progress === second.goal) { c = -1; second.progress = 0; second.goal = 0; }
      }
    }
    sync();
    if (paused || c >= 0 || first.progress !== first.goal) return;
    if ((first.goal ? b : a) === MARK) { finish(true); return; }
    if (landed < 0) { landed = 0; stage.dataset.flow = 'type'; }
    else if (points.visible) {
      landed += dt;
      uniforms.uFade.value = 1 - Math.min(1, Math.max(0, (landed - HOLD) / FADE));
      if (landed > HOLD + FADE) points.visible = false;
    }
  }

  function finish(whole) {
    active = false;
    paused = false;
    landed = -1;
    points.visible = false;
    if (!whole && panels.some((panel) => !panel.hidden)) stage.dataset.flow = 'type';
    else delete stage.dataset.flow;
    if (!whole) blocks.reset();
    blocks.hold(false);
    onEnd();
  }

  function begin(from, to) {
    active = true;
    a = from;
    b = to;
    c = -1;
    Object.assign(first, { progress: 0, goal: 0, speed: 0 });
    Object.assign(second, { progress: 0, goal: 0, speed: 0 });
    blocks.hold(true);
  }

  function cancel() {
    if (active) finish(false);
  }

  /* Head for form `next`: along the running flight, from the form the particles rest in, or out of the flight in a second stage. */
  function head(next) {
    if (c >= 0) {
      second.goal = next === c ? 1 : 0;
      if (next !== c) first.goal = next === b ? 1 : 0;
    } else if (next === b) first.goal = 1;
    else if (next === a) first.goal = 0;
    else if (first.progress === 0) { b = next; first.goal = 1; }
    else if (first.progress === 1) { a = b; b = next; first.progress = 0; first.goal = 1; }
    else { c = next; second.goal = 1; }
  }

  blocks.attach({ object: points, frame });

  return {
    get ready() { return ready; },
    get active() { return active; },
    get count() { return geometry.drawRange.count; },
    to(panel) {
      const next = panels.indexOf(panel) + 1;
      if (next === MARK) delete stage.dataset.flow;
      if (next !== MARK && !sets[next - 1].usable) return;
      if (!active && (next === MARK || !ready || !blocks.resting)) return;
      if (!active) begin(MARK, next);
      const shown = landed >= 0;
      paused = false;
      head(next);
      show();
      if (next !== MARK) stage.dataset.flow = 'fly';
      sync();
      if (shown) blocks.draw();
    },
    cancel,
    seek(value, to = 1, from = MARK) {
      if (!ready) return;
      begin(from, to);
      paused = true;
      first.progress = value;
      show();
    },
  };
}
