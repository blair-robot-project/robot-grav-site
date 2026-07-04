# Team 449 Website Revamp — Leadership Handoff
**Version 1.0 | June 5, 2026**
**Prepared by:** Brad Peniston

---

This document is the complete handoff package for the website revamp project. It contains three things:

1. **The Audit** — every issue found on robot.mbhs.edu, prioritized by severity
2. **The Purpose Brief** — a discussion guide for the team about what the site should do and who it's for (run this conversation at the start of next season)
3. **The Starter Kit** — ready-to-paste content for whoever does the cleanup work

The plan has two phases:

**Phase 1 — Emergency Cleanup (this summer).** The team just had its best season ever. People will look at the site. Right now they'll find wrong records, a missing Worlds appearance, and a president who graduated. Fix the most visible issues so the site reflects the team's actual accomplishments.

**Phase 2 — Strategic Redesign (fall, when school resumes).** A broader conversation about what the site is for and who it serves — sponsors, recruits, the community, or all three — leading to a more intentional redesign.

**What Phase 1 needs from you:**
- Designate one or two students as website editors for the summer (they need the Grav admin login)
- Give them permission to make content decisions without a committee vote
- The right profile: around this summer, good writer, detail-oriented; no coding required for most fixes

---

---

# PART 1: THE AUDIT

*Full findings from a complete crawl of robot.mbhs.edu, June 4–5, 2026.*
*The site runs on GravCMS with a custom theme called mod-quark. Content is edited via the Grav admin panel at robot.mbhs.edu/admin. The site is backed up nightly to GitHub.*

---

## 🔴 Critical — Fix immediately

### 1. Robots page: Tumbleweed data is wrong
The 2026 season entry shows 11-5-0 and Rank 26. The correct record is 49-15-0, Rank 1 (District Champions). The entire Worlds appearance is missing. There's also a "This page is under construction" banner that should be removed. **This is the most embarrassing live error on the site.**

### 2. Build Blog is login-gated — public sees a login wall
The Build Blog appears in the main nav but redirects all visitors to a login form. It also only contains content from 2019. It should be removed from the nav.

### 3. Sponsors are out of date
E.g., The homepage lists BlueHalo as a Platinum Sponsor. The full sponsors page lists AeroVironment. These are different companies. One is wrong.

### 5. Blog is three years out of date
Last post: June 2023. No coverage of 2024, 2025, or 2026 seasons. Either resume posting or remove from the nav.

### 6. Newsletter nav is cluttered with 2022–23 entries
The dropdown still shows four monthly newsletters from 2022–23. No 2026 entry exists. The page body has had a "We hope to revitalize this tradition" placeholder for years.

### 7. Scouting page is completely empty
The page exists in the nav but has zero content — just a title. Two sub-pages exist (Historical, Current) but the parent page is blank.

---

## 🟡 Significant — Fix soon

### 8. Homepage competition recap is missing the awards
The recap lists results correctly but omits: the Quality Award (Districts), the Engineering Inspiration Award (Bethesda), and the FIRST Leadership Award (Alexandria). Three major awards, none mentioned.

### 9. No 2026 Season or Worlds page exists anywhere
The team's best-ever Worlds result — Rank 7 of 75 in the Galileo Division — is not documented anywhere on the site except a line in the homepage recap. No narrative, no context, no awards summary.

### 10. Mentors page has six "Joined 20??" placeholders and a blank card
Six mentor cards show "Joined 20??" with no year. There's also a completely blank card (photo placeholder, no name) at the bottom.

### 11. Summer Classes page says "Check back in May" — it's June
The page has not been updated. Visitors don't know if classes are happening or not.

### 12. FLL Team page says applications open in May — it's June
Same problem. The application window has passed without an update.

### 13. Programming page has a likely-dead link
Links to `/community/pandemic-programming` — a COVID-era page that almost certainly no longer exists.

### 14. T-Shirt Designs page still says "under construction"
The page is actually in good shape, but the banner is still there. Also missing: 2013, 2014, and 2021 designs; no artist credits for 2015 and 2016.

### 15. Members of Note: eight president photos are blank placeholders
Presidents from 2007–2014 all have blank photo cards. These have been unfilled for years. A decision is needed: find the photos or redesign the cards to be text-only.

---

## 🟢 Minor — When time allows

- All page titles read "[Page Name] | Grav" — should say "FRC Team 449 | [Page Name]"
- Every page has the same meta description — bad for search engine results
- No Open Graph tags — links shared on Discord/Slack show no preview card
- Homepage contact section still says "Twitter" not "X"
- About Us page has only two paragraphs — no stats, no team size, no current context
- Sponsor Benefits page has no "Platinum" tier even though three Platinum sponsors are listed
- A hidden `/newsletter1` folder exists with six more old newsletter entries — investigate before cleaning up nav

