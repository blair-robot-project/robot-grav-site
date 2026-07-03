# 449 Website Audit — live (robot.mbhs.edu)
**Crawled June 17, 2026 · Status: COMPLETE**

> **Scope:** every publicly reachable page on the live site **robot.mbhs.edu**. Method: crawled the rendered pages and read the page sources over SSH. Missing or unpublished URLs now return a true HTTP **404** with the branded error page, so dead links are detectable by status code.

*Pages crawled: Home, About Us, History, Robots, 449 Members of Note, T-Shirt Designs, Leadership, Mentors, Scouting, Programming, Community, Summer Classes, FLL Team, GBT (Java), FLL Jr Expo, Bunnybots, Current Sponsors, Sponsor Benefits, Blog, Build Blog, Newsletter, Join Us.*

---

## Summary

The live site is in good shape structurally. Every page returns the right status, all titles are correct, the navigation has **no dead links**, the 2026 season record is accurate, and search/social tags are in place. The remaining issues are almost entirely **stale or unpublished content** — a blog that publicly stops in mid-2023, a newsletter with no 2026 entry, hidden Leadership officer cards, and a handful of placeholder photos — plus some page-tree housekeeping. None of the open items are wrong/embarrassing public facts; they're freshness and polish.

---

## ✅ Healthy (verified on live)

- **Page titles** — every page renders `<Page> | FRC Team 449` (no "| Grav" leak).
- **Robots / Tumbleweed (2026)** — correct full-season record **49-15-0** with the complete 4-event table (Alexandria, Bethesda, District Championship, Galileo); the old "horizantally" typo is fixed.
- **Navigation has no dead links** — the History menu, Programming page, and section menus all resolve. None of the unpublished pages below are linked from anywhere.
- **True 404s** — missing/unpublished URLs (e.g. a bad slug, the hidden Summer Classes / FLL Jr Expo pages) return HTTP 404 with the branded error page.
- **Intentional redirects work** — `/about-us/history` → `/about-us#history`; `/about-us/scouting` → `…/historical-scouting`; `/newsletter` → `…/2025-season-newsletter`.
- **SEO / social** — 21 pages carry unique per-page meta descriptions; Open Graph, Twitter Card, JSON-LD, and a canonical link all render in the page head.
- **Sponsors** — Current Sponsors renders the active set; former-sponsor cards are intentionally hidden (`published: false`).
- **Build Blog** — hidden from the public nav and login-gated, so visitors don't hit it by accident.

---

## 🟡 Significant — open

### 1. Blog publicly stops in June 2023
**Page:** `/blog` — the most recent *published* post is **2023-06-24** ("Offseason End-of-Year Party"). Four newer event recaps exist as **drafts** (`published: false`) — Detroit World Championships (Darwin Division), Week 2 Bethesda, Week 5 Blacksburg, Week 7 Chesapeake District Championships — but they're unpublished, so the public blog looks abandoned.
**Fix:** Publish the drafted recaps (and add 2025–26 posts), or formally retire the blog and point visitors to an active channel.

### 2. Newsletter is stale, and a stray duplicate folder remains
**Page:** `/newsletter` (forwards to the **2025 Season Newsletter**)
- No 2026 entry.
- The old 2022–23 monthlies (October / November / December / January) are still in the dropdown.
- Body still reads *"We hope to revitalize this tradition in the near future!"*
- A stray duplicate folder **`09.NEWSLETTER1/`** sits alongside `08.newsletter/` in the page tree. It is **not** web-reachable (`/newsletter1` → 404), so it's clutter rather than a public bug.
**Fix:** Add a 2026 entry, prune the dropdown, and delete `09.NEWSLETTER1/`.

### 3. Leadership officer cards are hidden
**Page:** `/about-us/leadership`
The President, VP-Comms, VP-Tech, and VP-Finance modules (plus an `_upperleadership-copy-copy` module) are all `published: false`, so the page shows the intro and the leadership menu but **no current officers**.
**Fix:** Finish and publish the current officer cards.

### 4. Mentors: 6 "Joined 20??" + 2 blank cards
**Page:** `/about-us/mentors` — six cards read "Joined 20??" and two are blank placeholder cards.
**Fix:** Fill the join years; remove or complete the blank cards.

### 5. Members of Note: ~9 blank president photos
**Page:** `/about-us/history/449-members-of-note` — the early-era president cards still use blank placeholder images (~9 references).
**Fix:** Source the photos, or redesign those cards as graceful text-only.

