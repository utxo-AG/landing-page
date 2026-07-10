# Drive hero pixel-grid tiles from images

## Context

The hero section (`index.html`/`agents.html`, both share `main.js`) has a `<canvas data-pixelgrid>` tile grid animated by `_initPixelGrid()` (main.js:406-472). Today every tile's brightness/opacity is 100% procedural: a slowly-drifting 2D Gaussian "spotlight" plus per-cell sine shimmer and static random jitter — no image or texture involved.

User wants the tile pattern driven by actual images instead of the math-only spotlight, cycling through the images in `resources/agent_hero_anim/` (currently 2 WebP files, saved without extensions: `group` 572×360, `head_1` 639×360). Chosen mode: **static reveal** — per-cell brightness = that image's luminance sampled onto the grid (cover-crop, like `background-size:cover`), with the existing shimmer kept on top for subtle life. The moving Gaussian spotlight goes away entirely; the image *is* the pattern now.

Site is a plain static build (no bundler, no server MIME config), so the two extensionless WebP files should be renamed with `.webp` before use, matching every other file in `resources/` which already carries an extension. There's no way to list a directory at runtime in a plain static site, so the image list is a hardcoded array in `main.js` — consistent with this project's existing "no templating, manually kept in sync" convention (per CLAUDE.md).

## Approach

All logic changes confined to the `_initPixelGrid(root, reduce)` closure in `main.js`. No changes needed to `index.html`, `agents.html`, or `style.css` — canvas markup and its mask CSS are unaffected.

**1. Rename source images** (untracked files, safe rename):
```
mv resources/agent_hero_anim/group  resources/agent_hero_anim/group.webp
mv resources/agent_hero_anim/head_1 resources/agent_hero_anim/head_1.webp
```

**2. New state in `_initPixelGrid`** (alongside existing `phase`/`noise`/`cv`/`ctx` locals):
- `IMAGE_SRCS` array pointing at the two renamed files.
- `CYCLE_MS = 6000` (hold time per image), `FADE_MS = 700` (crossfade duration) — pure constants, no timers.
- `images` array: one `{ src, el: new Image(), ready, luma }` per source, loaded once via `el.onload`/`el.src` at init time (not inside `build()`).
- One offscreen `sampleCv`/`sampleCtx` (never appended to DOM), `imageSmoothingQuality:'high'`.

**3. `resampleImage(idx)` helper**: draws the loaded image cover-cropped into a tiny `cols x rows` offscreen canvas (letting the browser's own bilinear downscale do per-cell averaging — no manual `getImageData`-on-full-res needed), then `getImageData` → per-cell luminance (`0.2126R+0.7152G+0.0722B`, normalized 0-1) into a `Float32Array`. Row-major indexing matches the existing `k = j*cols+i` used throughout `draw()`.

**4. `build()` (main.js:407-422)**: drop dead `sigma` computation (was spotlight-only). Shrink cell size to 1/4 current so the image reads at much finer resolution: `cols = Math.max(9, Math.min(20, Math.round(W / 46)))` → `cols = Math.max(36, Math.min(80, Math.round(W / 11.5)))` (divisor and clamp bounds all ×4, keeping the same aspect/behavior just at 4x grid density). `cell = W / cols` formula itself is unchanged — it naturally shrinks as `cols` grows. `gut`/`rad` formulas stay as-is (derived from `cell`, so they scale down automatically too). After the existing grid-sizing code, re-run `resampleImage` for every already-loaded image (handles both init and every `ResizeObserver` resize) — this also means each image gets sampled at 4x the cell resolution, i.e. more luminance detail per image.

**5. `draw(t)` (main.js:423-450)**: remove the Gaussian spotlight block (`cx`, `cy`, `s2`, per-cell `g`). Add per-frame: `curIdx`/`prevIdx` from `t` via modulo against `CYCLE_MS`, `fadeT` from `t % CYCLE_MS` over `FADE_MS`. Replace the `g`-based intensity line with a per-cell luminance lerp between `prevIdx`/`curIdx`:
```js
const L = lumaAt(prevIdx, k) * (1 - fadeT) + lumaAt(curIdx, k) * fadeT;
let v = L * (0.34 + 0.5 * shim) + noise[k] * 0.04 * L;   // g -> L, same shape as before
```
Everything downstream (clip, alpha, color ramp, `rrect`+`fill`) stays identical — minimal diff. Unloaded images just contribute luminance 0 (tiles fall under the existing `v < 0.018` skip) — no loading-state machine needed, decode is fast for these small local files.

**6. Reduced motion** (`reduce` path calls `draw(2600)` once, main.js:465-469): with the constants above this lands mid-hold on image 0 at `fadeT=1` (no blend) — same "single static frame" behavior as today, no special-casing required. Note: this depends on `2600 % CYCLE_MS > FADE_MS`; if `CYCLE_MS`/`FADE_MS` are retuned later, re-check that invariant.

**7. Cleanup**: no change needed — `App.destroy()` still just cancels `_pgRAF`; no `setInterval`/timers introduced, all cycling state lives in the same closure as `phase`/`noise` already do.

**8. Changelog**: append bullets to `changes.md` under today's session heading, 5 words max, no commas/parens (e.g. "Hero grid driven by images", "Renamed hero anim images .webp"), matching this file's existing convention.

## Critical files
- `main.js` — `_initPixelGrid` (main.js:406-472)
- `resources/agent_hero_anim/group` → `group.webp`
- `resources/agent_hero_anim/head_1` → `head_1.webp`
- `changes.md`

## Verification
- Serve the site locally (any static file server) and open `index.html` and `agents.html`; confirm hero canvas now shows an image-shaped tile pattern instead of a roaming spotlight blob, and that it crossfades between `group.webp` and `head_1.webp` every ~6s.
- Resize the browser window; confirm the grid re-samples cleanly at new `cols`/`rows` (no stretched/stale pattern).
- Toggle OS "reduce motion" and reload; confirm a single static image-driven frame renders, no animation.
- Check devtools console for image-load or `getImageData` errors (would surface as taint/security errors if paths were wrong — shouldn't happen, same-origin local assets).
