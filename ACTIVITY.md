# Activity Log

*Version 1.1 — 2026-07-23*

Auto-generated, append-only record of every file added, removed, or changed under `user/pages/` and `user/themes/mod-quark/` on the live server, one section per night. Written by a dedicated `activity-log.sh` cron — no human edits this file, and nothing in it is curated.

**This repo stays documentation-only.** This file does not re-introduce git-tracking of live site content (that model was retired with the Grav 1.7 → 2.0 migration — see `archive/` for the frozen pre-migration snapshot, and RUNBOOK.md for why). Full-file recovery is Grav's own nightly full-site backup, not this file. What lands here is only the *text of the diff itself* — the same way a changelog entry is text about a change, not the change. The mechanism: a local, unpushed shadow copy of `user/pages/` and `user/themes/mod-quark/` is diffed against the live directories each night, the diff text is appended below, and the shadow is refreshed to match live for tomorrow's comparison. Nothing about the shadow copy or the comparison touches GitHub — only this file's text does.

This is **not** a replacement for `CHANGES.md` or `RUNBOOK.md`. Those stay for deliberate, human-written decisions (structural changes, migrations, fixes worth explaining). This file exists so that a change made by anyone — including a student SSHed in editing a `.twig` file directly, with no admin panel and no expectation they'll describe anything — still shows up somewhere with a real diff behind it. If a night's entry turns out to matter, it's worth writing a proper line in `CHANGES.md` and pointing back here.

Format:

```
### YYYY-MM-DD

<unified diff text, or "added"/"removed" for new or deleted files>
```

Nights with no changes get no entry — this file only grows when something actually changed.

### 2026-07-23

```diff

user/pages
Only in /srv/robot-grav-site/user/pages: 01.home
Only in /srv/robot-grav-site/user/pages: 02.about-us
Only in /srv/robot-grav-site/user/pages: 03.community
Only in /srv/robot-grav-site/user/pages: 04.bunnybots
Only in /srv/robot-grav-site/user/pages: 05.resources
Only in /srv/robot-grav-site/user/pages: 05.sponsor-information
Only in /srv/robot-grav-site/user/pages: 06.build-blog
Only in /srv/robot-grav-site/user/pages: 07.newsletter
Only in /srv/robot-grav-site/user/pages: 08.join-us
Only in /srv/robot-grav-site/user/pages: 09.announcements-data
Only in /srv/robot-grav-site/user/pages: 10.footer
Only in /srv/robot-grav-site/user/pages: 11.error
Only in /srv/robot-grav-site/user/pages: 12.media
Only in /srv/robot-grav-site/user/pages: 13.images
Only in /srv/robot-grav-site/user/pages: bumperheader.jpg

user/themes/mod-quark
Only in /srv/robot-grav-site/user/themes/mod-quark: CHANGELOG.md
Only in /srv/robot-grav-site/user/themes/mod-quark: LICENSE
Only in /srv/robot-grav-site/user/themes/mod-quark: README.md
Only in /srv/robot-grav-site/user/themes/mod-quark: blueprints
Only in /srv/robot-grav-site/user/themes/mod-quark: blueprints.yaml
Only in /srv/robot-grav-site/user/themes/mod-quark: css
Only in /srv/robot-grav-site/user/themes/mod-quark: images
Only in /srv/robot-grav-site/user/themes/mod-quark: mod-quark.php
Only in /srv/robot-grav-site/user/themes/mod-quark: mod-quark.yaml
Only in /srv/robot-grav-site/user/themes/mod-quark: screenshot.jpg
Only in /srv/robot-grav-site/user/themes/mod-quark: templates
Only in /srv/robot-grav-site/user/themes/mod-quark: thumbnail.jpg
```
