# utxo.ag landing page

Plain static site. No build step, no framework, no bundler. Two pages: `index.html` (main/home) and `agents.html` (deep-dive). Open either directly or serve with any static file server.

## Structure

```
index.html            main page — sections: top (hero, links to agents.html), partners (logo marquee), team (Meet the coworkers), stories (Projects, id="stories")
agents.html            agents page — sections: top (hero), how (One coworker...), process (ready in 30 days), security, pricing, contact (booking widget). Formerly index.html, renamed when the main page was split out.
style.css             :root design tokens, resets, keyframes, responsive breakpoints
main.js               all interactive behavior (mobile menu, scroll reveals, pixel-grid canvas, hover effects, case-study/orchestration animations, booking widget, team-row scroll, project carousel) — shared by both pages, all DOM lookups are null-guarded so missing sections on either page are fine
resources/            images. Old files are resources/<uuid>.<ext>; newer additions use plain names in subfolders: resources/Team/ (staff photos), resources/logos/ (partner marquee), resources/agent_hero_anim/ (hero pixel-grid source images, see hero-image-grid-plan.md)
partials/header.html  canonical copy of the header + mobile nav overlay markup (matches agents.html's current header — copy and adapt nav links per page, they differ between index.html and agents.html)
partials/footer.html  canonical copy of the footer markup (matches agents.html's current footer — same caveat)
removed-sections.html backup of sections cut from the original one-pager (see below) — not linked/served, archive only
changes.md             per-session changelog, see Change tracking below
hero-image-grid-plan.md  plan for driving hero pixel-grid off resources/agent_hero_anim/ images — implemented (see Notes)
```

## Page split

`index.html` used to contain everything (see History below). It was split: the original file was renamed to `agents.html`, and a new `index.html` was created as the main/home page. `partners`, `team`, and `stories` sections moved from `agents.html` to the new `index.html`. `index.html`'s hero has new copy and a single CTA linking to `agents.html`; `agents.html` kept its original hero copy unchanged. Nav (header/mobile overlay/footer) is split per page: `index.html` nav has Team/Stories anchors plus an "Agents" link to `agents.html`; `agents.html` nav has How/Security/Pricing anchors plus the logo links back to `index.html`. Book-a-call links on `index.html` point to `agents.html#contact` since the contact section only lives on `agents.html`.

## History

`index.html` used to be a single-file export from a bundler tool: ~1.5MB, real markup escaped inside a JS string, fonts/images inlined as base64 in a manifest blob. That file has been unpacked into the plain files above and deleted. Fonts (IBM Plex Mono, IBM Plex Sans, Manrope) now load from Google Fonts via `<link>` in `<head>` instead of inlined `@font-face` base64.

7 sections were then cut from the one-pager: `coworker`, an anonymous stat band, `team`, `why`, `background`, `work`, `stories`. Their exact markup (with original `<!-- FOLD n -->` comments) lives in `removed-sections.html`, labeled per section, in original order — restore by copying a block back into `index.html` at the right spot. Nav links to the still-removed sections (`#work`) were deleted from header nav, mobile overlay nav, and footer nav in both `index.html` and `partials/*.html` — don't re-add unless the section comes back.

`team` and `stories` were later restored, each with nav links re-added in all 3 nav spots × `index.html` + both partials. `removed-sections.html` still has copies of both (stale, not kept in sync — don't use it as their source of truth anymore).

- `team`: originally positioned before `how`. Its 4 local `resources/*.jpg` portraits were swapped for stock photos from `randomuser.me`, then later swapped again for real NMKR staff photos sourced from nmkr.io/about, now living in `resources/Team/*.png` (some under `resources/Team/Rectangle/` — outpainted-to-rectangle versions of a few circle-cropped originals, done via `google/gemini-2.5-flash-image` over OpenRouter). Layout changed from a static grid to a horizontally-scrolling row (`[data-team-grid]`, flex + scroll-snap, scrollbar hidden), driven by `_initTeamScroll` in `main.js` with floating prev/next buttons (`[data-team-prev]`/`[data-team-next]`). The old `max-width:980px` grid-template-columns rule for `[data-team-grid]` in `style.css` is now dead (grid became flex) but hasn't been removed. Later moved to `index.html` (see Page split above), positioned after `partners`.
- `stories`: originally positioned right after `how` (per explicit request — not its original FOLD position, which was later in the page). Markup unchanged from archive. Later moved to `index.html`, positioned after `team`. Nav label and heading later changed from "Customer stories" to "Projects" (section `id="stories"` and anchor `#stories` unchanged). Carousel behavior (`[data-carousel]`/`[data-carousel-track]`/`[data-carousel-slide]`/`[data-carousel-dot]`) driven by `_initCarousel` in `main.js`; prev/next buttons moved above the cards, dot indicator below.

A new `partners` section (logo marquee, not from the archive) was added right after `top`/hero on what was then the only page. Logos live in `resources/logos/` and scroll via the `utxomarquee` keyframe in `style.css` (`[data-marquee]`/`[data-track]`, pauses on hover). Now lives on `index.html`.

## Adding a new page

There's no templating/include mechanism — copy the header and footer markup from `partials/header.html` and `partials/footer.html` directly into the new page's `<body>`, link the same `style.css` and `main.js`, and match the `<head>` boilerplate (Google Fonts links, viewport meta) from `agents.html`. Adjust nav links/hrefs to fit which sections actually live on the new page (see Page split above for how `index.html` vs `agents.html` diverge). If nav links change, update `partials/*.html` AND every page that copied them — nothing keeps them in sync automatically.

## Change tracking

After every change made to this project, append a bullet point to `changes.md` describing it. Group bullets under a heading per session, formatted `## <session id> — <UTC date time>`. Add new sessions/entries at the top or bottom consistently (top = newest first). Each bullet: 5 words max, no commas, no parentheses. Quote code/section names, e.g. "how" section.

## Notes

- `style-hover="..."` attributes on elements are a leftover convention from the old bundler (inline hover styles without real CSS classes). `main.js` applies them generically via mouseenter/mouseleave — no CSS `:hover` rules exist for them. Keep using this pattern (or migrate to real CSS classes) when touching those elements.
- Kept sections still carry the original copy and inline styles verbatim, just de-bundled — no rewrite/reduction of the surviving content itself.
- `hero-image-grid-plan.md` describes swapping the hero `<canvas data-pixelgrid>` (`_initPixelGrid` in `main.js`) from a procedural Gaussian spotlight to per-cell luminance sampled from `resources/agent_hero_anim/` images, crossfading between them. Implemented — `IMAGE_SRCS` in `main.js` points at `resources/agent_hero_anim/group.webp` and `head_1.webp` (renamed from extensionless originals), cols/rows quadrupled vs the old spotlight grid, images crossfade every `CYCLE_MS`=6000ms over `FADE_MS`=700ms, shimmer/noise kept on top of sampled luminance.
