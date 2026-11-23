# Website 2027: plan for the home page (draft F to full page)

Status 2026-11-23: phase 1 implemented in `web/` (Astro; see `CLAUDE.md`, section "Astro project in `web/`"), waiting for Phil's review before phase 2. All six questions are answered (see section 9). Binding basis is draft F in `web/drafts/` (`f.html`, `f.js`, `page.js`, `blocks.js`, `drafts.css`; run with `cd web/drafts && python3 -m http.server 8131`, open `http://localhost:8131/f.html`). Drafts a to e are discarded experiments. Copy rules: `CLAUDE.md`, section "Copy".

## Start here (handover 2026-11-23)

- Branch `website-2027` (from `origin/master`, no upstream set, nothing pushed). Drafts and this plan are committed.
- Phase 1 in section 8 is done (Astro project in `web/`, header with menu, hero, overview, Managed Agents on the loop controller). Next step after Phil's review: phase 2. `web/drafts/` stays untouched as the reference.
- Look at draft F first, in a real browser, including motion: `cd web/drafts && python3 -m http.server 8131`, then `http://localhost:8131/f.html`.
- Three.js r187 is vendored in `web/drafts/vendor/`; the Astro project should install `three` from npm instead.
- Working rules from Phil: plan before coding, check results in a real browser (motion and phone view), keep `CLAUDE.md` and `changes.md` in sync, use subagents to keep the context clean, German copy rules from `CLAUDE.md`.
- Untracked leftovers of abandoned attempts, not part of this plan: `site/`, `docs/site-2027-concept.md`, `docs/site-2027-drafts/`.
- Before any merge to `master`: the live site serves the repository root, so `/web/` must be blocked in the `Caddyfile` or replaced by the Astro build output.

The plan was produced by a planning subsession from the files only; it did not open the draft in a browser, so every frame cost and size figure below is a target, not a measurement.

## Decisions by Phil (binding)

- Reference for the look: lusion.co hero area (clean, expensive, one strong visual per viewport, big calm type, generous whitespace, one edge everything aligns to, pill buttons; no borders, cards with shadows, icons or bold decoration).
- Audience: enterprises and the largest agency groups; largest client Serviceplan Group. Tone: serious, established; utxo AG is a software development team. No puns, no "marketing bang", no typical AI phrasing (no constructed contrasts, no three-part lists as slogans). Software first; KI-Agenten are part of the offer.
- Header headline: "Moderne Software für digitale Transformation." (semibold) / "KI-native Lösungen für komplexe Unternehmensanforderungen." "Software" must not appear twice.
- Six services: 1 Software Development (including KI-gestützte Software), 2 KI-Automationen, 3 Managed Agents, 4 Agent Factories und KI-Infrastruktur, 5 AI Adoption und Consulting, 6 Agentic CoWorker (they integrate into the team like colleagues).
- Little focus on individual agents or use cases; focus on the product "KI-Agenten", all services and the positioning.
- "Wenig scrollen": short scroll, then the animation runs by itself. No long scroll-scrubbed or pinned stretches, no scroll hijacking. Sections replay their animation every time they scroll into view.
- Every service gets one focused visual with a statement; no decoration. No product videos exist.
- Mockups get the main focus: where it makes sense permanently in motion and looping, elaborate but clearly understandable and innovative. Mockup world: mostly neutral product surfaces, a concrete agency example in one or two places.
- Home page only for now (detail pages prepared, not planned). Extra sections: "Referenzen und Kunden" and a closing CTA. No team section, no separate positioning section.
- Section headline = service name. No accent colour: black, white, greys, dark stage gradient with a hint of phthalo green and fine grain. Font: Manrope only.
- Language: German first (assumed, the question was left unanswered); English must be technically possible later.
- Service 4 is named "Agent Factories und KI-Infrastruktur", without "digitale" (answer to question 4).
- Logos and figures from the old site may be used (answer to question 5). Fictional names and sample content in the mockups are fine (answer to question 6).
- "Mehr erfahren" pills are hidden until detail pages exist (answer to question 3); the copy blocks in section 2 keep the label for later.
- Service headlines may be set smaller than the current 8.6vw so that long names fit (answer to question 4).
- RST Datentechnik is not shown as a reference for now (does not fit the positioning at the moment).
- Astro is approved (answer to question 1): static output, build step on Railway.
- Pages besides the home (answer to question 2): legal pages, Presse and "Über uns", all new in the new design, plus links to the products with Sokosumi and Masumi first. Confirmed: the other old pages (CoWorker subpages, KI-Telefonassistent, Doc Indexer, guides) are not carried over for now and need 301 redirects at cutover. The team belongs on "Über uns", not on the home.

