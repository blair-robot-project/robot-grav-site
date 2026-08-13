# FRC Team 449 Website (robot.mbhs.edu)

This repo documents **[robot.mbhs.edu](http://robot.mbhs.edu)**, the website of FRC Team 449 ("The Blair Robot Project") at Montgomery Blair High School. The site runs on **[Grav](https://getgrav.org)**, a CMS with no database —
every page is just files and folders, edited mostly through a normal web
admin panel.

The live site runs on its own server. This repo holds documentation plus a
frozen historical snapshot under `archive/` (see its own
README). Secrets are not in this repo — see [RUNBOOK.md](RUNBOOK.md)
for who holds them.

If you're new to maintaining this site, you don't need to know PHP or servers for most changes. Day-to-day edits (text,
photos, new pages) happen through the [admin panel](https://robot.mbhs.edu/admin/) at `/admin`. See
**[INSTRUCTIONS.md](INSTRUCTIONS.md)** for a how-to guide. 

**Who to ask:**

| Who | For what |
|---|---|
| Brad Peniston (brad at navybook.com) | Did mid-2026 site upgrade |
| Rafi Pedersen | Server/infrastructure owner — system-level recovery |
| James P | Previously rescued the site after a PHP update broke it |

**Where to go for what:**

- **Making an everyday edit** (text, photos, new page/module) → [`INSTRUCTIONS.md`](INSTRUCTIONS.md) — Part 1 for admin-panel editing, Part 2 for SSH/power-user tasks, including the recurring Update Schedule.
- **What's currently outstanding** → [`TODO.md`](TODO.md) — short-lived by design; expect it to be rewritten fresh as items resolve.
- **Deeper server/ops reference** (environments, security status, gotchas) → [`RUNBOOK.md`](RUNBOOK.md).
- **History of changes** → [`CHANGELOG.md`](CHANGELOG.md) (dated/technical) or [`Changes.md`](Changes.md) (plain language, for team leadership).
- **Why the site exists, who it's for** → [`Why_have_a_website.md`](Why_have_a_website.md) — a discussion guide, best used as a conversation starter.

---

## Quick Context
Working facts for a Claude Code session.

### The site & stack
- Grav **2.0.13** (admin2 **2.0.16**, api **1.0.13**, confirmed 2026-07-31 — drifts via GPM, re-check with `bin/grav --version`), PHP **8.3.31**, nginx 1.18.0, Ubuntu 22.04, on a **dedicated** DigitalOcean droplet.
- Theme: **Mod Quark** (`user/themes/mod-quark/`) — a custom child of stock **Quark** (`user/themes/quark/` = parent, **don't edit it**). Hand-managed, not GPM-managed.
- Custom modular templates: `feature-images`, `icon-menu`, `gallery-draggable`, `gallery-banners`, `gallery-press`, plus modified `text`/`hero` and helper `footer-col` — what each does is in [RUNBOOK.md](RUNBOOK.md) § Architecture reference (or the fuller table in `INSTRUCTIONS.md`'s appendix).
- Images: PHP **gd** + ImageMagick **`convert`**; the **image-intake** plugin sanitizes filenames + shrinks uploads.
- Full environment facts (config deviations, security status, disk): [RUNBOOK.md](RUNBOOK.md) § Environments.

### Repos — and which one deploys to live
Three repos are in play. **One of them changes the live site.**

| Repo | What it is | Touching it deploys? |
|---|---|---|
| `blair-robot-project/robot-grav-site` | **This repo** — hand-curated docs + `archive/` of the pre-2.0 webroot | **No.** Safe to commit freely. |
| `blair-robot-project/robot-grav-site-sync` | Git Sync mirror of live's `user/pages` + `user/themes` | **YES — deploys to robot.mbhs.edu.** |
| `bpeniston/449-website-staging-sync` | Same, for the 449.navybook.com staging site | Staging only. |

- **⚠️ Committing to `robot-grav-site-sync` edits the live site.** The `git-sync` scheduler job runs `0 0 * * *`, and its `sync()` does `git pull --ff -X theirs origin main`, so anything pushed there lands on live at the next midnight — no review step, and nothing warns you at commit time. Push there only when you *intend* a live deploy. (Verify: `sudo -u grav php bin/grav scheduler -d`.)
  - **The disabled webhook does NOT prevent this.** `webhook_enabled: false` only removes the *instant* path; the cron is a second, independent inbound route. "Webhook is off, so the sync repo can't reach live" is a known-wrong conclusion — it has been drawn before.
  - **`direction` does not gate the pull.** In `sync()` the pull is unconditional; `direction: both` only controls whether it *also* pushes. The off switch for inbound is `cron_enable: false`, not `direction`.
  - **`-X theirs` means the remote wins.** A conflicting remote commit doesn't merely land, it overrides the live server's version of that file.
- The theme is **not** in this repo any more — it moved under `archive/` when the docs were imported. Live's authoritative theme is on the server, mirrored to `robot-grav-site-sync`.
- Deploying a theme/plugin change the manual way (rsync + `sudo -u grav`, no Git Sync involved) is in [RUNBOOK.md](RUNBOOK.md) § Git Sync and § How to make a change.
- **A fourth repo, not in the table above, documents staging:** `bpeniston/449-website` (private) is Brad's day-to-day record for 449.navybook.com — its own `CLAUDE.md`/`RUNBOOK.md`/`CHANGELOG.md`, same filenames as this repo's, different content and a different repo. Staging is deliberately kept out of the team-facing workflow here (see the 2026-07-05 → 2026-07-10 CHANGELOG entries below) — it's real, active, and used heavily, just not something INSTRUCTIONS.md should tell a teammate to "try." **Before treating a decision documented in this repo as current, check this repo's own CHANGELOG for a recent one-line pointer** — staging work that bears on live gets flagged here as it happens. No pointer doesn't mean nothing's in flight; it means nothing's been flagged yet.

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

### MCP integration
The live site is reachable from Claude Code via the Grav `api` plugin + a locally-built `grav-mcp` server (built from source at `~/Documents/449/grav-mcp/` — the `getgrav/grav-mcp` npm package isn't published yet). Registered as a project-scoped MCP server:
- **`grav-live`** → `https://robot.mbhs.edu/api`, key generated against **`bradP`** (API keys inherit the full permission set of whichever user generated them).

Tool surface covers pages, media, users, plugins, config, backups, and the scheduler — effectively full admin capability, not just content edits. Keys live only in local Claude Code config, never in this repo.

---

## Links

- **Live site:** https://robot.mbhs.edu (admin: `/admin`)
- **Theme repo:** https://github.com/blair-robot-project/grav-theme-mod-quark
- **Grav CMS docs:** https://learn.getgrav.org
