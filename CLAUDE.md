# CLAUDE.md — FRC Team 449 Website
*Last updated: 2026-07-05 · rev 2026-07-05a*

Working context for changes to this site (theme / templates / CSS / content). Read this first; ask to read a specific file before editing it.


> **Source of truth:** this repo (`blair-robot-project/robot-grav-site`) holds all of Team 449's site documentation at its root and is authoritative — check it first. It is documentation plus a historical `archive/` snapshot, not a deploy source (nothing pulls from it to the live site) and not a live content mirror (the old nightly `backup.sh` git-push was retired 2026-07-02 in favor of Grav's own scheduler backups running on the server). Secrets are not in this repo — they're held by Rafi (infrastructure) and Brad (project lead).

## The site
- **FRC Team 449** ("The Blair Robot Project"), Montgomery Blair HS robotics team.
- **Grav CMS** (flat-file, no database), live at **http://robot.mbhs.edu**.
- One **dedicated** DigitalOcean droplet runs only this site.

## Stack
- Grav **2.0.7** (Admin Next/admin2 SPA + api plugin), PHP **8.3.31** (web-FPM + CLI), nginx 1.18.0, Ubuntu 22.04, **2 GB swap**.
- Theme: **Mod Quark** (`user/themes/mod-quark/`) — a custom child of stock **Quark** (`user/themes/quark/` = parent, **don't edit it**). Mod Quark is hand-managed, not GPM-managed.
- Images: PHP **gd** + the ImageMagick **`convert`** binary. The custom **image-intake** plugin sanitizes filenames + shrinks photos on upload (per-template max widths, set in Admin → Plugins → Image Intake).

## Access & the ownership rule
- SSH **`ssh USER@robot.mbhs.edu`**; Grav root **`/srv/robot-grav-site/`**. Admin at `/admin`.
- **SSH hardened (2026-06-16):** root login disabled (log in as a normal user, then `sudo`); **fail2ban** bans an IP after repeated failed logins (don't lock yourself out testing — unban: `sudo fail2ban-client set sshd unbanip <IP>`; thresholds in CREDENTIALS.md). Password auth is still on (key-only is the optional next step). **Recovery / DO console:** the **DigitalOcean web console** logs in as any non-root user (then `sudo`) — so DO-dashboard access is root-equivalent, meaning the **DO account needs a strong password + 2FA**.
- Web + admin run as user **`grav`** (primary group **`editor`**). `USER` is in `sudo` + `editor`.
- **🔑 OWNERSHIP — the #1 gotcha:** site files must be **`grav:editor`** so the web/admin user can write them. If you create/overwrite files as `USER` (scp, rsync, `>` redirects), **`chown` them back**: `sudo chown -R grav:editor <paths>` (exclude `.git` — its index is root-owned for the backup cron). Symptoms of getting it wrong: admin **"Failed to save"**, or a 500 after a plugin op.

## Key paths (under `/srv/robot-grav-site/`)
| What | Path |
|---|---|
| Custom CSS | `user/themes/mod-quark/css/custom.css` |
| Templates | `user/themes/mod-quark/templates/` (`templates/modular/`, `templates/partials/`) |
| Blueprints (module field defs) | `user/themes/mod-quark/blueprints/` |
| Cache-bust version | `?v=NN` in `templates/partials/base.html.twig` |
| Content | `user/pages/` |
| System / plugin config | `user/config/system.yaml`, `user/config/plugins/` |
| Grav CLI | `bin/grav` — run as grav: `sudo -u grav php bin/grav …` |

## MCP integration
The live site is reachable from Claude Code via the Grav `api` plugin + a locally-built `grav-mcp` server (the `getgrav/grav-mcp` npm package isn't published yet, so it's built from source at `~/Documents/449/grav-mcp/`). Registered as a project-scoped Claude Code MCP server:
- **`grav-live`** → `https://robot.mbhs.edu/api`, key generated against **`bradP`** (live's generic `admin` account is disabled — see account roster history; API keys inherit the full permission set of whichever user they're generated against, so `bradP`'s super-admin access applies here).

Tool surface covers pages, media, users, plugins (GPM), config, backups, and the scheduler — effectively full admin capability, not just content edits. Keys live only in local Claude Code config (`--env GRAV_API_KEY=...`), never in this repo.

## Mod Quark templates that exist
Modular (`templates/modular/NAME.html.twig`):
- **feature-images** — image grid, optional per-item link + lightbox; resolves images via `page.media`.
- **icon-menu** — icon + label + link "nav cards" (frontmatter key stays `features:`).
- **gallery-draggable** — photo gallery; display order = the admin Page-Media drag order (`page.media.images`); click → lightbox.
- **text**, **hero** — lightly customized standards. **footer-col** — minimal footer-column wrapper.

Partials: **base** (head/scaffold + the `?v=` cache-bust), **footer** (renders the `/footer` page's modules), **lightbox** (no-JS clickable thumbnail), **error** (the branded 404).

## How to make a change
1. **Back up** anything risky: `sudo -u grav php bin/grav backup` (zip → `backup/`), or `cp x x.bak-$(date +%Y%m%d-%H%M%S)`.
2. **Edit** as `grav`, or as `USER` then `chown` back (see ownership rule).
3. **CSS:** edit `custom.css` **and bump `?v=NN`** in `base.html.twig`, or browsers serve the old stylesheet.
4. **Clear cache** when structure/templates change: `sudo -u grav php bin/grav cache` (or Admin → Tools → Clear Cache). If you write files with *old* timestamps, Grav may serve a stale render — give them current mtimes or clear cache.
5. **Verify:** `curl -s -o /dev/null -w "%{http_code}\n" https://robot.mbhs.edu/<path>`; check images resolve; `tail logs/grav.log` — **fatals / CRITICAL matter; PHP-8.x deprecation NOTICEs are normal and harmless.**

## Lessons that bite
- **A custom modular template NEEDS a matching blueprint.** New `templates/modular/NAME.html.twig` requires `blueprints/modular/NAME.yaml` (`@extends: default`), or the admin **silently overwrites your template** to a stock type when the module is saved. (Why feature-images / icon-menu / gallery-draggable each have one.)
- **Link portability — never hardcode paths.** Internal links: **root-relative** (`/about-us/leadership`), never the full domain. Page-media images: **filename only** (`![](photo.jpg)`) so a folder's numeric prefix can change without 404ing. Frontmatter **`url:` values rendered through Twig** (icon-menu / feature-images items) are **not** auto-base-prefixed — the template must prepend `{{ base_url }}` for root-relative values (existing menu templates already do).
- **Admin `</>` raw-source toggle is broken** — you can't edit frontmatter via the WYSIWYG. Use SSH (or admin Expert Mode) for frontmatter; normal body text edits in the WYSIWYG work fine.
- **Plugin / Grav updates: GPM only ever as `grav`** — Admin → Plugins "Update" button, or `sudo -u grav php bin/gpm update`. **Never as `USER`** (it half-installs and breaks admin). **Don't remove the `email` plugin** — it's a *required admin dependency* (admin 500s without it), even though the site has no Grav forms (contact is `mailto:` links).
- **Uploads:** image-intake auto-shrinks on upload. Size limits are already set (~25–32M) across nginx `client_max_body_size`, `/srv/robot-grav-site/.user.ini`, and Grav `system.media.upload_limit`; `memory_limit` is 128M (resize runs in the `convert` subprocess, so it's safe).
- **Fonts: BlairMdITC is license-gated and currently OFF** — its `@font-face` + the `h1` font-family are commented out in `custom.css` and the font files are **not** shipped. Don't enable it without a purchased **webfont** license (a desktop license doesn't cover web serving).
- **In-content notes use `[//]: # (...)`** (emits nothing, not even in HTML — unlike `<!-- -->`, which ships). New folders/pages/modules auto-prefill Content with `[//]: # (CommentsGoHere)` via a blueprint default; replace it with a real note when there is one.
- **Only edit `mod-quark`, never the parent `quark` theme.**
- **Grav `api` plugin keys: paste only the bare `grav_...` token.** Generating a key (`bin/plugin api keys:generate`) prints a line like `API Key: grav_...`; copying more than the token itself into a `claude mcp add --env GRAV_API_KEY=...` command splits on the extra words and silently corrupts the registered command's args. Select just the token (double-click it) before pasting.