## 1. Page structure

| # | id | Purpose | Height | Surface |
|---|---|---|---|---|
| 1 | header + `#top` | Headline, CTA, wordmark stage (approved) | 1.0 vh | dark stage, full width |
| 2 | `#leistungen` | Six rows (approved); each row now links to its section | 0.6 | light |
| 3 | `#software-development` | Service 1 | 1.0 | light window on the page |
| 4 | `#ki-automationen` | Service 2 | 0.9 | open diagram, no frame |
| 5 | `#managed-agents` | Service 3 | 1.0 | dark tablet (approved) |
| 6 | `#agent-factories` | Service 4 | 1.1 | dark stage, full width |
| 7 | `#ai-adoption` | Service 5 | 0.9 | open, no frame |
| 8 | `#agentic-coworker` | Service 6 | 1.0 | light window |
| 9 | `#referenzen` | Referenzen und Kunden | 1.0 | light, deliberately still |
| 10 | `#kontakt` + footer | Closing CTA | 0.9 + 0.3 | dark stage, full width |

Total is about 9.7 viewports. The full dark stage appears three times (start, middle, end). Between them the page alternates framed and open mockups, so no two neighbours share a container type. The headline always sits on the left edge; only the mockup column changes (01 and 06: columns 5 to 12; 03: 1 to 7 as approved; 02, 04, 05: full width).

## 2. Mockup system and the six concepts

**Shared grammar (what makes six mockups one system):**
- One label row at the top: context on the left, a state on the right ("Live").
- 3px tracks, status pills, hairlines, Manrope only.
- "Beispielansicht mit Beispieldaten" under every mockup.
- One semantic rule on all six: the filled white pill always means a human decides ("Ihre Freigabe"). Everything else is grey on grey. This gives the page a highlight without an accent colour.
- The cube from the hero returns as the unit of "one agent" in 04 only.
- All labels are real DOM or SVG text, never canvas, because EN has to be possible later.
- Hover on a pointer device slows the loop to 0.35x. No tooltips. On touch nothing happens, except the one button in 03.

### 01 Software Development
- **Statement:** From a requirement to released software in one continuous, tested flow.
- **On screen:** a white application window with three columns.
  - "Anforderungen": four rows ("Freigabe-Workflow", "Rollen und Rechte", "Schnittstelle ERP", "Auswertung").
  - "Code": abstract line bars with a few readable tokens.
  - "Anwendung": a product interface made of four regions (table, form, chart, navigation).
  - Foot: "Tests 212 / 212", "Version 2.4.0", "Ausgeliefert 14:32".
- **Entry (2.4 s):** window rises, columns draw in, the interface appears as grey placeholder blocks.
- **Loop (16 s, 4 s per requirement):** a requirement is marked, code lines write themselves, the matching region changes from placeholder to real UI, the test counter runs up, the version increments.
- **Restart:** from the second pass each region swaps to a second variant instead of going back to placeholders, so the interface is never empty. Two variants alternate.
- **Technique:** DOM/CSS driven by the step sequencer, because it is text and boxes that must be crisp and translatable. Under 1 ms of script per frame, transforms and opacity only.
- **Reduced-motion still:** finished interface, requirement 3 marked.
- **Phone:** the code column is dropped; requirements become a one-line ticker above the interface.
- **Copy:** "Software Development" / "Wir entwickeln individuelle Software für Ihre Prozesse, auf Wunsch KI-gestützt, vom Konzept bis in den Betrieb. Ein festes Team begleitet Architektur, Entwicklung und Weiterentwicklung." / Pill: "Mehr erfahren"

