# FRC 449 Website — Teammate Instruction Manual
*Last updated: 2026-07-05 · Version 2.1*

This manual is in two parts:

- **Part 1 — For Everyone** covers everything you can do through the **admin panel** in a web browser: understanding how the site is built, and updating **text**, **images**, and **modules**.
- **Part 2 — For Power Users** covers the things you can only do with **SSH and CSS**, including inventing entirely new module types.
> **The live site:** `https://robot.mbhs.edu`. Admin panel: `https://robot.mbhs.edu/admin`. There's no separate staging/practice site — the site gets a full automatic backup every night, and traffic is low enough that a mistake is easy to fix and low-stakes. Just be reasonably careful, and use the nightly backup as your safety net.

---

# Part 1 — For Everyone

## 1. Site basics

Our site runs on **[Grav](https://getgrav.org/)**. Unlike some CMSes, there is no database — the entire website is just files and folders. That makes it simple and very backup-friendly.

Three words you'll hear constantly:

- **Folder** — the container on disk. Can be either:
  - **Page** — a folder that Grav turns into a web address (URL). The folder `02.ABOUT-US` becomes the page at `/about-us`.
  - **Module** — a "building block" that is **not** its own web address. Modules are stacked to build a page (a **modular page**). Our Home and About Us pages are modular pages: the hero banner, each text block, each photo menu, the gallery — those are all separate modules assembled into one page. Their names begin with a **leading underscore** (like `_mission`).

**Why this matters:** when you want to edit "the mission statement on the About Us page," you're really editing the **`_mission` module** *inside* the About Us page — not the About Us page itself. In the admin's Pages list, expand the parent page and you'll see its modules underneath.

### Logging in
Go to `https://robot.mbhs.edu/admin` and sign in. The admin interface — **Admin Next** — has Pages, Configuration, Plugins, Themes, and Tools sections in the left sidebar. You'll spend almost all your time in **Pages**.

> Your access level (Editor / Onboarder / Admin) controls what you can do. Most people should be **Editor**. Ask Brad or Rafi if you need more.

## 2. Text

1. In the admin, click **Pages**.
2. Navigate to the page. For a **modular page** (Home, About Us…), expand it and find the **module** that holds the text you want.
3. Click the module to open it. Edit the **Content** box.
4. Click **Save**.

The Content box uses **Markdown**:

| You type | You get |
|---|---|
| `## Heading` | A heading (more `#` = smaller) |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `* item` (line start) | a bullet point |
| `[click here](/about-us)` | a link |
| `<br>` | a line break |

You can also use HTML for effects Markdown can't do easily.

**Leaving notes for other editors:** type `[//]: # (your note here)` in the Content box. It shows for editors but never appears on the public page.

**Editing frontmatter (advanced settings):** every module/page has a **Normal / Expert** toggle in the top bar. Normal shows the friendly form; **Expert shows the raw settings file directly, and you can edit it there** — this is how you change things like hero images, gallery order, and menu item lists without needing SSH. Be careful in Expert mode: it's real file content, and a typo can break the page. If you're not sure, ask a Power User first.

## 3. Images

### a) An image next to a block of text
Open the module. Scroll to **Page Media** (below the Content box). **Drag a new image in** to upload, or delete the old one. The **first image** listed is the one shown next to the content.

### b) The home-page photo gallery
Open the **gallery** module. It uses the **`gallery-draggable`** template, which shows **every** image in its Page Media in the **order they appear there**:
- **Add a photo:** drag it into **Page Media**.
- **Remove a photo:** delete it from Page Media.
- **Reorder:** drag the thumbnails in Page Media.
- **Caption:** any text you type in the gallery's **Content** box appears centered below the photos.

### Image uploads are auto-handled (the `image-intake` plugin)
Every image you upload is automatically **resized** to a sensible max width for its context (gallery 1200px, hero 2560px, sponsor/mentor grids 800px, else 2000px) and its **filename sanitized**. Drag in full-size photos with messy names — it just works.

## 4. Creating a page or module

**Both use the same "Add" flow** in Pages, which offers three options: **Page**, **Folder**, and **Module**.

1. Navigate to where you want the new thing to go (you can move it later).
2. Click **Add**, choose **Page** or **Module** as appropriate.
3. Give it a title and pick a **template** from the dropdown — for a module, this list shows every module type our theme already supports (Text, Hero, Icon-menu, Feature-images, Gallery-draggable, Footer-col, and a few unused stock ones).
4. Set its position under **Order** (or drag it into place in the Pages list).
5. Click **Continue**, then add your Content, Save.

> **This only works for module *types* that already exist.** If you need an entirely new kind of module — one that doesn't behave like any of the templates in that dropdown — that's a Power User task (Part 2, §9).

## 5. Update Schedule

This site is **student-led, mentor-guided** — most of what follows is a checklist of what needs doing once a year, not a rigid calendar you have to follow to the day. A few items genuinely are tied to a specific trigger (a season ending, registration opening); those are marked as such.

### During FRC season
- Keep the homepage **"What's new"** module current — match results, community outreach, other notable events.

### May, right after Worlds or the final competition
- Update the homepage rollup (`_home_top_text`) with the season's headline result.

### Registration-based programs — FLL, Bunnybots, Summer Programming
These three share the same pattern: each has its own page, and each needs the same two touch-points around its registration/application window.

- **When registration/applications open:** add a line to "What's new," and update the program's own page with an invitation to participate — including a link or info on how to join (a Google Form, Instagram, whatever's actually in use). Put this on the webpage itself even if most participants find out through social media — parents in particular still check the open web, and it's the one place that's always there regardless of which platform is currently popular.
- **When registration/applications close:** remove the "What's new" line, and replace the page copy with a "closed, check back next season" message.

