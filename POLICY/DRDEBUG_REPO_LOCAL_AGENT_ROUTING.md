# Dr.Debug Repo-Local Agent Routing

Version: 1.0.0
Status: ACTIVE_PROPOSAL

## Purpose

This file tells Dr.Debug which repository-local directives must be read depending on the current repository and current operation.

Global master directive:

- POLICY/DRDEBUG_4REPO_ADMIN_OWNER_MASTER_DIRECTIVE.md

This file does not replace the master directive. It applies the global directive locally.

## Required startup read order

For every repository task, read in this order:

1. AGENTS.md if present
2. README.md if present
3. POLICY/DRDEBUG_4REPO_ADMIN_OWNER_MASTER_DIRECTIVE.md
4. POLICY/DRDEBUG_REPO_LOCAL_AGENT_ROUTING.md
5. repository-specific policy files listed below
6. task-relevant files only

Do not blindly read the full repository unless explicitly requested and allowed by repository policy.

## Repository role detection

Determine the current repository by folder name or Git remote.

| Repository | Role |
|---|---|
| dr.debug-memory | technical Memory, intake, diagnostics, source notes, validated workflows |
| dr.debug-agents | global agent behavior, mode rules, tool/write restrictions |
| dr.debug-web | renderpoint, GitHub Pages/Jekyll display, visual/chat-rendered assets |
| dr.debug-admin_api | write router, repo selector, mode gate, backup, path policy, restart workflow |

## Operation routing

Device, manufacturer, manual, version, port, error code, diagnosis, source record or validated workflow:
target_repo=n-e-o-w-u-l-f/dr.debug-memory

Agent behavior, mode rules, language rules, safety restrictions, autonomous write behavior or tool policy:
target_repo=n-e-o-w-u-l-f/dr.debug-agents

Rendering content, public pages, visual snippets, diagrams, images, GitHub Pages or Jekyll:
target_repo=n-e-o-w-u-l-f/dr.debug-web

GitHub write access, repo selection, auth gates, backup workflow, mode enforcement, path policy or service restart:
target_repo=n-e-o-w-u-l-f/dr.debug-admin_api

## Mode routing

CUSTOMER_MODE may write only additive intake and diagnostic artifacts.

ADMIN_MODE may perform non-destructive, reversible writes after validation.

OWNER_MODE may perform destructive or mainline operations only with explicit destructive gate, backup and rollback.

## Required local policies by repository

### dr.debug-memory

Read:

- POLICY/DRDEBUG_GITHUB_WRITE_ROUTER_DIRECTIVE.md
- MEMORY/INDEX.md
- UPDATE_PROCESS.md

Purpose:

Store source-backed technical Memory and CUSTOMER_MODE artifacts.

### dr.debug-agents

Read:

- POLICY/GITHUB_WRITE_ACCESS.md
- POLICY/MODES/CUSTOMER_MODE.md
- POLICY/MODES/ADMIN_MODE.md
- POLICY/MODES/OWNER_MODE.md
- POLICY/LANGUAGE_AND_TRANSLATION.md
- POLICY/RENDERPOINT_INTEROP.md

Purpose:

Define global agent behavior and mode authority.

### dr.debug-web

Read:

- POLICY/DRDEBUG_WEB_WRITE_BOUNDARY.md

Purpose:

Render selected Memory/Web assets for chat and GitHub Pages without becoming second technical truth.

### dr.debug-admin_api

Read:

- POLICY/GITHUB_WRITE_ROUTER.md
- POLICY/BACKUP_POLICY.md
- ROUTING/REPO_SELECTOR.json
- ROUTING/MODE_GATE.json
- ROUTING/PATH_POLICY.json

Purpose:

Enforce repo selection, github_write_access, mode gates, path policy, backup and restart behavior.

## Runtime state

The agent must keep local runtime state with:

- current_repo
- current_operation
- target_repo
- mode
- policies_read
- write_allowed
- backup_required
- restart_required
- next_repo

## Fallback

If the required local policy for the operation is missing, downgrade to PARTIAL_ACTIVE.

Do not claim GLOBAL_ACTIVE_4_REPO_ROUTER until all required activation files exist.
