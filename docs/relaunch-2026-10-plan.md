# Relaunch utxo.ag · Plan (2026-10)

> **Status 2026-10-02: umgesetzt, mit Abweichungen.** Nach Phils Feedback wurde das Design als v2/v2.1 überarbeitet: Glas (Header nach Scroll, Hero-Swipe, `.btn-primary`, Mockup-Floats) entgegen "kein Glas-Header" in Punkt 8, HTML-Produkt-Mockups statt Screenshots, Startseite in neun ruhigen Blöcken, FAQ nach dem Kontakt, neue CoWorker-Unterseiten (`/de/ki-coworker/compliance`, `/de/ki-coworker/lead-recherche` + EN; Vertrieb und Technische Prüfung in Arbeit). Aktuelle Referenz ist `CLAUDE.md`; dieser Plan bleibt als Entscheidungsdokument stehen und wird nicht weiter gepflegt.

Stand: 2026-10-02 · Branch: `redesign-2026-09` (Basis für den Relaunch, vor Umsetzung neuen Branch `relaunch-2026-10` von hier abzweigen) · Autor: Lead-Planung (Claude) für Phil

Quellen: `CLAUDE.md`, aktuelle Seiten (`index(.de)`, `agents.de`, `call_assistant.de`, `doc_indexer.de`, `style.css`, `main.js`, `partials/`), Faktenblätter im Scratchpad (`facts-utxo.md`, `facts-products.md`, `url-inventory.md`, `cal-glitch.md`), `docs/evaluation-2026-09.md`, `docs/research-ai-websites-2026-09.md`, Launch-Video `call-guru/launch-video/out/anruf-guru-launch-final.mp4`.

Regeln, die für jede Zeile Copy in diesem Plan gelten: keine Gedankenstriche (em/en dash), nie "bauen/gebaut/build" für utxo-Arbeit (immer "entwickeln/developed"), keine Preise, keine Telefonnummer, Sie-Form, Akzentfarben nur für grafische Elemente, nie für Text.

---

## Kurzfassung (für Phil)

