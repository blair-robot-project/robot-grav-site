# FRC Team 449 Website — Runbook
*Last updated: 2026-07-04 · rev 2026-07-04a*

Operational reference for the FRC 449 Grav sites: environment facts, the staging (Grav 2.0) operational notes, live server-housekeeping + security to-dos, cautions/gotchas, and key file paths. For the dated history of changes, see **[CHANGELOG.md](CHANGELOG.md)**. For the concise working-context doc to read first, see **[CLAUDE.md](CLAUDE.md)**.

---

## ✅ Docs import into this repo — resolved 2026-07-03

The sanitized-docs import (previously pending here) happened directly on `master`, not via a fork+PR — Brad has direct contributor access to `blair-robot-project/robot-grav-site`, so forking was unnecessary overhead. All docs except `CREDENTIALS.md` (private, stays in the source repo) were imported under `docs/`; `CLAUDE.md`, `CHANGELOG.md`, `RUNBOOK.md`, and `Changes.md` were then promoted to the repo root (`CLAUDE.md` in particular needs to be at root for Claude Code to auto-load it). See CHANGELOG.md's 2026-07-03 entries for the full sequence.
- **Not a deploy source:** confirmed 2026-07-02 that nothing pulls from this repo to robot.mbhs.edu — no webhooks, no GitHub Actions, no `git pull` anywhere on the server. The live site serves local flat files on its own droplet.
- **Not a live content mirror:** the old `backup.sh` cron (nightly `git push` of `user/pages/*` into this repo) was retired 2026-07-02, replaced by Grav's own nightly scheduler backup running directly on the server. `archive/user/pages/` here is a frozen 2026-07-02 snapshot, not a live copy.
- **Where secrets live:** not in this (public) repo. `CREDENTIALS.md` stays in the original private working repo. Server SSH access, the DigitalOcean console, and site secrets are held by Rafi (infrastructure) and Brad (project lead).

---

## Environments

| | **LIVE** robot.mbhs.edu | **STAGING** 449.navybook.com |
|---|---|---|
| Role | Production | Sole staging / dev — test everything here first |
| Host | DigitalOcean droplet (nyc1, ~$6 tier), dedicated | DreamHost shared (subdomain) |
| OS / web server | Ubuntu 22.04, nginx 1.18.0 | DreamHost-managed, Apache (`.htaccess`) |
| Grav | **1.7.53** | **2.0.2** |
| PHP | **8.3** | **8.3** (default `php` CLI is 8.2 — use `php-8.3`, see below) |
| SSH | `ssh USER@robot.mbhs.edu` | `ssh USER@navybook.com` |
| Grav root | `/srv/robot-grav-site/` | `~/449.navybook.com/` |
| Web user:group | `grav:editor` | host-managed |
| MCP (Claude Code) | `grav-live` → `/api`, key on `bradP` | `grav-staging` → `/api`, key on `admin` |

> **The Grav-2.0 migration trajectory:** live → Grav 2.0 is being proven on the **449.navybook.com** staging subdomain. Live itself remains **1.7.53** until that move is scheduled. **Prerequisites already met on live** (recon 2026-06-26): PHP **8.3.31** (web + CLI), **2 GB swap**, and the **`migrate-grav`** plugin installed. The cutover plan + carry-forward checklist live in the **"Live → Grav 2.0 migration"** section below.

### ⚰️ Retired: navybook.com/449 (the original Grav 1.7 staging clone)
The first staging environment was a Grav 1.7 clone of live at the **navybook.com/449** subdirectory (built June 2026 from a Grav backup zip). It was **retired June 2026**, superseded by the **449.navybook.com** Grav 2.0 subdomain.
- **Why it was safe to retire:** a read-only diff (2026-06-26) confirmed 449.navybook.com is a strict **superset** — more pages (214 vs 213), more page images (397 vs 393), identical accounts (17) and shared images (103), and **nothing on the old clone that the subdomain lacks**. Every difference was the subdomain being *ahead* (gallery list-migration, richer copy, the 2.0 config). Nothing needed to be brought forward.
- **Rollback reference reassigned:** the old clone used to double as the "known-good Grav 1.7 baseline." That role now belongs to **live itself** (still 1.7.53) plus the on-server Grav **backup zips**.
- The full build/setup playbook for the old clone lives in **git history** + the **[CHANGELOG.md](CHANGELOG.md)** entries through 2026-06-15.

---

## 🟢 Staging (449.navybook.com) — operational reference

The active staging/dev site, Grav **2.0.2** / PHP **8.3**. **Full dated narrative + evidence is in the [CHANGELOG.md](CHANGELOG.md) 2026-06-23…06-26 entries** — this is the working short version.

