# Multi-Repo Write Tool — Integration Notes

## New request fields

- `target_repos`: exact repo allow-subset selected for this request.
- `exclude_repos`: exact repo list excluded from this request.
- `files[].repo`: optional target repo per file.

## Safe behavior

- Unknown repo: reject.
- Excluded repo with file target: reject.
- File without repo: only allowed if server default repo is selected and explicit.
- Path policy remains per repo.
- Dry-run must pass before write.
- Audit log includes repo, path, commit, branch and reason.

## Example command grammar

```text
DRDEBUG_OWNER_ADMIN=TRUE git_write=true git_repo dr.debug-memory dr.debug-web !dd admin write --repos n-e-o-w-u-l-f/dr.debug-memory,n-e-o-w-u-l-f/dr.debug-web --exclude none --apply
```

## Production rollout

1. Add allowlist config.
2. Add schema validation.
3. Add dry-run endpoint.
4. Add multi-write endpoint but keep disabled.
5. Run tests.
6. Enable for proposal branches only.
7. Enable main writes per repo only after explicit policy review.
