# FRC Team 449 Website — Summary of Changes

A plain-language summary of the major work on the team website ([robot.mbhs.edu](http://robot.mbhs.edu)), written for team leadership. For the full technical detail, see [CHANGELOG.md](CHANGELOG.md) and [RUNBOOK.md](RUNBOOK.md) in this folder.

## June 2026 — site overhaul and migration to the live server

- **Rebuilt and modernized the site.** Built an updated version on a separate staging copy, refined it there, then migrated all the improvements onto the live site at robot.mbhs.edu.

- **Redesigned the key pages.** Reworked the **Home** and **About Us** pages, added photo galleries, clearer navigation menus, and a branded "page not found" (404) page.

- **Corrected content and fixed broken links.** Fixed the 2026 competition season record and repaired navigation/menu links that were leading visitors to "page not found" errors.

- **Cleaned up out-of-date pages.** Reviewed the site for stale content and either refreshed it or took incomplete and outdated pages out of public view, so visitors no longer land on empty or out-of-date pages.

- **Improved stability and performance.** Upgraded the server's underlying software (**PHP**) to a current, supported version for better stability and security, and updated the site platform (Grav) and its add-ons to current versions.

- **Made photo uploads easier.** Added automatic photo-shrinking on upload, so large images from phones no longer fail or slow the site down, and raised the upload size limit.

- **Strengthened security.** Ran a security review and acted on it: enabled modern encryption settings and security headers, closed a password-reset link-spoofing risk, and pruned old/unused admin login accounts. (Identified as next steps: tighter SSH login security and two-factor authentication for admins.)

- **Improved search visibility (SEO).** Added social-media share previews, per-page descriptions, and a sitemap, and set up Google Search Console to monitor how the site performs in Google search.

- **Protected against data loss.** Confirmed the site's automatic nightly backups are running, kept off-site copies, and verified the whole site can be restored if something goes wrong.

- **Made the site easier for the team to maintain — and less dependent on any one person.** Added an admin-editable footer, made photo settings adjustable from the admin panel (no server access needed), and wrote a teammate how-to guide plus full project documentation (a change log, an operations runbook, and this summary).

- **Strengthened the team's visual brand.** Renamed every page's browser-tab title from the generic "… | Grav" to "… | FRC Team 449", added the "449" wordmark to the site header and a new **449-red footer carrying the team logo**, created a branded social-share card, and applied consistent 449-red styling across the menus and headings.

- **Laid the groundwork for future upgrades.** Moved to current, supported software versions and made forward-compatible code changes so the next major platform upgrade goes more smoothly.

- **Built the next-generation staging site.** Stood up a new practice/staging site on the **next major version of the site platform (Grav 2.0)** at 449.navybook.com, rebuilt the photo galleries for it, and worked through the upgrade's rough edges (reporting two issues upstream to the software's maintainers). This is now the single place changes are tried out before going live; the older practice site was retired.

- **Upgraded the live site to the new platform (Grav 2.0).** After fully proving it on staging, migrated the live site at robot.mbhs.edu to **Grav 2.0** with no visible downtime — by building a complete copy alongside the running site, testing it thoroughly, then switching over in an overnight low-traffic window. The previous version is kept on standby for instant rollback during a one-week watch period. Everything verified working after the switch: all pages, photo galleries, video embeds, the admin login, and analytics.

---
*Maintained by Brad Peniston (comms@navybook.com). Server / infrastructure: Rafi Pedersen.*