---

## Technical notes (for whoever has server/theme access)

- **Active theme:** `mod-quark` (child of `quark`)
- **Custom CSS file:** `user/themes/mod-quark/css/custom.css` — this is where font and design overrides go
- **Brand color:** `#a7000a` (dark red) — already defined in custom.css
- **Git repo:** `github.com/blair-robot-project/robot-grav-site` — automated nightly backup only; edits are made through the Grav admin, not via Git push
- **14 open pull requests:** All Dependabot bot alerts targeting `user.bak` (a backup folder). All can be closed — they have no effect on the live site.

---

## Complete page status

| Page | Status | Primary Issue |
|---|---|---|
| Homepage | ⚠️ Issues | Sponsor mismatch; missing awards; wrong Worlds record |
| About Us | ⚠️ Thin | Very minimal content |
| **Robots** | 🔴 Wrong data | Tumbleweed record completely incorrect |
| Members of Note | ⚠️ Issues | 8 blank president photos |
| T-Shirt Designs | ⚠️ Issues | "Under construction" banner; missing 2013, 2014, 2021 |
| **Leadership** | 🔴 Stale | Wrong president |
| Mentors | ⚠️ Issues | 6 "20??" entries; blank card |
| **Scouting** | 🔴 Empty | No content at all |
| Programming | ⚠️ Issues | Likely dead link |
| Community | ⚠️ Minor | Two links verified OK; events list has no dates |
| Summer Classes | ⚠️ Stale | "Check back in May" — it's June |
| FLL Team | ⚠️ Stale | "Check back in May" — it's June |
| Bunnybots | ✅ Good | Best-maintained page on the site |
| Current Sponsors | ⚠️ Issues | Mismatch with homepage |
| Sponsor Benefits | ⚠️ Issues | No Platinum tier |
| **Blog** | 🔴 Dead | Last post June 2023 |
| **Build Blog** | 🔴 Blocked | Login-gated; only contains 2019 content |
| Newsletter | 🔴 Stale | Stale nav; no 2026 entry |
| Join Us | ⚠️ Minor | No year qualifier on meeting info |

---

---

# PART 2: THE PURPOSE BRIEF

*A discussion guide for the team. Best run at the start of next season with a full room.*

---

Before you redesign anything, you need to answer a question most web projects skip: **why does this website exist, and who is it actually for?** Your answers determine every decision that follows — what to prioritize, what to cut, what to add, how to organize it.

---

## The visitors

Three types of people land on robot.mbhs.edu:

**The Stranger** — knows nothing about Team 449. Forming a first impression in the first 10 seconds.

**The Warm Lead** — knows you exist. A parent whose kid just attended a STEM night. An engineer at a local company who heard about you. A high schooler thinking about joining. They came with a specific question.

**The Insider** — a team member, mentor, alumnus, or sponsor. They know everything. They came for something specific.

**Discussion questions:**
1. Which visitor is most important to your team right now? Why?
2. For each visitor type, write the one question they most need answered on the homepage.
3. Are there visitors missing from this list?

---

## What the site is for

A starting list. Your job is to refine it, add to it, and rank it.

**1. Sponsor relations**
- Impress potential sponsors with who the team is and what they've accomplished
- Explain what their money gets them at each sponsorship level
- Acknowledge and honor existing sponsors

**2. Community outreach**
- Attract people to upcoming events with dates, details, and descriptions
- Document past events so people know what to expect
- Make team resources publicly available

**3. Member recruitment**
- Show prospective members what subteams exist and what they'd do
- Explain the time commitment and what skills they'd develop
- Convey the team culture and identity

**4. Team history**
- Document every robot, every season, every award
- Honor past members
- Preserve team identity across graduating classes

**Discussion questions:**
4. Rank these four purposes from most to least important for your team right now.
5. What's missing? (Consider: current team members, parents, award judges, college admissions offices...)
6. Sponsor-focused and recruit-focused sites look different. Where do you feel that tension? How do you resolve it?

---

## The 90-second test

Someone lands on your homepage and has 90 seconds before they get distracted and leave.

**Discussion questions:**
7. What is the single most important thing you want them to walk away knowing? Write it in one sentence. Compare with the group.
8. Pull up robot.mbhs.edu right now. Time yourself: in 90 seconds, what do you actually learn?
9. What's the biggest gap between your answers to 7 and 8?

---

## What the site is not for

**Discussion questions:**
10. The Build Blog is login-gated. Is that the right call? Arguments for making it public? Arguments against?
11. Is there anything on the site that probably shouldn't be? Stale content? Pages better served elsewhere?
12. If you could remove three things from the nav bar tomorrow, what would they be?

---

## The north star

Before you leave this meeting, agree on one sentence:

