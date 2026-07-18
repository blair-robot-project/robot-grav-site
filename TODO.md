# 449 Website — To-Do and Maybe To-Do
*Last updated: 2026-07-18 · Version 1.0*

This document tracks what's currently outstanding on the live site. It's meant to be short-lived — once the immediate item is fixed and any "maybe" items are done or dismissed, this doc should be rewritten fresh for whatever's next, not endlessly appended to.

For **recurring, calendar-based maintenance** (what to update every season, every May, etc.), see the Manual's **Update Schedule** — that's a durable process, not a one-time to-do, so it lives there rather than here.

---

## 🔴 To-Do

**Fix the sponsor mismatch on the homepage.** The homepage still credits **"BlueHalo"** as a Platinum Sponsor; the actual current sponsor is **AeroVironment** (Current Sponsors page already has this right). If a logo image is used, swap it too.

That's the only must-fix item right now — everything else is optional.

---

## 🟡 Maybe To-Do

*Real, verified gaps — worth doing if/when someone has time, not urgent.*

- **List the site on Team 449's official FIRST profile.** frc-events.firstinspires.org/team/449 has no website URL listed (Blue Alliance already correctly links robot.mbhs.edu) — a free, high-authority backlink sitting empty. Needs someone with FIRST Dashboard access — **flagged for Rafi or James**, not a Brad/Claude task.
- **Serve WebP + lazy-loading images.** Confirmed via a July 2026 SEO audit: no page ships `srcset=`, `loading="lazy"`, or any `.webp`/`.avif` image anywhere — every visitor downloads full-size JPEG/PNG, loaded eagerly regardless of scroll position. Natural next feature for the **Image Intake** plugin (`bpeniston/grav-plugin-image-intake`) since it already resizes on upload — would need a WebP output alongside the original plus a `loading="lazy"` attribute in the theme's image partials. Real feature work (plugin code + template changes), not a quick config fix — deserves its own session.
- **Mentors** — 6 confirmed "Joined 20??" placeholders (`/about-us/mentors`). Ask each mentor their join year directly.
- **Members of Note** — 7 confirmed blank president placeholder photos (`/about-us/history/449-members-of-note`). Source the photos, or redesign those specific cards as text-only.
- **T-Shirt Designs** — missing 2010, 2013, and 2021 designs (if they exist); no artist credit listed for the 2015 and 2016 shirts.
- **Past Presidents** — the 2024-2025 president is unknown (currently shows "?" on the Leadership page). Ask around and fill it in if anyone remembers.
- **Scouting** — build out and publish. Both pages already exist (unpublished): Historical Scouting has a full, real "Current Scouting Procedure" write-up from 2025 (QRScout, the Scout Manager role, a custom RStudio ShinyApp) that's a strong starting point for finally writing the real Current Scouting page. See the Manual's fuller write-up on this for what's involved.
- **Revive Blog, Newsletter, or Build Blog** — all three are currently retired by design (true 404s), kept as empty containers in case a future team wants to bring one back. No obligation either way.
- **BlairMdITC font** — still license-gated and disabled. Needs a purchased webfont license before it can be turned on; see RUNBOOK for details.
- **Cosmetic folder cleanup** — three confirmed-dead, already-invisible folders (`fll-team-the-blair-lego-project`, `neurorobotics`, `08._java`) could be deleted for tidiness. Purely cosmetic; leaving them costs nothing.

---

*Questions: Brad (comms@navybook.com). Server/infrastructure: Rafi Pedersen.*
