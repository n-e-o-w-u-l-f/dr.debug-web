# Dr.Debug Jekyll Stammbaum v0.5

Status: PROPOSAL_ONLY

Dieses Paket rendert den bisherigen Dr.Debug-Stammbaum als automatisch erweiterbare Jekyll-Website.

## Ordner → Branch

Jeder neue Ordner unter:

```text
content/stammbaum/
```

wird beim nächsten Build automatisch ein neuer Branch.

Optional kann ein Ordner eine `.branch.json` enthalten, um Label, Reihenfolge, Zähler oder Status zu setzen.

## Lokal starten

```bash
python3 scripts/generate_stammbaum_data.py
bundle install
bundle exec jekyll serve
```

Dann im Browser öffnen:

```text
http://127.0.0.1:4000/
```

## GitHub Pages

GitHub Pages ignoriert nicht-whitelisted Jekyll-Plugins im Safe Mode. Deshalb enthält das Paket zusätzlich:

```text
scripts/generate_stammbaum_data.py
.github/workflows/build-pages.yml
```

Die Action generiert `_data/stammbaum.json` aus den Ordnern und baut danach Jekyll.

## UI

- Bootstrap 5 Styling.
- Branches mit Kindern zeigen `[+]` geschlossen und `[-]` geöffnet.
- Root ist sichtbar.
- Nur der erste Branch unter Root ist initial geöffnet.
- Alle anderen Branches sind initial geschlossen.

## Enthaltene Startstruktur

Die Startstruktur wurde aus `data_raw/original_tree_v0_4.md` übernommen und als Ordnerbaum unter `content/stammbaum/` materialisiert.

## Nicht enthalten

- Kein Icon-Branch.
- Kein Quellenregister im Gerätebaum.
- Keine Firmware-/ROM-Binärdateien.
- Keine Rehosting- oder Sicherheitsbehauptung für Dumps, Firmware oder ROMs.