### 02 KI-Automationen
- **Statement:** Recurring cases run through your systems by themselves, and only the exception reaches a person.
- **On screen:** a horizontal line across the full page width, drawn directly on the light background.
  - Five stations: "Eingang", "Lesen", "Prüfen", "Buchen", "Antwort".
  - Small system labels under them: "E-Mail", "PDF", "ERP", "CRM".
  - A branch below "Prüfen" leads to a white pill "Ihre Freigabe" and rejoins the line.
  - Right end: counter "Heute verarbeitet 1 284".
- **Entry (2 s):** the line draws from the left edge, stations fade in one after another.
- **Loop:** a conveyor with no restart point. A case token leaves "Eingang" every 1.6 s and takes 9 s to cross. Each station changes it visibly (outline, lines inside, check mark, filled). Every sixth token takes the branch, waits 2 s and rejoins. The counter adds one per arrival.
- **Technique:** inline SVG for line and stations. Tokens are at most eight DOM nodes moved by transform from a precomputed path table in one rAF. This avoids `offset-path` differences in Safari. About 0.5 ms per frame.
- **Reduced-motion still:** five tokens placed along the line, one in the branch.
- **Phone:** the line runs vertically down the left edge with stations as rows; same code, second path table.
- **Copy:** "KI-Automationen" / "Wiederkehrende Abläufe laufen in Ihren bestehenden Systemen von selbst, vom Eingang bis zur Buchung. Ausnahmen gehen zur Freigabe an Ihr Team." / Pill: "Mehr erfahren"

### 03 Managed Agents (keep and refine)
Keep the tablet, tilt entry and console. It also stays as agency example 1 (Briefing, Wettbewerbsanalyse). Replace the one-shot ending with a real loop.
- **Statement:** We run your agents, and you see at any time what is running and where you decide.
- **Loop (20 s):**
  - Tracks advance in steps.
  - At 6 s the Reporting row flips to "Ihre Freigabe".
  - At 10 s a small pointer presses "Freigeben" (new button in that row). The visitor can press it first.
  - The row turns "erledigt" and slides out at the top; "Ablage-Agent" moves from "geplant" to "läuft"; a new planned row enters at the bottom from a pool of six.
  - Counters step ("Läufe heute" +1, "warten auf Sie" 1 to 0 to 1).
- **Restart:** rows are recycled, so there is none.
- **Technique:** DOM/CSS as now. `sequence()` in `page.js` is hard-wired to one section through `document.querySelector('[data-seq]')` and must move to the shared controller.
- **Reduced-motion still:** the current end frame.
- **Copy:** unchanged ("Managed Agents" / "Wir entwickeln, hosten und überwachen Ihre KI-Agenten. Sie sehen jederzeit, was läuft, was erledigt ist und wo Ihre Freigabe nötig ist." / Pill: "Mehr erfahren").

### 04 Agent Factories und KI-Infrastruktur
- **Statement:** On one shared foundation, agents are produced in series and updated in place.
- **On screen:** second full dark stage (same gradient and grain), an isometric scene of three plates.
  - Bottom plate "Infrastruktur", five labelled fields: "Hosting", "Modelle", "Daten", "Identität und Zugriff", "Protokoll".
  - Middle plate "Factory", a line with four stations: "Vorlage", "Anbindung", "Test", "Freigabe".
  - Top plate "Betrieb", a 6 by 4 grid of slots.
  - Top right: "Im Betrieb 24", "Version 3.1".
  - Headline and copy sit inside the stage, bottom left, white.
