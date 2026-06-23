# Validation

Run these checks after applying the proposal:

1. Inspect diff:

    git diff -- AGENTS.md scripts/generate_stammbaum_data.py _includes/tree_node.html
    git diff -- docs/drdebug content/stammbaum/0000-initial-seed MANUAL SOURCE_RECORDS assets/css/stammbaum-icons.css

2. Generate Stammbaum data:

    python3 scripts/generate_stammbaum_data.py

3. Check that `_data/stammbaum.json` contains:

    - `"has_content": true` for branches with `CONTENT.md`
    - `"icon": ".../Icon.png"` for branches with `Icon.png`

4. Run Jekyll build if available:

    bundle exec jekyll build

5. If Jekyll is unavailable, at minimum run:

    python3 -m json.tool _data/stammbaum.json >/dev/null

6. Review that no manual PDFs, firmware, drivers, BIOS files or installers were downloaded blindly.
7. Review that all seed records remain PROPOSAL_ONLY.
8. Commit only after review.
