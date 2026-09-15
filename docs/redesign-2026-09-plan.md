# Website-Update utxo.ag · Umsetzungsplan (Branch `redesign-2026-09`)

Stand: 2026-09-14 · Basis: `origin/master` (= live auf utxo.ag) · Plan erstellt mit Fable, Status: umgesetzt lokal (nicht committet), wartet auf lokalen Test durch Phil

## Anforderungen (Phil)

1. Akzentfarben aus dem utxo Pitch Deck (hell: Pastell, dunkel: Lift-Varianten)
2. Produkte-Sektion aufwerten: Call Assistant Demo (anruf-guru.de), Doc Indexer Demo (docindex-prototyp)
3. Google Analytics vorbereiten (finale ID später)
4. SEO-Seiten `comparison` und `ai-in-business` (DE+EN), nur im Footer verlinkt
5. SEO-Optimierung laut Sokosumi-Audit (09.09.2026)
6. Ann-Kristin (CFO) aus dem Team entfernen
7. Presseerwähnungen elegant bei den Projekten einbauen (Masumi, Sokosumi = Flagships)
8. Lokal testbar vor Deploy

Zielgruppe: Inhaber/Geschäftsführer kleiner und mittlerer Unternehmen im DACH-Raum.

Fakt zur Rolle: utxo AG entwickelt Masumi und Sokosumi für die Serviceplan Group und betreibt sie gemeinsam mit ihr.

## 1. Diagnose

1. **SEO-Bug Sprachweiche (kritisch für DE-Markt):** Head-Script auf `.de`-Seiten liest `navigator.language`. Googlebot rendert mit `en-US` ohne localStorage und wird von `/index.de` per `location.replace` auf EN geschickt. DE-Seiten wirken für Google wie Redirects auf EN. Zusätzlich Doppel-Hop (`index.de.html` → 301 `/index.de`).
2. **Google Fonts vom Google-Server:** DSGVO-Risiko (LG München 2022) und grösster FCP/LCP-Bremser. Lösung: Self-Hosting WOFF2.
3. **Performance-Ursachen:** `resources/Team/*.png` = 28 MB (florian.png 8 MB, dargestellt mit 240 px). cal.com `embed.js` lädt sofort (unused JS, TBT). `resources/Projects/NMKR` ohne Endung → `no-cache`. Bilder ohne Cache-Header.
4. **Partials veraltet**, CLAUDE.md nennt `usecases.html` und "lang=de überall" (falsch).
5. **Copy-Fehler:** `agents.html` (EN) enthält 6x "Ergebnis". CTA-Labels uneinheitlich.
6. **Vertrauenssignale:** Presse fehlt (kommt), Mikrofon-/Datenschutzhinweis an Call-Demo fehlt.
7. **A11y:** `--text-muted #9A9A9A` = 2.8:1 Kontrast → `#6F6F6F`. Team-Fotos mit `alt=""`.
8. **Farben:** Website behält monochrome Flächen, nur Deck-Akzente kommen dazu (Deck-Regel: Flächen/Text monochrom, Akzente nur für Visuals, Pastell nie als Text).

Bewusst nicht: kein Framework, kein Build-Step, kein Templating, keine URL-Migration in dieser Runde.

## 2. Phasen

### Phase 0 · Hygiene
- Ann-Kristin aus `#team` (`index.html`, `index.de.html`), `resources/Team/annk.png` löschen
- Ungenutzte Team-Bilder löschen: `Faizan, Franzis, Peter, franz, keanu, luca`
- Sprachweiche: Auto-Detect nur auf `/` ohne gespeicherte Wahl, Ziel extensionless
- "Ergebnis" → "Outcome" in `agents.html`
- Partials je Sprache synchronisieren (`partials/header(.de).html`, `footer(.de).html`)
- CLAUDE.md auf Ist-Stand
- Abnahme: `grep -l annk *.html` leer, `/index.de` bleibt DE bei EN-Browser

### Phase 1 · Tokens, Fonts, Bilder, Caching
Tokens in `style.css` (Namen spiegeln `VIZ` / `VIZ_SOFT` / `VIZ_LIFT` aus `utxo_Deck-Builder/src/lib/deck-constants.ts`):
```
--ink:#0b0e12;
--accent-navy:#002147;   --accent-navy-soft:#8fa8c4;   --accent-navy-lift:#7fa9d9;
--accent-petrol:#0b5563; --accent-petrol-soft:#7fb0ba; --accent-petrol-lift:#5fb6c4;
--accent-moss:#2c6e49;   --accent-moss-soft:#8fc0a5;   --accent-moss-lift:#7fc39a;
--accent-clay:#8a4b16;   --accent-clay-soft:#d0a578;   --accent-clay-lift:#d9a05b;
--accent-plum:#5b3a7a;   --accent-plum-soft:#a894c0;   --accent-plum-lift:#b399d6;
--rail:#ddd7cd;          --rail-ink:#2a2f37;
--accent:var(--accent-navy);
```
Hell/Dunkel ohne Duplikation: `:root{--fill-navy:var(--accent-navy-soft);…}` und `[data-surface="ink"]{--fill-navy:var(--accent-navy-lift);…}`. Dunkle Sektionen bekommen `data-surface="ink"`.

