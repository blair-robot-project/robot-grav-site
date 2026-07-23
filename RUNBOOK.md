# FRC Team 449 Website — Runbook
*Last updated: 2026-07-22*

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

**Admin-editable "list" data pages** (not modules — a single hidden page with a repeating list field, for content that's a growing collection rather than a one-off block): **sponsors-data** (sponsor roster, synced from a Google Sheet via webhook) and **announcements-data** (announcements — title/message/link/color/pages/dates per entry, see `INSTRUCTIONS.md` §5). Both read via `page.find(route, true)` from the template that needs them, not the `pages` global — non-routable pages aren't visible to `pages.find()` in this Twig build. **`sponsors-data` is staging-only (449.navybook.com)** — built and working there, but deliberately not yet deployed to live, pending a decision from the team's business side on whether/when to bring it over (confirmed with Brad 2026-07-22). `announcements-data` is live on both.

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

**Status: filed 2026-07-21, Phases 0-2 done 2026-07-22. Phase 3 (verify) checklist fully worked through 2026-07-22/23** - admin2 pass, gallery drag-reorder retest, full `curl` sweep (70/70 pages), image eyeball pass (301 images checked, 0 real breakage), and desktop **and** mobile live-vs-copy screenshot comparisons are all done. Surfaced: 2 real regressions fixed (header-dark whitelist, header position), 1 more real regression found but not yet fixed (mobile banner/title overlap - same root cause as the deferred nav/hero typography item below), and 2 pre-existing bugs confirmed unrelated to the migration (gallery-banners admin drag, admin2 thumbnail previews). **Only remaining Phase 3 work is the deferred nav/hero typography fix**, which should resolve the mobile overlap too. Phase 4 (cutover) not started. This is the concrete parallel-build-then-cutover plan for whenever the team decides to act on it.

**Read this before touching Phase 3+:**
- **The test copy's ownership is `brad:editor`, not `grav:editor`.** Deliberate, for Phase 1/2 iteration speed (no sudo per file edit) - but admin2 (PHP-FPM, running as `grav`) needs write access for Phase 3's save-test pass. Flip back with `sudo chown -R grav:editor /srv/robot-grav-site-quark2` before starting Phase 3, and re-apply the `chmod -R g+w` on `cache/logs/tmp/images/assets/user/{accounts,data,config,pages}` afterward if ownership ever moves again - Grav's Problems plugin will show a "not writeable" diagnostic page instead of the site if this is missed (cost real time twice this session).
- **`javascript_exec`-based `getComputedStyle()`/`getBoundingClientRect()` reads were unreliable all session** in the Browser tool - they returned stale/cached values after a DOM mutation, confirmed by testing with an inline `!important` style that provably worked (visible in a screenshot, invisible to a JS read moments later, on a brand-new tab). **Screenshots are the only visual verification trusted this session.** Don't waste time chasing a "bug" that only shows up via a JS style read - check with a screenshot first.
- **`custom.css` needs its cache-bust version bumped by hand on every edit** (`theme://css/custom.css?v=N` in `base.html.twig`) - it's served `Cache-Control: immutable, max-age=1yr`, so without a version bump, browsers (including whoever is checking the tunnel) silently keep serving the pre-edit copy. Currently at `v=11`.
- **The Phase 0 backup (`default_site_backup--20260722071456.zip`) still hasn't been copied off-server** - Brad's doing this manually next time he's on non-cellular wifi, not blocking anything.

**Read this before touching `custom.css` or any Blades-based template again:**
- **Blades' `.columns` class is CSS multi-column *text* layout** (`columns: 25ch auto`), not a flex/grid row like Spectre's `.columns`/`.column`. Every grid module (`icon-menu`, `feature-images`, `text`/year-modules) needed `columns: unset; display: flex; flex-wrap: wrap;` re-added, scoped per module, to avoid clobbering Quark 2's own use of real multi-column layout elsewhere.
- **Blades has no global `box-sizing: border-box` reset** the way Spectre did - percentage-width columns with padding silently overflow their container and wrap onto a new line instead of sitting side by side. Added `box-sizing: border-box` explicitly wherever percentage widths + padding combine.
- **Quark 1 and Quark 2 use different scroll-detection mechanisms**: Quark 1's JS toggles `.scrolled` on `#header` itself; Quark 2's toggles it on `<body>`. Any old `#header:not(.scrolled)`-style selector ported verbatim will silently never detect scroll under Quark 2 - rewrite as `body...:not(.scrolled) #header`.

**Strategy:** same pattern as the 1.7->2.0 core migration - parallel build, verify, then cut over. Never an in-place theme swap on live.

### Phase 0 - Recon and backup (no live changes) — done 2026-07-22
- [x] Confirm current Grav/admin2/API versions, take a full site backup first. **Live:** Grav 2.0.12, Admin2 2.0.15, API 1.0.12, PHP 8.3.31. Backup `default_site_backup--20260722071456.zip` (367 MB) taken via the API plugin - 14th in the 14-count/5 GB-capped rotation (4.9 GB used, already at the policy ceiling); **not yet copied off-server**, unlike the general migration prerequisite above.
- [x] Inventory everything non-stock in Mod Quark: templates (`icon-menu`, `feature-images`, `gallery-draggable`, `gallery-banners`, `footer-col`), partials (`base`, `footer`, `lightbox`, `logo`), `error.html.twig` overrides, all of `custom.css` (479 lines), the `announcements-data` page, the disabled BlairMdITC `@font-face` block (still present, still commented out, `custom.css:126-148`). **`sponsors-data` does not exist on live** - built and working on staging only, deliberately held back pending a decision from the team's business side on whether/when to bring it to live (confirmed with Brad 2026-07-22; Architecture Reference entry above corrected to match) - nothing to inventory on live for this yet. **Found but not previously documented anywhere** - confirmed genuinely modified by diffing against stock `quark`, not just present by name: `templates/modular/features.html.twig` (adds a `text_align` style hook), `templates/macros/macros.html.twig` (reworked nav - active-class handling + a `notclickable` non-link menu-item mode), `templates/forms/fields/radio/radio.html.twig` (fallback for a custom `tu` translation filter). Also: 16 stray `.bak-*` files scattered live inside `mod-quark/` (dated 06-15 through 07-02) - clutter worth knowing about when diffing against stock, left alone.

**Quark 2 clarified (2026-07-22):** it's a real, separate GPM theme - [`getgrav/grav-theme-quark2`](https://github.com/getgrav/grav-theme-quark2), slug `quark2` - **not** a version bump of the `quark` package already on live (that one's still v2.1.4, Spectre-based, legacy, and is a red herring for this plan). `quark2` is currently **v1.1.6** (13 releases since 1.0.0 on 2026-04-15 - pin a specific version in Phase 1 rather than always-latest, and re-check right before Phase 1 actually starts). Its README confirms the plan's assumptions below were right all along: Blades CSS (Pico's maintained successor, `--pico-*`/`--q2-*` custom properties), Font Awesome 7, Cal Sans/Inter fonts, sticky/animated header, and a built-in accent-color + auto/light/dark mode option. Comparing its stock `templates`/`blueprints` against the Mod Quark inventory above:
  - No stock equivalent at all (fully custom, as already assumed below): `icon-menu`, `feature-images`, `gallery-draggable`, `gallery-banners`, `lightbox`, `announcements`. (`quark2` does ship its own `modular/gallery.html.twig`, but per its README that only works with the premium Lightbox Gallery plugin, so it's no help here.)
  - Stock exists to re-diff against: `features.html.twig`, `base.html.twig`, `logo.html.twig`, `footer.html.twig`, `text.html.twig`.
  - **Possible scope reductions - check before porting:** `text.html.twig`'s `image_align` behavior may already ship natively in `quark2` (could drop our override entirely); `logo.html.twig` may not need a template fork at all - `quark2` documents `custom_logo`/`custom_logo_mobile` YAML options that might cover the 449 wordmark + wrenchman directly.
  - Optional, not required: `quark2` recommends the `github-markdown-alerts` plugin over the currently-installed `markdown-notices`. It also ships its own `quark2.php` (registers Twig helper functions), worth a look alongside `mod-quark.php`.

### Phase 1 - Stand up the parallel copy — done 2026-07-22
- [x] `sudo cp -a` live to a parallel path, loopback-only test vhost (SSH tunnel only, never public) - same as the 2.0 core migration. Copy at `/srv/robot-grav-site-quark2`; vhost `grav-quark2-test` on `127.0.0.1:8081` (same security rules as the live vhost, re-rooted, SSL/certbot stripped, reuses the existing `php8.3-fpm` pool). **Gotcha:** `sudo cp -a` copies `backup/` too (no exclude flag) - pulled in all 14 rotating backups (4.9 GB) for no reason. Brad removed it and `chown -R brad:editor`'d the whole copy so the rest of Phase 1 (and Phase 2) can proceed over plain SSH without a sudo prompt per step - this is a disposable test copy, not production, so that's fine; ownership goes back to `grav:editor` before any admin2-panel testing in Phase 3. **Second gotcha, briefly self-inflicted:** removing `backup/` trips Grav's Problems plugin, which treats it as a required folder and blocks the whole site with a diagnostic page instead of rendering - re-created it empty (`mkdir backup`) and it cleared immediately after a cache clear.
- [x] Install Quark 2 via GPM on the copy only (`bin/gpm install quark2:1.1.6 -y -n` - separate package from `quark`, installs to `user/themes/quark2/`; confirmed not present anywhere yet, including live). Pinned to 1.1.6 as planned.
- [x] New child theme `user/themes/mod-quark-2/` inheriting Quark 2, same inheritance pattern Mod Quark uses today for Quark 1. Confirmed the actual mechanism (not obvious from the PHP class alone): `mod-quark.php` is just `class ModQuark extends Quark`, but the real template/asset fallback comes from a `streams:` block in `mod-quark.yaml` that lists both `user://themes/mod-quark` and `user://themes/quark` as `theme://` prefixes - Grav config does **not** cascade automatically between parent and child, only the stream lookup does. `mod-quark-2.php`/`mod-quark-2.yaml`/`blueprints.yaml` mirror this exactly, prefixes swapped to `mod-quark-2`/`quark2`, config defaults copied from `quark2.yaml` (accent-color `#8428DF`, theme-mode `auto`, etc.) the same way `mod-quark.yaml` duplicates `quark.yaml`'s.
- [x] Point the copy's `pages.theme` at `mod-quark-2` and confirm it renders as stock Quark 2 before porting anything. Verified 3x consistent across `/`, `/about-us`, `/about-us/history`, `/community`, `/join-us`, `/bunnybots`, `/admin` (all 200) and `/api/v1/sync` (403) - real Quark 2 fingerprints present (`data-theme-default`, `q2-accent`, Blades CSS classes), actual 449 nav/content/logo rendering through it, `grav.log` clean. Brad confirmed visually via SSH tunnel (`ssh -L 8081:127.0.0.1:8081 449-live`, browsed `127.0.0.1:8081`). **Gotcha for later phases (including the real Phase 4 cutover verification):** PHP's opcache only revalidates file changes every ~2s (`opcache.revalidate_freq`), and different FPM workers pick up an edit at slightly different times - a page can 500 right after a file change and then pass cleanly a few retries later with no further changes made. Don't treat one immediate post-edit failure as conclusive; retry after a few seconds before debugging further.

### Phase 2 - Port each piece, one at a time — done 2026-07-22
- [x] `icon-menu` - FA7 icons verified against the exact CDN bundle Quark 2 loads (7.0.1), not guessed from memory; several real renames needed (`fa-money`→`fa-money-bill`, `fa-pencil-square-o`→`fa-pen-to-square`, `fa-android` needs `fa-brands` not `fa-solid`). **Self-caught regression:** first pass dropped the `text_align` style hook and switched the click-target to wrap the whole card instead of just icon+header - both restored to match current behavior exactly after Brad flagged the general principle (see "Open decision" discussion 2026-07-22: this migration should not bundle design changes, full stop, team decides those separately later).
- [x] `feature-images` - ported verbatim (image resolution, thumbnail sizing, `-original` full-size linking, `separate_links` mode are all Grav-core/theme-agnostic, no adaptation needed beyond the same grid-CSS fix as icon-menu).
- [x] `gallery-draggable` / `gallery-banners` - ported verbatim, byte-for-byte; both use fully custom BEM classes with zero Spectre/Blades framework dependency.
- [x] `footer-col` / footer partial - kept the custom version as-is rather than switching to `quark2`'s stock footer, per the same no-bundled-redesign principle; stock option remains available for the team to reconsider later.
- [x] `announcements` partial + `announcements-data` - ported verbatim. `sponsors-data` confirmed absent from live, staging-only pending the business-team decision (unrelated to this migration).
- [x] `logo.html.twig` - kept the `<img>`-tag version rather than switching to `quark2`'s inlined-SVG `custom_logo` mechanism; the inlined approach would have activated a then-dormant `header-dark` CSS rule that doesn't apply under our setup anyway, but the plain version is the more conservative, unambiguously-identical choice regardless.
- [x] `error.html.twig` - ported the actual custom 404 page (`user/pages/11.error/`, a real photo + "Team 404" joke) - **not** the generic error-plugin default I initially checked, which made the `#error img`/`h1` CSS look like dead code when it very much isn't.
- [x] `base.html.twig` - used Quark 2's own modern structure (semantic header/nav, sticky/animated JS, theme-toggle, mobile overlay) rather than porting the old Spectre-era markup, since the old markup would fight Quark 2's own JS. Carried the 449-specific content into it: GA4 snippet, full Open Graph/Twitter/JSON-LD SEO block, the `announcements` include, the `underconstruction` banner check. Dropped two dead JS references (`site.js`/`jquery.treemenu.js` under `mod-quark/js/` don't exist as files - they were resolving to stock `quark`'s own `site.js` via the stream cascade the whole time) and unused `line-awesome.min.css`.
- [x] `features.html.twig` (unused by any current page, ported for completeness), `macros.html.twig`, `radio.html.twig`. **Near-miss caught before shipping:** `macros.html.twig` had never actually been overridden yet at the point I checked it - it was silently falling back to `quark2`'s stock nav macro the whole session, which is what had been drawing the dropdown chevrons (▾) in every screenshot so far. A verbatim port of Mod Quark's version would have deleted the `has-children` CSS class those chevrons depend on. Merged instead: kept Quark 2's chevron structure + its unused-but-harmless `menu_icon` option, added in Mod Quark's `notclickable` (confirmed live on the "Sponsors" nav item, `05.sponsor-information/modular.md`).
- [x] `text.html.twig` - the Phase 0 hunch that `quark2`'s native `image_align` might make this droppable was **wrong**; the real template does far more (Team History year-summary card parsing via `<blockquote>`/`<h3>` splitting, `year_bar` support, its own alt-text fallback, full-size image linking) that Quark 2 has no equivalent for at all. Ported in full. Confirmed the existing `image_align` left/right toggle is itself nearly cosmetic on the current site (no matching CSS at all, just a 30px padding difference) - preserved that as-is rather than "fixing" it into a real toggle.
- [x] Full `custom.css` audit, rule by rule - see the three gotchas above (Blades `.columns`, missing `box-sizing:border-box`, Quark1-vs-Quark2 scroll mechanism). Biggest find: an entire block of Team History CSS (the blockquote-as-table-row styling and the actual `order:1`/`order:2` flex mechanism that puts images on one side and text on the other for year-modules specifically) had been missed during the `text.html.twig` port and wasn't caught until this dedicated audit pass. `custom.css` is now 508 lines (was 479) - net new lines are added context comments, not new rules; every original rule has a home.
- [x] Carried the disabled BlairMdITC `@font-face` block forward verbatim, including the explanatory comment and the commented-out `h1` font-family line (only path reference updated: `mod-quark/fonts/` → `mod-quark-2/fonts/`).
- [x] Cache-bust mechanism confirmed **and fixed** - it didn't exist at all on the child theme's `custom.css` until this phase (see the gotcha note above); now versioned `?v=N`, bump on every edit.
- [x] **Decided (Brad, 2026-07-22): accent-color `#a80007` (449 red), pinned to light-only.** `theme-mode: light` in `mod-quark-2.yaml`, both `theme-toggle.html.twig` includes removed from `base.html.twig` (header + mobile menu - no toggle button renders), pre-paint bootstrap script simplified to force `data-theme="light"` unconditionally rather than checking `localStorage`/OS preference. `theme-toggle.js` is still loaded (harmless, nothing for it to attach to) - not worth touching the asset pipeline further for this. Quark 2's dark-mode CSS is otherwise fully intact if the team wants to revisit this later.

### Phase 3 - Verify (still not public)
- [x] `curl` sweep of every page, not just the homepage. All **70 routable pages** (pulled from live's own `sitemap.xml`) return `200` on the test copy.
- [x] Eyeball image-bearing pages, not just status codes (bit us once already during the 2.0 core migration). Checked every `<img src>` (not just the page shell) on the 15 most image-dense pages by content, ranked by raw `<img>` count on the test copy: `/about-us/history` (66), `/about-us/history/robots` (37), `/` (36), `/about-us/mentors` (28), `/about-us/history/449-members-of-note` (26), `/sponsor-information/current-sponsors` (18), `/about-us/history/t-shirt-designs` (17), plus 8 more. **301 images checked, 0 real breakage from the migration.** 13 flagged initially: 12 were false positives from the check script itself not URL-encoding spaces/parens in filenames (`_MG_7593 (2) (1).jpg` etc. - confirmed fine once properly encoded); the 1 real 404 (`blank.png` on `/about-us/mentors`) is a **pre-existing content typo, identical on live** - the page's own `feature-images.md` frontmatter references `blank.png` but the actual uploaded file is `blank.jpg` (confirmed via `media_order` in the same file) - a one-character-extension mismatch in content, unrelated to the theme port, not fixed here.
- [x] Admin2 pass: sign in, edit one page of each custom module type, confirm Save and content-seed still work. **4 of 5 clean** (`icon-menu`, `feature-images`, `gallery-draggable`, `text`/`hero` all edit+save+revert cleanly). `gallery-banners`' drag-to-reorder (the Banners-tab list field) doesn't work - but confirmed **also broken on live**, unmodified, so it's a pre-existing admin2 bug, not a migration regression. Out of scope here.
- [x] Re-test gallery drag-reorder. Confirmed working (native admin2 Page Media "Reorder" control on `gallery-draggable`, per the retirement note above).
- [x] `grav.log` clean - no new errors from today's edits. The log **does** contain a handful of `grav.CRITICAL` "syntax error... expecting ']'" entries, but they're all byte-identical to entries in **live's own** `grav.log` at the same timestamps (2026-07-15, 07-18, and 07-22T13:38:28 - all predating or coinciding with the Phase 1 `cp -a`, which copies `logs/` along with everything else). Inherited historical log content, not anything new. Separately worth knowing: this looks like a real, recurring, low-grade **live** issue (a compiled language-cache file occasionally getting corrupted/truncated - garbled fragments like `PAG`/`се`/`REN` mid-file, classic concurrent-write corruption) - self-heals on next request, unrelated to Quark 2, not investigated further here.
- [x] Screenshot comparison vs current live, desktop - **2 real regressions found and fixed**, 1 item deferred:
  1. **Fixed: `header-dark` missing from the `body_class()` whitelist in `mod-quark-2/templates/partials/base.html.twig` line 1.** Live's array has 5 entries (`header-fixed, header-animated, header-dark, header-transparent, sticky-footer`); the port had only 4. Restored to match.
  2. **Fixed: `#header` used Quark 2's native `position: sticky` instead of Mod Quark's `position: fixed`**, breaking the "hero renders full-bleed behind the transparent header" effect (this exact fixed-header/hero interaction is already flagged as fragile on this site - see the Banners-feature lessons-learned entry on manual top-offsets). Sticky reserves its own space in flow, pushing the hero down instead of letting it start at y=0 behind the header. Fix - scoped override in `mod-quark-2/css/custom.css` (bumped `?v=11` → `?v=12`):
     ```css
     body.header-transparent #header {
       position: fixed;
       left: 0;
       right: 0;
     }
     ```
     Scoped to `.header-transparent` only, so every normal (non-hero) page keeps Quark 2's sticky default untouched. Verified both states match live exactly: transparent/white-text at page load (hero photo visible through the header), solid 449-red with compact nav (Quark 2's own `.scrolled` min-height rule) once scrolled.
  3. **Open, deferred - nav + hero base typography not yet reconciled.** Phase 2's CSS audit covered custom components/colors, not Quark 2's own native nav/hero rules. Measured side-by-side at a 1175px viewport (computed styles, live vs test copy):

     | Property | Live (Spectre) | Test copy (Blades/Quark 2) |
     |---|---|---|
     | Root font-size | ~20px (`html{font-size:20px}`) | 16px (Pico's `--pico-font-size` default, never overridden) |
     | Nav link font-size | 13.6px | 15px |
     | Nav link font-weight | 700 | 500 |
     | Nav link spacing | padding `7px 30px 7px 20px` (50px combined) | `gap:20px` + padding `8px 15px` (30px combined) |
     | Hero vertical padding → H1 position | H1 @ 305px from top | H1 @ 141px from top (164px shallower) |

     Checked but **not actually different** (screenshot-scale illusion, not a real gap): announcement-pill padding (10.1×21.8px vs 10.4×22.4px) and H1 font-size (50px both). Root-font-size alone doesn't explain the nav weight/padding-scheme difference (500 vs 700 isn't a rem-scaling artifact) - this needs a property-by-property override of Quark 2's native nav/hero rules to match the measured live values above, not one blanket fix. Deferred to its own pass, not done same-session as the rest of Phase 3.
