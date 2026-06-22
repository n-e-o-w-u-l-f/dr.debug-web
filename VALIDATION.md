# VALIDATION

Status: PROPOSAL_ONLY

## Checks

```bash
python3 scripts/generate_stammbaum_data.py
python3 scripts/validate_stammbaum.py
```

Expected:

- `_data/stammbaum.json` is generated from `content/stammbaum/`.
- `Icon 128px` is absent.
- `Archive.org-Inhalte` is absent.
- `Quellen- und Identifikator-Register` is absent from the rendered tree.
- `Archiviert` is present.
- `tree_node.html` contains `[+]` and `[-]`.
- The first root branch is opened initially by the Liquid include logic.
