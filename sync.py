#!/usr/bin/env python3
"""Copy the Speak Up course from the Obsidian vault into this repo.

The vault is the source of truth. Edit there, run `node test-code.js` in the
vault folder, then run:  python3 sync.py   and commit and push.

Only the pages a student or staff member opens are copied. The build plan and
the test script stay in the vault. Each page gets a "noindex" tag so search
engines leave it alone while the course is still under review.
"""
import shutil
from pathlib import Path

SRC = Path.home() / "Documents/Obsidian Vault/transition-wiki/.outputs/self-advocacy"
HERE = Path(__file__).resolve().parent
FILES = ["index.html", "staff-guide.html", "speak-up.css", "speak-up.js", "content.js"]
NOINDEX = '<meta name="robots" content="noindex">\n'

for name in FILES:
    text = (SRC / name).read_text(encoding="utf-8")
    if name.endswith(".html") and "noindex" not in text:
        text = text.replace("<title>", NOINDEX + "<title>", 1)
    (HERE / name).write_text(text, encoding="utf-8")

shutil.rmtree(HERE / "fonts", ignore_errors=True)
shutil.copytree(SRC / "fonts", HERE / "fonts")
print("synced %d files and fonts/" % len(FILES))
