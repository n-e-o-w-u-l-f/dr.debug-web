# Dr.Debug Path Policy Expansion

Date: 2026-06-23
Status: PROPOSAL_ACTIVE_CONTRACT
Repository: dr.debug-web

## Purpose

Give Dr.Debug CUSTOMER_MODE and OWNER_ADMIN_MODE enough write access for useful structured work without enabling unsafe arbitrary repository writes.

## Problem confirmed in session

Admin API write attempts to CUSTOMER_MODE artifact paths were rejected with `not_in_allowed_paths`. That means the intended CUSTOMER_MODE artifact structure and the server-side enforcement policy were out of sync.

## Required fix

1. Keep repository-local policy contracts in `POLICY/**`.
2. Mirror or import these contracts in the enforcement layer.
3. Allow CUSTOMER_MODE artifact paths for diagnostics, error descriptions, draft fixes and validated workflows.
4. Keep canonical promotion, destructive writes, secrets and raw binaries blocked.
5. Keep generated-data shrink blocked.

## Mode behavior

CUSTOMER_MODE may write structured artifacts and proposal-only content.

OWNER_ADMIN_MODE may write policy, rendering, index and workflow files only after repository, path, dry-run and validation checks.

## Non-bypass rule

Chat flags such as `ADMIN_GATE=true OWNER=true !dd --apply` may indicate owner intent, but they do not bypass server-side path policy. The server-side policy must explicitly allow the path.
