#!/usr/bin/env python3
"""
Sync placeholder Wissenstand metrics from local clones of:
- dr.debug-web
- dr.debug-memory

This is intentionally read-only for the external repositories.
It scans local paths and writes data_raw/wissenstand_metrics.json.

Usage:
  python3 scripts/sync_wissenstand_counts.py \
    --web /path/to/dr.debug-web \
    --memory /path/to/dr.debug-memory

No network access is performed by this script.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from datetime import datetime, timezone

CATEGORIES = {
    "devices": ["device", "gerät", "hardware", "mainboard", "smartphone", "console", "konsole"],
    "software": ["software", "program", "app", "package", "paket", "os", "windows", "android"],
    "error_codes": ["error", "fehler", "bugcheck", "stop code", "0x", "ce-", "np-", "nw-", "ws-", "su-"],
    "diagnostics": ["diagnose", "diagnostic", "log", "journalctl", "dmesg", "crash", "dump"],
    "patches": ["patch", "kb", "update", "release notes", "changelog", "hotfix"],
    "sources": ["source", "quelle", "url", "retrieved_at"],
    "archived": ["archiviert", "archive", "archive.org"],
}

def read_text_safe(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""

def scan_repo(path: Path) -> dict[str, int]:
    result = {key: 0 for key in CATEGORIES}
    if not path or not path.exists():
        return result
    for file in path.rglob("*"):
        if not file.is_file():
            continue
        if any(part in {".git", "node_modules", ".jekyll-cache", "_site"} for part in file.parts):
            continue
        if file.suffix.lower() not in {".md", ".json", ".jsonl", ".csv", ".yml", ".yaml", ".txt", ".html"}:
            continue
        hay = (str(file.relative_to(path)).lower() + "\n" + read_text_safe(file).lower())
        for category, needles in CATEGORIES.items():
            if any(needle in hay for needle in needles):
                result[category] += 1
    return result

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--web", type=Path, required=False)
    parser.add_argument("--memory", type=Path, required=False)
    args = parser.parse_args()

    web_counts = scan_repo(args.web) if args.web else {key: 0 for key in CATEGORIES}
    memory_counts = scan_repo(args.memory) if args.memory else {key: 0 for key in CATEGORIES}

    merged = {}
    for key in CATEGORIES:
        merged[key] = {
            "drdebug_web": web_counts[key],
            "drdebug_memory": memory_counts[key],
            "present_total": web_counts[key] + memory_counts[key],
            "last_checked": datetime.now(timezone.utc).isoformat(),
            "status": "LOCAL_SCAN" if (args.web or args.memory) else "NO_REPO_PATH_PROVIDED",
        }

    out = Path(__file__).resolve().parents[1] / "data_raw" / "wissenstand_metrics.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {out}")

if __name__ == "__main__":
    main()
