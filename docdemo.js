window.UTXO_DOCDEMO = {
 "ui": {
  "de": {
   "bar": "Interaktive Demo · Beispiel Immobilien · Beispieldaten",
   "restart": "Neu starten",
   "building": "Hardturmstrasse 128, Zürich",
   "steps": [
    "Dokumente hochladen",
    "Rolle wählen",
    "Das Gebäude fragen"
   ],
   "upload": {
    "title": "Laden Sie die Gebäudeakte einmal hoch.",
    "text": "Die KI ordnet jedes Dokument ein und schlägt vor, welche Rolle es sehen darf. Sie können jede Freigabe ändern.",
    "button": "5 Dokumente hochladen",
    "analyzing": "KI analysiert",
    "queued": "In der Warteschlange",
    "suggest": "KI-Vorschlag",
    "table": "Freigaben pro Dokument",
    "hint": "Klicken Sie auf einen Haken, um eine Freigabe zu ändern.",
    "done": "Freigaben übernehmen",
    "changed": "geändert"
   },
   "role": {
    "title": "Wer fragt?",
    "text": "Wählen Sie eine Rolle. Die Antworten stützen sich nur auf die Dokumente, die dieser Rolle freigegeben sind.",
    "sees": "sieht {n} von {t} Dokumenten"
   },
   "folder": "Gebäudeakte",
   "locked": "nicht freigegeben",
   "chat": {
    "as": "Sie fragen als",
    "change": "Rolle wechseln",
    "hello": "Wie kann ich Ihnen helfen?",
    "placeholder": "Was möchten Sie wissen?",
    "suggest": "Vorgeschlagene Fragen",
    "more": "Weitere Fragen",
    "hide": "Ausblenden",
    "send": "Senden",
    "free": "In dieser Demo sind die vorgeschlagenen Fragen hinterlegt. Wählen Sie eine der Fragen über dem Eingabefeld, dann sehen Sie die Antwort mit Belegen.",
    "gap": "Keine Angabe gefunden zu:",
    "hidden": "{n} Dokumente mit passenden Inhalten sind für Ihre Rolle nicht freigegeben und wurden nicht verwendet.",
    "hiddenOne": "1 Dokument mit passenden Inhalten ist für Ihre Rolle nicht freigegeben und wurde nicht verwendet.",
    "denial": "Dazu liegt für Ihre Rolle nichts vor. Die Unterlagen zu dieser Frage sind für Ihre Rolle nicht freigegeben.",
    "available": "Für Ihre Rolle freigegeben:"
   },
   "viewer": {
    "back": "Zurück zur Antwort",
    "page": "Seite",
    "of": "von",
    "stored": "{n} von {t} Seiten in der Demo hinterlegt",
    "cited": "Zitierte Stelle",
    "original": "Originaldokument"
   }
  },
  "en": {
   "bar": "Interactive demo · property example · sample data",
   "restart": "Start over",
   "building": "Hardturmstrasse 128, Zurich",
   "steps": [
    "Upload documents",
    "Choose a role",
    "Ask the building"
   ],
   "upload": {
    "title": "Upload the building file once.",
    "text": "The AI classifies every document and suggests which role may see it. You can change every permission.",
    "button": "Upload 5 documents",
    "analyzing": "AI is analysing",
    "queued": "Queued",
    "suggest": "AI suggestion",
    "table": "Permissions per document",
    "hint": "Click a checkmark to change a permission.",
    "done": "Apply permissions",
    "changed": "changed"
   },
   "role": {
    "title": "Who is asking?",
    "text": "Pick a role. Answers only draw on the documents shared with that role.",
    "sees": "sees {n} of {t} documents"
   },
   "folder": "Building file",
   "locked": "not shared",
   "chat": {
    "as": "You are asking as",
    "change": "Switch role",
    "hello": "How can I help you?",
    "placeholder": "What would you like to know?",
    "suggest": "Suggested questions",
    "more": "More questions",
    "hide": "Hide",
    "send": "Send",
    "free": "This demo contains the suggested questions. Pick one of the questions above the input field to see the answer with sources.",
    "gap": "Nothing found on:",
    "hidden": "{n} documents with relevant content are not shared with your role and were not used.",
    "hiddenOne": "1 document with relevant content is not shared with your role and was not used.",
    "denial": "There is nothing on this for your role. The documents on this question are not shared with your role.",
    "available": "Shared with your role:"
   },
   "viewer": {
    "back": "Back to the answer",
    "page": "Page",
    "of": "of",
    "stored": "{n} of {t} pages included in the demo",
    "cited": "Cited passage",
    "original": "Original document in German"
   }
  }
 },
 "roles": [
  {
   "id": "asset",
   "person": "A. Roth",
   "initials": "AR",
   "dot": "navy",
   "label": {
    "de": "Asset Manager",
    "en": "Asset manager"
   },
   "scope": {
    "de": "Alle Kategorien",
    "en": "All categories"
   }
  },
  {
   "id": "bewirt",
   "person": "T. Meier",
   "initials": "TM",
   "dot": "clay",
   "label": {
    "de": "Immobilienverwalter",
    "en": "Property manager"
   },
   "scope": {
    "de": "Verwaltung, Finanzen, Verträge, Technik",
    "en": "Administration, finance, contracts, technical"
   }
  },
  {
   "id": "technik",
   "person": "S. Brunner",
   "initials": "SB",
   "dot": "moss",
   "label": {
    "de": "Gebäudetechniker",
    "en": "Building technician"
   },
   "scope": {
    "de": "Technik und Brandschutz",
    "en": "Technical and fire safety"
   }
  },
  {
   "id": "mieter",
   "person": "M. Keller",
   "initials": "MK",
   "dot": "plum",
   "label": {
    "de": "Mieter",
    "en": "Tenant"
   },
   "scope": {
    "de": "Eigener Mietvertrag und Abrechnung",
    "en": "Own lease and statement"
   }
  }
 ],
 "docs": [
  {
   "id": "MV",
   "file": "Mietvertrag_4021-05_2018.pdf",
   "title": {
    "de": "Mietvertrag 4021.05",
    "en": "Lease 4021.05"
   },
   "total": 134,
   "ai": {
    "de": "Rechtliches Dokument · Mietverhältnis 4021.05 erkannt",
    "en": "Legal document · lease 4021.05 detected"
   },
   "roles": [
    "asset",
    "bewirt",
    "mieter"
   ],
   "pages": [
    {
     "p": 47,
     "head": "Mietvertrag über Geschäftsräumlichkeiten · Mietverhältnis 4021.05",
     "status": {
      "ok": true,
      "text": "Fassung: Originalvertrag 14.06.2018 · durch Nachtrag 1 bis 4 nicht geändert"
     },
     "html": "<div class=\"num\">4.3 Optionsrecht</div>\n<p>Der Mieterin wird das Recht eingeräumt, das Mietverhältnis nach Ablauf der festen Vertragsdauer zweimal um je fünf (5) Jahre zu verlängern, längstens bis zum 30. September 2038.</p>\n<p><mark>Die Ausübung der Option hat schriftlich mittels eingeschriebenen Briefes zu erfolgen und muss spätestens zwölf (12) Monate vor Ablauf der jeweiligen Vertragsdauer bei der Vermieterin eingetroffen sein. Massgebend ist der Eingang bei der Vermieterin, nicht das Datum der Postaufgabe.</mark></p>\n<p>Wird die Option nicht fristgerecht ausgeübt, endet das Mietverhältnis ohne weitere Kündigung auf den 30. September 2028.</p>\n<div class=\"num\" style=\"margin-top:30px\">4.4 Wirkung der Optionsausübung</div>\n<p>Mit der Ausübung der Option gelten sämtliche Bestimmungen dieses Vertrages unverändert weiter, soweit sie nicht durch Nachtrag ausdrücklich abgeändert worden sind. Der Mietzins wird auf den Beginn der Verlängerungsperiode nach Ziff. 5.2 indexiert fortgeschrieben.</p>\n<div class=\"note\">Anhang 4 (Flächenaufstellung) und Anhang 7 (Ausbaustandard) bleiben integrierender Bestandteil dieses Vertrages.</div>"
    },
    {
     "p": 51,
     "head": "Mietvertrag über Geschäftsräumlichkeiten · Mietverhältnis 4021.05",
     "status": {
      "ok": true,
      "text": "Fassung: Originalvertrag 14.06.2018 · durch Nachtrag 1 bis 4 nicht geändert"
     },
     "html": "<div class=\"num\">5.2 Indexierung des Mietzinses</div>\n<p>Der Nettomietzins ist an den Landesindex der Konsumentenpreise (LIK) des Bundesamtes für Statistik gebunden. Die Voraussetzungen von Art. 269b OR sind erfüllt, da der Vertrag für eine feste Dauer von mehr als fünf Jahren abgeschlossen ist.</p>\n<p><mark>Der Nettomietzins wird jährlich per 1. Oktober zu 100 % der Veränderung des Landesindexes der Konsumentenpreise angepasst. Als Vertragsbasis gilt der Indexstand des Monats September 2018. Massgebend ist jeweils der Indexstand des Monats September, der der Anpassung vorangeht.</mark></p>\n<p>Die Anpassung erfolgt mit amtlich genehmigtem Formular unter Einhaltung einer Ankündigungsfrist von 30 Tagen auf Ende eines Monats. Wechselt das Bundesamt für Statistik die Indexbasis, so erfolgt die Umrechnung nach der amtlichen Verkettungsregel.</p>\n<div class=\"num\" style=\"margin-top:30px\">5.3 Mietzins</div>\n<table>\n<tr><th>Nettomietzins pro Jahr</th><td>CHF 496’000.00</td></tr>\n<tr><th>Nettomietzins pro m² und Jahr</th><td>CHF 400.00</td></tr>\n<tr><th>Akonto Heiz- und Nebenkosten</th><td>CHF 78’000.00 pro Jahr</td></tr>\n<tr><th>Fälligkeit</th><td>quartalsweise im Voraus, jeweils per 1. Januar, 1. April, 1. Juli, 1. Oktober</td></tr>\n</table>\n<div class=\"note\">Stand nach Mietzinsanzeige vom 28.08.2023, wirksam ab 01.10.2023.</div>"
    },
    {
     "p": 58,
     "head": "Mietvertrag über Geschäftsräumlichkeiten · Mietverhältnis 4021.05",
     "status": {
      "ok": true,
      "text": "Fassung: Originalvertrag 14.06.2018 · durch Nachtrag 1 bis 4 nicht geändert"
     },
     "html": "<div class=\"num\">6.1 Heiz- und Nebenkosten</div>\n<p><mark>Die Heiz- und Nebenkosten werden zu 60 % nach dem Anteil der Nettomietfläche und zu 40 % nach gemessenem Verbrauch auf die Mietverhältnisse verteilt. Bei Wärme und Kälte tritt die Verbrauchsmessung an die Stelle beider Kriterien, diese Positionen werden vollständig nach gemessenem Verbrauch abgerechnet.</mark></p>\n<p>Die Abrechnungsperiode entspricht dem Kalenderjahr. Die Abrechnung wird der Mieterin bis spätestens 30. Juni des Folgejahres zugestellt. Die Mieterin kann innert 30 Tagen seit Zustellung Einsicht in die Belege verlangen.</p>\n<div class=\"num\" style=\"margin-top:30px\">6.2 Umfang der Nebenkosten</div>\n<p>Als Nebenkosten gelten ausschliesslich die tatsächlichen Aufwendungen für Wärme, Kälte, Wasser, Abwasser, Strom Allgemein, Reinigung, Hauswartung, Entsorgung, Lift, Sicherheitsdienst sowie die Betriebskosten der raumlufttechnischen Anlagen.</p>\n<p>Aufwendungen für Instandsetzung, Erneuerung und Ersatz von Bauteilen und Anlagen sind nicht Nebenkosten und dürfen nicht in die Abrechnung aufgenommen werden.</p>\n<div class=\"note\">Zur Zuständigkeit für den Unterhalt der raumlufttechnischen Anlagen siehe Ziff. 7.4 sowie Nachtrag Nr. 3 vom 22.08.2022.</div>"
    },
    {
     "p": 88,
     "head": "Mietvertrag über Geschäftsräumlichkeiten · Mietverhältnis 4021.05",
     "status": {
      "ok": false,
      "text": "Aufgehoben durch Nachtrag Nr. 3 vom 22.08.2022 · nicht mehr anwendbar"
     },
     "html": "<div class=\"num struck\">7.4 Unterhalt der raumlufttechnischen Anlagen</div>\n<p class=\"struck\">Der Unterhalt sämtlicher raumlufttechnischer Anlagen innerhalb der Mietfläche einschliesslich der Kälteerzeugung für die Serverräume obliegt vollumfänglich der Mieterin. Sie hat auf eigene Kosten einen Wartungsvertrag mit einer Fachfirma abzuschliessen und der Vermieterin jährlich das Serviceprotokoll vorzulegen.</p>\n<p class=\"struck\">Ersatzinvestitionen an diesen Anlagen gehen zulasten der Mieterin, soweit sie nicht auf einen Mangel der Mietsache zurückzuführen sind.</p>\n<div class=\"num\" style=\"margin-top:30px\">7.5 Unterhalt der übrigen Einrichtungen</div>\n<p>Der kleine Unterhalt im Sinne von Art. 259 OR obliegt der Mieterin. Alle übrigen Unterhaltsarbeiten an Gebäudehülle, Tragwerk und zentraler Gebäudetechnik gehen zulasten der Vermieterin.</p>"
    }
   ]
  },
  {
   "id": "N3",
   "file": "Nachtrag_03_4021-05_2022.pdf",
   "title": {
    "de": "Nachtrag Nr. 3",
    "en": "Addendum No. 3"
   },
   "total": 2,
   "ai": {
    "de": "Nachtrag zu Mietverhältnis 4021.05",
    "en": "Addendum to lease 4021.05"
   },
   "roles": [
    "asset",
    "bewirt",
    "mieter"
   ],
   "pages": [
    {
     "p": 1,
     "head": "Nachtrag Nr. 3 zum Mietvertrag vom 14.06.2018",
     "status": {
      "ok": true,
      "text": "Fassung: gültig seit 22.08.2022 · hebt Ziff. 7.4 des Mietvertrags auf"
     },
     "html": "<h1>Nachtrag Nr. 3 zum Mietvertrag vom 14.06.2018</h1>\n<p class=\"lead\">Mietverhältnis 4021.05, 5. Obergeschoss · Hardturmstrasse 128, 8005 Zürich · abgeschlossen am 22. August 2022</p>\n<table>\n<tr><th>Mietverhältnis</th><td>4021.05</td></tr>\n<tr><th>Mietobjekt</th><td>5. Obergeschoss, 1’240 m² Nettomietfläche</td></tr>\n<tr><th>Grundvertrag</th><td>Mietvertrag über Geschäftsräumlichkeiten vom 14.06.2018</td></tr>\n<tr><th>Bisherige Nachträge</th><td>Nr. 1 vom 03.02.2020, Nr. 2 vom 17.11.2021</td></tr>\n</table>\n<div class=\"num\" style=\"margin-top:26px\">1. Gegenstand dieses Nachtrags</div>\n<p>Dieser Nachtrag regelt den Unterhalt der raumlufttechnischen Anlagen neu. Er hebt Ziff. 7.4 des Mietvertrags vom 14.06.2018 auf und ersetzt sie durch die Regelung in Ziff. 2 dieses Nachtrags.</p>\n<p>Alle übrigen Bestimmungen des Mietvertrags vom 14.06.2018 sowie der Nachträge Nr. 1 und Nr. 2 bleiben unverändert in Kraft. Insbesondere bleiben die Vertragsdauer nach Ziff. 4.1, das Optionsrecht nach Ziff. 4.3 und die Indexierung nach Ziff. 5.2 unberührt.</p>\n<div class=\"note\">Anlass: Umbau der Serverräume im 5. OG im Frühjahr 2022 und die dabei installierte separate Kälteerzeugung KM-5OG-01.</div>"
    },
    {
     "p": 2,
     "head": "Nachtrag Nr. 3 zum Mietvertrag vom 14.06.2018",
     "status": {
      "ok": true,
      "text": "Fassung: gültig seit 22.08.2022 · hebt Ziff. 7.4 des Mietvertrags auf"
     },
     "html": "<div class=\"num\">2. Unterhalt der raumlufttechnischen Anlagen</div>\n<p><mark>Ziff. 7.4 des Mietvertrags wird aufgehoben und durch die folgende Regelung ersetzt. Filterwechsel und periodische Wartung der VVS-Boxen innerhalb der Mietfläche verbleiben bei der Mieterin. Der Unterhalt und Ersatz der Kälteerzeugung für die Serverräume geht zulasten der Vermieterin.</mark></p>\n<p>Die Vermieterin schliesst für die Kälteerzeugung KM-5OG-01 einen eigenen Wartungsvertrag ab. Die Betriebskosten dieser Anlage bleiben nach Ziff. 6.2 des Mietvertrags Nebenkosten. Aufwendungen für Instandsetzung, Erneuerung und Ersatz sind keine Nebenkosten.</p>\n<div class=\"num\" style=\"margin-top:30px\">3. Inkrafttreten</div>\n<p>Dieser Nachtrag tritt am 1. September 2022 in Kraft. Er ist in zwei gleichlautenden Ausfertigungen erstellt, je eine für jede Partei.</p>\n<table style=\"margin-top:26px\">\n<tr><th>Vermieterin</th><td>Zürich, 22.08.2022</td></tr>\n<tr><th>Mieterin</th><td>Zürich, 22.08.2022</td></tr>\n</table>"
    }
   ]
  },
  {
   "id": "HNK",
   "file": "HNK_Abrechnung_2025_4021-05.pdf",
   "title": {
    "de": "HNK-Abrechnung 2025",
    "en": "Service charge statement 2025"
   },
   "total": 6,
   "ai": {
    "de": "Abrechnung · Mietverhältnis 4021.05",
    "en": "Statement · lease 4021.05"
   },
   "roles": [
    "asset",
    "bewirt",
    "mieter"
   ],
   "pages": [
    {
     "p": 1,
     "head": "Heiz- und Nebenkostenabrechnung 2025 · Mietverhältnis 4021.05",
     "status": {
      "ok": true,
      "text": "Fassung: zugestellt 12.08.2026 · Belegeinsicht bis 11.09.2026"
     },
     "html": "<h1>Heiz- und Nebenkostenabrechnung 2025</h1>\n<p class=\"lead\">Hardturmstrasse 128, 8005 Zürich · Mietverhältnis 4021.05 · 5. OG, 1’240 m²</p>\n<table>\n<tr><th>Abrechnungsperiode</th><td>01.01.2025 bis 31.12.2025</td></tr>\n<tr><th>Verteilschlüssel</th><td>60 % Nettomietfläche, 40 % gemessener Verbrauch · Wärme und Kälte vollständig nach Verbrauch (Ziff. 6.1)</td></tr>\n<tr><th>Flächenanteil</th><td>1’240 m² von 7’450 m² = 16.64 %</td></tr>\n<tr><th>Zustellung</th><td>12.08.2026 · Belegeinsicht bis 11.09.2026</td></tr>\n</table>\n<div class=\"result\">\n<div class=\"k\">Ergebnis der Abrechnung</div>\n<div class=\"v\">Nachzahlung CHF 6’320.00</div>\n<div class=\"n\">Ihr Anteil 2025: CHF 84’320.00 · Akontozahlungen: CHF 78’000.00</div>\n</div>\n<table class=\"grid\">\n<tr><th>Vergleich</th><th>2024</th><th>2025</th><th>Differenz</th></tr>\n<tr><td>Liegenschaftskosten total</td><td>CHF 429’400.00</td><td>CHF 506’700.00</td><td>+ 18.0 %</td></tr>\n<tr class=\"hl\"><td>Ihr Anteil daran</td><td>CHF 71’450.00</td><td>CHF 84’320.00</td><td>16.64 %</td></tr>\n<tr><td>Akonto</td><td>CHF 72’000.00</td><td>CHF 78’000.00</td><td>+ 8.3 %</td></tr>\n<tr><td>Saldo</td><td>Rückzahlung 550.00</td><td>Nachzahlung 6’320.00</td><td>·</td></tr>\n</table>\n<div class=\"note\">Belegeinsicht innert 30 Tagen seit Zustellung, Ziff. 6.1 des Mietvertrags. Zugestellt am 12.08.2026, damit endet die Frist am 11.09.2026.</div>"
    },
    {
     "p": 2,
     "head": "Heiz- und Nebenkostenabrechnung 2025 · Mietverhältnis 4021.05",
     "status": {
      "ok": true,
      "text": "Fassung: erstellt 14.05.2026 · Abrechnungsperiode 01.01. bis 31.12.2025"
     },
     "html": "<div class=\"num\">2. Aufteilung nach Positionen</div>\n<table class=\"grid\">\n<tr><th>Position</th><th>Liegenschaft 2024</th><th>Liegenschaft 2025</th><th>Differenz</th><th>Ihr Anteil 2025</th></tr>\n<tr><td>Fernwärme</td><td>CHF 78’400</td><td>CHF 100’200</td><td>+ 27.8 %</td><td>CHF 16’670</td></tr>\n<tr class=\"hl\"><td>Lüftung und Klima</td><td>CHF 46’200</td><td>CHF 92’700</td><td>+ 100.6 %</td><td>CHF 15’430</td></tr>\n<tr><td>Wasser und Abwasser</td><td>CHF 28’600</td><td>CHF 29’800</td><td>+ 4.2 %</td><td>CHF 4’960</td></tr>\n<tr><td>Reinigung und Hauswartung</td><td>CHF 147’100</td><td>CHF 151’400</td><td>+ 2.9 %</td><td>CHF 25’190</td></tr>\n<tr><td>Strom Allgemein, Lift, Entsorgung</td><td>CHF 84’000</td><td>CHF 86’000</td><td>+ 2.4 %</td><td>CHF 14’310</td></tr>\n<tr><td>Sicherheitsdienst</td><td>CHF 45’100</td><td>CHF 46’600</td><td>+ 3.3 %</td><td>CHF 7’760</td></tr>\n<tr><td><b>Total</b></td><td><b>CHF 429’400</b></td><td><b>CHF 506’700</b></td><td><b>+ 18.0 %</b></td><td><b>CHF 84’320</b></td></tr>\n</table>\n<div class=\"num\" style=\"margin-top:26px\">3. Erläuterung zur Position Lüftung und Klima</div>\n<p><mark>In der Position Lüftung und Klima ist eine einmalige Instandsetzung der Kälteerzeugung KM-5OG-01 vom 04.07.2025 im Betrag von CHF 47’480 enthalten, umgelegt nach Flächenanteil. Auf das Mietverhältnis 4021.05 entfallen davon CHF 7’900.</mark></p>\n<p>Die laufenden Betriebskosten der Lüftung sind gegenüber 2024 um CHF 980 gesunken. Die gesamte Zunahme dieser Position stammt aus der einmaligen Instandsetzung.</p>"
    }
   ]
  },
  {
   "id": "SPL",
   "file": "Serviceprotokoll_Lueftung_2026.pdf",
   "title": {
    "de": "Serviceprotokoll Lüftung 2026",
    "en": "Ventilation service report 2026"
   },
   "total": 8,
   "ai": {
    "de": "Technisches Dokument · Anlage HLK-5OG-02",
    "en": "Technical document · system HLK-5OG-02"
   },
   "roles": [
    "asset",
    "bewirt",
    "technik"
   ],
   "pages": [
    {
     "p": 1,
     "head": "Serviceprotokoll Lüftung 5. OG · Anlage HLK-5OG-02",
     "status": {
      "ok": true,
      "text": "Fassung: unterzeichnet 12.08.2026 · nächste Jahreswartung bis 12.08.2027"
     },
     "html": "<h1>Serviceprotokoll Lüftung</h1>\n<p class=\"lead\">Anlage HLK-5OG-02 · Monoblock Zu- und Abluft · Hardturmstrasse 128, 5. OG</p>\n<table>\n<tr><th>Anlage</th><td>HLK-5OG-02, Baujahr 2012, 12’000 m³/h</td></tr>\n<tr><th>Ausführung</th><td>Fanger Klima AG, Jahreswartung</td></tr>\n<tr><th>Datum</th><td>12.08.2026</td></tr>\n<tr><th>Nächste Jahreswartung</th><td>bis 12.08.2027</td></tr>\n</table>\n<div class=\"num\" style=\"margin-top:26px\">1 Ausgeführte Arbeiten</div>\n<table class=\"grid\">\n<tr><th>Position</th><th>Sollwert</th><th>Befund</th><th>Massnahme</th></tr>\n<tr class=\"hl\"><td>Filter Zuluft F7</td><td>max. 250 Pa</td><td>310 Pa</td><td>ersetzt</td></tr>\n<tr><td>Filter Abluft M5</td><td>max. 180 Pa</td><td>165 Pa</td><td>ersetzt</td></tr>\n<tr><td>Riementrieb Zuluft</td><td>Spannung nach Herstellerangabe</td><td>i.O.</td><td>nachgespannt</td></tr>\n<tr><td>Kondensatablauf</td><td>frei</td><td>Ablagerungen</td><td>gespült</td></tr>\n<tr><td>Wärmerückgewinnung</td><td>min. 72 % Rückwärmzahl</td><td>74 %</td><td>·</td></tr>\n</table>"
    },
    {
     "p": 2,
     "head": "Serviceprotokoll Lüftung 5. OG · Anlage HLK-5OG-02",
     "status": {
      "ok": true,
      "text": "Fassung: unterzeichnet 12.08.2026 · zwei Punkte offen"
     },
     "html": "<div class=\"num\">2 Offene Punkte</div>\n<table class=\"grid\">\n<tr><th>Nr.</th><th>Befund</th><th>Empfehlung</th><th>Wiedervorlage</th></tr>\n<tr class=\"hl\"><td>1</td><td>Frequenzumformer Zuluftventilator meldet sporadisch Störung F3, Ursache nicht gefunden</td><td>Messschrieb über vier Wochen, dann Entscheid Ersatz</td><td>15.10.2026</td></tr>\n<tr class=\"hl\"><td>2</td><td>Kälteerzeugung KM-5OG-01, Verdichter 2 mit erhöhtem Verdichtungsverhältnis</td><td>Ersatz bis Ende 2027 einplanen, Kostenschätzung CHF 62’000</td><td>31.03.2027</td></tr>\n</table>\n<div class=\"num\" style=\"margin-top:26px\">3 Bemerkungen</div>\n<p>Die Brandschutzklappen BSK-5OG-01 bis 18 waren nicht Teil dieses Auftrags. Letzte Funktionskontrolle am 09.11.2024, die nächste ist nach Brandschutzordnung bis 09.11.2026 fällig.</p>\n<div class=\"note\">Kostentragung für Instandsetzungen an KM-5OG-01 ist im Serviceprotokoll nicht geregelt. Siehe Vertragsunterlagen der Bewirtschaftung.</div>"
    }
   ]
  },
  {
   "id": "BSO",
   "file": "Brandschutzordnung_Hardturm128.pdf",
   "title": {
    "de": "Brandschutzordnung",
    "en": "Fire safety regulations"
   },
   "total": 12,
   "ai": {
    "de": "Verwaltungsdokument · Brandschutz",
    "en": "Administrative document · fire safety"
   },
   "roles": [
    "asset",
    "bewirt",
    "technik"
   ],
   "pages": [
    {
     "p": 1,
     "head": "Brandschutzordnung · Hardturmstrasse 128, 8005 Zürich",
     "status": {
      "ok": true,
      "text": "Fassung: genehmigt 14.03.2024 · Feuerpolizei Stadt Zürich"
     },
     "html": "<h1>Brandschutzordnung</h1>\n<p class=\"lead\">Hardturmstrasse 128, 8005 Zürich · genehmigt durch die Feuerpolizei der Stadt Zürich am 14.03.2024</p>\n<div class=\"num\">4 Wiederkehrende Kontrollen</div>\n<table class=\"grid\">\n<tr><th>Einrichtung</th><th>Intervall</th><th>letzte Kontrolle</th><th>nächste fällig</th></tr>\n<tr class=\"hl\"><td>Brandschutzklappen BSK-5OG-01 bis 18</td><td>2 Jahre</td><td>09.11.2024</td><td>09.11.2026</td></tr>\n<tr><td>Brandmeldeanlage</td><td>1 Jahr</td><td>22.02.2026</td><td>22.02.2027</td></tr>\n<tr><td>Sicherheitsbeleuchtung</td><td>1 Jahr</td><td>22.02.2026</td><td>22.02.2027</td></tr>\n<tr><td>Handfeuerlöscher</td><td>3 Jahre</td><td>05.09.2024</td><td>05.09.2027</td></tr>\n<tr><td>Fluchtwegkontrolle durch den Hauswart</td><td>monatlich</td><td>03.08.2026</td><td>03.09.2026</td></tr>\n</table>\n<div class=\"note\">Verantwortlich für die Durchführung ist die technische Bewirtschaftung. Protokolle sind der Feuerpolizei auf Verlangen vorzulegen.</div>"
    }
   ]
  }
 ],
 "questions": [
  {
   "id": "hnk",
   "q": {
    "de": "Wieso sind meine Nebenkosten dieses Jahr so viel höher?",
    "en": "Why are my service charges so much higher this year?"
   },
   "header": {
    "de": "Mietverhältnis 4021.05 · HNK-Abrechnung 2025 · 5. OG, 1’240 m²",
    "en": "Lease 4021.05 · service charge statement 2025 · 5th floor, 1,240 m²"
   },
   "blocks": [
    {
     "requires": [
      "HNK"
     ],
     "title": {
      "de": "1 · Anteil 2025: CHF 84’320, Nachzahlung CHF 6’320",
      "en": "1 · Share 2025: CHF 84,320, additional payment CHF 6,320"
     },
     "lines": {
      "de": [
       "Gegenüber CHF 71’450 im Vorjahr sind das CHF 12’870 oder 18.0 % mehr. Bei Akontozahlungen von CHF 78’000 bleibt eine Nachzahlung von CHF 6’320."
      ],
      "en": [
       "Compared with CHF 71,450 the year before, that is CHF 12,870 or 18.0 % more. With advance payments of CHF 78,000, CHF 6,320 remains to be paid."
      ]
     },
     "cites": [
      {
       "doc": "HNK",
       "page": 1,
       "label": {
        "de": "HNK-Abrechnung 2025, Seite 1",
        "en": "Service charge statement 2025, page 1"
       }
      }
     ]
    },
    {
     "requires": [
      "HNK"
     ],
     "title": {
      "de": "2 · Eine einmalige Instandsetzung treibt die Kosten",
      "en": "2 · A one-off repair drives the increase"
     },
     "lines": {
      "de": [
       "Lüftung und Klima steigt um 100.6 %, Fernwärme um 27.8 %, alle übrigen Positionen um 2.4 bis 4.2 %.",
       "In Lüftung und Klima steckt eine Instandsetzung der Kälteerzeugung vom 04.07.2025. Auf das Mietverhältnis entfallen davon CHF 7’900."
      ],
      "en": [
       "Ventilation and cooling rose by 100.6 %, district heating by 27.8 %, all other items by 2.4 to 4.2 %.",
       "Ventilation and cooling includes a repair of the cooling plant on 4 July 2025. CHF 7,900 of it was charged to this lease."
      ]
     },
     "cites": [
      {
       "doc": "HNK",
       "page": 2,
       "label": {
        "de": "HNK-Abrechnung 2025, Seite 2",
        "en": "Service charge statement 2025, page 2"
       }
      }
     ]
    },
    {
     "requires": [
      "MV"
     ],
     "title": {
      "de": "3 · Verteilschlüssel: 60 % Fläche, 40 % Verbrauch",
      "en": "3 · Allocation: 60 % floor area, 40 % consumption"
     },
     "lines": {
      "de": [
       "Wärme und Kälte laufen vollständig über den Zähler. Ziff. 6.1 ist durch die Nachträge nicht geändert worden."
      ],
      "en": [
       "Heating and cooling are billed fully by meter. Clause 6.1 has not been changed by any addendum."
      ]
     },
     "cites": [
      {
       "doc": "MV",
       "page": 58,
       "label": {
        "de": "Mietvertrag, Ziff. 6.1, Seite 58",
        "en": "Lease, clause 6.1, page 58"
       }
      }
     ]
    },
    {
     "requires": [
      "N3",
      "HNK"
     ],
     "title": {
      "de": "4 · Diese Position gehört nicht in die Abrechnung",
      "en": "4 · This item does not belong in the statement"
     },
     "lines": {
      "de": [
       "Seit Nachtrag Nr. 3 trägt die Vermieterschaft Unterhalt und Ersatz der Kälteerzeugung. Instandsetzungen sind keine Nebenkosten."
      ],
      "en": [
       "Since Addendum No. 3 the landlord bears maintenance and replacement of the cooling plant. Repairs are not service charges."
      ]
     },
     "warn": {
      "de": "Ohne die CHF 7’900 entsteht statt einer Nachzahlung eine Rückzahlung von CHF 1’580 an den Mieter.",
      "en": "Without the CHF 7,900 the tenant is due a refund of CHF 1,580 instead of an additional payment."
     },
     "cites": [
      {
       "doc": "N3",
       "page": 2,
       "label": {
        "de": "Nachtrag Nr. 3, Ziff. 2, Seite 2",
        "en": "Addendum No. 3, clause 2, page 2"
       }
      },
      {
       "doc": "HNK",
       "page": 2,
       "label": {
        "de": "HNK-Abrechnung 2025, Seite 2",
        "en": "Service charge statement 2025, page 2"
       }
      }
     ]
    }
   ],
   "gap": {
    "de": "Frist für die Anfechtung bei der Schlichtungsbehörde.",
    "en": "Deadline for challenging the statement before the conciliation authority."
   }
  },
  {
   "id": "option",
   "q": {
    "de": "Bis wann muss ich meinen Mietvertrag verlängern, und wie wird meine Miete angepasst?",
    "en": "By when do I have to renew my lease, and how is my rent adjusted?"
   },
   "header": {
    "de": "Mietvertrag über Geschäftsräumlichkeiten · Mietverhältnis 4021.05 · Vertrag vom 14.06.2018 + 4 Nachträge",
    "en": "Commercial lease · lease 4021.05 · contract of 14 June 2018 + 4 addenda"
   },
   "blocks": [
    {
     "requires": [
      "MV"
     ],
     "title": {
      "de": "1 · Optionsfrist: 30. September 2027",
      "en": "1 · Option deadline: 30 September 2027"
     },
     "lines": {
      "de": [
       "Feste Dauer bis 30.09.2028, zwei Optionen à fünf Jahre. Ausübung per eingeschriebenem Brief, spätestens zwölf Monate vor Ablauf. Massgebend ist der Eingang bei der Vermieterschaft."
      ],
      "en": [
       "Fixed term until 30 September 2028, two five-year options. Exercise by registered letter at least twelve months before the end of the term. What counts is receipt by the landlord."
      ]
     },
     "warn": {
      "de": "Ohne fristgerechte Ausübung endet das Mietverhältnis ohne Kündigung am 30.09.2028.",
      "en": "Without timely exercise the lease ends on 30 September 2028 without notice."
     },
     "cites": [
      {
       "doc": "MV",
       "page": 47,
       "label": {
        "de": "Mietvertrag, Ziff. 4.3, Seite 47",
        "en": "Lease, clause 4.3, page 47"
       }
      }
     ]
    },
    {
     "requires": [
      "MV"
     ],
     "title": {
      "de": "2 · Indexiert zu 100 % des Landesindexes",
      "en": "2 · Indexed to 100 % of the consumer price index"
     },
     "lines": {
      "de": [
       "Anpassung jährlich per 1. Oktober zu 100 % der Veränderung des Landesindexes, Vertragsbasis ist der Indexstand September 2018."
      ],
      "en": [
       "Adjusted every 1 October by 100 % of the change in the consumer price index, based on the September 2018 index level."
      ]
     },
     "cites": [
      {
       "doc": "MV",
       "page": 51,
       "label": {
        "de": "Mietvertrag, Ziff. 5.2, Seite 51",
        "en": "Lease, clause 5.2, page 51"
       }
      }
     ]
    },
    {
     "requires": [
      "MV",
      "N3"
     ],
     "title": {
      "de": "3 · Eine Klausel im Vertrag gilt nicht mehr",
      "en": "3 · One clause in the lease no longer applies"
     },
     "lines": {
      "de": [
       "Ziff. 7.4 zum Lüftungsunterhalt steht noch im Vertrag, ist aber seit Nachtrag Nr. 3 aufgehoben. Eine reine Volltextsuche würde sie als gültige Fundstelle liefern."
      ],
      "en": [
       "Clause 7.4 on ventilation maintenance is still in the lease but was repealed by Addendum No. 3. A plain full-text search would return it as a valid result."
      ]
     },
     "cites": [
      {
       "doc": "MV",
       "page": 88,
       "label": {
        "de": "Mietvertrag, Ziff. 7.4, Seite 88 · aufgehoben",
        "en": "Lease, clause 7.4, page 88 · repealed"
       }
      },
      {
       "doc": "N3",
       "page": 2,
       "label": {
        "de": "Nachtrag Nr. 3, Ziff. 2, Seite 2",
        "en": "Addendum No. 3, clause 2, page 2"
       }
      }
     ]
    }
   ],
   "gap": {
    "de": "Rückbaupflicht für den Mieterausbau.",
    "en": "Obligation to remove tenant fit-out."
   }
  },
  {
   "id": "service",
   "q": {
    "de": "Wann wurde die Lüftung im 5. OG zuletzt gewartet, und was ist noch offen?",
    "en": "When was the ventilation on the 5th floor last serviced, and what is still open?"
   },
   "header": {
    "de": "Anlage HLK-5OG-02 · Monoblock Zu- und Abluft 12’000 m³/h · Baujahr 2012",
    "en": "System HLK-5OG-02 · supply and exhaust unit 12,000 m³/h · built 2012"
   },
   "blocks": [
    {
     "requires": [
      "SPL"
     ],
     "title": {
      "de": "1 · Letzte Wartung: 12.08.2026",
      "en": "1 · Last service: 12 August 2026"
     },
     "lines": {
      "de": [
       "Jahreswartung durch Fanger Klima AG. Filter Zuluft bei 310 Pa ersetzt, Grenzwert 250 Pa. Nächste Jahreswartung bis 12.08.2027."
      ],
      "en": [
       "Annual service by Fanger Klima AG. Supply air filter replaced at 310 Pa, limit 250 Pa. Next annual service due by 12 August 2027."
      ]
     },
     "cites": [
      {
       "doc": "SPL",
       "page": 1,
       "label": {
        "de": "Serviceprotokoll Lüftung, Seite 1",
        "en": "Ventilation service report, page 1"
       }
      }
     ]
    },
    {
     "requires": [
      "SPL"
     ],
     "title": {
      "de": "2 · Zwei Punkte bleiben offen",
      "en": "2 · Two items remain open"
     },
     "lines": {
      "de": [
       "Frequenzumformer Zuluftventilator mit sporadischer Störung F3, Messschrieb über vier Wochen, Wiedervorlage 15.10.2026.",
       "Kälteerzeugung KM-5OG-01, Verdichter 2 auffällig, Ersatz bis Ende 2027 einplanen, Kostenschätzung CHF 62’000."
      ],
      "en": [
       "Supply fan frequency converter shows sporadic fault F3, four-week measurement, follow-up 15 October 2026.",
       "Cooling plant KM-5OG-01, compressor 2 abnormal, plan replacement by end of 2027, estimate CHF 62,000."
      ]
     },
     "cites": [
      {
       "doc": "SPL",
       "page": 2,
       "label": {
        "de": "Serviceprotokoll Lüftung, Seite 2",
        "en": "Ventilation service report, page 2"
       }
      }
     ]
    },
    {
     "requires": [
      "BSO"
     ],
     "title": {
      "de": "3 · Brandschutzklappen bis 09.11.2026 prüfen",
      "en": "3 · Fire dampers due for inspection by 9 November 2026"
     },
     "lines": {
      "de": [
       "Die Brandschutzklappen BSK-5OG-01 bis 18 waren nicht Teil der Wartung. Intervall zwei Jahre, letzte Kontrolle 09.11.2024."
      ],
      "en": [
       "Fire dampers BSK-5OG-01 to 18 were not part of the service. Interval two years, last inspection 9 November 2024."
      ]
     },
     "warn": {
      "de": "Der Auftrag für diese Kontrolle ist nirgends vermerkt.",
      "en": "No order for this inspection is recorded anywhere."
     },
     "cites": [
      {
       "doc": "BSO",
       "page": 1,
       "label": {
        "de": "Brandschutzordnung, Seite 1",
        "en": "Fire safety regulations, page 1"
       }
      }
     ]
    }
   ],
   "gap": {
    "de": "Ablaufdatum des Wartungsvertrags für die Brandmeldeanlage.",
    "en": "Expiry of the service contract for the fire alarm system."
   }
  },
  {
   "id": "cost",
   "q": {
    "de": "Wer zahlt, wenn Verdichter 2 der Kälteanlage ersetzt werden muss?",
    "en": "Who pays if compressor 2 of the cooling plant has to be replaced?"
   },
   "header": {
    "de": "Kälteerzeugung KM-5OG-01 · Serverräume 5. OG · 84 kW",
    "en": "Cooling plant KM-5OG-01 · server rooms 5th floor · 84 kW"
   },
   "blocks": [
    {
     "requires": [
      "N3"
     ],
     "title": {
      "de": "1 · Die Vermieterschaft",
      "en": "1 · The landlord"
     },
     "lines": {
      "de": [
       "Nachtrag Nr. 3 hat Ziff. 7.4 des Mietvertrags aufgehoben. Unterhalt und Ersatz der Kälteerzeugung gehen zulasten der Vermieterschaft, Filter und VVS-Boxen bleiben beim Mieter."
      ],
      "en": [
       "Addendum No. 3 repealed clause 7.4 of the lease. Maintenance and replacement of the cooling plant are borne by the landlord; filters and VAV boxes stay with the tenant."
      ]
     },
     "cites": [
      {
       "doc": "N3",
       "page": 2,
       "label": {
        "de": "Nachtrag Nr. 3, Ziff. 2, Seite 2",
        "en": "Addendum No. 3, clause 2, page 2"
       }
      }
     ]
    },
    {
     "requires": [
      "SPL"
     ],
     "title": {
      "de": "2 · Kostenschätzung CHF 62’000",
      "en": "2 · Estimated cost CHF 62,000"
     },
     "lines": {
      "de": [
       "Ersatz von Verdichter 2 bis Ende 2027 empfohlen, Wiedervorlage 31.03.2027."
      ],
      "en": [
       "Replacement of compressor 2 recommended by end of 2027, follow-up 31 March 2027."
      ]
     },
     "cites": [
      {
       "doc": "SPL",
       "page": 2,
       "label": {
        "de": "Serviceprotokoll Lüftung, Seite 2",
        "en": "Ventilation service report, page 2"
       }
      }
     ]
    }
   ]
  }
 ]
};
