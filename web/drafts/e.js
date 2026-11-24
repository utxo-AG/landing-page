import * as THREE from 'three';
import { intro, sequence, reduced } from './page.js';
import { vertex, sandFragment, wipeFragment } from './e.shader.js';

const stage = document.querySelector('[data-stage]');
const canvas = stage.querySelector('canvas');
const root = document.documentElement;

const SPAN = 10;
const STRETCH = 1.22;
const MASK = { width: 1280, height: 960, world: new THREE.Vector2(12, 9) };
const WIPE = { width: 1280, height: 736, rect: new THREE.Vector4(0, 1, 28, 16.1) };
const PITCH = THREE.MathUtils.degToRad(48);
const TAN_HALF = Math.tan(THREE.MathUtils.degToRad(15));
const FORM_DELAY = 0.7;
const FORM_TIME = 3.2;
const HEAL_AFTER = 2.6;
const HEAL_TIME = 4.5;
const MOOD_TIME = 1.6;
const PIXEL_BUDGET = 2.3e6;

const MOODS = {
  sun: {
    uLight: new THREE.Vector3(-0.86, 0.25, 0.4),
    uSun: new THREE.Color(0.92, 0.5, 0.2),
    uAmbient: new THREE.Color(0.075, 0.08, 0.13),
    uAlbedo: new THREE.Color(0.86, 0.58, 0.36),
    uHaze: new THREE.Color(0.62, 0.43, 0.3),
    uGlintA: new THREE.Color(1.0, 0.5, 0.2),
    uGlintB: new THREE.Color(1.0, 0.86, 0.58),
    uGlint: 12,
    uGlintSharp: 450,
    uSheen: 0.16,
  },
  moon: {
    uLight: new THREE.Vector3(0.74, 0.34, 0.42),
    uSun: new THREE.Color(0.2, 0.28, 0.45),
    uAmbient: new THREE.Color(0.016, 0.026, 0.055),
    uAlbedo: new THREE.Color(0.62, 0.7, 0.84),
    uHaze: new THREE.Color(0.035, 0.05, 0.09),
    uGlintA: new THREE.Color(0.62, 0.78, 1.0),
    uGlintB: new THREE.Color(1.0, 1.0, 1.0),
    uGlint: 8,
    uGlintSharp: 900,
    uSheen: 0.22,
  },
};

function boxBlur(src, dst, width, height, radius, stepX, stepY) {
  const lines = stepX ? height : width;
  const length = stepX ? width : height;
  const stride = stepX ? 1 : width;
  const norm = 1 / (radius * 2 + 1);
  for (let line = 0; line < lines; line++) {
    const start = stepX ? line * width : line;
    let sum = 0;
    for (let k = -radius; k <= radius; k++) sum += src[start + Math.min(length - 1, Math.max(0, k)) * stride];
    for (let k = 0; k < length; k++) {
      dst[start + k * stride] = sum * norm;
      sum += src[start + Math.min(length - 1, k + radius + 1) * stride] - src[start + Math.max(0, k - radius) * stride];
    }
  }
}

async function wordmarkMask() {
  const raw = await (await fetch('assets/wordmark-black.svg')).text();
  const [vx, vy, vw, vh] = raw.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const paths = [...raw.replace(/<defs>[\s\S]*?<\/defs>/, '').matchAll(/<path d="([^"]+)"/g)].map((m) => new Path2D(m[1]));
  const { width, height } = MASK;
  const ctx = Object.assign(document.createElement('canvas'), { width, height }).getContext('2d', { willReadFrequently: true });
  const draw = (sx, sy, ox, oy) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.setTransform(sx, 0, 0, sy, ox, oy);
    paths.forEach((path) => ctx.fill(path));
    return ctx.getImageData(0, 0, width, height).data;
  };

  const probe = Math.min(width / vw, height / vh);
  const first = draw(probe, probe, -vx * probe, -vy * probe);
  let x0 = width, x1 = 0, y0 = height, y1 = 0;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (first[(y * width + x) * 4 + 3] > 128) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  const box = { x: vx + x0 / probe, y: vy + y0 / probe, w: (x1 - x0) / probe, h: (y1 - y0) / probe };
  const sx = (SPAN / MASK.world.x) * width / box.w;
  const sy = sx * STRETCH * (MASK.world.x / width) / (MASK.world.y / height);
  const data = draw(sx, sy, width / 2 - (box.x + box.w / 2) * sx, height / 2 - (box.y + box.h / 2) * sy);

  let a = new Float32Array(width * height);
  let b = new Float32Array(width * height);
  for (let i = 0; i < a.length; i++) a[i] = data[i * 4 + 3] / 255;
  for (let pass = 0; pass < 3; pass++) {
    boxBlur(a, b, width, height, 9, true, false);
    boxBlur(b, a, width, height, 9, false, true);
  }
  const half = new Uint16Array(a.length);
  for (let i = 0; i < a.length; i++) half[i] = THREE.DataUtils.toHalfFloat(a[i]);
  const texture = new THREE.DataTexture(half, width, height, THREE.RedFormat, THREE.HalfFloatType);
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function blend(uniforms, k) {
  for (const [name, from] of Object.entries(MOODS.sun)) {
    const to = MOODS.moon[name];
    const target = uniforms[name];
    if (typeof from === 'number') target.value = from + (to - from) * k;
    else if (from.isColor) target.value.lerpColors(from, to, k);
    else target.value.lerpVectors(from, to, k).normalize();
  }
}

