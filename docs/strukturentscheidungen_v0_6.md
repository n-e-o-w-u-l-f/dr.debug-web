# Strukturentscheidungen v0.6

## Geräte vs. Software

- Geräte sind physische Geräte, Komponenten, Plattformen oder konkrete Modellvarianten.
- Betriebssysteme sind Software-Endpunkte.
- Im Gerätebaum stehen Betriebssysteme nur über Relationen wie `läuft_mit`.
- Firmware-Versionen sind versionierte Software-/Firmware-Endpunkte, wenn sie an ein konkretes Modell gebunden sind.
- Dumps/Paketlinks sind Metadaten-/Source-Relations, keine im Repository abgelegten Binärdateien.

## Smartphone-Versioning

Beispiel:

```text
Geräte
└── Smartphones
    └── Samsung
        └── Galaxy S
            └── Samsung Galaxy S23
                └── SM-S911B
                    └── Firmware-Versionen
                        ├── S911BXXS9EZC1
                        ├── S911BXXSAFZE1
                        └── S911BXXU8DYD9
```

`Samsung Galaxy S23` ist das Gerät.  
`SM-S911B` ist Modell/Region/Variante.  
Firmware-Builds sind eigene Unterendpunkte.  
Dump-/Paketlinks werden in Relations/Source-Records referenziert.

## Quellenregister

Quellen wie PCI IDs, USB IDs, LVFS, OpenWrt ToH, SamFW oder Herstellerseiten gehören nicht mehr als Branch in den Gerätebaum. Sie liegen in:

```text
data_raw/source_registry_v0_6.csv
data_raw/relations_v0_6.jsonl
```

## UI

Bootstrap Collapse wird weiter genutzt. Zusätzlich gibt es:

- `fade-collapse` CSS-Klasse
- `opacity` + `transform` Übergänge
- `prefers-reduced-motion` Fallback
- Event-Listener für `show.bs.collapse`, `hide.bs.collapse`, `shown.bs.collapse`, `hidden.bs.collapse`

## Erweiterungsregel

Ein neuer Ordner unter `content/stammbaum/` wird beim nächsten Build automatisch ein Branch.  
Optional steuert `.branch.json` Label, Reihenfolge, Status, Zählwerte und Canonical-ID.
