# FRC Team 449 Website — Runbook
*Last updated: 2026-07-05 · rev 2026-07-05b*

Operational reference for the FRC 449 Grav sites: environment facts, server housekeeping + security status, cautions/gotchas, and key file paths. For the dated history of changes, see **[CHANGELOG.md](CHANGELOG.md)**. For the concise working-context doc to read first, see **[CLAUDE.md](CLAUDE.md)**.

---

## Repository & source of truth

This repo (`blair-robot-project/robot-grav-site`) is the source of truth for site documentation, held at its root.

- **Not a deploy source.** Nothing pulls from this repo to robot.mbhs.edu — no webhooks, no GitHub Actions, no `git pull` on the server. The live site serves local flat files on its own droplet.
- **Not a live content mirror.** The repo's `archive/user/pages/` is a frozen 2026-07-02 snapshot, not a live copy. Live backups run via Grav's own nightly scheduler, on the server itself.
- **Where secrets live:** not in this (public) repo. `CREDENTIALS.md` stays in the original private working repo. Server SSH access, the DigitalOcean console, and site secrets are held by Rafi (infrastructure) and Brad (project lead).

---

## Environments

| | **LIVE** robot.mbhs.edu |
|---|---|
| Role | Production — the only environment |
| Host | DigitalOcean droplet (nyc1), dedicated |
| OS / web server | Ubuntu 22.04, nginx 1.18.0 |
| Grav | **2.0.7** |
| PHP | **8.3** |
| SSH | `ssh USER@robot.mbhs.edu` |
| Grav root | `/srv/robot-grav-site/` |
| Web user:group | `grav:editor` |
| MCP (Claude Code) | `grav-live` → `/api`, key on `bradP` |
| Admin | Admin Next (admin2 + api plugin) |

**Required config deviations from Grav defaults (reapply if the site is ever rebuilt or re-migrated):**
- `pages.markdown.gfm.tagfilter: false` in `system.yaml` — Grav's default GFM tagfilter escapes raw `<iframe>` tags, breaking every YouTube/video embed.
- `text.html.twig` uses `image.height(N).html|raw` — without the `|raw`, Grav 2.0.3+ autoescapes derivative-medium HTML, so text-module images render as literal tag text instead of actual images.
- An `/api/v1/sync` → 403 block in the nginx config — the `api` plugin doesn't implement these routes, and without the 403 they 404-flood and degrade the page editor.
- `image-intake` plugin must be **v0.5.0+** — earlier versions' gallery auto-sync silently stops working once the `api` plugin reaches ~1.0.3 (it now saves the page before firing its update event; v0.5.0 added a hook that handles this correctly).

---

## Server housekeeping — live (robot.mbhs.edu)

**Disk:** 25 GB total, ~63% used, ~9.2 GB free (as of 2026-07-05, after retiring the 1.7 archive and unused PHP-FPM pools — see CHANGELOG).

- [ ] **SSH hardening — partially done.** fail2ban active, root login disabled. **Still open:** `PasswordAuthentication` is still `yes` in `sshd_config` — switching to key-only auth would close the remaining gap (verify a new key login works before disabling).
- [ ] **Grav admin 2FA — still 0 of the active accounts have TOTP enabled.** `/admin` is internet-reachable; enabling 2FA at least on super-admin accounts is the recommended next step.
- [ ] **MariaDB running but apparently unused** (Grav is flat-file; bound to 127.0.0.1). Confirm nothing depends on it, then `sudo systemctl disable --now mariadb` to free resources and reduce surface area.
- [ ] **No Content-Security-Policy header.** Optional defense-in-depth; would need per-page testing before enabling.
- [ ] **(Optional) Restrict `/admin` reachability** — IP-allowlist or HTTP basic-auth in front of it, for defense-in-depth beyond account-level 2FA.