**Per-program notes:**
- **FLL** — bare-minimum maintenance (open/close only) is an acceptable cadence for this program. Example phrasing: *"Applications are open [here] for the 2026-27 FLL season!"* → *"The 2026-27 season is underway. Check back in mid-2027 to apply to join!"*
- **Bunnybots** — same open/close pattern, **plus an extra step after the season ends**: add an update to the bottom of the Bunnybots page. Bunnybots also carries its own history-management decision, separate from the open/close cycle — each year, decide whether that season's wrap-up content stays on the page itself or recedes into a link out to an archive, once the page gets long enough to warrant it. Not a one-time call; revisit it each year.
- **Summer Programming** — **currently dormant.** If/when revived, treat it with the same open/close pattern as FLL — no special handling needed beyond that.

### Annual, but timing is the team's call
1. **Team History** — write up the just-ended season. Includes creating that season's new module under `_history-top` (About Us) as part of this task, not a separate step.
2. **New Leaders** — update the Leadership page once elections (May) have happened.
3. **Mentors** — fix any "Joined 20??" placeholders; add new mentors who joined.
4. **Members of Note** — update if there's new content to add.
5. **Sponsors** — update logos/roster; exact cadence intentionally left for the team to figure out.
6. **T-Shirt Designs** — upload each year's design once finalized.

### Currently dormant — update only if revived, no schedule otherwise
- Blog, Newsletter, Build Blog
- Scouting *(tracked separately as a "future line of effort" — see Handoff)*

## 6. Gotchas everyone should know

- **Frontmatter (Expert mode) is real file content.** A typo can break the page — if you're not confident editing it directly, ask a Power User.
- **You can't invent a brand-new module type from the admin.** You can add another instance of an *existing* type (Text, Hero, Icon-menu, etc.) freely — inventing a new type entirely requires SSH (Part 2, §9).
- **Ignore "update available" prompts** for plugins and themes. Updating has broken the site before. Leave them alone unless Rafi says otherwise.
- **There's a nightly backup, so mistakes are recoverable.** Still, make risky changes carefully — double-check before saving, and ask a Power User if you're unsure.

---

# Part 2 — For Power Users (SSH + CSS)

This part assumes you're comfortable with a command line and basic CSS. It covers what you **can't** do through the admin.

## 7. Getting in and where things live

**SSH:** `ssh <you>@robot.mbhs.edu` — Grav root: `/srv/robot-grav-site/`

**Key paths** (relative to the Grav root):

| What | Path |
|---|---|
| All page content | `user/pages/` |
| Active theme | `user/themes/mod-quark/` |
| Custom CSS | `user/themes/mod-quark/css/custom.css` |
| Base HTML template | `user/themes/mod-quark/templates/partials/base.html.twig` |
| Module templates | `user/themes/mod-quark/templates/modular/` |
| Module blueprints | `user/themes/mod-quark/blueprints/modular/` |
| System config | `user/config/system.yaml` |

A page on disk: `user/pages/02.ABOUT-US/05._2025-26/text.md`. The `---` block at the top of a `.md` file is the **frontmatter** (YAML settings); below it is the **content** (Markdown).

