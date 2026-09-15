# utxo.ag website

Plain static site. No build step, no framework, no bundler. Served by Caddy on Railway behind Cloudflare. `origin/master` is what runs on utxo.ag (`origin/main` is an old, unrelated history, don't base work on it).

## Pages

Every page exists twice: English is the default (`foo.html`), German has the `.de` suffix (`foo.de.html`). Routes are extensionless (`/agents`, `/agents.de`): Caddy redirects `foo.html` to `/foo` (301) and serves `foo.html` at `/foo`. Keep all internal links extensionless.

```
index(.de).html            home: hero banner, top, partners (logo marquee), about (Zug map), team, stories (projects carousel + press teaser #press), products, contact
agents(.de).html           custom CoWorker deep-dive: top, cases, process (roadmap), security, whitepapers, pricing, contact
call_assistant(.de).html   Call Assistant product page with live demo embed
comparison(.de).html       SEO content page "CoWorker vs. Copilot", linked only from the footer "Guides" column
ai-in-business(.de).html   SEO content page "AI in business" guide, linked only from the footer "Guides" column
eu-ai-act(.de).html        SEO guide "EU AI Act" (neutral, sources, as of 2026-09-15), footer "Guides" only, review quarterly
imprint / privacy / terms / acceptable-use / dpa (.de)   legal pages
press(.de).html            press page: outlet logo grid, full coverage list, media contact; linked from the home teaser and the footer
removed-sections.html      archive of sections cut from the original one-pager, not linked, not maintained
```

## Files

```
style.css        @font-face (self-hosted), design tokens, shared component classes (.kicker .btn .prod-* .stage-* .press-* .consent .footer-link)
pages.css        classes only used by the SEO guide pages (.cmpv-* .aibp-* and .gd-* for eu-ai-act), loaded only there
main.js          all behavior in one App object; every init is null-guarded so a page only runs what it contains
config.js        single place for runtime config: gaMeasurementId, callDemoUrl
press.js         single source for press mentions (window.UTXO_PRESS) and outlet logos (window.UTXO_PRESS_LOGOS)
docdemo.js       content of the guided Doc Indexer demo (window.UTXO_DOCDEMO, de + en), rendered by _initDocDemo
fonts/           Manrope + IBM Plex Sans (variable) + IBM Plex Mono 400/500, latin WOFF2 (SIL OFL)
partials/        header(.de).html + footer(.de).html, canonical copies of the page chrome
resources/       images (WebP): Team/, Projects/, logos/, og/ share images, press/ outlet logos (sources in press/SOURCES.md), coworkers/ avatars, agent_hero_anim/ hero sources
sitemap.xml      all public pages with hreflang alternates; update lastmod when content changes
robots.txt       allow all, sitemap reference (Cloudflare may prepend its managed AI-crawler rules)
Caddyfile        routing, security headers, cache headers (HTML/JS/CSS no-cache, media 7 days)
docs/            plans and research (redesign-2026-09-plan.md, press-research-2026-09.json)
changes.md       per-session changelog
```

## Conventions

- **Head block**, same order on every page: charset, canonical, hreflang en/de/x-default, language script, viewport, title, description, Open Graph + Twitter meta, font preloads, icons, `style.css` (+ `pages.css` on SEO pages). Home pages also carry Organization/WebSite JSON-LD. Scripts at the end of body: `config.js`, `press.js` (home and press pages), `docdemo.js` (home only), `main.js`.
- **Language switch**: the home URL `/` is negotiated server-side in the Caddyfile (`@home_de`): cookie `utxo_lang=de` or, without a cookie, an `Accept-Language` starting with `de` serves `index.de.html` at `/` (`Vary: Accept-Language, Cookie`), so the address stays utxo.ag. All links to the German home point to `/` (never `/index.de`); `/index.de` still exists for hreflang/sitemap. The inline head script (identical on all pages) sets the cookie to `de` when a German page is opened without a cookie, never redirects on `/`, and on other English pages redirects to the German alternate for a stored or browser choice of German. `[data-set-lang]` links write the cookie and localStorage. German pages never auto-redirect to English without a stored choice.
- **Header/footer**: no include mechanism. Copy from `partials/header(.de).html` / `partials/footer(.de).html`; on subpages prefix section anchors with the home path (`/#team`, `/index.de#team`) and point `[data-set-lang]` links at the page's own pair. When nav or footer change, update the partials and every page.
- **Design tokens**: surfaces and text stay monochrome. Accent colors come from the pitch deck (`utxo_Deck-Builder/src/lib/deck-constants.ts`: VIZ, VIZ_SOFT, VIZ_LIFT) and are only used for visual elements (dots, lines, icon tiles), never for text. Use `var(--fill-navy|petrol|moss|clay|plum)`: pastel by default, automatically the darker "lift" variant inside `[data-surface="ink"]` (dark sections, footer, mobile overlay). Mapping: Call Assistant petrol, Doc Indexer navy, custom CoWorker plum, Masumi navy, Sokosumi petrol, utxo AG moss; demo roles tenant petrol, manager navy, technician clay; home section kickers about navy, team moss, projects petrol, contact clay. The hero pixel grid tints about 9 % of its cells with the soft accents.
- **CSS math**: inside `clamp()`/`calc()` the `+` and `-` need spaces (`1rem + .4vw`), otherwise the whole declaration is silently ignored.
- **Inline styles**: older sections use inline styles and the `style-hover="..."` attribute (applied by main.js on mouseenter/mouseleave). New components use classes in style.css.
- **Images**: WebP sized for 2x display, e.g. `cwebp -q 82 -m 6 -resize 480 0 in.png -o out.webp` for team photos (shortest side 480). Every `<img>` gets a real `alt` (empty only when decorative) and `loading="lazy"` except the header logo.
- **Copy**: no em or en dashes in new copy, titles or meta. utxo AG is a product studio (software and systems, focus on AI), hence the hero "Das System für Ihren Prozess". Never "bauen/gebaut/build" for utxo's work, always "entwickeln/developed". The offer on the AI page is "KI-CoWorker" (explained as "digitaler KI-Mitarbeiter"); navigation to that page is labelled "Individuelle KI" / "Custom AI". Masumi and Sokosumi are developed for the Serviceplan Group and operated together with them (Sokosumi 13,000+ registered users); NMKR is utxo's first own project, not a client; LCX: infrastructure provided. Hosting on servers in Germany or the EU, local or on-premise on request, model-agnostic. No prices and no phone number on the site.
- **Navigation**: header order on all pages Produkte · Projekte · Team · Individuelle KI, CTA "Erstgespräch buchen" / "Book an intro call" (same label as the home hero). Contact forms carry a response-time and privacy note (`[data-form-note]`).

## Demos

- **Products section** (home): two mini cards side by side (`[data-duo]`, `[data-duo-card]`, `[data-duo-open]`, `_initDuo`) with name, title, text, a static preview graphic and "Demo öffnen". Clicking one sets `data-open` on the container: that card grows to the full product card with its demo, the other shrinks to a narrow rail (vertical name + arrow; a horizontal bar on mobile) that swaps on click. Switching stops a running call demo. Below it a slim "Individuelle KI" bar with a CTA to the contact section.

- **Call Assistant** (products section and call_assistant pages): click-to-load facade, nothing loads until the visitor clicks `[data-demo-start]`; "End demo" removes the iframe (stops mic and session). Markup contract: `.stage[data-demo="call"]` containing `.stage-body`, `[data-demo-idle]`, `[data-demo-stop]`, optional `[data-demo-unavailable]`. Iframe to `callDemoUrl` (demo.anruf-guru.de since 2026-09-15) with `allow="microphone; autoplay"`. The previous anruf-guru.de `/session` endpoint was unauthenticated when checked on 2026-09-14 (cost and abuse risk accepted by Phil); not re-checked for the demo subdomain. `callDemoUrl: ''` hides the start buttons and shows the unavailable note.
- **Doc Indexer** (products section): guided in-page demo `[data-docdemo][data-lang]`, no iframe, content in `docdemo.js` (property example with sample data; roles, permission matrix, questions and original pages are taken from `/Users/phil/claude_builds/docindex-prototyp/docindex.html`). Flow: upload 5 documents (Mietvertrag, Nachtrag Nr. 3, HNK-Abrechnung, Serviceprotokoll Lüftung, Brandschutzordnung), the AI suggestion sets permissions per document and role (editable, marked "changed"), choose one of 4 roles, ask via chat (suggested questions are typed into the input; free text gets an honest "only suggested questions in this demo" reply; after the first question the suggestions collapse, the chat panel has a fixed height so the demo does not resize while answering; roles are compared via "Rolle wechseln"). Answers are assembled at runtime from answer blocks whose `requires` documents are visible to the asking role under the current permissions; missing ones are counted as "not shared", no visible block yields a denial with the shared documents. Every block cites pages; the viewer shows the full original document (all stored pages, thumbnail rail) and highlights `mark`/`tr.hl` only on the cited page. Original pages stay German on the EN site. Keep cited pages present in the doc data (the generator in the session asserted this).
- **Hero swipe** (home hero): `.hero-swipe[data-swipe]` dark edge tab on the right (bottom bar on mobile) linking to `/agents(.de)`; `_initSwipe` plays a cover sweep before navigating and slides it away on arrival (sessionStorage `utxo_swipe`), skipped with reduced motion. It replaces the former black hero banner.
- **Hero pixel grid accents**: about 9 % of cells carry a soft accent color; each tint lives 3.2 to 7.4 s, fades in and out and respawns on a random cell.

## Press

`press.js` holds the curated list: tier `featured` (rank A incl. Patrick Tobler) is always visible on the press page, tier `more` (rank B/C) sits behind "Show N more". Titles and dates were verified against the live articles on 2026-09-14 (`docs/press-research-2026-09.json` has notes on blocked pages, duplicates and corrected CSV dates). The home page only shows a teaser with an auto-scrolling logo carousel (`[data-press-logos="marquee"]`); the press page shows the logos as a grid (`[data-press-logos="grid"]`). Logos come from the outlets' own websites (`resources/press/SOURCES.md`), shown grayscale; only outlets that actually covered the projects are listed.

## Analytics

GA4 with Consent Mode v2, completely off while `gaMeasurementId` is empty (no banner, no Google request). With an ID: banner with equal-weight Decline/Accept, choice stored 12 months in `localStorage.utxo_consent`, gtag.js loads only after Accept, ad signals always denied, footer "Cookie settings" reopens the banner. GA4 admin: Google Signals off, retention 2 months. The privacy policy must name Google Analytics before the ID goes live.

## Local testing

```
brew install caddy
cd /Users/phil/claude_builds/landing-page
PORT=8080 caddy run --config Caddyfile
open http://localhost:8080
```

Caddy reproduces production routing and headers. Browsers cache its 301s, so use a private window when switching servers. `python3 -m http.server` does not resolve extensionless links. To test the language switch, clear `localStorage` and change the browser language.

## Behavior notes

- `team`: horizontal scroll row (`[data-team-grid]`), `_initTeamScroll`, prev/next buttons.
- `stories`: carousel (`[data-carousel]`, `_initCarousel`), dots have 24px hit areas via padding + `background-clip:content-box`.
- `partners`: CSS marquee (`utxomarquee`), pauses on hover.
- Hero: `<canvas data-pixelgrid>` (`_initPixelGrid`), see `hero-image-grid-plan.md`. It animates every frame and is the largest main-thread cost on mobile.
- `contact`: cal.com inline embed (`_initBooking`, loads when the section is within 800px of the viewport) + Formspree callback form (`_initForms`).

## Change tracking

After every change append bullets to `changes.md` under `## <session id> — <UTC date>` (newest session on top). Each bullet: 5 words max, no commas, no parentheses, quote code/section names.
