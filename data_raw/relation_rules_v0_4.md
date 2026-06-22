# Dr.Debug Stammbaum v0.4 — Struktur- und Relationsregeln

Status: PROPOSAL_ONLY

## Kernentscheidung

Betriebssysteme sind ein eigener Software-Endpunkt-Typ.

Im Gerätebaum erscheinen Betriebssysteme nicht als Kind-Gerät, sondern als Relation:

```text
Gerät/Modell -> läuft_mit -> Betriebssystem
Gerät/Modell -> nutzt -> Software
Modell -> hat_Firmware-Version -> Firmware-Version
Firmware-Version -> hat_Dump-/Paket-Metadatenquelle -> Source-ID
```

## Smartphone-Versioning

Smartphone-Struktur:

```text
Geräte
└── Smartphones
    └── Hersteller
        └── Modellfamilie
            └── Gerät
                └── Modellnummer / Variante
                    ├── CSC / Region
                    ├── Firmware-Versionen
                    ├── Firmware-Dumps / Paketlinks
                    ├── Betriebssystem-Relationen
                    ├── Software-Relationen
                    ├── Fehlercodes / Diagnose
                    ├── Archiviert
                    └── Quellen
```

Beispiel:

```text
Samsung Galaxy S23
└── SM-S911B
    ├── Firmware-Versionen
    │   ├── S911BXXS9EZC1 (MOB)
    │   ├── S911BXXSAFZE1 (COM)
    │   └── S911BXXU8DYD9 (BTB)
    ├── läuft_mit: Android
    ├── nutzt: Samsung One UI
    └── nutzt: Samsung Smart Switch
```

## Firmware-/Dump-Regel

`Dump` bedeutet hier nicht: Binärdatei speichern.

Zulässig im Stammbaum/JSONL:

- Source-URL zur Firmware-/Dump-Metadatenseite
- Anbietername, z. B. SamFW, SamFrew, SamMobile
- PDA/AP-Version
- CSC-Version
- CSC-Code / Region
- Android-Version
- One-UI-Version, falls belegt
- Paketgröße, falls belegt
- Hash, falls Quelle ihn ausweist
- Risikostatus

Nicht zulässig ohne Owner/Admin-Review:

- Rehosting von Firmware, BIOS, Treibern oder Odin-Paketen
- Blindes Verified-Setzen von Drittanbieter-Firmware
- Flash-Anleitung ohne exaktes Modell, Revision, Region, Backup, Rollback und Risiko
- Behauptung „sicher“, „legal“, „kompatibel“ oder „offiziell verifiziert“, wenn nur eine Drittanbieterquelle vorliegt

## Zählfelder

`Icon 128px` ist kein Endpunkt und kein Datenfeld im Stammbaum. Icons gehören ins UI/Styling.

`Archive.org-Inhalte` heißt ab v0.4 nur noch:

```text
Archiviert: N
```

## Quellen

Quellenregister sind nicht Teil des Geräte-Stammbaums. Quellen werden separat in `drdebug_source_registry_v0_4.csv` geführt und über Source-IDs referenziert.
