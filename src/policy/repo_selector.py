"""Repo selection and exclusion policy for Dr.Debug Admin API.

This module is intentionally dependency-light. Wire the selected repos into the
existing owner gate, dry-run and GitHub write pipeline.
"""

from __future__ import annotations

from dataclasses import dataclass
import re
from typing import Iterable, Mapping, Sequence


REPO_RE = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
SAFE_PATH_RE = re.compile(r"^(?!/)(?!.*\.\.)(?!.*//)[A-Za-z0-9._/@+,:=\- ()]+$")


class RepoPolicyError(ValueError):
    """Raised when a request violates multi-repo policy."""


@dataclass(frozen=True)
class RepoPolicy:
    slug: str
    write_enabled: bool
    allow_main_write: bool
    default_branch: str = "main"
    preferred_branch: str | None = None
    path_policies: tuple[str, ...] = ()

    def allows_path(self, path: str) -> bool:
        if not SAFE_PATH_RE.match(path):
            return False
        if not self.path_policies:
            return False
        return any(re.match(pattern, path) for pattern in self.path_policies)


@dataclass(frozen=True)
class FileChange:
    path: str
    content: str
    repo: str | None = None


def normalize_repo(repo: str) -> str:
    repo = repo.strip()
    if not REPO_RE.match(repo):
        raise RepoPolicyError(f"invalid repo slug: {repo!r}")
    return repo


def select_repos(
    *,
    allowed: Mapping[str, RepoPolicy],
    target_repos: Sequence[str] | None,
    exclude_repos: Sequence[str] | None,
    files: Sequence[FileChange],
    default_repo: str | None = None,
) -> set[str]:
    """Return the exact repos this request may write.

    Rules:
    - target_repos, if present, is an allow-subset for this request.
    - exclude_repos removes repos from that subset.
    - files with repo must target selected repos.
    - files without repo use default_repo only if provided and selected.
    """

    allowed_slugs = set(allowed)
    requested = {normalize_repo(r) for r in (target_repos or [])}
    excluded = {normalize_repo(r) for r in (exclude_repos or [])}

    unknown = (requested | excluded) - allowed_slugs
    if unknown:
        raise RepoPolicyError(f"repo not in server allowlist: {sorted(unknown)}")

    inferred = {normalize_repo(f.repo) for f in files if f.repo}
    if not requested:
        requested = inferred or ({normalize_repo(default_repo)} if default_repo else set())

    if not requested:
        raise RepoPolicyError("no target repo selected or inferable")

    selected = requested - excluded
    if not selected:
        raise RepoPolicyError("all requested repos were excluded")

    for file in files:
        target = normalize_repo(file.repo) if file.repo else normalize_repo(default_repo or "")
        if target not in selected:
            raise RepoPolicyError(f"file {file.path!r} targets repo {target!r}, not selected or excluded")
        policy = allowed[target]
        if not policy.write_enabled:
            raise RepoPolicyError(f"repo write disabled: {target}")
        if not policy.allows_path(file.path):
            raise RepoPolicyError(f"path not allowed for {target}: {file.path}")

    return selected