## 8. Things you can only do over SSH

### Edit frontmatter directly (for multi-line or scripted edits)
The admin's Expert mode (Part 1, §2) handles most frontmatter edits fine. For scripted, multi-line, or bulk changes, edit the `.md` file directly. For multi-line edits over SSH, **use Python, not `sed`** (sed doesn't do multi-line reliably):
```bash
cat << 'PYEOF' | ssh USER@robot.mbhs.edu python3
p='/srv/robot-grav-site/user/pages/.../text.md'
c=open(p).read()
c=c.replace('old','new')
open(p,'w').write(c)
PYEOF
```

### Create a module using a custom one-off variant of an existing template
For the common case — adding another instance of an existing module type (another `text`, another `gallery-draggable`, etc.) — use the admin's Add → Module flow (Part 1, §4); no SSH needed anymore. SSH is still useful if you want to hand-clone an existing module folder as a starting point for heavy customization:
```bash
cd /srv/robot-grav-site/user/pages/01.HOME
sudo -u grav cp -r 02._highlights 04._newthing
# edit 04._newthing/*.md; renumber the prefix to set order
```

### Edit CSS — and clear BOTH caches
All custom styling goes in **`custom.css`**. After editing CSS you must do **two** things or you won't see your change:
1. **Clear Grav's cache:** via the admin's Tools → Cache panel, or `rm -rf <gravroot>/cache/*` over SSH.
2. **Bust the browser cache:** bump the version number in `base.html.twig` — find `custom.css?v=NN` and increment `NN`.

Verify with `curl` to tell the two caches apart:
```bash
curl -s "https://robot.mbhs.edu/user/themes/mod-quark/css/custom.css?v=NN" | grep YOUR_RULE
```
If curl shows the new value but your browser doesn't, it's *browser* cache — bump `?v=`.

### Edit templates / partials
Layout and structure live in `templates/`. The footer, header, and how modules render are here. Back up before editing: `cp file file.bak-$(date +%Y%m%d)`.

## 9. Create a new module template (a genuinely new type)

Adding another instance of an *existing* template (Text, Hero, Icon-menu, etc.) is now an admin-only task — see Part 1, §4. This section is for when you need a module that behaves in a way **none** of the existing templates do.

**Two files, both required:**
1. **The Twig template** — `user/themes/mod-quark/templates/modular/YOURNAME.html.twig`. This is the actual HTML/Twig markup for the module.
2. **A matching blueprint** — `user/themes/mod-quark/blueprints/modular/YOURNAME.yaml`. This tells the admin what fields to show for this module type, and **must** `@extends: default` at minimum.

**Why the blueprint is mandatory, not optional:** if you create the `.twig` template without a matching blueprint, the module will render once — but the **admin silently reverts it to a stock template type** the next time anyone saves it. This is the single most common mistake when adding a new module type. Look at `icon-menu.yaml`, `feature-images.yaml`, or `gallery-draggable.yaml` in the blueprints folder for real, working examples to copy from — all three of our existing custom module types followed exactly this pattern.

**Steps:**
1. Pick an existing custom template closest to what you want (icon-menu, feature-images, and gallery-draggable are the three real precedents) and copy both its `.twig` file and its `.yaml` blueprint as a starting point.
2. Rename both to your new module's name — the two filenames (minus extension) must match.
3. Edit the `.twig` file's markup to do what you actually want.
4. Edit the `.yaml` blueprint's fields to match whatever settings your new template actually needs.
5. Clear the cache. Test by adding a module of your new type via the admin (Part 1, §4) — it should now appear in the template dropdown.

## 10. CSS & asset conventions (important quirks)

- **Put all CSS in `custom.css`.** Don't scatter `<style>` blocks.
- **A module's own injected CSS does NOT reach the page.** Stock Quark modules sometimes add CSS via `assets.addInlineCss(...)` at render time, but our custom `base.html.twig` outputs the `<head>` *before* module content runs, so that CSS is dropped. **Fix: move that CSS into `custom.css`.**
- **Frontmatter URLs are not auto-base-prefixed.** See §11.

## 11. Portable linking conventions

Any path that hardcodes the **domain** or a **folder number** can break if a folder gets renumbered or the site ever moves hosts. Rules:

