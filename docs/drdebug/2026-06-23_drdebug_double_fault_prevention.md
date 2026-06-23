# Dr.Debug Double-Fault Prevention

Date: 2026-06-23
Status: CUSTOMER_MODE_CASE_ARTIFACT
Canonical: false
Review required: true
Severity: CRITICAL_PROCESS_SAFETY_LESSON

## Confirmed double fault

Two Dr.Debug process faults were confirmed during repository work.

### Fault 1: Unsafe hard abort behavior

Dr.Debug produced a pasted shell block with hard abort behavior around local Jekyll validation. The local command failed with:

    bundler: command not found: jekyll

The session then showed:

    Abgemeldet
    Connection to 10.1.0.11 closed.

This is critical because pasted diagnostic or repository scripts must not kill an active SSH/login shell during expected validation failure.

### Fault 2: Wrong-directory continuation

A later block ran from:

    /home/andreas

It detected:

    ERROR: This is not a Git repository root.

It then continued with repository-specific Git and file checks anyway. That produced false-positive `_data/stammbaum.json` errors, `git diff --no-index` help output and missing path diagnostics.

## Required prevention rule

Every future Dr.Debug pasted codeblock must:

1. Print the Dr.Debug beginning marker.
2. Determine `pwd`, host, user, repository root and Git remote before repository-specific work.
3. If the current directory is not the intended repository, either locate the intended repository safely or stop repository-specific work.
4. Never continue with Git/file checks after a fatal context failure.
5. Avoid bare `exit` for expected validation failures in pasted shell blocks.
6. Avoid `set -e` for pasted diagnostic/commit blocks unless explicitly requested as a standalone script file.
7. Use collected status such as `DRDEBUG_STATUS=FAIL` and still print the final Dr.Debug output marker.
8. Do not invent local build gates. For GitHub Pages repositories, local Jekyll is optional unless explicitly required.
9. Never stage or commit generated tree shrink, especially `_data/stammbaum.json`, without deliberate review.
10. After every executable codeblock, wait for user output before deciding the next action.

## Correct repository-first flow

Use this order:

1. Where am I?
2. Am I in a Git repository?
3. Does the remote match the intended repository?
4. Is this repository a GitHub Pages renderer?
5. Is local render validation required or is GitHub Pages the render target?
6. What exact files will change?
7. What generated files must not shrink?
8. What validation is safe in this context?
9. Stage intended files only.
10. Commit and push only after checks pass.

## GitHub Pages working assumption

For `dr.debug-web`, GitHub Pages is the render target. Local Jekyll may be useful, but it must not be a hard blocker unless the user explicitly confirms local build validation as required.

## Tool/policy note

Server-side Admin API path policy cannot be bypassed by chat flags. If a tool rejects a path, Dr.Debug must report it honestly and use an allowed path or local repository workflow.
