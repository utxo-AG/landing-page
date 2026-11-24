export const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const noise = /* glsl */ `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec3 hash32(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yxz + 33.33);
  return fract((p3.xxy + p3.yzz) * p3.zyx);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x), mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x), u.y);
}`;

export const wipeFragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec4 uRect;
uniform vec2 uFrom, uTo;
uniform float uRadius, uStamp, uHeal;
${noise}
void main() {
  vec4 prev = texture2D(uPrev, vUv);
  vec2 p = uRect.xy + (vUv - 0.5) * uRect.zw;
  float amount = max(prev.r - uHeal * (0.45 + 1.1 * vnoise(p * 0.9)), 0.0);
  float side = prev.g;
  if (uStamp > 0.5) {
    vec2 pa = p - uFrom, ba = uTo - uFrom;
    float len = max(length(ba), 1e-4);
    vec2 dir = ba / len;
    float along = clamp(dot(pa, dir), 0.0, len);
    float dist = length(pa - dir * along);
    vec2 edge = smoothstep(0.0, 0.06, vUv) * smoothstep(0.0, 0.06, 1.0 - vUv);
    float press = smoothstep(uRadius, uRadius * 0.15, dist) * edge.x * edge.y;
    float take = smoothstep(0.0, 0.08, press - amount);
    side = mix(side, (dir.x * pa.y - dir.y * pa.x) / uRadius, take);
    amount = max(amount, press);
  }
  gl_FragColor = vec4(amount, side, 0.0, 1.0);
}`;

export const sandFragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMask, uWipe;
uniform vec3 uCamPos, uCamF, uCamR, uCamU;
uniform vec2 uTan, uMaskSize;
uniform vec4 uWipeRect;
uniform float uPix, uTime, uForm, uSpan;
uniform vec3 uLight, uSun, uAmbient, uAlbedo, uHaze, uGlintA, uGlintB;
uniform float uGlint, uGlintSharp, uSheen;
${noise}

const float DEPTH = 0.105;
const float RIM = 0.034;
const vec2 WIND = vec2(0.9, -0.436);

float bump(float v, float c, float w) {
  float d = (v - c) / w;
  return exp(-d * d);
}

float reveal(vec2 q) {
  float x = q.x / uSpan + 0.5;
  float wobble = 0.06 * sin(q.y * 1.3 + q.x * 0.4) + 0.03 * sin(q.y * 3.7 + 1.7);
  return smoothstep(0.0, 0.25, uForm * 1.5 - 0.1 - x + wobble);
}

vec3 reliefParts(vec2 q) {
  vec2 mu = q / uMaskSize + 0.5;
  float m = texture2D(uMask, vec2(mu.x, 1.0 - mu.y)).r;
  vec2 w = texture2D(uWipe, (q - uWipeRect.xy) / uWipeRect.zw + 0.5).rg;
  float keep = reveal(q) * (1.0 - smoothstep(0.04, 0.5, w.r));
  float groove = smoothstep(0.2, 0.86, m) * keep;
  float rim = bump(m, 0.15, 0.1) * keep;
  float pressed = smoothstep(0.08, 0.9, w.r);
  float fingers = cos(w.g * 9.0) * 0.5 + 0.5;
  float trail = -0.06 * pressed + 0.042 * bump(w.r, 0.14, 0.1) - 0.03 * fingers * smoothstep(0.25, 0.7, w.r);
  return vec3(-DEPTH * groove + RIM * rim + trail, groove, max(rim, pressed));
}

float relief(vec2 q) { return reliefParts(q).x; }

float ripple(vec2 q, float warp, float pick) {
  float a = dot(q, WIND) * 20.5 + warp;
  float b = dot(q, vec2(0.97, -0.24)) * 17.5 + warp * 0.8 + 2.0;
  return mix(sin(a + 0.35 * sin(a)), sin(b + 0.35 * sin(b)), pick);
}

vec2 duneSlope(vec2 q) {
  const vec2 A = vec2(0.19, 0.11), B = vec2(-0.13, 0.31), C = vec2(0.47, -0.2);
  return A * 0.9 * cos(dot(q, A) + 1.0) + B * 0.35 * cos(dot(q, B) + 4.0) + C * 0.12 * cos(dot(q, C) + 2.0);
}

vec3 glints(vec2 p, float size, float sharp, float core, vec3 N, vec3 H) {
  vec2 g = p / size;
  vec2 id = floor(g);
  vec3 r = hash32(id);
  vec3 r2 = hash32(id + 71.3);
  vec3 facet = normalize(N + vec3(r2.x - 0.5, 0.0, r2.y - 0.5) * 1.5);
  float align = pow(max(dot(facet, H), 0.0), sharp);
  float dotMask = smoothstep(core, core * 0.2, length(fract(g) - 0.3 - 0.4 * r.xy));
  return mix(uGlintA, uGlintB, r.z) * align * dotMask * (0.4 + 1.6 * r2.z);
}

vec3 glitter(vec2 p, float cell, float sharp, float core, vec3 N, vec3 H) {
  float level = log2(cell);
  float base = floor(level);
  return mix(glints(p, exp2(base), sharp, core, N, H), glints(p, exp2(base + 1.0), sharp, core, N, H), level - base);
}

float grain(vec2 p, float cell) {
  float level = log2(cell);
  float base = floor(level);
  return mix(vnoise(p / exp2(base)), vnoise(p / exp2(base + 1.0) + 17.0), level - base);
}

void main() {
  vec2 ndc = vUv * 2.0 - 1.0;
  vec3 rd = normalize(uCamF + ndc.x * uTan.x * uCamR + ndc.y * uTan.y * uCamU);
  float t = -uCamPos.y / rd.y;
  vec2 p = uCamPos.xz + rd.xz * t;
  float fp = t * uPix;
  vec3 V = -rd;

  float warp = vnoise(p * 0.15 + 5.0) * 17.0 + vnoise(p * 0.47 + 9.0) * 9.0 + vnoise(p * 1.3 + 3.0) * 2.6;
  float pick = smoothstep(0.3, 0.7, vnoise(p * 0.27 + 13.0));
  vec3 parts = reliefParts(p);
  float calm = 1.0 - 0.9 * parts.y;
  float wiped = texture2D(uWipe, (p - uWipeRect.xy) / uWipeRect.zw + 0.5).r;
  float rippleAmp = 0.017 * (0.12 + 1.3 * smoothstep(0.15, 0.85, vnoise(p * 0.33 + 31.0))) * calm * (1.0 - 0.8 * smoothstep(0.1, 0.7, wiped));

  float e = max(0.014, fp * 1.4);
  vec2 ex = vec2(e, 0.0);
  float r0 = ripple(p, warp, pick);
  float hx = rippleAmp * (ripple(p + ex, warp, pick) - r0) + relief(p + ex) - parts.x;
  float hz = rippleAmp * (ripple(p + ex.yx, warp, pick) - r0) + relief(p + ex.yx) - parts.x;
  vec2 lumps = (vec2(vnoise(p * 9.0), vnoise(p * 9.0 + 40.0)) - 0.5) * (0.05 + 0.15 * parts.z);
  vec2 grad = vec2(hx, hz) / e + duneSlope(p) + lumps;

  float cell = fp * 1.6;
  vec2 fine = vec2(grain(p, cell), grain(p + 123.4, cell)) - 0.5;
  vec3 N = normalize(vec3(-grad.x - fine.x * 0.5, 1.0, -grad.y - fine.y * 0.5));

  vec3 L = normalize(uLight);
  vec2 ldir = normalize(L.xz);
  float slope = L.y / length(L.xz);

  float shade = 1.0;
  float h0 = parts.x;
  vec2 reach = abs(p + ldir * 0.4) - uMaskSize * 0.5;
  if (max(reach.x, reach.y) < 0.5 || wiped > 0.01) {
    float st = 0.04;
    for (int i = 0; i < 9; i++) {
      float clear = h0 + slope * st - relief(p + ldir * st);
      shade = min(shade, 2.6 * clear / st + 0.5);
      st += 0.035 + st * 0.38;
    }
    shade = smoothstep(0.0, 1.0, shade);
  }
  float crest = 1.0;
  for (int i = 1; i <= 3; i++) {
    float d = 0.05 * float(i);
    crest = min(crest, (rippleAmp * (r0 - ripple(p + ldir * d, warp, pick)) + slope * d) / (slope * d));
  }
  shade *= mix(1.0, smoothstep(-0.6, 0.7, crest), 0.75);

  float ndl = dot(N, L);
  float diffuse = min(pow(max(ndl, 0.0) / L.y, 0.85), 2.6) * shade;
  float tone = 0.9 + 0.2 * vnoise(p * 0.45 + 2.0) + 0.1 * fine.x;
  vec3 albedo = uAlbedo * tone;
  float occlusion = 1.0 - 0.3 * parts.y;
  vec3 col = albedo * (uSun * diffuse + (uAmbient * (0.55 + 0.45 * N.y) + uSun * 0.1 * parts.y) * occlusion);

  vec3 H = normalize(L + V);
  float lit = smoothstep(0.0, 0.25, ndl) * shade;
  col += uSun * uSheen * pow(max(dot(N, H), 0.0), 18.0) * lit;
  vec3 sparkle = glitter(p, fp * 4.5, uGlintSharp, 0.26, N, H) + 2.4 * glitter(p + 31.7, fp * 11.0, uGlintSharp * 2.2, 0.16, N, H);
  col += sparkle * uGlint * (0.25 + 0.75 * lit);

  vec2 along = vec2(dot(p, WIND), dot(p, vec2(-WIND.y, WIND.x)));
  float wisp = vnoise(vec2(along.x * 0.3 - uTime * 0.42, along.y * 2.6)) * vnoise(vec2(along.x * 0.11 - uTime * 0.16, along.y * 0.5 + 4.0));
  float front = reveal(p);
  float dust = smoothstep(0.3, 0.75, wisp) * 0.1 + front * (1.0 - front) * 1.3 * vnoise(vec2(along.x * 0.8 - uTime * 1.6, along.y * 3.0));
  col = mix(col, uHaze * 1.05, clamp(dust, 0.0, 0.6) * 0.7);

  float haze = 1.0 - exp(-max(t - length(uCamPos) * 0.8, 0.0) * 0.085);
  col = mix(col, uHaze, haze);

  vec2 c = vUv - 0.5;
  col *= 1.0 - 0.42 * dot(c, c) * 1.6;

  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  col += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`;