- **Entry (2.6 s):** plates slide up from below one after another; the grid is already two thirds filled.
- **Loop (18 s):** a white cube leaves "Vorlage" every 3 s. It gains a marking at each station and waits briefly at "Freigabe" (white pill). Then it rises to the top plate and takes a slot. Under the plates, short pulses run from infrastructure fields to working cubes.
- **Restart:** once the grid is full, new cubes replace the oldest slot (old cube sinks, new one settles, version label counts on). The grid never empties.
- **Technique:** DOM with CSS 3D transforms on one preserved-3d parent. About 40 elements, compositor only. Deliberately no second WebGL scene: the labels stay text and the single context stays free for the wordmark. Pulses are SVG `stroke-dashoffset`. About 1 ms per frame.
- **Reduced-motion still:** full grid, one cube at "Freigabe".
- **Phone:** stage aspect 4:5; plates stack more steeply; the infrastructure labels become a legend row under the scene.
- **Risk:** text on rotated planes blurs in Safari. Counter-rotate labels to face the screen.
- **Copy:** "Agent Factories und KI-Infrastruktur" / "Wir entwickeln die Grundlage, auf der Ihre Organisation KI-Agenten in Serie entwickelt, prüft und betreibt. Hosting nach Ihren Anforderungen: Deutschland, EU oder on-premise." / Pill: "Mehr erfahren"

### 05 AI Adoption und Consulting
- **Statement:** From many possible use cases, one becomes a pilot in rund 30 Tagen and then goes into operation.
- **On screen:** open on the light page.
  - Left: a field "Use Cases" with twelve small chips placed by "Nutzen" (vertical) and "Aufwand" (horizontal). Examples: "Angebotserstellung", "Rechnungsprüfung", "Wissenssuche", "Reporting", "Onboarding".
  - Right: a 30-day axis with four segments ("Analyse", "Auswahl", "Pilot", "Betrieb") and a large day counter "Tag 17".
- **Entry (2 s):** chips drift from a loose cluster to their positions; the axis draws.
- **Loop (15 s):** the chip top left is selected and travels to the axis. The bar grows through the segments while the counter runs 1 to 30. At "Betrieb" the chip settles in a row "Im Betrieb" under the axis. The next-best chip is selected.
- **Restart:** after three chips the "Im Betrieb" row hands its oldest chip back to the field while the next one leaves, so both areas stay populated.
- **Technique:** DOM/CSS, FLIP transforms for the travelling chip. Under 1 ms per frame.
- **Reduced-motion still:** one chip at day 30, two in operation.
- **Phone:** field above, axis below, eight chips.
- **Copy:** "AI Adoption und Consulting" / "Wir identifizieren mit Ihnen die Anwendungsfälle mit dem grössten Nutzen und führen den ersten in rund 30 Tagen zum Pilot. Danach begleiten wir die Einführung in Ihren Teams." / Pill: "Mehr erfahren"

### 06 Agentic CoWorker (agency example 2)
- **Statement:** A CoWorker is a member of the team: it has a role, takes tasks in the channel, asks back and delivers.
- **On screen:** a white team workspace window.
  - Left, "Team": five identical rows with initials, name and role. Four people ("Beratung", "Strategie", "Kreation", "Media") and "Lena" with the role "CoWorker · Recherche".
  - Middle: channel "Kampagne Herbst".
  - Right: a week strip (Mo to Fr) where Lena's tasks sit between the team's meetings.
- **Entry (2.2 s):** window rises, team rows appear, Lena last, in exactly the same form as the others.
- **Loop (24 s, three exchanges of 8 s):**
  - A person writes "Bitte die Wettbewerbsanalyse bis Donnerstag aktualisieren."
  - Lena answers "Übernehme ich. Entwurf bis Mittwoch, 16 Uhr. Eine Frage: mit oder ohne Österreich?"
  - A block appears in the week strip on Mi.
  - A file row appears: "Wettbewerbsanalyse_v3.pdf".
- **Restart:** the thread scrolls upward continuously, old messages leave at the top, and the three exchanges rotate.
- **Technique:** DOM/CSS. Messages appear as whole lines with a short typing indicator; no per-character typing, to stay calm. Under 1 ms per frame.
- **Reduced-motion still:** one complete exchange and the calendar block.
- **Phone:** thread only, team as a row of five initials above, week strip dropped.
- **Copy:** "Agentic CoWorker" / "KI-CoWorker integrieren sich wie Kolleginnen und Kollegen in Ihr Team. Sie übernehmen Aufgaben im gewohnten Kanal, fragen nach und liefern Ergebnisse zur Abstimmung." / Pill: "Mehr erfahren"

