# Team 449 Website — Editor Starter Kit
**Version 1.0 | June 5, 2026**

This document is for whoever is taking on website cleanup. Everything here is ready to paste into the Grav admin. No research needed — the correct content is already written. Work through the fixes in order; the 🔴 Critical ones first.

**How to edit a page in Grav admin:**
1. Go to `robot.mbhs.edu/admin` and log in
2. Click **Pages** in the left sidebar
3. Find the page using the tree (folder paths are noted for each fix below)
4. Click the page, find the right content section, paste the replacement text, click **Save**

---

## FIX 1 — Robots Page: Tumbleweed Entry 🔴
**Admin path:** Pages → About Us → History → Robots → find the Tumbleweed section

**What's wrong:** Wrong season record (shows 11-5-0 instead of 49-15-0), wrong rank (shows Rank 26 instead of Rank 1), entire Worlds appearance missing, and a typo.

**Replace the Tumbleweed description and results with:**

---

### Tumbleweed — FRC 2026 (REBUILT)

Our robot for the 2026 FIRST Robotics Competition, REBUILT. Tumbleweed features a horizontally extending hopper, a double shooter, and can drive under the trench.

**Season record: 49–15–0**

| Event | Rank | Record | Award |
|---|---|---|---|
| CHS District Alexandria VA Event | 7 | 11–5–0 | FIRST Leadership Award |
| CHS District Bethesda MD Event | 5 | 10–6–0 | Engineering Inspiration Award |
| FIRST Chesapeake District Championship | **1** | **17–0–0** | **District Event Winner · Quality Award** |
| FIRST Championship — Galileo Division | 7 of 75 | 13–4–0 | — |

---

**Also:** Remove the "This page is under construction" notice at the top of the Robots page.

---

## FIX 2 — Build Blog: Remove from Navigation 🔴
**Admin path:** Pages → Build Blog

**What's wrong:** The Build Blog is login-gated (visitors see a login form, not content) and only contains content from 2019. It should not be in the public nav.

**Action:** In the Grav admin, find the Build Blog page and set **Visible** to **No** (or toggle "Published in menu" off). This hides it from the nav without deleting anything.

**No content to paste — this is a toggle only.**

---

## FIX 3 — Homepage: Fix Sponsor Mismatch 🔴
**Admin path:** Pages → Home → Sponsors section (/_sponsors)

**What's wrong:** The homepage lists BlueHalo as a Platinum Sponsor, but the full sponsors page lists AeroVironment. BlueHalo and AeroVironment are different companies.

**Action:** Find "BlueHalo" in the homepage Sponsors section and replace with "AeroVironment."

If the homepage uses a logo image for BlueHalo, that image will also need to be swapped for the AeroVironment logo. Check with whoever manages sponsor relations for the correct logo file.

---

## FIX 4 — Leadership Page: Update President 🔴
**Admin path:** Pages → About Us → Leadership → President section (/_president)

**What's wrong:** The page still shows Roman S as President. The 2025–2026 president was Oliver Kim (confirmed in Members of Note page and Worlds records).

**Two things to update:**

**4a. President card** — Replace Roman S's name and info with:

> **Oliver Kim**
> President, 2025–2026

**4b. "Past Presidents" section** — Add Roman S to the Past Presidents list if he isn't already there.

**Note:** If 2026–2027 officers have already been elected, update to the new president instead and move Oliver to Past Presidents. Check with team leadership on the current status.

---

## FIX 5 — Newsletter: Clean Up Navigation 🔴
**Admin path:** Pages → Newsletter

**What's wrong:** The newsletter dropdown shows four 2022–23 monthly newsletters (October, November, December, January) that are years old and clutter the nav. There's also a hidden `/newsletter1` folder with six more old entries.

**Action:** For each of the four old monthly newsletter pages (October, November, December, January under `/newsletter`), set **Visible** to **No** in the admin. This removes them from the dropdown without deleting the content.

**Also:** Add a new newsletter entry for 2026. Even a simple one-paragraph update counts. Suggested title: **"2026 Season Newsletter"**

Suggested content for the 2026 newsletter:

---

### 2026 Season Newsletter

What a year for Team 449.

