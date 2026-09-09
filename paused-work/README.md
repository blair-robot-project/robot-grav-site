# paused-work

Work that is **paused rather than abandoned** — kept here so it can be picked up cheaply
if circumstances change, and so it does not live only on a disposable server directory.

Not `archive/`: that tree is the frozen pre-2.0 historical webroot, and "archive" implies
dead. Nothing in here is dead.

---

## `mod-quark-2/` — the Quark 2 port of the site theme

A complete, working Grav theme: a child of the stock **Quark 2** parent theme, ported from
the live site's **Mod Quark** (a child of Quark 1 / Spectre). Captured 2026-09-08 from the
isolated test copy at `/srv/robot-grav-site-quark2` on the live droplet.

**Status: paused, not shipped. The live site runs Mod Quark and is unaffected by anything
in this directory.** See RUNBOOK.md § "Mod Quark -> Quark 2 migration" for the full history,
the decision to pause, and the triggers that should reopen it.

### Why it is preserved here

The theme's **custom modules** are the bulk of the real engineering and are largely
theme-agnostic in shape — they would need to be rebuilt from scratch for *any* future theme
change, Quark 2 or otherwise:

| Template | What it is |
|---|---|
| `icon-menu` | Homepage icon/link grid |
| `feature-images` | Sponsor logo grid (also used elsewhere) |
| `gallery-draggable` | Photo gallery, admin drag-reorder |
| `gallery-banners` | Award/banner row |
| `gallery-press` | Press-kit photo grid with captions, credits, download links |
| `footer-col` | Footer column helper |
| `text` / `hero` | Modified stock templates (year-modules, history layout, hero) |

Each has a matching blueprint in `blueprints/modular/` — a custom modular template without
one gets silently reverted to a stock type by the admin panel.

Until 2026-09-08 this existed **only** on the droplet's test copy, which the RUNBOOK itself
describes as disposable. One `rm -rf` reclaiming disk would have destroyed it. That is the
whole reason this directory exists.

### What is NOT here

- `.bak-*` files (12 of them) — deliberately excluded as noise.
- The test copy's `user/pages` content — it is July-2026-vintage and already stale against
  live; it was only ever there to exercise the templates.

### The two stylesheets, and why both are kept

- **`css/custom.css`** — the "mirror" build (`?v=33`), which reproduces live's appearance
  closely. Headings h2–h6 and the icon-menu module were verified pixel-exact against live.
  It contains **29 hand-derived `clamp()` formulas** replicating Spectre's fluid root
  font-size; that complexity is precisely what the pause decision weighed against.
- **`css/custom-option2.css`** — a *generated preview* of the "adopt Quark 2's own
  typography instead of mirroring" alternative. **0 `clamp()` formulas.** Its comments are
  stripped and it is a look-and-feel artifact only — **do not ship it as-is**; rebuild
  deliberately from the mirror if that route is ever taken.

### If you resume this

Read RUNBOOK.md first, in this order: the pause decision and its triggers, then Phase 3a
(what five weeks of drift against live looked like — expect more), then the verification
lessons in items 21–28. Two of those will save real time: **totals are a worthless parity
metric** (they can read near-perfect while masking two opposing errors), and **verifying a
CSS fix on one page is not enough** (Quark 2's contextual `:is(…) + heading` rules only
apply where a heading follows a sibling).

Start with a fresh drift check against live, not with the old task list.
