import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const WIDTH = 15.5;
const REACH = 2.3;
const MASK_RES = 24;

const COVER = 3;
const STILL = 0.03;
const STIFFNESS = 80;
const DAMPING = 18;
const LOOSE_AT = 0.14;
const LOOSE_SHRINK = 0.2;
const EDGE_SHADE = 0.42;
const THIN = 0.35;

function wordmarkCells(raw, cols) {
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
      if (sum / n > COVER) cells.push({ col, row, cover: sum / n / 255 });
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

/*
  The wordmark as a solid white body on a transparent canvas. At rest only the smooth extruded
  mesh is drawn; where cubes are loose (entry, pulse, pointer) a cell texture cuts cube-shaped
  holes into it and only those cubes are drawn, clipped to the logo outline. A loose cube shrinks slightly
  and gets shaded edges (aLoose), so neighbours read as single cubes instead of one white lump.
  Cells that the logo covers by less than THIN have no visible cube: their sliver would float as a speck.
  Cells without a cube that touch a cube cell (fringe) hide their trace of the body whenever a neighbour is loose.
  `svg` is the wordmark SVG source; `stage` is the element that holds the canvas.
  The drawing buffer has exactly the canvas's size in device pixels (the observer's device-pixel box where the
  browser has it), so at any zoom one buffer pixel is one device pixel; above maxPixelRatio it is scaled down.
  Where the measured box disagrees with devicePixelRatio (an emulated ratio, as in DevTools device mode) the
  buffer is sized from devicePixelRatio instead. `ratio` is buffer pixels per CSS pixel: devicePixelRatio or
  the cap; `density` is the grid the layout snaps to, in device pixels per CSS pixel: devicePixelRatio, or
  what the box says under emulation. destroy() stops the loop and gives the WebGL context back.
  mount(next) moves the canvas into another stage (hero and closing stage share this one WebGL context);
  the wordmark arrives dissolved there and assembles with setAssembled(true).
  Hooks for a second layer in the same scene (scene/typeflow.js): attach({ object, frame(dt) }) adds its object
  and calls frame before every render; hold(true) freezes the wordmark at rest as the plain body (no cubes,
  no pulse, no pointer) and carve(cut) then cuts every cell out of it whose entry in `cut` is 255 (0 keeps it);
  hold(false) hands it back to the frame loop; reset() leaves it dissolved; draw() renders outside the frame
  loop; `resting` is true while the wordmark is fully assembled; `wordmark` describes the body (mask canvas
  and texture with `cell` pixels per cell, cols x rows cells, size in world units).
*/
export function createBlocks(stage, {
  svg,
  cols = 62,
  layers = 3,
  pulseEvery = 7,
  pulseTime = 4,
  sway = 1,
  zoom = 1.16,
  assembleTime = 1.5,
  maxPixelRatio = 2,
} = {}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = stage.querySelector('canvas');
  const { cells, rows, mask, soft, paths, map } = wordmarkCells(svg, cols);
  const size = WIDTH / cols;
  const count = cells.length * layers;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.42;

  const key = new THREE.DirectionalLight('#ffffff', 1.3);
  key.position.set(-7, 9, 12);
  scene.add(key);
  const rimLight = new THREE.DirectionalLight('#ffffff', 1.1);
  rimLight.position.set(8, -4, -6);
  scene.add(rimLight);
  scene.add(new THREE.HemisphereLight('#ffffff', '#e6e8ee', 2.3));

  const camera = new THREE.PerspectiveCamera(28, 2, 0.1, 200);
  const edge = size;
  const geometry = new THREE.BoxGeometry(edge, edge, edge);
  const material = new THREE.MeshPhysicalMaterial({ roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15 });
  const rest = new Float32Array(count * 2);
  const cellOf = new Int32Array(count);
  const fade = new Float32Array(count).fill(1);
  const loose = new Float32Array(count);
  const thin = new Uint8Array(count);
  const hasCube = new Uint8Array(cols * rows);
  const grow = new THREE.Vector3();
  const front = new Float32Array(count);
  const cellRandom = Float32Array.from({ length: cols * rows }, () => Math.random() - 0.5);
  const cellState = new Uint8Array(cols * rows);
  const cellTexture = new THREE.DataTexture(cellState, cols, rows, THREE.RedFormat);
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
    shader.uniforms.uEdgeShade = { value: EDGE_SHADE };
    shader.uniforms.uTexel = { value: size / MASK_RES };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute vec2 aRest;
attribute float aFade;
attribute float aLoose;
varying float vFade;
varying float vLoose;
varying vec2 vRest;
varying vec3 vLocal;
varying vec3 vEye;
varying mat3 vToView;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
mat4 toWorld = modelMatrix * instanceMatrix;
vRest = aRest;
vFade = aFade;
vLoose = aLoose;
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
uniform float uEdgeShade;
varying float vLoose;
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
diffuseColor.a *= vFade;
vec3 side = abs(vLocal) / (uEdge * 0.5);
float rim = max(max(min(side.x, side.y), min(side.y, side.z)), min(side.x, side.z));
float edgeShade = 1.0 - uEdgeShade * vLoose * smoothstep(0.8, 1.0, rim);
diffuseColor.rgb *= edgeShade;`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
totalEmissiveRadiance *= edgeShade;`)
      .replace('#include <normal_fragment_begin>', `#include <normal_fragment_begin>
if (onWall) { normal = wallNormal; nonPerturbedNormal = wallNormal; }`);
  };
  geometry.setAttribute('aRest', new THREE.InstancedBufferAttribute(rest, 2));
  geometry.setAttribute('aFade', new THREE.InstancedBufferAttribute(fade, 1));
  geometry.setAttribute('aLoose', new THREE.InstancedBufferAttribute(loose, 1));
  const blocks = new THREE.InstancedMesh(geometry, material, count);
  blocks.frustumCulled = false;
  scene.add(blocks);

  const outline = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg">${paths.map((d) => `<path d="${d}"/>`).join('')}</svg>`);
  const svgUnit = map.k * size;
  const body = new THREE.ExtrudeGeometry(outline.paths.flatMap((path) => path.toShapes()), { depth: (layers * size) / svgUnit, bevelEnabled: false, curveSegments: 48 });
  body.applyMatrix4(new THREE.Matrix4().makeScale(svgUnit, -svgUnit, svgUnit));
  body.translate(map.ox * size - WIDTH / 2, (rows * size) / 2 - map.oy * size, -(layers - 0.5) * size);
  body.computeVertexNormals();
  const bodyMaterial = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.15, side: THREE.DoubleSide });
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

  const target = new Float32Array(count * 3);
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const gate = new Float32Array(count);
  const origin = new Float32Array(count * 3);
  let goal = 1;
  let progress = 0;
  let pulseFrom = 5;
  let layer = null;
  let held = false;
  const spin = new Float32Array(count);
  const jitter = new Float32Array(count * 2);
  const axes = [];
  cells.forEach(({ col, row, cover }, c) => {
    for (let layer = 0; layer < layers; layer++) {
      const i = c * layers + layer;
      target[i * 3] = (col - cols / 2 + 0.5) * size;
      target[i * 3 + 1] = (rows / 2 - row - 0.5) * size;
      target[i * 3 + 2] = -layer * size;
      cellOf[i] = row * cols + col;
      thin[i] = cover < THIN ? 1 : 0;
      hasCube[cellOf[i]] = 1;
      front[i] = cellRandom[cellOf[i]] * 2.6 + Math.sin(target[i * 3 + 1] * 1.1) * 0.5;
      rest[i * 2] = target[i * 3];
      rest[i * 2 + 1] = target[i * 3 + 1];
      jitter[i * 2] = Math.random() - 0.5;
      jitter[i * 2 + 1] = Math.random() - 0.5;
      if (layer > 0) pos.set(target.subarray(i * 3, i * 3 + 3), i * 3);
      else { pos[i * 3] = target[i * 3] + (Math.random() - 0.5) * 7; pos[i * 3 + 1] = target[i * 3 + 1] + (Math.random() - 0.5) * 5; pos[i * 3 + 2] = target[i * 3 + 2] + 1 + Math.random() * 5; }
      origin.set(pos.subarray(i * 3, i * 3 + 3), i * 3);
      gate[i] = layer > 0 ? Math.min(0.78, gate[c * layers] + 0.12) : Math.random() * 0.7;
      spin[i] = (Math.random() - 0.5) * 9;
      axes.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize());
    }
  });

  const fringe = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
    if (hasCube[row * cols + col]) continue;
    const around = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const x = col + dx, y = row + dy;
      if (x >= 0 && x < cols && y >= 0 && y < rows && hasCube[y * cols + x]) around.push(y * cols + x);
    }
    if (around.length) fringe.push({ cell: row * cols + col, around });
  }

  const pointer = new THREE.Vector2();
  let pointerActive = false;
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  let host = stage;
  const release = () => { pointerActive = false; };
  const listened = new WeakSet();
  function listen(el) {
    if (listened.has(el)) return;
    listened.add(el);
    el.addEventListener('pointermove', (e) => {
      if (el !== host) return;
      const r = el.getBoundingClientRect();
      pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      pointerActive = true;
    });
    el.addEventListener('pointerleave', release);
    el.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') release(); });
    el.addEventListener('pointercancel', release);
  }
  listen(stage);

  let distance = 20;
  let still = null;
  function place(t) {
    camera.position.set(distance * (-0.2 + sway * Math.sin(t * 0.23) * 0.16), distance * (0.06 + sway * Math.cos(t * 0.17) * 0.07), distance);
    camera.lookAt(0, 0, 0);
  }
  let ratio = 1;
  let density = 1;
  function resize(entries) {
    const width = host.clientWidth;
    const height = host.clientHeight;
    const aspect = width / height;
    const box = entries?.at(-1).devicePixelContentBoxSize?.[0];
    const emulated = Boolean(box) && Math.abs(box.inlineSize / devicePixelRatio - width) >= 1;
    const scale = Math.min(1, maxPixelRatio / devicePixelRatio);
    density = emulated ? box.inlineSize / width : devicePixelRatio;
    ratio = devicePixelRatio * scale;
    renderer.setSize(Math.round((box && !emulated ? box.inlineSize : width * devicePixelRatio) * scale), Math.round((box && !emulated ? box.blockSize : height * devicePixelRatio) * scale), false);
    camera.aspect = aspect;
    const view = 2 * Math.tan(THREE.MathUtils.degToRad(14));
    distance = Math.max((WIDTH * (aspect > 1.2 ? 1.28 : 1.14)) / (view * aspect), (rows * size * 1.3) / view) / (aspect > 1.2 ? zoom : Math.min(zoom, 1.06));
    place(0);
    camera.updateProjectionMatrix();
    if (reduced && still) still();
  }
  const sizes = new ResizeObserver(resize);
  try { sizes.observe(canvas, { box: 'device-pixel-content-box' }); } catch { sizes.observe(canvas); }
  resize();

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const p = new THREE.Vector3();

  function update(t, dt, settled) {
    let push = 0;
    if (pointerActive && goal === 1) { ray.setFromCamera(pointer, camera); ray.ray.intersectPlane(plane, hit); push = 1; }
    if (!settled && t > 0.4) progress += Math.max(-dt / assembleTime, Math.min(dt / assembleTime, goal - progress));
    const phase = (t - pulseFrom) % pulseEvery;
    const pulseX = t > pulseFrom && progress === 1 && phase < pulseTime ? -WIDTH / 2 - 3.5 + (phase / pulseTime) * (WIDTH + 7) : null;
    cellState.fill(0);
    for (let i = 0; i < count; i++) {
      const a = i * 3;
      const rx = target[a], ry = target[a + 1], rz = target[a + 2];
      let tx = rx, ty = ry, tz = rz, ox = 0, oy = 0, oz = 0, lift = 0;
      if (pulseX !== null) {
        const d = Math.abs(rx + front[i] - pulseX);
        if (d < 1.2) {
          const rise = 1 - d / 1.2;
          lift = rise * rise * (3 - 2 * rise);
          if (i % layers === 0) { ox = jitter[i * 2] * lift * 0.14; oy = jitter[i * 2 + 1] * lift * 0.14; oz = lift * (0.3 + jitter[i * 2] * 0.2); }
        }
      }
      if (settled) { pos[a] = tx; pos[a + 1] = ty; pos[a + 2] = tz; }
      else {
        if (progress <= gate[i]) { tx = origin[a]; ty = origin[a + 1]; tz = origin[a + 2]; }
        if (push) {
          const dx = pos[a] - hit.x, dy = pos[a + 1] - hit.y;
          const d = Math.hypot(dx, dy);
          if (d < REACH) { const f = (1 - d / REACH) * dt * push; vel[a] += (dx / (d + 0.001)) * f * 70; vel[a + 1] += (dy / (d + 0.001)) * f * 70; vel[a + 2] += f * 55; }
        }
        vel[a] += ((tx - pos[a]) * STIFFNESS - vel[a] * DAMPING) * dt;
        vel[a + 1] += ((ty - pos[a + 1]) * STIFFNESS - vel[a + 1] * DAMPING) * dt;
        vel[a + 2] += ((tz - pos[a + 2]) * STIFFNESS - vel[a + 2] * DAMPING) * dt;
        pos[a] += vel[a] * dt; pos[a + 1] += vel[a + 1] * dt; pos[a + 2] += vel[a + 2] * dt;
        if (Math.abs(pos[a] - rx) + Math.abs(pos[a + 1] - ry) + Math.abs(pos[a + 2] - rz) < 0.012 && Math.abs(vel[a]) + Math.abs(vel[a + 1]) + Math.abs(vel[a + 2]) < 0.05) { pos[a] = rx; pos[a + 1] = ry; pos[a + 2] = rz; }
      }
      const dist = Math.hypot(pos[a] - rx, pos[a + 1] - ry, pos[a + 2] - rz);
      q.setFromAxisAngle(axes[i], spin[i] * Math.min(1, Math.max(0, dist + (i % layers === 0 ? lift * 0.3 : 0) - STILL) / 3.5));
      const appear = !settled ? Math.min(1, Math.max(0, (progress - gate[i]) / 0.2)) : 1;
      fade[i] = appear;
      loose[i] = Math.min(1, (dist + (i % layers === 0 ? lift * 0.3 : 0)) / LOOSE_AT);
      if (dist === 0 && lift === 0 && appear === 1) m.makeScale(0, 0, 0);
      else {
        cellState[cellOf[i]] = 255;
        if (appear === 0 || thin[i]) m.makeScale(0, 0, 0);
        else m.compose(p.set(pos[a] + ox, pos[a + 1] + oy, pos[a + 2] + oz), q, grow.setScalar((0.6 + 0.4 * appear) * (1 - LOOSE_SHRINK * loose[i])));
      }
      blocks.setMatrixAt(i, m);
    }
    blocks.instanceMatrix.needsUpdate = true;
    for (const { cell, around } of fringe) {
      for (const other of around) if (cellState[other]) { cellState[cell] = 255; break; }
    }
    cellTexture.needsUpdate = true;
    geometry.attributes.aFade.needsUpdate = true;
    geometry.attributes.aLoose.needsUpdate = true;
  }

  let visible = true;
  let clock = 0;
  const sight = new IntersectionObserver((entries) => { visible = entries.at(-1).isIntersecting; });
  sight.observe(stage);
  if (reduced) {
    still = () => { update(0, 0, true); renderer.render(scene, camera); };
    still();
  } else {
    let last = 0;
    renderer.setAnimationLoop((now) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      clock += dt;
      if (sway) place(clock);
      if (!held) update(clock, dt, false);
      layer?.frame(dt);
      renderer.render(scene, camera);
    });
  }

  function reset() {
    goal = 0;
    progress = 0;
  }

  return {
    camera,
    renderer,
    wordmark: { mask, texture, cell: MASK_RES, cols, rows, width: WIDTH, height: rows * size, front: size / 2, depth: layers * size },
    get resting() { return progress === 1; },
    get ratio() { return ratio; },
    get density() { return density; },
    setAssembled(value) { goal = value ? 1 : 0; },
    hold(value) {
      if (value === held) return;
      held = value;
      blocks.visible = !value;
      pulseFrom = value ? Infinity : clock + 2;
      if (!value) return;
      vel.fill(0);
      update(clock, 0, true);
    },
    carve(cut) {
      cellState.set(cut);
      cellTexture.needsUpdate = true;
    },
    reset,
    attach(next) {
      layer = next;
      scene.add(next.object);
    },
    draw() { renderer.render(scene, camera); },
    destroy() {
      renderer.setAnimationLoop(null);
      sizes.disconnect();
      sight.disconnect();
      renderer.dispose();
      renderer.forceContextLoss();
    },
    mount(next) {
      if (next === host) return;
      host = next;
      release();
      listen(next);
      next.append(canvas);
      sight.disconnect();
      sight.observe(next);
      reset();
      resize();
    },
  };
}
