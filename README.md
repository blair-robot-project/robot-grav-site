# FRC Team 449 Website (robot.mbhs.edu)

Grav CMS site for FRC Team 449, The Blair Robot Project. **This repository
is the source of truth** for how the site is built, run, and maintained —
if you need to know something about the 449 site, look here first.

The live site runs on its own server; this repo holds documentation plus a
frozen historical snapshot under `archive/` (not current — see its own
README). Secrets are **not** in this repo — see [RUNBOOK.md](RUNBOOK.md)
for who holds them.

---

## Welcome

Team 449 ("The Blair Robot Project") is Montgomery Blair High School's FRC
robotics team, and this repo documents the team's own website at
**robot.mbhs.edu**. The site runs on **Grav**, a CMS with no database —
every page is just files and folders, edited mostly through a normal web
admin panel.

If you're new to maintaining this site — student or otherwise — you don't
need to know PHP or servers for most changes. Day-to-day edits (text,
photos, new pages) happen through the admin panel at `/admin`, and
**[INSTRUCTIONS.md](INSTRUCTIONS.md) is the actual how-to walkthrough for
that** — start there for hands-on editing. This README is oriented
differently: it's the map of the project (what exists, who's involved,
where to go for what), plus — below, in **Quick Context** — the dense
working facts a Claude Code session needs before touching anything.

**Who to ask:**

| Who | For what |
|---|---|
| Brad (comms@navybook.com) | Did mid-2026 site upgrade |
| Rafi Pedersen | Server/infrastructure owner — system-level recovery |
| James P | Previously rescued the site after a PHP update broke it |

**Where to go for what:**

- **Making an everyday edit** (text, photos, new page/module) → [`INSTRUCTIONS.md`](INSTRUCTIONS.md) — Part 1 for admin-panel editing, Part 2 for SSH/power-user tasks, including the recurring Update Schedule.
- **What's currently outstanding** → [`TODO.md`](TODO.md) — short-lived by design; expect it to be rewritten fresh as items resolve.
- **Deeper server/ops reference** (environments, security status, gotchas) → [`RUNBOOK.md`](RUNBOOK.md).
- **History of changes** → [`CHANGELOG.md`](CHANGELOG.md) (dated/technical) or [`Changes.md`](Changes.md) (plain language, for team leadership).
- **Why the site exists, who it's for** → [`449_website_purpose_brief_v1_2026-06-05.md`](449_website_purpose_brief_v1_2026-06-05.md) — a discussion guide, best used as a conversation starter.

---

## Quick Context
*Read this before making any change — including at the start of a Claude Code session.*

### The site & stack
- Grav **2.0.7** (Admin Next/admin2 SPA + api plugin), PHP **8.3.31**, nginx 1.18.0, Ubuntu 22.04, on a **dedicated** DigitalOcean droplet.
- Theme: **Mod Quark** (`user/themes/mod-quark/`) — a custom child of stock **Quark** (`user/themes/quark/` = parent, **don't edit it**). Hand-managed, not GPM-managed.
- Custom modular templates: `feature-images`, `icon-menu`, `gallery-draggable`, plus modified `text`/`hero` and helper `footer-col` — what each does is in [RUNBOOK.md](RUNBOOK.md) § Architecture reference (or the fuller table in `INSTRUCTIONS.md`'s appendix).
- Images: PHP **gd** + ImageMagick **`convert`**; the **image-intake** plugin sanitizes filenames + shrinks uploads.
- Full environment facts (config deviations, security status, disk): [RUNBOOK.md](RUNBOOK.md) § Environments.

### Access & ownership
- SSH `ssh USER@robot.mbhs.edu`; Grav root `/srv/robot-grav-site/`. Admin at `/admin`.
- Web + admin run as user **`grav`** (group **`editor`**). `USER` is in `sudo` + `editor`.
- **🔑 The #1 gotcha:** site files must be **`grav:editor`**. If you create/overwrite files as `USER` (scp, rsync, `>` redirects), **`chown` them back**: `sudo chown -R grav:editor <paths>` (exclude `.git`). Symptoms of getting it wrong: admin "Failed to save," or a 500 after a plugin op.
- Full access/hardening detail (fail2ban, DO console root-equivalence): [RUNBOOK.md](RUNBOOK.md) § Access & Ownership.

### Key paths (under `/srv/robot-grav-site/`)
| What | Path |
|---|---|
| Custom CSS | `user/themes/mod-quark/css/custom.css` |
| Templates | `user/themes/mod-quark/templates/` (`modular/`, `partials/`) |
| Blueprints | `user/themes/mod-quark/blueprints/` |
| Cache-bust version | `?v=NN` in `templates/partials/base.html.twig` |
| Content | `user/pages/` |
| Grav CLI | `bin/grav` — run as grav: `sudo -u grav php bin/grav …` |

Full path reference (server/PHP/nginx configs too): [RUNBOOK.md](RUNBOOK.md) § Key File Paths Reference.

### MCP integration
The live site is reachable from Claude Code via the Grav `api` plugin + a locally-built `grav-mcp` server (built from source at `~/Documents/449/grav-mcp/` — the `getgrav/grav-mcp` npm package isn't published yet). Registered as a project-scoped MCP server:
- **`grav-live`** → `https://robot.mbhs.edu/api`, key generated against **`bradP`** (API keys inherit the full permission set of whichever user generated them).

Tool surface covers pages, media, users, plugins, config, backups, and the scheduler — effectively full admin capability, not just content edits. Keys live only in local Claude Code config, never in this repo.

### How to make a change
1. **Back up** anything risky: `sudo -u grav php bin/grav backup`, or `cp x x.bak-$(date +%Y%m%d-%H%M%S)`.
2. **Edit** as `grav`, or as `USER` then `chown` back (see ownership rule above).
3. **CSS:** edit `custom.css` **and bump `?v=NN`** in `base.html.twig`, or browsers serve the old stylesheet.
4. **Clear cache** when structure/templates change: `sudo -u grav php bin/grav cache` (or Admin → Tools → Clear Cache).
5. **Verify:** `curl -s -o /dev/null -w "%{http_code}\n" https://robot.mbhs.edu/<path>`; check images resolve; `tail logs/grav.log` — fatals/CRITICAL matter, PHP-8.x deprecation NOTICEs are normal.

### Top gotchas
- A custom modular template **needs a matching blueprint** (`blueprints/modular/NAME.yaml`, `@extends: default`) or the admin silently reverts it to a stock type.
- **Never hardcode links.** Internal links: root-relative (`/about-us/leadership`). Page-media images: filename only (`![](photo.jpg)`).
- **Plugin/Grav updates: GPM only as `grav`** (Admin "Update," or `sudo -u grav php bin/gpm update`) — never as `USER`.

Full gotchas list (rollback options, migration lessons, font licensing, notes conventions, GPM specifics): [RUNBOOK.md](RUNBOOK.md) § Cautions & Gotchas.

---

## Links

- **Live site:** https://robot.mbhs.edu (admin: `/admin`)
- **Theme repo:** https://github.com/blair-robot-project/grav-theme-mod-quark
- **Grav CMS docs:** https://learn.getgrav.org
