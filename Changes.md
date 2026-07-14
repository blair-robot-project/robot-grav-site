# FRC Team 449 Website — Summary of Changes
*Last updated: 2026-07-14 · rev 2026-07-14a*

A plain-language summary of the work on the team website ([robot.mbhs.edu](http://robot.mbhs.edu)), written for team leaders. For the full technical detail, see [CHANGELOG.md](CHANGELOG.md) and [RUNBOOK.md](RUNBOOK.md) in this folder.

## June-July 2026

- **Moved the site onto Grav 2.x and PHP 8.3.** Improves the site's stability and performance; makes it easier to keep Grav/plugins/Ubuntu/PHP up to date. (The site was running on Grav 1.7 and PHP 7.X, the latter of which was no longer receiving updates.)
- **Improved site documentation.** Created INSTRUCTIONS.md, a how-to guide with an annual update schedule; TODO.md, a list of suggested to-dos; and RUNBOOK.md, a technical guide to the site. 
- **Consolidated and redesigned key pages.** Home page (added team summary, gallery, What's New, videos), About Us (pulled in team history, including old blog posts and newsletters), Bunnybots (combined pages), Sponsor Benefits (added reasons to sponsor 449; reformatted levels), etc.
- **Added features.**
  - Created **Image Intake**, a plugin that automatically shrinks image files and normalizes filenames as they are added to pages.
  - Created **gallery-draggable**, a module template that holds one or more rows of images.
  - Added a **footer** and a **custom 404 page**.
  - Added a **site-wide announcement banner**, so team leaders can post time-limited notices (e.g. "Registration closes June 21") directly from the admin panel — no developer needed. Banners can carry a link, a color, and automatically show/hide on set dates.
- **General cleanup.** Updated stale pages, fixed broken links, moved unneeded Grav 1.7 files into the archive folder, etc.
- **Simplified backups.** Grav backs up the site every night, keeping 14 days' worth of backups. (Replaced a cronjob that copied page text into GitHub.)
- **Strengthened security.** Enabled modern encryption settings and security headers, closed a password-reset link-spoofing risk, and pruned old admin logins. 
- **Improved search visibility (SEO).** Added meta tags, per-page descriptions, and a sitemap.
- **Strengthened the site's visual brand.** Renamed every page's browser-tab title from the generic "… | Grav" to "… | FRC Team 449", restored the "449" wordmark to the site header, added a 449-red footer, created branded social-share cards.
- **Rebuilt Team History.** Every competition year now has its own dedicated page with the game, robot, results, and Bunnybots info, plus a jump-to-year index and a redesigned Robots gallery where clicking a robot's photo shows the full-size image and clicking its name jumps to that year's page. Replaces the old, partial history section while keeping the existing 2019 season blog and past newsletters intact.
---
