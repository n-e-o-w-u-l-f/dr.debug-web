# Dr.Debug Stammbaum v0.7 - Hierarchie-Entscheidungen

Status: PROPOSAL_ONLY

## Hauptentscheidung

Der Baum ist eine Navigations- und Datenbankstruktur, keine Behauptung einer vollständigen Weltliste.

- Geräte sind reale Geräte, Plattformen, Komponenten oder Modellvarianten.
- Software ist ein eigener Hauptbereich.
- Betriebssysteme sind Software-Endpunkte.
- Geräte erhalten Relationen zu Betriebssystemen, Firmware, Apps, Tools, Spielen und Fehlerbildern.
- Download-Links, Dumps, Firmwarepakete und ROM-Informationen sind Metadaten/Quellen-Records, keine im Repository gespeicherten Binärdateien.

## Konsolen

Konsolen werden zweigleisig geführt:

1. `Geräte > Gaming-Konsolen und Handhelds` für Hardware, Modellnummern, Revisionen, Controller, Reparatur.
2. `Software > Betriebssysteme > Gaming und Konsole` für Systemsoftware, Firmware-Versionen, Updates, Error Codes, Diagnose.

## Programme

Programme werden nach Nutzen sortiert, nicht nach Hersteller zuerst:

- IDE / Code-Editoren
- DAW / Audio-Produktion
- Grafik / 3D / Video
- CAD / EDA / Technik
- Backup / Imaging / Recovery
- Datenträger / Dateisystem
- Netzwerk / Protokollanalyse
- Virtualisierung / Container
- Firmware / Flashing / Geräte-Service
- Office / Produktivität
- Sicherheit / Forensik

Jeder konkrete Programm-Endpunkt kann haben:

- Versionen
- Builds / Releases
- Download- / Store-Links
- Fehlercodes
- Diagnose
- Patches / Changelogs
- Plugins / Erweiterungen / Mods
- Kompatibilität
- Archiviert
- Quellen

## Android Apps

Android Apps bekommen ein eigenes Paketmodell:

- Package Name
- versionCode
- versionName
- minSdk / targetSdk / compileSdk
- Signatur / Zertifikats-Fingerprint
- APK / AAB / Split APKs
- Download- / Store-Links
- Berechtigungen
- Logs / Crash / ANR
- Fehlercodes
- Diagnose
- Patches / Changelogs

## Windows

Windows wird getrennt in:

- Windows 9x / DOS-basierte Familie
- Windows NT-basierte Familie
- Diagnose- und Reparaturklassen
- Patch- und Updateklassen
- Fehlercodes

Windows 10/11 enthalten explizite Versions-/Build-Zweige, damit spätere KB-, Fehlercode- und Treiberkompatibilität gezielt verknüpft werden kann.

## Wissensstand-Zähler

`children_count` ist nur noch intern.
Sichtbare Zahlen kommen aus:

- `knowledge_count`
- `present_total`
- `missing_total`
- `proposal_only_total`
- `canonical_total`

Diese Werte sind für spätere lokale Synchronisation mit `dr.debug-web` und `dr.debug-memory` vorgesehen.
