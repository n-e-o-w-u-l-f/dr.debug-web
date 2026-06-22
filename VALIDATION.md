# VALIDATION v0.7

Status: PROPOSAL_ONLY

## Commands

```bash
python3 scripts/generate_stammbaum_data.py
python3 scripts/validate_stammbaum.py
```

## Result

```text
OK: 8451 nodes, 755 branch folders, first branch='Geräte', dark_mode=enabled, toggle_sync=enabled
```

## Checks

- `_data/stammbaum.json` generated from `content/stammbaum/`.
- Forbidden old labels checked:
  - `Icon 128px`
  - `Archive.org-Inhalte`
  - `Quellen- und Identifikator-Register`
- Dark mode CSS checked.
- Collapse slide/fade CSS checked.
- `[+]` and `[-]` toggle sync checked.
- `children_count` remains internal and is not rendered as the user-facing Wissenstand number.
- `knowledge_count`, `present_total`, `missing_total` fields are supported for future repo sync.

## Known limitations

- The tree is not a complete world database.
- Source records are discovery/proposal records.
- Download links are metadata only.
- No firmware/ROM/dump binaries are stored.
- `sync_wissenstand_counts.py` requires local clones to produce real repo counts.