> **"Team 449's website exists to ________, for ________."**

Every future decision — add a page? update a section? change a design? — gets tested against this sentence.

---

## For mentors

Watch for these dynamics in the discussion:

**If the group struggles to rank the purposes**, that's useful information — no shared understanding of team priorities. Surface it explicitly.

**The "current members" audience gets overlooked.** Students may not think of themselves as a target audience. Ask: what do *you* use the site for? What do you wish it had?

**History gets overweighted by the people in the room.** Students who built the robots care deeply about the history pages. A first-time sponsor visitor doesn't. Help them see the difference between what they find meaningful and what a stranger needs.

**The sponsor-vs-recruit tension is real and productive.** Don't paper over it — it forces good design decisions.

---

---

# PART 3: THE STARTER KIT

*Ready-to-paste content for the website editor. Work through fixes in order.*

*How to edit in Grav admin: Go to robot.mbhs.edu/admin → Pages → navigate to the page → find the content section → paste → Save.*

---

## Fix 1 — Robots page: Tumbleweed entry 🔴
**Admin path:** Pages → About Us → History → Robots → Tumbleweed section

Replace the Tumbleweed description and results table with:

---

**Tumbleweed — FRC 2026 (REBUILT)**

Our robot for the 2026 FIRST Robotics Competition, REBUILT. Tumbleweed features a horizontally extending hopper, a double shooter, and can drive under the trench.

**Season record: 49–15–0**

| Event | Rank | Record | Award |
|---|---|---|---|
| CHS District Alexandria VA Event | 7 | 11–5–0 | FIRST Leadership Award |
| CHS District Bethesda MD Event | 5 | 10–6–0 | Engineering Inspiration Award |
| FIRST Chesapeake District Championship | **1** | **17–0–0** | **District Event Winner · Quality Award** |
| FIRST Championship — Galileo Division | 7 of 75 | 13–4–0 | — |

---

Also: remove the "This page is under construction" banner at the top of the Robots page.

---

## Fix 2 — Build Blog: Remove from nav 🔴
**Admin path:** Pages → Build Blog

Set **Visible** to **No**. This hides it from the nav without deleting anything. The Build Blog is login-gated and only contains 2019 content — no public visitor should be seeing a login form when they click it.

---

## Fix 3 — Homepage: Fix sponsor mismatch 🔴
**Admin path:** Pages → Home → Sponsors section

Find "BlueHalo" and replace with "AeroVironment." If a BlueHalo logo image is used, swap it for the AeroVironment logo (check with whoever manages sponsor relations for the correct file).

---

## Fix 4 — Leadership page: Update president 🔴
**Admin path:** Pages → About Us → Leadership → President section

Replace Roman S with Oliver Kim:

> **Oliver Kim**
> President, 2025–2026

Add Roman S to the Past Presidents section if not already there.

**Note:** If 2026–2027 officers have been elected, update to the new president and move Oliver to Past Presidents. Check with team leadership on current status.

---

## Fix 5 — Newsletter: Clean up nav + add 2026 entry 🔴
**Admin path:** Pages → Newsletter

Set the four old monthly newsletters (October, November, December, January) to **Visible: No**. Then create a new newsletter page titled **"2026 Season Newsletter"** with this content:

---

**2026 Season Newsletter**

What a year for Team 449.

Tumbleweed, our robot for the 2026 FIRST Robotics Competition (game: REBUILT), had one of the strongest seasons in team history. We went **17–0 at the Chesapeake District Championship**, winning the event and earning the **Quality Award** — a judges' recognition for build quality and the ability to repair under pressure.

At the **2026 FIRST World Championship** in Houston, Texas, we competed in the Galileo Division against 75 of the best robotics teams in the world. We finished **13–4**, ranked **7th out of 75 teams** — one match from the Einstein Finals. It was the best Worlds result in team history.

Along the way, we also won the **FIRST Leadership Award** at our Alexandria event and the **Engineering Inspiration Award** at our Bethesda event.

Thank you to our mentors, our families, our school, and every sponsor who made this season possible. We'll see you in 2027.

— Team 449, The Blair Robot Project

---

## Fix 6 — Homepage: Expand competition recap 🟡
**Admin path:** Pages → Home → Competitions section

Replace the current recap text with:

---

**2026 Competition Season**

Team 449 competed in four events during the 2026 FIRST Robotics season (game: REBUILT), finishing with an overall record of **49–15–0**.

| Event | Result | Award |
|---|---|---|
| CHS District Alexandria VA | Rank 7, 11–5–0 | FIRST Leadership Award |
| CHS District Bethesda MD | Rank 5, 10–6–0 | Engineering Inspiration Award |
| Chesapeake District Championship | **Rank 1, 17–0–0, Event Winner** | Quality Award |
| FIRST Championship — Galileo Division | **Rank 7 of 75, 13–4–0** | — |

