# 449 Website Audit — live (robot.mbhs.edu)
**Original crawl June 17, 2026 · Corrected 2026-07-04 · rev 2026-07-04d**

## ⚠️ Correction notice — please read before using anything below

An earlier revision of this document (rev 2026-07-03c) contained findings that were **fabricated by an unreliable fetch tool and reported with false confidence**. That revision claimed: a site-wide page-title bug, a rewritten History landing page with cards, two broken links stemming from it, a content regression on the Robots page (wrong season record, a reverted typo), and other changes that **do not exist on the live site**. None of that held up when checked directly against the server with `curl`. That revision should be treated as void — if you saved or referenced it, discard it in favor of this one.

**This revision contains only findings verified by direct `curl` output from the live server**, run 2026-07-03/04. Everything else is explicitly marked as carried over from the June 17 crawl and **not re-verified**.

**Source of truth:** this audit lives in the team repo `blair-robot-project/robot-grav-site`, which is authoritative — see RUNBOOK "Repository & source of truth."

---

## ✅ Verified directly via curl, 2026-07-03/04 (from the server — trustworthy)

**Page titles are correct sitewide.** Every page checked renders the proper `<Page> | FRC Team 449` format: Home, About Us, Members of Note, T-Shirt Designs, Historical Scouting, Programming, GBT, Bunnybots, Sponsor Benefits, Join Us, Leadership, Mentors, Community. **There is no title-tag bug.**

**History and Scouting are unchanged intentional redirects**, same as June 17:
- `/about-us/history` → 302 → `/about-us#history`
- `/about-us/scouting` → 302 → `/about-us/scouting/historical-scouting`

**Robots page content is healthy, matching June 17** — the correct season total (**49-15-0**) appears, with the per-event breakdown correctly showing 11-5-0 as just the first event's row, not the season total. No typo found in the fetched content.

**Two pages now return true 404s that did not before:**
- **`/blog` → 404**, branded error page (canonical points to `/error`). On June 17 this was a 200 with content frozen at June 2023.
- **`/newsletter` → 404**, same branded error page. On June 17 this was a 302 redirect to the 2025 Season Newsletter.

Per your note, this matches your intent (left as shells for possible student revival). **Confirmed 2026-07-04: plain 404 is the intended treatment** — no distinct "retired" page needed.

**✅ RESOLVED 2026-07-04 — Community/FLL Team page title had a leaked admin artifact:**
`/community/fll-team` was rendering `<title>Folder: FLL Team: The Blair LEGO Project | FRC Team 449</title>` — a literal `"Folder: "` prefix that Grav's admin auto-fills for a new page and that never got cleaned up, sitting in `user/pages/03.COMMUNITY/04.fll-team/modular.md`. Confirmed via `grep` on the server, fixed with a one-line edit (backup taken first, edited as `grav` to respect the ownership rule, cache cleared), and reconfirmed live via `curl`: title now correctly reads `FLL Team: The Blair LEGO Project | FRC Team 449`.

**Summer Classes is still 404** — unchanged from June 17, contrary to what the retracted revision claimed.

**Build Blog correctly redirects to Login** (200, title "Login | FRC Team 449") — gated as intended, unchanged.

---

## ❌ Retracted — do not act on these