- **Internal links:** root-relative, no domain — `[text](/about-us/leadership)`. Never the full domain.
- **Page images in Markdown:** `![](filename.jpg)` (just the filename) — Grav resolves it correctly on both sites.
- **Shared images in Markdown:** `![](/user/images/x.jpg)` — Grav auto-adds the base. **But raw HTML `<img src="/...">` is NOT rewritten** — for raw HTML, add `process: { twig: true }` to the page and use `src="{{ base_url }}/user/images/x.jpg"`.
- **Frontmatter URLs rendered by a template** (e.g. menu item `url:` values) are **not** auto-prefixed either — the template must prepend `{{ base_url }}`. Our `icon-menu` and `feature-images` templates were patched to do this.

## 12. How Mod Quark differs from regular Quark

Our theme **Mod Quark** (`user/themes/mod-quark/`) is a **custom child of Quark** (`user/themes/quark/`). Key differences:

- **It is hand-managed, NOT installed through Grav's package manager.** **Do not run `bin/gpm update` on it** — manage it manually via SSH / the team GitHub repo.
- **Custom module types: `icon-menu` and `feature-images`.** Quark's stock `features` (a grid of Font-Awesome icons) is customized and **renamed `icon-menu`** in our theme (its links were patched to be base-path-safe). We also added **`feature-images`** — the same idea but with **photos** (Sponsors, Mentors, Robots, etc.); its image resolution uses Grav page media so it survives folder renumbering.
- **Custom `base.html.twig`.** Our base template is a full override of Quark's, with our own header markup, our `custom.css` include (with the `?v=` cache-bust), and our own asset handling.
- **The footer is a custom partial + an editable page.** Stock Quark's footer is a throwaway credit line. Ours is `partials/footer.html.twig` (structure + logo) that pulls its content from a hidden, admin-editable `/footer` page.
- **Some stock Quark pieces are missing.** Example: Quark's **gallery** template is present but its required `partials/lightbox.html.twig` (+ the glightbox library) was never carried over, so we supplied a minimal no-JS `lightbox.html.twig`.

## 13. Backups, rollback, and hard limits

- **Backups:** before any risky edit, copy the file: `cp file file.bak-$(date +%Y%m%d-%H%M%S)`. The live site's primary backup is Grav's own **nightly scheduled full-site backup** (7-copy rotation), run automatically via the Grav scheduler.
- **Clear the cache** after most changes: via the admin's Tools → Cache panel, or `rm -rf <gravroot>/cache/*`.
- **🔴 Never update PHP, nginx, Ubuntu, or OS packages** on either server without Rafi. A past PHP upgrade broke the live site and needed expert recovery. This is the one category that can't be safely rolled back through Grav.

---

## Appendix: Template reference

### Modular templates (the section building blocks)
The module's `.md` filename selects its template. These are what you assemble modular pages (Home, About Us…) from.

| Template | What it does | 449-custom? | Admin-selectable* |
|---|---|---|---|
| `text` | A text block, optionally with one image beside it (left/right). | modified | ✅ |
| `hero` | Full-width banner: background image + big title (top of a page). | stock Quark | ✅ |
| `icon-menu` | Grid of Font Awesome **icon** links — e.g. Leadership / Mentors / Programming. | custom | ✅ |
| `feature-images` | Grid of **photo** links — Sponsors, Mentor headshots, Robots, T-shirts. | custom | ✅ |
| `gallery-draggable` | Photo grid in **Page-Media drag order** (no list to edit). | custom | ✅ |
| `gallery` | Lightbox photo grid from a hand-listed `items:` list in frontmatter. | stock Quark | ⚠️ no blueprint |
| `footer-col` | Internal helper: outputs only its content (used for the footer's columns). | custom | — |

\* Selectable **and** survives admin saves only if the template has a blueprint (`blueprints/modular/NAME.yaml`) — see §9.

### Page templates (whole-page types)
Set the type of a *top-level* page.

| Template | What it does |
|---|---|
| `default` | A standard single content page. |
| `modular` | A page assembled by stacking the modular templates above (Home, About Us). |
| `item` | A single blog post / article page. |
| `blog` | A blog index / listing page. |
| `error` | The 404 / error page. |
| `comments` | Stock Quark comments listing — effectively unused. |

---

*Questions: Brad (comms@navybook.com). Server/infrastructure: Rafi Pedersen. See also `CHANGELOG.md` (the change history) and `RUNBOOK.md` (deeper ops detail and gotchas) at the repo root.*