- [x] Screenshot comparison vs current live, mobile (375px viewport). **1 more real regression found**, same root cause as item 3 above, worse at this width:
  4. **Not yet fixed - homepage announcement banner overlaps the H1 hero title on mobile.** At 375px, live cleanly stacks banner then title with normal spacing; the test copy's title sits high enough (same hero-padding gap already measured on desktop) that the banner's `position:absolute; top:4.75rem` visually collides with "THE BLAIR ROBOT PROJECT," clipping its top line. Confirmed by direct side-by-side screenshot at the same viewport width. Only reproduces where a `.hero` + the announcement banner co-occur (checked `/about-us/history/robots` and `/about-us/mentors` at the same width - both have heroes, neither shows the banner, both render clean) - **this raises the priority of the deferred nav/hero typography item above**, since on mobile it's an actual visible layout break, not just a spacing mismatch. Same fix (hero vertical padding reconciliation) should resolve both together.

**Unrelated pre-existing bug found, confirmed NOT a migration issue (present on unmodified live too):** admin2's own Page Media preview thumbnails don't render in the page editor (e.g. `/admin/pages/edit/home/_gallery` - broken-image icons instead of thumbnails). Verified the actual files exist on disk with correct `grav:editor` permissions, nginx isn't blocking them, disk space is fine (6.4G free), GD/Imagick both loaded, nothing image-related in `grav.log`. **The public site is completely unaffected** - the real front-end image URL (`/images/.../hash-filename.jpeg`) returns a valid 200 with real image bytes. Admin2's own internal preview mechanism only, cosmetic, not blocking anything. Initially suspected `custom_base_url` (below) but that's disproven - live has the identical broken thumbnails with `custom_base_url` pointed correctly at its own domain, so that config was never the cause.

