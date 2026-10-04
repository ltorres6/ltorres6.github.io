"""Refresh citation counts in src/content/publications.json from Google Scholar.

The JSON file is the curated source of truth (titles, authors, venues, DOIs).
This script only updates each entry's `citations` and lists Scholar entries it
could not match, so new papers can be added by hand.

Usage: uv run python scripts/update_citations.py
"""

import json
import re
from pathlib import Path

from scholarly import scholarly

SCHOLAR_ID = "EfaQZA8AAAAJ"
DATA = Path(__file__).resolve().parent.parent / "src/content/publications.json"


def key(title: str) -> str:
    return re.sub(r"[^a-z0-9]", "", title.lower())


def main() -> None:
    pubs = json.loads(DATA.read_text(encoding="utf-8"))
    by_title = {key(p["title"]): p for p in pubs}

    author = scholarly.fill(scholarly.search_author_id(SCHOLAR_ID), sections=["publications"])
    unmatched = []
    changed = 0
    for item in author["publications"]:
        title = item["bib"].get("title", "")
        count = item.get("num_citations", 0)
        pub = by_title.get(key(title))
        if pub is None:
            unmatched.append((title, count))
            continue
        if pub.get("citations", 0) != count:
            print(f"{pub['citations']:>4} -> {count:<4} {title[:70]}")
            pub["citations"] = count
            changed += 1

    DATA.write_text(json.dumps(pubs, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\nUpdated {changed} citation counts.")
    if unmatched:
        print("\nOn Scholar but not in publications.json (add by hand if new):")
        for title, count in unmatched:
            print(f"  [{count}] {title}")


if __name__ == "__main__":
    main()
