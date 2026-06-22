# Recherche- und Strukturiteration v0.6

Status: PROPOSAL_ONLY  
Datum: 2026-06-22

## Ziel

Die v0.5-Jekyll-Struktur wurde anhand der bisherigen Vorgaben weiterentwickelt:

- Stammbaum fokussiert auf Geräte, Software, Firmware-Versionen, Dumps/Metadaten und Relationen.
- Quellenregister bleibt außerhalb des Gerätebaums.
- Neue Ordner unter `content/stammbaum/` werden automatisch zu Branches.
- Jeder Eltern-Branch zeigt `[+]` oder `[-]`.
- Initialzustand: Root sichtbar, nur erster Branch unter Root geöffnet.
- Collapse erhält zusätzlich zu Bootstrap einen Slide/Fade-Effekt.

## Rechercheprinzip

Die Vorgabe „jeden Endpunkt als Suchbegriff“ wurde als iterative Rechercheklasse umgesetzt:

1. vorhandene Endpunkte aus v0.5 als Seed-Begriffe,
2. Suche nach offiziellen Hersteller-/Projekt-/Registry-Quellen,
3. Ableitung weiterer konkreter Endpunkte,
4. Einordnung in Geräte- oder Softwarebaum,
5. Relations-Records statt Doppelablage.

## Verwendete Quellenklassen

- offizielle Herstellerseiten
- offizielle Projekt-Dokumentation
- Hardware-/Identifier-Register
- Firmware-Metadatenquellen
- Reparatur-/Manualquellen
- Emulator-/Preservation-Projektdokumentation

## Ergebnis

- gerenderte Nodes: 5548
- Branch-Ordner: 5547
- Relations-Records: 28
- Source-Registry-Records: 20

## Nicht umgesetzt

Keine Behauptung vollständiger Weltabdeckung.  
Keine Rehosting- oder Sicherheitsgarantie für Firmware, Dumps, ROMs oder Installer.  
Keine kanonische Datenbankpromotion.