| Ort | Akzent |
|---|---|
| `#products` Kicker-Punkt, Hairline, Illustrationen | Call Assistant petrol, Doc Indexer navy, Individueller CoWorker plum |
| Presse-Block Entitäts-Punkt | Masumi navy, Sokosumi petrol, utxo moss |
| agents `#cases` Icon-Kacheln | 01 petrol, 02 clay, 03 moss, 04 plum, 05 navy, 06 petrol |
| agents `#process` Roadmap-Linie/Dots | `--fill-petrol` |
| Hero-Pixelgrid, Karte, Marquee, Buttons | monochrom |

- Fonts self-hosten (`fonts/*.woff2`, `@font-face`, preload)
- Bilder: `cwebp -q 82 -resize 480 0`, `width`/`height`, `loading="lazy"`, echte `alt`
- Caddyfile: Cache-Control für Assets
- cal.com erst per IntersectionObserver laden
- Abnahme: Lighthouse mobile Perf ≥ 80, LCP < 2.5 s, TBT < 300 ms, keine Requests an fonts.googleapis.com

### Phase 2 · Produkte, Demos, Call-Assistant-Seite
- IA: "Produkte" = Call Assistant + Doc Indexer; dritte Karte "Individueller CoWorker" mit 6 Use-Case-Chips → `/agents#cases` (keine doppelte Liste)
- Call Assistant: 2-spaltig, Click-to-load-Fassade, iframe mit `allow="microphone; autoplay"`, "Demo beenden" entfernt iframe, Datenschutzhinweis
- Einzige Konfigstelle `config.js`: `window.UTXO_CONFIG = { gaMeasurementId:'', callDemoUrl:'https://anruf-guru.de/' }`, leere URL = ehrlicher "nicht verfügbar"-Zustand
- Serverseitig anruf-guru (anderes Repo, Voraussetzung): Origin-Check auf `/session`, Rate-Limit, `instructions` nicht ausliefern, `frame-ancestors`, Sessiondauer begrenzen
- Doc Indexer: Snapshot `demo/docindex.html` (noindex), Desktop: Screenshot-Fassade → skaliertes 1440x900-iframe; Mobile: 3 Screenshots in Scroll-Snap-Reihe
- `call_assistant.html` → EN + `call_assistant.de.html`, Fassade statt totem `call.bauberichte.com`, FAQ
- Abnahme: ohne Klick keine Requests an Demos, Mikrofon-Prompt Chrome+Safari, Skalierung 1280/1920 px

### Phase 3 · Presse bei Projects
- `press.js` (`window.UTXO_PRESS`), gerendert von `_initPress` in `[data-press]`
- Nur Rang A, Entitäten Masumi/Sokosumi/utxo AG, ohne Dubletten und Nicht-Presse → 16 Einträge
- Wortmarken typografisch (keine Logos): Handelsblatt, Horizont, W&V, t3n, MEEDIA, Finanz und Wirtschaft, Switzerland Global Enterprise, Swiss AI Summit. Forbes (Tech Council) und Yahoo Finance nur in der Liste mit korrekter Bezeichnung
- Unterblock in `#stories` (`id="press"`), Subline: "Masumi und Sokosumi entwickeln wir für die Serviceplan Group und betreiben sie gemeinsam mit ihr."
- `<details>` "Alle Erwähnungen (16)", neueste zuerst
- Projekt-Copy Masumi & Sokosumi auf korrekte Rolle angleichen

### Phase 4 · SEO-Seiten portieren (aus `origin/feature/seo-landing-pages`)
- Naming auf master-Konvention: `comparison.html` (EN), `comparison.de.html`, `ai-in-business.html`, `ai-in-business.de.html`
- Seitenspezifisches CSS in `pages.css` (nur diese Seiten), Tokens bleiben in `style.css`
- Aus `main.js` nur `_initHeroRotator`, `_initCoworkerCycle` übernehmen
- Booking auf `[data-cal-inline]`, `meta keywords` entfernen, Canonical extensionless, hreflang
- Links nur im Footer (alle Seiten + Partials)

