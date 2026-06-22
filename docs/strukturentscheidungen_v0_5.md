# Strukturentscheidungen v0.5

Status: PROPOSAL_ONLY

## Grundmodell

Der Baum ist kein Quellenregister und kein Styling-Verzeichnis.

- `Geräte` enthält reale Geräte, Plattformen und Komponenten.
- `Software` enthält Betriebssysteme, Systemsoftware, Tools, Spiele, Emulatoren, Mods und Paketquellen.
- `Relationen` verbinden Geräte/Modelle/Firmware/Software, ohne Software in Geräte umzudeuten.
- `Archiviert` ersetzt `Archive.org-Inhalte`.
- Icons sind Styling und werden nicht als Branch modelliert.

## Automatische Branch-Regel

Jeder Ordner unter `content/stammbaum/` wird ein Branch.

Optionale Datei pro Ordner:

```json
{
  "label": "Intel Pentium 60 MHz",
  "order": 1,
  "node_kind": "branch_or_endpoint",
  "count": 0,
  "status": "PROPOSAL_ONLY"
}
```

Ohne `.branch.json` wird der Ordnername als Label genutzt.

## Jekyll-Betrieb

Zwei Modi:

1. Lokal mit Plugin: `_plugins/stammbaum_folder_tree.rb` scannt die Ordner beim Build.
2. GitHub-Pages-sicher: `scripts/generate_stammbaum_data.py` erzeugt `_data/stammbaum.json` vor `jekyll build`.

## UI-Regel

Initialzustand:

- Root sichtbar und geöffnet.
- Nur der erste Branch unter Root ist geöffnet.
- Alle weiteren Branches starten geschlossen.
- Branches mit Kindern zeigen `[+]` oder `[-]`.
