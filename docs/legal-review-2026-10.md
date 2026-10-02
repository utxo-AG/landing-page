# Rechtstexte utxo.ag: Änderungen und Prüfpunkte (Stand 2026-10-02)

Keine Rechtsberatung. Diese Liste bereitet die anwaltliche Prüfung vor. Betroffene Seiten: `/de/agb` · `/en/terms`, `/de/avv` · `/en/dpa`, `/de/datenschutz` · `/en/privacy`, `/de/nutzungsrichtlinie` · `/en/acceptable-use`.

## Grundannahmen (von utxo AG bestätigt)

- utxo AG entwickelt individuell: einmalige Entwicklung zum vorab vereinbarten Preis (in der Regel Festpreis) plus individuell bemessenes Abonnement (Hosting, Nutzung, Wartung, Weiterentwicklung, Support). Keine veröffentlichten Preise.
- Hosting wird pro Projekt festgelegt (Deutschland, EU oder on-premise).
- Der AVV wird pro Projekt individuell abgeschlossen (Stack, Subunternehmer, Hosting-Region, TOM). Die Seite `/de/avv` ist eine Vorlage.
- AGB, AVV, Datenschutzerklärung und Nutzungsrichtlinie gelten nicht für anruf.guru, Masumi und Sokosumi (eigene Bedingungen auf deren Websites).

## Bereits umgesetzte Änderungen

- **Geltungsbereich und Verweise**
  - AGB umbenannt in „Allgemeine Geschäftsbedingungen“ / „Terms and Conditions“. Der alte Name steht in Klammern, damit Verweise weiter gelten.
  - Neue Ausschlussklausel 1.4 für anruf.guru, Masumi und Sokosumi, mit Links zu deren Bedingungen.
  - Englische Begriffe im deutschen Text vereinheitlicht: KI-CoWorker, Nutzungsrichtlinie.
  - Verweis in 5.5 korrigiert: Die Löschung steht in AVV-Ziffer 13.
- **Preise und Leistungsumfang**
  - 1.2, 4.1 und 4.5: veröffentlichte Tarife entfernt. Umfang, Preis, Hosting und Systeme ergeben sich aus Angebot oder Einzelvertrag, und dieser hat Vorrang.
- **Hosting und Modelle**
  - 1.1, 3.2 und 10.2: Hosting und Modellanbieter werden im Einzelvertrag bzw. im AVV des Projekts festgelegt.
- **Auftragsverarbeitung**
  - 4.2 und 10.1: Der AVV wird individuell abgeschlossen und nicht automatisch akzeptiert.
  - AVV als Vorlage gekennzeichnet. Inkrafttreten mit Abschluss, keine automatische Annahme. Subunternehmer und TOM werden im individuellen AVV festgelegt.
- **Sonstiges**
  - Datenschutz 4.8: Hinweis zum Video auf der Startseite.
  - Gedankenstriche ersetzt, Schreibweise „utxo AG“ vereinheitlicht.

## Prüfpunkte für die anwaltliche Prüfung

**Datenschutz und Auftragsverarbeitung**
1. **Subunternehmerliste (AVV Anhang 2):** Sie nennt OpenAI, Anthropic, Railway und DigitalOcean (USA) sowie Stripe und Google Analytics. Laut interner Unterlagen werden auch Azure und AWS (EU, Frankfurt) und Mistral eingesetzt. Google Analytics und Stripe sind eigene Verarbeitung als Verantwortlicher, keine Auftragsverarbeitung. Railway hostet vermutlich nur die Website.
2. **US-Übermittlungen** (OpenAI, Anthropic): Reichen SCC, DPF-Zertifizierung, TIA und die Vorgaben des EDÖB? Zero Data Retention gibt es nur auf Anfrage.
3. **Form des AVV-Abschlusses** nach Art. 28 Abs. 9 DSGVO. Die Annahme der Datenschutzerklärung als Vertragsbestandteil (4.2, 15.3) ist ungewöhnlich.
4. **48-h-Meldefrist** im AVV (5.1) gegenüber 72 h im internen ISMS angleichen.

**KI-Verordnung**

5. **3.3: pauschal „begrenztes Risiko“.** Bei individueller Entwicklung sind Hochrisiko-Fälle möglich, etwa HR oder Kredit. Eine projektbezogene Einstufung wäre sicherer.

**Vertrag und AGB-Recht**

6. **7.1 Rechte:** Alles verbleibt bei utxo AG, obwohl der Kunde die Entwicklung per Festpreis bezahlt. Nutzungsrechte, Exit und Escrow sind nicht geregelt.
7. **Haftung (8.1, 8.2):**
   - Der Haftungsdeckel beträgt 12 Monatsgebühren, die Entwicklungsgebühr zählt möglicherweise nicht mit.
   - Der Ausschluss von „Datenverlust“ ist gegenüber deutschen Kunden möglicherweise unwirksam (§ 307 BGB).
   - Die Formulierung „Strafschadensersatz“ stammt aus US-Vorlagen.
8. **Recht und Gerichtsstand:** Schweizer Recht und Gerichtsstand Zug gegenüber DE/EU-Kunden. AGB-Kontrolle nach §§ 305 ff. BGB.
9. **Nur B2B:** Es gibt keinen Mechanismus, um den Unternehmerstatus zu prüfen.
10. **Kündigung (5.1, 5.4):** Monatliche Kündigung beidseitig und keine Rückerstattung passen schlecht zu Festpreis-Entwicklung plus Abo. Mindestlaufzeiten?
11. **SLA und Support (3.1, 11):** „Best effort“, kein SLA, E-Mail nur zu Geschäftszeiten. Auf der Website steht „Support“ als Teil des Abos. Abgleichen.
12. **6.3 gegenüber 15.3:** Einseitige Änderung durch fortgesetzte Nutzung widerspricht dem Schriftformerfordernis.
13. **Rangfolge:** Einzelvertrag (1.2) und AVV (1.3) haben jeweils Vorrang. Eine explizite Rangfolge wäre klarer.
14. **„Agentic Service“** als englischer Definitionsbegriff im deutschen Text. Lieber „KI-Dienstleistung“?
15. **4.3 und 2.3:** Stimmen Stripe und die Aktivierung per Abo-Link noch mit dem tatsächlichen Ablauf überein?
16. **„Werkzeuge“ in AGB 1.1** wurde bereits zu „Tools“ geändert. Bitte bestätigen, dass das rechtlich unkritisch ist.