## 3. Referenzen und Kunden (`#referenzen`)

No loop here: a still section between six moving mockups and the closing stage.

**Layout:**
- Headline "Referenzen und Kunden".
- **Lead block, full width:** Serviceplan logo large (`web/drafts/assets/serviceplan.svg`) with "Europas grösste inhabergeführte Agenturgruppe" and "Gemeinsam mit der Serviceplan Group entwickelt und betrieben. utxo AG verantwortet Technologie und Hosting."
- **Rows in the `.ov-list` language** (name left, one line, figure right):
  - Sokosumi: "Die Plattform für Marketing-Teams: KI-CoWorker und KI-Agenten beauftragen und im Team mit ihnen zusammenarbeiten." / 13'000+ registrierte Nutzer
  - Masumi: "Die dezentrale Infrastruktur, über die KI-Agenten sich finden, ausweisen und bezahlen." / Open Source
  - NMKR, marked "Eigenes Projekt": "Das No-Code-Toolset für Tokenisierung." / 38'000+ registrierte Nutzer, seit 2021, 2,5 Mio. digitale Assets, 69 Mio. EUR Kundenumsatz über die Infrastruktur abgewickelt
- **Grey logo line:** LCX, UNHCR, Cardano Foundation, book.io, labelled "Projekte unserer Marke NMKR". Logos are in `resources/logos/`.

**Motion:** replaying reveal as in the overview; figures count up once per entry; hover dims the other rows.

**Confirmed by Phil on 2026-11-23:** logos and figures may be used.

**Still to decide:**
- Whether a press logo line (`resources/press/`) should appear. Recommendation: leave it off the home page, Presse has its own page.

## 4. Closing CTA and footer (`#kontakt`)

**Stage:** third dark stage, same height as the hero. The page background drift (`--sp`) ends at its second colour here.

**Wordmark:** the 3D wordmark returns in the same WebGL context. The canvas element is re-parented from the hero stage to the closing stage when the closing stage comes within one viewport (the hero is far off screen by then), and back on the way up. It arrives dissolved and assembles through the existing `setAssembled(true)`. The page ends with the reverse of how the hero left. It sits smaller, in the right half.

**Content, left on the common edge, white:**
- "Sprechen Sie mit uns über Ihr Vorhaben."
- "In 30 Minuten klären wir, was für Ihr Unternehmen sinnvoll ist."
- Pills: "Erstgespräch buchen" (cal.com link) and "E-Mail schreiben" (business@utxo.ag).

**Footer, light, one grid:**
- Small logo.
- Leistungen (six anchors).
- Unternehmen (Über uns, Referenzen, Presse, Kontakt).
- Produkte external, in this order: Sokosumi, Masumi, then NMKR and anruf.guru.
- Rechtliches (Impressum, Datenschutz, AGB, Nutzungsrichtlinie, AVV, "Cookie-Einstellungen").
- Bottom line: "© 2026 utxo AG · Dammstrasse 16 · 6300 Zug · Schweiz" (address taken from the old site by the planning subsession, verify before use).

## 5. "Menü" pill

A panel in the style of the existing contact menu (white rounded rows, top right), full screen on phones.
- Six services, numbered, as anchors now and detail pages later.
- "Referenzen und Kunden", "Über uns", "Presse" and "Kontakt".
- Products as external links, Sokosumi and Masumi first (asked for by Phil).
- A small line with Impressum and Datenschutz, plus DE/EN once EN exists.

On phones `.actions .pill--2` is currently hidden by `drafts.css`. Show it, and shorten the CTA label to "Kontakt" below 760px.

## 6. Motion and component system

**Tokens**
- Easing: `--ease` stays (`cubic-bezier(.35,0,0,1)`).
- Durations: `--t-fast: .35s` (colour, hover), `--t-move: .7s`, `--t-enter: 1s`, `--t-stage: 1.7s`.
- Stagger: 90 ms.
- Every loop step sits on a 0.4 s grid so the six mockups share one tempo.

