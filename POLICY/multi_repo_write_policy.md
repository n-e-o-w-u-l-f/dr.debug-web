# Multi-Repo Write Tool Policy

Status: PROPOSAL_ONLY

## Ziel

Das Admin-API-Write-Tool soll nicht mehr auf genau ein Repository hart verdrahtet sein, sondern eine sichere Allowlist unterstützen.

## Anforderungen

- Repositories müssen explizit erlaubt sein.
- Der Request darf Ziel-Repos auswählen.
- Der Request darf erlaubte Repos ausschließen.
- Dateien tragen optional ihr Ziel-Repo selbst.
- Wenn `exclude_repos` ein Ziel enthält, muss der Request fehlschlagen.
- Keine Wildcards, keine freien Owner/Repo-Eingaben ohne Allowlist.
- `main`-Writes nur wenn Policy dies je Repo erlaubt.
- Dry-run vor Write bleibt Pflicht.
- Audit log muss pro Repo und Datei schreiben.

## Beispiel

```json
{
  "target_repos": ["n-e-o-w-u-l-f/dr.debug-memory", "n-e-o-w-u-l-f/dr.debug-web"],
  "exclude_repos": [],
  "files": [
    {"repo": "n-e-o-w-u-l-f/dr.debug-web", "path": "index.html", "content": "..."}
  ]
}
```

## Sicherheitsentscheidung

Wenn Repos gewählt wurden, darf keine Datei in ein nicht gewähltes Repo schreiben.  
Wenn keine Repos gewählt wurden, werden die Ziel-Repos aus den Dateiobjekten abgeleitet und gegen die Allowlist geprüft.
