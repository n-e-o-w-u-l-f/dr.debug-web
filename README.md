# Dr.Debug Jekyll Stammbaum v0.7

Status: PROPOSAL_ONLY

Dieses Paket erweitert den v0.6-Stammbaum zu einer stärker reparatur- und analyseorientierten Jekyll-Website.

## Kernänderungen

- Konsolen-Hierarchie erweitert:
  - moderne Konsolen
  - Retro-Konsolen
  - Systemsoftware / Firmware
  - Fehlercodes
  - Diagnose
  - Update-/Patch-Klassen
- Programme nach Nutzen gegliedert:
  - IDE / Code-Editoren
  - DAW / Audio-Produktion
  - Grafik / 3D / Video
  - CAD / EDA
  - Backup / Recovery
  - Datenträger / Dateisystem
  - Netzwerk
  - Virtualisierung / Container
  - Firmware-/Flashing-Tools
- Android Apps integriert:
  - Package Name
  - versionCode
  - versionName
  - minSdk / targetSdk
  - APK / AAB / Split APK
  - Store-/Download-Links
  - Crash / ANR / Diagnose
- Windows integriert:
  - Windows 95 / 98 / 98SE / Me
  - Windows NT / 2000 / XP / Vista / 7 / 8 / 8.1 / 10 / 11
  - Windows-10- und Windows-11-Versionen/Builds
  - Bug Check / STOP Codes
  - Windows Update Fehler
  - Windows Installer Fehler
  - Diagnose- und Patch-Klassen
- Dark/Light-Mode über Bootstrap `data-bs-theme`.
- Unterschiedliche helle/dunkle Styles.
- `[+]`/`[-]`-Toggle-Logik robuster synchronisiert.
- Sichtbare Zahlen sind nicht mehr Unterordner-Zähler.
  Sie sind als Wissenstand-Zähler für `dr.debug-web` und `dr.debug-memory` vorbereitet.

## Ordner → Branch

Jeder neue Ordner unter:

```text
content/stammbaum/
```

wird beim nächsten Build automatisch ein neuer Branch.

Optional kann ein Ordner eine `.branch.json` enthalten.

## Lokaler Build

```bash
python3 scripts/generate_stammbaum_data.py
python3 scripts/validate_stammbaum.py
bundle install
bundle exec jekyll serve
```

## GitHub-Pages-freundlicher Prebuild

GitHub Pages kann Custom-Jekyll-Plugins ignorieren. Deshalb bleibt der Python-Prebuild enthalten:

```bash
python3 scripts/generate_stammbaum_data.py
```

## Wissensstand-Sync

Die sichtbaren Zahlen sollen später aus lokalen Clones synchronisiert werden:

```bash
python3 scripts/sync_wissenstand_counts.py \
  --web /pfad/zu/dr.debug-web \
  --memory /pfad/zu/dr.debug-memory
```

Das Script liest nur lokale Ordner und schreibt:

```text
data_raw/wissenstand_metrics.json
```

## Sicherheitsgrenzen

- Keine Firmware-, BIOS-, Installer-, ROM- oder Dump-Binärdateien enthalten.
- Download-/Dump-Links sind Metadaten- oder Quellen-Records.
- Kein Rehosting.
- Keine Kompatibilitäts- oder Sicherheitsgarantie.
- Keine GitHub-Writes oder Commits aus diesem Paket.

## Umfang

```text
Nodes: 8451
Branch folders with children: 755
.branch.json files: 8451
Source records: 26
Status: PROPOSAL_ONLY
```