1. **Positionierung:** utxo AG entwickelt KI-Software und KI-CoWorker für Mittelstand und Konzern. Kernbotschaft (freigegeben) steht direkt unter der H1. H1 (J1, entschieden): `Ihre nächsten Mitarbeiter sind digital. Wir entwickeln sie.` / `Your next hires are digital. We develop them.`.
2. **Zwei Angebotsgruppen:** "Für Ihr Unternehmen entwickelt" (KI-CoWorker, KI-Telefonassistent, KI-Software mit Doc Indexer) und "Eigene Produkte" (anruf.guru, Sokosumi mit 13'000+ registrierten Nutzern, Masumi).
3. **Navigation (freigegeben):** Leistungen · Produkte · Referenzen · Über uns, dazu DE/EN und "Erstgespräch buchen".
4. **Demos:** nicht mehr auf der Startseite eingebettet. Die Startseite verweist mit klaren Links auf die Live-Demo (`/de/ki-telefonassistent#demo`) und die Doc-Indexer-Demo (`/de/doc-indexer#demo`).
5. **Masumi und Sokosumi** bekommen ausführliche Abschnitte auf der Startseite mit direktem Link nach aussen, **keine eigenen Unterseiten** (Begründung in B.4).
6. **anruf.guru** ist das Feature-Produkt der Startseite: Launch-Video (Klick zum Abspielen), klare Abgrenzung zum KI-Telefonassistenten.
7. **URLs:** `/de/...` und `/en/...` mit übersetzten Slugs. Dateien liegen 1:1 so im Repo (`de/impressum.html`). `/` leitet per 302 nach Cookie/Accept-Language, alle alten URLs per 301. Das clientseitige Sprach-Script im Head entfällt (freigegeben).
8. **Design:** Swiss/editorial. 12-Spalten-Raster, Haarlinien statt Kartenstapel, starke Typo, kein Marquee, kein Glas-Header. **Bleiben:** Hero-Pixelgrid (Startseite und CoWorker-Seite) und Hero-Swipe (Startseite, Ziel jetzt `/de/ki-coworker` bzw. `/en/ai-coworker`), ruhig in den Hero eingebettet und pausiert, sobald nicht sichtbar. **Entfallen:** Duo-Karten und Projekt-Karussell.
9. **Kalender:** breitere Buchungsspalte und gemessene, reservierte Höhe. Damit springt der Footer nicht mehr.
10. **Recht:** AGB, AVV, Datenschutz und Nutzungsrichtlinie erhalten einen Ausschluss-Absatz für anruf.guru, Sokosumi und Masumi (Texte in E), live erst nach juristischer Prüfung (J19). Impressum-Angaben (HR-Nummer, UID/MWST, Betriebsnummer) sind von Phil bestätigt (J10).
11. **Entscheidungen:** alle Punkte aus J sind entschieden, nichts mehr offen.
12. **Umsetzung:** 11 Arbeitspakete in 4 Phasen. Jede Datei hat genau einen Besitzer. Commit erst nach Phils lokalem Test.

---

## A. Ziele, Zielgruppe, Positionierung, Tonalität

### A.1 Ziele

| # | Ziel | Messbar an |
|---|---|---|
| 1 | Mehr qualifizierte Erstgespräche aus Mittelstand und Konzern | Cal-Buchungen und Rückruf-Formulare pro Monat (GA4 Events, falls Consent) |
| 2 | Klares Angebot in 10 Sekunden: was utxo entwickelt, für wen, wo die Daten liegen | Hero und Leistungsindex beantworten das ohne Scrollen |
| 3 | anruf.guru-Launch sichtbar machen und Traffic nach anruf.guru leiten | Outbound-Klicks auf anruf.guru |
| 4 | Glaubwürdigkeit über echte Belege (Serviceplan, RST, Presse, eigene Produkte im Betrieb) | Keine unbelegte Aussage auf der Seite (siehe J) |
| 5 | Saubere, sprachgetrennte URLs für SEO | hreflang-Paare, Sitemap, 0 Weiterleitungsketten |

### A.2 Zielgruppe

- **Primär:** Geschäftsführung, COO, Bereichsleitung und IT-Leitung im deutschen und Schweizer Mittelstand (50 bis 2'000 Mitarbeitende). Sie haben einen konkreten Prozess, der Zeit bindet, und Vorbehalte bei Datenschutz und Kontrollverlust.
- **Sekundär:** Innovations- und Digitalteams in Konzernen, die eine eigene KI-Lösung wollen statt Copilot von der Stange.
- **Tertiär:** Presse, Partner, Bewerbende, die über Masumi, Sokosumi oder NMKR kommen.
- **Branchen:** offen. Jedes Unternehmen, das KI und Software braucht. Beispiele aus echten Einsatzfeldern: Empfang, Vertrieb, Lead-Recherche, Compliance, technische Zeichnungsprüfung, Dokumentenmanagement, Störungsmanagement.

### A.3 Positionierung

> **utxo AG ist ein Produktstudio aus Zug, das KI-Software und KI-CoWorker für Unternehmen entwickelt und betreibt. Wir sind Entwickler, keine Wiederverkäufer, und wenden das, was wir entwickeln, in eigenen Produkten im Markt an.**

Abgrenzung: gegen Agenturen ohne eigene Produkte (wir betreiben eigene Produkte), gegen Standard-Copilots (individuell, mit Gedächtnis, handlungsfähig), gegen US-SaaS (Hosting Deutschland/EU, auf Wunsch on-premise).

### A.4 Botschaftshierarchie

| Ebene | Botschaft | Ort |
|---|---|---|
| 1 Kern (freigegeben) | Wir entwickeln KI-Software und KI-CoWorker, die in Ihren Prozessen arbeiten. Gehostet in Deutschland oder der EU, auf Wunsch on-premise. | Hero-Subline, Meta-Description |
| 2 Beweis "wir können das" | Eigene Produkte im Betrieb (anruf.guru, Sokosumi, Masumi), Kunden Serviceplan Group und RST Datentechnik, Presse | Produkte, Referenzen, Pressezeile |
| 3 Risiko raus | Festpreis vor Projektstart, produktiv in rund 30 Tagen, Parallelbetrieb, Erfolgskriterium ab Tag 0 | Haltung, Ablauf, FAQ |
| 4 Kontrolle | Daten in Deutschland/EU, kein Training mit Ihren Daten, Minimalrechte, Protokoll jeder Aktion, Mensch entscheidet bei wesentlichen Schritten | Sicherheit |
| 5 Menschen | Rund 15 Menschen in Zug und remote, direkter Draht zu den Entwicklern | Über uns, Team |

### A.5 Tonalität

- **Sie-Form**, ruhig, präzise, selbstbewusst ohne Superlative. Kurze Hauptsätze, konkrete Verben (übernimmt, bucht, prüft, meldet).
- **Keine Buzzwords** ("revolutionär", "next level", "Game Changer"), keine Ausrufezeichen, keine Emojis.
- **Ehrlichkeit als Stilmittel:** "Nicht jeder Prozess braucht KI." bleibt als Haltungssatz.
- **DE ist Primärsprache**, EN ist gleichwertig formuliert (nicht wörtlich übersetzt). Schweizer Schreibweise "ss" wie bisher, Zahlen mit Apostroph (13'000) wie bisher.
- **Begriffe fix:** KI-CoWorker (Erklärung: digitaler KI-Mitarbeiter) / AI CoWorker · KI-Telefonassistent / AI Phone Assistant · KI-Software / AI software · Doc Indexer · anruf.guru (Wortmarke immer klein) · Sokosumi · Masumi · NMKR · Erstgespräch / intro call.

---

## B. Informationsarchitektur

### B.1 Sitemap mit neuen URLs

| Seite | DE | EN | Status |
|---|---|---|---|
| Start | `/de` | `/en` | neu getextet und gestaltet |
| KI-CoWorker (bisher agents) | `/de/ki-coworker` | `/en/ai-coworker` | Produktseite, überarbeitet |
| KI-Telefonassistent (bisher call_assistant) | `/de/ki-telefonassistent` | `/en/ai-phone-assistant` | Produktseite, stark erweitert, mit Live-Demo |
| Doc Indexer | `/de/doc-indexer` | `/en/doc-indexer` | Produktseite, stark erweitert, mit geführter Demo (`#demo`, Ziel des Startseiten-Links) |
| CoWorker vs. Copilot | `/de/coworker-vs-copilot` | `/en/coworker-vs-copilot` | nur Chrome und Links |
| KI im Unternehmen | `/de/ki-im-unternehmen` | `/en/ai-in-business` | nur Chrome und Links |
| EU AI Act | `/de/eu-ai-act` | `/en/eu-ai-act` | nur Chrome und Links |
| Kundenakquise mit KI | `/de/kundenakquise-mit-ki` | `/en/ai-customer-acquisition` | nur Chrome und Links |
| Presse | `/de/presse` | `/en/press` | nur Chrome und Links |
| Impressum | `/de/impressum` | `/en/imprint` | Chrome, E-Mail `business@utxo.ag` (J9), Registerangaben unverändert (J10) |
| Datenschutz | `/de/datenschutz` | `/en/privacy` | Chrome, Ausschluss-Absatz |
| AGB | `/de/agb` | `/en/terms` | Chrome, Ausschluss-Klausel |
| Nutzungsrichtlinie | `/de/nutzungsrichtlinie` | `/en/acceptable-use` | Chrome, Ausschluss-Satz |
| AVV | `/de/avv` | `/en/dpa` | Chrome, Ausschluss-Klausel |
| removed-sections | bleibt `removed-sections.html` im Root, intern (404) | | unverändert |

Extern verlinkt (keine Unterseite): `https://anruf.guru`, `https://www.sokosumi.com`, `https://www.masumi.network`, `https://www.nmkr.io`.

### B.2 Startseite: Reihenfolge und Zweck (v2, 2026-10-02, nach Owner-Feedback "zu dense, ton in ton")

Grundregel: **nichts wiederholt sich auf der Startseite**, Details gehören auf die Unterseiten. 9 Blöcke, Flächen im Wechsel Weiss / Creme / Ink.

| # | Abschnitt (id) | Fläche | Inhalt kurz |
|---|---|---|---|
| 1 | Hero (`#top`) | Weiss | H1, Subline, ein CTA "Erstgespräch buchen" + ein Textlink, eine Mono-Vertrauenszeile (einziger Ort für "rund 30 Tage"). Pixelgrid rechts neben dem Text (nie dahinter), ruhiger (Deckkraft 0.42, Abstand 16 %), Hero-Swipe zu `/de/ki-coworker`. Kein Leistungsindex mehr. |
| 2 | Logozeile "Entwickelt für" | Weiss | Serviceplan Group, RST Datentechnik │ LCX, UNHCR, Cardano Foundation, book.io; Fussnote: die letzten vier sind Projekte unserer Marke NMKR. Keine Presselogos. |
| 3 | Leistungen (`#services`) | Creme | KI-CoWorker, KI-Telefonassistent, Doc Indexer als abwechselnde Zeilen (Produkt-Mockup links/rechts, 1 bis 2 Sätze + Link). Schlusszeile "Festpreis vor Start, Parallelbetrieb, Erfolgskriterium ab Tag 0." → `/de/ki-coworker#process`. |
| 4 | Eigene Produkte (`#products`) | Ink | anruf.guru mit Launch-Video auf Creme-Feld (Marke auf Creme), Abgrenzung zum KI-Telefonassistenten einmal; Sokosumi und Masumi als zwei kompakte Karten (je 1 Satz, 2 Fakten, Link); Credit-Zeile Serviceplan Group einmal. |
| 5 | Referenzen und Presse (`#projects`, `#press`) | Weiss | RST als Leitfall mit Ergebnis; NMKR eine Zeile; frühere Projekte eine Zeile; Presseband (6 Outlet-Logos aus `press.js` + 3 deutsche Schlagzeilen) → `/de/presse`. |
| 6 | Kontrolle (`#security`) | Creme | H2 "Nicht jeder Prozess braucht KI. …", 4 Punkte mit feinen Linien-Icons, Link Sicherheitskonzept. |
| 7 | Team (`#about`, `#team`) | Weiss | "Ein Produktstudio aus Zug.", Teamreihe mit einheitlichem Zuschnitt 4:5 und Graustufen. |
| 8 | FAQ (`#faq`) | Weiss, Haarlinie oben | 4 Fragen, die oben nicht beantwortet werden. |
| 9 | Kontakt (`#contact`) + Footer | Ink | Kalender : Rückruf etwa 60 : 40, cal.com dunkel und kompakt, Höhe reserviert (CLS 0); unter 920 px Button mit cal.com-Popup. |

**Entfallen gegenüber v1:** Hero-Leistungsindex, Pressezeile im Belege-Block, `#approach` (Haltung), `#process` (Ablauf, jetzt nur auf `/de/ki-coworker#process`), Kontakt-Schritte, Unternehmen-Feld im Formular, 2 FAQ (Datenstandort, Dauer; stehen in Kontrolle bzw. Vertrauenszeile).

### B.3 Navigation und Footer

**Header (alle Seiten):**

| DE | EN | Ziel |
|---|---|---|
| Leistungen | Services | `/de#services` / `/en#services` |
| Produkte | Products | `/de#products` / `/en#products` |
| Referenzen | Projects | `/de#projects` / `/en#projects` |
| Über uns | About | `/de#about` / `/en#about` |
| DE / EN | DE / EN | Gegenstück der aktuellen Seite, `data-set-lang` |
| [Erstgespräch buchen] | [Book an intro call] | `#contact` auf Seiten mit Kontaktblock, sonst `/de#contact` |

Auf der Startseite selbst zeigen die Anker ohne Pfad (`#services`), auf Unterseiten mit Pfad (`/de#services`). Logo verlinkt auf `/de` bzw. `/en`. Mobile-Overlay: dieselben 4 Punkte plus direkte Links "KI-CoWorker", "KI-Telefonassistent", "Doc Indexer" (kleiner gesetzt) und CTA.

**Footer (alle Seiten), 5 Spalten:**

| Leistungen / Services | Produkte / Products | Ratgeber / Guides | Unternehmen / Company | Rechtliches / Legal |
|---|---|---|---|---|
| KI-CoWorker | anruf.guru ↗ | CoWorker vs. Copilot | Über uns | Impressum |
| KI-Telefonassistent | Sokosumi ↗ | KI im Unternehmen | Referenzen | Datenschutz |
| Doc Indexer | Masumi ↗ | EU AI Act | Presse | AGB |
| | NMKR ↗ | Kundenakquise mit KI | Kontakt | Nutzungsrichtlinie |
| | | | | AVV · Cookie-Einstellungen |

Fusszeile: `© 2026 utxo AG · Dammstrasse 16 · 6300 Zug · Schweiz` und rechts `Hosting in Deutschland oder der EU · DSGVO` (ersetzt "GEHOSTET IN EU/CH · DSGVO · EU-KI-VERORDNUNG", siehe J6/J8).

### B.4 Entscheidung: Wie die 6 Angebote präsentiert werden

| Gruppe | Angebot | Darstellung | Ziel des CTA |
|---|---|---|---|
| **Für Ihr Unternehmen entwickelt** (Kundenprojekte) | KI-CoWorker | grösste Fläche, Flaggschiff | `/de/ki-coworker` |
| | KI-Telefonassistent | direkt unter dem CoWorker, optisch angedockt mit Label "Spezialfall Telefon" | `/de/ki-telefonassistent` (Live-Demo) |
| | KI-Software (Beispiel Doc Indexer) | eigene Zeile, Doc Indexer als benanntes Produkt | `/de/doc-indexer` |
| **Eigene Produkte** (im Markt) | anruf.guru | Feature mit Video | `https://anruf.guru` |
| | Sokosumi | ausführliche Zeile mit Fakten | `https://www.sokosumi.com` |
| | Masumi | ausführliche Zeile mit Fakten | `https://www.masumi.network` |

**Masumi/Sokosumi: keine eigenen Unterseiten.** Begründung:
1. Phil wünscht direkte Links auf masumi.network und sokosumi.com. Eine Zwischenseite wäre ein zusätzlicher Klick.
2. Beide haben eigene, gepflegte Websites mit Rechtstexten eines anderen Betreibers (Plan.Net / Serviceplan). Eigene Unterseiten müssten wir in 2 Sprachen pflegen, und sie würden von dortigen Angaben abweichen (z. B. Agentenzahlen, Credits).
3. Die Credit-Frage (utxo vs. "Serviceplan Group with NMKR") ist nur unter Vorbehalt entschieden (J2: Default, abhängig vom Einverständnis der Serviceplan Group). Weniger Fläche heisst weniger Risiko.
4. SEO-Wert gering: Wer "Sokosumi" sucht, soll sokosumi.com finden. Für utxo zählt die Verbindung, die die Startseite und die Presseseite herstellen.

Spätere Erweiterung bleibt möglich (`/de/sokosumi` ist im URL-Schema reserviert), wenn eine Fallstudie mit Serviceplan freigegeben ist.

**anruf.guru: ebenfalls keine Unterseite.** Das Produkt hat eine eigene Website mit Demo-Nummer, Tarifen und AGB. Unsere Aufgabe ist Sichtbarkeit und Abgrenzung.

**Abgrenzung anruf.guru vs. KI-Telefonassistent (überall gleich formulieren):**
- anruf.guru = **Anrufbeantworter**: nimmt Nachrichten auf, spricht nicht mit dem Anrufer, macht Tickets, Termine (nur wenn Tag und Uhrzeit genannt), SMS bei Dringendem, Spam-Filter. Fertiges Produkt, 5 Minuten Einrichtung.
- KI-Telefonassistent = **Gesprächspartner in Echtzeit**: führt das Gespräch, fragt nach, bucht, verbindet mit Ihren Systemen. Individuell entwickelt.

### B.5 Referenzen neu

Format: Liste mit Haarlinien statt Karussell, eine Zeile pro Referenz: Logo/Name links, Rolle von utxo, 2 bis 3 Sätze, Link.

| Referenz | Was utxo gemacht hat | Darf genannt werden |
|---|---|---|
| Serviceplan Group (House of Communication) | Masumi und Sokosumi entwickelt, Technik und Hosting, gemeinsamer Betrieb | ja, Logo freigegeben |
| RST Datentechnik | KI-CoWorker für das Störungsmanagement | ja, Logo freigegeben |
| NMKR | eigene Marke für dezentrale Infrastruktur (Zahlung, Identität, Tokenisierung) und No-Code-Software | eigene Marke, klar als solche kennzeichnen |
| UNHCR | Fundraising-Plattform (früheres Projekt) | Name ja (steht schon auf der Seite), **kein Logo** |
| LCX (Liechtenstein) | Infrastruktur für die regulierte Börse bereitgestellt (früheres Projekt) | Name und Logo (bisher schon auf der Seite) |
| Weitere | laufende Projekte unter Vertraulichkeit | nur als Satz |

---

## C. Designsystem

### C.1 Leitidee (v2)

"Ruhige Schweizer Typografie, das Produkt ist das Bild." Wenige Elemente pro Block, klarer Flächenrhythmus (Weiss / Creme / Ink), grosse ruhige Produkt-Mockups in HTML/CSS auf weichen Pastellfeldern statt Textzeilen mit Index-Spalten.

**Weiterhin vermeiden:** Verlaufsblobs, Glow, Roboter/Gehirne/Sparkles, erfundene KPIs, Marquees, Testimonial-Karussells, Scroll-Jacking, Pillen überall, Kartensuppe, gemischte Fotoqualität, generierte Bilder als Produktbeleg.

**Glas: das frühere Verbot (C.1 und C.7 "kein Glas/Blur, auch kein Header-Blur") ist durch den ausdrücklichen Owner-Wunsch ersetzt.** Glas ist erlaubt, aber nur an zwei Stellen:
1. Header nach dem Scrollen (oben transparent, solange der Hero-Canvas darunter liegt deckend weiss, danach `blur(12px) saturate(160%)` auf `rgba(255,255,255,.74)`, über Ink-Flächen dunkle Variante).
2. Genau ein schwebendes Sekundärelement pro Produkt-Mockup (`.glass.mock-float`) über einem statischen `.pfield`.
Nie Glas hinter Fliesstext oder Formularen, nie über dem animierten Hero-Canvas, höchstens 2 bis 3 geblurrte Elemente pro Viewport. Fallbacks: `@supports not (backdrop-filter)` → fast deckend, `prefers-reduced-transparency: reduce` → deckend.

### C.2 Typografie (v2)

| Token | Wert |
|---|---|
| `--fs-display` | `clamp(2.75rem, 1.8rem + 3.4vw, 4.25rem)`, lh **1.06** (mobil 1.08), ls -0.032em, `text-wrap: balance`. Geprüft 1440/1280/1100/1024/768/390: kein Überlappen von Unterlängen mit der Folgezeile (mind. 4.5 px Abstand). |
| `--fs-h1` | `clamp(2.4rem, 1.6rem + 3vw, 4rem)`, lh 1.06 (Produktseiten) |
| `--fs-h2` | `clamp(2rem, 1.45rem + 1.9vw, 3rem)`, lh 1.08 |
| `--fs-h3` | `clamp(1.375rem, 1.2rem + .55vw, 1.75rem)`, lh 1.2 |
| `--fs-lede` | `clamp(1.125rem, 1.02rem + .35vw, 1.3125rem)`, lh 1.5, max 54ch |
| `--fs-body` | 17px, lh 1.6 |
| `--fs-label` | 12px Mono, ls .08em, uppercase |

### C.3 Raster und Abstände (v2)

- Container 1240px, Seitenrand `clamp(20px, 5vw, 72px)`, Gutter `clamp(16px, 2vw, 28px)`.
- Abschnitt `--section-y: clamp(96px, 11vw, 168px)`, kleine Abstände `--section-y-sm`, Blockabstand innerhalb eines Abschnitts `--gap-block: clamp(72px, 9vw, 136px)`.
- Abschnittskopf `.section-head` ist jetzt linksbündig ohne Index-Spalte (optional `.kicker` darüber), max 48rem.
- Radien: Buttons 8, Medien 12, Karten 16, Felder 20.

### C.4 Farbe und Akzente (v2)

- Flächen: `--bg-primary` Weiss, `--bg-cream` #F3F0EA, `--ink` #0b0e12 (+ `--ink-raised` #13171d für Karten auf Ink). #FAFAFA ist keine Abschnittsfläche mehr (`.section--alt` zeigt jetzt Creme; `--bg-secondary` bleibt nur in Demo-Interna `stage-*`, `dd-*`).
- Text nur Ink/Grau (`--text-primary` #0b0e12, `--text-secondary` #53565c, `--text-muted` #6b6e74). Akzente nie für Text.
- Produktfelder (`.pfield--*`): KI-CoWorker plum, KI-Telefonassistent petrol, Doc Indexer navy, anruf.guru clay auf Creme. Im Mockup nur kleine Akzentflächen (Tags, Zeitstempel-Ziffern in Plum, Zitatnummern).
- Kundenlogos Graustufen, Deckkraft .58.

### C.5 Komponenten (v2, Vertrag für Phase 3)

| Klasse | Zweck |
|---|---|
| `.section` + `.section--cream` / `[data-surface="ink"]` / `.section--rule` | Abschnitt, Fläche; `--rule` = Haarlinie oben in Inhaltsbreite |
| `.section-head` > optional `.kicker` + `h2` + `.lede` | Abschnittskopf |
| `.hero` > `canvas.hero-grid[data-pixelgrid]` + `.wrap.hero-inner > .hero-copy` (h1.hero-title mit `<span>`, `.hero-sub`, `.hero-actions`, `.trust-line`) + `a.hero-swipe` | Startseiten-Hero |
| `.hero-product` > `.wrap.hero-product-inner` > `.hero-product-copy` + `.hero-product-media` | Produktseiten-Hero, Media-Spalte nimmt ein `.mock-stage` auf |
| `.clients` > `.clients-label` + `ul.clients-row` (img mit `.logo-22/30/34/40`, `li.clients-sep`) + `.clients-note` | Logozeile |
| `.showcase` (+ `--flip`) > `.showcase-media` + `.showcase-text` (`.kicker`, h3, p, `.link-arrow`) | Leistungszeile, Bild und Text im Wechsel |
| `.pfield.pfield--plum/petrol/navy/clay` | statisches Pixelfeld (CSS-Masken, kein JS) |
| `.mock-stage[data-play]` > `.mock.mock-mail` / `.mock.mock-board` / `.mock.mock-doc[data-docquote]` + ein `.glass.mock-float` | Produkt-Mockups, spielen einmal im Viewport |
| `.glass`, `.glass--ink` | Glas, nur nach C.1 |
| `.product-feature` > `.pfield.pfield--clay.product-feature-media` (`figure.video[data-video]`) + `.product-feature-text` (`.brandmark`, h3, p, `.btn`, `.crosslink`) | anruf.guru |
| `.platforms` > `article.platform-card` (`.platform-logo`, p, `dl.platform-facts`, `.link-arrow`) + `.platforms-credit` | Sokosumi/Masumi |
| `.case` (`.case-brand`, `.case-main`, `.case-result`), `ul.ref-lines` | Referenzen |
| `.press-band` > `.press-band-head` + `.press-band-logos[data-press-logos][data-limit]` + `[data-press][data-limit][data-filter-lang]` > `ol.press-list.press-list--band` | Presseband |
| `ul.control-grid` > li (svg, h3, p) | Kontrolle/Sicherheit |
| `.steps` | Ablauf, bleibt für `/de/ki-coworker#process` |
| `.team-head` + `.team-row[data-team-grid]` | Team, Bilder 4:5, `object-position 50% 12%`, Graustufen, Farbe bei Hover |
| `.faq-layout` > `.section-head` + `.faq` | FAQ zweispaltig |
| `.booking` > `.booking-main` (`.booking-cal[data-cal-inline][data-cal-theme][data-cal-compact]`, `.booking-popup [data-cal-popup]`) + `.booking-side` | Kontakt |

**Entfallen (CSS):** `.index-list`, `.principles`, `.offer*`, `.feature*`, `.platform` (Zeile), `.ref-list`, `.press-teaser`, `.check-grid`, `.about-text`, `.contact-steps`, `.proof*`, `.logo-row`, alte `.crosslink`-Box. Alt-Seiten nutzen keine davon (grep geprüft).

### C.6 Bewegung (v2)

- Einziges Dauer-Element im Hero bleibt das Pixelgrid (pausiert ausserhalb des Viewports/Tabs). Startseite: `data-max-opacity="0.42"`, `data-gap="0.16"` (neu in `_initPixelGrid`), `data-tile-scale="7"`; Canvas rechts neben dem Textblock, unter 1200 px als Band oben.
- Produkt-Mockups (`[data-play]`, `_initPlay`): Schritte, Karten, Antwortblöcke und das Glas-Element erscheinen einmal gestaffelt, Markierung im Dokument wischt einmal ein; Wellenform läuft nur sichtbar (`.wave.is-live`). Elemente, die beim Laden schon sichtbar sind, werden nicht versteckt. `prefers-reduced-motion`: alles sofort sichtbar, Welle steht.
- Hover: Pfeil 2 px, Team Graustufen → Farbe. Keine Parallax.

### C.7 Bilder, Video, Assets

**v2-Ergänzung (2026-10-02):** Das Verbot von Glas in C.1/C.7 ist ersetzt (siehe C.1). Neue Assets: `resources/coworkers/otto.webp` (aus candidates verschoben), `resources/coworkers/otto-avatar.webp` (160 px, Absender-Avatar im Mockup), `resources/products/docindexer-answer.webp` (aus candidates verschoben, Referenz für Phase 3), `resources/logos/unhcr.svg` (von Editor-Metadaten bereinigt), `cardano-foundation.svg` (offizielles Logo von cardanofoundation.org), `bookio.webp` (2x für 44 px), `anruf-guru-tile.svg` (Guru auf Creme statt Schwarz). Die Service-Visuals sind HTML/CSS-Mockups mit Beispieldaten, keine Screenshots oder generierten Bilder; der Doc-Indexer-Mockup rendert Frage, Antwortblöcke, Quellen und Originalseite zur Laufzeit aus `docdemo.js` (Frage `cost`, Rolle `bewirt`).


| Asset | Vorhanden | Aufgabe |
|---|---|---|
| anruf.guru Launch-Video | `call-guru/launch-video/out/anruf-guru-launch-final.mp4`: 1080x1920 (9:16), 25.6 s, H.264 + AAC Stereo, 6.8 MB | WP3: Web-Encode 720x1280, H.264 High, CRF 26 bis 28, `+faststart`, AAC 96 kbit/s, Ziel unter 3 MB → `resources/media/anruf-guru-launch.mp4` |
| Poster | `anruf-guru-titelbild-9x16-2026-10-02-1028.png` im selben Ordner | WP3: WebP 720x1280 q80 → `resources/media/anruf-guru-poster.webp` |
| Untertitel | unklar, ob Sprache im Video | WP3 prüft. Bei Sprache: `anruf-guru-launch.de.vtt` aus dem Skript in `call-guru/launch-video` |
| anruf.guru Marke | `resources/logos/anruf-guru.svg` (nur Guru-Zeichen, `currentColor`) | Zeichen + Live-Text "anruf.guru" in Manrope |
| Sokosumi Wortmarke | `resources/logos/sokosumi.svg` | direkt nutzbar |
| Masumi Wortmarke | `resources/logos/masumi.png` (10647x1636, 193 KB), `masumi-wordmark.webp` (234x36) | WP3: `masumi.webp` mit 72px Höhe (2x für 36px) |
| Serviceplan | `resources/logos/serviceplan.svg` | nutzbar |
| RST | `resources/logos/rstdsl.png` | WP3: `rst.webp` |
| LCX | `resources/logos/LCX.png` | WP3: `lcx.webp` |
| NMKR | `resources/logos/NMKR Logo.svg` (Leerzeichen im Namen) | WP3: Kopie `nmkr.svg` |
| Sokosumi Screenshot | `resources/Projects/sokosumi.png`, `sokosumi-graphic.webp` | in Sokosumi-Zeile nutzbar |
| Team-Fotos | `resources/Team/*.webp` | bleiben |
| Presse-Logos | `resources/press/*` | bleiben |
| **Fehlt:** Screenshot anruf.guru-Dashboard (Ticket-Ansicht) | | Phil/WP3 aus `app.anruf.guru` mit Demo-Daten (J20), optional |
| **Fehlt:** echte CoWorker-Ansicht (z. B. Ticket- oder Freigabe-Ansicht RST) | | später; bis dahin typografische Gestaltung, **keine** Fake-Screenshots |
| **Fehlt:** Doc-Indexer-Erklärvideo | | Slot ist im Markup nicht vorhanden, bis die Datei existiert (siehe D.5) |
| **Fehlt:** OG-Bilder je Produktseite | | optional, bis dahin `og-de.png` / `og-en.png` |

Video-Markup-Vertrag (WP2 implementiert `_initVideo`, kein Autoplay, nichts lädt vor dem Klick):

```html
<figure class="video" data-video>
  <video preload="none" playsinline poster="/resources/media/anruf-guru-poster.webp" width="720" height="1280"
         data-src="/resources/media/anruf-guru-launch.mp4" aria-label="anruf.guru Launch-Video"></video>
  <button type="button" class="video-play" data-video-play>Video abspielen <span>0:26</span></button>
  <figcaption>Launch-Video anruf.guru, 26 Sekunden, mit Ton.</figcaption>
</figure>
```

Beim Klick: `src` setzen, `controls` an, `play()`, Button ausblenden. Bei `prefers-reduced-motion` identisch (es läuft ohnehin nur auf Klick).

### C.8 Barrierefreiheit

- Skip-Link, Landmarken (`header`, `nav`, `main`, `footer`), genau eine H1 pro Seite, Überschriften ohne Sprünge.
- `:focus-visible` global: 2px Outline schwarz (auf `ink` weiss), Offset 3px.
- Kontraste: Text mindestens `--text-muted` (#6F6F6F, 5.0:1 auf Weiss). Auf Schwarz mindestens `rgba(255,255,255,.62)`.
- Alle Bilder mit echtem `alt`, Logos `alt="Serviceplan Group"` usw., dekorative Punkte `aria-hidden`.
- `aria-current="page"` im Header für die aktuelle Seite, Sprachumschalter mit `hreflang` und `lang` am Link.
- Tap-Ziele mindestens 44px, FAQ per Tastatur bedienbar (native `details`).
- Externe Links: `target="_blank" rel="noopener"` und sichtbarer Pfeil ↗ plus `aria-label` "(öffnet neues Fenster)".

---

## D. Copy

### D.1 Startseite DE (v2, umgesetzt in `de/index.html`)

**Meta** unverändert (Title `KI-Software und KI-CoWorker für Unternehmen | utxo AG`).

**1 · Hero**
- H1: **Ihre nächsten Mitarbeiter sind digital.** <grau>Wir entwickeln sie.</grau>
- Subline: KI-CoWorker und KI-Software, die in Ihren Prozessen arbeiten. Gehostet in Deutschland oder der EU, auf Wunsch on-premise.
- CTA `Erstgespräch buchen` → `#contact` · Textlink `Leistungen ansehen →` → `#services`
- Vertrauenszeile: `Produktiv in rund 30 Tagen · Als Team seit 2021`
- Hero-Swipe: `Individuelle KI` · **Braucht Ihr Unternehmen KI?** · Individuelle CoWorker für Ihren Prozess. · `Zu den KI-CoWorkern →`

**2 · Entwickelt für**: Serviceplan Group, RST Datentechnik │ LCX, UNHCR, Cardano Foundation, book.io. Fussnote: LCX, UNHCR, Cardano Foundation und book.io: Projekte unserer Marke NMKR.

**3 · Für Ihr Unternehmen entwickelt.** Lede: Individuelle KI für einen konkreten Prozess, angebunden an Ihre Systeme.
- `KI-CoWorker` · **Ein digitaler Mitarbeiter für einen ganzen Prozess.** Er bedient Ihre Programme, beantwortet Anfragen, erstellt Angebote und fragt nach, statt zu raten. Wo es darauf ankommt, entscheidet ein Mensch. `KI-CoWorker entdecken →`
  Mockup: Mail "Störung Netzknoten Waldshut: erledigt" von Otto (KI-CoWorker Störungsdienst), Ablauf 07:12 bis 09:38, "Freigabe durch Teamleitung Technik, 07:18", Anhänge `Störungsbericht_2026-10-02.pdf`, `Kundeninfo_Versand.xlsx`; Glas-Chip "Erledigt in 2 Std. 26 Min." (Beispieldaten).
- `KI-Telefonassistent` · **Spricht mit Ihren Anrufern, in Echtzeit.** Er führt Gespräche mit natürlicher Stimme, bucht Termine und gibt Dringendes sofort weiter. Angebunden an Ihren Kalender und Ihre Systeme. `Live-Demo ausprobieren →` (`/de/ki-telefonassistent#demo`)
  Mockup: Anruf-Board "Muster Haustechnik GmbH" mit Neu / In Bearbeitung / Erledigt, Karten mit Art (Dringend, Ticket, Termin, Spam aussortiert), Priorität, Nummer, Zeit, Dauer, KI-Zusammenfassung; Glas-Karte mit Transkriptauszug, Wellenform, "Termin gebucht · Kalender".
- `KI-Software · Doc Indexer` · **Antworten aus Ihren Dokumenten, mit Quelle.** Nicht jede Aufgabe braucht einen CoWorker. Der Doc Indexer beantwortet Fragen in eigenen Worten mit Link auf die Originalseite, und jede Rolle sieht nur, was sie sehen darf. `Demo ausprobieren →` (`/de/doc-indexer#demo`)
  Mockup aus `docdemo.js`: Frage "Wer zahlt, wenn Verdichter 2 der Kälteanlage ersetzt werden muss?", 2 Antwortblöcke mit Quellen 1 und 2, Originalseite Nachtrag Nr. 3, Seite 2 mit Markierung; Glas-Chip "Immobilienverwalter · sieht 5 von 5 Dokumenten".
- Schlusszeile: Festpreis vor Start, Parallelbetrieb, Erfolgskriterium ab Tag 0. `Ablauf im Detail →` (`/de/ki-coworker#process`)

**4 · Eigene Produkte. Im Markt, im Betrieb.** Lede: Was wir für Kunden entwickeln, setzen wir auch selbst ein.
- anruf.guru `Neu` · **Der Anrufbeantworter, der mitdenkt.** Aus jeder Nachricht wird ein Ticket mit Transkript, Termine landen im Kalender, Dringendes kommt per SMS. In 5 Minuten eingerichtet. `anruf.guru öffnen ↗` · anruf.guru führt keine Gespräche. Dafür gibt es den KI-Telefonassistenten.
- Sokosumi: Marktplatz, auf dem Teams KI-CoWorker beauftragen wie Kollegen. Nutzer 13'000+ registriert · Im Einsatz über 10 KI-CoWorker, 40+ Agenten · `sokosumi.com ↗`
- Masumi: Zahlungen, Identität und Nachweise für KI-Agenten. Lizenz Open Source · Sicherheit Smart Contracts geprüft von TxPipe · `masumi.network ↗`
- Gemeinsam mit der Serviceplan Group entwickelt und betrieben.

**5 · Referenzen und Presse.**
- RST Datentechnik · `KI-CoWorker · Störungsmanagement` · **Ein CoWorker im Störungsdienst eines Internetproviders.** Für RST Datentechnik, Internetprovider am Hochrhein, nimmt er Störungsmeldungen an, priorisiert nach Schweregrad, koordiniert die Technik und informiert Kunden. Ergebnis: Schnellere Reaktion, weniger Eskalationen, ein entlastetes Support-Team.
- NMKR: Unsere Marke für dezentrale Infrastruktur: Payment, Identität, Tokenisierung, seit 2021 im Betrieb. `nmkr.io ↗`
- Frühere Projekte: Fundraising-Plattform für UNHCR · Infrastruktur für die regulierte Börse LCX in Liechtenstein · Cardano Foundation · book.io
- Presseband: `Über unsere Projekte berichten` · `Alle Presseberichte →`, 6 Logos, 3 deutsche Featured-Schlagzeilen aus `press.js`.

**6 · Kontrolle** · **Nicht jeder Prozess braucht KI. Wo sie hilft, bleibt sie unter Ihrer Kontrolle.** Daten in Deutschland oder der EU (Auf Wunsch on-premise.) · Kein Training mit Ihren Daten (Geregelt im AVV.) · Minimale Rechte (Jede Aktion protokolliert.) · DSGVO und ISMS (ISMS ausgerichtet an ISO/IEC 27001:2022.) · `Sicherheitskonzept →`

**7 · Ein Produktstudio aus Zug.** Rund 15 Menschen in Entwicklung, Design und Strategie. Sie sprechen direkt mit denen, die Ihre Lösung entwickeln.

**8 · Häufige Fragen.**
1. Für welche Unternehmen ist das gedacht? Für Mittelstand und Konzerne jeder Branche, in denen wiederkehrende Abläufe Zeit binden: Anfragen, Angebote, Recherche, Dokumente, Störungen. Lohnt sich KI für Ihren Prozess nicht, sagen wir Ihnen das im Workshop.
2. Was kostet ein KI-CoWorker? Die Entwicklung kostet einmalig einen Festpreis, den wir vor Projektstart vereinbaren. Dazu kommt ein Abonnement für den laufenden Betrieb, abhängig von Ihrem Nutzungsprofil. Beides legen wir individuell fest, das Angebot erhalten Sie innerhalb von 48 Stunden nach dem Workshop.
3. Müssen wir unsere Systeme wechseln? Nein. Ein CoWorker arbeitet in den Programmen, die Ihr Team bereits nutzt, etwa ERP, CRM, E-Mail und Dokumente. Fehlt eine Schnittstelle, entwickeln wir sie.
4. Wer betreibt die Lösung nach dem Go-live? Wir. Betrieb, Hosting, Wartung und Weiterentwicklung deckt das Abonnement ab, damit die Lösung mit Ihrem Prozess mitwächst.

**9 · Sprechen wir über Ihren Prozess.** 30 Minuten, unverbindlich, mit kurzer Live-Demo. Mobil: "Wählen Sie einen Termin direkt im Kalender." `Termin wählen`. Rückruf: Name, E-Mail, Telefon (optional), Nachricht, `Rückruf anfordern`, Hinweis wie bisher, `business@utxo.ag`.

**Footer-Claim** (Partials): KI-Software und KI-CoWorker für Unternehmen. ("Ein Produktstudio aus Zug" steht nur noch im Team-Block.)

### D.2 Startseite EN

**Meta**
- Title: `AI Software and AI CoWorkers for Business | utxo AG`
- Description: `utxo AG develops AI software and AI CoWorkers that work inside your processes. Hosted in Germany or the EU, on-premise on request.`

**1 · Hero**
- Kicker: `utxo AG · AI product studio · Zug`
- H1: `Your next hires are digital. We develop them.` (J1, decided)
- Subline: AI CoWorkers and AI software that work inside your processes. Hosted in Germany or the EU, on-premise on request.
- CTA: `Book an intro call` · `See our services`
- Trust line: `Fixed price before we start · Live in about 30 days · A team since 2021`
- Index (`What we develop and run`):
  - 01 AI CoWorker · Digital employees for entire processes
  - 02 AI Phone Assistant · Real-time conversations, developed for you
  - 03 AI software · Such as our Doc Indexer
  - 04 anruf.guru · The answering machine that thinks along ↗ (`New`)
  - 05 Sokosumi · Marketplace for AI CoWorkers ↗
  - 06 Masumi · Payments and identity for AI agents ↗
- Hero swipe (stays, existing copy): label `Custom AI` · **Does your company need AI?** · Custom CoWorkers for your process, productive in about 30 days. · `Explore AI CoWorkers →` → `/en/ai-coworker`

**2 · Proof**: `Developed for` Serviceplan Group · RST Datentechnik · LCX / `Our projects in the media` (6 logos → `/en/press`)

**3 · Approach** (`01 / Approach`)
- H2: **Not every process needs AI. Where it helps, it should do real work.**
- 01 **Developers, not resellers.** We develop every solution ourselves, from analysis to operations. You talk directly to the people who deliver it.
- 02 **Your data stays under your control.** Hosted in Germany or the EU, on-premise on request. Your data never trains third-party models; the data processing agreement says so.
- 03 **Fixed price first, development second.** You know the cost and the success criterion before we start. Going live typically takes about 30 days.

**4 · Services** (`02 / Services`)
- H2: **Developed for your business.**
- Lede: Custom AI for one specific process. We develop it, connect it to your systems and run it, on our infrastructure or yours.
- A · `AI CoWorker` · H3 **A digital employee for an entire process.** · An AI CoWorker operates your software, knows your business and handles processes end to end. It answers enquiries, prepares quotes, researches leads or monitors regulation. When something is unclear, it asks instead of guessing. Where it matters, a human decides. · List: Memory for company knowledge and open cases / Works in your ERP, CRM, email and documents; we develop any missing interface / Every action logged, approvals wherever you want them · `Explore AI CoWorkers →`
- A2 · `Special case: phone` · H3 **AI Phone Assistant: talks to your callers in real time.** · For businesses with high call volumes we develop a phone assistant that holds natural conversations, asks follow-up questions, books appointments, turns requests into tickets and passes urgent matters on immediately. Connected to your calendar and systems. · `Try the live demo →` (`/en/ai-phone-assistant#demo`) · `See the AI Phone Assistant →` (`/en/ai-phone-assistant`)
- B · `AI software` · H3 **Software that understands your data.** · Not every task needs a CoWorker. Often a lean AI application or automation that solves exactly one problem is enough. Our Doc Indexer is one example. · Doc Indexer: Ask in your own words, get answers from your documents with a link to the original page. Every role sees only what it is allowed to see. · `Try the demo →` (`/en/doc-indexer#demo`) · `See the Doc Indexer →` (`/en/doc-indexer`)

**5 · Process** (`03 / Process`)
- H2: **From workshop to live operation in about 30 days.**
- Lede: A fixed process, a fixed price and a success criterion you define. No open-ended pilots.
- `Before` **Intro call.** 30 minutes including a short live demo. / `Day 0` **Workshop.** 90 minutes, remote. We pick the process with the biggest lever and define the success criterion. / `Days 2 to 5` **Fixed-price offer.** Within 48 hours, including a kickoff date. / `Days 6 to 19` **Development.** Halfway through you see a version running on your real data. / `Days 20 to 25` **Parallel run.** Your team reviews, we fine-tune. / `Days 26 to 30` **Go-live.** Measured against the Day 0 criterion.
- `Your effort: one workshop, one domain expert, two short feedback calls.` · `Process in detail →`

**6 · Products** (`04 / Products`)
- H2: **Our own products. In the market, in operation.**
- Lede: What we develop for clients, we also put to work in our own products. Three of them are live.
- anruf.guru · `New · anruf.guru` · H3 **The answering machine that thinks along.** · anruf.guru takes your calls when you can't or don't want to. Every message becomes a ticket: who, what, how urgent, with a transcript. If the caller names a day and time, the appointment goes straight into your Google Calendar. Urgent matters reach you by SMS right away, spam goes into its own folder. · Facts: Setup · 5 minutes via call forwarding, you keep your number / Data · Stored in Frankfurt am Main, no audio recordings stored / Availability · Private plan live, business plans coming soon · `Open anruf.guru ↗` · Crosslink: anruf.guru records messages and does not hold conversations. Want your callers to talk to an AI? `See the AI Phone Assistant →` · Note: anruf.guru itself is German-only; say so in small print: `Available in German.`
- Sokosumi · `Marketplace for AI CoWorkers · with Serviceplan Group` · H3 **Marketing teams hire AI CoWorkers like colleagues.** · On Sokosumi, teams brief AI CoWorkers in plain language and receive finished work: a PDF, a deck or a live dashboard. A CoWorker splits the brief and hands parts to specialist agents working in parallel. Tasks, status and cost are visible at all times. · Facts: Users · 13,000+ registered / AI CoWorkers · More than 10 live, several by utxo AG / Specialist agents · 40+, including data from GWI, Statista and dpa / Operation · Developed by utxo AG (NMKR), operated together with Serviceplan Group (J2: only with Serviceplan's consent, otherwise "Developed and operated together with Serviceplan Group") · `sokosumi.com ↗`
- Masumi · `Infrastructure for AI agents · Open source` · H3 **Payments, identity and proof for AI agents.** · When AI agents work for each other, they need three things: a verifiable identity, secure payment and proof of their decisions. Masumi provides all three: escrow payments with automatic refunds, verified identities and an auditable decision log. · Facts: Standard · Integrated into the x402 standard / Open · Open source, smart contracts audited by TxPipe / Compatible · LangChain, CrewAI, A2A, MCP and more / Operation · as for Sokosumi (J2) · `masumi.network ↗`

**7 · Projects** (`05 / Projects`)
- H2: **Selected work.**
- Lede: From the agent platform for Europe's largest owner-managed agency group to a CoWorker on incident duty. Further projects are confidential.
- Serviceplan Group · `Platforms` · For Serviceplan Group (House of Communication) we develop Masumi and Sokosumi. We are responsible for technology and hosting; both are operated jointly and now also serve the group's clients.
- RST Datentechnik · `AI CoWorker` · For this regional internet provider on the Upper Rhine we put a CoWorker for incident management into operation. It monitors systems, takes fault reports, prioritises by severity, coordinates technicians and keeps customers informed. Result: faster response, fewer escalations, a support team with room to breathe.
- NMKR · `Our own brand` · Our brand for decentralised infrastructure: payments, identity and tokenisation, plus no-code software. In operation since 2021 and designed for traffic peaks of millions of requests. `nmkr.io ↗`
- Earlier work · A fundraising platform for the UN Refugee Agency UNHCR and infrastructure for the regulated exchange LCX in Liechtenstein.
- Press teaser: **Our projects in the media.** Handelsblatt, Forbes, t3n, Horizont and many others have covered Masumi and Sokosumi. `All press coverage →`

**8 · Security** (`06 / Security`)
- H2: **Security is part of the architecture.**
- Lede: A CoWorker acts inside your company. That is why it is designed to do exactly what it should, and nothing else.
- Data stored in Germany or the EU. On-premise or in your cloud on request. / No training on your data. Contractually covered by the data processing agreement. / Least privilege. Per user, task and file. No open internet access. / Protection against manipulation. External content is data, never an instruction. / Complete audit trail. Every action traceable, people approve what matters. / GDPR and ISMS. Processing under a DPA, ISMS aligned with ISO/IEC 27001:2022 and with the requirements of the EU AI Act.
- `Security in detail →`

**9 · About** (`07 / About`)
- H2: **A product studio from Zug.**
- utxo AG develops software and AI systems, from idea to day-to-day operation. Around 15 people in engineering, design and strategy, working as a team since 2021, based in Zug with colleagues across Switzerland, Germany and Europe.
- Facts: Based in · Zug, Switzerland / Team · around 15 people / Since · 2021 as a team, 2022 as a company / Working mode · remote, DE/CH/EU
- **Not an anonymous outsourcing team.** The people who develop your CoWorker are the people you talk to.

**10 · FAQ** (`08 / Questions`)
- H2: **Frequently asked questions.**
1. **Who is this for?** Mid-sized companies and enterprises in any industry where recurring work ties up time: enquiries, quotes, research, documents, incidents. In the workshop we check honestly whether AI pays off for your process.
2. **What does an AI CoWorker cost?** Development is a one-off fixed price agreed before we start. Operation, hosting, maintenance and further development are covered by a subscription sized to your usage. You receive the offer within 48 hours of the workshop.
3. **Where is our data stored?** In data centres in Germany or the EU, on-premise on request. Your data is not used to train third-party models.
4. **Do we need to change our systems?** No. A CoWorker works in the software your team already uses. If an interface is missing, we develop it.
5. **How fast is a CoWorker productive?** Typically after about 30 days. Before that it runs in parallel with your existing process so your team can review it.
6. **What is the difference between anruf.guru and the AI Phone Assistant?** anruf.guru is a ready-made answering machine: it records messages and turns them into tickets, appointments and SMS alerts, but does not talk to the caller. The AI Phone Assistant holds the conversation in real time and is developed for your business.

**11 · Contact**
- H2: **Let's talk about your process.**
- Lede: 30 minutes, no obligation. You describe the process, we show you in a short live demo what AI can take over.
- `01 Intro call → 02 Workshop → 03 Fixed-price offer`
- **Prefer a callback?** · `Request a callback` · Note: We will get back to you within one business day. By submitting, you accept our `privacy policy` (`/en/privacy`).

### D.3 Produktseite KI-CoWorker (`/de/ki-coworker`, `/en/ai-coworker`)

Basis: bestehende `agents(.de).html`. Abschnitts-IDs `#cases #process #security #whitepapers #pricing #contact` bleiben (alte Anker funktionieren weiter).

- **Meta DE:** `KI-CoWorker: digitale Mitarbeiter für Ihre Prozesse | utxo AG` / `Individuell entwickelte KI-CoWorker für Mittelstand und Konzern: arbeiten in Ihren Programmen, Festpreis vor Start, produktiv in rund 30 Tagen. Hosting Deutschland/EU.`
- **Meta EN:** `AI CoWorkers: digital employees for your processes | utxo AG` / `Custom AI CoWorkers for mid-sized companies and enterprises: they work in your software, fixed price before we start, live in about 30 days. Hosted in Germany/EU.`

| # | Abschnitt | DE Kopf | EN Kopf | Inhalt |
|---|---|---|---|---|
| 1 | Hero (Pixelgrid bleibt, C.6) | **Ihr nächster Mitarbeiter braucht keinen Schreibtisch.** Lede: Ein KI-CoWorker ist ein digitaler Mitarbeiter, individuell für einen Prozess in Ihrem Unternehmen entwickelt. Er bedient Ihre Programme, kennt Ihren Betrieb und übernimmt Abläufe von Anfang bis Ende. | **Your next employee doesn't need a desk.** An AI CoWorker is a digital employee developed for one process in your company. It operates your software, knows your business and handles processes end to end. | CTA `Erstgespräch buchen` / `Beispiele ansehen`, Trust-Zeile wie Startseite |
| 2 | Abgrenzung (neu) | **Kein Chatbot. Ein Kollege mit Gedächtnis.** | **Not a chatbot. A colleague with a memory.** | 3 Spalten: Gedächtnis (Firmenwissen + Fallgedächtnis) · Handeln (bedient ERP, CRM, E-Mail, erstellt Angebote, Berichte, Excel) · Rückfragen statt Raten (eskaliert bei Unklarheit). Link auf Ratgeber "CoWorker vs. Copilot". |
| 3 | `#cases` | **Wo ein CoWorker hilft.** Lede bisher, plus "Nicht jeder Prozess braucht KI." | **Where a CoWorker helps.** | 6 Fälle aus Bestand (Empfang, Vertrieb, Lead-Recherche, Compliance, technische Prüfung, Dokumente) als `.ref-list`-ähnliche Zeilen mit "Ergebnis". Bei Empfang Link zum KI-Telefonassistenten. |
| 4 | Referenz (neu) | **Im Einsatz: Störungsmanagement bei RST Datentechnik.** | **In operation: incident management at RST Datentechnik.** | Text aus Referenzen, Logo RST |
| 5 | Arbeitsweise (neu, kurz) | **So arbeitet ein CoWorker.** | **How a CoWorker works.** | Orchestrator verteilt Teilaufgaben an isolierte Sub-Agenten; Werkzeuge je Aufgabe freigegeben; Human-in-the-Loop je Prozess; Einsatzarten: kundennah, für Mitarbeitende, fürs Management, autonom im Hintergrund |
| 6 | `#process` | **Ihr CoWorker, einsatzbereit in rund 30 Tagen.** | **Your CoWorker, ready in about 30 days.** | Roadmap aus Bestand, `.steps` |
| 7 | `#security` | **Sicherheit ist von Anfang an Teil der Architektur.** | **Security has been part of the architecture from day one.** | 4 Prinzipien aus Bestand. **Korrekturen:** "Erfüllt die ... EU-KI-Verordnung" → "Ausgerichtet an den Transparenz- und Risikokontrollanforderungen der EU-KI-Verordnung". Datenhoheit: "Datenhaltung in Deutschland oder der EU, auf Wunsch on-premise. Die Modellverarbeitung erfolgt je nach Projekt beim Modellanbieter oder in EU-Regionen; eine ausschliessliche Verarbeitung in der EU vereinbaren wir auf Wunsch." Lokale Modelle: "Lokale Open-Source-Modelle prüfen wir projektbezogen" (J7). |
| 8 | Betriebsmodelle (neu, kurz) | **Eigenständig, oder vernetzt, wenn Sie wollen.** | **Standalone, or connected if you want.** | Standard: eigenständig. Optional: privat oder öffentlich auf Sokosumi gelistet, vernetzt über Masumi. Satz: Der CoWorker funktioniert vollständig ohne Sokosumi und Masumi. |
| 9 | `#pricing` | **Einmalige Entwicklung. Ein planbares Abonnement.** | **One-off development. A predictable subscription.** | Bestand, ohne Zahlen |
| 10 | `#whitepapers` | **Zum Nachlesen: unsere Whitepaper.** | **Further reading: our whitepapers.** | Bestand (J16) |
| 11 | FAQ | 4 Fragen (Kosten, Daten, Systeme, Dauer). Keine Frage zum verfehlten Tag-0-Kriterium (J21) | | |
| 12 | `#contact` | **Ihr nächster Mitarbeiter braucht keinen Schreibtisch.** wird zu: **Welchen Prozess sollen wir uns ansehen?** | **Which process should we look at?** | `.booking` |

JSON-LD: `Service` (name "KI-CoWorker"/"AI CoWorker", provider `https://utxo.ag/#org`, areaServed CH/DE/AT, keine offers).

### D.4 Produktseite KI-Telefonassistent (`/de/ki-telefonassistent`, `/en/ai-phone-assistant`)

Basis: `call_assistant(.de).html`. Live-Demo bleibt (Fassade, `callDemoUrl`), jetzt im zweiten Abschnitt.

- **Meta DE:** `KI-Telefonassistent mit Live-Demo | utxo AG` / `Ein KI-Telefonassistent, der mit Ihren Anrufern in Echtzeit spricht, Termine bucht und Anliegen als Ticket aufnimmt. Individuell entwickelt. Jetzt live testen.`
- **Meta EN:** `AI Phone Assistant with live demo | utxo AG` / `An AI phone assistant that talks to your callers in real time, books appointments and turns requests into tickets. Developed for your business. Try it live.`

| # | Abschnitt | DE | EN |
|---|---|---|---|
| 1 | Hero | Kicker `KI-Telefonassistent · individuell entwickelt` · H1 **Jeder Anruf angenommen. Jedes Anliegen erledigt.** · Lede: Ein Telefonassistent, der mit Ihren Anrufern spricht, mit natürlicher Stimme und in Echtzeit. Er bucht Termine, nimmt Anliegen als Ticket auf, sortiert Spam aus und gibt Dringendes sofort an Ihr Team. · CTA `Live-Demo starten` (scrollt zu `#demo`) / `Erstgespräch buchen` | `AI Phone Assistant · developed for you` · **Every call answered. Every request handled.** · A phone assistant that talks to your callers in a natural voice, in real time. It books appointments, records requests as tickets, filters spam and passes urgent matters to your team immediately. |
| 2 | `#demo` | **Sprechen Sie selbst mit ihm.** Demo-Stage (Praxis-Empfang), Ziel des Startseiten-Links. Stage-Leiste nennt "Demo-Umgebung utxo AG" (J12). Hinweis wie bisher (OpenAI). | **Talk to it yourself.** Stage bar: "Demo environment utxo AG". |
| 3 | Ablauf | 3 Schritte aus Bestand: Alle Anrufer → Der Assistent übernimmt → Ihr Team | |
| 4 | Fähigkeiten (neu) | **Was er übernimmt.** Termine buchen und verschieben · Anliegen als Ticket mit Zusammenfassung · Bestandskunden erkennen und offene Vorgänge zuordnen (über Ihr CRM) · Dringendes sofort weiterleiten oder melden · Spam und Verwähler aussortieren · Rund um die Uhr erreichbar | **What it takes over.** |
| 5 | Individuell (neu) | **Auf Ihr Unternehmen zugeschnitten.** Begrüssung, Stimme und Gesprächsregeln nach Ihren Vorgaben. Anbindung an Kalender, CRM und Ticketsystem. Klare Regeln, wann ein Mensch übernimmt. | **Tailored to your business.** |
| 6 | Abgrenzung (`.crosslink`) | **Sie brauchen nur einen klugen Anrufbeantworter?** Dann ist anruf.guru die schnellere Lösung: eingerichtet in 5 Minuten, ohne Gespräch, mit Tickets, Terminen und SMS bei Dringendem. `anruf.guru öffnen ↗` | **Just need a smart answering machine?** |
| 7 | Daten | Hosting, AVV, Hinweis zur Demo (Sprache wird in der Demo von OpenAI verarbeitet; im Kundenprojekt wählen wir Anbieter und Region mit Ihnen) | |
| 8 | Ablauf kurz | Verweis auf 30-Tage-Ablauf, Link `/de/ki-coworker#process` | |
| 9 | FAQ | Klingt er wie ein Mensch? · Was passiert bei Dringendem? · Welche Systeme? · Was ist der Unterschied zu anruf.guru? · Werden Gespräche aufgezeichnet? (nur mit Text, den Phil bestätigt, sonst Frage weglassen, J12) | |
| 10 | Kontakt | `.booking` (neu auf dieser Seite, bisher nur Link) | |

JSON-LD: `Service` statt `SoftwareApplication` (individuelle Entwicklung).

### D.5 Produktseite Doc Indexer (`/de/doc-indexer`, `/en/doc-indexer`)

Basis: `doc_indexer(.de).html`. Keine Kundenbehauptungen (laut SPS interner Prototyp ohne Kunden, J11).

- **Meta DE:** `Doc Indexer: KI-Dokumentensuche mit Quelle und Rechten | utxo AG` / `Fragen Sie Ihre Dokumente in eigenen Worten. Der Doc Indexer antwortet mit Link auf die Originalseite und zeigt jeder Rolle nur, was sie sehen darf.`
- **Meta EN:** `Doc Indexer: AI document search with sources and permissions | utxo AG` / `Ask your documents in your own words. Doc Indexer answers with a link to the original page and shows every role only what it may see.`

| # | Abschnitt | DE | EN |
|---|---|---|---|
| 1 | Hero | Kicker `KI-Software · Doc Indexer` · H1 **Die Antwort steht in Ihren Dokumenten. Jetzt finden Sie sie.** · Lede: Der Doc Indexer beantwortet Fragen in eigenen Worten direkt aus Verträgen, Protokollen und Handbüchern. Jede Aussage ist mit der Originalseite verlinkt, und jede Person sieht nur, was ihre Rolle sehen darf. · CTA `Erstgespräch buchen` / `Demo ausprobieren` (→ `#demo`) | `AI software · Doc Indexer` · **The answer is in your documents. Now you can find it.** |
| 2 | Problem | **Wissen, das niemand findet, ist kein Wissen.** 3 typische Situationen (Vertragsklausel, Wartungsintervall, Brandschutzregel) | **Knowledge nobody can find isn't knowledge.** |
| 3 | `#video` | **Nur wenn die Datei existiert.** Der Abschnitt wird erst eingefügt, wenn `resources/media/doc-indexer-explainer.mp4` vorliegt (gleicher `.video`-Vertrag, 16:9). Kein Platzhalter, kein leerer Rahmen, kein Kommentar im Markup. | |
| 4 | So funktioniert es | 3 Schritte aus Bestand: Dokumente hochladen · Rechte pro Rolle · Fragen mit Quelle | |
| 5 | Was ihn auszeichnet (neu) | **Quelle auf Seitenebene:** jede Aussage mit markierter Originalstelle. **Rechte pro Rolle:** die KI schlägt vor, Sie entscheiden. **Ehrlich bei Lücken:** fehlt eine Freigabe, sagt er es, statt zu raten. **Keine Migration:** Ihre Ablage bleibt, wie sie ist. **Wiederverwendbare Vorlagen** für Rollen und Rechte. | **Page-level sources · Permissions per role · Honest about gaps · No migration · Reusable presets** |
| 6 | Einsatzfelder | Immobilien und Facility Management · Maschinendokumentation · Verträge und Nachträge · Handbücher und Richtlinien | |
| 7 | `#demo` (Pflicht, Ziel des Startseiten-Links) | **Probieren Sie es aus.** Kurze Einleitung + bestehende geführte Demo `[data-docdemo]`. Die Demo steht unterhalb der Erklärung; sie lädt nichts extern. | **Try it yourself.** |
| 8 | Daten und Hosting | Hosting Deutschland/EU, on-premise auf Wunsch, kein Training mit Ihren Daten | |
| 9 | FAQ | Welche Formate? (nur bestätigte nennen) · Wo liegen die Dokumente? · Wie werden Rechte gepflegt? · Lässt er sich an unsere Ablage anbinden? | |
| 10 | Kontakt | **Zeigen Sie uns Ihre Dokumente.** `.booking` | **Show us your documents.** |

JSON-LD: `SoftwareApplication` bleibt.

### D.6 Gemeinsame Copy-Bausteine

- Externer Link-Hinweis: `↗` + `aria-label` "öffnet in neuem Fenster" / "opens in a new window".
- Sprachumschalter-Label: `DE` / `EN` (Mono).
- Formularhinweis unverändert bis auf die URL.

---

## E. Rechtstexte (Entwürfe, DE + EN)

Vor Veröffentlichung juristisch prüfen lassen (J19, entschieden: Prüfung vor Deploy). Rechtsform in den Rechtstexten bleibt "UTXO AG" wie im Bestand. "Letzte Aktualisierung" auf das Veröffentlichungsdatum setzen.

### E.1 AGB / Terms: neue Ziffer 1.4 (nach 1.3, vor Ziffer 2)

**DE (`de/agb.html`):**
> **1.4 Nicht erfasste Produkte.** Diese Bedingungen gelten nicht für die Produkte anruf.guru, Sokosumi und Masumi. Für diese Produkte gelten ausschliesslich die Bedingungen, die auf der jeweiligen Website veröffentlicht oder bei Vertragsschluss vereinbart werden:
> - **anruf.guru:** Allgemeine Geschäftsbedingungen unter https://anruf.guru/agb. Geschäftskunden schliessen den Auftragsverarbeitungsvertrag bei der Bestellung ab; er steht im Kundenkonto zum Abruf bereit.
> - **Sokosumi:** Terms of Service unter https://www.sokosumi.com/legal/terms-of-service und Data Processing Agreement unter https://www.sokosumi.com/legal/dpa des dort genannten Anbieters.
> - **Masumi:** Masumi ist Open-Source-Software. Für die Nutzung gelten die Lizenzbedingungen der jeweiligen Repositories sowie die Angaben unter https://www.masumi.network, insbesondere die Datenschutzerklärung (https://www.masumi.network/privacy) und das Impressum (https://www.masumi.network/imprint).
>
> Werden diese Produkte im Rahmen eines Agentic Service angebunden (zum Beispiel ein AI Coworker, der auf Sokosumi gelistet oder über Masumi vernetzt wird), gelten für den Agentic Service diese Bedingungen und für die Nutzung des jeweiligen Produkts dessen eigene Bedingungen.

**EN (`en/terms.html`):**
> **1.4 Excluded products.** These Terms do not apply to the products anruf.guru, Sokosumi and Masumi. These products are governed exclusively by the terms published on their respective websites or agreed when the contract is concluded:
> - **anruf.guru:** General Terms and Conditions at https://anruf.guru/agb. Business customers conclude the data processing agreement when ordering; it is available for download in the customer account.
> - **Sokosumi:** Terms of Service at https://www.sokosumi.com/legal/terms-of-service and Data Processing Agreement at https://www.sokosumi.com/legal/dpa of the provider named there.
> - **Masumi:** Masumi is open-source software. Its use is governed by the licence terms of the respective repositories and the information at https://www.masumi.network, in particular the privacy policy (https://www.masumi.network/privacy) and the imprint (https://www.masumi.network/imprint).
>
> Where these products are connected as part of an Agentic Service (for example an AI Coworker listed on Sokosumi or networked via Masumi), these Terms govern the Agentic Service and each product's own terms govern the use of that product.

### E.2 AVV / DPA: neuer Absatz in der Präambel (nach "integraler Bestandteil ...", vor Ziffer 1)

**DE (`de/avv.html`):**
> Dieser AVV gilt ausschliesslich für die Verarbeitung personenbezogener Daten im Rahmen der Agentic Services nach den Vertragsbedingungen. Er gilt nicht für die Produkte anruf.guru, Sokosumi und Masumi:
> - Für **anruf.guru** schliessen Geschäftskunden bei der Bestellung einen eigenen Auftragsverarbeitungsvertrag ab, der im Kundenkonto abrufbar ist.
> - Für **Sokosumi** gilt das Data Processing Agreement unter https://www.sokosumi.com/legal/dpa.
> - Für **Masumi** begründet dieser AVV keine Auftragsverarbeitung. Ist im Einzelfall eine Auftragsverarbeitung erforderlich, wird sie gesondert vereinbart.

**EN (`en/dpa.html`):**
> This DPA applies exclusively to the processing of personal data as part of the Agentic Services under the Terms. It does not apply to the products anruf.guru, Sokosumi and Masumi:
> - For **anruf.guru**, business customers conclude a separate data processing agreement when ordering, available in the customer account.
> - For **Sokosumi**, the Data Processing Agreement at https://www.sokosumi.com/legal/dpa applies.
> - For **Masumi**, this DPA does not establish any processing on behalf. Where processing on behalf is required in an individual case, it will be agreed separately.

### E.3 Datenschutz / Privacy: Satz in Ziffer 1 (nach dem Kontaktabsatz)

**DE:**
> Diese Datenschutzerklärung gilt für die Website utxo.ag und für die Leistungen nach unseren Abonnementsbedingungen. Für anruf.guru, Sokosumi und Masumi gelten die Datenschutzerklärungen auf den jeweiligen Websites: https://anruf.guru/datenschutz, https://www.sokosumi.com/legal/privacy-policy und https://www.masumi.network/privacy.

**EN:**
> This privacy policy applies to the website utxo.ag and to the services under our subscription terms. For anruf.guru, Sokosumi and Masumi, the privacy policies on their respective websites apply: https://anruf.guru/datenschutz, https://www.sokosumi.com/legal/privacy-policy and https://www.masumi.network/privacy.

Zusätzlich in 4.x (neu, nach 4.7): **4.8 Video auf der Startseite** (bestehendes 4.8 Schriftarten wird 4.9):
> DE: Das Video zu anruf.guru wird von unserem eigenen Server ausgeliefert und erst geladen, wenn Sie auf "Video abspielen" klicken. Dabei werden nur die unter 4.1 beschriebenen Server-Logdaten verarbeitet.
> EN: The anruf.guru video is served from our own server and only loads when you click "Play video". Only the server log data described in 4.1 is processed.

Die Demo-Domain unter 4.6 (`demo.anruf-guru.de`) bleibt (J12: für den Launch unverändert, späterer Umzug auf eine utxo-Subdomain).

### E.4 Nutzungsrichtlinie / Acceptable Use: ein Satz im Einleitungsabsatz

> DE: Diese Richtlinie gilt nicht für anruf.guru, Sokosumi und Masumi; dort gelten die Bedingungen der jeweiligen Website.
> EN: This policy does not apply to anruf.guru, Sokosumi and Masumi; the terms on their respective websites apply there.

---

## F. URL-Migration

### F.1 Entscheidung: Ordner `de/` und `en/` mit Slug-Dateinamen

**Gewählt:** Dateien liegen genau dort, wo die URL hinzeigt (`de/impressum.html` ↔ `/de/impressum`). Caddy liefert sie mit dem vorhandenen `try_files {path}.html` aus.

**Begründung:**
- **Eine Quelle der Wahrheit:** Dateipfad = URL. Keine Rewrite-Tabelle, die mit den Dateien synchron bleiben muss.
- **Wartbar für Menschen und Subagents:** `grep`, Partials kopieren, neue Seite anlegen, alles ohne Caddy anzufassen.
- **Die einzige Tabelle** ist die Legacy-301-Liste. Sie ist eingefroren (alte URLs ändern sich nie wieder).
- **Alternative Rewrite-Map** (Dateien bleiben `agents.de.html`, Caddy übersetzt): bräuchte zwei synchrone Tabellen (ausliefern + umleiten), Dateinamen weichen von URLs ab, Fehler fallen erst zur Laufzeit auf. Verworfen.

**Konsequenz:** Alle Asset-Referenzen in HTML werden root-absolut (`/style.css`, `/fonts/...`, `/resources/...`, `/main.js`). `url(fonts/...)` in `style.css` bleibt (relativ zur CSS-Datei, korrekt).

### F.2 Alt → Neu (alle 301, Fragment `#...` bleibt durch den Browser erhalten)

| Alt (mit und ohne `.html`) | Neu |
|---|---|
| `/` | 302 → `/de` oder `/en` (Verhandlung, siehe F.3) |
| `/index` | `/en` |
| `/index.de` | `/de` |
| `/agents` | `/en/ai-coworker` |
| `/agents.de` | `/de/ki-coworker` |
| `/call_assistant` | `/en/ai-phone-assistant` |
| `/call_assistant.de` | `/de/ki-telefonassistent` |
| `/doc_indexer` | `/en/doc-indexer` |
| `/doc_indexer.de` | `/de/doc-indexer` |
| `/comparison` | `/en/coworker-vs-copilot` |
| `/comparison.de` | `/de/coworker-vs-copilot` |
| `/ai-in-business` | `/en/ai-in-business` |
| `/ai-in-business.de` | `/de/ki-im-unternehmen` |
| `/eu-ai-act` | `/en/eu-ai-act` |
| `/eu-ai-act.de` | `/de/eu-ai-act` |
| `/ai-customer-acquisition` | `/en/ai-customer-acquisition` |
| `/ai-customer-acquisition.de` | `/de/kundenakquise-mit-ki` |
| `/press` | `/en/press` |
| `/press.de` | `/de/presse` |
| `/imprint` | `/en/imprint` |
| `/imprint.de` | `/de/impressum` |
| `/privacy` | `/en/privacy` |
| `/privacy.de` | `/de/datenschutz` |
| `/terms` | `/en/terms` |
| `/terms.de` | `/de/agb` |
| `/acceptable-use` | `/en/acceptable-use` |
| `/acceptable-use.de` | `/de/nutzungsrichtlinie` |
| `/dpa` | `/en/dpa` |
| `/dpa.de` | `/de/avv` |
| `/de/`, `/en/` | `/de`, `/en` |
| `/de/index`, `/en/index` (+ `.html`) | `/de`, `/en` |
| `/de/<slug>.html`, `/en/<slug>.html` | ohne `.html` |

Datei-Moves (WP1, `git mv`, damit die Historie bleibt):

| Alt | Neu |
|---|---|
| `index.de.html` / `index.html` | `de/index.html` / `en/index.html` |
| `agents.de.html` / `agents.html` | `de/ki-coworker.html` / `en/ai-coworker.html` |
| `call_assistant.de.html` / `call_assistant.html` | `de/ki-telefonassistent.html` / `en/ai-phone-assistant.html` |
| `doc_indexer.de.html` / `doc_indexer.html` | `de/doc-indexer.html` / `en/doc-indexer.html` (aktuell untracked, also `mv` + `git add`) |
| `comparison(.de).html` | `de/coworker-vs-copilot.html` / `en/coworker-vs-copilot.html` |
| `ai-in-business(.de).html` | `de/ki-im-unternehmen.html` / `en/ai-in-business.html` |
| `eu-ai-act(.de).html` | `de/eu-ai-act.html` / `en/eu-ai-act.html` |
| `ai-customer-acquisition(.de).html` | `de/kundenakquise-mit-ki.html` / `en/ai-customer-acquisition.html` |
| `press(.de).html` | `de/presse.html` / `en/press.html` |
| `imprint(.de).html` | `de/impressum.html` / `en/imprint.html` |
| `privacy(.de).html` | `de/datenschutz.html` / `en/privacy.html` |
| `terms(.de).html` | `de/agb.html` / `en/terms.html` |
| `acceptable-use(.de).html` | `de/nutzungsrichtlinie.html` / `en/acceptable-use.html` |
| `dpa(.de).html` | `de/avv.html` / `en/dpa.html` |

### F.3 Caddyfile (Zielbild, WP1 implementiert und testet)

```caddy
{
	admin off
}

:{$PORT}

root * .
encode gzip zstd

header {
	X-Content-Type-Options "nosniff"
	Referrer-Policy "strict-origin-when-cross-origin"
}

# 1. Root: Sprache aushandeln, 302, nie cachen
@root path /
header @root Vary "Accept-Language, Cookie"
header @root Cache-Control "private, no-store"
@root_de expression `{path} == "/" && ({http.request.cookie.utxo_lang} == "de" || ({http.request.cookie.utxo_lang} != "en" && {http.request.header.Accept-Language}.matches("^de")))`
redir @root_de /de 302
redir @root /en 302

# 2. Alte URLs (eingefroren)
map {path} {legacy} {
	~^/index(\.html)?$                       /en
	~^/index\.de(\.html)?$                   /de
	~^/agents(\.html)?$                      /en/ai-coworker
	~^/agents\.de(\.html)?$                  /de/ki-coworker
	~^/call_assistant(\.html)?$              /en/ai-phone-assistant
	~^/call_assistant\.de(\.html)?$          /de/ki-telefonassistent
	~^/doc_indexer(\.html)?$                 /en/doc-indexer
	~^/doc_indexer\.de(\.html)?$             /de/doc-indexer
	~^/comparison(\.html)?$                  /en/coworker-vs-copilot
	~^/comparison\.de(\.html)?$              /de/coworker-vs-copilot
	~^/ai-in-business(\.html)?$              /en/ai-in-business
	~^/ai-in-business\.de(\.html)?$          /de/ki-im-unternehmen
	~^/eu-ai-act(\.html)?$                   /en/eu-ai-act
	~^/eu-ai-act\.de(\.html)?$               /de/eu-ai-act
	~^/ai-customer-acquisition(\.html)?$     /en/ai-customer-acquisition
	~^/ai-customer-acquisition\.de(\.html)?$ /de/kundenakquise-mit-ki
	~^/press(\.html)?$                       /en/press
	~^/press\.de(\.html)?$                   /de/presse
	~^/imprint(\.html)?$                     /en/imprint
	~^/imprint\.de(\.html)?$                 /de/impressum
	~^/privacy(\.html)?$                     /en/privacy
	~^/privacy\.de(\.html)?$                 /de/datenschutz
	~^/terms(\.html)?$                       /en/terms
	~^/terms\.de(\.html)?$                   /de/agb
	~^/acceptable-use(\.html)?$              /en/acceptable-use
	~^/acceptable-use\.de(\.html)?$          /de/nutzungsrichtlinie
	~^/dpa(\.html)?$                         /en/dpa
	~^/dpa\.de(\.html)?$                     /de/avv
	~^/(de|en)/index(\.html)?$               /${1}
	~^/(de|en)/$                             /${1}
}
@legacy expression `{legacy} != ""`
redir @legacy {legacy} 301

# 3. .html entfernen (übrige Fälle)
@htmlfile path_regexp htmlext ^/(.+)\.html$
redir @htmlfile /{re.htmlext.1} 301

# 4. Startseiten ausliefern
rewrite /de /de/index.html
rewrite /en /en/index.html

# Cache-Header wie bisher (@staticassets, @media, @pages unverändert übernehmen)

@internal path /docs/* /partials/* *.md /removed-sections /removed-sections.html *.blend *.blend1
respond @internal 404

try_files {path} {path}.html =404
file_server
```

Hinweise für WP1:
- `redir`-Direktiven laufen in Dateireihenfolge; `@root_de` muss vor `@root` stehen, `@legacy` vor `@htmlfile`.
- `try_files` ohne `{path}/`, damit Caddy nie Verzeichnisse mit Slash-Redirect ausliefert. Startseiten laufen über die expliziten `rewrite`.
- Map-Regex mit Capture (`${1}`) und das Verhalten von `{legacy}` ohne Treffer mit `caddy adapt` und curl verifizieren. Falls die Capture-Syntax nicht greift, die vier `de/en`-Zeilen ausschreiben.
- Query-Strings: `redir` hängt sie nicht automatisch an. Prüfen, ob `{legacy}?{query}` sauber funktioniert (kein `?` bei leerem Query); sonst akzeptieren, dass UTM-Parameter alter Links verloren gehen.
- Cloudflare: `/` darf nicht gecacht werden (Header oben). Nach Deploy einmal prüfen (J22).

### F.4 Sprachlogik

- **Server:** nur `/` verhandelt (Cookie `utxo_lang`, sonst `Accept-Language` beginnt mit `de`, sonst EN).
- **Head-Script:** **entfällt** auf allen Seiten (J15). Die URL trägt die Sprache, eine clientseitige Umleitung ist nicht mehr nötig und würde geteilte Links verbiegen.
- **Cookie** wird nur durch Klick auf `[data-set-lang]` gesetzt (`main.js`, bestehender Handler). `localStorage.utxo_lang` entfällt (eine Quelle: Cookie).
- **`data-set-lang`-Links** zeigen auf das Gegenstück der aktuellen Seite (`/de/impressum` ↔ `/en/imprint`, `/de` ↔ `/en`).

### F.5 Head-Block pro Seite (Reihenfolge wie CLAUDE.md, ohne Sprachscript)

```html
<meta charset="utf-8">
<link rel="canonical" href="https://utxo.ag/de/impressum">
<link rel="alternate" hreflang="de" href="https://utxo.ag/de/impressum">
<link rel="alternate" hreflang="en" href="https://utxo.ag/en/imprint">
<link rel="alternate" hreflang="x-default" href="https://utxo.ag/en/imprint">
<meta name="viewport" ...>
<title>..</title> <meta name="description" ...>
<meta property="og:url" content="https://utxo.ag/de/impressum"> ...
<link rel="preload" href="/fonts/manrope-latin-var.woff2" ...>
<link rel="icon" href="/resources/FAVICONS/icon.svg" ...>
<link rel="stylesheet" href="/style.css">
```

Startseiten: `x-default` → `https://utxo.ag/` (die verhandelnde Root). JSON-LD: `@id` bleibt `https://utxo.ag/#org`, `url` bleibt `https://utxo.ag/`; Produktseiten-JSON-LD `url` auf neue URL.

### F.6 Sitemap

28 `<url>`-Einträge (`/de`, `/en` und 13 Paare), jeweils mit `hreflang` de, en, x-default (Startseiten: x-default `https://utxo.ag/`, sonst die EN-URL). `/` selbst nicht als `<loc>`. `lastmod` = Datum des Relaunch-Deploys für alle geänderten Seiten.

### F.7 Weitere Stellen (aus `url-inventory.md`)

| Stelle | Änderung | WP |
|---|---|---|
| `main.js:149-150` Consent-Links `/privacy(.de)` | `/de/datenschutz` / `/en/privacy` | WP1 |
| `main.js:939` `resources/agent_hero_anim/head_1_crop.webp` (Bildquelle des Pixelgrids auf der CoWorker-Seite) | root-absolut `/resources/agent_hero_anim/head_1_crop.webp`, bleibt | WP1 |
| `press.js:2-14` relative Logo-Pfade | `/resources/press/...` | WP1 |
| Hero-Swipe `href="/agents(.de)"` (`index(.de).html:77`) | `/de/ki-coworker` / `/en/ai-coworker`, Swipe bleibt | WP1 (URL), WP2 (Einbettung nach C.6) |
| `partials/footer.de.html:8-10` `/index.de#...` | `/de#...` | WP1 (Links), WP2 (neues Markup) |
| deutsche Unterseiten mit `/#team` | `/de#team` | WP1 |
| `[data-cal-inline]` inline `min-height:400px` (4 Seitenpaare) | entfernen | Seiten-WPs (WP4 bis WP9), Regel in WP2 |
| Interne Links in SEO-Ratgebern auf `/agents#cases` usw. | neue URLs | WP1 |

---

## G. Kalender-Fix

**Ursache** (`cal-glitch.md`): Das cal.com-Inline-iframe wächst nach dem Laden in zwei Schritten (Desktop 400 → ~828 → ~1164 px bei 586 px Spaltenbreite; mobil 400 → 626 → 962 px), während man Richtung Footer scrollt. Scroll-Anchoring hält die iframe-Oberkante, der Footer springt zweimal um ~300 px (CLS 0.21 + 0.12).

**Lösung in drei Teilen:**

1. **Breitere Spalte (Layout):** Neues `.booking`-Layout im Kontaktblock. Ab 1100 px: `grid-template-columns: minmax(0, 2fr) minmax(300px, 1fr)` (Cal-Spalte ca. 800 px), Rückruf-Formular rechts. Darunter: Cal volle Breite, Formular darunter. Ziel: cal.com `month_view` zeigt bei dieser Breite Monat und Zeitslots nebeneinander, dadurch deutlich weniger Höhe.
2. **Höhe reservieren (gemessen):** WP2 misst die finale iframe-Höhe nach Auswahl eines Tages bei 1440, 1280, 1024, 768 und 390 px Breite (Monat mit 6 Kalenderzeilen als Worst Case) und setzt pro Breakpoint `.booking-cal{min-height: <Messwert + 16px>}`. Inline `min-height:400px` auf allen `[data-cal-inline]` entfernen (4 Seitenpaare). Falls die nebeneinander-Darstellung nicht erscheint: Werte trotzdem messen (Fallback aus `cal-glitch.md`: ca. 1170 px Desktop, ca. 980 px unter 900 px).
3. **Früher laden und ruhig aussehen:** `_initBooking` `rootMargin` von 800 auf 1600 px. Während des Ladens zeigt `.booking-cal::before` einen ruhigen Hinweis (`Kalender wird geladen`, Text aus `data-loading`), das weisse iframe deckt ihn danach ab. Cal-UI monochrom: `Cal('ui', { theme: 'light', cssVarsPerTheme: { light: { 'cal-brand': '#000000' } }, hideEventTypeDetails: false })`.

**Gilt für:** Start, KI-CoWorker, KI-Telefonassistent (neu), Doc Indexer (neu), KI im Unternehmen, CoWorker vs. Copilot.

**Akzeptanz:** Schnell zum Footer scrollen, CLS-Beitrag des Kontaktblocks < 0.02 (Performance-Panel oder `PerformanceObserver` auf `layout-shift`), Footer bewegt sich sichtbar nicht, bei 1440 und 390 px.

---

## H. Arbeitspakete

### H.1 Phasen und Reihenfolge

```
Phase 1  WP1 URL & Routing ───────────┐      WP3 Media (parallel)
Phase 2  WP2 Designsystem + JS + Partials + Startseite DE   (braucht WP1, WP3)
Phase 3  WP4 Home EN │ WP5 KI-CoWorker │ WP6 Telefonassistent │ WP7 Doc Indexer │ WP8 Recht │ WP9 Ratgeber+Presse   (parallel, brauchen WP2)
Phase 4  WP2b CSS/JS-Nachträge → WP10 Doku → WP11 QA (nur lesen und berichten) → Phil testet lokal → Commit
```

Regel: **Jede Datei hat in jeder Phase genau einen Besitzer.** `style.css`, `main.js` und `partials/*` gehören nur WP2/WP2b. Seiten-WPs, die eine fehlende Klasse brauchen, verwenden vorhandene Komponenten und melden den Bedarf im Abschlussbericht (Abschnitt "CSS/JS-Bedarf"), WP2b setzt ihn in Phase 4 um. Kein seiteneigenes `<style>`, kein neues Inline-`style` in neuem Markup.

Jeder WP ergänzt am Ende **nicht** `changes.md` selbst, sondern liefert 3 bis 8 Changelog-Bullets im Bericht (WP10 trägt zusammen, vermeidet Konflikte).

### H.2 Pakete

**WP1 · URL & Routing** (Phase 1, zuerst)
- Dateien: alle 28 Seiten (Move + Head + Links + Asset-Pfade), `Caddyfile`, `sitemap.xml`, `press.js`, `main.js` (nur Zeilen 149-150, 939 und der `data-set-lang`-Handler ohne localStorage), `partials/*` (nur Links/Pfade).
- Input: F komplett.
- Output: neue Ordnerstruktur, root-absolute Pfade, Head-Blöcke nach F.5 ohne Sprachscript, korrekte `data-set-lang`-Ziele, interne Links auf neue URLs, Caddyfile nach F.3, Sitemap nach F.6. **Keine** inhaltlichen oder gestalterischen Änderungen.
- Akzeptanz: curl-Matrix aus I.2 vollständig grün; `grep -rnE 'href="[a-z][^:"]*\.html|src="resources|href="resources|href="(style|pages)\.css|src="(main|config|press|docdemo)\.js|/index\.de|\.de"' de en partials` leer; jede Seite lädt unter Caddy ohne 404 im Network-Tab; Sprachumschalter führt auf das Gegenstück.

**WP3 · Media** (Phase 1, parallel zu WP1)
- Dateien: nur neue Dateien in `resources/media/` und `resources/logos/` (keine HTML).
- Aufgaben: Video-Encode und Poster nach C.7 (`ffmpeg -i in.mp4 -vf scale=720:-2 -c:v libx264 -profile:v high -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k out.mp4`, CRF so wählen, dass < 3 MB und ohne sichtbare Artefakte), Untertitel falls Sprache, `masumi.webp`, `rst.webp`, `lcx.webp`, `nmkr.svg` (Kopie), Grössen notieren.
- Akzeptanz: Video < 3 MB, startet im Browser sofort (faststart), Poster < 120 KB, Logos scharf bei 2x, Liste mit Pfad, Grösse, Pixelmass im Bericht.

**WP2 · Designsystem, JS, Partials, Startseite DE** (Phase 2)
- Dateien: `style.css`, `main.js`, `partials/header(.de).html`, `partials/footer(.de).html`, `de/index.html`.
- Input: B, C, D.1, G, Assets aus WP3.
- Aufgaben: Tokens und Komponenten aus C.2 bis C.5 (inkl. der Produktseiten-Komponenten `.hero-product`, `.crosslink`, `.faq`, `.steps`, `.video`, `.booking`, damit Phase 3 keine CSS braucht); Header ohne Blur, Footer nach B.3; Retire-Liste aus C.5 in Markup und JS umsetzen (vorher grep über alle Seiten); Pixelgrid und Hero-Swipe nach C.6 in `.hero` / `.hero-product` einbetten, Inline-Styles des Canvas in Klassen überführen, Pause per `IntersectionObserver` und `visibilitychange` in `_initPixelGrid`; `_initVideo`; Kalender-Fix G komplett inkl. Messung; Startseite DE nach D.1 als Referenzimplementierung (H1 `Ihre nächsten Mitarbeiter sind digital. Wir entwickeln sie.`).
- Akzeptanz: Startseite DE erfüllt alle Punkte aus I; Pixelgrid und Hero-Swipe erhalten und eingebettet (Aussehen wie heute, rAF stoppt ausserhalb des Viewports und bei verborgenem Tab, Swipe führt auf `/de/ki-coworker`); keine toten `_init*`-Funktionen; Komponenten-Klassen in einem kurzen Kommentar-freien Abschnitt pro Komponente in `style.css` gruppiert; Messwerte Kalender im Bericht.

**WP4 · Startseite EN** (Phase 3)
- Dateien: `en/index.html`.
- Input: `de/index.html` (Struktur), D.2 (Copy).
- Akzeptanz: strukturell identisch mit DE (gleiche IDs, Klassen, Reihenfolge, Pixelgrid und Hero-Swipe), Copy aus D.2, Links auf EN-Seiten, Hero-Swipe → `/en/ai-coworker`, `data-set-lang` → `/de`.

**WP5 · KI-CoWorker** (Phase 3)
- Dateien: `de/ki-coworker.html`, `en/ai-coworker.html`.
- Input: D.3, Bestandsinhalte der Datei, Komponenten aus WP2.
- Akzeptanz: Abschnitte nach D.3, alte Anker-IDs erhalten, Pixelgrid im Hero erhalten und nach C.6 eingebettet, EU-KI-Verordnung- und Hosting-Wortlaut korrigiert, `Service`-JSON-LD, Kontakt mit `.booking`.

**WP6 · KI-Telefonassistent** (Phase 3)
- Dateien: `de/ki-telefonassistent.html`, `en/ai-phone-assistant.html`.
- Input: D.4, `config.js` (nur lesen), Demo-Markup-Vertrag aus CLAUDE.md.
- Akzeptanz: Demo startet nur auf Klick, "Demo beenden" entfernt das iframe, `callDemoUrl: ''` zeigt den Nicht-verfügbar-Hinweis, Abgrenzung zu anruf.guru vorhanden, Kontakt mit `.booking`.

**WP7 · Doc Indexer** (Phase 3)
- Dateien: `de/doc-indexer.html`, `en/doc-indexer.html` (`docdemo.js` nur lesen).
- Input: D.5.
- Akzeptanz: Abschnitte nach D.5, Video-Abschnitt **nicht** im Markup, Demo funktioniert vollständig (Upload, Rechte, Rolle, Fragen, Quellenansicht) auf 1440 und 390 px, keine Kundenbehauptung.

**WP8 · Recht** (Phase 3)
- Dateien: `de/impressum.html`, `en/imprint.html`, `de/datenschutz.html`, `en/privacy.html`, `de/agb.html`, `en/terms.html`, `de/nutzungsrichtlinie.html`, `en/acceptable-use.html`, `de/avv.html`, `en/dpa.html`.
- Input: E, neue Partials.
- Aufgaben: Klauseln einfügen, "Letzte Aktualisierung" setzen, Header/Footer aus Partials übernehmen, E-Mail überall `business@utxo.ag` (J9).
- Impressum-Angaben (J10, von Phil bestätigt), genau so anzeigen:
  - DE (`de/impressum.html`): `Handelsregister` → `Handelsregister-Nummer CH-400.3.450.669-8` · `UID / MWST` → `CHE-494.509.135 MWST` · `Deutsche Betriebsnummer` → `76311831`
  - EN (`en/imprint.html`): `Commercial Register` → `Commercial register number CH-400.3.450.669-8` (heute steht dort der deutsche Text "Handelsregister-Nummer") · `UID / VAT` → `CHE-494.509.135 MWST` · `German Business Registration Number` → `76311831`
  - Stand heute (`imprint(.de).html:90-104`): alle drei Werte korrekt, "MWST" an der UID ist auf beiden Seiten bereits vorhanden. Werte beim Move unverändert übernehmen.
- Akzeptanz: Klauseltext wortgleich mit E, live erst nach juristischer Prüfung (J19), Links klickbar und extern mit `rel="noopener"`, Registerangaben wie oben, sonst keine inhaltliche Änderung (Diff prüfen).

**WP9 · Ratgeber und Presse** (Phase 3)
- Dateien: `de|en/coworker-vs-copilot.html`, `de/ki-im-unternehmen.html`, `en/ai-in-business.html`, `de|en/eu-ai-act.html`, `de/kundenakquise-mit-ki.html`, `en/ai-customer-acquisition.html`, `de/presse.html`, `en/press.html`, `pages.css` (nur falls Chrome-Anpassung nötig).
- Aufgaben: Header/Footer aus Partials, Kalenderblock auf `.booking` umstellen (KI im Unternehmen, CoWorker vs. Copilot), Verweise "Individuelle KI"/"Anrufassistent" auf neue Namen und URLs, Gedankenstriche in sichtbarer Copy prüfen.
- Akzeptanz: keine inhaltlichen Änderungen ausser Namen/Links; Kalender ohne Sprung.

**WP2b · CSS/JS-Nachträge** (Phase 4)
- Dateien: `style.css`, `main.js`.
- Input: "CSS/JS-Bedarf" aus den Berichten von WP4 bis WP9.
- Akzeptanz: alle Meldungen umgesetzt oder begründet abgelehnt.

**WP10 · Doku** (Phase 4)
- Dateien: `CLAUDE.md`, `changes.md`, `sitemap.xml` (nur `lastmod`), Aufräumen nicht mehr referenzierter Assets (nur nach grep, Liste im Bericht, Löschen erst nach Phils OK).
- Aufgaben: CLAUDE.md auf neuen Stand (Seitenliste mit URLs, Ordnerstruktur, Sprachlogik ohne Head-Script, Caddy-Regeln, Navigation, Farbzuordnung, Komponenten, entfernte Features, Pixelgrid-Pause und neues Swipe-Ziel, Video, Kalender-Fix); `changes.md` neue Session oben aus den gesammelten Bullets (max. 5 Wörter, keine Kommas/Klammern).
- Akzeptanz: CLAUDE.md beschreibt keine nicht mehr existierende Datei oder Funktion.

**WP11 · QA** (Phase 4, nur lesen)
- Dateien: keine (Screenshots und Bericht im Scratchpad).
- Aufgaben: Checkliste I komplett mit Playwright (`webapp-testing`) und curl, Ergebnis als Liste "bestanden / Fehler mit Datei:Zeile".

### H.3 Bericht, den jeder WP abliefert

1. Geänderte Dateien. 2. Was bewusst nicht gemacht wurde. 3. Offene Punkte / Annahmen. 4. CSS/JS-Bedarf (nur Phase 3). 5. Changelog-Bullets.

---

## I. Lokale Test-Checkliste

### I.1 Start

```
cd /Users/phil/claude_builds/landing-page
caddy validate --config Caddyfile
PORT=8080 caddy run --config Caddyfile
```
Privates Fenster verwenden (Browser cachen 301).

### I.2 Weiterleitungen (curl)

```
B=http://localhost:8080
curl -sI $B/ | grep -iE '^(HTTP|location|vary|cache-control)'                         # 302 → /en, Vary, no-store
curl -sI -H 'Accept-Language: de-DE,de;q=0.9' $B/ | grep -i location                   # /de
curl -sI -H 'Accept-Language: de-DE' -H 'Cookie: utxo_lang=en' $B/ | grep -i location  # /en
curl -sI -H 'Cookie: utxo_lang=de' $B/ | grep -i location                              # /de
for p in /index /index.html /index.de /agents /agents.de.html /call_assistant /call_assistant.de /doc_indexer.de \
         /comparison.de /ai-in-business.de /eu-ai-act.de /ai-customer-acquisition.de /press.de /imprint.de \
         /privacy.de /terms.de /acceptable-use.de /dpa.de /dpa /de/ /en/ /de/index /de/index.html /de/impressum.html; do
  printf '%-32s ' $p; curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' $B$p; done           # alle 301, Ziel laut F.2, kein zweiter Hop
for p in /de /en /de/ki-coworker /en/ai-coworker /de/ki-telefonassistent /en/ai-phone-assistant /de/doc-indexer \
         /en/doc-indexer /de/presse /en/press /de/impressum /en/imprint /de/datenschutz /en/privacy /de/agb /en/terms \
         /de/nutzungsrichtlinie /en/acceptable-use /de/avv /en/dpa /de/coworker-vs-copilot /en/coworker-vs-copilot \
         /de/ki-im-unternehmen /en/ai-in-business /de/eu-ai-act /en/eu-ai-act /de/kundenakquise-mit-ki /en/ai-customer-acquisition; do
  printf '%-32s ' $p; curl -s -o /dev/null -w '%{http_code}\n' $B$p; done                            # alle 200
curl -s -o /dev/null -w '%{http_code}\n' $B/docs/relaunch-2026-10-plan.md                            # 404
curl -s -o /dev/null -w '%{http_code}\n' $B/partials/header.html                                     # 404
```

### I.3 Inhalt und Regeln (grep)

- Keine Gedankenstriche in sichtbarer Copy: `grep -n '—\|–' de/*.html en/*.html` (Treffer nur in Code/Kommentaren zulässig, prüfen).
- Wortwahl: `grep -niE 'bauen|gebaut|baut |\bbuil(d|t)\b' de/*.html en/*.html` → nur Treffer, die nicht utxo-Arbeit beschreiben.
- Keine Preise/Telefonnummern: `grep -nE '(CHF|EUR|€|\$) ?[0-9]|\+41|\+49' de/*.html en/*.html`.
- Keine unbelegten Claims: `grep -niE 'ISO.?27001-zert|erfüllt die|EU/CH|BVG|Allianz|Lufthansa|ARD' de/*.html en/*.html` → leer (ausser freigegeben laut J). Sokosumi "13'000+ registrierte Nutzer" ist freigegeben (J3) und deshalb nicht mehr im Muster.
- hreflang gegenseitig: jede Seite verweist auf ein Gegenstück, das zurückverweist (kleines Script in WP11).
- `xmllint --noout sitemap.xml`.

### I.4 Browser (Chrome und Brave Desktop 1440 px, Chrome Mobile-Emulation 390 px)

- [ ] Beide Sprachen, alle Seiten: Header, Footer, Sprachumschalter führt auf das Gegenstück und setzt Cookie; danach `/` → gewählte Sprache.
- [ ] Startseite: Hero ohne Scrollen lesbar (H1, Subline, CTA) bei 390x844 und 1440x900; Leistungsindex-Links funktionieren; Demo-Links führen auf `#demo` der Produktseiten.
- [ ] Pixelgrid (Startseite, CoWorker-Seite): sieht aus wie heute, bleibt im Hero; nach Scrollen unter den Hero keine laufenden Frames im Performance-Panel; Tab-Wechsel pausiert.
- [ ] Hero-Swipe: Sweep und Ankunft wie heute, Ziel `/de/ki-coworker` bzw. `/en/ai-coworker`, verdeckt bei 390 px weder CTA noch Leistungsindex.
- [ ] anruf.guru-Video: vor Klick **kein** Video-Request im Network-Tab; Klick spielt mit Ton; Controls sichtbar; Poster scharf.
- [ ] Telefonassistent: Demo startet nur auf Klick, Mikrofonabfrage, "Demo beenden" stoppt.
- [ ] Doc Indexer: Demo komplett durchspielen, Rechtematrix mobil bedienbar.
- [ ] Kalender: schnell zum Footer scrollen, kein Sprung; Slots neben dem Monat ab Desktop-Breite.
- [ ] Rückruf-Formular: Erfolgsmeldung (Formspree-Testeintrag kennzeichnen).
- [ ] Consent: Banner erscheint (gaMeasurementId gesetzt), Datenschutzlink zeigt auf `/de/datenschutz` bzw. `/en/privacy`, Footer "Cookie-Einstellungen" öffnet erneut.
- [ ] Brave mit Shields an: Seite bricht nicht, wenn GA oder cal.com blockiert sind (Kalenderfläche zeigt Ladehinweis, Formular bleibt nutzbar).
- [ ] `prefers-reduced-motion` (DevTools Rendering): keine Bewegung (Pixelgrid statisch, Swipe ohne Sweep), alles sichtbar.
- [ ] Tastatur: Tab durch Header, Skip-Link, FAQ, Formulare; Fokus immer sichtbar.
- [ ] Konsole: keine Fehler und keine 404 auf allen Seiten.
- [ ] Kein horizontales Scrollen bei 390 px.

### I.5 Lighthouse (Mobile, Inkognito)

| Seite | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/de`, `/en` | ≥ 90 | ≥ 95 | ≥ 95 | 100 |
| Produktseiten | ≥ 85 | ≥ 95 | ≥ 95 | 100 |

CLS < 0.05 auf allen Seiten, LCP < 2.5 s (lokal, ohne Cloudflare).

Die Werte gelten **mit** Pixelgrid (Startseite, CoWorker-Seite). Das Grid ist die grösste Main-Thread-Last auf Mobile; Lighthouse misst TBT nur bis zur Ruhe, die Dauerlast zeigt das Performance-Panel. Wird ein Wert verfehlt, optimiert WP2b die Schleife (späterer Start, Pause, weniger Arbeit pro Frame), entfernt das Grid aber nicht und ändert sein Aussehen nicht. Messwerte mit und ohne Grid im Bericht von WP11.

### I.6 Nach Deploy (nicht lokal)

- `curl -sI https://utxo.ag/` → 302 mit Vary, nicht `cf-cache-status: HIT`.
- Google Search Console: Sitemap neu einreichen, Stichprobe "URL prüfen" für 3 alte URLs.

---

## J. Entscheidungen

Stand 2026-10-02. Phil hat J1 (neue H1), J3, J10, J13, J14 und J15 ausdrücklich entschieden. Allen übrigen Defaults hat er nicht widersprochen; sie gelten als "Entschieden: Default" und sind im Plan umgesetzt.

### J.1 Entschieden

| # | Frage | Entscheidung |
|---|---|---|
| J2 | Credit Masumi/Sokosumi. Deren Websites nennen "Serviceplan Group with NMKR", nicht utxo. | **Entschieden: Default.** "Entwickelt von utxo AG (NMKR), betrieben gemeinsam mit der Serviceplan Group", **nur wenn Serviceplan einverstanden ist**. Sonst: "Gemeinsam mit der Serviceplan Group entwickelt und betrieben" |
| J3 | Sokosumi "13'000+ registrierte Nutzer" zeigen? | **Entschieden: ja (Phil).** DE "13'000+ registrierte Nutzer", EN "13,000+ registered users", zusammen mit "über 10 KI-CoWorker, 40+ Agenten" (D.1, D.2). Aus dem Claims-grep in I.3 entfernt |
| J4 | Sokosumi ISO 27001: Sokosumi sagt selbst "Nein"; Whitepaper sagt "unter dem Zertifikat der Serviceplan Group, gültig bis 11/2026". | **Entschieden: Default.** Nicht erwähnen |
| J5 | "Seit 2021": AG gegründet 18.02.2022. | **Entschieden: Default.** "Als Team seit 2021, als AG seit 2022" |
| J6 | Hosting-Angabe im Footer "EU/CH" ist nicht belegt. Modellverarbeitung ist nicht immer EU (Azure Foundry). | **Entschieden: Default.** Footer "Hosting in Deutschland oder der EU". Auf der CoWorker-Seite der Fussnoten-Satz zur Modellverarbeitung aus D.3 |
| J7 | Lokale Open-Source-Modelle laufen laut ISMS nur in Testumgebungen. | **Entschieden: Default.** Auf der Startseite nicht erwähnen, auf der CoWorker-Seite "prüfen wir projektbezogen" |
| J8 | "Erfüllt die EU-KI-Verordnung" ist zu stark. | **Entschieden: Default.** "Ausgerichtet an den Anforderungen der EU-KI-Verordnung", Footer-Claim streichen |
| J9 | E-Mail: Impressum und Datenschutz sagen `business@utxoag.com`, sonst überall `business@utxo.ag`. | **Entschieden: Default.** Überall `business@utxo.ag` |
| J10 | Registerangaben im Impressum. | **Entschieden (Phil bestätigt):** HR-Nummer `CH-400.3.450.669-8`, UID/MWST `CHE-494.509.135 MWST`, Deutsche Betriebsnummer `76311831`. Anzeige laut WP8; das heutige Impressum zeigt alle drei korrekt inkl. "MWST" |
| J11 | Doc Indexer ist laut SPS-Fragebogen (Juli 2026) ein interner Prototyp ohne Kunden. | **Entschieden: Default.** Als Produkt zeigen, **ohne** Kunden- oder Einsatzbehauptung. Kein "Beta"-Label |
| J12 | Die Demo des individuellen Telefonassistenten läuft auf `demo.anruf-guru.de`. Das verwechselt man leicht mit anruf.guru, das gerade nicht spricht. | **Entschieden: Default.** Für den Launch so lassen, die Stage-Leiste nennt "Demo-Umgebung utxo AG". Später auf eine utxo-Subdomain umziehen. Aussage zu Aufzeichnungen nur nach Phils Bestätigung, sonst weglassen |
| J13 | Pixelgrid (Startseite und CoWorker-Seite) und Hero-Swipe entfernen? | **Entschieden: nein, beide bleiben (Phil).** Pixelgrid auf Startseite und CoWorker-Seite, Hero-Swipe auf der Startseite mit Ziel `/de/ki-coworker` / `/en/ai-coworker`. Ruhige Einbettung und Pause ausserhalb des Viewports nach C.6 |
| J14 | Header-Navigation "Leistungen · Produkte · Referenzen · Über uns" ersetzt "Produkte · Projekte · Team · Individuelle KI". | **Entschieden: ja (Phil).** "KI-CoWorker" ist über den Leistungsindex im Hero, den Hero-Swipe, den Footer und das Mobile-Menü direkt erreichbar |
| J15 | Clientseitiges Sprach-Script entfernen (nur noch `/` verhandelt, Cookie nur per Umschalter). | **Entschieden: ja (Phil)** |
| J16 | Whitepaper: Links zeigen auf Google Drive (Version unklar). Die PDFs sagen "rund 20" Mitarbeitende und "bauen". | **Entschieden: Default.** Drive-Links behalten, bis die v2-PDFs auf "rund 15" korrigiert sind. Danach selbst hosten unter `/resources/whitepapers/` |
| J17 | Masumi-Zahl "über 38'000 On-Chain-Transaktionen" (masumi.network/press) zeigen? | **Entschieden: Default.** Weglassen (ändert sich laufend und steht nicht unter unserer Kontrolle) |
| J18 | Sokosumi-Detail "7 von 12 CoWorkern stammen von utxo AG" (Stand 2026-10-02)? | **Entschieden: Default.** Weich formulieren: "mehrere davon von utxo AG" |
| J19 | Rechtsklauseln (E) juristisch prüfen lassen? | **Entschieden: Default.** Ja, vor Deploy. Die WPs setzen die Entwürfe ein, live gehen sie erst nach Phils Freigabe |
| J20 | Screenshot des anruf.guru-Dashboards (Ticket-Ansicht) mit Demo-Daten liefern? | **Entschieden: Default.** Optional. Ohne Screenshot reicht das Video |
| J21 | Zusage, falls das Tag-0-Kriterium nicht erreicht wird (kommerzielle Entscheidung). | **Entschieden: Default.** Nicht erwähnen (CoWorker-FAQ ohne diese Frage) |
| J22 | Cloudflare: Cache-Regel für `/` prüfen (darf nicht gecacht werden). | **Entschieden: Default.** Nach Deploy mit curl prüfen. Bei HIT eine Bypass-Regel für `/` |
| J23 | EN-Slug Telefonassistent: `/en/ai-phone-assistant` oder `/en/ai-call-assistant`? | **Entschieden: Default.** `ai-phone-assistant` (passt zum neuen Namen) |
| J24 | Fördermittel-Hinweis (Digitalbonus Bayern, Invest BW, go-digital, aus dem One-Pager) aufnehmen? | **Entschieden: Default.** Nicht aufnehmen, nicht verifiziert |
| J25 | Umsatz/Profitabilität (SPS: ca. CHF 2.2 Mio., profitabel, gebootstrapped) veröffentlichen? | **Entschieden: Default.** Nein |

### J.2 Offen

Keine. J1 ist entschieden: H1 DE `Ihre nächsten Mitarbeiter sind digital. Wir entwickeln sie.`, EN `Your next hires are digital. We develop them.`