**Fast facts**
- SSH `ssh USER@navybook.com` · Grav root `~/449.navybook.com/` · web https://449.navybook.com.
- **Always use PHP 8.3 CLI:** `/usr/local/bin/php-8.3 bin/grav clearcache` (the bare `php` is 8.2). The admin SPA also caches an api **`route.cache`** — `rm -rf ~/449.navybook.com/cache/api/*` when blueprints/pages don't refresh.
- Admin is **admin2** (the Grav 2.0 SPA) backed by the **api** plugin — not the classic 1.7 admin. Expert mode opens a fully-editable raw Frontmatter editor (unlike live's broken classic `</>` toggle).
- ⛔ Do NOT touch **robot.mbhs.edu** (live) when working here.

**Status snapshot**
- Migration to 2.0.x complete. **gallery-draggable** rendering is fixed and a list-based **Gallery tab** (drag rows to reorder → writes `header.gallery`) is in place; reorder→save→front-end works. The template is list-aware with a `media_order` fallback so all galleries render.
- The admin2 real-time-collaboration defect (below) is mitigated by the `.htaccess` 403-shim and is filed upstream.

**Resolved issues / standing mitigations**
- ✅ **admin2 `/sync` collab 404-flood — MITIGATED via `.htaccess` 403 shim (2026-06-25).** admin2 polls `/api/v1/sync/*` endpoints that api v1.0.2 doesn't implement; unanswered they 404-flood and the page editor mounts degraded (Gallery rows reload empty after save, single-field `list` round-trips as flat scalars). The fix forces those routes to **403** so admin2 takes its clean solo-mode fallback. **Verified:** a clean editor boot fires a one-time 5-call `/sync` burst, all 403, then stops; editor mounts clean; Gallery tab loads all rows populated. The HTML 403 is sufficient (admin2 keys on the status, not a JSON body). admin2 is now **v2.0.6** but still probes `/sync`, so the shim stays load-bearing. Filed upstream as **[getgrav/grav-plugin-admin2#73](https://github.com/getgrav/grav-plugin-admin2/issues/73)**.
  - **⚠️ DreamHost `.htaccess` gotcha** (the "Force 403 on admin2 /sync" block): on this host `%{REQUEST_URI}` conditions and start-anchored per-dir `RewriteRule` patterns silently never match — match `%{THE_REQUEST}` (the raw request line) instead. Working rule: `RewriteCond %{THE_REQUEST} \s/+api/v1/sync(/|\s|\?) [NC]` then `RewriteRule .* - [F,L]`.
- ✅ **YouTube iframes blank — FIXED 2026-06-24 (Grav 2.0 regression).** Grav 2.0's bundled Parsedown (`2.0.0-grav`) turns on the GFM **`tagfilter`** by default, whose denylist escapes `iframe` — so the youtube plugin's raw `<iframe>` (injected pre-markdown) was rewritten to inert `&lt;iframe…` text. **Fix:** `pages.markdown.gfm.tagfilter: false` in `system.yaml` (restores 1.7 behavior; safe — all content is trusted-author). ⚠️ **Carry-forward to live** whenever it moves to Grav 2.0, or every `iframe` embed breaks identically.
- ✅ **Gallery auto-add + per-row thumbnail — DONE 2026-06-25 (`image-intake` v0.3.0).** An `onAdminSave` reconciler rebuilds `header.gallery` from the page folder's images on every save of a gallery-draggable module — adds rows for new uploads, drops rows for deleted files (two-way sync), normalizes every row to `{image: <file>}` so admin thumbnails render, preserving drag order. Config: `gallery_sync.*`. Rows update on **Save**, not instantly on upload/delete.
- ✅ **Content-seed on new modules — RESTORED 2026-06-25 (`image-intake` v0.4.0).** admin2 ignores a blueprint Content-field `default` on new pages (a 2.0 regression); an `onApiBeforePageCreate` handler re-injects the template's blueprint default body when empty, so new modules open pre-filled with `[//]: # (CommentsGoHere)` / per-template instructions again.
- 🟢 **Upstream bugs filed (2026-06-26, account `bpeniston`):** [admin2#73 — collab sync 404-flood](https://github.com/getgrav/grav-plugin-admin2/issues/73) and [admin2#74 — page-media drag-reorder missing](https://github.com/getgrav/grav-plugin-admin2/issues/74).

**Plugin/theme code that diverges from live (and rides forward to live with the eventual 2.0 move):** the `image-intake` plugin (gallery-sync + content-seed — **published as v0.4.0 on `bpeniston/grav-plugin-image-intake`**, public repo), the list-aware `gallery-draggable` blueprint + template in `mod-quark`, the `gfm.tagfilter: false` system setting, and the `.htaccess` `/sync` 403 block (Apache — see the Live → Grav 2.0 section for the nginx equivalent). All have `.bak-*` backups on the server.

---

## 🚀 Live → Grav 2.0 migration (planning, opened 2026-06-26)

The 2.0 stack is fully proven on the 449.navybook.com staging subdomain; this section is the plan to bring **live (robot.mbhs.edu)** across. **Chosen strategy: parallel build → cutover** (build/test a 2.0 copy with no visitor impact, then cut over with 1.7 kept instantly restorable — matches the team's proven reversible pattern; lowest risk on a production box Rafi considers fragile).

**Prerequisites — already met on live (recon 2026-06-26):**
- PHP **8.3.31** on both web-FPM (`php8.3-fpm.sock`, nginx line 35) and CLI — `migrate-grav`'s wizard needs 8.3, so no PHP prep is required (unlike staging, which needed the 8.3-subdomain trick).
- **2 GB swap** present (migration headroom on the 957 MB box).
- **`migrate-grav`** plugin already installed (`user/plugins/migrate-grav`).
- Note: Grav 2.0 isn't a `gpm self-upgrade` — it's the `migrate-grav` wizard, which stages 2.0 into `grav-2/`, drops `migrate.php` at webroot, and must be run in a fresh PHP-8.3 process (browser or CLI).

**Carry-forward checklist (proven on staging — every item must ride along, or live breaks):**
1. **`pages.markdown.gfm.tagfilter: false`** in `user/config/system.yaml` — NOT set on live (2.0 defaults it on); without it every YouTube / raw-`iframe` embed renders as inert `&lt;iframe…` text.
2. **`image-intake` → v0.5.0** (gallery two-way sync + content-seed + the **api-version fix**) — published on the public repo; deploy by rsyncing the working copy `~/Documents/449/grav-plugin-image-intake/` to live **as `grav`** (the 2.0 dirs aren't `editor`-writable — see gotchas). ⚠️ **v0.5.0 is required on the live run:** the gallery auto-sync via `onAdminSave` silently stopped persisting under the newer **api ≥ ~1.0.3** (the api now `save()`s the page *before* its update event); v0.5.0 adds an `onApiPageUpdated` hook that reconciles + re-saves. Verified on v2 (api 1.0.5 / Grav 2.0.3). *(Live's fresh 2.0 install will land on a current api, so v0.4.0 would leave galleries failing to auto-populate.)*
3. **`mod-quark` template carry-forwards:** (a) **`gallery-draggable`** list blueprint + template (2.0-clean; drag-reorder writes `header.gallery`); (b) **`text.html.twig`** — the image output needs **`|raw`** (`image.height(N).html|raw`). ⚠️ **Grav 2.0.3 autoescapes a *derivative* medium's `.html`** (`image.height()/.resize()` etc.) that 2.0.2 did not, so text-module images render as the literal `<img …>` tag shown as text without it. (Plain `image.html` and templates that build `<img src="{{ …url }}">` are unaffected — only `text.html.twig` used the derivative-`.html` form.) Both fixed files are staged at `~/Documents/449/backups/v2-carryforward/mod-quark/`.
4. **admin2 `/sync` → 403 shim — reimplement for nginx.** Staging used an Apache `.htaccess` rule; live is nginx and has NO `/api`/`/sync` block today. Draft (place ABOVE the `location ~ \.php$` block in `/etc/nginx/sites-available/grav`; regex locations match first-in-order):
   ```nginx
   # Grav 2.0 admin2: api ships no /sync routes → force 403 so admin2 takes its clean solo-mode fallback (else 404-flood degrades the editor)
   location ~ ^/api/v1/sync(/|$) { return 403; }
   ```
   Verify after `sudo nginx -t` + reload: `/api/v1/sync/capabilities` → 403, `/api/v1/info` and the site/admin → unaffected.
5. The migration swaps the classic **`admin`** plugin for **`admin2` + `api`**.
6. **Re-enable the plugins the wizard disables.** ⚠️ The `migrate-grav` wizard writes `enabled: false` overrides for several plugins during migration. Correct to leave OFF: classic `admin` (replaced by admin2), `migrate-grav` (done with it), `videoembed` (not installed). **MUST re-enable: `login`** (admin2 sign-in fails without it) **and the custom `image-intake`.** After the wizard, grep `user/config/plugins/*.yaml` for stray `enabled: false`.
7. **Restore the prod-root files the promote drops.** ⚠️ The wizard's "Promote" swaps in a *fresh* Grav distribution, so non-distribution files at the docroot root are LOST. Re-copy the operational ones from the archived 1.x (or prod): **`.user.ini`** (the raised PHP upload limits — without it uploads cap at PHP's 2 MB default and admin2 reports a generic "network error"), **`robots.txt`**, the **Google Search Console verification `google*.html`**, and **`.git`** (so the nightly backup-commit cron keeps working). These live outside `user/`, so they're not in the Grav backup either.

> **✅ All of the above confirmed end-to-end on the v2 build (2026-06-26):** v2 = Grav **2.0.3**, every carry-forward applied, full sweep green — pages 200, `/api/v1/sync`→403, YouTube real `<iframe>` (0 escaped), galleries render, admin2 loads, `grav.log` clean, prod untouched.

**⚠️ migrate-grav wizard gotchas (observed on the v2 build — don't be surprised on the live run):**
- **Wizard model:** builds a *fresh* Grav 2.0 in a nested **`grav-2/`** subdir, then "Promote" swaps it into the webroot and zips the old 1.x install to `backup/migration-backup-<ver>--<ts>.zip`, leaving a `.migration-complete` JSON marker. It **does NOT auto-patch nginx** (Apache/LiteSpeed only) — you serve the staged install yourself.
- **The Promote progress page hangs in the browser** (the long `.git` copy outruns the web-request timeout) even though the backend finishes — don't kill it; confirm via the `.migration-complete` marker + `bin/grav --version`.
- **New 2.0 dirs are created `grav`-owned `2755`** (not the prod `2775` convention), so `USER`-as-`editor` can't write into `user/…` — deploy carry-forwards **as `grav`** (`sudo -u grav`).
- Wizard auto-enables `security.twig_content.process_enabled` for pages that set `process.twig`, and strips dead 1.x `system.yaml` keys (`undefined_functions`, `undefined_filters`) — informational.
- **Version skew vs staging (bit us twice):** the fresh 2.0 download pulls the *current* Grav + `admin2`/`api`, **newer than staging** (v2 got **Grav 2.0.3**, admin2 **2.0.7**, api **1.0.5** vs staging's 2.0.2 / 2.0.6 / 1.0.2). Two regressions only appeared on the newer versions: (1) image-intake gallery auto-sync needed **v0.5.0** (api ≥1.0.3 saves before its update event); (2) **Grav 2.0.3 autoescapes derivative-medium `.html`**, breaking text-module images until `text.html.twig` got `|raw` (carry-forward item 3). **Lesson: re-verify *rendered behavior* on the live run — not just HTTP 200s** — interactively (admin2 sign-in, large upload, gallery add/reorder) **and** by eyeballing image-bearing pages (Leadership, Sponsor-Benefits, About-Us).
- **Build/test exposure that worked:** copy prod → `/srv/robot-grav-site-v2`, add a **localhost-only** nginx vhost on `127.0.0.1:8081` rooted at v2 (php8.3-fpm; bake the `/sync`→403 block in), and drive the wizard + browser testing through an SSH tunnel (`ssh -L 8081:localhost:8081`). Keeps the half-built 2.0 off the internet; prod's vhost is a separate untouched server block.

**Content:** this is a platform upgrade — migrate **live's own** content in place; do NOT blind-copy staging's content (the trees diverged). Selectively porting *specific* improved copy from staging is a separate, page-by-page task (live `user/pages` is git-tracked, so each port is reviewable/committable; mind round-trip-safe linking and the `header.gallery` list format).

**🛟 Pre-2.0 off-site rollback artifacts (live, taken 2026-06-26 — verified byte-for-byte + integrity-tested):** two independent copies on the Mac under **`~/Documents/449/backups/`** —
| File | Format | Size | Restore |
|---|---|---|---|
| `default_site_backup--20260626173153.zip` | Grav-native backup zip | 329 MB | `php bin/grav restore default_site_backup--20260626173153.zip` |
| `robot-grav-PREMIGRATE-20260626-165539.tar.gz` | tarball (`-C /srv`) | 850 MB | `tar xzf … -C /srv` |

Both capture `user/` (pages **with** media), themes, plugins, and config; neither includes the regenerable `cache`/`images`/`tmp` or the `backup/` folder. ⚠️ Not captured by either (live-only, outside `user/`): `.user.ini` upload limits + the nginx `client_max_body_size` — re-apply those from the "Live large-photo upload limits" section if the box is ever rebuilt.

**Phase plan**
- **Phase 0 — pre-flight (non-disruptive):** ✅ **DONE 2026-06-26.** Both off-site rollback artifacts taken + verified; nginx `/sync` block drafted; GPM-as-`grav` confirmed healthy (`bin/gpm version` → "Grav v1.7.53"). *(Only open item: send the drafted Rafi heads-up email.)*
- **Phase 1 — build & verify the 2.0 copy (parallel, no visitor impact):** ✅ **DONE + FULLY VERIFIED 2026-06-26.** `/srv/robot-grav-site-v2` (copy of prod) migrated to **Grav 2.0.3** via the wizard; served on the localhost `:8081` test vhost; all carry-forwards applied (gfm.tagfilter, image-intake **v0.5.0** + override, gallery-draggable list template, `/sync`→403, admin2+api, re-enabled login+image-intake, restored `.user.ini`/`robots.txt`/GSC file). Automated sweep green **and all interactive admin2 tests passed** (sign-in, large-photo upload, gallery auto-sync, drag-reorder). Prod untouched on 1.7.53.
- **Phase 2 — cutover + soak:** ✅ **CUTOVER DONE 2026-06-27** (overnight low-traffic window). Directory swap executed; canonical `/srv/robot-grav-site` now serves **Grav 2.0.3**; 1.7 preserved at `/srv/robot-grav-site-1.7-archive`. Full Section A→C verification green (see CHANGELOG 2026-06-27). **⏳ Soak in progress (~1 week)** before removing the archive / `:8081` test vhost / 8.2 standby FPM pool. Two non-blocking dashboard warnings deferred to soak (see below). Step-by-step retained below as the executed record + rollback reference.

### Phase 2 — Cutover runbook (executed 2026-06-27)

**⚠️ Correction applied during execution:** the nightly backup is **`backup.sh`** at the webroot root (root cron 22:34 → `git add user/pages/*`, commit, `ssh-add` the deploy key with passphrase, `git push` to `blair-robot-project/robot-grav-site`), **not** a bare git-commit cron as item 7 implied. The migrate-grav Promote drops it like any webroot-root file, so **`backup.sh` must be carried into v2 alongside `.git`** (A1 now copies both). Root's `safe.directory` = `/srv/robot-grav-site` (the path the swap preserves), so the cron's git keeps working with no change. **Security follow-up:** `backup.sh` passes the deploy-key passphrase as a cron arg (`"toor"`) — harden separately.

**Two post-cutover dashboard warnings (both non-blocking, deferred to soak):**
- ① *"Your web server is not applying Grav's access rules"* — **REAL exposure, FIXED 2026-06-28** (this was earlier logged as a false positive — that call was wrong). admin2's probe does **not** look for `.htaccess`; it writes `user/data/grav-security-probe.dat` (a random token) and fetches it **from the browser** — a 200 echoing the token means files are served raw. robot's nginx used the stock **extension blocklist** (`location ~* /user/.*\.(txt|md|yaml|php|…)$`, line 27 of the vhost), which 403s those extensions but **serves any other type** (`.dat/.ini/.bak/.json/.log/.csv/.xml`) anywhere under `user/`. The probe's `.dat` returned **200 + token** → plugin runtime data in `user/data/` was web-readable. The earlier "all 403" check only probed *blocklisted* extensions (`.yaml/.php/.md/.git`), so it confirmed the rule worked instead of finding the gap — the lesson: a blocklist is unsafe by construction; test an **off-list extension on a file that exists**, which is exactly what Grav's probe does. **Fix:** inserted deny-by-default rules after line 27 in `/etc/nginx/sites-available/grav` — a `user/data` media-allowlist + catch-all `return 403`, plus a `user/(accounts|config|env)` catch-all `return 403`; `sudo nginx -t` (ok) + `systemctl reload nginx`; `.bak-2026-06-28` of the vhost kept. **Verified (external):** probe `.dat` and `.ini/.bak/.json/.log/.csv/.xml/.txt` under `user/data` → **403**, accounts/config/env non-yaml → 403, homepage/page/`/admin`/theme-CSS → 200, `/api/v1/sync` still 403; banner clears on dashboard refresh. **Why nginx was uniquely affected:** Apache sites (navybook) get Grav's tightened bundled `.htaccess` automatically on update; nginx ignores `.htaccess`, so the hand-maintained vhost never inherited the fix and was frozen at the pre-2.0 ruleset.
- ② *"Email links are not yet pinned to a trusted host"* — ✅ **FIXED 2026-06-27.** Set **`custom_base_url: 'https://robot.mbhs.edu'`** in `user/config/system.yaml` (was `null`) → `Uri::base_url_absolute` now uses it (Uri.php:244) instead of the request host, so email/reset links can't be host-header-spoofed. Verified: pages 200, canonical/og:url/all 72 sitemap URLs now https, `/sync` still 403, admin banner cleared. `.bak-*` kept.

**Mechanism — directory swap (recommended over an nginx-root repoint):** keeps `/srv/robot-grav-site` canonical, so the backup cron, the per-dir `.user.ini`, and any scripts need no path edits; rollback is the same two `mv`s reversed. Trade-off: a sub-second window during the double-`mv` where the path doesn't exist (negligible in a low-traffic slot). All steps are `sudo`/`grav` (Brad's interactive shell); Claude drives the diffs + verification.

**A. Pre-cutover prep (no visitor impact):**
1. **Restore `.git` into v2** (the wizard dropped it; the nightly backup cron needs it): `sudo cp -a /srv/robot-grav-site/.git /srv/robot-grav-site-v2/.git`. Confirm the cron's path/mechanism with `sudo crontab -l` (it commits `user/pages/*` to `blair-robot-project/robot-grav-site` — keep that path = `/srv/robot-grav-site`, which the swap preserves).
2. **Add the `/sync`→403 block to the real vhost** `/etc/nginx/sites-available/grav` (inert on 1.7, so safe to add ahead): the `location ~ ^/api/v1/sync(/|$) { return 403; }` block above the `location ~ \.php$` block; `sudo nginx -t && sudo systemctl reload nginx`.
3. **Re-confirm v2 carry-forwards + restored root files** (gfm.tagfilter, image-intake 0.5.0, login enabled, gallery-draggable + text templates, `.user.ini`/`robots.txt`/GSC, GA4 in `base.html.twig`). *(Verified present 2026-06-26; content at 0 drift — prod & v2 share the identical 214-page set.)*
4. **Fresh final prod backup** right before the window: `sudo -u grav php bin/grav backup` + `scp` off-site.

**B. Cutover (low-traffic window):**
1. **Freeze prod edits** — ask admins to stay out of `/admin` during the window.
2. **Final parity check** — re-run the prod↔v2 `user/pages` `.md` diff (was 0); port any last-minute prod edits into v2.
3. **Swap:**
   ```bash
   sudo mv /srv/robot-grav-site    /srv/robot-grav-site-1.7-archive
   sudo mv /srv/robot-grav-site-v2 /srv/robot-grav-site
   ```
4. `sudo systemctl reload php8.3-fpm` (clears opcache) + `sudo systemctl reload nginx` + `cd /srv/robot-grav-site && sudo -u grav php bin/grav clearcache`.

**C. Verify on `https://robot.mbhs.edu` (immediately):** pages 200; admin2 sign-in; galleries incl. fll-team; YouTube embeds; **text-module images** (Leadership/Sponsor-Benefits); a large upload; branded 404; `/api/v1/sync`→403; HTTPS cert valid; GA4 firing; `grav.log` clean.

**D. Rollback (fast):**
```bash
sudo mv /srv/robot-grav-site            /srv/robot-grav-site-v2
sudo mv /srv/robot-grav-site-1.7-archive /srv/robot-grav-site
sudo systemctl reload php8.3-fpm
```
The 1.7 archive is untouched; plus the off-site backups.

**E. Soak + cleanup (~1 week):** watch `grav.log` + nginx errors; once happy — remove `…-1.7-archive`, delete the `grav-v2-test` `:8081` vhost (`rm` the sites-enabled symlink + reload nginx), retire the 8.2 standby FPM pool.

---

## 🧹 Server housekeeping to-do (live robot.mbhs.edu — deferred, opened 2026-06-15)

Not urgent: disk is **25 GB total, ~51% used, ~12 GB free** after the tarball cleanup below. These are easy wins if/when wanted, all on live, most need `sudo`.

- [x] **Delete `/home/USER` deploy backup tarballs** — DONE 2026-06-15 (off-server copies confirmed). Reclaimed ~1.25 GB. 25 Grav zips in `/srv/.../backup/` remain as the on-server net.
- [ ] **Vacuum the systemd journal (~745 MB).** `sudo journalctl --vacuum-size=200M` frees ~545 MB; make it permanent with `SystemMaxUse=200M` in `/etc/systemd/journald.conf` + `sudo systemctl restart systemd-journald`. First, see what's filling it: `sudo journalctl --since "1 day ago" -o cat | sed -E 's/[0-9]+/N/g' | sort | uniq -c | sort -rn | head` (strong hypothesis: SSH brute-force noise — see btmp item).
- 🟡 **SSH hardening — PARTIALLY DONE by Rafi 2026-06-16.** Audit found sustained botnet SSH brute-force (stats + exact config in the private CREDENTIALS.md). **Rafi applied (verified on the server):** ✅ **fail2ban** (`[sshd]` jail — auto-bans an IP after repeated failed logins); ✅ **root SSH login disabled**. **Remaining (optional):** key-only auth — `PasswordAuthentication` is still `yes`; switching it off (sshd drop-in, then `sudo sshd -t` + reload, verifying a NEW key login first) makes password-guessing impossible, but fail2ban + no-root already cover most of the risk. **Caution:** don't lock yourself out testing (unban `sudo fail2ban-client set sshd unbanip <IP>`). **Recovery / DO console:** the DigitalOcean web console logs in as a non-root user (then `sudo`) — the lockout fallback, **and** it makes the DO account root-equivalent, so keep it behind a strong password + **2FA**.
- [ ] **Truncate `/var/log/btmp.1` (114 MB)** — old rotated failed-login log: `sudo truncate -s0 /var/log/btmp.1`.
- [x] **Backup pruning — now automatic (2026-06-28).** `backups.yaml` set to `trigger: count`, `max_backups_count: 7`, and the Grav scheduler crontab is installed as user `grav`, so the nightly `default-site-backup` (`0 3 * * *` UTC) auto-prunes to the 7 newest zips (~327 MB each ≈ 2.3 GB). The old 923 MB `migration-backup-1.7.53--*.zip` was moved out to `/srv/` so the count-purge can't delete the rollback artifact — delete it deliberately once 2.0.3 is declared stable. *(Was: prune the 25-zip pile manually; Grav used to never auto-prune.)*
- [ ] **Retire PHP 7.4 + 8.0/8.2 standby pools** now that live is on 8.3 and the rollback window has passed — frees some `/usr`. (8.4 is installed-but-unwired; leave it.)
- [ ] **`sudo apt-get clean` + `sudo apt autoremove`** — minor (~11 MB cache + old kernels in `/boot`).
- [ ] **(Optional) Image shrink** — projected ~127 MB reclaim across 169 oversized source images (40% of the image footprint); worth it for backup/page-weight, not for disk capacity. Estimator: `~/Downloads/estimate_grav_image_savings.py` (read-only). Preserve hi-res originals off-server before any resize run.

### Security audit (read-only, 2026-06-16) — remaining findings
The most critical check **passed**: Grav's flat-file secrets (`user/accounts` hashes, `user/config`, `.git`, `backup/`, `logs/`, raw `.md`) are all web-blocked (403). HTTP→HTTPS redirect ✓, valid LE cert ✓, only 22/80/443 exposed externally ✓, unattended security upgrades ON ✓.
- [x] **nginx TLS + headers + server_tokens** — DONE 2026-06-16 (see LIVE changelog).
- [x] **Grav admin: prune stale accounts** — DONE 2026-06-16/17: disabled the 7-account **2022 cohort**, taking the roster **16 → 9 active**; kept-not-deleted (reversible), super-admin access preserved.
- [ ] **🔑 Grav admin 2FA** — still **0 of the 9 active accounts** have TOTP 2FA. `/admin` is internet-reachable, so enable 2FA at least on the supers. Web analog of the SSH brute-force exposure; done entirely in the Grav admin UI.
- [ ] **(Optional) Restrict `/admin` reachability** — IP-allowlist or nginx HTTP basic-auth in front of `/admin` for defense-in-depth. Consider also dropping the still-broad super-admin spread.
- [ ] **MariaDB 10.6 running but unused** (Grav is flat-file; bound to 127.0.0.1) — confirm nothing uses it, then `sudo systemctl disable --now mariadb` to free RAM + cut surface.
- [ ] **(Later) CSP + `force_ssl`** — add a Content-Security-Policy header (needs per-page testing) and optionally set Grav `force_ssl: true` for defense-in-depth.

### Security audit follow-up (2026-07-02) — applied fixes
Second read-only pass (external probing + code review of the `image-intake` plugin). Posture confirmed strong — HTTP→HTTPS + HSTS enforced, TLS 1.3 (TLS 1.0 refused), all Grav secret trees 403, on the latest **Grav 2.0.3** with recent CVEs patched. Two live gaps found and closed; **both edits are live-only, OUTSIDE the Grav backup** — re-apply if the droplet is rebuilt.

- [x] **`CHANGELOG.md` version disclosure — FIXED 2026-07-02.** The 2026-06-16 "raw `.md` all 403" note was slightly optimistic: the stock Grav nginx recipe denies `.md` only under `user/`, `system/`, `vendor/` — **not the web root** — so `https://robot.mbhs.edu/CHANGELOG.md` served `200` and leaked the exact Grav version + patched-advisory list. Added to the Security block of `/etc/nginx/sites-available/grav`:
  `location ~* ^/(CHANGELOG|README|SECURITY|CONTRIBUTING|LICENSE)\.(md|txt)$ { return 403; }`
  then `sudo nginx -t && sudo systemctl reload nginx`. Verified `403` (homepage still `200`). *(Gotcha seen live: nginx's graceful reload lets old workers drain existing keep-alive connections, so the first post-reload `curl` can still show the old `200` briefly — re-test, don't panic.)*
- [x] **ImageMagick MVG/MSL coders — FIXED 2026-07-02.** `/etc/ImageMagick-6/policy.xml` already denied the SSRF (`URL`/`HTTPS`/`HTTP` delegates) and Ghostscript (`PS`/`EPS`/`PDF`/`XPS`) vectors, but **`MVG` was commented out and `MSL` absent** — the two classic "ImageTragick" local file-read/RCE coders. Added before `</policymap>` (all `rights="none"`): `MVG`, `MSL`, `EPHEMERAL`, `module {MSL,MVG}`, `delegate MVG`, `path @*`. No reload needed (policy is read per `convert` call). Verified via `identify -list policy` (all `rights: None`) and a real MVG file → *"not allowed by the security policy 'MVG'"*; normal raster resize still works. Backup at `/etc/ImageMagick-6/policy.xml.bak-<ts>`.
- **`image-intake` plugin code review — clean, no code changes needed.** The `shrink()` `convert` call wraps every path in `escapeshellarg()` and int-casts width/quality (no shell injection); `sanitizeName()` rebuilds names from `basename()` + a strict `[a-z0-9_-]` whitelist (no path traversal); uploads are admin-only and gated by `getimagesize()` before `convert` runs. The MVG/MSL policy above is the defense-in-depth layer behind it. *(Minor optional hardening, not bugs: pin `/usr/bin/convert`; sanitize the `$template` string used in `blueprintContentDefault()`'s `theme://` path.)*
- [ ] **Carried forward, still open:** Grav admin **TOTP 2FA** (still 0/9 — see item above), key-only SSH, DO-account 2FA, CSP.

**Housekeeping spotted this pass (not security holes):**
- [ ] **Stray enabled vhost `grav-v2-test`** — leftover from the 2026-06-27 v2 parallel build, still symlinked in `sites-enabled/`. Harmless (binds `127.0.0.1:8081`, `server_name localhost`, root `/srv/robot-grav-site-v2/` — loopback only, never serves the public site), but unlink it once the v2 tree isn't needed: `sudo rm /etc/nginx/sites-enabled/grav-v2-test && sudo nginx -t && sudo systemctl reload nginx`.
- [ ] **`grav.bak-*` files in `sites-available/`** — not loaded (the `nginx.conf` include is `sites-enabled/*`), but tidier parked in `/etc/nginx/backups/`.

### 🔼 Live large-photo upload limits (4-layer config — ⚠️ NOT in the Grav backup)
Enabled 2026-06-15 so admin uploads of 9–12 MB phone photos succeed (a bare droplet ships stingy defaults; the `image-intake` plugin can't help — these limits reject the upload *before* its hook fires). Smallest layer wins; all four were raised on live:

| Layer | Now | How |
|---|---|---|
| nginx `client_max_body_size` | **32M** | `client_max_body_size 32M;` in the HTTPS server block of `/etc/nginx/sites-available/grav`, `nginx -t` + reload |
| PHP `post_max_size` | **30M** | site-local `/srv/robot-grav-site/.user.ini` (PHP_INI_PERDIR) |
| PHP `upload_max_filesize` | **25M** | same `.user.ini` |
| Grav `system.media.upload_limit` | **26214400 (25M)** | `user/config/system.yaml` |

`memory_limit` deliberately left at **128M** — `image-intake` resizes in the `convert` subprocess, so it's safe. **⚠️ `.user.ini` and the nginx `client_max_body_size` live OUTSIDE `user/`, so they are NOT in the Grav backup** — if the droplet is ever rebuilt/restored from a Grav backup, re-apply both (and `rm -f cache/compiled/config/*.php` to bust stale compiled config). Staging needs none of this (DreamHost defaults cover it).

---

## Cautions & Gotchas

### 🔑 OWNERSHIP — the #1 live gotcha
Live site files must be **`grav:editor`** so the web/admin user can write them. If you create/overwrite files as `USER` (scp, rsync, `>` redirects), **`chown` them back**: `sudo chown -R grav:editor <paths>` (exclude `.git` — its index is root-owned for the backup cron). Symptoms of getting it wrong: admin **"Failed to save"**, or a 500 after a plugin op. (Note the root dir `/srv/robot-grav-site/` itself is only `grav`/ACL-user writable — `.user.ini` and similar docroot-root files need `sudo`; subdirs like `user/config` are `editor`-writable, which is why theme/page/config edits work as `USER`.)

### 🔴 Protect custom theme blueprints before any theme update
Mod Quark contains custom module types (`feature-images`, `icon-menu`, `gallery-draggable`, …) built on top of Quark. Before any theme update, copy the theme first — `cp -r user/themes/mod-quark user/themes/mod-quark-backup-$(date +%Y%m%d)` — then diff afterward to confirm custom blueprints weren't overwritten. Never apply a theme update to live without doing this check on staging first.

### 🟡 Mod Quark is a custom Git repo — not GPM-managed
It's not installed through Grav's package manager; `bin/gpm update` may not handle it. Manage it manually (SSH or GitHub). **Plugin / Grav GPM updates: only ever run as `grav`** (Admin "Update", or `sudo -u grav php bin/gpm update`) — never as `USER` (half-installs and breaks admin). **Don't remove the `email` plugin** — it's a required admin dependency (admin 500s without it).

### 🟡 Update one thing at a time, staging-first
Update a single plugin/theme, test thoroughly on staging, then apply the identical change to live. Never chain updates — if something breaks you want to know exactly which change caused it. **Version-parity caveat (current):** staging is now **Grav 2.0 / PHP 8.3** while live is **Grav 1.7.53 / PHP 8.3** — a change validated on staging's 2.0 stack is not automatically safe on live's 1.7 (and vice-versa). Treat cross-major changes with extra skepticism until live also moves to 2.0.

### 🔵 Round-trip-safe linking (staging ↔ live) — earned the hard way
Any link or image that bakes in the **domain**, a **base path**, or a **folder's numeric prefix** will break on one side. Rules:
- **Page-media images** (file in the module's own folder): reference by **filename only**. Markdown `![](filename.jpg)`; the `feature-images` template resolves via `page.media`.
- **Shared images** (`user/images/`, `/images/`): markdown `![](/user/images/x.jpg)` — Grav auto-prepends the base. **Markdown root-relative paths get rewritten; raw HTML `<img src>` does NOT.** For raw HTML that must stay HTML, add `process:` → `twig: true` to the page frontmatter and use `src="{{ base_url }}/user/images/x.jpg"`.
- **Internal page links:** root-relative, no domain — `[text](/about-us/leadership)`. Never `https://robot.mbhs.edu/...`, `https://…navybook.com/...`, or a base-prefixed path.
- **Frontmatter URLs rendered via Twig** (e.g. `icon-menu`/`feature-images` item `url:` values output as `{{ feature.url }}`): Grav does **NOT** auto-prepend the base to these like it does markdown links — the **template** must. Both menu templates already do. Any new module that emits a frontmatter URL through Twig must prepend `{{ base_url }}` itself for root-relative values.
- **The original breakage:** `feature-images.html.twig` built `src` from `header.imglocation` with **stale folder numbers** frozen in (e.g. `06.MENTORS` after the folder became `14.MENTORS`); on clone/renumber the images 404'd. Fixed by resolving each image via `page.media[feature.image].url` (folder-number- and base-proof). **⚠️ This fix lives in the theme template** — when porting a theme between environments, the template must go too, or renumbered folders 404 again.

### 🔵 Admin tool gotchas (live's Grav 1.7 classic admin)
*(These describe live's classic admin. Staging's admin2 SPA behaves differently — Expert mode there gives a working raw editor.)*
- The editor's **`</>` source/raw toggle is broken** (does nothing) — so custom frontmatter-only fields (e.g. Mod Quark's `image_align`) are NOT editable via the live admin. Use SSH, or enable admin Expert Mode.
- **Modules CAN be created in admin:** the page-list **Add** control is a **Folder / Page / Module** dropdown; choosing **Module** opens the Add-Module dialog with a **Module Template** picker (text, hero, icon-menu, …). The result is fully admin-editable. (The dialog strips a leading `_` from a typed folder name, but modules get the `_` prefix automatically.)
- Normal content edits (text, typo fixes) DO work in the WYSIWYG editor.

### 🔵 Notes & comments conventions
Grav has **no dedicated notes field**. House conventions:
- **Every new folder, page, and module starts its Content field with** `[//]: # (CommentsGoHere)` (team standard). It renders nothing (not even in the page's HTML source) but guarantees a teammate-visible notes slot in the admin editor; replace the placeholder with a real note when there's one. **Enforcement:** a single blueprint default — `user/themes/mod-quark/blueprints/default.yaml` sets `…content.default: "[//]: # (CommentsGoHere)"`; every page **and** modular-module blueprint `@extends: default`, so all inherit it. The admin editor fills the default only on a brand-new item's `null` content (`value ?? field.default`) and never clobbers an existing/empty saved body. *(On Grav 2.0 admin2 ignores this default — restored on staging by `image-intake`'s `onApiBeforePageCreate` seed, see the staging section.)*
- **A note a teammate should see/edit** → a Markdown no-output comment in the **Content** field: `[//]: # (your note here)`. Renders nothing, works in the admin editor.
- **A dev/structural metadata note** → a YAML `#` comment in the page **frontmatter** (SSH/Expert-Mode only).
- **A "how this folder works" note** → a sidecar file like `_NOTES.md` in the folder (Grav ignores non-template files).
- **Avoid `<!-- HTML comments -->`** for anything non-trivial: they're hidden from view but **delivered in the page's HTML source**. Prefer `[//]: # (...)`, which emits nothing.

### 🟢 Rollback options (live)
- **GitHub:** live has a daily root-cron backup that commits `user/pages/*` and pushes to the team repo — the fastest content rollback.
- **Grav backup zip / full tar:** point-in-time restore (`php bin/grav restore <zip>`, or untar a FULL tgz). Always `php bin/grav clearcache` after a rollback. **Pre-2.0 off-site snapshots (2026-06-26) live on the Mac in `~/Documents/449/backups/`** — see the 🛟 table in the "Live → Grav 2.0 migration" section for the exact filenames + restore commands.
- **Admin-panel changes** (plugin/theme config) can generally be reverted through the admin panel — the safest changes to make.
- **Do NOT attempt to roll back PHP/system-level changes yourself** — contact Rafi Pedersen ([redacted, in CREDENTIALS.md]) for that level of recovery.

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
| Grav CLI / package manager | `bin/grav`, `bin/gpm` (run as grav: `sudo -u grav php bin/grav …`) |
| Cache-bust version | `?v=NN` in `templates/partials/base.html.twig` |
| PHP config (live) | `/etc/php/8.3/fpm/php.ini` |
| nginx config (live) | `/etc/nginx/sites-available/grav` |

---

## Source Site Reference (live)

- **Live site / admin:** https://robot.mbhs.edu · https://robot.mbhs.edu/admin
- **Theme GitHub:** https://github.com/blair-robot-project/grav-theme-mod-quark
- **Server IP:** LIVE_IP · Ubuntu 22.04 LTS, nginx 1.18.0, **PHP 8.3 FPM**
- **Grav:** **1.7.53** (classic `admin` 1.10.x; `migrate-grav` plugin installed, ready for the 2.0 move)
- **Site admin contact:** Rafi Pedersen — [redacted, in CREDENTIALS.md]

---

## People & Roles

| Person | Role |
|--------|------|
| Rafi Pedersen | Site admin, server/infrastructure owner. Contact for live-server system-level recovery. (PHP/infra changes are no longer gated on Rafi — Brad has standing authority — but Rafi stays the recovery escalation.) |
| Brad ([redacted-email] / comms@navybook.com) | Project lead. In **Editor + Onboarder + Admin** Grav groups on live; per-user super on both live and staging. SSH to live (`USER@robot.mbhs.edu`) and the DreamHost account that hosts staging (`USER@navybook.com`). |
| James P | Previously rescued the site after a PHP update broke it — reference for system-level issues. |

---

## Historical record (condensed — full detail in CHANGELOG.md / git history)

These projects are **done**; the step-by-step playbooks were removed to keep this runbook current. The dated narrative and evidence live in **[CHANGELOG.md](CHANGELOG.md)** and git history.

- **Original staging build (navybook.com/449)** — Grav 1.7 subdirectory clone of live, built June 2026 from a ~321 MB Grav backup zip (the zip excludes `cache`/`images`/`logs`/`tmp`/`backup`; media was rsynced separately). Subdirectory installs need `custom_base_url` set in `system.yaml` or all assets 404. **Retired June 2026** (see Environments above).
- **Phase A — theme + `image-intake` plugin deploy to live** — DONE 2026-06-14/15. The visual redesign (galleries, error page, site-wide footer, menus, feature-images lightbox) + the upload-resize plugin, routed staging→local Mac→live. Deployed the **license-safe** `custom.css` (BlairMdITC font OFF; see font gate below). Phase B (bulk content reconciliation) was deferred — staging content diverged heavily from live; see **[docs/AUDIT.md](docs/AUDIT.md)**.
- **PHP upgrades on live** — 8.0.30 (EOL) → 8.2 → **8.3**, done as their own backed-up/tested cutovers with the 8.x pools kept side-by-side for one-line rollback. Live is now on 8.3.
- **Image-handling decision (2026-06-11)** — chose the custom **`image-intake`** plugin (sanitize filename + shrink-on-upload + discard original), which is memory-safe at 128M (resizes via the `convert` subprocess) and suits live's 1 GB / no-swap box — over raising PHP `memory_limit`.
- **Grav 2.0 migration** — proven on the 449.navybook.com subdomain (2026-06-23 onward); see the Staging section above.

### 🚧 Standing constraint — BlairMdITC font is license-gated (OFF)
Live serves the **license-safe** `custom.css` with BlairMdITC's `@font-face` + the `h1` font-family **commented out**, and **does not ship `fonts/`**. The font is a commercial ITC/Monotype **desktop** font (`© ITC`); a desktop license does **not** cover web `@font-face` serving. To enable it: purchase an **ITC Blair Medium webfont** license (MyFonts/Monotype, ~$30–60 lowest pageview tier; register to the team/Foundation, keep receipt+EULA), then uncomment the two spots and ship the kit's woff/woff2. **⚠️ The font files currently exist on the staging subdomain** (carried from the old clone) and are served publicly there — a pre-existing exposure to clean up when convenient.
