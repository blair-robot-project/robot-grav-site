# FRC Team 449 Website — Runbook
*Last updated: 2026-07-19*

Operational reference for the FRC 449 Grav site: environment facts, server housekeeping + security status, cautions/gotchas, and key file paths. For dated history of changes, see [CHANGELOG.md](CHANGELOG.md). For orientation, who's involved, and the doc to start a Claude Code session with, see [README.md](README.md).

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
| Grav | **2.0.9** (admin2 **2.0.13**) — confirmed via `bin/grav --version` 2026-07-10; drifts via GPM, re-check before trusting |
| PHP | **8.3** |
| SSH | `ssh USER@robot.mbhs.edu` |
| Grav root | `/srv/robot-grav-site/` |
| Web user:group | `grav:editor` |
| MCP (Claude Code) | `grav-live` → `/api`, key on `bradP` |
| Admin | Admin Next (admin2 + api plugin) |

**Required config deviations from Grav defaults** (reapply if the site is ever rebuilt or re-migrated):
- `pages.markdown.gfm.tagfilter: false` in `system.yaml` — Grav's default GFM tagfilter escapes raw `<iframe>` tags, breaking every YouTube/video embed.
- `text.html.twig` uses `image.height(N).html|raw` — without the `|raw`, Grav 2.0.3+ autoescapes derivative-medium HTML, so text-module images render as literal tag text instead of actual images.
- An `/api/v1/sync` → 403 block in the nginx config — the `api` plugin doesn't implement these routes, and without the 403 they 404-flood and degrade the page editor.
- `image-intake` plugin must be **v0.5.0+** — earlier versions' gallery auto-sync silently stops working once the `api` plugin reaches ~1.0.3 (it now saves the page before firing its update event; v0.5.0 added a hook that handles this correctly).

---

## Access & Ownership

