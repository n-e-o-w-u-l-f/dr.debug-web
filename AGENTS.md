# AGENTS.md

Version: 0.1.0-multirepo-web
Status: ACTIVE_ROOT_DIRECTIVE
Scope: Dr.Debug web rendering, content pages and public assets

## Repository role

This repository stores website-facing content, render helpers, public assets and endpoint navigation for Dr.Debug.

It must not become the canonical technical memory, the agent knowledge repository or the admin API implementation.

## Read order

For web tasks, read:

1. `AGENTS.md`
2. `README.md`
3. `CONTENT/README.md`
4. `RENDERER/README.md`
5. task-relevant endpoint, asset or render files only

## Rendering rules

- Render `CONTENT.md` when present.
- Render endpoint symbols and images when present.
- Render `.nfo` files as preserved text display artifacts.
- Use memory reference fields instead of copying full canonical memory records.

## Relation to memory

`dr.debug-memory` remains the technical source of truth. This repository may show summaries, navigation, images and references.

## Safety rules

Do not expose secrets, private logs, private serial numbers, private addresses or unreviewed binary material.

Do not claim generated, deployed, validated or published unless tool output proves it.
