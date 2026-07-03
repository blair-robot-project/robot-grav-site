# CLAUDE.md — FRC Team 449 Website

Working context for changes to this site (theme / templates / CSS / content). Read this first; ask to read a specific file before editing it.

## The site
- **FRC Team 449** ("The Blair Robot Project"), Montgomery Blair HS robotics team.
- **Grav CMS** (flat-file, no database), live at **http://robot.mbhs.edu**.
- One **dedicated** DigitalOcean droplet runs only this site.
- **Staging** is **https://449.navybook.com** (Grav **2.0**, DreamHost subdomain) — test changes there first. *(The old navybook.com/449 staging clone was retired June 2026; 449.navybook.com is a verified superset and is now the sole staging site.)*

## Stack
- Grav **2.0.3** (admin2 SPA + api plugin), PHP **8.3.31** (web-FPM + CLI; cut over from 8.2 on 2026-06-15), nginx 1.18.0, Ubuntu 22.04, **2 GB swap**. *(Live **cut over from Grav 1.7.53 to 2.0.3 on 2026-06-27** via the proven parallel-build → directory-swap; the 1.7 tree is preserved at `/srv/robot-grav-site-1.7-archive` for one-command rollback. Staging at 449.navybook.com is also Grav 2.0.3 — but on **Apache** vs. live's **nginx**, which matters for access rules: nginx ignores Grav's bundled `.htaccess`, so live's `user/`-folder denies live in the hand-maintained vhost. See RUNBOOK "Live → Grav 2.0 migration".)*
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
