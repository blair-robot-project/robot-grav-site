#!/bin/bash
# Deployed copy runs from /srv/scripts/activity-log.sh on robot.mbhs.edu (cron: brad, 15 3 * * * UTC).
# This copy is for visibility/history only — not auto-deployed. Edit the live copy, then re-sync this one.
set -uo pipefail

LIVE=/srv/robot-grav-site
SHADOW=/srv/.activity-shadow
DOCS=/srv/robot-grav-site-docs
DATE=$(date +%Y-%m-%d)
DIFF=""

mkdir -p "$SHADOW/user/pages" "$SHADOW/user/themes/mod-quark"

for DIR in user/pages user/themes/mod-quark; do
  RESULT=$(diff -ru "$SHADOW/$DIR" "$LIVE/$DIR")
  if [ -n "$RESULT" ]; then
    DIFF="$DIFF

$DIR
$RESULT"
  fi
done

if [ -n "$DIFF" ]; then
  cd "$DOCS"
  git pull --quiet origin master
  DATE="$DATE" DIFF="$DIFF" python3 - << 'PYEOF'
import os

date = os.environ["DATE"]
diff_text = os.environ["DIFF"]
entry = f"### {date}\n\n```diff{diff_text}\n```\n\n"
marker = "<!-- ACTIVITY-LOG:NEW-ENTRIES-BELOW -->\n"

with open("ACTIVITY.md") as f:
    content = f.read()

if marker not in content:
    raise SystemExit("ACTIVITY.md marker not found — refusing to guess where to insert")

content = content.replace(marker, marker + "\n" + entry, 1)

with open("ACTIVITY.md", "w") as f:
    f.write(content)
PYEOF
  git add ACTIVITY.md
  git commit -m "Activity log $DATE" --quiet
  git push --quiet origin master
fi

rsync -a --delete "$LIVE/user/pages/" "$SHADOW/user/pages/"
rsync -a --delete "$LIVE/user/themes/mod-quark/" "$SHADOW/user/themes/mod-quark/"
