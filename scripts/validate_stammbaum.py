#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TREE_JSON = ROOT / "_data" / "stammbaum.json"
INCLUDE = ROOT / "_includes" / "tree_node.html"
CONTENT = ROOT / "content" / "stammbaum"

FORBIDDEN_LABEL_PARTS = [
    "Icon 128px",
    "Archive.org-Inhalte",
    "Quellen- und Identifikator-Register",
]

def walk(node):
    yield node
    for child in node.get("children", []):
        yield from walk(child)

def main() -> None:
    if not TREE_JSON.exists():
        raise SystemExit("Missing _data/stammbaum.json. Run scripts/generate_stammbaum_data.py first.")
    data = json.loads(TREE_JSON.read_text(encoding="utf-8"))
    nodes = list(walk(data))
    labels = [str(n.get("label", "")) for n in nodes]
    joined = "\n".join(labels)

    for forbidden in FORBIDDEN_LABEL_PARTS:
        if forbidden in joined:
            raise SystemExit(f"Forbidden tree label found: {forbidden}")

    if "Archiviert" not in joined:
        raise SystemExit("Expected label 'Archiviert' not found.")

    if not (INCLUDE.exists() and "[+]" in INCLUDE.read_text(encoding="utf-8") and "[-]" in INCLUDE.read_text(encoding="utf-8")):
        raise SystemExit("tree_node.html must contain [+] and [-] toggle labels.")

    root_children = data.get("children", [])
    if not root_children:
        raise SystemExit("Root has no children.")

    if not CONTENT.exists():
        raise SystemExit("Missing content/stammbaum folder.")

    branch_dirs = [p for p in CONTENT.rglob("*") if p.is_dir()]
    print(f"OK: {len(nodes)} rendered nodes, {len(branch_dirs)} branch folders, first branch='{root_children[0].get('label')}'")

if __name__ == "__main__":
    main()
