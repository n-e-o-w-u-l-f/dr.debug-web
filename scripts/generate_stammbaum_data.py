#!/usr/bin/env python3
"""
Generate _data/stammbaum.json from content/stammbaum folders.

Rules:
- Every folder becomes a branch/node.
- Optional .branch.json controls label, order, status, node_kind and Wissenstand metrics.
- New folders without .branch.json are still included automatically.
- UI counts must come from Wissenstand metrics, not from children_count.
"""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
TREE_ROOT = ROOT / "content" / "stammbaum"
OUT = ROOT / "_data" / "stammbaum.json"

def natural_key(value: str) -> list[Any]:
    return [int(p) if p.isdigit() else p.lower() for p in re.split(r"(\d+)", value)]

def load_meta(folder: Path) -> dict[str, Any]:
    meta_file = folder / ".branch.json"
    if meta_file.exists():
        try:
            data = json.loads(meta_file.read_text(encoding="utf-8"))
            if not isinstance(data, dict):
                return {}
            return data
        except json.JSONDecodeError as exc:
            raise SystemExit(f"Invalid JSON in {meta_file}: {exc}") from exc
    label = re.sub(r"^\d{1,4}-", "", folder.name).replace("-", " ").strip().title()
    return {"label": label, "order": 9999, "node_kind": "branch_or_endpoint"}

def child_dirs(folder: Path) -> list[Path]:
    result = []
    for p in folder.iterdir():
        if not p.is_dir():
            continue
        if p.name.startswith(".") or p.name.startswith("_"):
            continue
        result.append(p)
    def sort_key(p: Path):
        m = load_meta(p)
        return (m.get("order", 9999), natural_key(m.get("label", p.name)), p.name)
    return sorted(result, key=sort_key)

def build_node(folder: Path, path_parts: list[str] | None = None) -> dict[str, Any]:
    path_parts = path_parts or []
    meta = load_meta(folder)
    label = str(meta.get("label") or folder.name)
    node = {
        "label": label,
        "slug": folder.name,
        "path": "/".join(path_parts + [folder.name]) if path_parts else folder.name,
        "node_kind": meta.get("node_kind", "branch_or_endpoint"),
    }
    passthrough = (
        "order", "count", "status", "source_count", "relation_type", "canonical_id",
        "knowledge_count", "present_total", "missing_total", "proposal_only_total",
        "canonical_total", "last_checked", "count_source", "risk", "source_status"
    )
    for key in passthrough:
        if key in meta:
            node[key] = meta[key]
    children = [build_node(child, path_parts + [folder.name]) for child in child_dirs(folder)]
    if children:
        node["children"] = children
        # Internal only. The UI must not render this as the knowledge count.
        node["children_count"] = len(children)
    return node

def main() -> None:
    if not TREE_ROOT.exists():
        raise SystemExit(f"Missing tree root: {TREE_ROOT}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    data = build_node(TREE_ROOT, [])
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