**Already done, no longer open (see CHANGELOG for dates):** nginx TLS/headers/server_tokens hardening; stale-account pruning; nginx blocklist gap that let `user/data/` runtime files leak (fixed); root-level `.md` file disclosure (fixed); ImageMagick MVG/MSL policy hardening; journal size is healthy (56 MB, no vacuum needed); the 1.7 archive, the loopback-only test vhost, and the unused PHP 8.0/8.2-FPM pools have all been retired (2026-07-05).

### Live large-photo upload limits (4-layer config — not in the Grav backup)
Smallest layer wins; all four are raised on live so 9-12 MB phone photos upload successfully:

| Layer | Value | Where |
|---|---|---|
| nginx `client_max_body_size` | 32M | HTTPS server block, `/etc/nginx/sites-available/grav` |
| PHP `post_max_size` | 30M | `.user.ini` at the Grav root |
| PHP `upload_max_filesize` | 25M | same `.user.ini` |
| Grav `system.media.upload_limit` | 25M (26214400) | `user/config/system.yaml` |

`memory_limit` is deliberately left at 128M — `image-intake` resizes via a `convert` subprocess, so this is safe. **`.user.ini` and the nginx setting live outside `user/`, so neither is in the Grav backup** — reapply both if the droplet is ever rebuilt (and clear compiled config after).

---

## Cautions & Gotchas

### OWNERSHIP — the #1 live gotcha
Live site files must be `grav:editor` so the web/admin user can write them. If you create/overwrite files as `USER` (scp, rsync, `>` redirects), `chown` them back: `sudo chown -R grav:editor <paths>` (exclude `.git`). Symptoms of getting it wrong: admin "Failed to save," or a 500 after a plugin operation.

### Protect custom theme blueprints before any theme update
Mod Quark has custom module types (`feature-images`, `icon-menu`, `gallery-draggable`, ...) built on stock Quark. Before any theme update, copy the theme first (`cp -r user/themes/mod-quark user/themes/mod-quark-backup-$(date +%Y%m%d)`), then diff afterward to confirm nothing custom got overwritten.

### Mod Quark is a custom Git repo — not GPM-managed
Not installed through Grav's package manager; `bin/gpm update` may not handle it. Manage manually via SSH/GitHub. **Plugin/Grav GPM updates: only ever as `grav`** (Admin "Update," or `sudo -u grav php bin/gpm update`) — never as `USER`. **Don't remove the `email` plugin** — it's a required admin dependency.

### Update one thing at a time
Update a single plugin/theme, verify it works, then move to the next. Never chain updates — if something breaks, you want to know exactly which change caused it. Take a fresh Grav backup right before any plugin/theme update.

### Portable linking conventions
Any link/image that bakes in the domain, a base path, or a folder's numeric prefix can break if the folder gets renumbered or the site ever moves hosts.
- **Page-media images:** filename only. `![](filename.jpg)`.
- **Shared images** (`user/images/`): `![](/user/images/x.jpg)` — Grav auto-prepends the base for markdown, but **not for raw HTML `<img src>`** — for raw HTML, add `process: { twig: true }` and use `src="{{ base_url }}/user/images/x.jpg"`.
- **Internal page links:** root-relative, no domain — `[text](/about-us/leadership)`.
- **Frontmatter URLs rendered via Twig** (e.g. `icon-menu`/`feature-images` `url:` values): Grav does **not** auto-prepend the base to these — the template must (`icon-menu`/`feature-images` already do). Any new module emitting a frontmatter URL through Twig needs the same treatment.

### Notes & comments conventions
Grav has no dedicated notes field. House conventions:
- **Every new folder/page/module** starts its Content field with `[//]: # (CommentsGoHere)` — a blueprint default (`mod-quark/blueprints/default.yaml`) that every page/module inherits via `@extends: default`. Replace with a real note when there is one.
- **A note a teammate should see** → `[//]: # (your note here)` in Content — renders nothing, visible in the editor.
- **A "how this folder works" note** → a sidecar `_NOTES.md` file (Grav ignores non-template files).
- **Avoid `<!-- HTML comments -->`** for anything non-trivial — unlike `[//]: #`, they ship in the rendered HTML source.

