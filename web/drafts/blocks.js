import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const WIDTH = 15.5;
const DOT_PATH = 4;
const REACH = 2.3;
const MASK_RES = 24;

async function wordmarkCells(cols, cover) {
  const raw = await (await fetch('assets/wordmark-black.svg')).text();
  const [vx, vy, vw, vh] = raw.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const paths = [...raw.replace(/<defs>[\s\S]*?<\/defs>/, '').matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  const scale = 0.5;
  const w = Math.ceil(vw * scale);
  const h = Math.ceil(vh * scale);
  const ctx = Object.assign(document.createElement('canvas'), { width: w, height: h }).getContext('2d', { willReadFrequently: true });
  const alphas = paths.map((d) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.setTransform(scale, 0, 0, scale, -vx * scale, -vy * scale);
    ctx.fill(new Path2D(d));
    return ctx.getImageData(0, 0, w, h).data;
  });
  let x0 = w, x1 = 0, y0 = h, y1 = 0;
  for (const data of alphas) for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (data[(y * w + x) * 4 + 3] > 128) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  const cell = (x1 - x0 + 1) / cols;
  const rows = Math.ceil((y1 - y0 + 1) / cell);
  const cells = [];
  alphas.forEach((data, letter) => {
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      let sum = 0, n = 0;
      for (let y = Math.floor(y0 + row * cell); y < y0 + (row + 1) * cell && y < h; y += 2) for (let x = Math.floor(x0 + col * cell); x < x0 + (col + 1) * cell; x += 2) { sum += data[(y * w + x) * 4 + 3]; n++; }
      if (sum / n > cover) cells.push({ col, row, letter });
    }
  });
  const mask = Object.assign(document.createElement('canvas'), { width: cols * MASK_RES, height: rows * MASK_RES });
  const mctx = mask.getContext('2d');
  const k = MASK_RES / cell;
  mctx.setTransform(scale * k, 0, 0, scale * k, (-vx * scale - x0) * k, (-vy * scale - y0) * k);
  mctx.fillStyle = '#fff';
  paths.forEach((d) => mctx.fill(new Path2D(d)));
  const soft = Object.assign(document.createElement('canvas'), { width: mask.width, height: mask.height });
  const sctx = soft.getContext('2d');
  sctx.filter = 'blur(5px)';
  sctx.drawImage(mask, 0, 0);
  return { cells, rows, mask, soft, paths, map: { k: scale / cell, ox: (-vx * scale - x0) / cell, oy: (-vy * scale - y0) / cell } };
}