**Test-copy-only config change (not a fix for the above, kept anyway):** `system.yaml`'s `custom_base_url: 'https://robot.mbhs.edu'` was commented out on the test copy only (`/srv/robot-grav-site-quark2/user/config/system.yaml`, backup alongside as `system.yaml.bak-quark2test`) since it's more correct for a non-standard loopback-origin test environment regardless of the thumbnail investigation's outcome. Live's own `system.yaml` is untouched. Revert if ever needed for byte-parity with live's config.

### Phase 4 - Cutover
- [ ] Low-traffic overnight window, fresh backup first.
- [ ] Directory swap (not in-place), same as the 2.0 core cutover.
- [ ] Re-run the Phase 3 checklist against the public URL.
- [ ] Confirm `.git`, `backup.sh`, `.user.ini`, `robots.txt`, the GSC file, and the `/api/v1/sync` 403 block all survived the swap.

### Phase 5 - Soak and cleanup
- [ ] Keep the Quark-1 archive about 1 week before removing anything.
- [ ] Update this doc's Key File Paths / Architecture reference for the new theme.
- [ ] Log the final outcome (shipped / abandoned / deferred) in CHANGELOG.md and Changes.md.
- [ ] Retire the old `mod-quark` and Quark 1 parent theme directories.

**Rollback:** the Phase 4 directory swap makes rollback a one-line `mv` back to the archived Quark-1 tree - same as every other cutover on this site.

**Effort:** closer in scope to the Grav 2.0 core migration than a routine CSS tweak - a dozen-plus templates/partials (full corrected list in the Phase 0 findings above) plus a full `custom.css` audit. Plan for a between-events window, not mid-season.

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
