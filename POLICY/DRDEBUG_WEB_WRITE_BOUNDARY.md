# Dr.Debug Web Write Boundary

Version: 1.0.0
Status: ACTIVE_PROPOSAL
Repository: n-e-o-w-u-l-f/dr.debug-web

## Purpose

Defines how dr.debug-web receives renderable content and references from the global 4-repository Dr.Debug workflow.

## Role

dr.debug-web is the visual and public renderpoint.

It may render selected, task-relevant content for:

- GitHub Pages
- Jekyll pages
- chat-visible explanations
- selected visual snippets
- source-backed render references
- device or board explanation assets when allowed

## Boundary

dr.debug-web must not become a second canonical technical truth.

Canonical technical facts belong in dr.debug-memory.

Agent behavior belongs in dr.debug-agents.

Write routing, mode gates, path policy and backup enforcement belong in dr.debug-admin_api.

## Allowed roots

dr.debug-web may receive additive render artifacts under:

- DATA/memory_refs/
- CONTENT/rendered_memory/
- PUBLIC/assets/manual_snippets/
- PUBLIC/assets/device_images/
- POLICY/
- docs/drdebug/

## Not allowed

dr.debug-web must not store:

- secrets
- tokens
- credentials
- unredacted logs
- private customer data
- unsupported fix claims
- full copyrighted manuals without permission
- drivers
- firmware
- BIOS files
- vendor binary tools

## Memory reference rule

Render artifacts should reference dr.debug-memory records instead of duplicating canonical content.

A render reference should include:

- id
- title
- memory_path
- source_status
- validation_status
- render_type
- assets
- updated_at
- limitations

## Manual and screenshot snippets

Manual snippets, translated excerpts or screenshots may be stored only when:

- they are task-relevant
- they are minimal
- source and language are recorded
- generated translation is clearly labeled
- copyright or license restrictions are respected
- no secret/customer data is included

Use labels:

- AUTOMATIC_TRANSLATION
- QUALITY_REVIEW_REQUESTED
- SOURCE_EXCERPT
- DERIVED_RENDER_SNIPPET

## Internet fallback

If Memory and Web have no existing useful content:

1. search official sources first
2. classify evidence
3. create source-backed intake in dr.debug-memory when allowed
4. create render references in dr.debug-web only when allowed
5. do not mark fixes as confirmed without validation

## Chat rendering rule

When rendering content into chat:

1. do not render the full repository tree
2. select task-relevant files only
3. prefer concise text, image, snippet or link
4. state limitations
5. distinguish source-confirmed facts from unvalidated fixes

## Download links

dr.debug-web may render links to official downloads or source pages.

It must not mirror drivers, firmware, BIOS, installers or vendor binary tools without explicit review.

## Reporting

Every web write must report:

- mode
- target_repo
- files_written
- render_type
- source_memory_path
- validation_result
- rollback
- next_step