export async function createBlocks(stage, {
  cols = 62,
  layers = 2,
  fill = 0.9,
  radius = 0.14,
  light = '#F1F2F5',
  grey = null,
  accent = null,
  rim = '#ffffff',
  pulseEvery = 6,
  pulseTime = 1.9,
  wave = 0,
  sway = 0,
  ghost = false,
  fadeIn = false,
  solid = false,
  zoom = 1,
  background = '#14161B',
} = {}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = stage.querySelector('canvas');
  const { cells, rows, mask, soft, paths, map } = await wordmarkCells(cols, solid ? 3 : 115);
  const size = WIDTH / cols;
  const count = cells.length * layers;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: background === null });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = !solid;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  if (background !== null) scene.background = new THREE.Color(background);
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.42;

  const key = new THREE.DirectionalLight('#ffffff', 3.2);
  key.position.set(-7, 9, 12);
  key.castShadow = !solid;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.radius = 5;
  key.shadow.bias = -0.0005;
  Object.assign(key.shadow.camera, { left: -14, right: 14, top: 9, bottom: -9, near: 1, far: 40 });
  scene.add(key);
  const rimLight = new THREE.DirectionalLight(rim, 1.1);
  rimLight.position.set(8, -4, -6);
  scene.add(rimLight);

  const camera = new THREE.PerspectiveCamera(28, 2, 0.1, 200);
  const edge = size * fill;
  const geometry = radius > 0 ? new RoundedBoxGeometry(edge, edge, edge, 3, size * radius) : new THREE.BoxGeometry(edge, edge, edge);
  const material = new THREE.MeshPhysicalMaterial({ roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 });
  const rest = new Float32Array(count * 2);
  const cellOf = new Int32Array(count);
  const fade = new Float32Array(count).fill(1);
  const grow = new THREE.Vector3();
  const front = new Float32Array(count);
  const cellRandom = Float32Array.from({ length: cols * rows }, () => Math.random() - 0.5);
  const cellState = new Uint8Array(cols * rows);
  const cellTexture = new THREE.DataTexture(cellState, cols, rows, THREE.RedFormat);
  if (solid) {
    const texture = new THREE.CanvasTexture(mask);
    texture.flipY = false;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    const softTexture = new THREE.CanvasTexture(soft);
    softTexture.flipY = false;
    softTexture.generateMipmaps = false;
    softTexture.minFilter = THREE.LinearFilter;
    material.alphaToCoverage = true;
    material.emissive.set('#ffffff');
    material.emissiveIntensity = 0.4;
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uMask = { value: texture };
      shader.uniforms.uSoft = { value: softTexture };
      shader.uniforms.uExtent = { value: new THREE.Vector2(WIDTH, rows * size) };
      shader.uniforms.uEdge = { value: edge };
      shader.uniforms.uTexel = { value: size / MASK_RES };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
attribute vec2 aRest;
attribute float aFade;
varying float vFade;
varying vec2 vRest;
varying vec3 vLocal;
varying vec3 vEye;
varying mat3 vToView;`)
        .replace('#include <begin_vertex>', `#include <begin_vertex>
mat4 toWorld = modelMatrix * instanceMatrix;
vRest = aRest;
vFade = aFade;
vLocal = position;
vEye = (inverse(toWorld) * vec4(cameraPosition, 1.0)).xyz;
vToView = mat3(viewMatrix) * mat3(toWorld);`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
uniform sampler2D uMask;
uniform sampler2D uSoft;
uniform vec2 uExtent;
uniform float uEdge;
uniform float uTexel;
varying float vFade;
varying vec2 vRest;
varying vec3 vLocal;
varying vec3 vEye;
varying mat3 vToView;
float logoMask(vec2 p) {
  return texture2D(uMask, vec2((vRest.x + p.x) / uExtent.x + 0.5, 0.5 - (vRest.y + p.y) / uExtent.y)).r;
}
float logoSoft(vec2 p) {
  return texture2D(uSoft, vec2((vRest.x + p.x) / uExtent.x + 0.5, 0.5 - (vRest.y + p.y) / uExtent.y)).r;
}`)
        .replace('#include <map_fragment>', `#include <map_fragment>
bool onWall = false;
vec3 wallNormal = vec3(0.0);
float front = logoMask(vLocal.xy);
float frontWidth = max(fwidth(front), 0.0001);
if (front < 0.5) {
  vec3 dir = normalize(vLocal - vEye);
  float stride = uEdge * 0.1;
  float t = 0.0;
  for (int i = 0; i < 20; i++) {
    t += stride;
    vec3 probe = vLocal + dir * t;
    if (any(greaterThan(abs(probe), vec3(uEdge * 0.5 + 0.0005)))) break;
    if (logoMask(probe.xy) > 0.5) { onWall = true; break; }
  }
  if (onWall) {
    float near = t - stride;
    float far = t;
    for (int i = 0; i < 5; i++) {
      float mid = 0.5 * (near + far);
      if (logoMask((vLocal + dir * mid).xy) > 0.5) far = mid; else near = mid;
    }
    vec2 at = (vLocal + dir * far).xy;
    vec2 o = vec2(uTexel * 4.0, 0.0);
    vec2 slope = vec2(logoSoft(at + o.xy) - logoSoft(at - o.xy), logoSoft(at + o.yx) - logoSoft(at - o.yx));
    wallNormal = normalize(vToView * vec3(-normalize(slope + 0.00001), 0.0));
  } else {
    diffuseColor.a *= clamp((front - 0.5) / frontWidth + 0.5, 0.0, 1.0);
    if (diffuseColor.a < 0.01) discard;
  }
}
diffuseColor.a *= vFade;`)
        .replace('#include <normal_fragment_begin>', `#include <normal_fragment_begin>
if (onWall) { normal = wallNormal; nonPerturbedNormal = wallNormal; }`);
    };
    geometry.setAttribute('aRest', new THREE.InstancedBufferAttribute(rest, 2));
    geometry.setAttribute('aFade', new THREE.InstancedBufferAttribute(fade, 1));
  }
  const blocks = new THREE.InstancedMesh(geometry, material, count);
  blocks.castShadow = blocks.receiveShadow = !solid;
  blocks.frustumCulled = false;
  scene.add(blocks);

  if (solid) {
    const svg = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg">${paths.map((d) => `<path d="${d}"/>`).join('')}</svg>`);
    const unit = map.k * size;
    const body = new THREE.ExtrudeGeometry(svg.paths.flatMap((path) => path.toShapes()), { depth: (layers * size) / unit, bevelEnabled: false, curveSegments: 48 });
    body.applyMatrix4(new THREE.Matrix4().makeScale(unit, -unit, unit));
    body.translate(map.ox * size - WIDTH / 2, (rows * size) / 2 - map.oy * size, -(layers - 0.5) * size);
    body.computeVertexNormals();
    const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: light, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15, side: THREE.DoubleSide });
    bodyMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uCells = { value: cellTexture };
      shader.uniforms.uReach = { value: size * 0.03 };
      shader.uniforms.uExtent = { value: new THREE.Vector2(WIDTH, rows * size) };
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec2 vCell;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvCell = position.xy;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
uniform sampler2D uCells;
uniform vec2 uExtent;
uniform float uReach;
varying vec2 vCell;
float looseAt(vec2 p) {
  return texture2D(uCells, vec2(p.x / uExtent.x + 0.5, 0.5 - p.y / uExtent.y)).r;
}`)
        .replace('#include <map_fragment>', `#include <map_fragment>