### 6. Summer Classes — hidden and stale
**Page:** `/community/summer-classes` — currently **unpublished (404)** and the body still says *"Check back in May for more information!"* Nothing links to it, so it's a hidden stale draft, not a broken link.
**Fix:** Update and publish (it's mid-June), or delete it.

### 7. FLL Jr Expo — hidden
**Page:** `/community/flljrexpo` is **404** (parent unpublished); the alternate slug `/community/fll-jr-expo` also 404s. Nothing links to either.
**Fix:** Decide whether to build out and publish, or remove.

### 8. Sponsor Benefits has no Platinum tier
**Page:** `/sponsor-information/sponsor-benefits` — tiers are Title, Diamond, Gold, Silver, Bronze. "Platinum" is used elsewhere for sponsors but isn't defined here.
**Fix:** Add a Platinum tier or reconcile the labeling.

---

## 🟢 Minor / Technical

- **T-Shirt Designs — missing years.** Present: 2009, 2011, 2012, 2015–2020, 2022–2026. **Missing: 2010, 2013, 2014, 2021.** Add the designs if they exist.
- **Homepage has no competition-season recap**, and its Community and Donate modules are unpublished drafts (so neither shows). Decide whether to add a 2026 recap and/or publish those sections.
- **No dedicated 2026 season / Worlds page** — the team's best-ever Worlds finish (Galileo) has no standalone narrative page; the championship documentary could be linked there when ready.
- **Build Blog** is a frozen 2019 FRC build log behind the login wall — fine hidden, but decide whether to retire it.

---

## 🧹 Structural / housekeeping (page-tree smells)

- **`09.NEWSLETTER1/`** — stray duplicate newsletter folder (see #2); delete.
- **`02.ABOUT-US/20.SCOUTING/03.current scouting/`** — folder name contains a **space** (URL/structure smell); rename to a hyphenated slug.
- **`02.ABOUT-US/18.LEADERSHIP/09._upperleadership-copy-copy/`** — leftover "copy-copy" module name; remove or rename.
- **Overlapping/legacy Community folders** — `03.fll-team-the-blair-lego-project` (unpublished) alongside `04.fll-team`; `06._fll_jr_expo` alongside `11.FLLJREXPO`; `08._java` alongside `12.GBT`; plus `10.neurorobotics` (unpublished). Worth a cleanup pass to remove dead/duplicate folders.

---

## Complete Page Status — live (June 17, 2026)

| Page | URL | Status | Note |
|---|---|---|---|
| Home | `/` | ✅ 200 | No competition recap; Community/Donate modules unpublished |
| About Us | `/about-us` | ✅ 200 | Mission + season recaps present |
| History (landing) | `/about-us/history` | ↪️ 302 | Intentional → `/about-us#history` |
| Robots | `/about-us/history/robots` | ✅ 200 | Tumbleweed record correct (49-15-0) |
| Members of Note | `…/449-members-of-note` | ⚠️ 200 | ~9 blank president photos |
| T-Shirt Designs | `…/t-shirt-designs` | ⚠️ 200 | Missing 2010/2013/2014/2021 |
| Leadership | `/about-us/leadership` | ⚠️ 200 | Officer cards unpublished |
| Mentors | `/about-us/mentors` | ⚠️ 200 | 6 "Joined 20??" + 2 blank cards |
| Scouting | `/about-us/scouting` | ↪️ 302 | Parent hidden → Historical Scouting |
| Programming | `/about-us/programming` | ✅ 200 | Links resolve |
| Community | `/community` | ✅ 200 | Legacy/duplicate sub-folders (see housekeeping) |
| Summer Classes | `/community/summer-classes` | 🚫 404 | Unpublished + stale ("check back in May") |
| FLL Team | `/community/fll-team` | ✅ 200 | Renders |
| GBT (Java) | `/community/gbt` | ✅ 200 | Renders |
| FLL Jr Expo | `/community/flljrexpo` | 🚫 404 | Unpublished; alt slug also 404s |
| Bunnybots | `/bunnybots` | ✅ 200 | Well maintained |
| Current Sponsors | `…/current-sponsors` | ✅ 200 | Active set renders; former cards hidden |
| Sponsor Benefits | `…/sponsor-benefits` | ⚠️ 200 | No Platinum tier |
| Blog | `/blog` | 🔴 200 | Publicly frozen at June 2023 |
| Build Blog | `/build-blog` | 🔒 200 | Login-gated, hidden from nav |
| Newsletter | `/newsletter` | ↪️ 302 | → 2025 newsletter; no 2026; stray folder |
| Join Us | `/join-us` | ✅ 200 | Renders |

**Legend:** ✅ Good · ⚠️ Has issues · 🔴 Looks abandoned · ↪️ Intentional redirect · 🔒 Gated · 🚫 Hidden (404)

---

## Recommended Fix Order

**Highest visible value:**
1. **Blog** — publish the drafted 2024–26 recaps (or formally retire/redirect) so it doesn't look abandoned.
2. **Leadership** — finish and publish the current officer cards.
3. **Mentors** — fill the six "Joined 20??" and remove the two blank cards.
4. **Members of Note** — resolve the ~9 blank president photos.

**Short-term:**
5. **Newsletter** — add a 2026 entry, prune the dropdown, delete `09.NEWSLETTER1/`.
6. **Summer Classes** — update + publish, or delete (currently hidden and stale).
7. **Sponsor Benefits** — add a Platinum tier or reconcile the labeling.
8. **FLL Jr Expo** — build out + publish, or remove.

**Housekeeping:**
9. Rename the spaced `current scouting` folder; remove the `upperleadership-copy-copy` module; prune the duplicate/legacy Community folders.

**Enhancements (before next season):**
10. Add the missing T-Shirt design years if they exist.
11. Consider a dedicated 2026 season / Worlds page (link the documentary when ready).
12. Decide the homepage's competition-recap and Community/Donate sections.

---

## 🔵 Design / Typography

### BlairMdITC font — wired but disabled (license-gated)

The BlairMdITC `@font-face` block and the `h1` font-family rule are present in `user/themes/mod-quark/css/custom.css` but **commented out**, and the font files are **not** shipped. BlairMdITC is a commercial ITC/Monotype *desktop* font, and a desktop license does not cover web `@font-face` serving.

**To enable:** purchase a **webfont** license (ITC Blair Medium webfont on MyFonts/Monotype, ~$30–60 at the lowest pageview tier; register to the team/Foundation and keep the receipt + EULA), drop the kit's `.woff2`/`.woff` into `user/themes/mod-quark/fonts/`, and uncomment the two spots in `custom.css`. Until then the headings fall back to the theme's default heading font.