At the World Championship, Team 449 reached the division semifinals — the best Worlds result in the team's 27-year history.

---

## Fix 7 — Summer Classes: Update stale message 🟡
**Admin path:** Pages → Community → Summer Classes

Replace "Check back in May for more information!" with one of:

- **If classes are happening:** Add registration dates and link.
- **If classes are not happening:** "Summer classes are on hiatus for 2026. Check back in 2027 or follow us on Instagram [@blairrobot](https://instagram.com/blairrobot) for updates."
- **If status is unknown:** "We are finalizing plans for summer 2026 programming. Follow us on Instagram [@blairrobot](https://instagram.com/blairrobot) for the latest."

---

## Fix 8 — FLL Team: Update stale message 🟡
**Admin path:** Pages → Community → FLL Team

- **If applications are open:** Add link and deadline.
- **If not yet open:** "Applications for the 2026–2027 season will open in [month]. Email [contact] for more information."

---

## Fix 9 — Scouting page: Add content or hide 🔴
**Admin path:** Pages → About Us → Scouting

**Option A — Add content:**

> Team 449 uses a comprehensive scouting system to track robot performance across all teams at every event we attend. Our scouting data informs match strategy, alliance selection, and post-season analysis.
>
> See our [Historical Scouting](/about-us/scouting/historical-scouting) and [Current Scouting](/about-us/scouting/current-scouting) pages for more.

**Option B — Hide it:** Set Visible to No until content is ready.

---

## Fix 10 — Mentors page: Fill in "20??" entries 🟡
**Admin path:** Pages → About Us → Mentors

Ask the following mentors when they joined and update their cards: Rafi Pedersen, James Pham, Tim Judkins, Steve Chang, Mark Miranda, Tina Miranda.

Also: delete the blank placeholder card at the bottom of the list.

---

## Fix 11 — T-Shirt Designs: Remove "under construction" banner 🟡
**Admin path:** Pages → About Us → History → T-Shirt Designs

Delete the "This page is under construction" line. Also gather (if available): 2013, 2014, and 2021 shirt designs; designer names for the 2015 and 2016 shirts.

---

## Future fix — Create a 2026 Season page 🟡
*New page — create after the championship documentary is published.*

**Suggested URL:** `/about-us/history/2026-season`
**Title:** `2026 Season — REBUILT`

**Draft content:**

---

**2026 Season — REBUILT**

The 2026 FIRST Robotics Competition game, REBUILT, challenged teams to score by shooting balls into a central hub. Team 449's robot, **Tumbleweed**, featured a horizontally extending hopper, a double shooter, and the ability to drive under the trench.

**Season by the numbers:**
- Overall record: 49–15–0
- District Championship: 17–0–0 (undefeated), Event Winner
- World Championship division rank: 7th of 75 (Galileo Division)
- Awards: FIRST Leadership Award · Engineering Inspiration Award · Quality Award · District Event Winner

**World Championship — Galileo Division, Houston TX**

Team 449 competed against 74 of the best robotics teams from 16 countries. After finishing qualification matches ranked 7th, they advanced through the double-elimination playoff bracket to the division semifinals — the best Worlds result in the team's 27-year history.

[Documentary video — add when published]

---

## CSS fix — BlairMdITC font *(pending license)*
*Do not implement until font license is confirmed.*

**File to edit:** `user/themes/mod-quark/css/custom.css`

When the license is confirmed, add to the bottom of custom.css and upload font files to `user/themes/mod-quark/fonts/`:

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

---

## Fix tracker

| # | Fix | Page | Status |
|---|---|---|---|
| 1 | Fix Tumbleweed data; remove "under construction" | Robots | ⬜ |
| 2 | Hide Build Blog from nav | Build Blog | ⬜ |
| 3 | Fix BlueHalo → AeroVironment | Homepage | ⬜ |
| 4 | Update President to Oliver Kim | Leadership | ⬜ |
| 5 | Clean up newsletter nav + add 2026 entry | Newsletter | ⬜ |
| 6 | Expand competition recap with awards | Homepage | ⬜ |
| 7 | Update Summer Classes message | Summer Classes | ⬜ |
| 8 | Update FLL Team message | FLL Team | ⬜ |
| 9 | Add content to Scouting or hide it | Scouting | ⬜ |
| 10 | Fix "20??" mentor entries + remove blank card | Mentors | ⬜ |
| 11 | Remove "under construction" banner | T-Shirt Designs | ⬜ |
| 12 | Create 2026 Season page | New page | ⬜ |
| CSS | BlairMdITC font | custom.css | ⏳ Waiting on license |

---

*Team 449 — The Blair Robot Project | Montgomery Blair High School | June 2026*