### Rollback options (live)
- **Primary: Grav's own nightly scheduled backup** (7-copy rotation, `backup/` folder) — `php bin/grav restore <zip>`, then `php bin/grav clearcache`.
- **Admin-panel changes** (plugin/theme config) can usually be reverted through the admin panel — the safest option.
- **Do not attempt PHP/system-level rollbacks yourself** — contact Rafi Pedersen for that level of recovery.

---

## Lessons for a future platform migration

The 1.7 to 2.0 migration (completed 2026-06-27) is done and its environment-specific detail has been retired along with the 1.7 archive itself. The durable lessons, if a future migration ever happens:

- **Parallel-build-then-swap beats an in-place upgrade** on a production box: build and fully test the new version on a copy with zero visitor impact, then cut over via a directory swap (fast, trivially reversible) rather than upgrading in place.
- **A migration/distribution tool that swaps in a "fresh" install can silently drop non-distribution files** sitting at the docroot root (upload-limit configs, `robots.txt`, verification files, `.git`) — anything outside the tool's own file manifest. Inventory and re-copy these explicitly; don't assume they survive.
- **Verify rendered behavior, not just HTTP 200s.** Version-skew between a test copy and a fresh install pulled by a migration tool can introduce regressions that only show up by actually looking at pages with images/embeds, not by checking status codes.
- **New installs created by migration tooling may have different default file ownership** than the established convention — check and fix before deploying custom carry-forward files into them.
- **Get a full site backup and confirm it off-server before starting**, and keep the pre-migration environment available for a real soak period (roughly a week) before removing it — but do actually remove it once the soak period is over, rather than let it linger indefinitely as silent disk/attack-surface debt.

---

## Key File Paths Reference

| What (live `/srv/robot-grav-site/`) | Path |
|------|------|
| Active theme CSS | `user/themes/mod-quark/css/` |
| Theme blueprints (custom modules) | `user/themes/mod-quark/blueprints/` |
| Theme config | `user/config/themes/mod-quark.yaml` |
| System / site config | `user/config/system.yaml`, `user/config/site.yaml` |
| Plugin configs | `user/config/plugins/` |
| User accounts | `user/accounts/` |
| Page content | `user/pages/` |
| Grav CLI / package manager | `bin/grav`, `bin/gpm` (run as grav: `sudo -u grav php bin/grav ...`) |
| Cache-bust version | `?v=NN` in `templates/partials/base.html.twig` |
| PHP config (live) | `/etc/php/8.3/fpm/php.ini` |
| nginx config (live) | `/etc/nginx/sites-available/grav` |

---

## Source Site Reference (live)

- **Live site / admin:** https://robot.mbhs.edu - https://robot.mbhs.edu/admin
- **Theme GitHub:** https://github.com/blair-robot-project/grav-theme-mod-quark
- **Server:** Ubuntu 22.04 LTS, nginx 1.18.0, PHP 8.3 FPM
- **Grav:** **2.0.7**, Admin Next (admin2 + api plugin)
- **Site admin contact:** Rafi Pedersen — see CREDENTIALS.md

---

## People & Roles

| Person | Role |
|--------|------|
| Rafi Pedersen | Site admin, server/infrastructure owner. Contact for live-server system-level recovery. |
| Brad (comms@navybook.com) | Project lead. Editor + Onboarder + Admin on live; super-admin access. SSH access to the live server. |
| James P | Previously rescued the site after a PHP update broke it — reference for system-level issues. |

---

## Standing constraint — BlairMdITC font (license-gated, OFF)

`custom.css` has BlairMdITC's `@font-face` and the `h1` font-family rule **commented out**. The font is a commercial ITC/Monotype **desktop** font — a desktop license doesn't cover web `@font-face` serving. **Future improvement, not currently planned:** if the team ever wants to enable it, purchase an ITC Blair Medium **webfont** license (MyFonts/Monotype, ~$30-60 lowest tier; register to the team, keep the receipt/EULA), then uncomment the two spots and ship the font files to `user/themes/mod-quark/fonts/`.
