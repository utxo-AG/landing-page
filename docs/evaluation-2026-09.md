# Bewertung Redesign utxo.ag (Fable, 2026-09-14)

Grundlage: `docs/research-ai-websites-2026-09.md` (23 live ausgewertete Websites) sowie Screenshots aller Seiten auf Desktop (1440 px) und Mobil (390 px) mit durchgespielten Demos.

## Kurzurteil

Design, Typografie und die Doc-Indexer-Demo sind auf Top-Niveau. Die Demo ist ein Verkaufsargument, das keine der 23 Sites hat. Die Startseite verkauft es aber nicht:
- **Hero:** Er nennt weder Zielgruppe noch Ergebnis noch das 30-Tage-Festpreis-Versprechen.
- **Demos:** Sie liegen erst bei rund 65 % Scrolltiefe, hinter Über uns, Team und Projekten mit Blockchain-Vokabular.
- **Fehlende Belege:** Es gibt keine Zahlen, Zitate, FAQ oder Preisanker.
- **Hosting:** Die Aussage steht nur im Footer.
- **Begriffe:** Die Bezeichnungen für das Angebot sind uneinheitlich.

## Priorisierte Empfehlungen

| # | Empfehlung | Aufwand | Input von utxo |
|---|---|---|---|
| 1 | Hero: Ergebnis, Zielgruppe, 30 Tage Festpreis, CTA-Paar Erstgespräch + Live-Demo, Trust-Zeile | S | nein |
| 2 | Belege: Ergebnis-Band mit Zahlen, namentliche Zitate RST und Serviceplan, Masumi aus Kundenlogos | M | ja: Kennzahlen, Zitate, Logo-Freigaben |
| 3 | Demos direkt nach Hero | S | nein |
| 4 | Angebot als 3 Kacheln (Anrufassistent · Doc Indexer · Individueller CoWorker), ein Begriff überall | S/M | nein |
| 5 | Trust-Block Hosting/Training/DSGVO/AV-Vertrag auf Home, OpenAI-Hinweis der Call-Demo präzisieren | S | teilweise: Hosting-Standort, Modellregion |
| 6 | Preisanker (ab-Preise, Spannen, Festpreis) | S | ja: Preise |
| 7 | FAQ auf Home, Agents, Call Assistant (mit FAQPage JSON-LD) | M | teilweise |
| 8 | Zusage beim Erfolgskriterium (was passiert, wenn nicht erreicht) | S | ja: kommerzielle Entscheidung |
| 9 | ai-in-business: Rotation "Coding", Karte "Hepha · Claude Code", "8 CoWorker" ersetzen, Doppel-CTA zusammenlegen | S | nein |
| 10 | Über uns und Projekte ohne Blockchain-/NFT-Vokabular, Projekte als kompakte Referenzreihe | S | minimal |
| 11 | Team unter die Produkte, 4 bis 6 kundennahe Personen, Rest hinter "Alle anzeigen" | S | minimal |
| 12 | Call-Assistant-Seite ausbauen: Zielgruppen, Ticket-Beispiel, Integrationen, Preis, FAQ, Testnummer | M | ja |
| 13 | Agents: Link-Bug, Sekundär-CTA, Gedankenstriche, Whitepaper selbst hosten, Referenzband | S | PDFs |
| 14 | Kontakt: Telefon, Datenschutzzeile, Antwortzusage vorab, mobil Formular zuerst, Skeleton für cal.com | S | Telefonnummer |
| 15 | Navigation: Angebot · Ablauf & Preise · Sicherheit · Referenzen · Über uns, CTA "Erstgespräch buchen" | S | nein |

## Vorgeschlagene Struktur Startseite

1. Header (neue Navigation, CTA "Erstgespräch buchen")
2. Hero (Ergebnis, Zielgruppe, CTA-Paar, Trust-Zeile)
3. Referenz- und Presseleiste
4. Angebot (3 Kacheln)
5. Live-Demos
6. Ergebnisse & Stimmen (Input nötig)
7. So arbeiten wir (30 Tage, Erfolgskriterium mit Zusage)
8. Preise
9. Sicherheit & Datenhoheit
10. Wo CoWorker helfen (6 Anwendungsfälle)
11. Über uns kompakt (Zug, Fakten, 4 bis 6 Gesichter)
12. FAQ
13. Kontakt
14. Footer (Angebot · Unternehmen · Ratgeber · Rechtliches)

## Mobile-Befunde

- H2 fest 48 px wirken grösser als die H1, sollten auf ca. 34 bis 36 px begrenzt werden
- Pixelgrid liegt mobil hinter dem Hero-Text
- Doc-Indexer-Rechtematrix: mobil nur eine Rollenspalte sichtbar
- Projekt-Karussell 560 px hoch mit schmaler Textspalte
- cal.com-Block 400 px weiss vor dem Formular
- Seitenlängen: Home 10'585 px, Agents 12'021 px

## Behalten

Designsystem, Doc-Indexer-Demo, Call-Demo-Fassade, 30-Tage-Roadmap, Sicherheits-Sektion mit ehrlicher ISO-Formulierung, Vergleichstabelle, Presseseite, Sie-Form, vollständige Rechtsseiten, Sprachlogik und SEO-Technik, Consent Mode.
