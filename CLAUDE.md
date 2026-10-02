# utxo.ag website

Plain static site. No build step, no framework, no bundler. Served by Caddy on Railway behind Cloudflare. `origin/master` is what runs on utxo.ag (`origin/main` is an old, unrelated history, don't base work on it). Relaunch of 2026-10 (plan and decisions: `docs/relaunch-2026-10-plan.md`; this file is the current reference where they differ).

## Pages

Every page exists twice, one file per language folder with a translated slug: `de/<slug>.html` is served at `/de/<slug>`, `en/<slug>.html` at `/en/<slug>`. The homes are `de/index.html` at `/de` and `/en`. CoWorker subpages are nested (`de/ki-coworker/compliance.html` at `/de/ki-coworker/compliance`, next to `de/ki-coworker.html` at `/de/ki-coworker`). Internal links are root-absolute, extensionless and without trailing slash.

Routing (Caddyfile, one ordered `route {}`):
1. internal paths 404: `/docs/*`, `/partials/*`, `*.md`, `/removed-sections`, `*.blend`, `/Caddyfile`
2. `/` redirects 302 to `/de` (cookie `utxo_lang=de`, or no `en` cookie and `Accept-Language` starting with `de`), otherwise to `/en`; `Cache-Control: private, no-store`, `Vary: Accept-Language, Cookie`
3. legacy map 301 (`/agents.de` to `/de/ki-coworker`, `/call_assistant` to `/en/ai-phone-assistant`, `/de/index` to `/de` etc.), query string kept
4. `*.html` 301 to the extensionless URL, trailing slash 301 to the path without it
5. `/de`, `/en` rewrite to `index.html`, then `try_files {path} {path}.html =404`

There is no client-side language script. `[data-set-lang]` links (header language switch) only write the cookie `utxo_lang` (1 year) and point to the page's counterpart.

```
/de                          /en                          home: hero, clients (logo row), services, products (ink, incl. Serviceplan block), projects (references, press band), security, about + team, contact, faq
/de/ki-coworker              /en/ai-coworker              KI-CoWorker: difference, cases, process (30 days), security, data, pricing (no prices), whitepapers, contact, faq
/de/ki-coworker/compliance   /en/ai-coworker/compliance   Compliance-CoWorker for regulatory monitoring (internal repo name Themis)
/de/ki-coworker/lead-recherche /en/ai-coworker/lead-research  lead and company research CoWorker: dossier, website detail, competitor benchmark, lead card
/de/ki-coworker/vertrieb     /en/ai-coworker/sales        Sales CoWorker (quote to close, negotiation prep, conditions and special cases)
/de/ki-coworker/technische-pruefung /en/ai-coworker/technical-review  Technical Review CoWorker (diligence check of drawings, parts lists, specifications)
/de/ki-telefonassistent      /en/ai-phone-assistant       KI-Telefonassistent: live call demo (#demo), how, custom, anruf.guru crosslink, data, contact, faq
/de/doc-indexer              /en/doc-indexer              Doc Indexer: animated hero, all document types, shared source (#source), how, summaries with source, guided 4-step demo (#demo), data, contact, faq
/de/coworker-vs-copilot      /en/coworker-vs-copilot      SEO guide, footer "Ratgeber/Guides" only
/de/ki-im-unternehmen        /en/ai-in-business           SEO guide, footer only
/de/eu-ai-act                /en/eu-ai-act                SEO guide (neutral, sources, TOC), footer only, review quarterly
/de/presse                   /en/press                    press: outlet logo grid, coverage list, media contact
/de/impressum /de/datenschutz /de/agb /de/nutzungsrichtlinie /de/avv     legal
/en/imprint /en/privacy /en/terms /en/acceptable-use /en/dpa              legal
```

Deferred, unpublished: `de/kundenakquise-mit-ki.html` + `en/ai-customer-acquisition.html` (old chrome, inline styles). Untracked via `.git/info/exclude`, not linked, not in the sitemap, so they 404 in production. `removed-sections.html` is an unmaintained archive (404 via Caddy).

## Files

```
style.css        @font-face, design tokens, shared components (header, hero, buttons, glass, .pfield, mockups, sections, team, faq, booking, legal, consent); contracts as comments
products.css     product pages and CoWorker subpages only (.pp-* product parts, .th-* compliance block, .lr-* lead research block), loaded after style.css
pages.css        guide and press pages only (.cmpv-* coworker-vs-copilot, .aibp-* ki-im-unternehmen, .gd-* eu-ai-act + deferred guide, .pr-* press)
main.js          all behavior in one App object; every init is null-guarded so a page only runs what it contains
config.js        runtime config: gaMeasurementId, callDemoUrl
press.js         press mentions (window.UTXO_PRESS) and outlet logos (window.UTXO_PRESS_LOGOS)
docdemo.js       Doc Indexer data (window.UTXO_DOCDEMO, de + en): docs, roles, permissions, questions, original pages; single source for every doc mockup
fonts/           Manrope + IBM Plex Sans (variable) + IBM Plex Mono 400/500, latin WOFF2 (SIL OFL)
partials/        header(.de).html + footer(.de).html, canonical copies of the page chrome (home form)
resources/       Team/ (+ Team/Rectangle/), logos/ (clients, partners, products), coworkers/ (Otto, Lena, Kai, compliance CoWorker `compliance-avatar.webp`), products/sokosumi/ (mock avatars), media/ (anruf.guru launch video, poster, DE captions), whitepapers/ (cover thumbnails), press/ (outlet logos, sources in SOURCES.md), og/, FAVICONS/, agent_hero_anim/ (pixel face source)
sitemap.xml      34 public URLs (add new pages) with hreflang de/en/x-default (x-default = en); update lastmod when content changes
robots.txt       allow all, sitemap reference (Cloudflare may prepend its managed AI-crawler rules)
Staticfile       makes Railpack pick the static (Caddy) provider since there is no root index.html; Railpack then uses our Caddyfile
.railwayignore   keeps the deferred SEO pages and local files out of `railway up`
Caddyfile        routing (above), security headers, cache (HTML/JS/CSS no-cache, media 7 days, / no-store)
docs/            plans and research (relaunch-2026-10-plan.md, redesign-2026-09-plan.md, evaluation, research, press-research-2026-09.json)
changes.md       per-session changelog
```

## Conventions

- **Head block**, same order on every page: charset, canonical, hreflang de/en/x-default, viewport, title, description, Open Graph (`og:locale`, `og:url`, og image from `resources/og/`) + Twitter card, JSON-LD, font preloads, icons, `style.css` (+ `products.css` on product pages and subpages, + `pages.css` on guide and press pages). JSON-LD: homes Organization (`https://utxo.ag/#org`) + WebSite; CoWorker, phone, compliance and lead pages Service (provider `#org`); doc-indexer SoftwareApplication; subpages BreadcrumbList; lead research, technical review and eu-ai-act FAQPage (eu-ai-act also Article). No offers (no prices). Scripts at the end of body: `config.js`, `press.js` (home, press), `docdemo.js` (home, doc-indexer; must come before main.js), `main.js`.
- **Page skeleton**: `<div id="utxo-root">` > skip link + header + mobile menu + `<main id="main">` + footer.
- **Header/footer**: no include mechanism. Copy from `partials/header(.de).html` / `partials/footer(.de).html`. On subpages: prefix the header anchors with the home (`/de#services`, `/en#about`), set `aria-current="true"` on the matching nav link (and the mobile `.menu-sub` link), point both language links at the page's own pair (`aria-current="page"` on the current language), and set `aria-current="page"` on the page's own footer link. When nav or footer change, update the partials and every page.
- **Navigation**: DE Leistungen · Produkte · Referenzen · Über uns, EN Services · Products · Projects · About; DE/EN switch; CTA "Erstgespräch buchen" / "Book an intro call" (dark glass `.btn-primary`). Mobile menu (`_initMenu`, Escape closes) adds direct links KI-CoWorker, KI-Telefonassistent, Doc Indexer.
- **Footer**: claim "KI-Software und KI-CoWorker für Unternehmen." Columns Leistungen (KI-CoWorker, Compliance-CoWorker, Lead-Recherche, Vertriebs-CoWorker, Technische Prüfung, KI-Telefonassistent, Doc Indexer), Produkte (external ↗: anruf.guru, Sokosumi, Masumi, NMKR), Ratgeber (CoWorker vs. Copilot, KI im Unternehmen, EU AI Act), Unternehmen (Über uns, Referenzen, Presse, Kontakt), Rechtliches (Impressum, Datenschutz, AGB, Nutzungsrichtlinie, AVV, "Cookie-Einstellungen" button). Bottom: address Zug, "Hosting nach Ihren Anforderungen · DSGVO".
- **Surfaces**: white (default), cream `--bg-cream #F3F0EA` (`.section--cream`), ink `#0b0e12` (`[data-surface="ink"]`: dark sections, footer, mobile menu). Two consecutive sections on the same light surface share one padding. Ink sections reserve header height so anchors land cleanly.
- **Glass** (rules in style.css): only the header after scroll (`_initHeader`: `is-solid` over the hero, `is-glass` afterwards, `is-ink` over ink sections), the home hero swipe panel (dark smoked glass, pixel grid runs under it to the viewport edge), `.btn-primary` (dark glass sitewide, solid `#0b0e12` fallback), `.btn-light` and `.video-play` (light frosted glass, translucent white on ink), and one `.glass.mock-float` per mockup over a static `.pfield`. Never behind running text, forms or the animated canvas; fallbacks for no backdrop-filter and reduced transparency.
- **Pixel field** `.pfield.pfield--plum|petrol|navy|clay|moss`: static pastel rounded squares with a soft falloff toward the copy, the hero motif at rest. Mockups sit in `.pfield.mock-stage[data-play]`.
- **Accents**: from the pitch deck (`utxo_Deck-Builder/src/lib/deck-constants.ts`: VIZ, VIZ_SOFT, VIZ_LIFT), only for visual elements (dots, fields, lines, icon tiles), never for text. Use `var(--fill-*)` / `.dot-*`: pastel by default, the "lift" variant inside `[data-surface="ink"]`. Mapping: KI-CoWorker plum, KI-Telefonassistent petrol, Doc Indexer navy, anruf.guru clay, Compliance-CoWorker clay, lead research moss, Sokosumi moss, Masumi ink. Doc highlights (`mark`, `tr.hl`) use the soft blue `--hl`. A kicker shows its dot only with a `dot-*` class on itself or an ancestor.
- **Type and spacing**: tokens in `:root` (style.css): `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-h3` / `-feature` / `-card` / `-item` (h3 roughly 32/24/19), `--fs-lede`, `--fs-body` 17px, `--fs-label` 12px mono uppercase; spacing `--s-1`..`--s-10` (4 to 128px), `--section-y` max 104px, `--wrap` 1240px, `--page-x`, `--gutter`, radii `--radius-btn|media|card|field`. Fonts: Manrope display, IBM Plex Sans body, IBM Plex Mono labels.
- **Components**: contracts live as comments next to the CSS, read them before reusing a component. style.css: `.section-head`, `.kicker`, `.lede`, `.btn*`, `.link-arrow`, `.text-link`, `.hero` / `.hero-swipe`, `.hero-product[--stack]`, `.page-hero`, `.clients`, `.showcase[--flip]`, mockups `.mock-mail` (CoWorker), `.mock-board` (phone), `.mock-doc` (Doc), `.mock-soko`, `.mock-masumi`, `.partner`, references/press band, `.control` (home security, EU stars watermark), `.steps`, `.team-grid`, `.faq-layout`, `.booking`, `.legal`, `.gd-toc`. products.css: `.pp-hero`, `.pp-net`, `.pp-points`, `.pp-ref`, `.pp-tiles` + `.pp-mini--*`, `.pp-tl` + `.pp-effort`, `.pp-audit` / `.pp-log`, `.pp-comp` + `.pp-eu`, `.pp-price`, `.pp-papers`, `.pp-stage` (call demo idle), `.pp-flow`, `.pp-guru`, `.pp-qtiles`, `.pp-matrix`, `.pp-roles`, `.pp-docstrip`, then the `th-` block ("compliance subpage") and the `lr-` block ("lead research subpage"). New subpages get their own delimited block.
- **Mockups**: HTML/CSS with sample data, no images of UI, `[data-play]` plays once in view (`_initPlay`; all visible without JS or with reduced motion). Mail, board, Sokosumi, Masumi, audit log, compliance and lead research mockups are static HTML in the page. Every Doc Indexer mockup is rendered from `docdemo.js`: `[data-docquote]` (`_initDocQuote`, answer + cited page), `[data-docmatrix]`, `[data-docroles]`, `[data-docfiles]`, `[data-docfolder]` (`_initDocViz`). Change doc content only in docdemo.js. Sokosumi and Masumi mockups stay English (`lang="en"`) as in the products.
- **Shared files** (several agents work in parallel): `style.css`, `products.css` and `main.js` are only edited inside delimited blocks (`/* --- <name> --- */ ... /* --- end <name> --- */`, in JS `// --- <name> ---`); a new feature adds its own block instead of editing other blocks.
- **CSS math**: inside `clamp()`/`calc()` the `+` and `-` need spaces (`1rem + .4vw`), otherwise the whole declaration is silently ignored.
- **Inline styles**: none in published pages except CSS custom properties as data (`style="--n:5"`, `style="--v:24"`). The `style-hover` handler in main.js only serves the deferred guide pages.
- **Images**: WebP sized for 2x display, e.g. `cwebp -q 82 -m 6 -resize 480 0 in.png -o out.webp` for team photos. Every `<img>` gets a real `alt` (empty only when decorative), `width`/`height`, and `loading="lazy"` except the header logo.
- **Copy**:
  - no em or en dashes in copy, titles or meta; Sie-Form; US spelling on EN.
  - always "utxo AG" (lowercase, also in legal texts), never bare "utxo" or "UTXO AG"; technical identifiers (utxo.ag, utxo_lang) stay as they are.
  - never "bauen/gebaut/build" for utxo AG's work, always "entwickeln/developed".
  - never "Werkzeuge" for tools in German copy; use "Tools", "Systeme", "Anwendungen" or "Programme".
  - no prices (only inside the anruf.guru launch video end card), no phone number.
  - heroes: headline max 2 lines at 1280/1440 (max 3 at 390), lede one short sentence (max 2 lines on desktop); shorten wording rather than shrinking type.
  - Sokosumi: "Die Plattform für Marketing-Teams: KI-CoWorker und KI-Agenten beauftragen und im Team mit ihnen zusammenarbeiten.", 13'000+ registrierte Nutzer (EN 13,000+). Masumi: "Die dezentrale Infrastruktur, über die KI-Agenten sich finden, ausweisen und bezahlen." (EN "Decentralized payments, identity and discovery for AI agents.").
  - Serviceplan Group: "Europas grösste inhabergeführte Agenturgruppe"; Sokosumi and Masumi "Gemeinsam mit der Serviceplan Group entwickelt und betrieben", "utxo AG verantwortet Technologie und Hosting". NMKR is utxo AG's first own project, not a client.
  - anruf.guru is an answering machine that does not talk (takes the message, sorts it); the KI-Telefonassistent is a custom real-time voice assistant. Keep that difference explicit.
  - The compliance CoWorker is named "Compliance-CoWorker" (EN "Compliance CoWorker"), never "Themis" on the site (Themis is only the internal repo name). It works standalone, without Sokosumi; scope is monitoring of official sources with severity and deadline, no legal advice ("Keine Rechtsberatung" note).
  - EU AI Act: "ausgerichtet an der EU-KI-Verordnung", never "konform/compliant". ISMS "ausgerichtet an ISO/IEC 27001:2022", no ISO certification claim.
  - Hosting is always set per project: "Hosting nach Ihren Anforderungen: Deutschland, EU oder on-premise"; never promise a fixed location. Model-agnostic; local open-source models "prüfen wir projektbezogen". The AVV is always created individually per project (stack, subprocessors, region, TOM); `/de/avv` is a template. A pilot takes about 30 days ("Pilot in rund 30 Tagen"). The website itself is hosted on Railway.
- **Contact**: `.booking` on home, product pages, subpages and two guides: cal.com calendar (about 60 %) + Formspree callback form (about 40 %, no message field, `[data-form-note]` with response time and privacy). FAQ comes after contact on cream, ending with "Ihre Frage fehlt? business@utxo.ag". Email everywhere: business@utxo.ag.

## Demos

- **Call demo** (`/de/ki-telefonassistent#demo`, `/en/ai-phone-assistant#demo`): click-to-load facade, nothing loads until `[data-demo-start]` is clicked; "Demo beenden" removes the iframe (stops mic and session). Contract: `.stage.stage-call.pp-stage[data-demo="call"]` with `.stage-body`, `[data-demo-idle]` (compact transcript preview), `[data-demo-stop]`, optional `[data-demo-unavailable]`. Iframe to `callDemoUrl` (`https://demo.anruf-guru.de/`) with `allow="microphone; autoplay"`. `callDemoUrl: ''` hides the start buttons and shows the unavailable note. The old anruf-guru.de `/session` endpoint was unauthenticated on 2026-09-14 (risk accepted by Phil); not re-checked for the demo subdomain.
- **Doc Indexer guided demo** (`/de/doc-indexer#demo`): `[data-docdemo][data-lang]`, no iframe, content in `docdemo.js` (property example with sample data, taken from `/Users/phil/claude_builds/docindex-prototyp/docindex.html`). Flow: upload 5 documents (Mietvertrag, Nachtrag Nr. 3, HNK-Abrechnung, Serviceprotokoll Lüftung, Brandschutzordnung), AI suggestion sets permissions per document and role (editable, marked "geändert"), choose one of 4 roles, ask via chat (suggested questions only; free text gets an honest reply; fixed chat height; "Rolle wechseln" compares roles). Answers are assembled from blocks whose `requires` documents are visible to the role; missing ones count as "nicht freigegeben", no visible block yields a denial. Every block cites pages; the viewer shows the full original and highlights `mark`/`tr.hl` in soft blue only on the cited page. Original pages stay German on EN. Keep cited pages present in the doc data. A document strip (`[data-docfiles]`) sits above the demo.
- **Hero swipe** (home): `.hero-swipe[data-swipe]` dark glass panel on the right (bottom on mobile) with a short copy block (no CoWorker list), fading out toward the bottom together with the pixel grid, links to `/de/ki-coworker` / `/en/ai-coworker`; `_initSwipe` plays a cover sweep before navigating and slides it away on arrival (sessionStorage `utxo_swipe`), skipped with reduced motion.
- **Hero pixel grid** (`canvas[data-pixelgrid]`, `_initPixelGrid`): home in spotlight mode (`data-spotlight-only`), product and subpage heroes with the pixel face (`resources/agent_hero_anim/head_1_crop.webp`). About 9 % of cells carry a soft accent tint. Pauses off screen and in hidden tabs. See `hero-image-grid-plan.md`.
- **Video** (home, anruf.guru): `figure.video[data-video]`, `preload="none"`, source in `data-src`, loads on click (`_initVideo`), German captions; EN labels it "Video in German, with German captions."

## Calendar booking

`_initBooking`: inline cal.com embed `.booking-cal[data-cal-inline][data-cal-theme="dark"][data-cal-compact]` loads when within 1600px of the viewport. Below 920px the inline embed is replaced by `[data-cal-popup]` (button opens the cal.com modal, script preloads near view). Heights are reserved in CSS (calendar column min 776px wide so cal.com uses its compact month view, min-height 596px, skeleton placeholder in the embed colour `#181d24`), CLS 0. Calendar and callback box share background and height. cal.com link `philip-isenmann-utxoag/30-min-meeting` in main.js (`_calLink`). The embed language follows the visitor's browser (no working locale option); week starts Monday (set in the cal.com account).

## Team

Static grid on the home `#about` (`.team-grid`, 7 columns, 5 tablet, 3 mobile), one aspect ratio, grayscale, colour on hover. Photos in `resources/Team/` and `resources/Team/Rectangle/`. Full names with a LinkedIn icon (`.team-in`, surname and icon kept together in `.team-ln`); the icon shows on hover/focus on pointer devices and always on touch. Names and LinkedIn URLs follow https://www.nmkr.io/about. `_initTeamScroll` is left over from the old scroll row and currently has no target.

## Press

`press.js` holds the curated list: tier `featured` is always visible on the press page, tier `more` sits behind "Show N more" (`[data-press]`, `[data-limit]`, `[data-filter-lang]`). Titles and dates verified on 2026-09-14 (`docs/press-research-2026-09.json`). The home shows a press band with three headlines (DE: German, EN: English-language articles) and the logo row (`[data-press-logos][data-limit]`; in progress: an animated logo carousel in the home press section); the press page shows the logos as a grid (`[data-press-logos="grid"]`, logos in the hero above 1100px). Logos come from the outlets' own websites (`resources/press/SOURCES.md`), grayscale, optically normalised per file; only outlets that actually covered the projects. Press titles are quoted as published (e.g. "Marktplatz").

## Analytics

GA4 with Consent Mode v2, ID set in `config.js` (`G-35CTMZQ9Z1`); privacy pages name Google Analytics. Banner with equal-weight Decline/Accept, choice stored 12 months in `localStorage.utxo_consent`, gtag.js loads only after Accept, ad signals always denied, footer "Cookie-Einstellungen" reopens the banner. With an empty ID everything is off (no banner, no request). GA4 admin: Google Signals off, retention 2 months.

## English home

`en/index.html` was generated from `de/index.html` by a port script (about 150 exact DE to EN string replacements plus the EN partials; it fails if a DE string is missing). The script lived in the session scratchpad and is gone. Keep DE and EN in sync manually: make every home change in both files, and the same for every other page pair.

## Local testing

```
brew install caddy
cd /Users/phil/claude_builds/landing-page
PORT=8080 caddy run --config Caddyfile
open http://localhost:8080
```

Caddy reproduces production routing and headers; use a free port per server (`PORT=8098` etc.) and stop old ones. Browsers cache 301s, so use a private window when switching servers or after Caddyfile changes. `python3 -m http.server` does not resolve extensionless links. To test the language redirect on `/`, delete the `utxo_lang` cookie and change the browser language.

## Behavior notes

- `_initHeader`: header states over hero / content / ink.
- `_initReveal`, `_initPlay`: reveal and play-once animations, off with reduced motion.
- `_initHeroRotator`: rotating word on ki-im-unternehmen / ai-in-business (`data-sizer` keeps the size stable).
- `_initToc`: eu-ai-act TOC, open above 960px, active section highlight. `_initTables`: stacked mobile labels for `.legal-table`.
- Hero canvas animates every frame and is the largest main-thread cost on mobile.

## Open items

- Lawyer review of the new legal clauses (exclusions for anruf.guru, Sokosumi, Masumi in AGB, AVV, Datenschutz, Nutzungsrichtlinie, EN counterparts) before deploy.
- Whitepaper PDFs (Google Drive links) still say "rund 20" and "bauen"; no English PDFs, EN shows the German covers.
- Legal: lawyer review per `docs/legal-review-2026-10.md` before deploy. AGB are now "Allgemeine Geschäftsbedingungen" (individual development, offer/contract prevails).
- Demo domain demo.anruf-guru.de: confirm long-term host and re-check the session endpoint.
- Deferred guides (kundenakquise-mit-ki, ai-customer-acquisition): move to the new chrome or drop; the legacy 301s to them currently end in 404.

## Change tracking

After every change append bullets to `changes.md` under `## <session id> — <UTC date> UTC` (newest session on top). Each bullet: 5 words max, no commas, no parentheses, quote code/section names.
