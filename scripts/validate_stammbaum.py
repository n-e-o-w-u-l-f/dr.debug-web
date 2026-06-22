#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "_data" / "stammbaum.json"
JS = ROOT / "assets" / "js" / "stammbaum.js"
CSS = ROOT / "assets" / "css" / "stammbaum.css"
INCLUDE = ROOT / "_includes" / "tree_node.html"

def walk(node):
    yield node
    for child in node.get("children", []) or []:
        yield from walk(child)

def main():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    nodes = list(walk(data))
    branch_nodes = [n for n in nodes if n.get("children")]
    labels = [n.get("label","") for n in nodes]

    forbidden_labels = {"Icon 128px", "Archive.org-Inhalte", "Quellen- und Identifikator-Register"}
    bad = sorted(forbidden_labels & set(labels))
    if bad:
        raise SystemExit(f"Forbidden placeholder/styling labels still present: {bad}")

    include_text = INCLUDE.read_text(encoding="utf-8")
    if "children_count" in include_text and "Visible numbers must describe Wissenstand" not in include_text:
        raise SystemExit("children_count appears to be rendered as user-facing metric")

    js = JS.read_text(encoding="utf-8")
    if '"[-]"' not in js or '"[+]"' not in js:
        raise SystemExit("Toggle JS does not contain both [+] and [-] states")
    if "syncOne" not in js or "hidden.bs.collapse" not in js:
        raise SystemExit("Toggle sync handler missing")

    css = CSS.read_text(encoding="utf-8")
    if '[data-bs-theme="dark"]' not in css:
        raise SystemExit("Dark mode styling missing")
    if "fade-collapse" not in css:
        raise SystemExit("Slide/fade collapse styling missing")

    root_children = data.get("children", [])
    first = root_children[0]["label"] if root_children else "<none>"
    print(f"OK: {len(nodes)} nodes, {len(branch_nodes)} branch folders, first branch='{first}', dark_mode=enabled, toggle_sync=enabled")

if __name__ == "__main__":
    main()