vec2 reach = vec2(uReach, 0.0);
if (max(looseAt(vCell), max(max(looseAt(vCell + reach.xy), looseAt(vCell - reach.xy)), max(looseAt(vCell + reach.yx), looseAt(vCell - reach.yx)))) > 0.5) discard;`);
    };
    scene.add(new THREE.Mesh(body, bodyMaterial));
    scene.add(new THREE.HemisphereLight('#ffffff', '#e6e8ee', 2.3));
    key.intensity = 1.3;
  }

  const target = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const gate = new Float32Array(count);
  const origin = new Float32Array(count * 3);
  let goal = 1;
  let progress = 0;
  const spin = new Float32Array(count);
  const jitter = new Float32Array(count * 2);
  const still = solid ? 0.03 : 0.4;
  const stiffness = solid ? 80 : 34;
  const damping = solid ? 18 : 9.5;
  const axes = [];
  const accentIds = [];
  const accentColor = new THREE.Color(accent ?? light);
  const tint = new THREE.Color();
  cells.forEach(({ col, row, letter }, c) => {
    for (let layer = 0; layer < layers; layer++) {
      const i = c * layers + layer;
      target[i * 3] = (col - cols / 2 + 0.5) * size;
      target[i * 3 + 1] = (rows / 2 - row - 0.5) * size;
      target[i * 3 + 2] = -layer * size;
      cellOf[i] = row * cols + col;
      if (solid) front[i] = cellRandom[cellOf[i]] * 2.6 + Math.sin(target[i * 3 + 1] * 1.1) * 0.5;
      rest[i * 2] = target[i * 3];
      rest[i * 2 + 1] = target[i * 3 + 1];
      jitter[i * 2] = Math.random() - 0.5;
      jitter[i * 2 + 1] = Math.random() - 0.5;
      pos[i * 3] = 16 + Math.random() * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      if (fadeIn) { pos[i * 3] = target[i * 3] + (Math.random() - 0.5) * 7; pos[i * 3 + 1] = target[i * 3 + 1] + (Math.random() - 0.5) * 5; pos[i * 3 + 2] = target[i * 3 + 2] + 1 + Math.random() * 5; }
      origin.set(pos.subarray(i * 3, i * 3 + 3), i * 3);
      gate[i] = fadeIn ? Math.random() * 0.84 : (col / cols) * 0.72 + Math.random() * 0.24;
      spin[i] = (Math.random() - 0.5) * 9;
      axes.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize());
      const roll = Math.random();
      const isAccent = accent !== null && (letter === DOT_PATH || roll < 0.1);
      if (isAccent) accentIds.push(i);
      blocks.setColorAt(i, isAccent ? accentColor : tint.set(grey !== null && roll < 0.24 ? grey : light));
    }
  });

  const pointer = new THREE.Vector2();
  let pointerActive = false;
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    pointerActive = true;
  });
  const release = () => { pointerActive = false; };
  stage.addEventListener('pointerleave', release);
  stage.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') release(); });
  stage.addEventListener('pointercancel', release);

  let distance = 20;
  function place(t) {
    camera.position.set(distance * (-0.2 + sway * Math.sin(t * 0.23) * 0.16), distance * (0.06 + sway * Math.cos(t * 0.17) * 0.07), distance);
    camera.lookAt(0, 0, 0);
  }
  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    const aspect = width / height;
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    const view = 2 * Math.tan(THREE.MathUtils.degToRad(14));
    distance = Math.max((WIDTH * (aspect > 1.2 ? 1.28 : 1.14)) / (view * aspect), (rows * size * 1.3) / view) / (aspect > 1.2 ? zoom : Math.min(zoom, 1.06));
    place(0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const p = new THREE.Vector3();
  const unit = new THREE.Vector3(1, 1, 1);

  function update(t, dt, settled) {
    let push = 0;
    if (pointerActive) { ray.setFromCamera(pointer, camera); ray.ray.intersectPlane(plane, hit); push = 1; }
    else if (ghost && t > 5) { hit.set(Math.sin(t * 0.43) * WIDTH * 0.44, Math.sin(t * 0.79 + 1) * 1.7, 0); push = 0.55; }
    if (!settled && t > 0.9) progress += Math.max(-dt / 2.3, Math.min(dt / 2.3, goal - progress));
    const phase = (t - 5) % pulseEvery;
    const pulseX = t > 5 && progress === 1 && phase < pulseTime ? -WIDTH / 2 - 3.5 + (phase / pulseTime) * (WIDTH + 7) : null;
    if (solid) cellState.fill(0);
    for (let i = 0; i < count; i++) {
      const a = i * 3;
      const rx = target[a], ry = target[a + 1], rz = target[a + 2];
      let tx = rx, ty = ry, tz = rz, ox = 0, oy = 0, oz = 0, lift = 0;
      if (pulseX !== null) {
        const d = Math.abs(rx + front[i] - pulseX);
        if (d < 1.2) {
          const rise = 1 - d / 1.2;
          if (solid) {
            lift = rise * rise * (3 - 2 * rise);
            if (i % layers === 0) { ox = jitter[i * 2] * lift * 0.14; oy = jitter[i * 2 + 1] * lift * 0.14; oz = lift * (0.3 + jitter[i * 2] * 0.2); }
          } else tz += rise * rise * 0.75;
        }
      }
      if (wave && !settled) tz += wave * (Math.sin(tx * 0.55 - t * 1.1) * 0.24 + Math.sin(ty * 0.9 + t * 0.7) * 0.1);
      if (settled) { pos[a] = tx; pos[a + 1] = ty; pos[a + 2] = tz; }
      else {
        if (progress <= gate[i]) { tx = origin[a]; ty = origin[a + 1]; tz = origin[a + 2]; }
        if (push) {
          const dx = pos[a] - hit.x, dy = pos[a + 1] - hit.y;
          const d = Math.hypot(dx, dy);
          if (d < REACH) { const f = (1 - d / REACH) * dt * push; vel[a] += (dx / (d + 0.001)) * f * 70; vel[a + 1] += (dy / (d + 0.001)) * f * 70; vel[a + 2] += f * 55; }
        }
        vel[a] += ((tx - pos[a]) * stiffness - vel[a] * damping) * dt;
        vel[a + 1] += ((ty - pos[a + 1]) * stiffness - vel[a + 1] * damping) * dt;
        vel[a + 2] += ((tz - pos[a + 2]) * stiffness - vel[a + 2] * damping) * dt;
        pos[a] += vel[a] * dt; pos[a + 1] += vel[a + 1] * dt; pos[a + 2] += vel[a + 2] * dt;
        if (solid && Math.abs(pos[a] - rx) + Math.abs(pos[a + 1] - ry) + Math.abs(pos[a + 2] - rz) < 0.012 && Math.abs(vel[a]) + Math.abs(vel[a + 1]) + Math.abs(vel[a + 2]) < 0.05) { pos[a] = rx; pos[a + 1] = ry; pos[a + 2] = rz; }
      }
      const dist = Math.hypot(pos[a] - rx, pos[a + 1] - ry, pos[a + 2] - rz);
      q.setFromAxisAngle(axes[i], spin[i] * Math.min(1, Math.max(0, dist + (i % layers === 0 ? lift * 0.3 : 0) - still) / (solid ? 3.5 : 7)));
      const appear = fadeIn && !settled ? Math.min(1, Math.max(0, (progress - gate[i]) / 0.2)) : 1;
      fade[i] = appear;
      if (solid && dist === 0 && lift === 0 && appear === 1) m.makeScale(0, 0, 0);
      else {
        if (solid) cellState[cellOf[i]] = 255;
        if (appear === 0) m.makeScale(0, 0, 0);
        else m.compose(p.set(pos[a] + ox, pos[a + 1] + oy, pos[a + 2] + oz), q, appear === 1 ? unit : grow.setScalar(0.6 + 0.4 * appear));
      }
      blocks.setMatrixAt(i, m);
    }
    blocks.instanceMatrix.needsUpdate = true;
    if (solid) { cellTexture.needsUpdate = true; geometry.attributes.aFade.needsUpdate = true; }
  }

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);
  if (reduced) {
    update(0, 0, true);
    renderer.render(scene, camera);
  } else {
    let last = 0, clock = 0;
    renderer.setAnimationLoop((now) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      clock += dt;
      if (sway) place(clock);
      update(clock, dt, false);
      renderer.render(scene, camera);
    });
  }

  return {
    setAssembled(value) { goal = value ? 1 : 0; },
    setAccent(value) {
      accentColor.set(value);
      accentIds.forEach((i) => blocks.setColorAt(i, accentColor));
      blocks.instanceColor.needsUpdate = true;
      if (reduced) renderer.render(scene, camera);
    },
  };
}