### Phase 5 · GA4 + Consent Mode v2
- `config.js` `gaMeasurementId:''` → kein Banner, kein Script
- Mit ID: Banner (JS-gerendert, DE/EN), "Ablehnen"/"Akzeptieren" gleichwertig, Speicherung 12 Monate, Footer-Link "Cookie-Einstellungen"
- gtag.js erst nach Zustimmung, Ads-Signale immer denied
- GA4-Admin: Google Signals aus, Aufbewahrung 2 Monate
- Datenschutzerklärung ergänzen (Phil/Legal) vor Deploy

### Phase 6 · SEO-Technik
- Pro Seite: canonical, hreflang (en/de/x-default), Open Graph, Twitter Card, Keyword-orientierte Titel
- JSON-LD: `Organization` + `WebSite` auf Startseiten, `FAQPage` nur bei sichtbaren FAQs
- `sitemap.xml` mit Alternates, `robots.txt` (`Disallow: /demo/`, Sitemap)
- OG-Bild 1200x630

### Phase 7 · Lokaler Test und Deploy
```
brew install caddy
cd /Users/phil/claude_builds/landing-page
PORT=8080 caddy run --config Caddyfile
open http://localhost:8080
```
Python-Server kennt keine extensionless Routen, nur für Sichtprüfung. Lighthouse mobile/desktop, Network-Tab-Checks, Mikrofon-Test, Sprachweiche, 390-px-Viewport.
Deploy: Rebase auf `origin/master`, PR, Cloudflare-Cache purge, robots/sitemap live prüfen, Search Console.

## 3. Risiken

| Risiko | Gegenmassnahme |
|---|---|
| Missbrauch `POST /session` anruf-guru.de | Einbettung erst nach Server-Härtung, Kill-Switch `callDemoUrl:''` |
| Datenschutzerklärung deckt GA4/Demo nicht ab | Text vor Go-live ergänzen |
| Drift bei 18 HTML-Dateien mit kopiertem Header/Footer | Partials je Sprache, Head-Vorlage in CLAUDE.md |
| DocIndex-Snapshot driftet vom Prototyp | Herkunft dokumentiert, noindex |
| Konflikte mit Peters master / Shivangis Branch | früh rebasen, Shivangi informieren |

## 4. Offene Fragen

Entscheidungen Phil (2026-09-14):

| Frage | Entscheidung |
|---|---|
| Call-Demo | Sofort einbetten (Klick-Fassade), Kostenrisiko akzeptiert. Server-Härtung anruf-guru bleibt empfohlen |
| Sprache | EN bleibt Default. Browsersprache schaltet auf `/` automatisch auf DE; `.de`-Seiten leiten nie um |
| Presse | Rang A + Patrick Tobler prominent, darunter "N weitere anzeigen" mit den übrigen Einträgen (B, C), Dubletten entfernt |
| `/call_assistant` | Behalten, zweisprachig, funktionierendes Embed. FAQ später |
| Defaults ohne Rückfrage | Fonts self-hosten · nur GA4 hinter Consent, cal.com lazy · Doc Indexer interaktiv am Desktop, Screenshots mobil · KI-Crawler unverändert · OG-Bild monochrom, Freigabe durch Phil |

Abweichung Phase 3: "Nur Rang A" ersetzt durch obige Presse-Entscheidung. Abweichung Phase 2: `callDemoUrl` ist von Anfang an gesetzt.

## Umsetzungsstand 2026-09-14

Alle Phasen 0 bis 6 lokal umgesetzt, nichts committet. Offene Punkte für Phil:

- Datenschutzerklärung nennt Google Analytics, OpenAI (Call-Demo), cal.com und Formspree nicht namentlich
- anruf-guru.de `/session` ungeschützt (Origin-Check, Rate-Limit empfohlen)
- GA4 Measurement-ID in `config.js` eintragen, sobald Property existiert
- Alpine Tech Forum aus Presseliste entfernt (Link zeigt nur Event-Startseite ohne Erwähnung)
- Coworker-Avatare auf `ai-in-business` zeigen Rolle "Claude Code" (Inhalt aus Shivangis Branch übernommen)
- Nach Deploy: Cloudflare-Cache leeren, robots.txt und sitemap.xml live prüfen, Sitemap in Search Console einreichen, Shivangis Branch schliessen

Lighthouse mobil `/index.de` (Python-Server lokal ohne Kompression vs. live): Performance 66 vs. 59, LCP 4.0 s vs. 38.3 s, Best Practices 100 vs. 79, SEO 100 vs. 92, Accessibility vor Kontrast-Fix 92.