**Loop controller** (`motion/loop.js`, replaces `sequence()` and `reveal()`)
- Each mockup registers `{ enter, steps, tick, still }`.
- The controller owns one clock per mockup that only advances while playing.
- Steps set `data-step` on the mockup root and CSS transitions do the easing. `tick(t)` drives continuous movers (02, 04).
- States:
  - Enter at 35% visible.
  - Pause below 10%.
  - Reset when fully out, so the entry replays on return.
  - Pause on `visibilitychange`.
  - Only the most visible mockup plays; the others freeze.
- Reduced motion calls `still()` once.

**WebGL:** one context for the whole page (hero and closing share it). Cap the pixel ratio at 1.5 on phones; `blocks.js` uses 2 today.

**Budget (targets)**
- LCP is the headline text: under 1.8 s on a mid phone on 4G. Preload the 24 KB Manrope file; the headline must not wait for Three.js.
- First-load JS without Three.js: under 25 KB gzip.
- Three.js: its own chunk, loaded after first paint, under 190 KB gzip. The vendored files are unminified today (644 KB and 1.4 MB raw).
- Each mockup module: under 6 KB gzip, imported when its section is within one viewport.
- Frame cost: hero under 6 ms on a mid laptop and under 10 ms on a mid Android phone; DOM mockups under 2 ms of script.
- Layout shift: 0. Every mockup has a fixed aspect ratio.

## 7. Technical approach

**Recommendation: Astro with static output and no client framework.** Mockups and scene stay vanilla ES modules.

**Reasons**
- Header, menu, footer and six sections of the same shape are components. Detail pages will reuse them.
- DE and EN come from one template with two dictionaries. The old site's manual DE/EN sync (documented as a pain in `CLAUDE.md`) is not repeated.
- Vite minifies and tree-shakes Three.js and hashes assets.
- `build.format: 'file'` with `trailingSlash: 'never'` produces `de.html` and `en.html`. The existing Caddy rule `try_files {path} {path}.html` already serves these at `/de` and `/en`.

**Cost**
- Deploy changes from "serve the repository root" (`Staticfile` has `root: .`) to a build on Railway: a two-stage Dockerfile (Node build, then Caddy serving `dist`).
- Until old subpages are replaced, the build copies the legacy tree (`de/`, `en/`, `style.css`, `main.js`, `resources/`) into `dist`, except the two home files.
- Staying fully static is the fallback if a build step is rejected. Its price is duplicated chrome and manual language sync.

**File map (`web/`)**
- `astro.config.mjs`, `package.json`
- `src/pages/de/index.astro`, `src/pages/en/index.astro` (later; same component, other dictionary)
- `src/pages/de/ueber-uns.astro`, `src/pages/de/presse.astro`, legal pages (`impressum`, `datenschutz`, `agb`, `nutzungsrichtlinie`, `avv`) on a shared text-page layout; content taken from the old pages, press data from `press.js`
- `src/i18n/de.json` (all copy and all mockup labels), `src/i18n/en.json`
- `src/layouts/Base.astro`
- `src/components/`: `Header`, `Menu`, `Hero`, `Overview`, `ServiceSection` (slots: mockup, copy), `References`, `Closing`, `Footer`
- `src/components/mockups/`: `SoftwareDev`, `Automation`, `ManagedAgents`, `Factory`, `Adoption`, `CoWorker` (`.astro` markup with a sibling `.js`)
- `src/motion/`: `loop.js`, `tokens.css`
- `src/page/`: `backdrop.js`, `contact-menu.js`
- `src/scene/blocks.js`
- `src/styles/`: `base.css`, `mockup.css`