- **SSH hardened (2026-06-16):** root login disabled (log in as a normal user, then `sudo`); **fail2ban** bans an IP after repeated failed logins (don't lock yourself out testing — unban: `sudo fail2ban-client set sshd unbanip <IP>`; thresholds in CREDENTIALS.md). Password auth is still on (key-only is the optional next step). **Recovery / DO console:** the DigitalOcean web console logs in as any non-root user (then `sudo`) — so DO-dashboard access is root-equivalent, meaning the DO account needs a strong password + 2FA.
- Web + admin run as user `grav` (primary group `editor`). `USER` is in `sudo` + `editor`.
- **OWNERSHIP — the #1 gotcha.** Site files must be `grav:editor` so the web/admin user can write them. If you create/overwrite files as `USER` (scp, rsync, `>` redirects), `chown` them back: `sudo chown -R grav:editor <paths>` (exclude `.git` — its index is root-owned for the backup cron). Symptoms of getting it wrong: admin "Failed to save," or a 500 after a plugin op.

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

## Architecture reference

**Modular templates** (`templates/modular/NAME.html.twig`):
- **feature-images** — image grid, optional per-item link + lightbox; resolves images via `page.media`.
- **icon-menu** — icon + label + link "nav cards" (frontmatter key stays `features:`).
- **gallery-draggable** — photo gallery; display order = the admin Page-Media drag order (`page.media.images`); click → lightbox.
- **gallery-banners** — single shrink-to-fit row, no lightbox, no rendered title; same `page.media.images`-order pattern as gallery-draggable. Home page's 13-banner Blue Alliance trophy history (added 2026-07-10, ported from staging same day). Each banner can optionally link to its real thebluealliance.com event page via an admin-editable `banner_links` field (image + URL per row, in the module's "Banners" tab) — verify new links against the real TBA API, not guesses (key in `bpeniston/449-website`'s `CREDENTIALS.md`).
- **text**, **hero** — lightly customized standards. **footer-col** — minimal footer-column wrapper.

**Partials:** base (head/scaffold + the `?v=` cache-bust), footer (renders the `/footer` page's modules), lightbox (no-JS clickable thumbnail), error (the branded 404), **announcements** (site-wide dismissible announcement bar, added 2026-07-09, renamed from `banners` 2026-07-19 to disambiguate from the `gallery-banners` module above — see below).

**Admin-editable "list" data pages** (not modules — a single hidden page with a repeating list field, for content that's a growing collection rather than a one-off block): **sponsors-data** (sponsor roster, synced from a Google Sheet via webhook) and **announcements-data** (announcements — title/message/link/color/pages/dates per entry, see `INSTRUCTIONS.md` §5). Both read via `page.find(route, true)` from the template that needs them, not the `pages` global — non-routable pages aren't visible to `pages.find()` in this Twig build.

**Images:** PHP gd + the ImageMagick `convert` binary. The custom image-intake plugin sanitizes filenames + shrinks photos on upload (per-template max widths, set in Admin → Plugins → Image Intake).

A fuller template reference (including page-level templates and admin-selectability) lives in `INSTRUCTIONS.md`'s appendix.

---

## Cautions & Gotchas

- **Only edit `mod-quark`, never the parent `quark` theme.** Mod Quark (`user/themes/mod-quark/`) is a custom child of stock Quark (`user/themes/quark/`).
- **A custom modular template needs a matching blueprint.** New `templates/modular/NAME.html.twig` requires `blueprints/modular/NAME.yaml` (`@extends: default`), or the admin **silently overwrites your template** to a stock type when the module is saved. (Why feature-images / icon-menu / gallery-draggable each have one.)
- **Protect custom theme blueprints before any theme update.** Copy the theme first (`cp -r user/themes/mod-quark user/themes/mod-quark-backup-$(date +%Y%m%d)`), then diff afterward to confirm nothing custom got overwritten.
- **Mod Quark is a custom Git repo — not GPM-managed.** Not installed through Grav's package manager; `bin/gpm update` may not handle it. Manage manually via SSH/GitHub. **Plugin/Grav GPM updates: only ever as `grav`** (Admin "Update," or `sudo -u grav php bin/gpm update`) — never as `USER` (it half-installs and breaks admin). **Don't remove the `email` plugin** — it's a required admin dependency (admin 500s without it), even though the site has no Grav forms (contact is `mailto:` links).
- **Update one thing at a time.** Update a single plugin/theme, verify it works, then move to the next. Never chain updates — if something breaks, you want to know exactly which change caused it. Take a fresh Grav backup right before any plugin/theme update.
- **Link portability — never hardcode paths.**
  - Page-media images: filename only. `![](filename.jpg)`.
  - Shared images (`user/images/`): `![](/user/images/x.jpg)` — Grav auto-prepends the base for markdown, but **not** for raw HTML `<img src>` — for raw HTML, add `process: { twig: true }` and use `src="{{ base_url }}/user/images/x.jpg"`.
  - Internal page links: root-relative, no domain — `[text](/about-us/leadership)`.
  - Frontmatter URLs rendered via Twig (e.g. `icon-menu`/`feature-images` `url:` values): Grav does **not** auto-prepend the base to these — the template must (existing menu templates already do). Any new module emitting a frontmatter URL through Twig needs the same treatment.
- **Admin `</>` raw-source toggle is broken** — you can't edit frontmatter via the WYSIWYG. Use SSH (or admin Expert Mode) for frontmatter; normal body text edits in the WYSIWYG work fine.
- **Notes & comments conventions.** Grav has no dedicated notes field:
  - Every new folder/page/module starts its Content field with `[//]: # (CommentsGoHere)` — a blueprint default (`mod-quark/blueprints/default.yaml`) every page/module inherits via `@extends: default`. Replace with a real note when there is one.
  - A note a teammate should see → `[//]: # (your note here)` — renders nothing, visible in the editor.
  - A "how this folder works" note → a sidecar `_NOTES.md` file (Grav ignores non-template files).
  - Avoid `<!-- HTML comments -->` for anything non-trivial — unlike `[//]: #`, they ship in rendered HTML.
- **Uploads:** image-intake auto-shrinks on upload. Size limits are already set across all 4 layers (see Server Housekeeping above); `memory_limit` is 128M (resize runs in the `convert` subprocess, so it's safe).
- **Grav `api` plugin keys: paste only the bare `grav_...` token.** Generating a key (`bin/plugin api keys:generate`) prints a line like `API Key: grav_...`; copying more than the token itself into a `claude mcp add --env GRAV_API_KEY=...` command splits on the extra words and silently corrupts the registered command's args. Select just the token (double-click it) before pasting.
- **Creating a brand-new theme file over SSH needs one `sudo` step first.** An SSH account that's only in the `editor` group (not `grav` itself) can edit *existing* `664` files fine, but the theme directories aren't group-writable, so it can't create a new file directly. Fix: `sudo -u grav touch <path> && sudo chmod 664 <path>` once, then write the content over plain SSH/SCP — no further `sudo` needed. The `api` plugin's `upload_blueprint_file`/`blueprint-upload` endpoint looked like a no-sudo alternative (it runs as `grav`) but explicitly rejects `.yaml` destinations for security (`grav.log`: "File extension '.yaml' is not allowed for security reasons") — it's scoped to actual blueprint-referenced uploads (images etc.), not general-purpose file creation. Used this pattern to deploy the announcements feature's new files (2026-07-09).
- **Admin Next's `list` blueprint field has no per-item styling or multi-field summary hooks.** `collapsed: true` on the field is a real, supported option (rows load collapsed to one line instead of always-expanded — worth setting once a list is expected to grow). But the collapsed row's label is hardcoded client-side to "the first non-empty string field's value" — no config for color-coding rows by a field value, or combining multiple fields into the summary. Confirmed by reading the compiled admin2 JS bundle (`user/plugins/admin2/app/_app/immutable/chunks/*.js`); there's also no `custom_css`/`custom_js` injection point for this SPA (unlike the classic admin plugin's `onAdminCss` hook, which doesn't apply since admin2 is a separately-built static app, not Twig-rendered). Workaround: put whatever you want visible collapsed into the first field itself (e.g. dates folded into a title field) rather than expecting it to be computed.
- **A fixed-position `#header` needs deliberate top-offset handling for anything inserted above the hero.** See `INSTRUCTIONS.md` §11 for the specific rule (`position: absolute` + explicit `top`, never `margin-top`/normal flow) — pushing the hero down to make room breaks the header's see-through look, since it depends on the hero rendering directly behind it.
- **The `grav-live`/`grav-staging` `api` plugin can be called directly over plain HTTP, without Claude Code or MCP at all** — useful when something needs to run on a schedule/machine Claude Code itself can't cover (e.g. a 24/7 always-on box that isn't this laptop). Base URL `https://<host>/api/v1`, header `X-API-Key: <key>` (same key already registered for the MCP connector), `GET`/`PATCH /pages/{route}` (send `If-Match: <etag>` from a prior `GET` for optimistic concurrency). **`header` fields — including list-type fields — are replaced wholesale on `PATCH`, not deep-merged element-by-element:** round-trip the *whole* list back if only one entry actually changed, or the others get silently wiped. Full contract: `~/Documents/449/grav-mcp/src/client/grav-client.ts` in the `grav-mcp` connector's own source. First used 2026-07-11 for a standalone TBA-driven banner-update script running off this repo's server entirely (see CHANGELOG) — that script also hit a Cloudflare block on the *TBA* side (not Grav's): TBA's WAF rejects Python's default `urllib` User-Agent (403), fixed by sending a `curl`-like one. **Stale after the 2026-07-19 announcements rename:** that script (`~/robojawn-449-banner/banner_watch.py` on Brad's Air, dormant since its bounded July 11–12 event window closed) hardcodes the old `/pages/banners-data` route and `banners` header field — it 404s as-is and needs updating to `/pages/announcements-data`/`announcements` before any future reuse.
- **AppleScript/iMessage automation from a headless Mac needs an unlocked, actively logged-in GUI session — the process running isn't enough.** `tell application "Messages" to send ...` hung with `AppleEvent timed out (-1712)` when the target Mac's screen was locked, even though Messages/`imagent` were already running; confirmed via a failed `screencapture` ("could not create image from display"). Unlocking the screen (and approving the one-time Automation permission prompt) fixed it immediately. Used for the RoboJAWN banner watcher's text-on-update feature (2026-07-11, see CHANGELOG) — if the screen re-locks, texts silently stop while whatever else the automation does keeps working.
- **Grav's `Medium::html()` puts `$title` before `$alt`** — full signature `html($title = null, $alt = null, $class = null, $id = null, $reset = true)`. Easy to get backwards: most people instinctively expect alt first, since it's the attribute that actually matters for accessibility/SEO, title is just a tooltip. Pass one positional arg meaning it as alt text and it silently lands in `title` instead, leaving `alt=""`. This is Grav behaving correctly and as documented, not a bug — confirmed against Grav's own core source and a closed upstream issue (`getgrav/grav#1253`) establishing that Grav can't invent alt text for you, so it deliberately emits valid-but-empty `alt=""` when nothing is passed rather than guessing. Bit three separate Mod Quark templates this way before a full-site alt-text audit caught and fixed all of them (`gallery-banners.html.twig`, `gallery-draggable.html.twig`, `text.html.twig`; 2026-07-18/19, see CHANGELOG). **Any new image-rendering template: pass both, explicitly, in order** — `image.html(alt_text, alt_text)` sidesteps the ordering risk entirely by using the same value for both.

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

## Draft — Mod Quark -> Quark 2 migration plan (not started, come back to this)

**Status: draft only, filed 2026-07-21. Nothing here has been executed - revisit when there is a between-events window, not mid-season.** Companion to the "Open decision" section above; this is the concrete parallel-build-then-cutover plan for whenever the team decides to act on it.

**Strategy:** same pattern as the 1.7->2.0 core migration - parallel build, verify, then cut over. Never an in-place theme swap on live.

### Phase 0 - Recon and backup (no live changes)
- [ ] Confirm current Grav/admin2/API versions, take a full site backup first.
- [ ] Inventory everything non-stock in Mod Quark: templates (`icon-menu`, `feature-images`, `gallery-draggable`, `gallery-banners`, `footer-col`), partials (`base`, `footer`, `lightbox`, `banners`, `logo`), `error.html.twig` overrides, all of `custom.css`, the `sponsors-data`/`banners-data` pages, the disabled BlairMdITC `@font-face` block.

### Phase 1 - Stand up the parallel copy
- [ ] `sudo cp -a` live to a parallel path, loopback-only test vhost (SSH tunnel only, never public) - same as the 2.0 core migration.
- [ ] Install Quark 2 via GPM on the copy only.
- [ ] New child theme `user/themes/mod-quark-2/` inheriting Quark 2, same inheritance pattern Mod Quark uses today for Quark 1.
- [ ] Point the copy's `pages.theme` at `mod-quark-2` and confirm it renders as stock Quark 2 before porting anything.

### Phase 2 - Port each piece, one at a time
- [ ] `icon-menu` - Font Awesome 7 icon-name check, base-path-safe links.
- [ ] `feature-images` - grid/lightbox markup re-based on Quark 2 classes; `page.media` logic is theme-agnostic, should port cleanly.
- [ ] `gallery-draggable` / `gallery-banners` - the admin2 `list`-field drag-reorder logic is independent of the theme; only front-end grid CSS needs re-basing.
- [ ] `footer-col`, footer partial and `/footer` page - check whether Quark 2 ships its own configurable footer before assuming we still need ours.
- [ ] Banners partial and `banners-data` - restyle per-entry colors as Blades variables if we want them to respect dark mode.
- [ ] `logo.html.twig` (449 wordmark + wrenchman SVG) - re-check against Quark 2's sticky/animated header.
- [ ] `error.html.twig` - re-derive the spacing fixes against Quark 2's own error template/variables rather than copying the old Quark-1/Spectre-specific overrides verbatim.
- [ ] Full `custom.css` audit, rule by rule: delete what Quark 2 already handles, convert what can become a `--pico-*`/Blades variable override, keep only what's genuinely bespoke (`.navbar-449`, gallery caption centering, etc).
- [ ] Carry the disabled BlairMdITC `@font-face` block forward as-is - still license-gated.
- [ ] Confirm the `?v=NN` cache-bust mechanism still applies the same way under Quark 2's asset pipeline.
- [ ] While in here: turn on an accent-color config (449 red) and decide whether to expose auto/light/dark mode or pin to light-only.

### Phase 3 - Verify (still not public)
- [ ] `curl` sweep of every page, not just the homepage.
- [ ] Eyeball image-bearing pages, not just status codes (bit us once already during the 2.0 core migration).
- [ ] Admin2 pass: sign in, edit one page of each custom module type, confirm Save and content-seed still work.
- [ ] Re-test gallery drag-reorder.
- [ ] `grav.log` clean.
- [ ] Screenshot comparison vs current live, desktop and mobile.

### Phase 4 - Cutover
- [ ] Low-traffic overnight window, fresh backup first.
- [ ] Directory swap (not in-place), same as the 2.0 core cutover.
- [ ] Re-run the Phase 3 checklist against the public URL.
- [ ] Confirm `.git`, `backup.sh`, `.user.ini`, `robots.txt`, the GSC file, and the `/api/v1/sync` 403 block all survived the swap.

### Phase 5 - Soak and cleanup
- [ ] Keep the Quark-1 archive about 1 week before removing anything.
- [ ] Update this doc's Key File Paths / Architecture reference for the new theme.
- [ ] Close out the "Open decision" section above and log the outcome in CHANGELOG.
- [ ] Retire the old `mod-quark` and Quark 1 parent theme directories.

**Rollback:** the Phase 4 directory swap makes rollback a one-line `mv` back to the archived Quark-1 tree - same as every other cutover on this site.

**Effort:** closer in scope to the Grav 2.0 core migration than a routine CSS tweak - five templates plus a full `custom.css` audit. Plan for a between-events window, not mid-season.

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

## People & Roles

| Person | Role |
|--------|------|
| Rafi Pedersen | Site admin, server/infrastructure owner. Contact for live-server system-level recovery. |
| Brad (comms@navybook.com) | Project lead. Editor + Onboarder + Admin on live; super-admin access. SSH access to the live server. |
| James P | Previously rescued the site after a PHP update broke it — reference for system-level issues. |

---

## Standing constraint — BlairMdITC font (license-gated, OFF)

`custom.css` has BlairMdITC's `@font-face` and the `h1` font-family rule **commented out**. The font is a commercial ITC/Monotype **desktop** font — a desktop license doesn't cover web `@font-face` serving. **Future improvement, not currently planned:** if the team ever wants to enable it, purchase an ITC Blair Medium **webfont** license (MyFonts/Monotype, ~$30-60 lowest tier; register to the team, keep the receipt/EULA), then uncomment the two spots and ship the font files to `user/themes/mod-quark/fonts/`.
