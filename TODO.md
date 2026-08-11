# 449 Website — To-Do and Maybe To-Do
*Last updated: 2026-08-10 · Version 1.1*

This document tracks what's currently outstanding on the live site. It's meant to be short-lived — once the immediate item is fixed and any "maybe" items are done or dismissed, this doc should be rewritten fresh for whatever's next, not endlessly appended to.

For **recurring, calendar-based maintenance** (what to update every season, every May, etc.), see the Manual's **Update Schedule** — that's a durable process, not a one-time to-do, so it lives there rather than here.

---

## 🔴 To-Do

Found via a 2026-08-10 staging/live theme diff (full detail: private staging repo CHANGELOG, same date):

- **`text.html.twig` serves year-module images larger than intended.** `/about-us/history` alone loads 25 images at a hardcoded 1200px cap (~150–240KB each) instead of the ~600px the page was originally designed around — the config field that used to set that width (`image_width`) is no longer wired up to anything. Confirmed by testing actual served images, not just reading the code. **Assigned to Kiran** to fix — he did the alt-text rewrite this bug rode in on, and Brad wants him to take this one too rather than have it patched around him.

---

## 🟡 Maybe To-Do

*Real, verified gaps — worth doing if/when someone has time, not urgent.*

- **A hardcoded `<link>` to `sponsorship-levels.css` in `text.html.twig` loads on every page using the text module, sitewide** — not scoped to whichever page actually needs it. Small file, so no real performance cost, but architecturally messy (normal CSS additions go through the theme's asset pipeline, not a raw tag inside a content template). Brad: fix eventually, not now. Note: staging has its own separate, still-dormant Google-Sheets-driven sponsor display (`sponsor-grid`) — these are two independent, unconnected efforts; Brad wants to keep both possibilities open for now.
- **`image-intake.yaml` is missing its `gallery_sync` block on live** (present on staging). This is the feature that auto-keeps a gallery's `gallery:` alt-text list in sync when photos are added/reordered/removed via Page Media. Nothing is broken without it — the 5 live pages that use it currently have correct, hand-set alt text — but new/changed photos on those pages won't get their alt text auto-maintained until this is restored. Low-risk, config-only fix (confirmed it's outside Git Sync's watched folders, so it won't trigger a live deploy) — just needs a go-ahead.
- **List the site on Team 449's official FIRST profile.** frc-events.firstinspires.org/team/449 has no website URL listed (Blue Alliance already correctly links robot.mbhs.edu) — a free, high-authority backlink sitting empty. Needs someone with FIRST Dashboard access — **flagged for Rafi or James**, not a Brad/Claude task.
- **Serve WebP + lazy-loading images.** Confirmed via a July 2026 SEO audit: no page ships `srcset=`, `loading="lazy"`, or any `.webp`/`.avif` image anywhere — every visitor downloads full-size JPEG/PNG, loaded eagerly regardless of scroll position. Natural next feature for the **Image Intake** plugin (`bpeniston/grav-plugin-image-intake`) since it already resizes on upload — would need a WebP output alongside the original plus a `loading="lazy"` attribute in the theme's image partials. Real feature work (plugin code + template changes), not a quick config fix — deserves its own session.
- **Mentors** — 6 confirmed "Joined 20??" placeholders (`/about-us/mentors`). Ask each mentor their join year directly.
- **Members of Note** — 7 confirmed blank president placeholder photos (`/about-us/history/449-members-of-note`). Source the photos, or redesign those specific cards as text-only.
- **T-Shirt Designs** — missing 2010, 2013, and 2021 designs (if they exist); no artist credit listed for the 2015 and 2016 shirts.
- **Past Presidents** — the 2024-2025 president is unknown (currently shows "?" on the Leadership page). Ask around and fill it in if anyone remembers.
- **Scouting** — build out and publish. Both pages already exist (unpublished): Historical Scouting has a full, real "Current Scouting Procedure" write-up from 2025 (QRScout, the Scout Manager role, a custom RStudio ShinyApp) that's a strong starting point for finally writing the real Current Scouting page. See the Manual's fuller write-up on this for what's involved.
- **Revive Blog, Newsletter, or Build Blog** — all three are currently retired by design (true 404s), kept as empty containers in case a future team wants to bring one back. No obligation either way.
- **Alt text for the 2019 season blog and 2022-23 blog** (~41 images across ~10 dated posts, `/about-us/history/history-2019-blog` and `-2022-23-blog`). The rest of the site's alt-text gaps (homepage, sponsors, mentors, leadership, community, all 25 Team History year-modules) were fixed 2026-07-18/19 — see CHANGELOG.md. These blog posts are the one remaining chunk: a different, older template than the rest of the site, and each photo needs real visual review (candid meeting/build photos, no name-based shortcut like the sponsor logos had) — same effort per photo as the homepage gallery work, just ~3.5x the volume. Worth its own pass.
- **BlairMdITC font** — still license-gated and disabled. Needs a purchased webfont license before it can be turned on; see RUNBOOK for details.
- **Cosmetic folder cleanup** — three confirmed-dead, already-invisible folders (`fll-team-the-blair-lego-project`, `neurorobotics`, `08._java`) could be deleted for tidiness. Purely cosmetic; leaving them costs nothing.

---

*Questions: Brad (comms@navybook.com). Server/infrastructure: Rafi Pedersen.*