Tumbleweed, our robot for the 2026 FIRST Robotics Competition (game: REBUILT), had one of the strongest seasons in team history. We went **17–0 at the Chesapeake District Championship**, winning the event and earning the **Quality Award** — a judges' recognition for build quality and the ability to repair under pressure.

At the **2026 FIRST World Championship** in Houston, Texas, we competed in the Galileo Division against 75 of the best robotics teams in the world. We finished the tournament **13–4**, ranked **7th out of 75 teams** — one match away from the Einstein Finals. It was the best Worlds result in team history.

Along the way, we also won the **FIRST Leadership Award** at our Alexandria event and the **Engineering Inspiration Award** at our Bethesda event.

Thank you to our mentors, our families, our school, and every sponsor who made this season possible. We'll see you in 2027.

— Team 449, The Blair Robot Project

---

## FIX 6 — Homepage: Expand Competition Recap 🟡
**Admin path:** Pages → Home → Competitions section (/_competitions)

**What's wrong:** The recap lists results but is missing the awards, and the Worlds record needs verification.

**Replace the current competition recap text with:**

---

### 2026 Competition Season

Team 449 competed in four events during the 2026 FIRST Robotics season (game: REBUILT), finishing with an overall record of **49–15–0**.

| Event | Result | Award |
|---|---|---|
| CHS District Alexandria VA | Rank 7, 11–5–0 | FIRST Leadership Award |
| CHS District Bethesda MD | Rank 5, 10–6–0 | Engineering Inspiration Award |
| Chesapeake District Championship | **Rank 1, 17–0–0, Event Winner** | Quality Award |
| FIRST Championship — Galileo Division | **Rank 7 of 75, 13–4–0** | — |

At the World Championship, Team 449 reached the division semifinals — the best Worlds result in the team's 27-year history.

---

## FIX 7 — Summer Classes: Update Stale Message 🟡
**Admin path:** Pages → Community → Summer Classes

**What's wrong:** The page says "Check back in May for more information!" — it is now June 2026.

**Replace with one of the following depending on the actual situation:**

**Option A — Classes are happening this summer:**
> Registration for 2026 summer classes is now open! [Add dates, registration link, and details here.]

