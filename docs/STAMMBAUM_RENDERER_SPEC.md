# Stammbaum Renderer Spec v0.13

## Ziel

Der Stammbaum soll nicht mehr wie eine Textliste mit `[+]` und `[-]` wirken, sondern wie ein fokussierbarer Branch-Workspace.

## UI-Regeln

- Alle Kategorien starten geschlossen.
- Branches öffnen per Button/Chevron.
- Keine sichtbare `[+]`/`[-]`-Logik.
- Beim Öffnen zoomt die Karte leicht.
- Siblings im Weg sliden aus dem sichtbaren Rahmen.
- Der Content Renderer wird erst im geöffneten Branch aktiv.
- Unter dem Stammbaum wird eine README gerendert, nicht mehr der alte Block ab `v0.7 Strukturregeln`.

## Renderer

- PDF: iframe/object Preview mit Fallback auf GitHub-Link.
- NFO/DIZ: Textvorschau, escaped, monospace.
- README: Branch README → Branch CONTENT → Repo README → Memory README fallback.
- Last Changes: letzter sichtbarer Block.

## Sicherheit

- Kein untrusted HTML aus NFO/DIZ/README direkt einfügen.
- Keine Secrets in Preview.
- Kein Binary-Rehosting ohne Source-/License-/Hash-Review.
