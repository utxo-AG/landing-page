# utxo.ag landing page

Plain static site. No build step, no framework, no bundler. Open `index.html` directly or serve with any static file server.

## Structure

```
index.html        page markup (one-pager: hero, coworker, team, why, background, how, process, work, stories, security, pricing, contact)
style.css         :root design tokens, resets, keyframes, responsive breakpoints
main.js           all interactive behavior (mobile menu, scroll reveals, pixel-grid canvas, hover effects, case-study/orchestration animations, booking widget)
resources/        images, referenced as resources/<uuid>.<ext>
partials/header.html   canonical copy of the header + mobile nav overlay markup
partials/footer.html   canonical copy of the footer markup
```

## History

`index.html` used to be a single-file export from a bundler tool: ~1.5MB, real markup escaped inside a JS string, fonts/images inlined as base64 in a manifest blob. That file has been unpacked into the plain files above and deleted. Fonts (IBM Plex Mono, IBM Plex Sans, Manrope) now load from Google Fonts via `<link>` in `<head>` instead of inlined `@font-face` base64.

## Adding a new page

There's no templating/include mechanism — copy the header and footer markup from `partials/header.html` and `partials/footer.html` directly into the new page's `<body>`, link the same `style.css` and `main.js`, and match the `<head>` boilerplate (Google Fonts links, viewport meta) from `index.html`. If nav links change, update `partials/*.html` AND every page that copied them — nothing keeps them in sync automatically.

## Notes

- `style-hover="..."` attributes on elements are a leftover convention from the old bundler (inline hover styles without real CSS classes). `main.js` applies them generically via mouseenter/mouseleave — no CSS `:hover` rules exist for them. Keep using this pattern (or migrate to real CSS classes) when touching those elements.
- Section content itself has not been trimmed/reorganized yet — `index.html` still carries the full original copy and inline styles verbatim, just de-bundled.