**Option B — Classes are not happening this summer:**
> Summer classes are on hiatus for 2026. We hope to offer programming again in summer 2027. Follow us on Instagram [@blairrobot](https://instagram.com/blairrobot) for updates.

**Option C — Status unknown:**
> We are finalizing plans for summer 2026 programming. Check back soon, or follow us on Instagram [@blairrobot](https://instagram.com/blairrobot) for the latest updates.

---

## FIX 8 — FLL Team: Update Stale Message 🟡
**Admin path:** Pages → Community → FLL Team

**What's wrong:** The page says applications for 2026–2027 will open in May — it's June 2026.

**Replace with one of the following:**

**Option A — Applications are now open:**
> Applications for the 2026–2027 Blair LEGO Project season are now open! [Add application link and deadline here.]

**Option B — Applications not yet open:**
> Applications for the 2026–2027 season will open in [month]. Check back soon or email [contact] for more information.

---

## FIX 9 — Scouting Page: Add Basic Content or Hide 🔴
**Admin path:** Pages → About Us → Scouting

**What's wrong:** The page is completely empty — just a title. Visitors clicking "Scouting" in the nav see nothing.

**Option A (preferred) — Add a brief description:**

---

### Scouting

Team 449 uses a comprehensive scouting system to track robot performance across all teams at every event we attend. Our scouting data informs match strategy, alliance selection, and post-season analysis.

For more information, visit our [Historical Scouting](/about-us/scouting/historical-scouting) and [Current Scouting](/about-us/scouting/current-scouting) pages.

---

**Option B — Hide the page from nav:**
Set **Visible** to **No** in the admin until content is ready. The sub-pages (Historical and Current) can remain live; they just won't be accessible from the top nav.

---

## FIX 10 — Mentors Page: Replace "20??" Placeholders 🟡
**Admin path:** Pages → About Us → Mentors → Mentors section (/_features)

**What's wrong:** Six mentor cards show "Joined 20??" and there is one completely blank card at the bottom.

**Action:** Ask the following mentors when they joined the team and update their cards:
- Rafi Pedersen
- James Pham
- Tim Judkins
- Steve Chang
- Mark Miranda
- Tina Miranda

**Also:** Delete the blank placeholder card at the bottom of the mentors list entirely.

This fix requires information you'll need to gather from the mentors directly. Send a quick Slack/email asking each one: "What year did you join Team 449 as a mentor?"

---

## FIX 11 — T-Shirt Designs: Remove "Under Construction" Banner 🟡
**Admin path:** Pages → About Us → History → T-Shirt Designs

**Action:** Find and delete the line that says "This page is under construction." The page is actually in good shape and doesn't need that label.

**Also needed (gather separately):**
- Find and upload 2013 and 2014 t-shirt design images if they exist
- Find and upload 2021 t-shirt design image if it exists
- Identify the designers of the 2015 and 2016 shirts and add artist credits

---

## FUTURE FIX — Create a 2026 Season Page 🟡
**This is a new page, not an edit. Suggested timing: after the championship documentary is published.**

**Admin path:** Pages → Create New Page under About Us → History

**Suggested URL:** `/about-us/history/2026-season`
**Suggested title:** `2026 Season — REBUILT`

**Draft content:**

---

### 2026 Season — REBUILT

The 2026 FIRST Robotics Competition game, REBUILT, challenged teams to score "fuel" (balls) by shooting them into a central hub. Team 449's robot, **Tumbleweed**, featured a horizontally extending hopper, a double shooter, and the ability to drive under the trench.

**The season by the numbers:**
- Overall record: **49–15–0**
- District Championship record: **17–0–0** (undefeated)
- World Championship division rank: **7th of 75**
- Awards: FIRST Leadership Award, Engineering Inspiration Award, Quality Award, District Event Winner

**World Championship — Galileo Division**

At the 2026 FIRST World Championship in Houston, Texas, Team 449 competed in the Galileo Division against 74 of the best robotics teams from 16 countries. After finishing qualification matches ranked 7th out of 75 teams, Team 449 advanced through the double-elimination playoff bracket to the division semifinals — the best Worlds result in the team's history.

[Documentary video embed — add when published]

**[Link to full competition history on The Blue Alliance]**

---

## CSS FIX — BlairMdITC Font (Pending License)
**Status: Waiting on license verification. Do not implement until license is confirmed.**

**Admin path:** Themes admin (requires elevated access) — OR — direct file edit at:
`user/themes/mod-quark/css/custom.css`

**When license is confirmed, add to the bottom of custom.css:**

```css
@font-face {
    font-family: 'BlairMdITC';
    src: url('../fonts/BlairMdITC-Medium.woff2') format('woff2'),
         url('../fonts/BlairMdITC-Medium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'BlairMdITC', 'Trebuchet MS', sans-serif;
}

.navbar a, nav a {
    font-family: 'BlairMdITC', 'Trebuchet MS', sans-serif;
}
```

Font files go in: `user/themes/mod-quark/fonts/`

---

## Quick Reference: Fix Status Tracker

| # | Fix | Page | Status |
|---|---|---|---|
| 1 | Fix Tumbleweed data + remove "under construction" | Robots | ⬜ Not started |
| 2 | Hide Build Blog from nav | Build Blog | ⬜ Not started |
| 3 | Fix BlueHalo → AeroVironment | Homepage | ⬜ Not started |
| 4 | Update President to Oliver Kim | Leadership | ⬜ Not started |
| 5 | Clean up newsletter nav + add 2026 entry | Newsletter | ⬜ Not started |
| 6 | Expand competition recap with awards | Homepage | ⬜ Not started |
| 7 | Update Summer Classes message | Summer Classes | ⬜ Not started |
| 8 | Update FLL Team message | FLL Team | ⬜ Not started |
| 9 | Add content to Scouting or hide it | Scouting | ⬜ Not started |
| 10 | Fix "20??" mentor entries + remove blank card | Mentors | ⬜ Not started |
| 11 | Remove "under construction" banner | T-Shirt Designs | ⬜ Not started |
| 12 | Create 2026 Season page | New page | ⬜ Not started |
| CSS | BlairMdITC font (pending license) | custom.css | ⏳ Waiting |

Change ⬜ to ✅ as you complete each fix.

---

*Prepared for Team 449 Web Committee | The Blair Robot Project | June 2026*
*Questions or corrections: bring them to Brad Peniston or ask in the team Discord.*