**Deviations from the file map, decided in phase 1**
- All tokens (colour, type, motion) are in `src/styles/tokens.css`; there is no `src/motion/tokens.css`.
- `src/page/disclosure.js` serves both header panels (contact and menu) instead of a `contact-menu.js`.
- `src/components/HomePage.astro` is the shared home component the language pages render with their dictionary.
- Component styles live in the components (`<style is:global>`); `base.css` only holds reset, type and primitives.
- `blocks.js` receives the SVG source (`?raw` import) instead of a URL, so the scene needs no request. `src/scene/hero.js` is the hero entry.
- `mount(stage)` is deferred to phase 4, lazy import per mockup module to phase 6 (the Managed Agents module is 1.5 KB gzip).
- Managed Agents loop: the row that is due is paced to reach 100 % at 4 s and asks for approval at 6 s; after the first pass the due row is always the top one, so it leaves at the top. The Reporting row starts at 88 % with "warten auf Sie" 0.

**What happens to the draft files**
- `blocks.js` moves to `src/scene/` nearly unchanged. Changes:
  - The wordmark URL becomes a parameter; it is the hard-coded relative `assets/wordmark-black.svg` today.
  - Add `mount(stage)` for the re-parenting.
  - Remove the unused non-solid options (`grey`, `accent`, `ghost`, shadows).
- `page.js` is split: `backdrop()` and `contactMenu()` move as they are; `sequence()` and `reveal()` are replaced by `loop.js`; `intro()` is dropped.
- The `.th-d` / `.th-f` double theme in `f.html` collapses into one token file.
- `web/drafts/` stays untouched as the reference.

## 8. Phases

Each phase ends in something Phil can open in the browser.

1. **Foundation.** Astro project, tokens, header with menu, hero, overview, Managed Agents ported onto the loop controller with its new loop.
   - Result: draft F at a new URL, with a working menu and a looping console.
   - Check: wordmark identical to the draft, pause off screen and in a hidden tab, Safari and Firefox.
2. **System proof.** 02 KI-Automationen and 04 Agent Factories, the two most different techniques.
   - Result: Phil judges the mockup system on three services.
   - Check: token motion at 60 fps, text sharpness on the 3D plates in Safari, the two dark surfaces in sequence.
3. **Remaining mockups.** 01, 05, 06.
   - Check: loops run ten minutes without drift or visible restart, hover slow-down, only one loop active at a time.
4. **Referenzen, closing stage, footer.**
   - Check: canvas hand-over on fast scrolling and on the End key, no context loss, counters.
4b. **Subpages.** "Über uns" (with team), Presse and the legal pages in the new design on one text-page layout.
   - Check: all texts match the old pages, press list complete, legal texts unchanged in wording.
5. **Phones and reduced motion.** Real iPhone and a mid Android.
   - Check: three-line headline (the current headline runs to four lines at 390px), vertical variants, stills, battery and heat after two minutes.
6. **Performance, EN readiness, cutover.** Budgets, a test dictionary for EN, Dockerfile and Caddy with the legacy tree, consent banner and analytics.
   - Check: Lighthouse on a throttled phone, all legacy URLs and redirects under Caddy locally.

## 9. Open questions for Phil

1. **Build step.** Answered 2026-11-23: Astro is approved.
2. **Old subpages.** Answered 2026-11-23: legal, Presse and "Über uns" as new pages, plus product links with Sokosumi and Masumi first. Confirmed: the remaining old pages are not carried over for now.
3. **Pill targets.** Answered 2026-11-23: hide the pills until detail pages exist.
4. **Name of service 4.** Answered 2026-11-23: "Agent Factories und KI-Infrastruktur", without "digitale". Service headlines may be set smaller than 8.6vw.
5. **Logos and figures.** Answered 2026-11-23: may be used.
6. **Agency examples.** Answered 2026-11-23: fictional names are fine.

## Known weaknesses of draft F to fix during implementation

- Headline runs to four lines at 390px (rule: max three). Fixed in phase 1: below 760px the headline flows as one paragraph, three lines at 390px.
- F was checked in Chrome only (1440 and 390px, mostly via still frames); Safari, Firefox and real phones are untested.
- When the wave or the cursor lifts cubes, the solid body has cube-shaped holes; under the cursor the background shows through.
- Draft E "Sand" (`e.html`, `e.js`, `e.shader.js`) was dropped by Phil; the files and the "E" link in the draft switcher still exist.