const ease = (k) => k * k * (3 - 2 * k);

async function main() {
  const mask = await wordmarkMask();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.autoClear = false;

  const floatTargets = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
  const makeTarget = () => new THREE.WebGLRenderTarget(WIPE.width, WIPE.height, {
    type: floatTargets ? THREE.HalfFloatType : THREE.UnsignedByteType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
  });
  let read = makeTarget();
  let write = makeTarget();

  const camera = new THREE.Camera();
  const quad = new THREE.PlaneGeometry(2, 2);
  const wipeMaterial = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: wipeFragment,
    depthTest: false,
    uniforms: {
      uPrev: { value: null },
      uRect: { value: WIPE.rect },
      uFrom: { value: new THREE.Vector2() },
      uTo: { value: new THREE.Vector2() },
      uRadius: { value: 0.7 },
      uStamp: { value: 0 },
      uHeal: { value: 0 },
    },
  });
  const sandMaterial = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: sandFragment,
    depthTest: false,
    uniforms: {
      uMask: { value: mask },
      uWipe: { value: null },
      uMaskSize: { value: MASK.world },
      uWipeRect: { value: WIPE.rect },
      uCamPos: { value: new THREE.Vector3() },
      uCamF: { value: new THREE.Vector3(0, -Math.sin(PITCH), Math.cos(PITCH)) },
      uCamR: { value: new THREE.Vector3(1, 0, 0) },
      uCamU: { value: new THREE.Vector3(0, Math.cos(PITCH), Math.sin(PITCH)) },
      uTan: { value: new THREE.Vector2() },
      uPix: { value: 0 },
      uTime: { value: 0 },
      uForm: { value: reduced ? 1 : 0 },
      uSpan: { value: SPAN },
      uLight: { value: new THREE.Vector3() },
      uSun: { value: new THREE.Color() },
      uAmbient: { value: new THREE.Color() },
      uAlbedo: { value: new THREE.Color() },
      uHaze: { value: new THREE.Color() },
      uGlintA: { value: new THREE.Color() },
      uGlintB: { value: new THREE.Color() },
      uGlint: { value: 0 },
      uGlintSharp: { value: 0 },
      uSheen: { value: 0 },
    },
  });
  const wipeScene = new THREE.Mesh(quad, wipeMaterial);
  const sandScene = new THREE.Mesh(quad, sandMaterial);
  wipeScene.frustumCulled = sandScene.frustumCulled = false;
  const sand = sandMaterial.uniforms;
  const wipe = wipeMaterial.uniforms;

  const view = { aspect: 1 };
  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2, Math.sqrt(PIXEL_BUDGET / (width * height))));
    renderer.setSize(width, height, false);
    view.aspect = width / height;
    const fill = view.aspect > 1.3 ? 0.62 : 0.86;
    const distance = Math.max(13.5, SPAN / (fill * 2 * TAN_HALF * view.aspect));
    sand.uCamPos.value.set(0, Math.sin(PITCH) * distance, -0.7 - Math.cos(PITCH) * distance);
    sand.uTan.value.set(TAN_HALF * view.aspect, TAN_HALF);
    sand.uPix.value = (2 * TAN_HALF) / (height * renderer.getPixelRatio());
    wipe.uRadius.value = distance * 0.046;
    if (reduced) requestRender();
  }

  const ray = new THREE.Vector3();
  function groundAt(event) {
    const r = stage.getBoundingClientRect();
    const x = ((event.clientX - r.left) / r.width) * 2 - 1;
    const y = 1 - ((event.clientY - r.top) / r.height) * 2;
    ray.copy(sand.uCamF.value).addScaledVector(sand.uCamR.value, x * sand.uTan.value.x).addScaledVector(sand.uCamU.value, y * sand.uTan.value.y);
    const t = -sand.uCamPos.value.y / ray.y;
    return new THREE.Vector2(sand.uCamPos.value.x + ray.x * t, sand.uCamPos.value.z + ray.z * t);
  }

  const brush = { from: null, to: null, idle: Infinity };
  const lift = () => { brush.from = brush.to = null; };
  stage.addEventListener('pointerdown', (e) => { brush.from = groundAt(e); brush.to = null; });
  stage.addEventListener('pointermove', (e) => {
    const point = groundAt(e);
    if (!brush.from) { brush.from = point; return; }
    brush.to = point;
    if (reduced) requestRender();
  });
  ['pointerleave', 'pointercancel', 'pointerup'].forEach((type) => stage.addEventListener(type, (e) => {
    if (type !== 'pointerup' || e.pointerType !== 'mouse') lift();
  }));

  function stepWipe(dt) {
    const stamping = brush.from && brush.to && brush.from.distanceToSquared(brush.to) > 1e-5;
    brush.idle = stamping ? 0 : brush.idle + dt;
    const healing = !reduced && brush.idle > HEAL_AFTER && brush.idle < HEAL_AFTER + HEAL_TIME * 2.4;
    if (!stamping && !healing) return;
    wipe.uPrev.value = read.texture;
    wipe.uStamp.value = stamping ? 1 : 0;
    wipe.uHeal.value = healing ? dt / HEAL_TIME : 0;
    if (stamping) {
      wipe.uFrom.value.copy(brush.from);
      wipe.uTo.value.copy(brush.to);
      brush.from = brush.to;
      brush.to = null;
    }
    renderer.setRenderTarget(write);
    renderer.render(wipeScene, camera);
    renderer.setRenderTarget(null);
    [read, write] = [write, read];
  }

  const mood = { value: root.dataset.mood === 'moon' ? 1 : 0, target: root.dataset.mood === 'moon' ? 1 : 0 };
  let clock = 0;
  let formStart = null;

  function draw() {
    const sway = reduced ? 0 : 1;
    blend(sand, ease(mood.value));
    sand.uLight.value.x += sway * 0.07 * Math.sin(clock * 0.31);
    sand.uLight.value.z += sway * 0.09 * Math.cos(clock * 0.23);
    sand.uLight.value.y += sway * 0.012 * Math.sin(clock * 0.17);
    sand.uTime.value = clock;
    sand.uWipe.value = read.texture;
    renderer.render(sandScene, camera);
  }

  let queued = false;
  function requestRender() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; stepWipe(0); draw(); });
  }

  function setMood(name, animate = true) {
    root.dataset.mood = name;
    mood.target = name === 'moon' ? 1 : 0;
    document.querySelectorAll('[data-mood-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.moodSet === name)));
    if (reduced || !animate) { mood.value = mood.target; requestRender(); }
  }
  const scheme = matchMedia('(prefers-color-scheme: dark)');
  const followScheme = (e) => setMood(e.matches ? 'moon' : 'sun');
  scheme.addEventListener('change', followScheme);
  document.querySelectorAll('[data-mood-set]').forEach((button) => button.addEventListener('click', () => {
    scheme.removeEventListener('change', followScheme);
    setMood(button.dataset.moodSet);
  }));
  setMood(root.dataset.mood, false);

  new ResizeObserver(resize).observe(stage);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);

  if (!reduced) {
    let last = 0;
    renderer.setAnimationLoop((now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      clock += dt;
      if (formStart === null && document.body.classList.contains('is-ready')) formStart = clock + FORM_DELAY;
      if (formStart !== null) sand.uForm.value = ease(THREE.MathUtils.clamp((clock - formStart) / FORM_TIME, 0, 1));
      mood.value += THREE.MathUtils.clamp(mood.target - mood.value, -dt / MOOD_TIME, dt / MOOD_TIME);
      stepWipe(dt);
      draw();
    });
  }

  window.__sceneReady = true;
  document.dispatchEvent(new Event('scene-ready'));
}

intro();
sequence();
main();