These appeared in the voided 2026-07-03c revision and are **not real**:
- A rewritten `/about-us/history` landing page with three cards.
- A broken link from that page to `/about-us/history/notable-449-members`.
- A broken link from `/community` to `/community/12.FLLJREXPO`. *(Both of these URLs do return 404 in isolation, but I have no evidence anything on the site actually links to them — they may simply be URLs I invented that would naturally 404. Not a confirmed bug.)*
- A site-wide page-title regression (disproven above — titles are correct).
- A content regression on the Robots page (disproven above — content is correct).
- Claims that Blog and Newsletter still show old/frozen content (they're 404s, not stale pages).
- Any claim about a Grav cache or config issue — the cache was cleared, `site.yaml` was checked and correct, and the underlying premise (a title bug) turned out to be false.

---

## ✅ Additional items verified via curl, 2026-07-04

- **Leadership officer cards are published.** Confirmed via curl: President, VP Technology, VP Communications, and VP Finance all render with join years (2023/2023/2024/2023). *(Names not captured by this check — only role/year lines were grepped.)* Resolves the June 17 finding.
- **The stray `09.NEWSLETTER1/` duplicate folder is gone.** `ls user/pages/` shows only `08.newsletter/`. Resolves the June 17 housekeeping item.
- **T-Shirt Designs: partially resolved.** 2014 is now present. Missing years are now **2010, 2013, 2021** (down from the original four — 2014 no longer missing). *(The grep also matched "2080" and "2090," almost certainly false positives — some other number on the page, not real shirt years — not trusted.)*
- **Sponsor Benefits confirmed: no Platinum tier**, verified directly in the tier markup (Bronze $449 → Silver $1,000 → Gold $2,500 → Diamond $5,000 → Title Sponsor/Flagship $6,000). Matches Current Sponsors' "Platinum" label mismatch noted earlier — still open.
- **Mentors "20??" placeholder count confirmed unchanged: exactly 6.** The 2-blank-cards portion of the original finding is **ambiguous** — a `blank.jpg` search returned 0, which could mean those cards were fixed, or that they use a different placeholder filename. Not confirmed either way.
- **449 Members of Note: 14 raw matches for `blank.jpg`** in the page source — higher than the "~9" estimated June 17, but this is a string count, not a person count, and likely includes multiple references per photo (thumbnail, full-size, lightbox). Needs a visual check for an accurate count, not just this grep.
- **Homepage donate/season-recap status: inconclusive, not confirmed either way.** No matches for "donate," "competition season," or "season recap" — but that's a weak test, since the homepage could cover either topic without those exact words. Don't treat this as confirming the June 17 finding is still open; it just means this particular check didn't settle it.
- **Scouting's spaced folder name is still present**: `user/pages/02.ABOUT-US/20.SCOUTING/03.current scouting` — unchanged from June 17.
- **Community's overlapping legacy folders are still present, unchanged**: `03.fll-team-the-blair-lego-project` alongside `04.fll-team`; `10.neurorobotics` (unpublished); `06._fll` alongside `11.FLLJREXPO`; `08._java` alongside `12.GBT`.
- **BlairMdITC font: confirmed still disabled**, exactly as documented — the `font-family: 'BlairMdITC'` rule is commented out at line 144 of `custom.css`, pending a webfont license purchase.

## ⚠️ Still carried over from June 17, not verified this session

- **Sponsor Benefits Platinum-tier mismatch** — see above, tier confirmed absent; whether/how to reconcile with Current Sponsors' "Platinum" label is still an open decision, not a technical unknown.
- **Robots, About Us, Programming, Community, FLL Team, GBT, Bunnybots, Current Sponsors, Join Us** — titles reconfirmed correct in the earlier curl batch; content itself not re-checked beyond that.

---

## Recommended next steps

**Confirmed still open, worth acting on:**
1. **T-Shirt Designs** — add 2010, 2013, 2021 if they exist (down from 4 missing years to 3).
2. **Mentors** — fill the 6 confirmed "Joined 20??" placeholders.
3. **449 Members of Note** — visually check the blank-photo cards (raw grep count of 14 isn't a reliable person-count; source photos or redesign as text-only).
4. **Scouting folder rename** — `03.current scouting` → a hyphenated slug, no space.
5. **Community folder cleanup** — decide whether to remove the legacy/duplicate folders (`fll-team-the-blair-lego-project`, `neurorobotics`, `06._fll`, `08._java`) now that their replacements exist.
6. **Sponsor Benefits Platinum tier** — reconcile with Current Sponsors' "Platinum" label (confirmed absent from the tier list).

**Needs a firmer check before acting:**
7. **Homepage donate/season-recap status** — this session's keyword check was inconclusive; if it matters, do a fuller content check rather than a simple grep.
8. **Mentors' 2 blank cards** — the `blank.jpg` search came back empty; confirm visually whether they were fixed or just use a different filename.

**Already resolved, no action needed:**
- Leadership officer cards (published).
- Stray `09.NEWSLETTER1/` folder (removed).
- FLL Team page title (fixed 2026-07-04).
- Blog/Newsletter 404 treatment (confirmed intentional).

If you want anything else refreshed, the same approach — you running curl/ls/grep on the server and pasting output — is what's proven reliable this session.
